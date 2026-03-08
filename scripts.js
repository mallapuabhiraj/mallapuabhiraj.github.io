// ── Theme Toggle ──
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
  
  // Add rotation animation
  themeIcon.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeIcon.style.transform = 'rotate(0deg)';
  }, 300);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ── Enhanced Custom Cursor ──
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// Check if touch device
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Click animation
  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
  });

  function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    // Delayed follower
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Hover effects
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .bug-card, .ide-dot, .stat-card, .contact-link, .theme-toggle');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
} else {
  // Hide cursor on touch devices
  cursor.style.display = 'none';
  cursorFollower.style.display = 'none';
  document.body.style.cursor = 'auto';
}

// ── Typing Effect ──
const text = "ML Engineer";
const typingElement = document.getElementById('typing-text');
let index = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = text;
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, index - 1);
    index--;
  } else {
    typingElement.textContent = currentText.substring(0, index + 1);
    index++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && index === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && index === 0) {
    isDeleting = false;
    typeSpeed = 500; // Pause before typing
  }

  setTimeout(typeEffect, typeSpeed);
}

setTimeout(typeEffect, 1000);

// ── Floating Particles ──
const particlesContainer = document.getElementById('particles');
const emojis = ['💻', '⚡', '🔍', '📊', '🤖', '💡', '🚀', '⚙️', '📈', '🔬', '💾', '🎯'];

function createParticles() {
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Mouse-reactive particles
if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseXPercent = e.clientX / window.innerWidth;
    const mouseYPercent = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
      if (index % 3 === 0) { // Only affect every 3rd particle for performance
        const speed = 20;
        const x = (mouseXPercent - 0.5) * speed;
        const y = (mouseYPercent - 0.5) * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  });
}

// ── Fun Facts Carousel ──
const funFacts = document.querySelectorAll('.fun-fact');
let currentFact = 0;

function rotateFacts() {
  funFacts[currentFact].classList.remove('active');
  currentFact = (currentFact + 1) % funFacts.length;
  funFacts[currentFact].classList.add('active');
}

setInterval(rotateFacts, 4000);

// ── Scroll Reveal ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate skill bars
      const skillFills = entry.target.querySelectorAll('.skill-fill');
      skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width;
        }, 300);
      });
    }
  });
}, { 
  threshold: 0.1, 
  rootMargin: '0px 0px -50px 0px' 
});

reveals.forEach(el => revealObserver.observe(el));

// ── Party Mode ──
let partyMode = false;
function togglePartyMode() {
  partyMode = !partyMode;
  document.body.classList.toggle('party-mode');
  
  if (partyMode) {
    createConfetti();
    // Change particles to party mode
    const particles = document.querySelectorAll('.particle');
    particles.forEach(p => {
      p.style.animationDuration = '5s';
      p.style.opacity = '0.3';
    });
  } else {
    // Reset particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach(p => {
      p.style.animationDuration = (15 + Math.random() * 10) + 's';
      p.style.opacity = '0.1';
    });
  }
}

// ── Confetti Effects ──
function createConfetti() {
  const colors = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f', '#ff6b6b', '#4ecdc4', '#45b7d1'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);
    
    let pos = -10;
    let speed = Math.random() * 3 + 2;
    let wobble = Math.random() * 4 - 2;
    let rotation = 0;
    let rotationSpeed = Math.random() * 10 - 5;
    
    function fall() {
      pos += speed;
      rotation += rotationSpeed;
      confetti.style.top = pos + 'px';
      confetti.style.left = parseFloat(confetti.style.left) + wobble + 'px';
      confetti.style.transform = `rotate(${rotation}deg)`;
      
      if (pos < window.innerHeight) {
        requestAnimationFrame(fall);
      } else {
        confetti.remove();
      }
    }
    
    fall();
  }
}

// Burst confetti from specific point (for avatar click)
function burstConfetti(event) {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
  const rect = event.target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = centerX + 'px';
    confetti.style.top = centerY + 'px';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);
    
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = Math.random() * 5 + 3;
    let velX = Math.cos(angle) * velocity;
    let velY = Math.sin(angle) * velocity;
    let posX = centerX;
    let posY = centerY;
    let opacity = 1;
    
    function explode() {
      posX += velX;
      posY += velY;
      velY += 0.2; // Gravity
      opacity -= 0.02;
      
      confetti.style.left = posX + 'px';
      confetti.style.top = posY + 'px';
      confetti.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(explode);
      } else {
        confetti.remove();
      }
    }
    
    explode();
  }
}

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  });
});

function scrollToProjects() {
  document.getElementById('projects').scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  });
}

// ── Mobile Menu ──
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  mobileNav.classList.toggle('active');
  
  // Animate hamburger
  const btn = document.querySelector('.mobile-menu-btn');
  btn.classList.toggle('active');
}

// ── IDE Window 3D Tilt Effect ──
const ideWindow = document.querySelector('.ide-window');
if (ideWindow && !isTouchDevice) {
  ideWindow.addEventListener('mousemove', (e) => {
    const rect = ideWindow.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    ideWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  
  ideWindow.addEventListener('mouseleave', () => {
    ideWindow.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
}

// ── Magnetic Button Effect ──
const magneticElements = document.querySelectorAll('.btn, .card-link');
if (!isTouchDevice) {
  magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}

// ── Parallax Effect on Scroll ──
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero');
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ── Keyboard Shortcuts ──
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K for theme toggle
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    themeToggle.click();
  }
  
  // Ctrl/Cmd + P for party mode
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
    togglePartyMode();
  }
});

// ── Nav Logo Hover Effect ──
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.transform = 'scale(1.05) rotate(-2deg)';
  });
  navLogo.addEventListener('mouseleave', () => {
    navLogo.style.transform = 'scale(1) rotate(0deg)';
  });
}

// ── Project Card Hover Sound Effect (Visual Feedback) ──
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

// ── Performance: Pause animations when tab is hidden ──
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.body.classList.add('paused');
  } else {
    document.body.classList.remove('paused');
  }
});

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class for initial animations
  document.body.classList.add('loaded');
  
  // Animate nav on load
  setTimeout(() => {
    document.querySelector('nav').style.opacity = '1';
    document.querySelector('nav').style.transform = 'translateY(0)';
  }, 100);
});

// Hide nav on scroll down, show on scroll up
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
});