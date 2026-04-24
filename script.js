/* ============================================================
   WakaGrown — script.js
   Nav · Carousel · Strain grid · Lightbox ·
   Accordion · Contact · Cart · Scroll reveal · Back-to-top
   ============================================================ */

'use strict';

/* ── HELPERS ─────────────────────────────────────────────────── */
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];

/* ── STRAIN DATA (16 cultivars) ──────────────────────────────── */
// prices: { '7g': X, '14g': Y, '28g': Z }
const STRAINS = [
  // GAS
  { id: 1,  name: 'Cat Piss 69',                  cat: 'gas',    thc: '24–28%', prices: { '7g': 135, '14g': 260, '28g': 500 }, terps: ['Terpinolene','Myrcene','Ocimene'],        desc: 'A classic gas phenotype with a sharp, ammonia-forward bite and a clean, cerebral finish. Not for the passive nose — loud, proud, and unmistakable.',         photos: [] },
  { id: 2,  name: 'Zkittlez x Gas Station Bob',   cat: 'gas',    thc: '25–29%', prices: { '7g': 150, '14g': 290, '28g': 550 }, terps: ['Limonene','Caryophyllene','Myrcene'],     desc: 'Zkittlez fruit sweetness run through Gas Station Bob\'s raw fuel backbone. A rare crossover that satisfies both camps — candy on the front, gas on the close.', photos: [] },
  { id: 3,  name: 'Tetonaz',                       cat: 'gas',    thc: '26–30%', prices: { '7g': 155, '14g': 300, '28g': 575 }, terps: ['Caryophyllene','Myrcene','Pinene'],       desc: 'Mountain-bred gas with deep resin production and a sharp, earthy exhale. Dense structure, heavy coverage, consistent output every run.',                     photos: [] },
  { id: 4,  name: 'Dog Walker OG',                 cat: 'gas',    thc: '25–29%', prices: { '7g': 145, '14g': 275, '28g': 525 }, terps: ['Myrcene','Caryophyllene','Limonene'],     desc: 'Albert Walker x Chemdawg 91. A slow, heavy gas cultivar with serious bag presence. Earthy, diesel, and deeply grounding — built for the end of the day.',   photos: [] },
  // OG
  { id: 5,  name: 'Sin Valley OG',                 cat: 'og',     thc: '25–29%', prices: { '7g': 150, '14g': 290, '28g': 550 }, terps: ['Myrcene','Limonene','Caryophyllene'],     desc: 'SFV OG lineage with a sharp lemon-pine nose and heavy OG structure. Delivers the full classic experience — dense, resinous, and utterly reliable.',          photos: [] },
  { id: 6,  name: 'Rudeboi OG #1',                 cat: 'og',     thc: '26–30%', prices: { '7g': 175, '14g': 335, '28g': 650 }, terps: ['Caryophyllene','Myrcene','Linalool'],     desc: 'A sought-after OG cut with a fuel-and-earth nose and serious resin output. The #1 pheno for a reason — everything an OG collector wants in one plant.',    photos: [] },
  // EXOTIC
  { id: 7,  name: 'Grapefruit Rainbowz',           cat: 'exotic', thc: '27–31%', prices: { '7g': 210, '14g': 405, '28g': 775 }, terps: ['Limonene','Ocimene','Myrcene'],           desc: 'Presidential Squirts x ZKZ. Citrus-forward rainbow of terps with vivid color at harvest. Loud, layered, and visually striking from every angle.',           photos: [] },
  { id: 8,  name: 'Boise Blu',                     cat: 'exotic', thc: '26–30%', prices: { '7g': 195, '14g': 375, '28g': 725 }, terps: ['Myrcene','Linalool','Caryophyllene'],     desc: 'Blumosa lineage with deep blue-purple hues, a floral body, and a sweet gas close. One of the most visually stunning cuts in this run.',                    photos: [] },
  { id: 9,  name: 'Champagne Gutz',                cat: 'exotic', thc: '26–30%', prices: { '7g': 205, '14g': 395, '28g': 750 }, terps: ['Linalool','Limonene','Caryophyllene'],    desc: 'Champagne Tears x ZKZ. Effervescent, complex, and strikingly aromatic. Layers of floral, fruit, and a bubbly finish that builds with every exhale.',        photos: [] },
  { id: 10, name: 'Sherbanger F2',                 cat: 'exotic', thc: '27–31%', prices: { '7g': 185, '14g': 355, '28g': 675 }, terps: ['Caryophyllene','Limonene','Linalool'],    desc: 'Second-generation Sherbanger with refined phenotype expression. Sherbet\'s creamy sweetness locked into a dense, frosty structure with serious bag appeal.',  photos: [] },
  { id: 11, name: 'Sherbzooka',                    cat: 'exotic', thc: '26–30%', prices: { '7g': 180, '14g': 345, '28g': 650 }, terps: ['Limonene','Myrcene','Linalool'],           desc: 'Sherbet-forward exotic with a bazooka-level punch. Creamy, fruity, and stacked with trichomes — one of the more immediately impressive exotics in the run.', photos: [] },
  { id: 12, name: 'Wild Lÿfe',                     cat: 'exotic', thc: '25–29%', prices: { '7g': 165, '14g': 315, '28g': 600 }, terps: ['Terpinolene','Ocimene','Limonene'],       desc: 'An unbridled exotic with bright, tropical terps and an expressive structure that changes pheno to pheno. Wild by nature, refined by cultivation.',            photos: [] },
  { id: 13, name: 'China Doll',                    cat: 'exotic', thc: '25–29%', prices: { '7g': 165, '14g': 315, '28g': 600 }, terps: ['Linalool','Myrcene','Caryophyllene'],     desc: 'Delicate floral nose with a smooth, creamy exhale and a dense, well-structured bud. Understated on the outside, unforgettable once broken open.',           photos: [] },
  { id: 14, name: 'Yellow Zushi',                  cat: 'exotic', thc: '26–30%', prices: { '7g': 220, '14g': 420, '28g': 800 }, terps: ['Limonene','Caryophyllene','Ocimene'],     desc: 'Zushi lineage with a bright yellow-gold expression and a citrus-spice nose that hits immediately. Dense, resinous, and unmistakable on the tray.',           photos: [] },
  // CANDY
  { id: 15, name: 'Berry Brioche',                 cat: 'candy',  thc: '26–30%', prices: { '7g': 175, '14g': 335, '28g': 650 }, terps: ['Linalool','Myrcene','Limonene'],           desc: 'Tmzangria x ZKZ. Rich berry pastry with a buttery, doughy base. Complex and aromatic — a dessert-forward candy cultivar with real depth behind the sweetness.', photos: [] },
  { id: 16, name: 'Biscotti Kitty',                cat: 'candy',  thc: '25–29%', prices: { '7g': 155, '14g': 300, '28g': 575 }, terps: ['Caryophyllene','Linalool','Limonene'],    desc: 'Biscotti lineage with a sweet, baked-cookie nose and a smooth candy finish. Smooth structure, excellent bag presence, and a flavor that stays on the palate.', photos: [] },
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

  let activeDot = 0;
  let dots = [];

  function getVisibleCount() {
    const vw   = viewport.offsetWidth;
    const card = track.querySelector('.c-card');
    if (!card) return 1;
    return Math.max(1, Math.round(vw / (card.offsetWidth + 16)));
  }

  function getMax() {
    return Math.max(0, featured.length - getVisibleCount());
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    dots = [];
    const count = getMax() + 1;
    for (let i = 0; i < count; i++) {
      const d = document.createElement('button');
      d.className = 'c-dot' + (i === activeDot ? ' active' : '');
      d.setAttribute('aria-label', `Go to slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
      dots.push(d);
    }
  }

  function goTo(idx) {
    const cards = $$('.c-card', track);
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 16;
    const max   = getMax();
    idx = Math.max(0, Math.min(idx, max));
    activeDot = idx;
    track.style.transform = `translateX(-${idx * cardW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    prev.disabled = idx === 0;
    next.disabled = idx >= max;
  }

  buildDots();
  goTo(0);

  prev.addEventListener('click', () => goTo(activeDot - 1));
  next.addEventListener('click', () => goTo(activeDot + 1));

  let touchX = 0;
  viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(activeDot + (diff > 0 ? 1 : -1));
  }, { passive: true });

  window.addEventListener('resize', () => {
    activeDot = Math.min(activeDot, getMax());
    buildDots();
    goTo(activeDot);
  });
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
      const msg    = `Hi! I want to order:\n*${s.name}* — ${weight} @ $${price}`;
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

  const MAX_RETRIES = 3;

  function galFallback(wrap) {
    wrap.innerHTML = `
      <div class="gal-fallback">
        <span class="gal-fallback__mark">W</span>
        <span class="gal-fallback__label">Coming Soon</span>
      </div>`;
  }

  function retryImage(src, wrap, alt, attempt) {
    const img = new Image();
    img.alt = alt;
    img.onload = () => {
      wrap.innerHTML = '';
      wrap.appendChild(img);
    };
    img.onerror = () => {
      if (attempt < MAX_RETRIES) {
        setTimeout(() => retryImage(src, wrap, alt, attempt + 1), 800 * Math.pow(2, attempt));
      } else {
        galFallback(wrap);
      }
    };
    img.src = src + (attempt > 0 ? '?r=' + attempt : '');
  }

  function retryVideo(src, wrap, attempt) {
    const vid = document.createElement('video');
    vid.autoplay = true;
    vid.muted    = true;
    vid.loop     = true;
    vid.playsInline = true;
    vid.setAttribute('playsinline', '');
    vid.addEventListener('loadeddata', () => {}, { once: true });
    vid.addEventListener('error', () => {
      if (attempt < MAX_RETRIES) {
        setTimeout(() => retryVideo(src, wrap, attempt + 1), 800 * Math.pow(2, attempt));
      } else {
        galFallback(wrap);
      }
    }, { once: true });
    vid.src = src + (attempt > 0 ? '?r=' + attempt : '');
    vid.load();
    wrap.innerHTML = '';
    wrap.appendChild(vid);
  }

  items.forEach((item, i) => {
    const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(item.src);

    const div = document.createElement('div');
    div.className = 'gal-item';
    div.setAttribute('tabindex', '0');

    const wrap = document.createElement('div');
    wrap.className = 'gal-media-wrap';

    if (isVideo) {
      retryVideo(item.src, wrap, 0);
    } else {
      retryImage(item.src, wrap, item.name, 0);
    }

    const nameEl = document.createElement('div');
    nameEl.className = 'gal-name';
    nameEl.textContent = item.name;

    div.appendChild(wrap);
    div.appendChild(nameEl);
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
  { id: 'sf1',  name: 'Bleu Blazzé',            cross: 'Bleuz x ZKZ',                    type: 'reg', cat: 'exotic', thc: '26–30%', prices: { '12pk': 100 }, desc: 'A striking exotic cross pairing Bleuz with ZKZ. Deep berry tones, resinous structure, and a profile built for the collector.' },
  { id: 'sf2',  name: 'Frozen Nectar',           cross: 'Banana Jealousy x ZKZ',          type: 'reg', cat: 'candy',  thc: '27–31%', prices: { '12pk': 100 }, desc: 'Sweet banana cream meets ZKZ terps. Exceptionally stacked trichome coverage with a candy-forward finish every time.' },
  { id: 'sf3',  name: 'Champagne Gutz',          cross: 'Champagne Tears x ZKZ',          type: 'reg', cat: 'exotic', thc: '26–30%', prices: { '12pk': 150 }, desc: 'Bubbly and complex — Champagne Tears brings the effervescence, ZKZ locks in the structure. A standout exotic for experienced growers.' },
  { id: 'sf4',  name: 'Shockwavez',              cross: 'Yellow Mermaid #13 x ZKZ',       type: 'reg', cat: 'exotic', thc: '28–32%', prices: { '12pk': 150 }, desc: 'Yellow Mermaid #13 is a proven pheno — crossed with ZKZ it delivers vivid color, loud terps, and serious bag appeal.' },
  { id: 'sf5',  name: 'Boise Broncoz',           cross: 'Blumosa x ZKZ',                  type: 'reg', cat: 'gas',    thc: '27–31%', prices: { '12pk': 150 }, desc: 'Blumosa\'s bold gas character pushed through ZKZ genetics. Dense, frosty, and consistently hard-hitting from seed.' },
  { id: 'sf6',  name: 'KZ BX2',                  cross: 'KZ3M x ZKZ',                     type: 'reg', cat: 'gas',    thc: '28–32%', prices: { '12pk': 100 }, desc: 'A second-generation backcross deepening the KZ line. Refined gas structure with improved uniformity and resin expression.' },
  { id: 'sf7',  name: 'Super Saiyan',            cross: 'Sunset Sherbert x ZKZ',          type: 'reg', cat: 'candy',  thc: '26–30%', prices: { '12pk': 100 }, desc: 'Sunset Sherbert\'s dessert sweetness amplified by ZKZ\'s power. Energetic growth, vibrant phenotypes, elite terpene output.' },
  { id: 'sf8',  name: 'Hawaiian Shaved Ice',     cross: 'Pineapple Zkittlez x ZKZ',       type: 'reg', cat: 'candy',  thc: '25–29%', prices: { '12pk': 100 }, desc: 'Tropical pineapple sweetness from Pineapple Zkittlez meets ZKZ\'s legendary resin. A summer-ready cultivar with serious visual appeal.' },
  { id: 'sf9',  name: 'Berry Brioche',           cross: 'Tmzangria x ZKZ',                type: 'reg', cat: 'exotic', thc: '26–30%', prices: { '12pk': 100 }, desc: 'Rich berry pastry notes from Tmzangria layered over ZKZ\'s deep structure. Complex, aromatic, and visually stunning at harvest.' },
  { id: 'sf10', name: 'Grapefruit Rainbowz',     cross: 'Presidential Squirts x ZKZ',     type: 'reg', cat: 'exotic', thc: '27–31%', prices: { '12pk': 150 }, desc: 'Presidential Squirts lineage crossed with ZKZ brings citrus-forward terps, rainbow-hued calyxes, and elite bag presence.' },
];

const TYPE_LABEL = { reg: 'Regular', fem: 'Feminized', auto: 'Auto-Flowering' };

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
          <p class="seed-card__desc">${s.desc}</p>
          <div class="seed-card__footer">
            <div class="seed-prices">
              <span class="seed-price-pill">12pk — <strong>$${s.prices['12pk']}</strong></span>
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
