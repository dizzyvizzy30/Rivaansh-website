# Rivaansh ENT, Head & Neck Centre — website

Static site built with [Astro](https://astro.build) and hosted on Netlify (Netlify builds it from GitHub; there is no
server to run or pay for). Structure: **Treatments · Doctor & Clinic · Visit Us · Health Tips** — see
`docs/site-restructure-plan.md`.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (Node 22.12+) |
| `npm run dev` | Local preview with live reload at http://localhost:4321 — **shows draft pages** |
| `npm run build` | Build the live site into `dist/` (drafts excluded; photos converted to WebP) |
| `npm run preview` | Serve the built `dist/` locally — use this to judge real speed |
| `npm run check` | Type-check components and content |
| `npm run test:interactions` | Browser checks (needs `preview` running + Google Chrome): nav, menu drawer, phone bar, header stability, lightbox, FAQ, broken links |
| `npm run test:snapshot` | Desktop + mobile screenshots/metrics into `.snapshots/` |

## Where things are

- **Clinic name, phone, WhatsApp, address, hours:** `src/config/site.ts` (used on every page)
- **Menu:** `src/config/navigation.ts` — four destinations, no dropdowns
- **Condition pages:** `src/content/conditions/*.md` · **Health tips:** `src/content/blog/*.md`
- **Other page content:** `src/data/*.ts` · photos in `src/assets/images/`
- **Design tokens:** `src/styles/tokens.css`
- **Still-to-confirm content:** `grep -rn PLACEHOLDER src`

## Drafts and review

Medical pages start as `draft: true`. They appear in `npm run dev` and on Netlify **deploy preview** links (with a
"Draft" banner) but never on the live site. When the doctor approves a page, set `draft: false`, `reviewedBy` and
`reviewedDate` in its frontmatter.

## More

- Playbooks for future work: `.claude/skills/` (design system, media, architecture, migration, owner content)
- Content requests for the clinic: `owner-content/`
- Domain / DNS / email setup: `docs/domain-and-hosting-setup.md`
- Old URLs are redirected in `netlify.toml`.
