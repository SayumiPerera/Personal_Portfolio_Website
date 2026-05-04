'use strict';

/*   Hamburger menu */

const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('.menu');          // ← fix

menuBtn.addEventListener('click', e => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
});

document.querySelectorAll('.menu a').forEach(a =>
    a.addEventListener('click', () => navMenu.classList.remove('open'))
);
document.addEventListener('click', () => navMenu.classList.remove('open'));


/* Navbar  */

window.addEventListener('scroll', () =>
    document.querySelector('.navbar').classList.toggle('sticky', scrollY > 20)
);



/*  door overlay */

const overlay  = document.getElementById('door-overlay');
const doorWrap = document.getElementById('door-wrap');
let hoverTimer = null, hasEntered = false;

function triggerEnter() {
    if (hasEntered) return;
    hasEntered = true;
    overlay.classList.add('entering');
    setTimeout(() => overlay.classList.add('entered'), 2800);
}

doorWrap.addEventListener('mouseenter', () => {
    if (!hasEntered) hoverTimer = setTimeout(triggerEnter, 1000);
});
doorWrap.addEventListener('mouseleave', () => {
    if (!hasEntered) clearTimeout(hoverTimer);
});
doorWrap.addEventListener('click', triggerEnter);   // mobile tap




/* project strip arrows */

const strip      = document.getElementById('projectsStrip');
const arrowLeft  = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

arrowLeft ?.addEventListener('click', () => strip.scrollBy({ left: -460, behavior: 'smooth' }));
arrowRight?.addEventListener('click', () => strip.scrollBy({ left:  460, behavior: 'smooth' }));




/*  gallery lightbox*/

const galleryCards = [...document.querySelectorAll('.gallery-card')];
const lightboxEl   = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxCap  = document.getElementById('lightboxCaption');
const lbClose      = document.getElementById('lightboxClose');
const lbPrev       = document.getElementById('lightboxPrev');
const lbNext       = document.getElementById('lightboxNext');

if (lightboxEl && galleryCards.length) {
    const photos = galleryCards.map(c => ({
        src  : c.querySelector('img').src,
        label: c.querySelector('.gallery-card-overlay span')?.textContent ?? ''
    }));

    let idx = 0;

    const openLb = i => {
        idx = i;
        lightboxImg.src         = photos[i].src;
        lightboxCap.textContent = photos[i].label;
        lightboxEl.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLb = () => {
        lightboxEl.classList.remove('active');
        document.body.style.overflow = '';
    };

    galleryCards.forEach((c, i) => c.addEventListener('click', () => openLb(i)));
    lbClose.addEventListener('click', closeLb);
    lightboxEl.addEventListener('click', e => { if (e.target === lightboxEl) closeLb(); });
    lbPrev.addEventListener('click', () => openLb((idx - 1 + photos.length) % photos.length));
    lbNext.addEventListener('click', () => openLb((idx + 1) % photos.length));

    document.addEventListener('keydown', e => {
        if (!lightboxEl.classList.contains('active')) return;
        if (e.key === 'Escape')     closeLb();
        if (e.key === 'ArrowLeft')  openLb((idx - 1 + photos.length) % photos.length);
        if (e.key === 'ArrowRight') openLb((idx + 1) % photos.length);
    });
}