// Typing Effect
const text = "Abhi Raju Mallapu";
const typingElement = document.getElementById('typing-text');
let index = 0;

function typeText() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(() => {
      typingElement.style.borderRight = 'none';
    }, 1000);
  }
}

setTimeout(typeText, 500);

// Custom Cursor
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;
  cursor.style.left = cursorX - 10 + 'px';
  cursor.style.top = cursorY - 10 + 'px';
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effect for cursor
const interactiveElements = document.querySelectorAll('a, button, .project-card, .bug-card');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Floating Particles
const particlesContainer = document.getElementById('particles');
const emojis = ['', '', '', '', '', '', '', '', '', '', '', ''];

for (let i = 0; i < 8; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 15 + 's';
  particle.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
  particlesContainer.appendChild(particle);
}

// Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate skill bars if this is the skills section
      const skillFills = entry.target.querySelectorAll('.skill-fill');
      skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width;
        }, 200);
      });
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Party Mode Easter Egg
let partyMode = false;
function togglePartyMode() {
  partyMode = !partyMode;
  document.body.classList.toggle('party-mode');
  
  if (partyMode) {
    for (let i = 0; i < 50; i++) {
      createConfetti();
    }
  }
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.width = '10px';
  confetti.style.height = '10px';
  confetti.style.background = ['#ff0', '#f0f', '#0ff', '#0f0', '#f00', '#00f'][Math.floor(Math.random() * 6)];
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-10px';
  confetti.style.borderRadius = '50%';
  confetti.style.zIndex = '9999';
  confetti.style.pointerEvents = 'none';
  document.body.appendChild(confetti);
  
  let pos = -10;
  let speed = Math.random() * 3 + 2;
  let wobble = Math.random() * 2 - 1;
  
  function fall() {
    pos += speed;
    confetti.style.top = pos + 'px';
    confetti.style.left = parseFloat(confetti.style.left) + wobble + 'px';
    confetti.style.transform = `rotate(${pos}deg)`;
    
    if (pos < window.innerHeight) {
      requestAnimationFrame(fall);
    } else {
      confetti.remove();
    }
  }
  
  fall();
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Hide cursor on mobile
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  mobileNav.classList.toggle('active');
}

// Add hover effect to nav logo
const navLogo = document.querySelector('.nav-logo');
navLogo.addEventListener('mouseenter', () => {
  navLogo.style.transform = 'scale(1.05) rotate(-2deg)';
});
navLogo.addEventListener('mouseleave', () => {
  navLogo.style.transform = 'scale(1) rotate(0deg)';
});
