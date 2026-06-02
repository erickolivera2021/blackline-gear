/* BLACKLINE PREMIUM UX JS */

// 01 PRELOADER
function hidePreloader() {
  const pre = document.getElementById('preloader');
  if (pre) pre.classList.add('hide');
  document.body.classList.add('is-ready');
  setTimeout(() => {
    initGSAP();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }, 50);
}
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(hidePreloader, 700);
  else document.body.classList.add('is-ready');
});
setTimeout(() => {
  document.body.classList.add('is-ready');
  const pre = document.getElementById('preloader');
  if (pre) pre.classList.add('hide');
  document.querySelectorAll('.spec-card, .tech-card, .step, .depo-card, .benefit, .gallery-item, .prod-card, .accordion-item, .compare-row, .section-header').forEach(el => {
    if (window.getComputedStyle(el).opacity === '0') {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  });
}, 3500);

// 02 THEME (Dark / Light)
const THEME_KEY = 'bl_theme';
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}
applyTheme(localStorage.getItem(THEME_KEY) || 'dark');
document.addEventListener('click', e => {
  const btn = e.target.closest('.theme-toggle');
  if (!btn) return;
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(cur === 'dark' ? 'light' : 'dark');
});

// 03 RIPPLE
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const r = document.createElement('span');
  r.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  r.style.width = r.style.height = size + 'px';
  r.style.left = (e.clientX - rect.left - size/2) + 'px';
  r.style.top = (e.clientY - rect.top - size/2) + 'px';
  btn.appendChild(r);
  setTimeout(() => r.remove(), 600);
});

// 04 CART PULSE
const _origAddToCart = window.addToCart;
if (typeof _origAddToCart === 'function') {
  window.addToCart = function(id, qty = 1) {
    _origAddToCart(id, qty);
    const cartBtn = document.getElementById('openCart');
    if (cartBtn) {
      cartBtn.classList.remove('pulse');
      void cartBtn.offsetWidth;
      cartBtn.classList.add('pulse');
    }
    document.querySelectorAll('.nav-cart-count').forEach(el => {
      el.classList.remove('bounce');
      void el.offsetWidth;
      el.classList.add('bounce');
    });
  };
}

// 05 MOUSE GLOW
document.addEventListener('mousemove', e => {
  document.querySelectorAll('.prod-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', mx + '%');
    card.style.setProperty('--my', my + '%');
  });
});

// 06 CURSOR GLOW (desktop)
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 1024) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let tx = 0, ty = 0, gx = 0, gy = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  function loop() {
    gx += (tx - gx) * 0.15; gy += (ty - gy) * 0.15;
    glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
    requestAnimationFrame(loop);
  }
  loop();
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .prod-card, .gallery-item')) glow.classList.add('is-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .prod-card, .gallery-item')) glow.classList.remove('is-hover');
  });
}

// 07 BACK TO TOP
(function() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.setAttribute('aria-label', 'Voltar ao topo');
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// 08 GSAP
let gsapInitialized = false;
function initGSAP() {
  if (gsapInitialized) return;
  if (typeof gsap === 'undefined') return;
  gsapInitialized = true;

  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // Hero title — fade up simples (sem quebrar palavras)
  document.querySelectorAll('.hero-title').forEach(title => {
    if (title.dataset.gsap === '1') return;
    title.dataset.gsap = '1';
    gsap.from(title, { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' });
  });

  // Hero content
  if (document.querySelector('.hero-eyebrow')) {
    gsap.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.6 });
  }
  if (document.querySelector('.hero-desc')) {
    gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.7, delay: 0.4 });
  }
  if (document.querySelector('.hero-spec')) {
    gsap.from('.hero-spec', { opacity: 0, y: 24, duration: 0.5, delay: 0.6, stagger: 0.07 });
  }
  if (document.querySelector('.hero-actions')) {
    gsap.from('.hero-actions > *', { opacity: 0, y: 20, duration: 0.5, delay: 0.8, stagger: 0.08 });
  }
  if (document.querySelector('.hero-trust-item')) {
    gsap.from('.hero-trust-item', { opacity: 0, y: 12, duration: 0.4, delay: 0.9, stagger: 0.05 });
  }

  // Hero product
  if (document.querySelector('.hero-product, .hero-product-real')) {
    gsap.from('.hero-product, .hero-product-real', {
      opacity: 0, scale: 0.94, y: 30, duration: 0.9, delay: 0.2, ease: 'power3.out'
    });
  }
  if (document.querySelector('.hero-float')) {
    gsap.from('.hero-float', { opacity: 0, scale: 0.6, duration: 0.6, delay: 0.9, stagger: 0.12, ease: 'back.out(2)' });
  }
  if (document.querySelector('.hero-product-badge, .hero-badge')) {
    gsap.from('.hero-product-badge, .hero-badge', { opacity: 0, x: -30, duration: 0.7, delay: 1.0, ease: 'power3.out' });
  }

  // Parallax
  if (typeof ScrollTrigger !== 'undefined') {
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
      gsap.to(heroGlow, {
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        y: 150, opacity: 0.3
      });
    }
  }

  // Counters
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const obj = { val: 0 };
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.to(obj, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        val: target, duration: 2, ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.floor(obj.val).toLocaleString('pt-BR'); }
      });
    }
  });

  if (typeof ScrollTrigger !== 'undefined') {
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }
}

// 09 IMG FADE
document.querySelectorAll('img').forEach(img => {
  if (img.complete) return;
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease';
  img.addEventListener('load', () => { img.style.opacity = '1'; });
  img.addEventListener('error', () => { img.style.opacity = '1'; });
});
