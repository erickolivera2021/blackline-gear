/* ═══════════════════════════════════════
   BLACKLINE GEAR — Main App JS
═══════════════════════════════════════ */

// ─── NAV SCROLL ───
const nav = document.getElementById('nav');
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  if (scrollProgress) {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
  }
});

// ─── MOBILE MENU ───
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
function toggleMobile(open) {
  if (burger) burger.classList.toggle('open', open);
  if (mobileMenu) mobileMenu.classList.toggle('open', open);
  if (mobileOverlay) mobileOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
if (burger) burger.addEventListener('click', () => toggleMobile(!mobileMenu.classList.contains('open')));
if (mobileOverlay) mobileOverlay.addEventListener('click', () => toggleMobile(false));
document.querySelectorAll('.mobile-menu-links a').forEach(a => a.addEventListener('click', () => toggleMobile(false)));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length <= 1) return;
    const t = document.querySelector(href);
    if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); }
  });
});

// ═══════════════════════════════════════
// ─── RENDER DYNAMIC CONTENT (FIRST!) ───
// ═══════════════════════════════════════

// Products grid (home)
const productsGrid = document.getElementById('productsGrid');
if (productsGrid && typeof PRODUCTS !== 'undefined') {
  productsGrid.innerHTML = PRODUCTS.filter(p => p.active).map(p => `
    <article class="prod-card">
      ${p.badge ? `<span class="prod-card-tag">${p.badge}</span>` : ''}
      <a href="${p.page}" class="prod-card-img">
        <img src="${p.image}" alt="${p.name}" width="1024" height="1024" loading="lazy" />
        <div class="prod-card-actions">
          <button data-wish="${p.id}" title="Desejos"><i class="far fa-heart"></i></button>
          <a href="${p.page}" title="Ver detalhes"><i class="fas fa-eye"></i></a>
          <button class="add-to-cart" data-id="${p.id}" title="Carrinho"><i class="fas fa-shopping-bag"></i></button>
        </div>
      </a>
      <div class="prod-card-body">
        <span class="prod-card-cat">${p.category}</span>
        <h3 class="prod-card-name"><a href="${p.page}">${p.shortName}</a></h3>
        <div class="prod-card-bottom">
          <span class="prod-card-price">${formatPrice(p.price)}</span>
          <span class="stars">${'★'.repeat(p.rating)}</span>
        </div>
      </div>
    </article>
  `).join('');
}

// Gallery (home)
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid && typeof PRODUCTS !== 'undefined') {
  const allImages = [];
  PRODUCTS.forEach(p => p.gallery.forEach(img => { if (!allImages.includes(img)) allImages.push(img); }));
  galleryGrid.innerHTML = allImages.map(img => `
    <button class="gallery-item" data-src="${img}" type="button">
      <img src="${img}" alt="Produto Blackline" width="1024" height="1024" loading="lazy" />
      <div class="zoom"><i class="fas fa-magnifying-glass-plus"></i></div>
    </button>
  `).join('');
}

// Reviews (home)
const depoGrid = document.getElementById('depoGrid');
if (depoGrid && typeof REVIEWS !== 'undefined') {
  depoGrid.innerHTML = REVIEWS.slice(0, 3).map(r => `
    <div class="depo-card">
      <div class="stars">${'★'.repeat(r.rating)}</div>
      <p>"${r.text}"</p>
      <div class="depo-author">
        <div class="avatar">${r.initials}</div>
        <div><strong>${r.author}</strong><span>${r.city}</span></div>
      </div>
    </div>
  `).join('');
}

// ─── REVEAL ON SCROLL (AFTER rendering) ───
const revealEls = document.querySelectorAll('.section-header, .prod-card, .tech-card, .depo-card, .spec-card, .step, .gallery-item, .compare-table, .benefit, .accordion-item');
revealEls.forEach(el => el.classList.add('reveal'));
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => e.target.classList.add('in'), i * 50); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// Safety net: if any reveal element didn't get .in after 2.5s, force visible
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.in)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('in');
  });
}, 2500);

// ═══════════════════════════════════════
// ─── CART SYSTEM ───
// ═══════════════════════════════════════
const CART_KEY = 'bl_cart';
const WISH_KEY = 'bl_wishlist';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
let wishlist = JSON.parse(localStorage.getItem(WISH_KEY) || '[]');

const $cartDrawer = document.getElementById('cartDrawer');
const $cartOverlay = document.getElementById('cartOverlay');
const $cartItems = document.getElementById('cartItems');
const $cartEmpty = document.getElementById('cartEmpty');
const $cartFoot = document.getElementById('cartFoot');
const $cartHeadCount = document.getElementById('cartHeadCount');
const $cartSubtotal = document.getElementById('cartSubtotal');
const $cartTotal = document.getElementById('cartTotal');
const $cartInstallments = document.getElementById('cartInstallments');
const $toast = document.getElementById('toast');
const $toastMsg = document.getElementById('toastMsg');

function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }
function saveWish() { localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)); updateWishBadge(); }

function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.nav-cart-count, #cartCount').forEach(el => { el.textContent = total; });
  if ($cartHeadCount) $cartHeadCount.textContent = `(${total})`;
}

function updateWishBadge() {
  document.querySelectorAll('.nav-wish-count').forEach(el => {
    el.textContent = wishlist.length;
    el.style.display = wishlist.length > 0 ? '' : 'none';
  });
}

function renderCart() {
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  updateCartBadge();
  if (!cart.length) {
    if ($cartEmpty) $cartEmpty.style.display = '';
    if ($cartItems) $cartItems.innerHTML = '';
    if ($cartFoot) $cartFoot.classList.remove('show');
    return;
  }
  if ($cartEmpty) $cartEmpty.style.display = 'none';
  if ($cartFoot) $cartFoot.classList.add('show');
  if ($cartItems) $cartItems.innerHTML = cart.map(i => `
    <li class="cart-item" data-id="${i.id}">
      <div class="cart-item-img"><img src="${i.image}" alt="${i.name}" /></div>
      <div class="cart-item-info">
        <span class="cart-item-name">${i.name}</span>
        <span class="cart-item-price">${formatPrice(i.price)}</span>
        <div class="qty"><button data-act="dec" aria-label="Diminuir"><i class="fas fa-minus"></i></button><span>${i.qty}</span><button data-act="inc" aria-label="Aumentar"><i class="fas fa-plus"></i></button></div>
      </div>
      <button class="cart-item-remove" data-act="rm" aria-label="Remover"><i class="fas fa-trash"></i></button>
    </li>
  `).join('');
  if ($cartSubtotal) $cartSubtotal.textContent = formatPrice(sub);
  if ($cartTotal) $cartTotal.textContent = formatPrice(sub);
  if ($cartInstallments) $cartInstallments.innerHTML = `ou 12x de <strong>${formatPrice(sub/12)}</strong> sem juros`;
}

function addToCart(id, qty = 1) {
  const p = getProduct(id); if (!p) return;
  const exist = cart.find(i => i.id === id);
  if (exist) exist.qty += qty;
  else cart.push({ id: p.id, name: p.shortName, price: p.price, image: p.image, qty });
  saveCart(); renderCart();
  showToast(`${p.shortName} adicionado!`);
  if (typeof window.openCartOnAdd === 'undefined' || window.openCartOnAdd !== false) {
    setTimeout(openCart, 300);
  }
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
  showToast('Carrinho esvaziado');
}

function openCart() {
  if ($cartDrawer) $cartDrawer.classList.add('open');
  if ($cartOverlay) $cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  if ($cartDrawer) $cartDrawer.classList.remove('open');
  if ($cartOverlay) $cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── WISHLIST ───
function toggleWish(id) {
  const p = getProduct(id); if (!p) return;
  const idx = wishlist.findIndex(w => w === id);
  if (idx >= 0) {
    wishlist.splice(idx, 1);
    showToast(`${p.shortName} removido dos desejos`);
  } else {
    wishlist.push(id);
    showToast(`${p.shortName} adicionado aos desejos`);
  }
  saveWish();
  updateWishlistButtons();
}

function updateWishlistButtons() {
  document.querySelectorAll('[data-wish]').forEach(btn => {
    const id = btn.dataset.wish;
    const isFav = wishlist.includes(id);
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isFav ? 'fas fa-heart' : 'far fa-heart';
      if (isFav) icon.style.color = 'var(--danger)';
      else icon.style.color = '';
    }
    btn.classList.toggle('active', isFav);
  });
}

function showToast(msg) {
  if (!$toast || !$toastMsg) return;
  $toastMsg.textContent = msg;
  $toast.classList.add('show');
  clearTimeout(window._tt); window._tt = setTimeout(() => $toast.classList.remove('show'), 2500);
}

// Bind add-to-cart (event delegation for dynamic content)
document.addEventListener('click', e => {
  const cartBtn = e.target.closest('.add-to-cart');
  if (cartBtn) {
    e.preventDefault();
    const qty = parseInt(cartBtn.dataset.qty) || 1;
    addToCart(cartBtn.dataset.id, qty);
    return;
  }
  const wishBtn = e.target.closest('[data-wish]');
  if (wishBtn) {
    e.preventDefault();
    toggleWish(wishBtn.dataset.wish);
    return;
  }
});

// Cart controls
document.getElementById('openCart')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
$cartOverlay?.addEventListener('click', closeCart);
document.getElementById('cartContinue')?.addEventListener('click', closeCart);
document.getElementById('cartContinueLink')?.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeCart(); closeLightbox(); toggleMobile(false); } });

if ($cartItems) $cartItems.addEventListener('click', e => {
  const btn = e.target.closest('button'); if (!btn) return;
  const id = btn.closest('.cart-item')?.dataset.id;
  const act = btn.dataset.act;
  if (act === 'inc') { const i = cart.find(x => x.id === id); if (i) i.qty++; }
  else if (act === 'dec') { const i = cart.find(x => x.id === id); if (i) { i.qty--; if (i.qty <= 0) cart = cart.filter(x => x.id !== id); } }
  else if (act === 'rm') { cart = cart.filter(x => x.id !== id); }
  saveCart(); renderCart();
});

// Initial render — runs on every page load
updateCartBadge();
updateWishBadge();
renderCart();
updateWishlistButtons();

// ═══════════════════════════════════════
// ─── LIGHTBOX ───
// ═══════════════════════════════════════
const $lightbox = document.getElementById('lightbox');
const $lightboxImg = document.getElementById('lightboxImg');
function openLightbox(src) {
  if (!$lightbox || !$lightboxImg) return;
  $lightboxImg.src = src; $lightbox.classList.add('open'); document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!$lightbox) return;
  $lightbox.classList.remove('open'); document.body.style.overflow = '';
}
document.addEventListener('click', e => {
  const item = e.target.closest('.gallery-item');
  if (item) { e.preventDefault(); openLightbox(item.dataset.src); }
});
document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
$lightbox?.addEventListener('click', e => { if (e.target === $lightbox) closeLightbox(); });

// ─── COOKIE BANNER ───
const $cookie = document.getElementById('cookieBanner');
if ($cookie && localStorage.getItem('bl_cookies')) $cookie.classList.add('hide');
document.getElementById('cookieAccept')?.addEventListener('click', () => { localStorage.setItem('bl_cookies', '1'); $cookie?.classList.add('hide'); });
document.getElementById('cookieDeny')?.addEventListener('click', () => { localStorage.setItem('bl_cookies', '0'); $cookie?.classList.add('hide'); });

// ─── NEWSLETTER ───
document.getElementById('newsForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.querySelector('input[type=email]').value;
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    showToast('Email inválido');
    return;
  }
  const btn = e.target.querySelector('button');
  if (btn) btn.innerHTML = '<i class="fas fa-check"></i> INSCRITO!';
  showToast('Email cadastrado com sucesso!');
});

// ─── RECENTLY VIEWED ───
function trackProductView(id) {
  let recent = JSON.parse(localStorage.getItem('bl_recent') || '[]');
  recent = recent.filter(r => r !== id);
  recent.unshift(id);
  recent = recent.slice(0, 5);
  localStorage.setItem('bl_recent', JSON.stringify(recent));
}
