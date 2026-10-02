---
name: rivaansh-component-architecture
description: Structure of the Rivaansh ENT Astro codebase — where layouts, components, page data, content collections, client scripts, and styles live; URL-preserving routing; how to add a page, section, blog post, or nav item. Use before creating or moving any file in src/.
---

# Rivaansh ENT — Component Architecture

Static Astro site (`astro build` → plain HTML in `dist/`, hosted on Netlify). No server, no CMS. Content is data in TypeScript/Markdown; markup is components; style is tokens.

## Map

```
src/
  config/
    site.ts            clinic-wide facts (name, tagline, phone, email, address, socials, default SEO)
    navigation.ts      header menu + footer link groups (single source for every page)
  data/                one file per page, named like its owner-content folder
    home.ts  about-us.ts  about-clinic-overview.ts  services-ent.ts  services-specialities.ts
    services-surgeries.ts  services-patient-care.ts  appointment-booking.ts
    appointment-online-consultation.ts  gallery.ts  locations.ts  contact.ts  faq.ts
    stats.ts (shared numbers)  blog.ts (sorted post list helper)
  content/blog/*.md    blog posts (Content Collection, schema in src/content.config.ts)
  assets/images/       optimizable photos (see rivaansh-media-presentation)
  layouts/
    BaseLayout.astro   <head>, fonts, global CSS, skip link, header, <main>, footer, optional extras
    PageLayout.astro   BaseLayout + the 960px `.page-container` used by simple inner pages
  components/
    layout/   SiteHeader, SiteFooter, ScrollProgress, FloatingCta
    ui/       Button, Icon, InfoCardGrid, FaqAccordion, StepList
    sections/ StatsBand (variants: cards | dark)
    home/     HeroSlideshow, ServiceColumns, TestimonialSlider, SpecialistGrid
    about/    DoctorHero, FacilityShowcase, VisionMission
    forms/    FormField, AppointmentForm, ContactForm (no backend yet — submissions go nowhere)
    media/    MediaImage, MediaGallery, LightboxItem, VideoPlayer, types.ts (ImageItem | VideoItem)
    blog/     PostCard, PostCover (branded placeholder when a post has no cover)
  scripts/  motion.ts (reduced-motion + rAF helpers), reveal.ts (scroll reveals), lightbox.ts (PhotoSwipe)
  styles/   tokens.css (design tokens) + global.css (reset, base type, buttons, utilities, prose)
  pages/    routes (see URL rules)
```

## URL rules (do not break existing links)
- `build.format: 'file'` in `astro.config.mjs` → `src/pages/pages/about-us.astro` outputs `/pages/about-us.html`. Netlify also serves the extensionless `/pages/about-us`.
- Existing public URLs are frozen: `/`, `/index.html`, `/pages/{about-us,about,appointment,online-consultation,blog,care,contact,ent,faq,gallery,locations,specialities,surgeries}.html`, `/pages/blog/{blog1,blog2,blog3}.html`.
- Renaming a URL requires a 301 in `netlify.toml` and approval first.
- In-site links use root-absolute paths from `navigation.ts`/`site.ts` (`/pages/contact.html`), never `../`.

## Components
- One responsibility per component; props typed with `interface Props`.
- Styles are scoped `<style>` blocks inside the component, using tokens only. Global CSS is only for reset, base typography, buttons, `.page-container` prose, `[data-animate]` reveals, utilities.
- Client behavior lives in a `<script>` inside the component that needs it (Astro bundles and dedupes it). Scripts are progressive enhancements: the page must read and navigate without JS.
- Every interactive control is a real `<button>`/`<a>`, with `aria-expanded`/`aria-controls` for disclosures and visible focus.
- Respect reduced motion in every script (`prefersReducedMotion()` from `src/scripts/motion.ts`).

## Content & data
- Copy, numbers, lists, image imports, and alt text live in `src/data/<page>.ts` — **not** in `.astro` markup — so owner updates are data edits. Each data file starts with a comment naming its `owner-content/` folder.
- Facts shown on several pages (phone, email, address, clinic name) come only from `src/config/site.ts`.
- Mark unverified/stand-in content with a `// PLACEHOLDER:` comment so `grep -rn PLACEHOLDER src` lists what still needs the owner.

## Recipes
- **New simple page**: add `src/data/<name>.ts`, `src/pages/pages/<name>.astro` using `PageLayout` (title + description props), add to `navigation.ts`, add an `owner-content/NN-<name>/` folder.
- **New section on a page**: build a component in the matching folder, feed it from the page's data file.
- **New blog post**: add `src/content/blog/<slug>.md` (frontmatter per `content.config.ts`); cover image in `src/assets/images/blog/`. It appears on `/pages/blog.html` automatically, newest first; the URL is `/pages/blog/<slug>.html`.
- **New nav item**: edit `navigation.ts` only — header and footer update everywhere.

## Commands
`npm run dev` (http://localhost:4321) · `npm run build` · `npm run preview` · `npm run check` (types + Astro diagnostics)

Regression checks (need `npm run build && npm run preview` running; use the local Google Chrome):
- `npm run test:interactions` — lightbox, menus, FAQ, carousel; exits non-zero on failure.
- `npm run test:snapshot` — desktop + mobile full-page screenshots and metrics into `.snapshots/` (git-ignored).
