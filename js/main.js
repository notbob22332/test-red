document.addEventListener('DOMContentLoaded', () => {
    initFloatingCards();
    initNavbar();
    initMobileMenu();
    initTypingEffect();
    initScrollReveal();
    initSmoothScroll();
});

function initFloatingCards() {
    const container = document.getElementById('cards');
    if (!container) return;

    const symbols = ['♠', '♥', '♦', '♣', '🎰', '🎲', '💰', '🃏'];
    const cardCount = 20;

    for (let i = 0; i < cardCount; i++) {
        const card = document.createElement('div');
        card.className = 'floating-bg-card';
        card.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        card.style.left = `${Math.random() * 100}%`;
        card.style.top = `${Math.random() * 100}%`;
        card.style.setProperty('--duration', `${15 + Math.random() * 20}s`);
        card.style.setProperty('--delay', `${Math.random() * 10}s`);
        card.style.fontSize = `${1.5 + Math.random() * 2}rem`;

        container.appendChild(card);
    }
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = [
        'Never Lose Again',
        'Control Your Luck',
        '100% Win Rate',
        'Dominate DonutSMP',
        'Stack The Odds'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.feature-card, .install-step, .reveal');

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

    reveals.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');

    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

document.querySelectorAll('.btn-primary, .btn-download').forEach(btn => {
    btn.addEventListener('mouseenter', createParticles);
});

function createParticles(e) {
    const btn = e.target;
    const rect = btn.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('span');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFly 0.6s ease-out forwards;
        `;
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 600);
    }
}

const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes particleFly {
        0% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px);
        }
    }
`;
document.head.appendChild(particleStyles);

console.log('%c🎰 RIGMOD 🎰', 'font-size: 30px; font-weight: bold; color: #FFD700; text-shadow: 2px 2px 0 #DC2626;');
console.log('%cStack The Odds - DonutSMP Gambling Control', 'font-size: 14px; color: #d4a574;');
