'use strict';

/*   Hamburger menu */

const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('.menu');

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
doorWrap.addEventListener('click', triggerEnter);




/* project strip arrows */

const strip      = document.getElementById('projectsStrip');
const arrowLeft  = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

arrowLeft ?.addEventListener('click', () => strip.scrollBy({
    left: -460, behavior: 'smooth'})
);
arrowRight?.addEventListener('click', () => strip.scrollBy({
    left:  460, behavior: 'smooth' })
);






// Assignments

document.addEventListener('DOMContentLoaded', () => {

    // View More Button
    document.getElementById('viewMoreBtn').addEventListener('click', () => {
        document.getElementById('fullGrid').style.display = 'grid';
        document.getElementById('viewMoreBtn').style.display = 'none';
    });

    // Open Modal
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            showAssignmentModal(id);
        });
    });
});

function showAssignmentModal(id) {
    let title, desc, github;

    if (id === "1") {
        title = "ITS1119 CSS Exercise 3";
        github = "https://github.com/SayumiPerera/ITS1119_CSS_EX_3";
        desc = "Advanced CSS layouts and styling techniques";
    } else if (id === "2") {
        title = "ITS1119 CSS Exercise 4";
        github = "https://github.com/SayumiPerera/ITS1119_CSS_EX_4";
        desc = "Responsive design and modern CSS features";
    } else if (id === "3") {
        title = "ITS1119 JavaScript Exercise 1";
        github = "https://github.com/SayumiPerera/ITS1119_JS_EX_1";
        desc = "DOM manipulation and basic interactions";
    } else {
        title = "ITS1119 JavaScript Exercise 2";
        github = "https://github.com/SayumiPerera/ITS1119_JS_EX_2";
        desc = "Advanced JavaScript concepts and logic";
    }

    const modalHTML = `
        <div class="assignment-modal active" id="modal-${id}">
            <div class="modal-content">
                <button onclick="closeModal(${id})" style="float:right; background:none; border:none; font-size:30px; color:#e06020; cursor:pointer;">×</button>
                
                <h2>${title}</h2>
                <p>${desc}</p>
                
                <a href="${github}" target="_blank" class="proj-btn" style="margin: 20px 0; display:inline-block;">
                    <i class="fab fa-github"></i> View Full Repository
                </a>

                <h3 style="margin-top: 30px;">Cases / Exercises</h3>
                
                <div class="case-card">
                    <h4>Case 01</h4>
                    <div style="margin-top:12px;">
                        <a href="${github}" target="_blank" class="proj-btn">GitHub</a>
                        <a href="#" onclick="alert('Add your live demo link here')" class="proj-btn">See Output</a>
                    </div>
                </div>
                
                <div class="case-card">
                    <h4>Case 02</h4>
                    <div style="margin-top:12px;">
                        <a href="${github}" target="_blank" class="proj-btn">GitHub</a>
                        <a href="#" onclick="alert('Add your live demo link here')" class="proj-btn">See Output</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (modal) modal.remove();
}







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