/* ============================================================
   main.js — IUTDS Recruitment Site
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Show placeholder if Google Form URL hasn't been set ── */
  const iframe = document.getElementById('google-form-iframe');
  const placeholder = document.getElementById('iframe-placeholder');
  const PLACEHOLDER_SRC = 'YOUR_GOOGLE_FORM_EMBED_LINK_HERE'; // sentinel — do not change this line

  if (iframe && iframe.src.includes(PLACEHOLDER_SRC)) {
    iframe.style.display = 'none';
    placeholder.classList.add('visible');
  }
  // If a real URL is set, ensure the iframe is visible and placeholder stays hidden
  else if (iframe) {
    iframe.style.display = 'block';
    placeholder.classList.remove('visible');
  }


  /* ── 2. Intersection Observer for scroll-reveal animations ── */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  };

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.form-container, .form-header').forEach(el => {
    el.classList.add('reveal-target');
    reveal.observe(el);
  });


  /* ── 2b. Scroll-reveal for Why IUTDS cards ── */
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.why-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
    cardObserver.observe(card);
  });



  /* ── 3. Smooth active-state on CTA button ── */
  const cta = document.getElementById('scroll-cta');
  if (cta) {
    cta.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('form-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }


  /* ── 4. Parallax subtle effect on hero background ── */
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (!heroBg) return;
    const scrollY = window.scrollY;
    heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
  }, { passive: true });

});
