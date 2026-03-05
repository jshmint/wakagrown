/* ============================================================
   WakaGrown — script.js
   Age gate · Nav · Carousel · Strain grid · Lightbox ·
   Accordion · Contact · Cart · Scroll reveal · Back-to-top
   ============================================================ */

'use strict';

/* ── HELPERS ─────────────────────────────────────────────────── */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

/* ── STRAIN DATA (28 cultivars) ──────────────────────────────── */
// prices: { '7g': X, '14g': Y, '28g': Z }
const STRAINS = [
  // GAS
  { id: 1,  name: 'Red Katanaz',       cat: 'gas',    thc: '29–33%', prices: { '7g': 195, '14g': 360, '28g': 660 }, terps: ['Caryophyllene','Myrcene','Limonene'],     desc: 'A signature gas cultivar delivering fuel-forward aromatics with a sharp, chassis-rattling exhale. Dense nugs, gassy nose, zero fluff.' },
  { id: 2,  name: 'White Truffle Gas', cat: 'gas',    thc: '26–30%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Myrcene','Caryophyllene','Linalool'],     desc: 'Earth, musk, and petrol collide in one of the most complex gas profiles in the catalog. Heavy and grounding — the room knows.' },
  { id: 3,  name: 'Jet Fuel Gelato',   cat: 'gas',    thc: '27–31%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Caryophyllene','Terpinolene'], desc: 'Sharp jet-fuel bite smoothed out by a creamy Gelato finish. Loud on the break, long on the exhale. A crowd favorite for good reason.' },
  { id: 4,  name: 'Garlic Cookies',    cat: 'gas',    thc: '25–29%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Myrcene','Caryophyllene','Ocimene'],      desc: 'Savory garlic funk with a biscotti back note. One of the most polarizing and respected aromas in the catalog — not for the faint of nose.' },
  { id: 5,  name: 'Stardawg',          cat: 'gas',    thc: '24–28%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Caryophyllene','Myrcene','Pinene'],       desc: 'Old-school Chemdawg lineage brought forward with clean cultivation. Classic diesel star pattern, crystalline coverage, timeless.' },
  { id: 6,  name: 'Sour Diesel OG',    cat: 'gas',    thc: '25–29%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Limonene','Myrcene','Caryophyllene'],    desc: 'East Coast fuel meets West Coast OG structure. Cerebral and sharp. One of the most copied and least-matched profiles going.' },
  { id: 7,  name: 'Biscotti Gas',      cat: 'gas',    thc: '26–30%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Caryophyllene','Limonene','Linalool'],   desc: 'Baked cookie dough laced with a gassy exhale. The cross delivers depth that neither parent achieves on their own.' },
  { id: 8,  name: 'Zkittlez Gas',      cat: 'gas',    thc: '23–27%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Myrcene','Limonene','Caryophyllene'],    desc: 'Gas lineage crossed with Zkittlez sweetness to create a hybrid profile that hits fruity on the nose and fuel on the back.' },
  // CANDY
  { id: 9,  name: 'Banana Jealousy',   cat: 'candy',  thc: '28–32%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Myrcene','Limonene','Linalool'],         desc: 'Banana Cream meets Jealousy for one of the most dessert-forward profiles in the run. Cream, banana, and sweet funk — incredibly smooth.' },
  { id: 10, name: 'Runtz',             cat: 'candy',  thc: '24–28%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Caryophyllene','Linalool'],   desc: 'Grape candy meets tropical fruit in the strain that defined a generation. Our pheno runs tight, dense, and true to its lineage.' },
  { id: 11, name: 'Candy Rain',        cat: 'candy',  thc: '25–29%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Linalool','Limonene','Myrcene'],         desc: 'London Poundcake x Grape Gasoline. Sweet rain on a warm night — tropical fruit, floral undertone, sugar-dusted finish.' },
  { id: 12, name: 'Peach Ringz',       cat: 'candy',  thc: '23–27%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Myrcene','Limonene','Ocimene'],          desc: 'Exactly what it promises. Peachy candy aroma with a light, airy structure. Bright and clean, perfect for those who ride candy profiles.' },
  { id: 13, name: 'Gushers',           cat: 'candy',  thc: '22–26%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Myrcene','Caryophyllene'],    desc: 'Tropical Zkittlez x Gelato #41. Candy-coated gassy punch with a juicy, fruity core. One of the best crossover strains in recent memory.' },
  { id: 14, name: 'Punch Breath',      cat: 'candy',  thc: '24–28%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Linalool','Myrcene','Caryophyllene'],    desc: 'Purple Punch x Mendo Breath. Grape punch sweetness with a heavy, doughy exhale. The calming candy pick in the catalog.' },
  { id: 15, name: 'Cotton Candy Kush', cat: 'candy',  thc: '21–25%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Linalool','Limonene','Terpinolene'],     desc: 'Light, airy sweetness with a Kush backbone. Cotton candy aroma that makes it immediately approachable — deceptively potent.' },
  // OG
  { id: 16, name: 'Venuz #4',          cat: 'og',     thc: '27–31%', prices: { '7g': 195, '14g': 360, '28g': 660 }, terps: ['Myrcene','Caryophyllene','Linalool'],    desc: 'Our most sought-after OG pheno. Lemon-pine nose with a classic earthen foundation. Dense, trichome-packed, and true to its lineage in every run.' },
  { id: 17, name: 'OG Kush',           cat: 'og',     thc: '22–26%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Myrcene','Limonene','Caryophyllene'],    desc: 'The gold standard. Run properly, it is still one of the most complex and nuanced profiles in existence. Our cut does it justice.' },
  { id: 18, name: 'Larry OG',          cat: 'og',     thc: '24–28%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Limonene','Myrcene','Pinene'],           desc: 'SFV OG x OG Kush. Lemon-citrus forward with a soft earthy close. One of the most balanced OG expressions available.' },
  { id: 19, name: 'Ghost OG',          cat: 'og',     thc: '25–29%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Caryophyllene','Myrcene','Limonene'],    desc: "Legendary cut. Earth, citrus, and pine locked in an OG structure that still doesn't miss. A benchmark in any serious collection." },
  { id: 20, name: 'Master OG',         cat: 'og',     thc: '24–28%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Myrcene','Linalool','Caryophyllene'],    desc: 'Hindu Kush x Empress OG. Heavy body, hashy spice, and a deep floral undertone. A quiet powerhouse that earns its name.' },
  { id: 21, name: 'Bubba Kush',        cat: 'og',     thc: '20–24%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Myrcene','Linalool','Caryophyllene'],    desc: 'Classic American Kush with chocolate-coffee notes and a dense, greasy structure. The late-night pick in the OG roster.' },
  { id: 22, name: 'King Louis XIII',   cat: 'og',     thc: '23–27%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Myrcene','Caryophyllene','Pinene'],      desc: 'Pine-heavy OG with a musty, earthy base. Strong and clear. A regal expression of what West Coast OG is supposed to be.' },
  // EXOTIC
  { id: 23, name: 'Mimosa',            cat: 'exotic', thc: '22–26%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Limonene','Myrcene','Ocimene'],          desc: 'Clementine x Purple Punch. Bright citrus champagne aroma with a light tropical body. Uplifting and elegant — a rare morning profile.' },
  { id: 24, name: 'Cereal Milk',       cat: 'exotic', thc: '23–27%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Myrcene','Linalool'],         desc: 'Y Life x Snowman. The milk left over from a bowl of fruity cereal — sweet, creamy, and indulgent. One of the more original profiles in the game.' },
  { id: 25, name: 'Gelato 41',         cat: 'exotic', thc: '26–30%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Caryophyllene','Limonene','Linalool'],   desc: 'Thin Mint GSC x Sherbet. Rich dessert profile with sweet-spicy depth. Dense and colorful nugs with a creamy exhale that lingers.' },
  { id: 26, name: 'Ice Cream Cake',    cat: 'exotic', thc: '24–28%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Linalool','Myrcene','Caryophyllene'],    desc: 'Wedding Cake x Gelato #33. Vanilla icing, sweet cream, and a sugary close. One of the most visually striking and aromatically rich exotics we run.' },
  { id: 27, name: 'Purple Punch',      cat: 'exotic', thc: '20–24%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Myrcene','Linalool','Caryophyllene'],    desc: 'Larry OG x Granddaddy Purple. Blueberry muffins with grape punch notes. Smooth, colorful, and endlessly pleasing in both profile and appearance.' },
  { id: 28, name: 'Wedding Cake',      cat: 'exotic', thc: '25–29%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Caryophyllene','Limonene','Myrcene'],    desc: 'Triangle Kush x Animal Mints. Vanilla and tangy pepper in a dense, sticky package. The exotic that bridges gas lovers and candy enthusiasts.' },
];

// Category-specific gradient palettes — each cat has its own visual identity
const CAT_GRADIENTS = {
  gas: [
    'linear-gradient(145deg, #fffbeb 0%, #fef3c7 55%, #fde68a 100%)',
    'linear-gradient(145deg, #fff7e6 0%, #ffedd5 55%, #fed7aa 100%)',
    'linear-gradient(145deg, #fffbeb 0%, #fef9c3 55%, #fef08a 100%)',
  ],
  candy: [
    'linear-gradient(145deg, #fdf2f8 0%, #fce7f3 55%, #fbcfe8 100%)',
    'linear-gradient(145deg, #faf5ff 0%, #f3e8ff 55%, #e9d5ff 100%)',
    'linear-gradient(145deg, #fdf2f8 0%, #fae8ff 55%, #f5d0fe 100%)',
  ],
  og: [
    'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 55%, #bbf7d0 100%)',
    'linear-gradient(145deg, #f0fdf4 0%, #d1fae5 55%, #a7f3d0 100%)',
    'linear-gradient(145deg, #f7fee7 0%, #ecfccb 55%, #d9f99d 100%)',
  ],
  exotic: [
    'linear-gradient(145deg, #eff6ff 0%, #dbeafe 55%, #bfdbfe 100%)',
    'linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 55%, #bae6fd 100%)',
    'linear-gradient(145deg, #eef2ff 0%, #e0e7ff 55%, #c7d2fe 100%)',
  ],
};

// Accent glow color per category
const CAT_GLOW = {
  gas:    'rgba(245,158,11,0.25)',
  candy:  'rgba(168,85,247,0.20)',
  og:     'rgba(34,197,94,0.22)',
  exotic: 'rgba(59,130,246,0.22)',
};

// Letter color per category (the big initial on cards)
const CAT_LETTER = {
  gas:    'rgba(180,110,0,0.18)',
  candy:  'rgba(147,51,234,0.18)',
  og:     'rgba(22,163,74,0.18)',
  exotic: 'rgba(37,99,235,0.18)',
};

function catGrad(cat, id) {
  const list = CAT_GRADIENTS[cat] || CAT_GRADIENTS.og;
  return list[id % list.length];
}

/* ════════════════════════════════════════════════════════════
   1. AGE GATE
═══════════════════════════════════════════════════════════ */
const AGE_KEY = 'waka_age_v2';

function resetGate() {
  try { sessionStorage.removeItem(AGE_KEY); } catch (_) {}
  location.reload();
}
window.resetGate = resetGate;

function initAgeGate() {
  const ageGate   = $('#ageGate');
  const site      = $('#site');
  const deniedScr = $('#deniedScreen');
  const btnYes    = $('#btnYes');
  const btnNo     = $('#btnNo');

  const stored = sessionStorage.getItem(AGE_KEY);

  if (stored === 'ok') {
    ageGate.style.display = 'none';
    site.style.display    = 'block';
    initSite();
    return;
  }

  if (stored === 'denied') {
    ageGate.style.display   = 'none';
    deniedScr.style.display = 'flex';
    return;
  }

  btnYes.addEventListener('click', () => {
    try { sessionStorage.setItem(AGE_KEY, 'ok'); } catch (_) {}
    ageGate.style.display = 'none';
    site.style.display    = 'block';
    initSite();
  });

  btnNo.addEventListener('click', () => {
    try { sessionStorage.setItem(AGE_KEY, 'denied'); } catch (_) {}
    ageGate.style.display   = 'none';
    deniedScr.style.display = 'flex';
  });
}

/* ════════════════════════════════════════════════════════════
   2. CART STATE
═══════════════════════════════════════════════════════════ */
const CART_KEY = 'waka_cart_v2';
let cart = [];

function cartLoad() {
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (_) { cart = []; }
}
function cartSave() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (_) {}
}
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

function cartAdd(strain, weight) {
  const key   = `${strain.id}_${weight}`;
  const price = strain.prices[weight];
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, id: strain.id, name: strain.name, cat: strain.cat, price, weight, thc: strain.thc, qty: 1 });
  }
  cartSave();
  cartSyncUI();
  openCartDrawer();
}

function cartRemove(key) {
  cart = cart.filter(i => i.key !== key);
  cartSave();
  cartSyncUI();
}

function cartSetQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  cartSave();
  cartSyncUI();
}

function cartClear() {
  cart = [];
  cartSave();
  cartSyncUI();
}

function cartSyncUI() {
  // Badge
  const badge = $('#cartBadge');
  const count = cartCount();
  if (badge) {
    badge.textContent = count;
    badge.hidden = count === 0;
  }
  cartRenderDrawer();
}

function cartRenderDrawer() {
  const itemsEl = $('#cartItems');
  const footEl  = $('#cartFoot');
  const totalEl = $('#cartTotal');
  const countEl = $('#cartCount');
  if (!itemsEl) return;

  const count = cartCount();
  if (countEl) countEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <p>Your cart is empty</p>
        <span>Add strains from the catalog</span>
      </div>`;
    if (footEl) footEl.style.display = 'none';
    return;
  }

  if (footEl) footEl.style.display = '';
  if (totalEl) totalEl.textContent = `$${cartSubtotal().toFixed(2)}`;

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <div class="cart-item__info">
        <strong class="cart-item__name">${item.name}</strong>
        <span class="cart-item__meta">${item.cat} · ${item.weight} · THC ${item.thc}</span>
        <span class="cart-item__unit-price">$${item.price}/${item.weight}</span>
      </div>
      <div class="cart-item__right">
        <div class="cart-item__qty">
          <button class="qty-btn" data-action="dec" data-key="${item.key}" aria-label="Decrease quantity">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-key="${item.key}" aria-label="Increase quantity">+</button>
        </div>
        <span class="cart-item__line-price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="cart-item__remove" data-key="${item.key}" aria-label="Remove ${item.name}">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>`).join('');

  // Event delegation for qty and remove buttons
  itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cartSetQty(btn.dataset.key, btn.dataset.action === 'inc' ? 1 : -1);
    });
  });
  itemsEl.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => cartRemove(btn.dataset.key));
  });
}

function openCartDrawer() {
  const drawer  = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  if (!drawer) return;
  drawer.hidden = false;
  requestAnimationFrame(() => {
    drawer.classList.add('open');
    overlay.classList.add('open');
  });
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer  = $('#cartDrawer');
  const overlay = $('#cartOverlay');
  if (!drawer) return;
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.addEventListener('transitionend', () => {
    if (!drawer.classList.contains('open')) drawer.hidden = true;
  }, { once: true });
  document.body.style.overflow = '';
}

function initCart() {
  cartLoad();
  cartSyncUI();

  const cartBtn  = $('#cartBtn');
  const cartClose = $('#cartClose');
  const overlay  = $('#cartOverlay');
  const clearBtn = $('#cartClear');
  const checkout = $('#cartCheckout');

  if (cartBtn)   cartBtn.addEventListener('click', openCartDrawer);
  if (cartClose) cartClose.addEventListener('click', closeCartDrawer);
  if (overlay)   overlay.addEventListener('click', closeCartDrawer);
  if (clearBtn)  clearBtn.addEventListener('click', () => {
    if (confirm('Clear your entire cart?')) cartClear();
  });
  if (checkout)  checkout.addEventListener('click', openOrderModal);

  document.addEventListener('keydown', e => {
    const drawer = $('#cartDrawer');
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) closeCartDrawer();
  });
}

/* ════════════════════════════════════════════════════════════
   3. ORDER MODAL
═══════════════════════════════════════════════════════════ */
function openOrderModal() {
  if (cart.length === 0) return;
  closeCartDrawer();

  const modal    = $('#orderModal');
  const bd       = $('#orderModalBd');
  const closeBtn = $('#orderModalClose');
  const summary  = $('#orderSummary');
  if (!modal) return;

  // Render order summary
  summary.innerHTML = `
    <div class="order-summary">
      ${cart.map(i => `
        <div class="order-summary__row">
          <span>${i.name} <em>${i.weight} ×${i.qty}</em></span>
          <span>$${(i.price * i.qty).toFixed(2)}</span>
        </div>`).join('')}
      <div class="order-summary__total">
        <span>Total</span>
        <strong>$${cartSubtotal().toFixed(2)}</strong>
      </div>
    </div>`;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const close = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  bd.addEventListener('click', close, { once: true });
  closeBtn.addEventListener('click', close, { once: true });

  // Re-create form node to clear stale listeners
  const oldForm  = $('#orderForm');
  const newForm  = oldForm.cloneNode(true);
  oldForm.parentNode.replaceChild(newForm, oldForm);

  newForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const nameEl  = newForm.querySelector('#ofName');
    const emailEl = newForm.querySelector('#ofEmail');
    const notesEl = newForm.querySelector('#ofNotes');
    const status  = newForm.querySelector('#orderStatus');

    [nameEl, emailEl].forEach(el => {
      el.classList.remove('invalid');
      el.nextElementSibling.textContent = '';
    });

    if (!nameEl.value.trim()) {
      nameEl.classList.add('invalid');
      nameEl.nextElementSibling.textContent = 'Name is required.';
      valid = false;
    }
    const emailVal = emailEl.value.trim();
    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      emailEl.classList.add('invalid');
      emailEl.nextElementSibling.textContent = 'Valid email required.';
      valid = false;
    }
    if (!valid) return;

    const orderLines = cart.map(i =>
      `• ${i.name} (${i.cat}) ${i.weight} ×${i.qty} @ $${i.price}/${i.weight} — $${(i.price * i.qty).toFixed(2)}`
    ).join('\n');
    const notes   = notesEl.value.trim();
    const subject = encodeURIComponent(`WakaGrown Order — ${nameEl.value.trim()}`);
    const body    = encodeURIComponent(
      `Order from: ${nameEl.value.trim()}\nEmail: ${emailVal}\n\nORDER DETAILS:\n${orderLines}\n\nSubtotal: $${cartSubtotal().toFixed(2)}${notes ? '\n\nNotes: ' + notes : ''}`
    );

    window.location.href = `mailto:info@wakagrown.com?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your mail client…';
    cartClear();
    close();
  });
}

/* ════════════════════════════════════════════════════════════
   4. NAV — sticky shadow + hamburger
═══════════════════════════════════════════════════════════ */
function initNav() {
  const nav    = $('#nav');
  const toggle = $('#navToggle');
  const menu   = $('#navMenu');

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const open = () => {
    menu.classList.add('open');
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => menu.classList.contains('open') ? close() : open());
  $$('a', menu).forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Scroll spy
  const sections = $$('section[id], div[id]', $('#site'));
  const links    = $$('.nav-link');
  const spy = () => {
    const mid = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(s => {
      const top = s.offsetTop;
      const bot = top + s.offsetHeight;
      if (mid >= top && mid < bot) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${s.id}`));
      }
    });
  };
  window.addEventListener('scroll', spy, { passive: true });

  // Smooth scroll with nav offset
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 16;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

/* ════════════════════════════════════════════════════════════
   5. CAROUSEL — featured 8 strains
═══════════════════════════════════════════════════════════ */
function initCarousel() {
  const track    = $('#cTrack');
  const prev     = $('#cPrev');
  const next     = $('#cNext');
  const dotsWrap = $('#cDots');
  const viewport = $('.carousel-viewport');

  const featured = STRAINS.filter(s => ['gas','candy'].includes(s.cat)).slice(0, 8);

  featured.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'c-card';
    card.innerHTML = `
      <div class="c-card-img" style="background:${catGrad(s.cat, s.id)}">
        <span class="c-card-initial" style="color:${CAT_LETTER[s.cat]}">${s.name[0]}</span>
        <div class="c-card-glow" style="background:radial-gradient(circle at 35% 65%,${CAT_GLOW[s.cat]},transparent 65%)"></div>
      </div>
      <div class="c-card-body">
        <p class="c-card-cat">${s.cat}</p>
        <h3 class="c-card-name">${s.name}</h3>
        <p class="c-card-thc">THC <strong>${s.thc}</strong></p>
        <div class="c-card-footer">
          <span class="c-card-price">from $${s.prices['7g']}</span>
          <button class="atc-btn" aria-label="Select ${s.name}">Select</button>
        </div>
      </div>`;
    card.addEventListener('click', () => openStrainModal(s));
    card.querySelector('.atc-btn').addEventListener('click', e => {
      e.stopPropagation();
      openStrainModal(s);
    });
    track.appendChild(card);
  });

  // Dots
  let activeDot = 0;
  const dots = [];
  for (let i = 0; i < featured.length; i++) {
    const d = document.createElement('button');
    d.className = 'c-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Go to slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    dots.push(d);
  }

  function getVisibleCount() {
    const vw   = viewport.offsetWidth;
    const card = track.querySelector('.c-card');
    if (!card) return 1;
    return Math.max(1, Math.round(vw / (card.offsetWidth + 16)));
  }

  function goTo(idx) {
    const cards = $$('.c-card', track);
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 16;
    const max   = cards.length - getVisibleCount();
    idx = Math.max(0, Math.min(idx, max));
    activeDot = idx;
    track.style.transform = `translateX(-${idx * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    prev.disabled = idx === 0;
    next.disabled = idx >= max;
  }

  prev.addEventListener('click', () => goTo(activeDot - 1));
  next.addEventListener('click', () => goTo(activeDot + 1));
  goTo(0);

  let touchX = 0;
  viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(activeDot + (diff > 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener('resize', () => goTo(activeDot));
}

/* ════════════════════════════════════════════════════════════
   6. STRAINS GRID — paginated (10/page), filterable
═══════════════════════════════════════════════════════════ */
const PAGE_SIZE = 10;

function initStrainsGrid() {
  const grid    = $('#strainsGrid');
  const pagEl   = $('#strainsPagination');
  const chips   = $$('.chip');
  let current   = 'all';
  let page      = 0;

  function getList() {
    return current === 'all' ? STRAINS : STRAINS.filter(s => s.cat === current);
  }

  function renderPagination(list) {
    if (!pagEl) return;
    const total = Math.ceil(list.length / PAGE_SIZE);
    if (total <= 1) { pagEl.innerHTML = ''; return; }
    pagEl.innerHTML = `
      <button class="pag-btn" id="pagPrev" ${page === 0 ? 'disabled' : ''} aria-label="Previous page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Prev
      </button>
      <span class="pag-info">Page ${page + 1} of ${total}</span>
      <button class="pag-btn" id="pagNext" ${page >= total - 1 ? 'disabled' : ''} aria-label="Next page">
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>`;
    $('#pagPrev').addEventListener('click', () => { page--; renderGrid(); });
    $('#pagNext').addEventListener('click', () => { page++; renderGrid(); });
  }

  function renderGrid() {
    grid.innerHTML = '';
    const list   = getList();
    const slice  = list.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    slice.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'strain-card';
      card.style.animationDelay = `${i * 0.03}s`;
      card.innerHTML = `
        <div class="strain-img" style="background:${catGrad(s.cat, s.id)}">
          <div class="strain-img__glow" style="background:radial-gradient(circle at 40% 60%,${CAT_GLOW[s.cat]},transparent 60%)"></div>
          <span style="color:${CAT_LETTER[s.cat]};position:relative;z-index:1">${s.name[0]}</span>
        </div>
        <div class="strain-body">
          <p class="strain-cat">${s.cat}</p>
          <h3 class="strain-name">${s.name}</h3>
          <p class="strain-thc">THC <strong>${s.thc}</strong></p>
          <div class="strain-footer">
            <span class="strain-price">from $${s.prices['7g']}</span>
            <button class="atc-btn atc-btn--sm" aria-label="Select ${s.name}">Select</button>
          </div>
        </div>`;
      card.addEventListener('click', () => openStrainModal(s));
      card.querySelector('.atc-btn').addEventListener('click', e => {
        e.stopPropagation();
        openStrainModal(s);
      });
      grid.appendChild(card);
    });
    renderPagination(list);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.f;
      if (f === current) return;
      current = f;
      page = 0;
      chips.forEach(c => c.classList.toggle('active', c.dataset.f === f));
      renderGrid();
    });
  });

  renderGrid();
}

/* ════════════════════════════════════════════════════════════
   7. STRAIN MODAL
═══════════════════════════════════════════════════════════ */
function openStrainModal(s) {
  const modal    = $('#strainModal');
  const bd       = $('#modalBd');
  const closeBtn = $('#modalClose');
  const imgEl    = $('#modalImg');
  const nameEl   = $('#modalName');
  const pillEl   = $('#modalPill');
  const descEl   = $('#modalDesc');
  const terpsEl  = $('#modalTerps');
  const thcEl    = $('#modalThc');
  const priceEl  = $('#modalPrice');
  const atcBtn   = $('#modalAtcBtn');

  imgEl.style.background = catGrad(s.cat, s.id);
  imgEl.innerHTML = `
    <div style="position:absolute;inset:0;background:radial-gradient(circle at 40% 60%,${CAT_GLOW[s.cat]},transparent 60%)"></div>
    <span style="font-family:var(--display);font-size:6rem;font-weight:900;color:${CAT_LETTER[s.cat]};position:relative;z-index:1">${s.name[0]}</span>`;
  nameEl.textContent = s.name;
  pillEl.textContent = s.cat;
  descEl.textContent = s.desc;
  thcEl.textContent  = s.thc;
  terpsEl.innerHTML  = s.terps.map(t => `<li>${t}</li>`).join('');

  // Weight selector
  let selectedWeight = '7g';
  const weightBtns   = $$('.weight-btn', modal);
  const weightLabels = { '7g': '7 grams', '14g': '14 grams (½ oz)', '28g': '28 grams (1 oz)' };
  const priceLabel   = $('#modalPriceLabel');

  weightBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.weight === '7g');
    btn.addEventListener('click', () => {
      selectedWeight = btn.dataset.weight;
      weightBtns.forEach(b => b.classList.toggle('active', b.dataset.weight === selectedWeight));
      if (priceLabel) priceLabel.textContent = weightLabels[selectedWeight];
      if (priceEl) priceEl.textContent = `$${s.prices[selectedWeight]}`;
    });
  });
  if (priceLabel) priceLabel.textContent = weightLabels['7g'];
  if (priceEl) priceEl.textContent = `$${s.prices['7g']}`;

  // Wire up Add to Cart in modal
  if (atcBtn) {
    const newBtn = atcBtn.cloneNode(true);
    atcBtn.parentNode.replaceChild(newBtn, atcBtn);
    newBtn.addEventListener('click', () => {
      cartAdd(s, selectedWeight);
      close();
    });
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const close = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    bd.removeEventListener('click', close);
    closeBtn.removeEventListener('click', close);
    document.removeEventListener('keydown', keyClose);
  };
  const keyClose = e => { if (e.key === 'Escape') close(); };

  bd.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', keyClose);
}

/* ════════════════════════════════════════════════════════════
   8. GALLERY + LIGHTBOX
═══════════════════════════════════════════════════════════ */
function initGallery() {
  const grid = $('#galleryGrid');
  const seeds = [
    { seed: 'waka1', h: 260 }, { seed: 'waka2', h: 320 },
    { seed: 'waka3', h: 280 }, { seed: 'waka4', h: 360 },
    { seed: 'waka5', h: 240 }, { seed: 'waka6', h: 300 },
    { seed: 'waka7', h: 380 }, { seed: 'waka8', h: 260 },
    { seed: 'waka9', h: 290 }, { seed: 'waka10', h: 340 },
    { seed: 'waka11', h: 250 }, { seed: 'waka12', h: 310 },
  ];

  seeds.forEach((item, i) => {
    const w   = 600;
    const url = `https://picsum.photos/seed/${item.seed}/${w}/${item.h}`;
    const div = document.createElement('div');
    div.className = 'gal-item';
    div.innerHTML = `
      <img src="${url}" alt="WakaGrown gallery ${i + 1}" loading="lazy" width="${w}" height="${item.h}" />
      <div class="gal-overlay">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
      </div>`;
    div.setAttribute('tabindex', '0');
    div.addEventListener('click', () => openLightbox(seeds, i));
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(seeds, i); } });
    grid.appendChild(div);
  });
}

function openLightbox(seeds, startIdx) {
  const lb      = $('#lightbox');
  const lbBd    = $('#lbBd');
  const lbClose = $('#lbClose');
  const lbPrev  = $('#lbPrev');
  const lbNext  = $('#lbNext');
  const lbImg   = $('#lbImg');
  const lbCount = $('#lbCount');
  let current = startIdx;

  function show(idx) {
    const { seed, h } = seeds[idx];
    const url = `https://picsum.photos/seed/${seed}/1000/${h * 2}`;
    lbImg.innerHTML = `<img src="${url}" alt="Gallery image ${idx + 1}" />`;
    lbCount.textContent = `${idx + 1} / ${seeds.length}`;
    lbPrev.disabled = idx === 0;
    lbNext.disabled = idx === seeds.length - 1;
    current = idx;
  }

  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  show(startIdx);

  const close = () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
    lbBd.removeEventListener('click', close);
    lbClose.removeEventListener('click', close);
    lbPrev.removeEventListener('click', onPrev);
    lbNext.removeEventListener('click', onNext);
    document.removeEventListener('keydown', keyNav);
  };
  const onPrev = () => { if (current > 0) show(current - 1); };
  const onNext = () => { if (current < seeds.length - 1) show(current + 1); };
  const keyNav = e => {
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   onPrev();
    if (e.key === 'ArrowRight')  onNext();
  };

  lbBd.addEventListener('click', close);
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', onPrev);
  lbNext.addEventListener('click', onNext);
  document.addEventListener('keydown', keyNav);
}

/* ════════════════════════════════════════════════════════════
   9. ACCORDION
═══════════════════════════════════════════════════════════ */
function initAccordion() {
  $$('.ac-item').forEach(item => {
    const btn   = item.querySelector('.ac-btn');
    const panel = item.querySelector('.ac-panel');

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      $$('.ac-item').forEach(other => {
        other.querySelector('.ac-btn').setAttribute('aria-expanded', 'false');
        const op = other.querySelector('.ac-panel');
        op.classList.remove('expanded');
        other.classList.remove('open');
        op.hidden = true;
      });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        panel.offsetHeight;
        panel.classList.add('expanded');
        item.classList.add('open');
      }
    });
  });
}

/* ════════════════════════════════════════════════════════════
   10. CONTACT
═══════════════════════════════════════════════════════════ */
function initContact() {
  const form   = $('#contactForm');
  const status = $('#formStatus');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    const fields = [
      { id: 'cfName',  label: 'Name',    type: 'text' },
      { id: 'cfEmail', label: 'Email',   type: 'email' },
      { id: 'cfMsg',   label: 'Message', type: 'text' },
    ];
    const values = {};
    fields.forEach(f => {
      const el  = $('#' + f.id);
      const err = el.nextElementSibling;
      el.classList.remove('invalid');
      err.textContent = '';
      const v = el.value.trim();
      if (!v) {
        el.classList.add('invalid');
        err.textContent = `${f.label} is required.`;
        valid = false;
      } else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        el.classList.add('invalid');
        err.textContent = 'Enter a valid email address.';
        valid = false;
      } else {
        values[f.id] = v;
      }
    });
    if (!valid) return;
    const subject = encodeURIComponent(`WakaGrown Inquiry from ${values['cfName']}`);
    const body    = encodeURIComponent(`Name: ${values['cfName']}\nEmail: ${values['cfEmail']}\n\n${values['cfMsg']}`);
    window.location.href = `mailto:info@wakagrown.com?subject=${subject}&body=${body}`;
    status.textContent = 'Opening your mail client…';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });
}

/* ════════════════════════════════════════════════════════════
   11. SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ════════════════════════════════════════════════════════════
   12. BACK TO TOP
═══════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = $('#backTop');
  window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════
   SEEDS DATA & GRID
═══════════════════════════════════════════════════════════ */
const SEEDS = [
  // Feminized
  { id: 'sf1', name: 'Red Katanaz',     type: 'fem',  cat: 'gas',    thc: '29–33%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Fuel-forward gas genetics pulled straight from our top-performing Red Katanaz mother. Dense structure, high resin, consistent every run.' },
  { id: 'sf2', name: 'Venuz #4',        type: 'fem',  cat: 'og',     thc: '27–31%', prices: { '5pk': 90,  '10pk': 165 }, desc: 'Our most requested OG pheno, now available as seeds. Lemon-pine expression with classic earth finish. Verified from our #4 keeper cut.' },
  { id: 'sf3', name: 'Banana Jealousy', type: 'fem',  cat: 'candy',  thc: '28–32%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Cream, banana, and sweet funk in a highly stable fem line. Exceptional bag appeal and consistency across phenotypes.' },
  { id: 'sf4', name: 'Gelato 41',       type: 'fem',  cat: 'exotic', thc: '26–30%', prices: { '5pk': 80,  '10pk': 145 }, desc: 'True Gelato 41 lineage — dessert-forward with spiced depth. Dense, colorful, and built for yield without sacrificing quality.' },
  { id: 'sf5', name: 'Wedding Cake',    type: 'fem',  cat: 'exotic', thc: '25–29%', prices: { '5pk': 80,  '10pk': 145 }, desc: 'Vanilla, tangy pepper, dense structure. Our Wedding Cake fem line bridges gas and candy lovers. Excellent for intermediate to advanced growers.' },
  { id: 'sf6', name: 'Ghost OG',        type: 'fem',  cat: 'og',     thc: '25–29%', prices: { '5pk': 80,  '10pk': 145 }, desc: 'Legendary OG genetics in a stable feminized form. Earth, citrus, pine — a benchmark expression that holds up run after run.' },
  // Auto-Flowering
  { id: 'sa1', name: 'Runtz Auto',      type: 'auto', cat: 'candy',  thc: '22–26%', prices: { '5pk': 70,  '10pk': 125 }, desc: 'Auto version of our Runtz line. Grape candy profile in a fast-finishing, compact structure. Great for shorter seasons and tighter spaces.' },
  { id: 'sa2', name: 'OG Kush Auto',    type: 'auto', cat: 'og',     thc: '20–24%', prices: { '5pk': 65,  '10pk': 115 }, desc: 'Classic OG Kush dialed into an auto format. Myrcene-heavy, earthy and grounding. Reliable finish time and solid canopy management.' },
  { id: 'sa3', name: 'Ice Cream Cake Auto', type: 'auto', cat: 'exotic', thc: '22–26%', prices: { '5pk': 70, '10pk': 125 }, desc: 'Vanilla cream auto that finishes fast without losing flavor. One of the most visually striking autos we run — purple hues, heavy frost.' },
  { id: 'sa4', name: 'Stardawg Auto',   type: 'auto', cat: 'gas',    thc: '20–24%', prices: { '5pk': 65,  '10pk': 115 }, desc: 'Diesel lineage in a low-maintenance auto format. Classic gas nose, star trichome pattern, and clean cultivation all the way through.' },
];

const TYPE_LABEL = { fem: 'Feminized', auto: 'Auto-Flowering' };

const SEED_PAGE_SIZE = 6;

function initSeedsGrid() {
  const grid  = $('#seedsGrid');
  const chips = $$('.chip[data-sf]');
  let current = 'all';
  let page    = 0;

  function getList() {
    return current === 'all' ? SEEDS : SEEDS.filter(s => s.type === current);
  }

  function renderSeedPagination(list) {
    let pagEl = $('#seedsPagination');
    if (!pagEl) return;
    const total = Math.ceil(list.length / SEED_PAGE_SIZE);
    if (total <= 1) { pagEl.innerHTML = ''; return; }
    pagEl.innerHTML = `
      <button class="pag-btn" id="seedPagPrev" ${page === 0 ? 'disabled' : ''} aria-label="Previous page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        Prev
      </button>
      <span class="pag-info">Page ${page + 1} of ${total}</span>
      <button class="pag-btn" id="seedPagNext" ${page >= total - 1 ? 'disabled' : ''} aria-label="Next page">
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </button>`;
    $('#seedPagPrev').addEventListener('click', () => { page--; renderSeeds(); });
    $('#seedPagNext').addEventListener('click', () => { page++; renderSeeds(); });
  }

  function renderSeeds() {
    grid.innerHTML = '';
    const list  = getList();
    const slice = list.slice(page * SEED_PAGE_SIZE, (page + 1) * SEED_PAGE_SIZE);
    slice.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'seed-card';
      card.style.animationDelay = `${i * 0.04}s`;
      card.innerHTML = `
        <div class="seed-card__img" style="background:${catGrad(s.cat, parseInt(s.id.replace(/\D/g,'')))}">
          <div class="strain-img__glow" style="background:radial-gradient(circle at 40% 60%,${CAT_GLOW[s.cat]},transparent 60%)"></div>
          <span style="color:${CAT_LETTER[s.cat]};position:relative;z-index:1">${s.name[0]}</span>
        </div>
        <div class="seed-card__body">
          <div class="seed-card__tags">
            <span class="seed-type-badge seed-type-badge--${s.type}">${TYPE_LABEL[s.type]}</span>
            <span class="strain-cat">${s.cat}</span>
          </div>
          <h3 class="strain-name">${s.name}</h3>
          <p class="strain-thc">THC <strong>${s.thc}</strong></p>
          <p class="seed-card__desc">${s.desc}</p>
          <div class="seed-card__footer">
            <div class="seed-prices">
              <span class="seed-price-pill">5pk — <strong>$${s.prices['5pk']}</strong></span>
              <span class="seed-price-pill">10pk — <strong>$${s.prices['10pk']}</strong></span>
            </div>
            <a href="#contact" class="atc-btn atc-btn--sm">Inquire</a>
          </div>
        </div>`;
      grid.appendChild(card);
    });
    renderSeedPagination(list);
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.sf;
      if (f === current) return;
      current = f;
      page = 0;
      chips.forEach(c => c.classList.toggle('active', c.dataset.sf === f));
      renderSeeds();
    });
  });

  renderSeeds();
}

function initSite() {
  initNav();
  initCart();
  initCarousel();
  initStrainsGrid();
  initSeedsGrid();
  initGallery();
  initAccordion();
  initContact();
  initScrollReveal();
  initBackToTop();
}

initAgeGate();
