---
name: rivaansh-component-architecture
description: Structure of the Rivaansh ENT Astro codebase — the four-destination information architecture, where layouts, components, page data, content collections (conditions, health tips), client scripts and styles live, draft/preview publishing, URLs and redirects, and how to add a condition, tip, page or nav item. Use before creating or moving any file in src/.
---

# Rivaansh ENT — Component Architecture

Static Astro site (`astro build` → plain HTML in `dist/`, built and hosted by Netlify). No server, no CMS. Content is data
in TypeScript/Markdown; markup is components; style is tokens. Page structure was decided in
`docs/site-restructure-plan.md` — read it before changing navigation or adding pages.

## Information architecture
Four plain destinations, **no dropdowns**: **Treatments · Doctor & Clinic · Visit Us · Health Tips** (+ Book
Appointment button). Health Tips is hidden from menus until at least one tip is published. Secondary pages: Book,
Before & After Surgery. Phones get a "Menu" drawer and a bottom Call · WhatsApp/Directions · Book bar.
Grouped menus are only reconsidered at the plan's thresholds (second doctor, confirmed second branch, >25 conditions,
or >40 articles).

## Map

```
src/
  config/
    site.ts            clinic facts: name, doctor, phones, WhatsApp (null until staffed), address, hours, helpers
    navigation.ts      routes, mainNav (4 links), secondaryNav, conditionHref(), tipHref(), sectionOf()
  content.config.ts    collections: conditions + blog (Health Tips); shared review fields (draft, reviewedBy, reviewedDate)
  content/
    conditions/*.md    one condition page each → /pages/ent/<slug>.html
    blog/*.md          one health tip each → /pages/blog/<slug>.html (blog2 keeps its legacy slug)
  data/                page data, each file names its owner-content folder
    home.ts  treatments.ts (hub groups, procedures, urgent)  doctor-clinic.ts  visit.ts (first visit, FAQ)
    book.ts  care.ts  collections.ts (getConditions/getTips/showDrafts/reviewLine)
  assets/images/       optimizable photos (see rivaansh-media-presentation)
  layouts/
    BaseLayout.astro   head (meta, noindex, MedicalClinic JSON-LD), skip link, header, main, footer, ActionBar
    PageLayout.astro   BaseLayout + the 960px `.page-container` column
  components/
    layout/      SiteHeader (utility strip + fixed-height header + <dialog> drawer), SiteFooter, ActionBar, TodayHours
    home/        HomeHero (still photo, static overlay)
    treatments/  ConditionGroups (chips | list — links only to published conditions)
    doctor/      DoctorCard (feature | mini)
    visit/       LocationCard, HoursTable
    ui/          Button, ContactActions, Icon, FaqAccordion (<details name>), StepList
    media/       MediaImage, MediaGallery (balanced justified rows), LightboxItem, VideoPlayer, photo-sizes.ts, types.ts
    blog/        PostCard, PostCover
    forms/       FormField, AppointmentForm, ContactForm — not used until forms can deliver (Phase 2)
  scripts/  motion.ts, reveal.ts, lightbox.ts
  styles/   tokens.css + global.css (reset, type, buttons, .section/.section-title utilities, prose, draft banner)
  pages/    index, 404, pages/{ent,about-us,contact,appointment,care,blog}.astro, pages/ent/[slug], pages/blog/[slug]
```

## Drafts & review (medical content)
- Every condition and tip has `draft: true` until the doctor approves it; then set `draft: false`, `reviewedBy`,
  `reviewedDate` — the page shows "Reviewed by … · Last reviewed …".
- `showDrafts` (src/data/collections.ts) is true in `npm run dev` and when `SHOW_DRAFTS=true` — set in `netlify.toml`
  for deploy previews and branch deploys. Draft pages render a yellow "Draft" banner and `noindex`. Production never
  builds drafts.
- Unpublished conditions appear on the hub and homepage as plain text, never as links.

## URLs and redirects
- `build.format: 'file'` → `src/pages/pages/contact.astro` outputs `/pages/contact.html` (Netlify also serves `/pages/contact`).
- Kept URLs: `/`, `/pages/{ent,about-us,contact,appointment,care,blog}.html`, `/pages/blog/blog2.html`.
- Retired URLs 301 in `netlify.toml` (both `.html` and extensionless): about, specialities, surgeries (→ ent#procedures),
  gallery (→ about-us#clinic), locations, faq (→ contact#faq), online-consultation, blog1 (→ ent#ear), blog3 (→ ent#nose).
  blog2 → blog.html is a non-forced 302 until the tip is published (Netlify serves the real file once it exists).
- Never re-create a file at a redirected path (Netlify "shadowing" would silently disable the redirect).
- Anchors used by redirects must stay: `#ear #nose #throat #head-neck #children #urgent #procedures` (hub), `#clinic`
  (about-us), `#faq #timings #first-visit` (contact).
- In-site links come from `navigation.ts` helpers, never hand-written relative paths.

## Components
- One responsibility per component; typed `interface Props`; scoped styles using tokens only.
- Client behaviour in a `<script>` inside the component that needs it; pages must work without JS (drawer falls back to
  the footer link list, hours fall back to the weekly schedule, gallery falls back to CSS rows).
- Real `<button>`/`<a>`/`<dialog>`/`<details>` elements; visible focus; respect reduced motion.
- The header has ONE height (no shrink-on-scroll) and a solid background (no backdrop blur) — both caused scroll jank.

## Content & data
- Copy, numbers, image imports and alt text live in `src/data/*` or collection markdown — not in `.astro` markup.
- Facts used on several pages come only from `src/config/site.ts`.
- Mark unverified content with `PLACEHOLDER` (TS comment or `<!-- PLACEHOLDER: … -->` in markdown);
  `grep -rn PLACEHOLDER src` lists what still needs the owner.
- Compliance (NMC): facts only — no superlatives, testimonials, unverifiable stats, guarantees. See the plan §7.

## Recipes
- **New condition:** copy a file in `src/content/conditions/`, keep the heading structure (What it is · Common symptoms ·
  When to see a doctor › When it's urgent · What happens at your visit · Treatment options › procedure headings ·
  If you need a procedure · Questions patients ask), set `area`, `procedures` anchors = heading ids, `draft: true`;
  add/link the item in `src/data/treatments.ts`.
- **New health tip:** add `src/content/blog/<slug>.md` with `relatedConditions`, `draft: true`.
- **New page:** only after updating the plan; data file + `src/pages/pages/<name>.astro` with `PageLayout`; link it from
  `navigation.ts` (secondaryNav or footer), not as a new top-level item.

## Commands
`npm run dev` (live reload; shows drafts) · `npm run build` · `npm run preview` · `npm run check`
Regression checks with a preview running: `node scripts/interaction-check.mjs <url>` (nav, drawer, action bar,
header stability, lightbox, FAQ, broken-link crawl) and `node scripts/visual-snapshot.mjs <url> <dir> > out.json`.
Drafts build: `SHOW_DRAFTS=true npx astro build --outDir /tmp/drafts`.
If `npm run dev` shows "Outdated Optimize Dep" (504) after dependency changes, restart it.
