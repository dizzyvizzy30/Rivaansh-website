// Hamburger menu toggle for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger-menu');
  var nav = document.getElementById('main-nav');
  function closeMenuOnResize() {
    if (window.innerWidth > 700) {
      nav.classList.remove('open');
    }
  }
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
    hamburger.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        nav.classList.toggle('open');
      }
    });
    window.addEventListener('resize', closeMenuOnResize);
  }
});

// Simple slideshow script for homepage
window.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slideshow img');
  let current = 0;
  function showSlide(idx) {
    slides.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
  }
  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }
  showSlide(current);
  setInterval(nextSlide, 3500);
});

// ============================================
// SMART HEADER - Scroll Effects
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const scrollThreshold = 50; // pixels before header changes
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const scrollY = window.scrollY;

    if (scrollY > scrollThreshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  // Throttled scroll handler for performance
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateHeader();
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = `${Math.min(progress, 100)}%`;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateProgress();
});

// ============================================
// FLOATING CTA BUTTON
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const floatingCta = document.getElementById('floating-cta');
  const hero = document.querySelector('.hero');

  if (!floatingCta || !hero) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  const isMobile = window.innerWidth <= 768;

  function updateFloatingCta() {
    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;

    // Show after scrolling past hero
    if (scrollY > heroBottom - 200) {
      floatingCta.classList.add('is-visible');

      // On mobile, hide when scrolling down, show when scrolling up
      if (isMobile) {
        if (scrollY > lastScrollY && scrollY > heroBottom) {
          floatingCta.classList.add('is-hidden');
        } else {
          floatingCta.classList.remove('is-hidden');
        }
      }
    } else {
      floatingCta.classList.remove('is-visible');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateFloatingCta);
      ticking = true;
    }
  }, { passive: true });

  // Handle resize
  window.addEventListener('resize', function() {
    // Update mobile check on resize
    window.isMobile = window.innerWidth <= 768;
  });

  // Initial check
  updateFloatingCta();
});

// ============================================
// TESTIMONIAL AUTO-SCROLL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('testimonial-slider');
  const dotsContainer = document.getElementById('testimonial-dots');
  const section = document.querySelector('.testimonial-slider-section');

  if (!slider || !dotsContainer) return;

  const slides = slider.querySelectorAll('.testimonial-slide');
  let currentIndex = 0;
  let autoScrollInterval;
  let isPaused = false;
  const scrollDelay = 4000; // 4 seconds

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    const slide = slides[index];
    const sliderRect = slider.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();

    // Calculate scroll position to center the slide
    const scrollPos = slide.offsetLeft - (sliderRect.width / 2) + (slideRect.width / 2);
    slider.scrollTo({ left: scrollPos, behavior: 'smooth' });

    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }

  function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextSlide, scrollDelay);
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  // Pause on hover
  section.addEventListener('mouseenter', () => {
    isPaused = true;
    section.classList.add('paused');
    stopAutoScroll();
  });

  section.addEventListener('mouseleave', () => {
    isPaused = false;
    section.classList.remove('paused');
    startAutoScroll();
  });

  // Update dots on manual scroll
  slider.addEventListener('scroll', () => {
    const scrollLeft = slider.scrollLeft;
    const slideWidth = slides[0].offsetWidth + 24; // including gap
    const newIndex = Math.round(scrollLeft / slideWidth);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < slides.length) {
      currentIndex = newIndex;
      updateDots();
    }
  });

  // Start auto-scroll
  startAutoScroll();
});

// ============================================
// 3D TILT EFFECT - Service Cards
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', handleTilt);
    el.addEventListener('mouseleave', resetTilt);
  });

  function handleTilt(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }

  function resetTilt(e) {
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  }
});

// ============================================
// SCROLL ANIMATIONS - Intersection Observer
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // If user prefers reduced motion, show all elements immediately
    animatedElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // Intersection Observer configuration
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px 0px -80px 0px', // trigger slightly before element enters viewport
    threshold: 0.1 // trigger when 10% of element is visible
  };

  // Create the observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to trigger animation
        entry.target.classList.add('is-visible');
        // Stop observing this element (animate only once)
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  animatedElements.forEach(el => observer.observe(el));
});

// ============================================
// FAQ Accordion
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const currentlyActive = document.querySelector('.faq-item.active');
      if (currentlyActive && currentlyActive !== item) {
        currentlyActive.classList.remove('active');
      }
      item.classList.toggle('active');
    });
  });
});