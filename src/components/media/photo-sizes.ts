// The only photo variants the build generates: WebP at up to three widths. Page images and the
// lightbox use the same settings, so each photo produces ~2–3 files no matter where it appears.
// Rules: .claude/skills/rivaansh-media-presentation/SKILL.md
import type { ImageMetadata } from 'astro';

export const PHOTO_WIDTHS = [480, 960, 1600];
export const PHOTO_FORMAT = 'webp';
export const PHOTO_QUALITY = 80;

/**
 * Widths to generate for a source image: never upscale, never exceed the largest step, and use the
 * source's own width instead of a step that is within 20% of it (e.g. a 1004px photo → 480, 1004).
 */
export function widthsFor(sourceWidth: number, candidates: readonly number[] = PHOTO_WIDTHS): number[] {
  const largest = Math.max(...candidates);
  if (sourceWidth > largest) return [...candidates];
  return [...candidates.filter((w) => w < sourceWidth * 0.8), sourceWidth];
}

/**
 * Read an imported image's width/height/format without marking the full-size original as "used".
 * Any direct property read (image.width) makes Astro copy the multi-MB original into dist/;
 * Astro's `clone` escape hatch returns the same metadata without that side effect.
 */
export function metaOf(image: ImageMetadata): ImageMetadata {
  return (image as ImageMetadata & { clone?: ImageMetadata }).clone ?? image;
}
