---
name: rivaansh-media-presentation
description: How the Rivaansh ENT site stores, optimizes, lays out, and opens photos and (future) video — astro:assets usage, loading/priority rules, sizes, layout-shift prevention, editorial gallery layouts, and the PhotoSwipe lightbox (swipe, keyboard, zoom, deep links). Use whenever adding, replacing, or presenting images or video.
---

# Rivaansh ENT — Media Presentation

Photography is the strongest asset this clinic has (real procedures, real theatre, real doctor). Present it like an editorial site: large, uncluttered, full-bleed where it earns it, always sharp, never janky.

## Where media lives
- **Optimizable images**: `src/assets/images/<area>/<kebab-case-description>.<ext>` — areas: `brand/`, `clinic/`, `locations/`, `team/`, `blog/`. File names describe the content (`microscope-ear-surgery.jpeg`, not `IMG_2041.jpeg`). Prefix stand-ins with `placeholder-` so they are easy to find and replace.
- **Video (future)**: `public/media/video/<kebab-name>.mp4` (H.264, ≤1080p, ≤15 MB, no audio unless needed) + a poster image in `src/assets/images/...`. Videos are not processed by Astro.
- Never reference `www/` or `public/` for photos — only `src/assets` gets resized/converted.
- Raw owner uploads arrive in `owner-content/` (git-ignored; see `rivaansh-owner-content-intake`). The site never reads
  from there: convert HEIC/huge files with `sips` and copy the chosen file into `src/assets/images/...` with a
  descriptive name.

## Photo slots (where real clinic photos belong)
- Registry: `src/data/photo-slots.ts` — 12 named slots (id, brief, ratio, min size, required/conditional/optional,
  where used, truthful stand-in if any). A photo saved as `src/assets/images/slots/<id>.jpg|jpeg|png|webp` fills the
  slot automatically (import.meta.glob) — no code change.
- `PhotoSlot.astro` renders one slot: real photo → shown; stand-in → shown (preview builds add a "Stand-in" badge);
  empty → preview builds show a dashed amber "Photo needed: <id>" frame, the live site renders nothing.
- `SlotGallery.astro` renders a set of slots as a lightbox grid (`minLive`, `realOnly`, `limit`, `columns`).
- Preview-only shot list: `/pages/photos-needed.html` (also lists missing facts).
- Never use a stand-in that implies something unconfirmed (e.g. theatre photos as "the clinic").

## Rendering images
Always use `src/components/media/MediaImage.astro` (a thin wrapper over `astro:assets` `<Image>`), never a raw `<img>` for photos.

- **WebP only, quality 80, at most three widths: 480 / 960 / 1600** — defined once in `src/components/media/photo-sizes.ts`
  (`PHOTO_WIDTHS`, `widthsFor()`). A source narrower than 1600px is used at its own width instead of a step within 20%
  of it (a 1004px photo → 480 + 1004). Result: ~2–3 files per photo, ~300 for 100 photos. AVIF was dropped on purpose:
  ~10× slower to encode and a second file set, for ~20–30% smaller files. Don't add formats or widths without a reason.
- The lightbox uses exactly the same variants (largest = full-screen view), so it adds no files.
- Read dimensions with `metaOf(image)`, never `image.width` directly: any direct property read makes Astro copy the
  multi-MB original into `dist/`.
- Astro never upscales.
- Always pass `alt`. Describe what is visible ("Surgeon examining the ear through an operating microscope"); decorative images use `alt=""`.
- Width/height come from the import, so the browser reserves space → **no layout shift**. When CSS crops (`object-fit: cover`), also set an `aspect-ratio` or fixed height on the container.

### Loading rules
| Situation | Props |
|---|---|
| The single most important above-the-fold image on a page (first hero slide, doctor portrait on About Us) | `priority` → eager + `fetchpriority="high"` |
| Other images visible in the first viewport (later hero slides) | default lazy is fine; they're decoded after the priority image |
| Everything below the fold | default (`loading="lazy"`, `decoding="async"`) |

Only **one** `priority` image per page.

### `sizes` cheat-sheet (match the CSS, or the browser downloads the wrong width)
| Layout | `sizes` |
|---|---|
| Home hero (right half ≥900px, full-bleed on phones) | `100vw` |
| Justified gallery tile | `(max-width: 576px) calc(100vw - 2rem), (max-width: 992px) 60vw, 40vw` |
| Two-column feature (About facility main) | `(max-width: 1024px) 100vw, 560px` |
| Card thumbnail (locations/blog) | `(max-width: 768px) 100vw, 300px` |
| Avatar/portrait 180px | `180px` |

## Layouts
- **Full-bleed band**: break out of the content width with the `.bleed` utility; keep text inside `--width-wide`.
- **Slot grid** (`SlotGallery.astro`): uniform 4:3 crops, full photo in the lightbox — used for the Home clinic grid,
  the Doctor & Clinic tour and #surgery.
- **Justified-row gallery** (`MediaGallery.astro`, kept for larger photo collections such as events): every row fills the width at one shared height and each photo keeps
  its aspect ratio. A small script (in the component) chooses row breaks by minimising squared deviation from
  `--row-height` (320px; 260px ≤992px), so no photo is left alone on the last row; without JS a CSS flex fallback is
  used. Single column ≤576px. `showCaptions` prints captions under tiles; `priorityFirst` when the gallery is the top
  of the page. Used on Home ("The clinic", 4 photos) and Doctor & Clinic (`#clinic`, deep links `#clinic-<n>`); the old
  gallery page redirects there.
- **Narrative scroll** (pattern for future story pages): alternate full-bleed image → short caption block → next image; one idea per screen. Build it as a variant of `MediaGallery` when captioned stories exist — don't hand-roll per page.
- Hover: subtle scale (≤1.05) and shadow; disabled under reduced motion.

## Lightbox (PhotoSwipe 5)
- Any container with `data-lightbox` becomes a gallery; each item is an `<a data-lightbox-item href={fullSizeUrl} data-pswp-width data-pswp-height>` wrapping its thumbnail. Without JS the link still opens the full image (progressive enhancement).
- PhotoSwipe core is **dynamically imported on first open**, and its stylesheet is injected by URL (`photoswipe/style.css?url`) at the same moment — a plain `import('….css')` gets hoisted into the page `<head>` as render-blocking CSS by Astro. Theme overrides live in `LightboxItem.astro` (`<style is:global>`, selector `html .pswp` so they outrank PhotoSwipe's later-loaded CSS).
- Built-in: swipe/drag between items, pinch & double-tap/click zoom, wheel zoom, `←/→` keys, `Esc` to close, focus trap, focus returned to the opener.
- Deep link: opening an item sets `#<gallery-id>-<n>` (1-based); loading a URL with that hash opens that image. Closing clears it.
- Captions come from `data-caption` (falls back to nothing — alt text is for screen readers, not repeated visually).
- Video items: `data-type="video"` + `data-video-src` + poster thumbnail. The lightbox renders a native `<video controls playsinline preload="metadata">`; it pauses on slide change/close.

## Performance budget (mobile, 4G)
- Homepage hero image ≤ 200 KB transferred; any gallery tile ≤ 120 KB.
- No image request before the priority image; no layout shift (CLS ≈ 0).
- Run `npm run build` and check `dist/_astro/*.webp` sizes and count after adding media (no `.jpg/.png` originals
  should appear in `dist/_astro`).
- `npm run dev` converts photos on request and doesn't cache them, so scrolling feels slow there — judge speed with
  `npm run build && npm run preview`.
