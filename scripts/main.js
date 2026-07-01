/* ===========================================================================
   Hausmeister Scherer — interactions
   Vanilla JS, no build step.
   =========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  // ---------- Nav scroll state ----------
  const nav = document.querySelector('.nav');
  const setNavState = () => {
    if (!nav) return;
    if (window.scrollY > 32) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  // ---------- Mobile menu ----------
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    const toggle = () => {
      burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');
      document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
    };
    burger.addEventListener('click', toggle);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) toggle();
    }));
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay');
          if (delay) entry.target.style.setProperty('--reveal-delay', delay + 'ms');
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-revealed'));
  }

  // ---------- Scroll-transition showpiece ----------
  const stage = document.querySelector('.scroll-stage');
  const stageImage = document.querySelector('.scroll-stage__image');
  if (stage && stageImage) {
    let frame = null;
    const update = () => {
      const rect = stage.getBoundingClientRect();
      const stageH = stage.offsetHeight;
      const viewH = window.innerHeight;
      const range = Math.max(stageH - viewH, 1);
      const raw = Math.min(Math.max(-rect.top, 0), range) / range;

      // Compress the growth into the first ~55% of the pinned scroll so the
      // image is fully full-bleed well before the next section appears.
      const grow = Math.min(raw / 0.55, 1);

      // width: 50vw → 100vw
      const w = 50 + grow * 50;
      // height: 65vh → 100vh
      const h = 65 + grow * 35;
      // radius: 28 → 0
      const r = 28 * (1 - grow);

      stageImage.style.width = w + 'vw';
      stageImage.style.height = h + 'vh';
      stageImage.style.borderRadius = r + 'px';

      // Quote fades in once the image is essentially full.
      if (grow >= 0.95) stage.classList.add('is-full');
      else stage.classList.remove('is-full');

      frame = null;
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  // ---------- Smooth scroll for in-page anchors ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---------- Contact form (no backend, friendly fake) ----------
  const form = document.querySelector('.form');
  const status = document.querySelector('.form__status');
  if (form && status) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      status.classList.remove('is-success', 'is-error', 'is-visible');

      if (!name || !email || !message) {
        status.textContent = 'Bitte alle Pflichtfelder ausfüllen.';
        status.classList.add('is-error', 'is-visible');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = 'Bitte eine gültige E-Mail-Adresse eingeben.';
        status.classList.add('is-error', 'is-visible');
        return;
      }

      status.textContent = 'Vielen Dank — Ihre Nachricht ist auf dem Weg. Ich melde mich zeitnah.';
      status.classList.add('is-success', 'is-visible');
      form.reset();
    });
  }

  // ---------- Footer year ----------
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
