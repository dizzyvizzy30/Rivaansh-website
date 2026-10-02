// Lightbox for every [data-lightbox] container (PhotoSwipe 5, loaded on first open).
// Swipe/drag, pinch/double-tap/wheel zoom, ←/→, Esc, focus trap + return, captions,
// deep links (#<gallery>-<n>), and native <video> items.
// Behaviour spec: .claude/skills/rivaansh-media-presentation/SKILL.md → Lightbox
import type PhotoSwipe from 'photoswipe';
import type { SlideData } from 'photoswipe';
import photoswipeCssUrl from 'photoswipe/style.css?url';
import { prefersReducedMotion } from './motion';

type LightboxSlide = SlideData & { caption?: string; videoSrc?: string };

const HASH_PATTERN = /^#([\w-]+)-(\d+)$/;

const itemsOf = (gallery: HTMLElement) =>
  [...gallery.querySelectorAll<HTMLAnchorElement>('a[data-lightbox-item]')];

function toSlide(link: HTMLAnchorElement): LightboxSlide {
  const thumb = link.querySelector('img');
  const common = {
    width: Number(link.dataset.pswpWidth),
    height: Number(link.dataset.pswpHeight),
    alt: thumb?.alt ?? '',
    msrc: thumb?.currentSrc || thumb?.src,
    caption: link.dataset.caption,
    element: link,
  };
  return link.dataset.type === 'video'
    ? { ...common, type: 'video', videoSrc: link.href }
    : { ...common, src: link.href, srcset: link.dataset.pswpSrcset };
}

let active: PhotoSwipe | null = null;

/** Injects PhotoSwipe's stylesheet on first open, so it never blocks page rendering. */
function loadStylesheet(href: string): Promise<void> {
  if (document.querySelector(`link[href="${href}"]`)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.append(link);
  });
}

function pauseVideos(pswp: PhotoSwipe) {
  pswp.element?.querySelectorAll('video').forEach((video) => video.pause());
}

async function open(galleryId: string, links: HTMLAnchorElement[], index: number) {
  if (active) return;
  const [{ default: PhotoSwipeCore }] = await Promise.all([import('photoswipe'), loadStylesheet(photoswipeCssUrl)]);
  const reduced = prefersReducedMotion();

  const pswp = new PhotoSwipeCore({
    dataSource: links.map(toSlide),
    index,
    bgOpacity: 0.94,
    showHideAnimationType: reduced ? 'none' : 'zoom',
    showAnimationDuration: reduced ? 0 : 333,
    hideAnimationDuration: reduced ? 0 : 333,
    zoomAnimationDuration: reduced ? 0 : 333,
    secondaryZoomLevel: 2,
    maxZoomLevel: 4,
    preloaderDelay: 300,
    closeTitle: 'Close (Esc)',
    zoomTitle: 'Zoom',
    arrowPrevTitle: 'Previous (←)',
    arrowNextTitle: 'Next (→)',
    errorMsg: 'This image could not be loaded.',
  });

  // Native video slides.
  pswp.on('contentLoad', (event) => {
    const { content } = event;
    if (content.type !== 'video') return;
    event.preventDefault();
    const data = content.data as LightboxSlide;
    const wrapper = document.createElement('div');
    wrapper.className = 'pswp__content pswp__video-wrap';
    const video = document.createElement('video');
    video.src = data.videoSrc ?? '';
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    if (data.msrc) video.poster = data.msrc;
    video.setAttribute('aria-label', data.alt ?? 'Video');
    // Let the native controls receive pointer events instead of PhotoSwipe's drag/zoom handlers.
    video.addEventListener('pointerdown', (e) => e.stopPropagation());
    wrapper.append(video);
    content.element = wrapper;
  });

  // Visible caption bar.
  pswp.on('uiRegister', () => {
    pswp.ui?.registerElement({
      name: 'caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      onInit: (el, instance) => {
        el.setAttribute('aria-live', 'polite');
        const update = () => {
          const caption = (instance.currSlide?.data as LightboxSlide | undefined)?.caption ?? '';
          el.textContent = caption;
          el.hidden = !caption;
        };
        instance.on('change', update);
        update();
      },
    });
  });

  // Keep the URL shareable: #<gallery>-<n> while open, cleared on close.
  const writeHash = () => history.replaceState(null, '', `#${galleryId}-${pswp.currIndex + 1}`);
  pswp.on('change', () => {
    pauseVideos(pswp);
    writeHash();
  });
  pswp.on('afterInit', writeHash);
  pswp.on('close', () => {
    pauseVideos(pswp);
    history.replaceState(null, '', location.pathname + location.search);
  });
  pswp.on('destroy', () => {
    active = null;
  });

  active = pswp;
  pswp.init();
}

function setup() {
  const galleries = [...document.querySelectorAll<HTMLElement>('[data-lightbox]')];

  galleries.forEach((gallery) => {
    if (gallery.dataset.lightboxReady) return;
    gallery.dataset.lightboxReady = 'true';
    const galleryId = gallery.dataset.lightbox ?? 'gallery';
    gallery.addEventListener('click', (event) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-lightbox-item]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const links = itemsOf(gallery);
      void open(galleryId, links, Math.max(0, links.indexOf(link)));
    });
  });

  // Deep link: /pages/gallery.html#gallery-3 opens the third photo (on load or when the hash changes).
  const openFromHash = () => {
    const match = location.hash.match(HASH_PATTERN);
    if (!match) return;
    const gallery = galleries.find((g) => g.dataset.lightbox === match[1]);
    const links = gallery ? itemsOf(gallery) : [];
    const index = Number(match[2]) - 1;
    if (gallery && links[index]) void open(match[1], links, index);
  };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
}

setup();
