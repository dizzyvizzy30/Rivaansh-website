// Scroll-reveal for any element with `data-animate` (styles in global.css). Animates each element once.
import { prefersReducedMotion } from './motion';

const elements = document.querySelectorAll<HTMLElement>('[data-animate]');

if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
  elements.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -80px 0px', threshold: 0.1 },
  );
  elements.forEach((el) => observer.observe(el));
}
