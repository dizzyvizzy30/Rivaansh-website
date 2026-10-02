---
name: rivaansh-design-system
description: Visual identity rules for the Rivaansh ENT website — design tokens (sage-green palette, Inter type, radii, shadows, motion), accessible color pairings, layout widths, breakpoints, and recurring UI patterns. Use before adding or restyling any page, section, or component.
---

# Rivaansh ENT — Design System

The site's identity is a calm, clinical **sage-green + slate** palette, the **Inter** typeface, generous white space, soft rounded cards, pill buttons, and gentle motion. Preserve it. Every value below lives as a CSS custom property in `src/styles/tokens.css`; never hard-code a color, radius, shadow, or duration in a component.

## Tokens (source of truth: `src/styles/tokens.css`)

### Color

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#8fbc8f` | Brand sage. Icons, accent bars, borders, focus rings, decorative fills, **large** text only |
| `--color-primary-dark` | `#6b9e6b` | Large headings (≥24px bold), stat numbers, site title |
| `--color-primary-ink` | `#467346` | **Small green text** and **solid button fills behind white text** (5.5:1 on white) |
| `--color-primary-ink-hover` | `#3f6b3f` | Hover state for solid buttons |
| `--color-primary-light` | `#e8f5e9` | Tints, hover backgrounds, icon chips |
| `--color-text` | `#1e293b` | Body + heading text, dark bands, footer background |
| `--color-text-muted` | `#64748b` | Secondary text on white/`--color-bg-alt` only |
| `--color-text-on-dark-muted` | `#94a3b8` | Secondary text on `--color-text` backgrounds (5.7:1) |
| `--color-bg` | `#ffffff` | Page |
| `--color-bg-alt` | `#f8fafc` | Alternating section bands |
| `--color-border` | `#e2e8f0` | Card borders, dividers |

**Contrast rules (WCAG AA):**
- Normal text needs 4.5:1. `--color-primary` (2.2:1) and `--color-primary-dark` (3.1:1) **fail** for small text on white — use `--color-primary-ink`.
- White text on a green fill → fill must be `--color-primary-ink`.
- On the dark footer/stat band, muted text is `--color-text-on-dark-muted`, never `--color-text-muted` (3.1:1).
- Verify any new pairing with a contrast checker before shipping.

### Typography
- Family: `--font-sans` = Inter Variable (self-hosted via `@fontsource-variable/inter`, no Google Fonts request), system fallbacks.
- Base: 16px / 1.6. Headings weight 700, line-height 1.3, slight negative tracking on display sizes.
- Display: hero title `clamp(2.5rem, 6vw, 4rem)`; section titles `2rem` (1.5rem mobile); page `h1` `2.5em` in `--color-primary-dark`.
- Small caps-style labels: 0.875rem, 600, uppercase, `letter-spacing: 0.05–0.1em`.

### Shape, depth, spacing
- Radii: `--radius-sm 8px`, `--radius-md 12px`, `--radius-lg 16px`, `--radius-xl 20px`, `--radius-full` (pills/avatars).
- Shadows: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, plus `--shadow-brand` (green-tinted hover glow).
- Section rhythm: `4rem 2rem` desktop, `3rem 1rem` (≤768px). Content max widths: `--width-wide 1200px`, `--width-page 960px`, `--width-narrow 800px`, `--width-bleed 1440px`.
- Mobile side gutter is at least 16px; no horizontal page scroll at 320px+.

### Motion
- Easing `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)`, `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`.
- Durations: `--duration-fast 0.2s`, `--duration-base 0.3s`, `--duration-slow 0.6s`.
- Scroll reveals use `data-animate="fade-up|fade-down|fade-left|fade-right|scale-up"` + optional `data-animate-delay="1..5"` (handled globally).
- **Every animation must respect `prefers-reduced-motion: reduce`**: no auto-advancing slideshows/carousels, no Ken Burns zoom, no tilt, reveals shown immediately.

## Breakpoints
`480px` (small phones), `768px` (mobile ↔ desktop nav switch), `1024px` (tablet stacking). Write mobile overrides with `max-width` queries to match existing CSS.

## Recurring patterns (reuse, don't reinvent)
- **Pill button** — `.btn.btn--primary|--light` (`Button.astro` or `ContactActions.astro` for Call/WhatsApp/Directions/Book).
- **Accent card** — white, 1px border, `--radius-lg`, 4px green gradient bar on the left (condition groups).
- **Section band** utilities — `.section`, `.section--alt`, `.section-inner`, `.section-title`, `.section-lede`, `.section-link`.
- Alternate `--color-bg` and `--color-bg-alt` bands down long pages.
- **Header** — utility strip (slate, ≥1024px: today's hours · floor/landmark), then a sticky white header with ONE fixed
  height (72px desktop / 64px mobile), solid background and soft shadow. No shrink-on-scroll, no backdrop blur.
- **Hero** — one still photo (right half on wide screens, full-bleed on phones) under a static slate overlay, white wave
  divider at the bottom. No slideshow, zoom or animated gradient.
- **Action bar (phones)** — fixed bottom bar, three equal 44px pills: Call · WhatsApp (or Directions) · Book (filled).
- **Urgent box** — pale red panel (`#fff5f5` / `#9b1c1c` text) only for emergency warning signs.
- **Draft banner** — pale amber `.draft-banner`, only in preview builds.
- **Editorial media** — see the `rivaansh-media-presentation` skill.

## Do / don't
- Do keep copy factual (Indian medical-ethics rules): no "best", no guaranteed outcomes.
- Don't add new brand colors, fonts, or icon styles without updating this file and `tokens.css`.
- Don't use inline `style=""`; add a class or a token.
- Keep focus visible: `:focus-visible` uses a 3px `--color-primary` outline with 2px offset (global).
