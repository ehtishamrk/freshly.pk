let currentLang = 'en';
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

// Cookie Consent
window.addEventListener('load', () => {
    if (!localStorage.getItem('cookieConsent')) {
        showCookieConsent();
    }
});

function showCookieConsent() {
    const banner = document.createElement('div');
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
    `;
    banner.innerHTML = `
        <span>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. <a href="cookies.html" style="color: #50C878;">Learn more</a></span>
        <button onclick="acceptCookies()" style="background: #50C878; color: white; border: none; padding: 0.7rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">Accept</button>
    `;
    document.body.appendChild(banner);
    window.cookieBanner = banner;
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    if (window.cookieBanner) {
        window.cookieBanner.remove();
    }
}

// Language Toggle
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ur' : 'en';
    document.body.classList.toggle('urdu', currentLang === 'ur');
    
    if (currentLang === 'ur') {
        document.body.style.direction = 'rtl';
    } else {
        document.body.style.direction = 'ltr';
    }
    
    localStorage.setItem('language', currentLang);
    
    // Add this line to actually update the text
    updatePageContent(); 
}

// Load saved language preference
const savedLang = localStorage.getItem('language');
if (savedLang === 'ur') {
    currentLang = 'ur';
    document.body.classList.add('urdu');
    document.body.style.direction = 'rtl';
}
updatePageContent();
// Scroll functionality
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
    
    // Show scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTop > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Modal functions
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchModal(from, to) {
    closeModal(from);
    openModal(to);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Form handlers
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.problem-card, .stat-card, .process-step, .team-member');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
function updatePageContent() {
    // Select all elements that have both language attributes
    const elements = document.querySelectorAll('[data-en][data-ur]');
    
    elements.forEach(element => {
        // Get the text based on the current language
        const content = element.getAttribute(currentLang === 'ur' ? 'data-ur' : 'data-en');
        if (content) {
            element.textContent = content;
        }
    });
}

