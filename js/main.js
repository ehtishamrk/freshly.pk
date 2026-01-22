document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Language Toggle Logic ---
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;
    let currentLang = 'en';

    if(langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'ur' : 'en';
            body.classList.toggle('urdu-mode');
            updateContent();
            
            // Update Toggle Button Text
            document.querySelector('.lang-label').textContent = currentLang === 'en' ? 'EN' : 'UR';
        });
    }

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
    }

    // --- 2. Scroll Animation (Reveal on Scroll) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- 3. Modal Logic (Generic) ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('.close-modal');
    const overlays = document.querySelectorAll('.modal-overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = button.getAttribute('data-modal-target');
            document.getElementById(modalId).classList.add('active');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Close on clicking outside
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
});
