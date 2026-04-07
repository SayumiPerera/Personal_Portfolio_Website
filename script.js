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

// Projects strip — drag to scroll + arrow buttons
(function () {
    const strip     = document.getElementById('projectsStrip');
    const arrowL    = document.getElementById('arrowLeft');
    const arrowR    = document.getElementById('arrowRight');
    if (!strip) return;

    // Arrow scroll
    const SCROLL_AMOUNT = 460;
    arrowL.addEventListener('click', () => strip.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' }));
    arrowR.addEventListener('click', () => strip.scrollBy({ left:  SCROLL_AMOUNT, behavior: 'smooth' }));

    // Drag to scroll
    let isDragging = false, startX = 0, scrollLeft = 0;

    strip.addEventListener('mousedown', (e) => {
        isDragging = true;
        strip.classList.add('dragging');
        startX     = e.pageX - strip.offsetLeft;
        scrollLeft = strip.scrollLeft;
    });
    strip.addEventListener('mouseleave', () => { isDragging = false; strip.classList.remove('dragging'); });
    strip.addEventListener('mouseup',    () => { isDragging = false; strip.classList.remove('dragging'); });
    strip.addEventListener('mousemove',  (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x    = e.pageX - strip.offsetLeft;
        const walk = (x - startX) * 1.4;
        strip.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    let touchStartX = 0, touchScrollLeft = 0;
    strip.addEventListener('touchstart', (e) => {
        touchStartX    = e.touches[0].pageX;
        touchScrollLeft = strip.scrollLeft;
    }, { passive: true });
    strip.addEventListener('touchmove', (e) => {
        const x    = e.touches[0].pageX;
        const walk = (touchStartX - x) * 1.2;
        strip.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });
})();




























