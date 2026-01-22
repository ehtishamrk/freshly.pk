let currentLang = 'en';
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initMobileMenu();
    updatePageContent(); // Ensures correct language text on load
    
    // Check for saved language
    const savedLang = localStorage.getItem('language');
    if (savedLang === 'ur') {
        currentLang = 'ur';
        document.body.classList.add('urdu');
        document.body.style.direction = 'rtl';
        updatePageContent();
    }

    // Check for Cookies
    if (!localStorage.getItem('cookieConsent')) {
        showCookieConsent();
    }
});

// --- NAVIGATION & SCROLL EFFECTS ---
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 1. Navbar Effect (Glassmorphism style)
    if (scrollTop > 50) {
        navbar.style.padding = '0.8rem 5%';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)'; // Solid for readability
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '1.2rem 5%';
        navbar.style.background = 'rgba(255, 255, 255, 0.8)'; // More transparent at top
        navbar.style.boxShadow = 'none';
    }

    // 2. Scroll to Top Button Visibility
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// --- MOBILE MENU ---
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle'); // Optional: for hamburger animation
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            });
        });
    }
}

// --- SCROLL ANIMATIONS (Reveal on Scroll) ---
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .fade-in');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger when element is 100px into view
        
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load to catch elements already in view
}

// --- LANGUAGE TOGGLE ---
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    
    // Toggle Class & Direction
    document.body.classList.toggle('urdu', currentLang === 'ur');
    document.body.style.direction = currentLang === 'ur' ? 'rtl' : 'ltr';
    
    localStorage.setItem('language', currentLang);
    updatePageContent();
}

function updatePageContent() {
    // Updates all elements with data-en/data-ur attributes
    const elements = document.querySelectorAll('[data-en][data-ur]');
    elements.forEach(element => {
        const content = element.getAttribute(currentLang === 'ur' ? 'data-ur' : 'data-en');
        if (content) {
            element.textContent = content;
        }
    });
}

// --- MODALS (POPUPS) ---
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
}

function switchModal(from, to) {
    closeModal(from);
    openModal(to);
}

// Close modal when clicking outside the content area
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// --- FORM HANDLERS (Placeholders) ---
function handleSignup(e) {
    e.preventDefault();
    alert('Thank you for signing up! Our team will contact you within 24 hours.');
    closeModal('signup');
}

function handleLogin(e) {
    e.preventDefault();
    alert('Login functionality will be available soon!');
    closeModal('login');
}

function handleEmployeeLogin(e) {
    e.preventDefault();
    alert('Employee portal access will be available soon!');
    closeModal('employee');
}

// --- COOKIE CONSENT ---
function showCookieConsent() {
    // Only create if it doesn't exist
    if (document.getElementById('cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #013220;
        color: white;
        padding: 1.5rem;
        z-index: 3000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 -5px 20px rgba(0,0,0,0.3);
        font-family: 'Segoe UI', sans-serif;
    `;
    banner.innerHTML = `
        <span>We use cookies to enhance your experience. <a href="cookies.html" style="color: #50C878; text-decoration: underline;">Learn more</a></span>
        <button onclick="acceptCookies()" style="background: #50C878; color: white; border: none; padding: 0.7rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600; margin-left: 1rem;">Accept</button>
    `;
    document.body.appendChild(banner);
    window.cookieBanner = banner;
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        banner.remove();
    }
}
