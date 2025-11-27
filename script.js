// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const hamburger = mobileMenuBtn.querySelector('.hamburger');

        if (mobileMenu.classList.contains('active')) {
            hamburger.style.background = 'transparent';
            hamburger.style.transform = 'rotate(45deg)';
            const before = hamburger.querySelector('::before');
            const after = hamburger.querySelector('::after');
        } else {
            hamburger.style.background = '#ffffff';
            hamburger.style.transform = 'rotate(0)';
        }
    });

    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
}

// Create floating particles in hero section
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = (Math.random() - 0.5) * 400;
        const endY = (Math.random() - 0.5) * 400;
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.setProperty('--x', endX + 'px');
        particle.style.setProperty('--y', endY + 'px');
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        particlesContainer.appendChild(particle);
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .portfolio-card, .tech-card, .section-header'
    );

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect data attributes to cards
function initCardHoverEffects() {
    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const color = card.getAttribute('data-color');

        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `0 8px 30px ${color}40`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        const color = card.getAttribute('data-color');

        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `0 10px 40px ${color}30`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Tech cards
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        const color = card.getAttribute('data-color');

        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `0 5px 20px ${color}30`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });
}

// Navbar background on scroll
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    const navContent = document.querySelector('.nav-content');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navContent.style.background = 'rgba(26, 26, 26, 0.95)';
            navContent.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navContent.style.background = 'rgba(26, 26, 26, 0.5)';
            navContent.style.boxShadow = 'none';
        }
    });
}

// Newsletter form submission
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    const button = form.querySelector('.btn-primary');
    const input = form.querySelector('.newsletter-input');

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const email = input.value.trim();

        if (email && validateEmail(email)) {
            // Simulate form submission
            button.textContent = 'Subscribed!';
            button.style.background = 'linear-gradient(135deg, #00F2FF, #C700FF)';
            input.value = '';

            setTimeout(() => {
                button.textContent = 'Subscribe';
                button.style.background = 'linear-gradient(135deg, #00A3FF, #00F2FF)';
            }, 3000);
        } else {
            input.style.borderColor = '#d4183d';
            setTimeout(() => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const isPercentage = element.textContent.includes('%');
    const hasPlus = element.textContent.includes('+');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        let displayValue = Math.floor(current);
        if (isPercentage) {
            displayValue += '%';
        } else if (hasPlus) {
            displayValue += '+';
        }

        element.textContent = displayValue;
    }, 16);
}

function initStatsAnimation() {
    const stats = document.querySelectorAll('.stat-value');
    const statsSection = document.querySelector('.hero-stats');

    if (!statsSection) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    animateCounter(stat, number, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroGrid = hero.querySelector('.hero-grid');
        const particles = hero.querySelector('.particles');

        if (heroGrid) {
            heroGrid.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Add random tech card animation delays
function initTechCardAnimations() {
    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });
}

// Cursor trail effect (optional, modern touch)
let cursorTrail = [];
const maxTrailLength = 10;

function createCursorTrail() {
    document.addEventListener('mousemove', (e) => {
        // Only on desktop
        if (window.innerWidth < 768) return;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #00A3FF, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.6;
            transition: opacity 0.5s ease;
        `;

        document.body.appendChild(trail);
        cursorTrail.push(trail);

        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.style.opacity = '0';
            setTimeout(() => oldTrail.remove(), 500);
        }

        setTimeout(() => {
            trail.style.opacity = '0';
        }, 100);
    });
}

// Initialize all features
function init() {
    createParticles();
    initScrollAnimations();
    initCardHoverEffects();
    initNavbarScroll();
    initNewsletterForm();
    initStatsAnimation();
    initParallax();
    initTechCardAnimations();
    initThesisAnimations();
    initFeaturesAnimations();
    initSupportTeamAnimations();
    // createCursorTrail(); // Uncomment for cursor trail effect
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recreate particles on resize
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            createParticles();
        }
    }, 250);
});

// Console easter egg
console.log('%c🚀 FutureTech - Developing the Future',
    'color: #00A3FF; font-size: 20px; font-weight: bold; font-family: Orbitron, sans-serif;');
console.log('%cInterested in joining our team? Visit futuretech.com/careers',
    'color: #00F2FF; font-size: 14px;');


function initThesisAnimations() {
    const thesisCards = document.querySelectorAll('.thesis-card');

    thesisCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;

        // Добавляем эффект свечения при наведении
        card.addEventListener('mouseenter', function() {
            const color = this.getAttribute('data-color');
            this.style.boxShadow = `0 10px 30px ${color}40, 0 0 0 1px ${color}20`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

function initSupportTeamAnimations() {
    // Анимация бейджей поддержки
    const supportBadges = document.querySelectorAll('.support-badge');
    supportBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.2}s`;
    });

    // Анимация карточек команды
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;

        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.avatar-placeholder');
            avatar.style.transform = 'scale(1.15)';
        });

        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.avatar-placeholder');
            avatar.style.transform = 'scale(1)';
        });
    });

    // Анимация проектов
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function initFeaturesAnimations() {
    const featureBlocks = document.querySelectorAll('.feature-block');

    featureBlocks.forEach((block, index) => {
        block.style.animationDelay = `${index * 0.2}s`;

        // Эффект свечения при наведении
        block.addEventListener('mouseenter', function() {
            const color = this.getAttribute('data-color');
            this.style.boxShadow = `0 15px 40px ${color}30, 0 0 0 1px ${color}20`;
        });

        block.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });

        // Анимация тегов при загрузке
        const tags = this.querySelectorAll('.feature-tag');
        tags.forEach((tag, tagIndex) => {
            tag.style.animationDelay = `${index * 0.2 + tagIndex * 0.05}s`;
        });
    });
}
