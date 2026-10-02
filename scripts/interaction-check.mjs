// Interaction checks: lightbox (open, keys, zoom, focus, deep links, swipe), mobile menu,
// dropdowns, FAQ accordion, testimonial dots. Prints PASS/FAIL lines; exits 1 on any failure.
// Usage: npm run preview (in another terminal), then: node scripts/interaction-check.mjs [baseUrl] [screenshotDir]
import { chromium } from 'playwright-core';

const base = process.argv[2] ?? 'http://localhost:4321';
const out = process.argv[3];
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
const errors = [];

// ---------- Lightbox (desktop) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/pages/gallery.html', { waitUntil: 'networkidle' });
  const before = await page.evaluate(() => performance.getEntriesByType('resource').some((r) => r.name.includes('photoswipe')));
  check('PhotoSwipe not loaded before first open', !before);
  await page.locator('[data-lightbox-item]').nth(1).click();
  await page.waitForSelector('.pswp--open', { timeout: 5000 });
  check('click opens lightbox', true);
  check('hash set to #gallery-2', (await page.evaluate(() => location.hash)) === '#gallery-2', await page.evaluate(() => location.hash));
  await page.waitForTimeout(600);
  const imgSrc = await page.evaluate(() => document.querySelector('.pswp__item:not([aria-hidden="true"]) img.pswp__img:not(.pswp__img--placeholder)')?.currentSrc || '');
  check('full-size image is WebP from srcset', /\.webp/.test(imgSrc), imgSrc.split('/').pop());
  if (out) await page.screenshot({ path: `${out}/lightbox-open.png` });
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  check('ArrowRight → #gallery-3', (await page.evaluate(() => location.hash)) === '#gallery-3');
  check('counter shows 3 / 4', (await page.textContent('.pswp__counter'))?.replace(/\s/g, '') === '3/4', await page.textContent('.pswp__counter'));
  // zoom via button
  await page.click('.pswp__button--zoom');
  await page.waitForTimeout(500);
  check('zoom button zooms in', await page.evaluate(() => document.querySelector('.pswp')?.classList.contains('pswp--zoomed-in')));
  await page.click('.pswp__button--zoom');
  await page.waitForTimeout(400);
  // focus trapped inside
  await page.keyboard.press('Tab');
  check('focus stays inside lightbox', await page.evaluate(() => !!document.activeElement?.closest('.pswp')));
  await page.keyboard.press('Escape');
  await page.waitForSelector('.pswp', { state: 'detached', timeout: 5000 });
  check('Esc closes lightbox', true);
  check('hash cleared on close', (await page.evaluate(() => location.hash)) === '');
  const focused = await page.evaluate(() => document.activeElement?.closest('[data-lightbox-item]') ? [...document.querySelectorAll('[data-lightbox-item]')].indexOf(document.activeElement.closest('[data-lightbox-item]')) : -1);
  check('focus returned to the opener tile', focused === 1, `active tile index ${focused}`);
  // deep link
  await page.goto(base + '/pages/gallery.html#gallery-4', { waitUntil: 'networkidle' });
  await page.waitForSelector('.pswp--open', { timeout: 5000 });
  check('deep link #gallery-4 opens 4th photo', (await page.textContent('.pswp__counter'))?.replace(/\s/g, '') === '4/4');
  await page.keyboard.press('Escape');
  // About Us facility collage
  await page.goto(base + '/pages/about-us.html', { waitUntil: 'networkidle' });
  await page.locator('[data-lightbox="facility"] [data-lightbox-item]').nth(2).click();
  await page.waitForSelector('.pswp--open', { timeout: 5000 });
  check('About Us facility photo opens lightbox at item 3', (await page.textContent('.pswp__counter'))?.replace(/\s/g, '') === '3/3');
  await page.keyboard.press('Escape');
  await ctx.close();
}

// ---------- Lightbox swipe (touch) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/pages/gallery.html', { waitUntil: 'networkidle' });
  await page.locator('[data-lightbox-item]').first().tap();
  await page.waitForSelector('.pswp--open', { timeout: 5000 });
  await page.waitForTimeout(500);
  // Simulate a horizontal swipe with pointer events on the lightbox.
  const swipe = async (fromX, toX) => {
    const cdp = await ctx.newCDPSession(page);
    const y = 420;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: fromX, y }] });
    for (let i = 1; i <= 8; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: fromX + ((toX - fromX) * i) / 8, y }] });
      await page.waitForTimeout(16);
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  await swipe(330, 60);
  await page.waitForTimeout(700);
  check('swipe left goes to next photo', (await page.textContent('.pswp__counter'))?.replace(/\s/g, '') === '2/4', await page.textContent('.pswp__counter'));
  if (out) await page.screenshot({ path: `${out}/lightbox-mobile.png` });
  await page.click('.pswp__button--close');
  await ctx.close();
}

// ---------- Mobile menu ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/pages/ent.html', { waitUntil: 'networkidle' });
  check('drawer hidden from assistive tech when closed', await page.evaluate(() => getComputedStyle(document.getElementById('main-nav')).visibility === 'hidden'));
  await page.tap('[data-menu-toggle]');
  await page.waitForTimeout(400);
  check('hamburger opens drawer', await page.evaluate(() => document.getElementById('main-nav').classList.contains('open')));
  check('hamburger aria-expanded=true', (await page.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'true');
  await page.tap('#main-nav [data-dropdown-toggle] >> nth=0');
  await page.waitForTimeout(200);
  check('Services submenu expands on tap', await page.isVisible('#nav-group-2'));
  if (out) await page.screenshot({ path: `${out}/mobile-menu-open.png` });
  check('no horizontal overflow with menu open', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  check('Esc closes drawer', await page.evaluate(() => !document.getElementById('main-nav').classList.contains('open')));
  await ctx.close();
}

// ---------- Desktop dropdown via keyboard ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/pages/faq.html', { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  check('first Tab focuses skip link', (await page.evaluate(() => document.activeElement?.textContent?.trim())) === 'Skip to content');
  await page.focus('[data-dropdown-toggle] >> nth=0');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  check('Enter on Services opens dropdown', await page.isVisible('#nav-group-2'));
  await page.keyboard.press('Escape');
  await page.mouse.move(10, 600);
  await page.waitForTimeout(150);
  check('Esc closes dropdown', !(await page.isVisible('#nav-group-2')));
  await page.hover('text=Appointment');
  await page.waitForTimeout(150);
  const box = await page.locator('#nav-group-3').boundingBox();
  await page.mouse.move(box.x + 20, box.y - 3); // the 0.5rem gap between button and menu
  await page.mouse.move(box.x + 20, box.y + 20);
  check('hover dropdown survives moving into it', await page.isVisible('#nav-group-3'));
  // FAQ exclusive accordion
  const q = page.locator('.faq-question');
  await q.nth(0).click();
  await q.nth(1).click();
  const open = await page.evaluate(() => [...document.querySelectorAll('details.faq-item')].map((d) => d.open));
  check('FAQ opens one answer at a time', JSON.stringify(open) === '[false,true,false]', JSON.stringify(open));
  // Testimonials dot
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.locator('[data-testimonial-dots] button').nth(3).click();
  await page.waitForTimeout(900);
  check('testimonial dot 4 becomes active', await page.evaluate(() => document.querySelectorAll('[data-testimonial-dots] button')[3].classList.contains('active')));
  await ctx.close();
}

// ---------- Header shrink must not bounce the page (trackpad-size scroll steps) ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base + '/pages/about-us.html', { waitUntil: 'networkidle' });
  await page.mouse.move(720, 500);
  await page.evaluate(() => {
    window.__ys = [];
    let last = -1;
    const tick = () => {
      if (scrollY !== last) { window.__ys.push(scrollY); last = scrollY; }
      if (window.__ys.length < 300) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  for (let i = 0; i < 80; i++) { await page.mouse.wheel(0, 2); await page.waitForTimeout(16); }
  await page.waitForTimeout(600);
  const backward = await page.evaluate(() => window.__ys.filter((y, i, a) => i > 0 && y < a[i - 1]).length);
  check('scrolling down past the header shrink never jumps backwards', backward === 0, `${backward} backward jumps`);
  check('header is compact after scrolling', await page.evaluate(() => document.querySelector('.site-header').classList.contains('is-scrolled')));
  await ctx.close();
}

await browser.close();
console.log(results.join('\n'));
console.log(errors.length ? 'PAGE ERRORS:\n' + errors.join('\n') : 'No page errors');
if (results.some((r) => r.startsWith('FAIL')) || errors.length) process.exit(1);
