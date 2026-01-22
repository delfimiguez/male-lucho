/* ==========================================================================
   WEDDING INVITATION - JAVASCRIPT
   Funcionalidad completa: countdown, animaciones, música, etc.
   ========================================================================== */

// ==========================================================================
// CONFIG - EDITA ESTOS VALORES
// ==========================================================================
const CONFIG = {
    // Fecha del evento (formato: YYYY-MM-DDTHH:MM:SS)
    eventDate: '2026-04-01T16:15:00',

    // URLs de Google Form y Calendar
    googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf68RiNgq4sEEjSkQkJ1yxzXUA_S7mv1KRvsu5vYRrzeM7KcQ/viewform',
    googleCalendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+NOMBRE1+%26+NOMBRE2&dates=20251004T170000/20251005T030000&details=Celebración+de+boda&location=LUGAR',

    // URLs de Google Maps
    mapsCeremonyUrl: 'https://maps.app.goo.gl/3qJ7B4jNsc2vDjAv7',
    mapsPartyUrl: 'https://maps.google.com/?q=DIRECCION_FIESTA',

    // WhatsApp (solo números, sin +, sin espacios)
    whatsappNumber: '5491155779338',

    // Datos de la pareja
    nombres: {
        nombre1: 'Male',
        nombre2: 'Lucho'
    },

    // Galería (número de fotos disponibles)
    galleryCount: 8,

    // Música de fondo (si existe)
    backgroundMusic: true // cambiar a true si agregas música
};

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

// Debounce para optimizar eventos scroll/resize
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Pad numbers with zero
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// ==========================================================================
// COUNTDOWN TIMER
// ==========================================================================
class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate);
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.init();
    }

    init() {
        this.update();
        this.intervalId = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const difference = this.targetDate - now;

        if (difference <= 0) {
            this.displayZero();
            clearInterval(this.intervalId);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        this.display(days, hours, minutes, seconds);
    }

    display(days, hours, minutes, seconds) {
        if (this.elements.days) this.elements.days.textContent = padZero(days);
        if (this.elements.hours) this.elements.hours.textContent = padZero(hours);
        if (this.elements.minutes) this.elements.minutes.textContent = padZero(minutes);
        if (this.elements.seconds) this.elements.seconds.textContent = padZero(seconds);
    }

    displayZero() {
        this.display(0, 0, 0, 0);
    }

    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// ==========================================================================
// SCROLL ANIMATIONS
// ==========================================================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.init();
    }

    init() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: dejar de observar después de animar
                // this.observer.unobserve(entry.target);
            }
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// ==========================================================================
// MUSIC PLAYER
// ==========================================================================
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.toggleBtn = document.getElementById('musicToggle');
        this.iconPlay = this.toggleBtn?.querySelector('.icon-play');
        this.iconPause = this.toggleBtn?.querySelector('.icon-pause');
        this.isPlaying = false;

        if (!CONFIG.backgroundMusic || !this.audio || !this.toggleBtn) {
            // Hide music player if not configured
            const player = document.getElementById('musicPlayer');
            if (player) player.style.display = 'none';
            return;
        }

        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggle());

        // Auto-play on first user interaction
        document.addEventListener('click', () => this.autoPlay(), { once: true });
    }

    autoPlay() {
        if (!this.isPlaying && CONFIG.backgroundMusic) {
            this.play();
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updateUI();
        }).catch(err => {
            console.log('Error playing audio:', err);
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
    }

    updateUI() {
        if (this.isPlaying) {
            this.iconPlay.style.display = 'none';
            this.iconPause.style.display = 'block';
        } else {
            this.iconPlay.style.display = 'block';
            this.iconPause.style.display = 'none';
        }
    }
}

// ==========================================================================
// BANK DATA MODAL
// ==========================================================================
class BankDataModal {
    constructor() {
        this.modal = document.getElementById('bankData');
        this.openBtn = document.getElementById('toggleBankData');
        this.closeBtn = document.getElementById('closeBankData');
        this.copyables = document.querySelectorAll('.copyable');

        if (!this.modal || !this.openBtn) return;

        this.init();
    }

    init() {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // Copy functionality
        this.copyables.forEach(element => {
            element.addEventListener('click', () => this.copy(element));
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    copy(element) {
        const value = element.dataset.value;

        navigator.clipboard.writeText(value).then(() => {
            const originalText = element.textContent;
            element.textContent = '✓ Copiado';
            element.style.color = '#4CAF50';

            setTimeout(() => {
                element.textContent = originalText;
                element.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Error copying:', err);
            alert('No se pudo copiar. Por favor, copia manualmente: ' + value);
        });
    }
}

// ==========================================================================
// SMOOTH SCROLL
// ==========================================================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 20;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// ==========================================================================
// LAZY LOADING IMAGES
// ==========================================================================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }

        // Fallback for browsers that don't support lazy loading
        this.observerOptions = {
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.images.forEach(img => {
            this.observer.observe(img);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                this.observer.unobserve(img);
            }
        });
    }
}

// ==========================================================================
// GALLERY
// ==========================================================================
class Gallery {
    constructor() {
        this.items = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            item.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        // Prevent default link behavior
        e.preventDefault();

        // Here you could implement a lightbox/modal
        // For now, just open in new tab
        const href = e.currentTarget.getAttribute('href');
        if (href && !href.startsWith('#')) {
            window.open(href, '_blank');
        }
    }
}

// ==========================================================================
// SCROLL INDICATOR (HIDE ON SCROLL)
// ==========================================================================
class ScrollIndicator {
    constructor() {
        this.indicator = document.querySelector('.scroll-indicator');
        if (!this.indicator) return;

        this.init();
    }

    init() {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 100) {
                this.indicator.style.opacity = '0';
            } else {
                this.indicator.style.opacity = '0.7';
            }
        }, 10));
    }
}

// ==========================================================================
// APPLY CONFIG TO PAGE
// ==========================================================================
function applyConfig() {
    // Update links
    const rsvpButtons = document.querySelectorAll('a[href="[LINK_GOOGLE_FORM]"]');
    rsvpButtons.forEach(btn => {
        btn.setAttribute('href', CONFIG.googleFormUrl);
    });

    const calendarButtons = document.querySelectorAll('a[href="[LINK_GOOGLE_CALENDAR]"]');
    calendarButtons.forEach(btn => {
        btn.setAttribute('href', CONFIG.googleCalendarUrl);
    });

    const ceremonyMapButtons = document.querySelectorAll('a[href="[LINK_MAPS_CEREMONIA]"]');
    ceremonyMapButtons.forEach(btn => {
        btn.setAttribute('href', CONFIG.mapsCeremonyUrl);
    });

    const partyMapButtons = document.querySelectorAll('a[href="[LINK_MAPS_FIESTA]"]');
    partyMapButtons.forEach(btn => {
        btn.setAttribute('href', CONFIG.mapsPartyUrl);
    });

    const whatsappLinks = document.querySelectorAll('a[href*="[NÚMERO_WHATSAPP]"]');
    whatsappLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.setAttribute('href', href.replace('[NÚMERO_WHATSAPP]', CONFIG.whatsappNumber));
    });
}

// ==========================================================================
// PERFORMANCE MONITORING
// ==========================================================================
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log('⚡ Page Load Time:', pageLoadTime + 'ms');
            }, 0);
        });
    }
}

// ==========================================================================
// INITIALIZE APP
// ==========================================================================
class WeddingApp {
    constructor() {
        this.components = [];
    }

    init() {
        // Apply configuration
        applyConfig();

        // Initialize components
        this.components.push(new CountdownTimer(CONFIG.eventDate));
        this.components.push(new ScrollAnimations());
        this.components.push(new MusicPlayer());
        this.components.push(new BankDataModal());
        this.components.push(new SmoothScroll());
        this.components.push(new LazyLoader());
        this.components.push(new Gallery());
        this.components.push(new ScrollIndicator());

        // Performance monitoring (dev only)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            logPerformance();
        }

        console.log('✅ Wedding App Initialized');
    }

    destroy() {
        this.components.forEach(component => {
            if (component.destroy) component.destroy();
        });
    }
}

// ==========================================================================
// START APPLICATION
// ==========================================================================
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new WeddingApp();
        app.init();
    });
} else {
    app = new WeddingApp();
    app.init();
}

// ==========================================================================
// HELPER: Generate ICS file for calendar download
// ==========================================================================
function generateICS() {
    const event = {
        title: `Boda ${CONFIG.nombres.nombre1} & ${CONFIG.nombres.nombre2}`,
        description: 'Celebración de nuestra boda',
        location: 'LUGAR_EVENTO', // Update this
        start: new Date(CONFIG.eventDate),
        duration: 8, // hours
    };

    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const endDate = new Date(event.start.getTime() + event.duration * 60 * 60 * 1000);

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Wedding Invitation//ES',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(event.start)}`,
        `DTEND:${formatDate(endDate)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Wedding tomorrow!',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
}

// Export for use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeddingApp, CONFIG };
}
