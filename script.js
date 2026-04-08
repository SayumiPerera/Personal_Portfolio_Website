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





















