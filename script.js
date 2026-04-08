/* ============================================================
   DOOR OVERLAY
   Flow:
     1. User hovers door  → CSS opens it smoothly (2.4s)
     2. After 1s of hover → JS adds "entering" (locks door open)
     3. After 1.4s more   → JS adds "entered"  (overlay fades out)
     4. Mouse leaves early → timer cancelled, door swings back
============================================================ */
const overlay  = document.getElementById('door-overlay');
const doorWrap = document.getElementById('door-wrap');

let hoverTimer   = null;
let hasEntered   = false;  // prevent retriggering once revealed

doorWrap.addEventListener('mouseenter', () => {
    if (hasEntered) return;

    hoverTimer = setTimeout(() => {
        hasEntered = true;

        // Lock door wide open
        overlay.classList.add('entering');

        // Wait for most of the door swing, then fade overlay out
        setTimeout(() => {
            overlay.classList.add('entered');
        }, 2800);

    }, 1000); // 1 second of hovering before reveal starts
});

doorWrap.addEventListener('mouseleave', () => {
    if (hasEntered) return;
    clearTimeout(hoverTimer);
});


// hamburger menu
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
});

document.addEventListener('click', () => navMenu.classList.remove('open'));


// navbar sticky
window.addEventListener('scroll', () => {
    document.querySelector('.navbar')
        .classList.toggle('sticky', window.scrollY > 20);
});





















// projects section



















// gallery


//  6 animation modes (no GSAP needed)



const PHOTOS = [
    { src: 'assets/gallery/gallefort.jpeg',  label: 'Galle fort' },
    { src: 'assets/gallery/gallefort2.jpeg',  label: 'Galle fort' },
    { src: 'assets/gallery/trinco_sea.jpeg',  label: 'Sea of Trincomalee' },
    { src: 'assets/gallery/trinco1.jpeg',  label: 'Trincomalee' },
    { src: 'assets/gallery/moonnight_view.jpeg',  label: 'A Night held by the Moon' },
    { src: 'assets/gallery/peacock.jpeg',  label: 'A Quiet Watcher on the Edge' },
    { src: 'assets/gallery/ijse_group.jpeg',  label: 'The Crew' },
    { src: 'assets/gallery/ijse_girls1.jpeg',  label: 'The GIRLS' },

];

// ── Card size ───────────────────────────────────────────────
const CARD_W = Math.min(160, window.innerWidth * 0.28);
const CARD_H = CARD_W * 1.32;

// ── Build cards ─────────────────────────────────────────────
const stage = document.getElementById('gcStage');
const cards = [];

PHOTOS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'gc-card';
    card.style.setProperty('--card-w', CARD_W + 'px');
    card.style.setProperty('--card-h', CARD_H + 'px');
    card.style.width  = CARD_W + 'px';
    card.style.height = CARD_H + 'px';
    card.style.zIndex = i;

    // Image (with placeholder fallback)
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.label;
    img.onerror = () => {
        img.style.display = 'none';
        const ph = document.createElement('div');
        ph.className = 'gc-card-placeholder';
        ph.textContent = `Photo ${i + 1}`;
        card.insertBefore(ph, card.firstChild);
    };

    // Label
    const label = document.createElement('div');
    label.className = 'gc-card-label';
    label.textContent = p.label;

    card.appendChild(img);
    card.appendChild(label);
    stage.appendChild(card);
    cards.push(card);

    card.addEventListener('click', () => {
        if (!wasDragging) openLightbox(i);
    });
});

// ── Apply transform helper ──────────────────────────────────
function setCard(card, { x = 0, y = 0, z = 0, rotX = 0, rotY = 0, rotZ = 0, scale = 1, opacity = 1, delay = 0 }) {
    card.style.transitionDelay = delay + 's';
    card.style.transform = `translate(-50%, -50%) translate3d(${x}px,${y}px,${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
    card.style.opacity = opacity;
}

// ── Layout modes ────────────────────────────────────────────
const modes = {

    reset(cards) {
        cards.forEach((c, i) => {
            setCard(c, { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1, opacity: 1, delay: i * 0.03 });
            c.style.zIndex = i;
        });
    },

    grid(cards) {
        const cols  = Math.ceil(Math.sqrt(cards.length));
        const gap   = CARD_W * 1.08;
        const gapH  = CARD_H * 1.08;
        const offX  = ((cols - 1) * gap) / 2;
        const rows  = Math.ceil(cards.length / cols);
        const offY  = ((rows - 1) * gapH) / 2;
        cards.forEach((c, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            setCard(c, {
                x: col * gap - offX,
                y: row * gapH - offY,
                scale: 1, opacity: 1,
                delay: (col + row) * 0.04
            });
            c.style.zIndex = i;
        });
    },

    circle(cards) {
        const n   = cards.length;
        const r   = Math.min(stage.offsetWidth, stage.offsetHeight) * 0.38;
        cards.forEach((c, i) => {
            const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            setCard(c, {
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r,
                rotZ: (i / n) * 360,
                scale: 0.88,
                opacity: 1,
                delay: i * 0.05
            });
            c.style.zIndex = i;
        });
    },

    wave(cards) {
        const gap = CARD_W * 1.05;
        const total = (cards.length - 1) * gap;
        cards.forEach((c, i) => {
            const x = i * gap - total / 2;
            const y = Math.sin((i / cards.length) * Math.PI * 2) * 80;
            setCard(c, {
                x, y,
                rotZ: Math.sin((i / cards.length) * Math.PI * 2) * 10,
                scale: 0.9, opacity: 1,
                delay: i * 0.04
            });
            c.style.zIndex = i;
        });
    },

    stagger(cards) {
        cards.forEach((c, i) => {
            setCard(c, {
                x: i * 18 - (cards.length * 9),
                y: i * 6  - (cards.length * 3),
                rotZ: (i - cards.length / 2) * 2,
                scale: 1 - i * 0.015,
                opacity: 1,
                delay: i * 0.04
            });
            c.style.zIndex = cards.length - i;
        });
    },

    fan(cards) {
        const total = 80;
        cards.forEach((c, i) => {
            const t   = cards.length > 1 ? i / (cards.length - 1) : 0.5;
            const rot = (t - 0.5) * total;
            const rad = rot * Math.PI / 180;
            const r   = CARD_H * 1.4;
            setCard(c, {
                x: Math.sin(rad) * r,
                y: -Math.cos(rad) * r + r,
                rotZ: rot,
                scale: 0.9,
                opacity: 1,
                delay: i * 0.04
            });
            c.style.zIndex = i < cards.length / 2 ? i : cards.length - i;
        });
    },

    depth(cards) {
        const gap = CARD_W * 0.55;
        const total = (cards.length - 1) * gap;
        cards.forEach((c, i) => {
            const t = i / (cards.length - 1 || 1);
            setCard(c, {
                x: i * gap - total / 2,
                y: 0,
                z: (1 - t) * -300,
                scale: 0.6 + t * 0.45,
                rotY: (0.5 - t) * 30,
                opacity: 0.4 + t * 0.6,
                delay: i * 0.04
            });
            c.style.zIndex = i;
        });
    },
};

// ── Button controls ─────────────────────────────────────────
let currentMode = 'grid';
modes.grid(cards);   // start in grid

document.getElementById('gcControls').addEventListener('click', e => {
    const btn  = e.target.closest('.gc-btn');
    if (!btn) return;
    const mode = btn.dataset.mode;
    if (!modes[mode]) return;

    document.querySelectorAll('.gc-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Reset transition delay before new animation
    cards.forEach(c => { c.style.transitionDelay = '0s'; });

    currentMode = mode;
    modes[mode](cards);
});

// ── Hover lift (don't override stage transform) ─────────────
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = 200;
    });
    card.addEventListener('mouseleave', () => {
        card.style.zIndex = cards.indexOf(card);
        modes[currentMode] && modes[currentMode](cards);
    });
});

// ── Lightbox ─────────────────────────────────────────────────
const lightbox  = document.getElementById('gcLightbox');
const lbImg     = document.getElementById('gcLbImg');
const lbCaption = document.getElementById('gcLbCaption');
const lbClose   = document.getElementById('gcLbClose');
const lbPrev    = document.getElementById('gcLbPrev');
const lbNext    = document.getElementById('gcLbNext');

let currentLbIndex = 0;
let wasDragging    = false;

function openLightbox(i) {
    currentLbIndex    = i;
    lbImg.src         = PHOTOS[i].src;
    lbImg.alt         = PHOTOS[i].label;
    lbCaption.textContent = PHOTOS[i].label;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lbPrev.addEventListener('click', () => {
    currentLbIndex = (currentLbIndex - 1 + PHOTOS.length) % PHOTOS.length;
    openLightbox(currentLbIndex);
});

lbNext.addEventListener('click', () => {
    currentLbIndex = (currentLbIndex + 1) % PHOTOS.length;
    openLightbox(currentLbIndex);
});

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { currentLbIndex = (currentLbIndex - 1 + PHOTOS.length) % PHOTOS.length; openLightbox(currentLbIndex); }
    if (e.key === 'ArrowRight') { currentLbIndex = (currentLbIndex + 1) % PHOTOS.length; openLightbox(currentLbIndex); }
});

















