const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

/** True when the visitor asked the OS to minimise motion. Check it before any auto-play, zoom, or tilt. */
export const prefersReducedMotion = (): boolean => window.matchMedia(reducedMotionQuery).matches;

/** Runs `callback` at most once per animation frame - for scroll/resize handlers. */
export function onFrame(callback: () => void): () => void {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      callback();
    });
  };
}
