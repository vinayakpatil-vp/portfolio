// ============================================================
// Vinayak Patil Portfolio — vanilla HTML/CSS/JS build
// Uses GSAP + ScrollTrigger + Lenis (loaded via CDN in index.html)
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

gsap.registerPlugin(ScrollTrigger);

// ------------------------------------------------------------
// Smooth scroll (Lenis)
// ------------------------------------------------------------
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ------------------------------------------------------------
// Custom cursor
// ------------------------------------------------------------
const cursorDot = document.getElementById('cursorDot');
const cursorFollower = document.getElementById('cursorFollower');

if (window.matchMedia('(pointer: fine)').matches) {
  gsap.set([cursorDot, cursorFollower], { x: -100, y: -100 });

  window.addEventListener('mousemove', (e) => {
    gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
    gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power4.out' });
  });

  document.body.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (
      target.tagName.toLowerCase() === 'a' ||
      target.tagName.toLowerCase() === 'button' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('interactive')
    ) {
      gsap.to(cursorDot, { scale: 0.5, duration: 0.2 });
      gsap.to(cursorFollower, { scale: 2.5, backgroundColor: 'rgba(255, 191, 0, 0.1)', borderColor: 'transparent', duration: 0.2 });
    }
  }, true);

  document.body.addEventListener('mouseout', () => {
    gsap.to(cursorDot, { scale: 1, duration: 0.2 });
    gsap.to(cursorFollower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.3)', duration: 0.2 });
  }, true);
}

// ------------------------------------------------------------
// Splash screen
// ------------------------------------------------------------
const splash = document.getElementById('splash');
setTimeout(() => {
  splash.classList.add('hidden');
}, 2500);

// ------------------------------------------------------------
// Hero — character reveal + parallax
// ------------------------------------------------------------
const heroTitle = document.getElementById('heroTitle');
const heroRole = document.getElementById('heroRole');
const name = 'Vinayak Patil';

name.split('').forEach((char) => {
  const span = document.createElement('span');
  span.className = 'char';
  span.textContent = char === ' ' ? '\u00A0' : char;
  heroTitle.appendChild(span);
});

const chars = heroTitle.querySelectorAll('.char');

gsap.fromTo(chars,
  { opacity: 0, y: 100, rotateX: -90 },
  { opacity: 1, y: 0, rotateX: 0, stagger: 0.05, duration: 1.5, ease: 'power4.out', delay: 2.5 }
);

gsap.fromTo(heroRole,
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 1, delay: 3.5, ease: 'power2.out' }
);

gsap.to(heroTitle, {
  y: 200,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});

// ------------------------------------------------------------
// About — ink bleed reveal + text stagger
// ------------------------------------------------------------
const aboutInk = document.getElementById('aboutInk');
aboutInk.classList.add('ink-bleed');

gsap.to(aboutInk, {
  clipPath: 'circle(150% at 50% 50%)',
  ease: 'power3.inOut',
  scrollTrigger: {
    trigger: '#about',
    start: 'top center',
    end: 'bottom center',
    scrub: 1,
  },
});

const aboutText = document.getElementById('aboutText');
gsap.fromTo(Array.from(aboutText.children),
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: aboutText,
      start: 'top 80%',
    },
  }
);
// also stagger the inner heading/paragraph/tools blocks
gsap.fromTo('.about-heading, .about-text, .about-tools',
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: aboutText,
      start: 'top 80%',
    },
  }
);

// ------------------------------------------------------------
// Projects data + render
// ------------------------------------------------------------
const projects = [
  {
    title: 'Elara Diamonds',
    category: 'Brand Identity',
    desc: 'A complete luxury identity system for a lab-grown diamond brand, from refined logo marks and typography to packaging, catalogue and campaign applications.',
    accent: '#dc9140',
    img: 'images/elara-brand-board.jpeg',
    objectPosition: 'center center',
    gallery: [
      { img: 'images/elara-brand-board.jpeg', alt: 'Elara Diamonds brand identity board' },
      { img: 'images/elara-catalogue.jpeg', alt: 'Elara Diamonds jewellery catalogue and custom ring experience' },
      { img: 'images/elara-campaign.jpeg', alt: 'Elara Diamonds campaign and social media collage' },
      { img: 'images/elara-social.jpeg', alt: 'Elara Diamonds social media and packaging visuals' },
    ],
  },
  {
    title: "Tony's Kitchen",
    category: 'Food Brand Identity',
    desc: 'Warm, inviting branding for a home-cooked food business, including logo development, packaging, menu design and customer-facing visual assets.',
    accent: '#ff6b72',
    img: 'images/tonys-kitchen-brand-board.jpeg',
    objectPosition: 'center center',
    gallery: [
      { img: 'images/tonys-kitchen-brand-board.jpeg', alt: "Tony's Kitchen brand identity board" },
      { img: 'images/tonys-kitchen-packaging.jpeg', alt: "Tony's Kitchen takeaway packaging and food presentation" },
      { img: 'images/tonys-kitchen-menu.jpeg', alt: "Tony's Kitchen food menu design" },
    ],
  },
  {
    title: 'The Foxnut Farm',
    category: 'Packaging & Brand',
    desc: 'A cheerful, premium identity for a makhana brand, balancing earthy storytelling, playful illustration and packaging that feels trustworthy on shelf and social.',
    accent: '#ff8a00',
    img: 'images/foxnut-brand-board.jpeg',
    objectPosition: 'center center',
    gallery: [
      { img: 'images/foxnut-brand-board.jpeg', alt: 'The Foxnut Farm brand identity board' },
      { img: 'images/foxnut-campaign.jpeg', alt: 'The Foxnut Farm campaign and product collage' },
      { img: 'images/foxnut-packaging.jpeg', alt: 'The Foxnut Farm packaging journey illustration' },
    ],
  },
  {
    title: 'Kiro Beauty',
    category: 'Canter Wrap Design',
    desc: 'Mobile branding for Kiro Clean Beauty at Palladium Mall. Abstract patterns, bold colors, 100% vegan branding.',
    accent: '#f43f5e',
    img: 'images/kiro.png',
    objectPosition: 'center center',
    gallery: [{ img: 'images/kiro.png', alt: 'Kiro Beauty canter wrap design' }],
  },
  {
    title: 'Ring Styling',
    category: 'Web Banner',
    desc: 'Clean, elegant event promotion banner for a personalised engagement ring styling session in Borivali, Mumbai.',
    accent: '#fcd34d',
    img: 'images/ring.png',
    objectPosition: 'center top',
    gallery: [{ img: 'images/ring.png', alt: 'Ring styling web banner' }],
  },
  {
    title: 'Bandra Wineout',
    category: 'Event Poster',
    desc: 'Vibrant festival poster with a wine bottle composition — an explosion of color, music, food and festivities.',
    accent: '#a855f7',
    img: 'images/wineout.png',
    objectPosition: 'center bottom',
    gallery: [{ img: 'images/wineout.png', alt: 'Bandra Wineout event poster' }],
  },
  {
    title: 'Borzowefast',
    category: 'Auto Rickshaw Sticker',
    desc: "Bold urban back-sticker for Borzo's new truck delivery service. Eye-catching design for high-traffic visibility.",
    accent: '#22d3ee',
    img: 'images/borzo.png',
    objectPosition: 'center center',
    gallery: [{ img: 'images/borzo.png', alt: 'Borzowefast auto rickshaw sticker' }],
  },
];

const projectsTrack = document.getElementById('projectsTrack');
projectsTrack.style.width = `${projects.length * 100}vw`;

projects.forEach((proj, i) => {
  const gallery = proj.gallery || [{ img: proj.img, alt: proj.title }];
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-card-inner">
      <div class="project-image-wrap interactive" data-index="${i}" role="button" tabindex="0" aria-label="View full image of ${proj.title}">
        <div class="overlay-color" style="background-color: ${proj.accent};"></div>
        <img src="${proj.img}" alt="${gallery[0].alt}" style="object-position: ${proj.objectPosition};" />
        <div class="vignette"></div>
        <div class="expand-hint"><span>Click to expand</span></div>
        <div class="category-badge" style="background-color: ${proj.accent};">${proj.category}</div>
      </div>
      <div class="project-content">
        <span class="project-index" style="color: ${proj.accent};">0${i + 1} // ${proj.category}</span>
        <h3>${proj.title}</h3>
        <p>${proj.desc}</p>
        <button class="view-full-btn interactive" data-index="${i}">
          <span>View Project${gallery.length > 1 ? ` (${gallery.length} images)` : ''}</span>
          <span class="line"></span>
        </button>
      </div>
    </div>
  `;
  projectsTrack.appendChild(card);
});

// Horizontal pinned scroll for project cards
const projectCards = gsap.utils.toArray('.project-card');
gsap.to(projectCards, {
  xPercent: -100 * (projectCards.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '#projects',
    pin: true,
    scrub: 1,
    snap: 1 / (projectCards.length - 1),
    end: () => '+=' + projectsTrack.offsetWidth,
  },
});

// ------------------------------------------------------------
// Lightbox
// ------------------------------------------------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxBadge = document.getElementById('lightboxBadge');
const lightboxName = document.getElementById('lightboxName');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxTopbar = document.getElementById('lightboxTopbar');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let activeProjectIndex = 0;
let activeGalleryIndex = 0;

function renderLightboxImage() {
  const proj = projects[activeProjectIndex];
  const gallery = proj.gallery || [{ img: proj.img, alt: proj.title }];
  const image = gallery[activeGalleryIndex];
  lightboxImg.src = image.img;
  lightboxImg.alt = image.alt;
  lightboxImg.style.boxShadow = `0 0 80px ${proj.accent}33`;
  lightboxBadge.textContent = proj.category;
  lightboxBadge.style.backgroundColor = proj.accent;
  lightboxName.textContent = proj.title;
  lightboxCounter.textContent = gallery.length > 1 ? `${activeGalleryIndex + 1} / ${gallery.length}` : '';
  lightboxPrev.hidden = gallery.length < 2;
  lightboxNext.hidden = gallery.length < 2;
  lightboxTopbar.style.backgroundColor = proj.accent;
}

function openLightbox(index, galleryIndex = 0) {
  activeProjectIndex = index;
  activeGalleryIndex = galleryIndex;
  renderLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

projectsTrack.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-index]');
  if (trigger) openLightbox(Number(trigger.dataset.index));
});

projectsTrack.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const trigger = e.target.closest('[data-index]');
    if (trigger) openLightbox(Number(trigger.dataset.index));
  }
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => {
  const gallery = projects[activeProjectIndex].gallery || [projects[activeProjectIndex]];
  activeGalleryIndex = (activeGalleryIndex - 1 + gallery.length) % gallery.length;
  renderLightboxImage();
});
lightboxNext.addEventListener('click', () => {
  const gallery = projects[activeProjectIndex].gallery || [projects[activeProjectIndex]];
  activeGalleryIndex = (activeGalleryIndex + 1) % gallery.length;
  renderLightboxImage();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) lightboxPrev.click();
  if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) lightboxNext.click();
});

// ------------------------------------------------------------
// Journey / Experience timeline
// ------------------------------------------------------------
const experiences = [
  {
    role: 'Graphic Designer & Social Media Manager',
    company: 'Aarvia Fintech Advisor Pvt. Ltd.',
    date: 'Jan 2026 – Present',
    desc: 'Managing visual identity across Instagram, LinkedIn, YouTube, and Facebook. Creating high-impact posts and reels that drive engagement.',
  },
  {
    role: 'Graphic Designer & Editor',
    company: 'Alpha Digital Prints Pvt. Ltd.',
    date: '2024 – 2025',
    desc: 'Led custom print box packaging design. Mastered workflows in CorelDRAW, Photoshop, and Illustrator for print-ready perfection.',
  },
  {
    role: 'Graphic Designer & Editor',
    company: 'Smartads',
    date: '2024',
    desc: 'Handled end-to-end design requirements and direct client communication, delivering targeted visual solutions.',
  },
];

const timelineItems = document.getElementById('timelineItems');

experiences.forEach((exp, i) => {
  const item = document.createElement('div');
  item.className = `timeline-item${i % 2 === 0 ? ' reverse' : ''}`;
  item.innerHTML = `
    <div class="timeline-node"></div>
    <div class="timeline-content">
      <span class="timeline-date">${exp.date}</span>
      <h3>${exp.role}</h3>
      <h4>${exp.company}</h4>
      <p>${exp.desc}</p>
    </div>
    <div class="timeline-spacer"></div>
  `;
  timelineItems.appendChild(item);
});

gsap.utils.toArray('.timeline-item').forEach((item) => {
  gsap.fromTo(item,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      },
    }
  );
});

gsap.fromTo('#timelineLine',
  { scaleY: 0 },
  {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      end: 'bottom 50%',
      scrub: true,
    },
  }
);

// ------------------------------------------------------------
// Contact reveal
// ------------------------------------------------------------
gsap.fromTo('#contactTitle',
  { scale: 0.8, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 1.5,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 70%',
    },
  }
);
