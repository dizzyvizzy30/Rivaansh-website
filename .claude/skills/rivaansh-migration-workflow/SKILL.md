---
name: rivaansh-migration-workflow
description: Step-by-step workflow and gates for migrating/refactoring the Rivaansh ENT site without regressions — inventory, baseline screenshots, porting order, desktop/mobile parity verification, intentional-deviation log, and approval gates for hosting/DNS. Use for the Caddy→Astro migration and any large structural change.
---

# Rivaansh ENT — Migration Workflow

> Status (2026-10-02): Caddy → Astro migration done; `www/` and `Caddyfile` removed; `netlify.toml` builds Astro.
> Phase 1 of `docs/site-restructure-plan.md` (new IA, redirects, drafts workflow) is implemented — URL rules now live in
> the `rivaansh-component-architecture` skill. Use this workflow again for any large structural change.

## Gates (never skip)
1. **No hosting or DNS change without explicit approval** — that includes `netlify.toml`, Netlify UI settings, Cloudflare records, and deleting `www/` (Netlify still publishes it until `netlify.toml` changes).
2. **Caddy (`Caddyfile`) is removed only after** desktop + mobile parity is verified for every page.
3. Work on a branch; preview via a Netlify deploy preview before merging to `main` (each production deploy costs Netlify credits).

## Steps
1. **Inventory** — list every page, shared block (head/header/footer/scripts), CSS file and which pages load it, JS behavior, image and where it's used. Note cascade overrides (e.g., `about.css` restyles `.stats-section` and `.vm-card` only on About Us; `pages.css` resizes `.btn.floating-btn.primary` on inner pages).
2. **Baseline** — serve the old site (`caddy run` → :8080) and capture full-page screenshots at 1440×900 and 390×844 with reduced motion, plus per-page metrics: title, h1, page height, horizontal overflow, broken images, console errors. (`node scripts/visual-snapshot.mjs <baseUrl> <outDir> [filter] > out.json`; scroll-through is built in so lazy images load.)
3. **Port in this order** — tokens + global CSS → BaseLayout/header/footer → simple pages → home → About Us → blog collection → gallery/lightbox. Copy text verbatim from the old HTML into `src/data/*`.
4. **Verify** — `npm run build && npm run preview` (:4321), re-run the snapshot script, compare page-by-page side by side (structure, spacing, colors, type, imagery) at both widths; compare metrics (heights within a few %, same titles/h1s, zero broken images, zero console errors, no horizontal overflow). Run `node scripts/interaction-check.mjs <baseUrl>` for keyboard nav, mobile menu, dropdowns, FAQ, carousel and lightbox; spot-check reduced motion manually.
5. **Log deviations** — every intentional visual/behavior change goes in the "Intentional deviations" list below with its reason. Anything else that differs is a bug.
6. **Cleanup** — remove `Caddyfile` after parity (done). Propose (don't apply) the `netlify.toml` switch to `npm run build` / `dist` and deletion of `www/` — pending approval.

## Intentional deviations (Caddy → Astro)
- Inner pages now actually load Inter (they requested `Inter` in CSS but only loaded Lato/Montserrat, so they fell back to system fonts). Fonts are self-hosted.
- Small green text and solid green buttons use `--color-primary-ink` (#467346) for WCAG AA contrast; footer muted text uses `#94a3b8` on the dark footer.
- Mobile menu no longer causes horizontal page scroll (off-canvas panel is hidden with transform/visibility); `Esc` and link taps close it; the hamburger is a real button with `aria-expanded`.
- "Services"/"Appointment" menu parents are buttons (old `href="#"` jumped to the top of the page).
- Broken Instagram icon path replaced with a valid glyph.
- Blog posts gained the shared header (incl. FAQ link + Appointment dropdown) and footer they were missing; empty (0-byte) blog images replaced with a branded cover placeholder until real covers exist.
- FAQ uses native `<details name>` (exclusive accordion, keyboard accessible); answers are no longer clipped at 200px.
- Gallery redesigned as a full-bleed editorial justified-row layout with a lightbox (requested); the doctor portrait leads.
- Skip link, `<main>` landmark, meta descriptions, favicon added.
- Reduced-motion users get static hero/testimonials (no auto-advance, no zoom, no tilt).
- Desktop dropdowns open on hover (with an invisible bridge over the gap — the old menu closed while moving into it) or on click/Enter, close on Esc, outside click, or focus leaving the group.
- Links inside page text are underlined in the ink green (old links were indistinguishable from text). Phone numbers/emails are tap-to-call / mailto links.
- About Us stat numbers use `--color-primary-dark` and labels `--color-text-muted` on their white cards (old sage/light-grey failed contrast); the "15+ years" badge uses the ink green.
- Footer column headings are `<h2>` (were `<h4>`, skipping levels) with identical styling; stats use `<dl>`.
- The homepage hero only advances to a slide once its photo has loaded, and pauses in background tabs.
- A branded `404.html` page exists.
- Header shrink no longer bounces the page (bug inherited from the old site: a single 50px threshold + scroll anchoring made
  scrollY jump backwards 7–11 times on trackpad scrolls). Now: shrink at >80px, expand at <20px, and
  `overflow-anchor: none` on `html`. Guarded by a check in `scripts/interaction-check.mjs`.

## Verified results (Oct 2026, local build)
- Parity: 15 pages × 2 viewports, identical `<title>` and `<h1>`, heights within ~5% (gallery redesigned; blog posts gained a footer), 0 broken images, 0 console errors, 0 horizontal overflow (old site overflowed on every mobile page).
- Interactions: 28/28 checks pass (incl. header no-bounce).
- Mobile (throttled 1.6 Mbps, 150 ms RTT, 4× CPU): LCP home 2.09 s → 1.25 s, About Us 1.94 s → 0.87 s, Locations 14.1 s → 1.6 s (2.8 MB → 192 KB), FAQ 0.97 s → 0.78 s, Gallery 1.30 s → 1.44 s (sharper first image); CLS 0 everywhere.
