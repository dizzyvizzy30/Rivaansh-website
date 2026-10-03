// Interaction checks for the restructured site (docs/site-restructure-plan.md): navigation, mobile drawer,
// phone action bar, fixed-height header, lightbox, FAQ, and a crawl for broken internal links.
// Prints PASS/FAIL lines; exits 1 on any failure.
// Usage: npm run preview (in another terminal), then: node scripts/interaction-check.mjs [baseUrl] [screenshotDir]
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? 'http://localhost:4321';
const out = process.argv[3];
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
const errors = [];
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
const watch = (page) => page.on('pageerror', (e) => errors.push(`${page.url()}: ${e.message}`));

// ---------- Crawl: every internal link resolves ----------
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  watch(page);
  const seen = new Set();
  const queue = ['/'];
  const broken = [];
  while (queue.length) {
    const path = queue.shift();
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    if (!res || res.status() >= 400) { broken.push(`${res?.status()} ${path}`); continue; }
    const links = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href').split('#')[0]).filter(Boolean));
    for (const link of links) if (!seen.has(link) && !link.startsWith('/_astro')) queue.push(link);
  }
  check('all internal links resolve', broken.length === 0, `${seen.size} pages crawled${broken.length ? '; broken: ' + broken.join(', ') : ''}`);
  await ctx.close();
}

// ---------- Desktop header & navigation ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  watch(page);
  await page.goto(base + '/pages/ent.html', { waitUntil: 'networkidle' });
  const labels = await page.$$eval('.desktop-nav a', (as) => as.map((a) => a.textContent.trim()));
  check('desktop menu has the plain destinations', ['Treatments', 'Doctor & Clinic', 'Visit Us'].every((l) => labels.includes(l)), labels.join(' · '));
  check('no dropdown menus', (await page.$$('.dropdown, [data-dropdown-toggle]')).length === 0);
  check('current section is marked', (await page.getAttribute('.desktop-nav a[aria-current="page"]', 'href')) === '/pages/ent.html');
  const strip = await page.textContent('.utility-strip');
  check('utility strip shows today’s hours', /Today:/.test(strip), strip.trim().replace(/\s+/g, ' ').slice(0, 80));
  check('Book Appointment button in header', await page.isVisible('.header-book'));
  check('phone bar hidden on desktop', !(await page.isVisible('[data-action-bar]')));
  await page.keyboard.press('Tab');
  check('first Tab focuses skip link', (await page.evaluate(() => document.activeElement?.textContent?.trim())) === 'Skip to content');

  // Header keeps one height and the page never jumps backwards (trackpad-size steps).
  await page.goto(base + '/pages/about-us.html', { waitUntil: 'networkidle' });
  await page.mouse.move(720, 500);
  const h0 = await page.$eval('.site-header', (el) => el.getBoundingClientRect().height);
  await page.evaluate(() => {
    window.__ys = [];
    let last = -1;
    const tick = () => {
      if (scrollY !== last) { window.__ys.push(scrollY); last = scrollY; }
      if (window.__ys.length < 400) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  for (let i = 0; i < 100; i++) { await page.mouse.wheel(0, 3); await page.waitForTimeout(16); }
  for (let i = 0; i < 100; i++) { await page.mouse.wheel(0, -3); await page.waitForTimeout(16); }
  await page.waitForTimeout(500);
  const h1 = await page.$eval('.site-header', (el) => el.getBoundingClientRect().height);
  const { downBack, upForward } = await page.evaluate(() => {
    const ys = window.__ys;
    const peak = ys.indexOf(Math.max(...ys));
    let downBack = 0, upForward = 0;
    for (let i = 1; i < ys.length; i++) {
      if (i <= peak && ys[i] < ys[i - 1]) downBack++;
      if (i > peak && ys[i] > ys[i - 1]) upForward++;
    }
    return { downBack, upForward };
  });
  check('header height is constant while scrolling', h0 === h1, `${h0}px → ${h1}px`);
  check('scrolling down and back up never jumps the wrong way', downBack === 0 && upForward === 0, `${downBack} / ${upForward}`);
  await ctx.close();
}

// ---------- Lightbox (first gallery with at least 2 photos; live site may have none until real photos exist) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  watch(page);
  await page.goto(base + '/pages/about-us.html', { waitUntil: 'networkidle' });
  const galleryId = await page.evaluate(() =>
    [...document.querySelectorAll('[data-lightbox]')].find((g) => g.querySelectorAll('[data-lightbox-item]').length >= 2)?.getAttribute('data-lightbox'),
  );
  if (!galleryId) {
    check('lightbox (skipped — no gallery with photos on this build yet)', true);
  } else {
    const items = `[data-lightbox="${galleryId}"] [data-lightbox-item]`;
    const total = (await page.$$(items)).length;
    check('PhotoSwipe not loaded before first open', !(await page.evaluate(() => performance.getEntriesByType('resource').some((r) => r.name.includes('photoswipe')))));
    await page.locator(items).nth(1).click();
    await page.waitForSelector('.pswp--open', { timeout: 5000 });
    check(`photo opens the lightbox (#${galleryId})`, true);
    check(`hash set to #${galleryId}-2`, (await page.evaluate(() => location.hash)) === `#${galleryId}-2`);
    await page.waitForTimeout(500);
    check('caption shown in lightbox', ((await page.textContent('.pswp__caption')) ?? '').length > 0, (await page.textContent('.pswp__caption'))?.trim());
    if (out) await page.screenshot({ path: `${out}/lightbox-open.png` });
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);
    check('arrow keys move between photos', (await page.textContent('.pswp__counter'))?.replace(/\s/g, '') === `1/${total}`);
    await page.keyboard.press('Escape');
    await page.waitForSelector('.pswp', { state: 'detached', timeout: 5000 });
    check('Esc closes and clears the hash', (await page.evaluate(() => location.hash)) === '');
    await page.goto(`${base}/pages/about-us.html#${galleryId}-${total}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.pswp--open', { timeout: 5000 });
    check(`deep link #${galleryId}-${total} opens the last photo`, (await page.textContent('.pswp__counter'))?.replace(/\s/g, '') === `${total}/${total}`);
  }
  await ctx.close();
}

// ---------- Homepage summary (round 2: ~4 phone screens, photo above the heading on phones) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  watch(page);
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const { screens, photoAboveTitle, heroButtons } = await page.evaluate(() => {
    const footer = document.querySelector('.site-footer').getBoundingClientRect().top + scrollY;
    const photo = document.querySelector('.hero-media');
    const title = document.querySelector('.hero-title');
    const visibleButtons = [...document.querySelectorAll('.hero .btn')].filter((b) => getComputedStyle(b).display !== 'none').length;
    return {
      screens: footer / innerHeight,
      photoAboveTitle: !photo || photo.getBoundingClientRect().bottom <= title.getBoundingClientRect().top + 1,
      heroButtons: visibleButtons,
    };
  });
  check('homepage is a short summary on phones (≤ 5 screens before the footer)', screens <= 5, `${screens.toFixed(1)} screens`);
  check('phone hero photo sits above the heading (not behind it)', photoAboveTitle);
  check('phone hero shows a single button', heroButtons === 1, `${heroButtons} visible`);
  check('no duplicated FAQ or first-visit blocks on the homepage', (await page.$$('main .faq-container, main .steps')).length === 0);
  await ctx.close();
}

// ---------- FAQ (Visit Us) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  watch(page);
  await page.goto(base + '/pages/contact.html#faq', { waitUntil: 'networkidle' });
  const q = page.locator('#faq .faq-question');
  await q.nth(0).click();
  await q.nth(1).click();
  const open = await page.$$eval('#faq details', (ds) => ds.map((d) => d.open));
  check('FAQ opens one answer at a time', open.filter(Boolean).length === 1 && open[1], JSON.stringify(open));
  check('full timings table appears once, on Visit Us', (await page.$$('.hours-table')).length === 1);
  check('today’s row highlighted in hours table', (await page.$$('.hours-table tr.is-today')).length === 1);
  await ctx.close();
}

// ---------- Mobile: drawer and phone action bar ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 });
  const page = await ctx.newPage();
  watch(page);
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const bar = page.locator('[data-action-bar]');
  check('phone action bar visible', await bar.isVisible());
  const barLabels = await bar.locator('a').allTextContents();
  check('action bar has Call and Book', barLabels.some((t) => t.includes('Call')) && barLabels.some((t) => t.includes('Book')), barLabels.map((t) => t.trim()).join(' · '));
  const heights = await bar.locator('a').evaluateAll((as) => as.map((a) => a.getBoundingClientRect().height));
  check('action bar buttons are at least 44px tall', heights.every((h) => h >= 44), heights.join(', '));
  check('Menu button shows the word "Menu"', (await page.textContent('[data-menu-open]'))?.includes('Menu'));
  await page.tap('[data-menu-open]');
  await page.waitForTimeout(400);
  check('Menu opens the drawer', await page.evaluate(() => document.querySelector('[data-drawer]').open));
  const drawerItems = await page.$$eval('.drawer-links a', (as) => as.map((a) => a.textContent.trim().split('\n')[0]));
  check('drawer lists Home and the destinations', drawerItems[0] === 'Home' && drawerItems.length >= 4, drawerItems.join(' · '));
  check('drawer items have descriptions', (await page.$$('.drawer-links small')).length >= 3);
  if (out) await page.screenshot({ path: `${out}/mobile-drawer.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  check('Esc closes the drawer', await page.evaluate(() => !document.querySelector('[data-drawer]').open));
  // The bar hides while typing in a form field.
  await page.evaluate(() => {
    const input = document.createElement('input');
    input.id = '__probe';
    document.querySelector('main').prepend(input);
  });
  await page.focus('#__probe');
  check('action bar hides while a field is focused', !(await bar.isVisible()));
  await page.evaluate(() => document.getElementById('__probe').blur());
  check('action bar returns after typing', await bar.isVisible());
  check('no horizontal overflow on mobile', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  await ctx.close();
}

await browser.close();
console.log(results.join('\n'));
console.log(errors.length ? 'PAGE ERRORS:\n' + errors.join('\n') : 'No page errors');
if (results.some((r) => r.startsWith('FAIL')) || errors.length) process.exit(1);
