import type { ImageMetadata } from 'astro';

export interface ImageItem {
  kind: 'image';
  src: ImageMetadata;
  /** What is visible in the photo, for screen readers. */
  alt: string;
  /** Optional visible caption (shown in the lightbox). */
  caption?: string;
  /** CSS object-position used when the image is cropped (e.g. 'center 30%' to keep faces). */
  focus?: string;
}

export interface VideoItem {
  kind: 'video';
  /** Path under /public, e.g. '/media/video/clinic-tour.mp4'. */
  src: string;
  /** Still frame shown before playback and as the gallery tile. */
  poster: ImageMetadata;
  /** Describes the video content. */
  alt: string;
  caption?: string;
  focus?: string;
}

export type MediaItem = ImageItem | VideoItem;
