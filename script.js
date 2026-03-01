/* ============================================================
   MOSAIK Website — script.js
   Language Toggle, Mobile Menu, Scroll Animations, Counters
   ============================================================ */

// ───── Language Toggle ─────
const translations = {
    tr: {
        // Navbar
        'nav-home': 'Ana Sayfa',
        'nav-about': 'Hakkımızda',
        'nav-vision': 'Vizyon & Misyon',
        'nav-events': 'Etkinlikler',
        'nav-contact': 'İletişim',
        // Footer
        'footer-desc': 'Crailsheim\'de diyalog ve entegrasyon için mücadele eden gönüllü bir inisiyatif.',
        'footer-links-title': 'Hızlı Erişim',
        'footer-legal-title': 'Yasal',
        'footer-contact-title': 'İletişim',
        'footer-impressum': 'Impressum',
        'footer-datenschutz': 'Gizlilik Politikası',
        'footer-copy': '© 2025 MOSAIK-Initiative. Tüm hakları saklıdır.',
    },
    de: {
        // Navbar
        'nav-home': 'Startseite',
        'nav-about': 'Über uns',
        'nav-vision': 'Vision & Mission',
        'nav-events': 'Veranstaltungen',
        'nav-contact': 'Kontakt',
        // Footer
        'footer-desc': 'Eine ehrenamtliche Initiative in Crailsheim für Dialog und Integration.',
        'footer-links-title': 'Schnellzugriff',
        'footer-legal-title': 'Rechtliches',
        'footer-contact-title': 'Kontakt',
        'footer-impressum': 'Impressum',
        'footer-datenschutz': 'Datenschutz',
        'footer-copy': '© 2025 MOSAIK-Initiative. Alle Rechte vorbehalten.',
    }
};

let currentLang = localStorage.getItem('mosaik-lang') || 'tr';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('mosaik-lang', lang);

    // Update all [data-tr] / [data-de] elements
    document.querySelectorAll('[data-tr]').forEach(el => {
        const text = lang === 'tr' ? el.dataset.tr : el.dataset.de;
        if (text !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update href attributes for links [data-tr-href]
    document.querySelectorAll('[data-tr-href]').forEach(el => {
        el.href = lang === 'tr' ? el.dataset.trHref : el.dataset.deHref;
    });

    // Update lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'tr' ? 'tr' : 'de';
}

// ───── Navbar Scroll ─────
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// ───── Mobile Menu ─────
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.nav-overlay');
    if (!hamburger || !overlay) return;

    hamburger.addEventListener('click', () => {
        const open = !overlay.classList.contains('open');
        overlay.classList.toggle('open', open);
        hamburger.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    overlay.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ───── Scroll Reveal ─────
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ───── Counter Animation ─────
function animateCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    let count = 0;

    const timer = setInterval(() => {
        count++;
        current = Math.min(target, Math.round(step * count));
        el.textContent = current.toLocaleString() + suffix;
        if (count >= steps) clearInterval(timer);
    }, duration / steps);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                animateCounter(e.target);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ───── Active Nav Link ─────
function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}

// ───── Init ─────
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initReveal();
    initCounters();
    setActiveNav();
    setLanguage(currentLang);

    // Lang toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
});
