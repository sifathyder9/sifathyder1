/* ============================================
   ALEX MORGAN — PORTFOLIO JAVASCRIPT
   Premium Digital Marketing & AI Automation
   ============================================ */

'use strict';

/* ─── LOADER ─── */
(function initLoader() {
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderText = document.getElementById('loaderText');
  const messages = ['Initializing...', 'Loading Assets...', 'Building Experience...', 'Almost Ready...', 'Welcome.'];
  let progress = 0;
  let msgIndex = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress > 100) progress = 100;
    loaderProgress.style.width = progress + '%';
    if (progress > (msgIndex + 1) * 20 && msgIndex < messages.length - 1) {
      msgIndex++;
      loaderText.textContent = messages[msgIndex];
    }
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initAllAnimations();
      }, 400);
    }
  }, 80);

  document.body.style.overflow = 'hidden';
})();

/* ─── LUCIDE ICONS ─── */
function initIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ─── CUSTOM CURSOR ─── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hide on mobile
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
  }
}

/* ─── PARTICLE CANVAS ─── */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6 ? '#7c3aed' : Math.random() > 0.5 ? '#06b6d4' : '#a78bfa';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.08;
          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    animId = requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', () => { resize(); init(); });
}

/* ─── NAVBAR ─── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ─── MOBILE MENU ─── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    toggleMenu(!isOpen);
  });

  overlay.addEventListener('click', () => toggleMenu(false));

  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ─── TYPED TEXT EFFECT ─── */
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const words = ['Marketing Machines', 'AI Automations', 'Growth Systems', 'Revenue Engines', 'Data Strategies'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPausing = false;

  function type() {
    const current = words[wordIndex];
    const speed = isDeleting ? 60 : 100;

    if (isPausing) return;

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isPausing = true;
        setTimeout(() => { isPausing = false; isDeleting = true; }, 2200);
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, speed);
  }

  type();
}

/* ─── COUNTER ANIMATION ─── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─── SCROLL REVEAL ANIMATIONS ─── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay ? parseInt(entry.target.dataset.delay) : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ─── WORK FILTERS ─── */
function initWorkFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      workCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Add fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

/* ─── CONTACT FORM ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalContent = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;"><svg style="width:18px;height:18px;animation:spin 0.8s linear infinite" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> Sending...</span>';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    // Add spin animation
    if (!document.getElementById('spinStyle')) {
      const spinStyle = document.createElement('style');
      spinStyle.id = 'spinStyle';
      spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(spinStyle);
    }

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.disabled = false;
      btn.style.opacity = '';
      form.reset();
      if (successMsg) {
        successMsg.classList.add('visible');
        lucide.createIcons();
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
      }
    }, 2000);
  });

  // Input focus effects
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}

/* ─── SCROLL TO TOP ─── */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── SMOOTH SCROLL ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── TILT EFFECT ON CARDS ─── */
function initTiltEffect() {
  const cards = document.querySelectorAll('.service-card, .work-card, .testimonial-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ─── NAVBAR ACTIVE NAV STYLE ─── */
function addNavActiveStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--primary-light) !important;
      background: rgba(124, 58, 237, 0.08);
    }
  `;
  document.head.appendChild(style);
}

/* ─── GLOWING CARD BORDER ON HOVER ─── */
function initGlowingBorders() {
  const cards = document.querySelectorAll('.service-card, .work-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
    });
  });
}

/* ─── MARQUEE HOVER PAUSE ─── */
function initMarquee() {
  const marquee = document.querySelector('.marquee-content');
  if (!marquee) return;

  marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });

  marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
}

/* ─── PROGRESSIVE SECTION GRADIENT BACKGROUNDS ─── */
function initSectionEffects() {
  // Add a subtle parallax to the hero background
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    }, { passive: true });
  }
}

/* ─── NUMBER FORMAT ─── */
function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num;
}

/* ─── WORK CARD HOVER MAGNETIC EFFECT ─── */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-ghost');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ─── PAGE VISIBILITY OPTIMIZATION ─── */
function initPageVisibility() {
  document.addEventListener('visibilitychange', () => {
    document.title = document.hidden
      ? '👀 Come Back! — Alex Morgan'
      : 'Alex Morgan | Digital Marketing & AI Automation Expert';
  });
}

/* ─── PROCESS STEP HOVER ─── */
function initProcessSteps() {
  const steps = document.querySelectorAll('.process-step');
  steps.forEach((step, i) => {
    step.addEventListener('mouseenter', () => {
      steps.forEach((s, j) => {
        if (i !== j) {
          s.style.opacity = '0.5';
          s.style.transform = 'scale(0.97)';
        }
      });
    });
    step.addEventListener('mouseleave', () => {
      steps.forEach(s => {
        s.style.opacity = '';
        s.style.transform = '';
      });
    });
  });

  // Add smooth transition for process steps
  steps.forEach(step => {
    step.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
}

/* ─── FOOTER YEAR ─── */
function updateYear() {
  const yearSpans = document.querySelectorAll('.footer-bottom span:first-child');
  const year = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = span.textContent.replace(/\d{4}/, year);
  });
}

/* ─── INITIALIZE ALL ─── */
function initAllAnimations() {
  initIcons();
  initCursor();
  initParticles();
  initNavbar();
  initMobileMenu();
  initTyped();
  initCounters();
  initScrollReveal();
  initWorkFilters();
  initContactForm();
  initScrollTop();
  initSmoothScroll();
  initTiltEffect();
  addNavActiveStyle();
  initGlowingBorders();
  initMarquee();
  initSectionEffects();
  initMagneticButtons();
  initPageVisibility();
  initProcessSteps();
  updateYear();

  // Re-run lucide icons after a tick to ensure DOM is ready
  setTimeout(() => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }, 100);
}

/* ─── PERFORMANCE: LAZY LOAD IMAGES ─── */
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imgObserver.observe(img));
  } else {
    images.forEach(img => { img.src = img.dataset.src; });
  }
});

/* ─── EASTER EGG: KONAMI CODE ─── */
(function initKonami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', (e) => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        showEasterEgg();
      }
    } else {
      pos = 0;
    }
  });

  function showEasterEgg() {
    const egg = document.createElement('div');
    egg.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: rgba(124, 58, 237, 0.95); backdrop-filter: blur(20px);
      border: 1px solid rgba(167, 139, 250, 0.4);
      color: white; padding: 30px 50px; border-radius: 16px;
      font-family: 'DM Mono', monospace; font-size: 1rem; text-align: center;
      z-index: 99999; box-shadow: 0 0 60px rgba(124, 58, 237, 0.5);
      animation: eggPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `;
    egg.innerHTML = '🎮 You found the secret!<br><small style="opacity:0.7">You\'re clearly a person of culture 😄</small>';
    document.body.appendChild(egg);

    const popStyle = document.createElement('style');
    popStyle.textContent = '@keyframes eggPop { from { opacity:0; transform: translate(-50%,-50%) scale(0.5); } to { opacity:1; transform: translate(-50%,-50%) scale(1); } }';
    document.head.appendChild(popStyle);

    setTimeout(() => egg.remove(), 3000);
  }
})();