let currentLang = 'en';
const navbar = document.getElementById('navbar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileMenu();
    updatePageContent(); // Fix for text visibility
    
    // Cookie Check
    if (!localStorage.getItem('cookieConsent')) {
        showCookieConsent();
    }
});

// Scroll Animations (Reveal on Scroll)
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal, .problem-card, .process-step, .stat-card, .hero-text');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
                reveal.classList.add('reveal'); // Ensure class exists
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }
}

// Language Toggle & Text Update
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    document.body.classList.toggle('urdu', currentLang === 'ur');
    document.body.style.direction = currentLang === 'ur' ? 'rtl' : 'ltr';
    localStorage.setItem('language', currentLang);
    updatePageContent();
}

function updatePageContent() {
    const elements = document.querySelectorAll('[data-en][data-ur]');
    elements.forEach(element => {
        const content = element.getAttribute(currentLang === 'ur' ? 'data-ur' : 'data-en');
        if (content) element.textContent = content;
    });
}

// Load saved language
const savedLang = localStorage.getItem('language');
if (savedLang === 'ur') {
    currentLang = 'ur';
    document.body.classList.add('urdu');
    document.body.style.direction = 'rtl';
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.8rem 5%';
        navbar.style.background = 'rgba(1, 50, 32, 1)'; // Solid dark on scroll
    } else {
        navbar.style.padding = '1.2rem 5%';
        navbar.style.background = 'rgba(1, 50, 32, 0.95)';
    }
});

// Modal Functions (Keep existing)
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) modal.style.display = 'block';
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Cookie Functions (Keep existing)
function showCookieConsent() {
    // ... (Keep your existing cookie banner code)
}
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    if (window.cookieBanner) window.cookieBanner.remove();
}
