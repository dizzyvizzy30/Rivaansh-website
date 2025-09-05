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
