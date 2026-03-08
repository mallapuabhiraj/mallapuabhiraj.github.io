// ── Theme Toggle ──
(function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
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
    if (themeIcon) {
      themeIcon.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeIcon.style.transform = 'rotate(0deg)';
      }, 300);
    }
  });
  
  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
})();

// ── Enhanced Custom Cursor ──
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  
  // Check if elements exist and not touch device
  if (!cursor || !cursorFollower) return;
  
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;
  let rafId = null;
  let isActive = true;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isActive) {
      isActive = true;
      animateCursor();
    }
  });
  
  // Click animation
  document.addEventListener('mousedown', () => {
    cursor.classList.add('clicking');
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking');
  });
  
  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
    }
  });
  
  function animateCursor() {
    if (!isActive) return;
    
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
    
    rafId = requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Hover effects
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .bug-card, .ide-dot, .stat-card, .contact-link, .theme-toggle');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();

// ── Typing Effect ──
(function initTyping() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const text = "ML Engineer";
  let index = 0;
  let isDeleting = false;
  let typeInterval = null;
  
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
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      typeSpeed = 500;
    }
  
    typeInterval = setTimeout(typeEffect, typeSpeed);
  }
  
  // Start after delay
  setTimeout(typeEffect, 1000);
  
  // Cleanup on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && typeInterval) {
      clearTimeout(typeInterval);
    }
  });
})();

// ── Floating Particles ──
(function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const emojis = ['💻', '⚡', '🔍', '📊', '🤖', '💡', '🚀', '⚙️', '📈', '🔬', '💾', '🎯'];
  const particles = [];
  const maxParticles = 12;
  
  // Create particles
  for (let i = 0; i < maxParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    particle.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    particlesContainer.appendChild(particle);
    particles.push(particle);
  }
  
  // Mouse-reactive particles (throttled)
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice) {
    let throttleTimer = null;
    
    document.addEventListener('mousemove', (e) => {
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, 50); // Throttle to 20fps
      
      const mouseXPercent = e.clientX / window.innerWidth;
      const mouseYPercent = e.clientY / window.innerHeight;
      
      // Only update every 3rd particle for performance
      for (let i = 0; i < particles.length; i += 3) {
        const particle = particles[i];
        const speed = 20;
        const x = (mouseXPercent - 0.5) * speed;
        const y = (mouseYPercent - 0.5) * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
  }
})();

// ── Fun Facts Carousel ──
(function initFunFacts() {
  const funFacts = document.querySelectorAll('.fun-fact');
  if (funFacts.length === 0) return;
  
  let currentFact = 0;
  let factInterval = null;
  
  function rotateFacts() {
    funFacts[currentFact].classList.remove('active');
    currentFact = (currentFact + 1) % funFacts.length;
    funFacts[currentFact].classList.add('active');
  }
  
  factInterval = setInterval(rotateFacts, 4000);
  
  // Cleanup
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && factInterval) {
      clearInterval(factInterval);
    } else if (!document.hidden && !factInterval) {
      factInterval = setInterval(rotateFacts, 4000);
    }
  });
})();

// ── Scroll Reveal ──
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Animate skill bars
        const skillFills = entry.target.querySelectorAll('.skill-fill');
        skillFills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          if (width) {
            setTimeout(() => {
              fill.style.width = width;
            }, 300);
          }
        });
        
        // Unobserve after revealing
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  });
  
  reveals.forEach(el => revealObserver.observe(el));
})();

// ── Party Mode ──
let partyMode = false;
function togglePartyMode() {
  partyMode = !partyMode;
  document.body.classList.toggle('party-mode');
  
  const particles = document.querySelectorAll('.particle');
  
  if (partyMode) {
    createConfetti();
    particles.forEach(p => {
      p.style.animationDuration = '5s';
      p.style.opacity = '0.3';
    });
  } else {
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
    confetti.className = 'confetti';
    confetti.style.cssText = `
      position: fixed;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(confetti);
    
    let pos = -10;
    let speed = Math.random() * 3 + 2;
    let wobble = Math.random() * 4 - 2;
    let rotation = 0;
    let rotationSpeed = Math.random() * 10 - 5;
    let rafId = null;
    
    function fall() {
      pos += speed;
      rotation += rotationSpeed;
      confetti.style.top = pos + 'px';
      confetti.style.left = parseFloat(confetti.style.left) + wobble + 'px';
      confetti.style.transform = `rotate(${rotation}deg)`;
      
      if (pos < window.innerHeight) {
        rafId = requestAnimationFrame(fall);
      } else {
        confetti.remove();
        if (rafId) cancelAnimationFrame(rafId);
      }
    }
    
    fall();
  }
}

// Burst confetti from specific point
function burstConfetti(event) {
  if (!event) return;
  
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
  const rect = event.target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${centerX}px;
      top: ${centerY}px;
      border-radius: 50%;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(confetti);
    
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = Math.random() * 5 + 3;
    let velX = Math.cos(angle) * velocity;
    let velY = Math.sin(angle) * velocity;
    let posX = centerX;
    let posY = centerY;
    let opacity = 1;
    let rafId = null;
    
    function explode() {
      posX += velX;
      posY += velY;
      velY += 0.2;
      opacity -= 0.02;
      
      confetti.style.left = posX + 'px';
      confetti.style.top = posY + 'px';
      confetti.style.opacity = opacity;
      
      if (opacity > 0) {
        rafId = requestAnimationFrame(explode);
      } else {
        confetti.remove();
        if (rafId) cancelAnimationFrame(rafId);
      }
    }
    
    explode();
  }
}

// ── Smooth Scroll ──
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  });
})();

function scrollToProjects() {
  const projects = document.getElementById('projects');
  if (projects) {
    projects.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

// ── Mobile Menu ──
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.mobile-menu-btn');
  
  if (mobileNav) {
    mobileNav.classList.toggle('active');
  }
  if (btn) {
    btn.classList.toggle('active');
  }
}

// ── IDE Window 3D Tilt Effect ──
(function initIDETilt() {
  const ideWindow = document.querySelector('.ide-window');
  if (!ideWindow) return;
  
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;
  
  let rafId = null;
  let isHovering = false;
  
  ideWindow.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  ideWindow.addEventListener('mouseleave', () => {
    isHovering = false;
    ideWindow.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
  
  ideWindow.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    
    if (rafId) cancelAnimationFrame(rafId);
    
    rafId = requestAnimationFrame(() => {
      const rect = ideWindow.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      ideWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
  });
})();

// ── Magnetic Button Effect ──
(function initMagneticButtons() {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return;
  
  const magneticElements = document.querySelectorAll('.btn, .card-link');
  if (magneticElements.length === 0) return;
  
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
})();

// ── Nav Hide on Scroll ──
(function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  let lastScroll = 0;
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
      });
      
      ticking = true;
    }
  });
})();

// ── Keyboard Shortcuts ──
(function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) themeToggle.click();
    }
    
    // Ctrl/Cmd + P for party mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      togglePartyMode();
    }
  });
})();

// ── Nav Logo Hover Effect ──
(function initNavLogo() {
  const navLogo = document.querySelector('.nav-logo');
  if (!navLogo) return;
  
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.transform = 'scale(1.05) rotate(-2deg)';
  });
  
  navLogo.addEventListener('mouseleave', () => {
    navLogo.style.transform = 'scale(1) rotate(0deg)';
  });
})();

// ── Cleanup on Page Hide ──
(function initCleanup() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.body.classList.add('paused');
    } else {
      document.body.classList.remove('paused');
    }
  });
})();

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});
