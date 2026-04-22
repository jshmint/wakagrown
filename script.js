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
  { id: 1,  name: 'Presidential Squirts 75',     cat: 'gas',    thc: '29–33%', prices: { '7g': 195, '14g': 360, '28g': 660 }, terps: ['Caryophyllene','Myrcene','Limonene'],     desc: 'A signature gas cultivar delivering fuel-forward aromatics with a sharp, chassis-rattling exhale. Dense nugs, gassy nose, zero fluff.',                                                                              photos: ['assets/img/strain-1.png', 'assets/img/presidentialsquirts75flower.MP4'] },
  { id: 2,  name: 'White Truffle Gas',            cat: 'gas',    thc: '26–30%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Myrcene','Caryophyllene','Linalool'],     desc: 'Earth, musk, and petrol collide in one of the most complex gas profiles in the catalog. Heavy and grounding — the room knows.',                                                                                      photos: [] },
  { id: 3,  name: 'Jet Fuel Gelato',              cat: 'gas',    thc: '27–31%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Caryophyllene','Terpinolene'], desc: 'Sharp jet-fuel bite smoothed out by a creamy Gelato finish. Loud on the break, long on the exhale. A crowd favorite for good reason.',                                                                                photos: [] },
  { id: 4,  name: 'Garlic Cookies',               cat: 'gas',    thc: '25–29%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Myrcene','Caryophyllene','Ocimene'],      desc: 'Savory garlic funk with a biscotti back note. One of the most polarizing and respected aromas in the catalog — not for the faint of nose.',                                                                          photos: [] },
  { id: 5,  name: 'Stardawg',                     cat: 'gas',    thc: '24–28%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Caryophyllene','Myrcene','Pinene'],       desc: 'Old-school Chemdawg lineage brought forward with clean cultivation. Classic diesel star pattern, crystalline coverage, timeless.',                                                                                    photos: [] },
  { id: 6,  name: 'Sour Diesel OG',               cat: 'gas',    thc: '25–29%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Limonene','Myrcene','Caryophyllene'],    desc: 'East Coast fuel meets West Coast OG structure. Cerebral and sharp. One of the most copied and least-matched profiles going.',                                                                                        photos: [] },
  { id: 7,  name: 'Biscotti Gas',                 cat: 'gas',    thc: '26–30%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Caryophyllene','Limonene','Linalool'],   desc: 'Baked cookie dough laced with a gassy exhale. The cross delivers depth that neither parent achieves on their own.',                                                                                                   photos: [] },
  { id: 8,  name: 'Zkittlez Gas',                 cat: 'gas',    thc: '23–27%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Myrcene','Limonene','Caryophyllene'],    desc: 'Gas lineage crossed with Zkittlez sweetness to create a hybrid profile that hits fruity on the nose and fuel on the back.',                                                                                          photos: [] },
  // CANDY
  { id: 9,  name: 'Banana Jealousy',              cat: 'candy',  thc: '28–32%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Myrcene','Limonene','Linalool'],         desc: 'Banana Cream meets Jealousy for one of the most dessert-forward profiles in the run. Cream, banana, and sweet funk — incredibly smooth.',                                                                            photos: [] },
  { id: 10, name: 'Runtz',                        cat: 'candy',  thc: '24–28%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Caryophyllene','Linalool'],   desc: 'Grape candy meets tropical fruit in the strain that defined a generation. Our pheno runs tight, dense, and true to its lineage.',                                                                                    photos: [] },
  { id: 11, name: 'Candy Rain',                   cat: 'candy',  thc: '25–29%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Linalool','Limonene','Myrcene'],         desc: 'London Poundcake x Grape Gasoline. Sweet rain on a warm night — tropical fruit, floral undertone, sugar-dusted finish.',                                                                                             photos: [] },
  { id: 12, name: 'Peach Ringz',                  cat: 'candy',  thc: '23–27%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Myrcene','Limonene','Ocimene'],          desc: 'Exactly what it promises. Peachy candy aroma with a light, airy structure. Bright and clean, perfect for those who ride candy profiles.',                                                                           photos: [] },
  { id: 13, name: 'Gushers',                      cat: 'candy',  thc: '22–26%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Myrcene','Caryophyllene'],    desc: 'Tropical Zkittlez x Gelato #41. Candy-coated gassy punch with a juicy, fruity core. One of the best crossover strains in recent memory.',                                                                          photos: [] },
  { id: 14, name: 'Punch Breath',                 cat: 'candy',  thc: '24–28%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Linalool','Myrcene','Caryophyllene'],    desc: 'Purple Punch x Mendo Breath. Grape punch sweetness with a heavy, doughy exhale. The calming candy pick in the catalog.',                                                                                            photos: [] },
  { id: 15, name: 'Cotton Candy Kush',            cat: 'candy',  thc: '21–25%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Linalool','Limonene','Terpinolene'],     desc: 'Light, airy sweetness with a Kush backbone. Cotton candy aroma that makes it immediately approachable — deceptively potent.',                                                                                        photos: [] },
  // OG
  { id: 16, name: 'Venuz #4',                     cat: 'og',     thc: '27–31%', prices: { '7g': 195, '14g': 360, '28g': 660 }, terps: ['Myrcene','Caryophyllene','Linalool'],    desc: 'Our most sought-after OG pheno. Lemon-pine nose with a classic earthen foundation. Dense, trichome-packed, and true to its lineage in every run.',                                                                  photos: [] },
  { id: 17, name: 'OG Kush',                      cat: 'og',     thc: '22–26%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Myrcene','Limonene','Caryophyllene'],    desc: 'The gold standard. Run properly, it is still one of the most complex and nuanced profiles in existence. Our cut does it justice.',                                                                                   photos: [] },
  { id: 18, name: 'Larry OG',                     cat: 'og',     thc: '24–28%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Limonene','Myrcene','Pinene'],           desc: 'SFV OG x OG Kush. Lemon-citrus forward with a soft earthy close. One of the most balanced OG expressions available.',                                                                                               photos: [] },
  { id: 19, name: 'Ghost OG',                     cat: 'og',     thc: '25–29%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Caryophyllene','Myrcene','Limonene'],    desc: "Legendary cut. Earth, citrus, and pine locked in an OG structure that still doesn't miss. A benchmark in any serious collection.",                                                                                  photos: [] },
  { id: 20, name: 'Master OG',                    cat: 'og',     thc: '24–28%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Myrcene','Linalool','Caryophyllene'],    desc: 'Hindu Kush x Empress OG. Heavy body, hashy spice, and a deep floral undertone. A quiet powerhouse that earns its name.',                                                                                            photos: [] },
  { id: 21, name: 'Bubba Kush',                   cat: 'og',     thc: '20–24%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Myrcene','Linalool','Caryophyllene'],    desc: 'Classic American Kush with chocolate-coffee notes and a dense, greasy structure. The late-night pick in the OG roster.',                                                                                             photos: [] },
  { id: 22, name: 'King Louis XIII',              cat: 'og',     thc: '23–27%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Myrcene','Caryophyllene','Pinene'],      desc: 'Pine-heavy OG with a musty, earthy base. Strong and clear. A regal expression of what West Coast OG is supposed to be.',                                                                                             photos: [] },
  // EXOTIC
  { id: 23, name: 'Mimosa',                       cat: 'exotic', thc: '22–26%', prices: { '7g': 180, '14g': 325, '28g': 600 }, terps: ['Limonene','Myrcene','Ocimene'],          desc: 'Clementine x Purple Punch. Bright citrus champagne aroma with a light tropical body. Uplifting and elegant — a rare morning profile.',                                                                               photos: [] },
  { id: 24, name: 'Cereal Milk',                  cat: 'exotic', thc: '23–27%', prices: { '7g': 185, '14g': 340, '28g': 620 }, terps: ['Limonene','Myrcene','Linalool'],         desc: 'Y Life x Snowman. The milk left over from a bowl of fruity cereal — sweet, creamy, and indulgent. One of the more original profiles in the game.',                                                                  photos: [] },
  { id: 25, name: 'Gelato 41',                    cat: 'exotic', thc: '26–30%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Caryophyllene','Limonene','Linalool'],   desc: 'Thin Mint GSC x Sherbet. Rich dessert profile with sweet-spicy depth. Dense and colorful nugs with a creamy exhale that lingers.',                                                                                   photos: [] },
  { id: 26, name: 'Ice Cream Cake',               cat: 'exotic', thc: '24–28%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Linalool','Myrcene','Caryophyllene'],    desc: 'Wedding Cake x Gelato #33. Vanilla icing, sweet cream, and a sugary close. One of the most visually striking and aromatically rich exotics we run.',                                                                photos: [] },
  { id: 27, name: 'Purple Punch',                 cat: 'exotic', thc: '20–24%', prices: { '7g': 175, '14g': 310, '28g': 575 }, terps: ['Myrcene','Linalool','Caryophyllene'],    desc: 'Larry OG x Granddaddy Purple. Blueberry muffins with grape punch notes. Smooth, colorful, and endlessly pleasing in both profile and appearance.',                                                                  photos: [] },
  { id: 28, name: 'Wedding Cake',                 cat: 'exotic', thc: '25–29%', prices: { '7g': 190, '14g': 350, '28g': 640 }, terps: ['Caryophyllene','Limonene','Myrcene'],    desc: 'Triangle Kush x Animal Mints. Vanilla and tangy pepper in a dense, sticky package. The exotic that bridges gas lovers and candy enthusiasts.',                                                                       photos: [] },
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
          <button class="atc-btn" aria-label="View ${s.name}">Details</button>
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
        <div class="strain-img" style="background:${s.photos && s.photos.length ? '#0d1020' : catGrad(s.cat, s.id)}">
          ${s.photos && s.photos.length
            ? `<img src="${s.photos[0]}" alt="${s.name}" style="width:100%;height:100%;object-fit:contain;display:block;">`
            : `<div class="strain-img__glow" style="background:radial-gradient(circle at 40% 60%,${CAT_GLOW[s.cat]},transparent 60%)"></div>
          <span style="color:${CAT_LETTER[s.cat]};position:relative;z-index:1">${s.name[0]}</span>`}
        </div>
        <div class="strain-body">
          <p class="strain-cat">${s.cat}</p>
          <h3 class="strain-name">${s.name}</h3>
          <p class="strain-thc">THC <strong>${s.thc}</strong></p>
          <div class="strain-footer">
            <span class="strain-price">from $${s.prices['7g']}</span>
            <button class="atc-btn atc-btn--sm" aria-label="View ${s.name}">Details</button>
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
   7. MEDIA FULLSCREEN (mobile expand)
═══════════════════════════════════════════════════════════ */
function openMediaFullscreen(src) {
  const lb      = $('#lightbox');
  const lbBd    = $('#lbBd');
  const lbClose = $('#lbClose');
  const lbPrev  = $('#lbPrev');
  const lbNext  = $('#lbNext');
  const lbImg   = $('#lbImg');
  const lbCount = $('#lbCount');

  const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src);
  lbImg.innerHTML = isVideo
    ? `<video src="${src}" autoplay muted loop playsinline class="lb-media-video"></video>`
    : `<img src="${src}" alt="Media" class="lb-media-img">`;
  lbCount.textContent = '';
  lbPrev.style.display = 'none';
  lbNext.style.display = 'none';

  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  const close = () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
    lbPrev.style.display = '';
    lbNext.style.display = '';
    lbBd.removeEventListener('click', close);
    lbClose.removeEventListener('click', close);
    document.removeEventListener('keydown', onKey);
  };
  const onKey = e => { if (e.key === 'Escape') close(); };
  lbBd.addEventListener('click', close);
  lbClose.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
}

/* ════════════════════════════════════════════════════════════
   8. STRAIN MODAL
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

  // Build media carousel or placeholder
  const photos = s.photos && s.photos.length ? s.photos : [];
  if (photos.length) {
    imgEl.style.background = '#0d1020';
    let carIdx = 0;
    function renderCarousel() {
      const src = photos[carIdx];
      const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src);
      const mediaHTML = isVideo
        ? `<video src="${src}" class="carousel-media" autoplay muted loop playsinline></video>`
        : `<img src="${src}" alt="${s.name}" class="carousel-media">`;
      const dotsHTML = photos.length > 1
        ? `<div class="carousel-dots">${photos.map((_, i) => `<span class="carousel-dot${i === carIdx ? ' active' : ''}"></span>`).join('')}</div>`
        : '';
      const arrowsHTML = photos.length > 1
        ? `<button class="carousel-arrow carousel-prev" aria-label="Previous">&#8249;</button>
           <button class="carousel-arrow carousel-next" aria-label="Next">&#8250;</button>`
        : '';
      const expandHTML = `<button class="media-expand-btn" aria-label="View fullscreen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
          <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
        </svg>
      </button>`;
      imgEl.innerHTML = mediaHTML + arrowsHTML + dotsHTML + expandHTML;
      // Arrow listeners
      const prev = imgEl.querySelector('.carousel-prev');
      const next = imgEl.querySelector('.carousel-next');
      if (prev) prev.addEventListener('click', e => { e.stopPropagation(); carIdx = (carIdx - 1 + photos.length) % photos.length; renderCarousel(); });
      if (next) next.addEventListener('click', e => { e.stopPropagation(); carIdx = (carIdx + 1) % photos.length; renderCarousel(); });
      // Expand button — mobile fullscreen
      const expandBtn = imgEl.querySelector('.media-expand-btn');
      if (expandBtn) expandBtn.addEventListener('click', e => { e.stopPropagation(); openMediaFullscreen(photos[carIdx]); });
      // Touch swipe
      let touchX = null;
      imgEl.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
      imgEl.addEventListener('touchend', e => {
        if (touchX === null) return;
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { carIdx = diff > 0 ? (carIdx + 1) % photos.length : (carIdx - 1 + photos.length) % photos.length; renderCarousel(); }
        touchX = null;
      });
    }
    renderCarousel();
  } else {
    imgEl.style.background = catGrad(s.cat, s.id);
    imgEl.innerHTML = `
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 40% 60%,${CAT_GLOW[s.cat]},transparent 60%)"></div>
      <span style="font-family:var(--display);font-size:6rem;font-weight:900;color:${CAT_LETTER[s.cat]};position:relative;z-index:1">${s.name[0]}</span>`;
  }
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

  // Wire up Contact to Order button — opens Telegram with strain info pre-filled
  const orderBtn = $('#modalOrderBtn');
  if (orderBtn) {
    const newBtn = orderBtn.cloneNode(true);
    orderBtn.parentNode.replaceChild(newBtn, orderBtn);
    newBtn.addEventListener('click', () => {
      const weight = selectedWeight;
      const price  = s.prices[weight];
      const msg    = `Hi! I want to order:\n*${s.name}* — ${weight} @ $${price}\nTHC: ${s.thc}`;
      window.open(`https://t.me/wakagrown420?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
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
  const items = [
    { src: 'assets/img/bananajealousy.jpg',              name: 'Banana Jealousy'         },
    { src: 'assets/img/chinadoll23.mp4',                 name: 'China Doll 23'           },
    { src: 'assets/img/FunYuns.jpg',                     name: 'Fun Yuns'                },
    { src: 'assets/img/japenesejam.mp4',                 name: 'Japanese Jam'            },
    { src: 'assets/img/slowmagic.mp4',                   name: 'Slow Magic'              },
    { src: 'assets/img/whiteash.mp4',                    name: ''                        },
  ];

  items.forEach((item, i) => {
    const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(item.src);
    const mediaInner = isVideo
      ? `<video src="${item.src}" autoplay muted loop playsinline></video>`
      : `<img src="${item.src}" alt="${item.name}" loading="lazy">`;

    const div = document.createElement('div');
    div.className = 'gal-item';
    div.setAttribute('tabindex', '0');
    div.innerHTML = `
      <div class="gal-media-wrap">${mediaInner}</div>
      <div class="gal-name">${item.name}</div>`;
    div.addEventListener('click', () => openLightbox(items, i));
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(items, i); } });
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
    const item = seeds[idx];
    if (item.src) {
      const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(item.src);
      lbImg.innerHTML = isVideo
        ? `<video src="${item.src}" autoplay muted loop playsinline class="lb-media-video"></video>`
        : `<img src="${item.src}" alt="${item.name || 'WakaGrown gallery'}" class="lb-media-img" />`;
    } else {
      lbImg.innerHTML = `
        <div class="gal-ph" style="height:clamp(260px,55vh,560px);width:clamp(300px,70vw,700px)">
          <span class="gal-ph__mark">W</span>
          <span class="gal-ph__label">Photo Coming Soon</span>
        </div>`;
    }
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
  { id: 'sf1',  name: 'Bleu Blazzé',            cross: 'Bleuz x ZKZ',                    type: 'fem', cat: 'exotic', thc: '26–30%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'A striking exotic cross pairing Bleuz with ZKZ. Deep berry tones, resinous structure, and a profile built for the collector.' },
  { id: 'sf2',  name: 'Frozen Nectar',           cross: 'Banana Jealousy x ZKZ',          type: 'fem', cat: 'candy',  thc: '27–31%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Sweet banana cream meets ZKZ terps. Exceptionally stacked trichome coverage with a candy-forward finish every time.' },
  { id: 'sf3',  name: 'Champagne Gutz',          cross: 'Champagne Tears x ZKZ',          type: 'fem', cat: 'exotic', thc: '26–30%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Bubbly and complex — Champagne Tears brings the effervescence, ZKZ locks in the structure. A standout exotic for experienced growers.' },
  { id: 'sf4',  name: 'Shockwavez',              cross: 'Yellow Mermaid #13 x ZKZ',       type: 'fem', cat: 'exotic', thc: '28–32%', prices: { '5pk': 90,  '10pk': 165 }, desc: 'Yellow Mermaid #13 is a proven pheno — crossed with ZKZ it delivers vivid color, loud terps, and serious bag appeal.' },
  { id: 'sf5',  name: 'Boise Broncoz',           cross: 'Blumosa x ZKZ',                  type: 'fem', cat: 'gas',    thc: '27–31%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Blumosa\'s bold gas character pushed through ZKZ genetics. Dense, frosty, and consistently hard-hitting from seed.' },
  { id: 'sf6',  name: 'KZ BX2',                  cross: 'KZ3M x ZKZ',                     type: 'fem', cat: 'gas',    thc: '28–32%', prices: { '5pk': 90,  '10pk': 165 }, desc: 'A second-generation backcross deepening the KZ line. Refined gas structure with improved uniformity and resin expression.' },
  { id: 'sf7',  name: 'Super Saiyan',            cross: 'Sunset Sherbert x ZKZ',          type: 'fem', cat: 'candy',  thc: '26–30%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Sunset Sherbert\'s dessert sweetness amplified by ZKZ\'s power. Energetic growth, vibrant phenotypes, elite terpene output.' },
  { id: 'sf8',  name: 'Hawaiian Shaved Ice',     cross: 'Pineapple Zkittlez x ZKZ',       type: 'fem', cat: 'candy',  thc: '25–29%', prices: { '5pk': 80,  '10pk': 145 }, desc: 'Tropical pineapple sweetness from Pineapple Zkittlez meets ZKZ\'s legendary resin. A summer-ready cultivar with serious visual appeal.' },
  { id: 'sf9',  name: 'Berry Brioche',           cross: 'Tmzangria x ZKZ',                type: 'fem', cat: 'exotic', thc: '26–30%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Rich berry pastry notes from Tmzangria layered over ZKZ\'s deep structure. Complex, aromatic, and visually stunning at harvest.' },
  { id: 'sf10', name: 'Grapefruit Rainbowz',     cross: 'Presidential Squirts x ZKZ',     type: 'fem', cat: 'exotic', thc: '27–31%', prices: { '5pk': 85,  '10pk': 155 }, desc: 'Presidential Squirts lineage crossed with ZKZ brings citrus-forward terps, rainbow-hued calyxes, and elite bag presence.' },
];

const TYPE_LABEL = { fem: 'Feminized', auto: 'Auto-Flowering' };

function initSeedsGrid() {
  const grid  = $('#seedsGrid');
  const chips = $$('.chip[data-sf]');
  let current = 'all';
  let page    = 0;

  function pageSize() { return 4; }

  function getList() {
    return current === 'all' ? SEEDS : SEEDS.filter(s => s.type === current);
  }

  function renderSeedPagination(list) {
    const pagEl = $('#seedsPagination');
    if (!pagEl) return;
    const ps    = pageSize();
    const total = Math.ceil(list.length / ps);
    if (total <= 1) { pagEl.innerHTML = ''; return; }

    if (window.innerWidth <= 768) {
      // Arrows + dot indicators for mobile
      pagEl.innerHTML = `
        <div class="seed-pag-row">
          <button class="seed-arrow" id="seedArrPrev" ${page === 0 ? 'disabled' : ''} aria-label="Previous page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="seed-dots">${
            Array.from({ length: total }, (_, i) =>
              `<button class="seed-dot${i === page ? ' active' : ''}" data-page="${i}" aria-label="Page ${i + 1}"></button>`
            ).join('')
          }</div>
          <button class="seed-arrow" id="seedArrNext" ${page >= total - 1 ? 'disabled' : ''} aria-label="Next page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>`;
      pagEl.querySelectorAll('.seed-dot').forEach(dot => {
        dot.addEventListener('click', () => { page = +dot.dataset.page; renderSeeds(); });
      });
      $('#seedArrPrev').addEventListener('click', () => { if (page > 0) { page--; renderSeeds(); } });
      $('#seedArrNext').addEventListener('click', () => { if (page < total - 1) { page++; renderSeeds(); } });
    } else {
      pagEl.innerHTML = `
        <div class="seed-pag-row">
          <button class="seed-arrow" id="seedPagPrev" ${page === 0 ? 'disabled' : ''} aria-label="Previous page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="seed-dots">${
            Array.from({ length: total }, (_, i) =>
              `<button class="seed-dot${i === page ? ' active' : ''}" data-page="${i}" aria-label="Page ${i + 1}"></button>`
            ).join('')
          }</div>
          <button class="seed-arrow" id="seedPagNext" ${page >= total - 1 ? 'disabled' : ''} aria-label="Next page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>`;
      pagEl.querySelectorAll('.seed-dot').forEach(dot => {
        dot.addEventListener('click', () => { page = +dot.dataset.page; renderSeeds(); });
      });
      $('#seedPagPrev').addEventListener('click', () => { if (page > 0) { page--; renderSeeds(); } });
      $('#seedPagNext').addEventListener('click', () => { if (page < total - 1) { page++; renderSeeds(); } });
    }
  }

  // Touch swipe
  let swipeX = 0;
  let swipeY = 0;
  grid.addEventListener('touchstart', e => {
    swipeX = e.touches[0].clientX;
    swipeY = e.touches[0].clientY;
  }, { passive: true });
  grid.addEventListener('touchend', e => {
    if (window.innerWidth > 768) return;
    const dx = e.changedTouches[0].clientX - swipeX;
    const dy = e.changedTouches[0].clientY - swipeY;
    if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx)) return;
    const list  = getList();
    const total = Math.ceil(list.length / pageSize());
    if (dx < 0 && page < total - 1) { page++; renderSeeds(); }
    else if (dx > 0 && page > 0)    { page--; renderSeeds(); }
  }, { passive: true });

  function renderSeeds() {
    grid.innerHTML = '';
    const ps    = pageSize();
    const list  = getList();
    const slice = list.slice(page * ps, (page + 1) * ps);
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
          ${s.cross ? `<p class="seed-card__cross">${s.cross}</p>` : ''}
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
  initCarousel();
  initStrainsGrid();
  initSeedsGrid();
  initGallery();
  initAccordion();
  initScrollReveal();
  initBackToTop();
}

initAgeGate();
