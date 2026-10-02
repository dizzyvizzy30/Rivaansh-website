# Rivaansh ENT Clinic — website

Static site built with [Astro](https://astro.build), hosted on Netlify. No server, no CMS: page content lives in
`src/data/*.ts` and `src/content/blog/*.md`.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22.12+) |
| `npm run dev` | Local preview with live reload at http://localhost:4321 (photos convert on demand, so scrolling is slower here) |
| `npm run build` | Build the site into `dist/` (photos converted to WebP, ≤3 sizes each) |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check components and content |
| `npm run test:interactions` | Browser checks for lightbox, menus, FAQ, carousel (needs `preview` running + Google Chrome) |
| `npm run test:snapshot` | Desktop + mobile screenshots/metrics into `.snapshots/` |

## Where things are

- **Clinic name, phone, email, address:** `src/config/site.ts` (used on every page)
- **Menu and footer links:** `src/config/navigation.ts`
- **Page text and photos:** `src/data/<page>.ts` → photos in `src/assets/images/`
- **Blog posts:** `src/content/blog/*.md`
- **Design tokens (colors, type, spacing):** `src/styles/tokens.css`
- **Still-to-confirm content:** `grep -rn PLACEHOLDER src`

Project playbooks for future work (design system, media, architecture, migration, owner content) are in
`.claude/skills/`. Content requests for the clinic owner are in `owner-content/`. Domain/hosting setup steps are in
`docs/domain-and-hosting-setup.md`.

## Status

The previous plain-HTML version is still in `www/` because Netlify publishes that folder until `netlify.toml` is switched
to build Astro (`npm run build` → `dist`). See `docs/domain-and-hosting-setup.md`.
