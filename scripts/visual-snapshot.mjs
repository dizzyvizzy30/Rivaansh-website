// Full-page screenshots + page metrics (title, h1, height, horizontal overflow, broken images, errors)
// at 1440×900 and 390×844 with reduced motion. Used for desktop/mobile parity checks.
// Usage: npm run preview (in another terminal), then:
//   node scripts/visual-snapshot.mjs http://localhost:4321 .snapshots/after [page-filter,...] > .snapshots/after.json
// Uses the locally installed Google Chrome (playwright-core, no browser download).
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const [base, out, only] = process.argv.slice(2);
mkdirSync(out, { recursive: true });

const pages = [
  '/',
  '/pages/ent.html',
  '/pages/about-us.html',
  '/pages/contact.html',
  '/pages/appointment.html',
  '/pages/care.html',
  '/pages/blog.html',
  // Draft pages — only present in drafts builds (npm run dev, deploy previews); skipped when missing.
  '/pages/ent/vertigo-dizziness.html',
  '/pages/blog/when-to-see-an-ent-doctor.html',
  '/pages/photos-needed.html',
];
const selected = only ? pages.filter((p) => only.split(',').some((o) => p.includes(o))) : pages;
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };

const browser = await chromium.launch({ channel: 'chrome' });
const report = [];
for (const [vpName, vp] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport: vp, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  for (const path of selected) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const failed = [];
    page.on('requestfailed', (r) => failed.push(r.url()));
    page.on('response', (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
    const response = await page.goto(base + path, { waitUntil: 'networkidle' });
    if (!response || response.status() === 404) {
      await page.close();
      continue;
    }
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);
    const metrics = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent.trim().replace(/\s+/g, ' '),
      height: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      imgs: document.images.length,
      brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
      font: getComputedStyle(document.body).fontFamily,
    }));
    const name = path.replace(/^\//, '').replace(/\//g, '_').replace('.html', '');
    await page.screenshot({ path: `${out}/${vpName}-${name}.png`, fullPage: true });
    report.push({ vp: vpName, path, ...metrics, errors, failed });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(report, null, 1));
