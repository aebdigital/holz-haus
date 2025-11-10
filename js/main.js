// Main JavaScript file - Initialize all components
import { initHeader } from './components/header.js?v=1.1';
import { initFooter } from './components/footer.js?v=1.1';
import { initSliders } from './components/slider.js?v=1.1';

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js ES6 modules loaded successfully');

    // Check if fallback components already loaded
    if (document.querySelector('.navbar-transparent')) {
        console.log('Fallback components already loaded, enhancing with ES6 modules');
        initEnhancements();
        return;
    }

    console.log('Available functions:', { initHeader, initFooter });

    try {
        // Core components with error handling
        initHeader();
        console.log('Header initialized successfully');
    } catch (error) {
        console.error('Failed to initialize header:', error);
    }

    try {
        initFooter();
        console.log('Footer initialized successfully');
    } catch (error) {
        console.error('Failed to initialize footer:', error);
    }

    try {
        // Feature components
        initSliders();
        console.log('Sliders initialized successfully');
    } catch (error) {
        console.error('Failed to initialize sliders:', error);
    }

    // Initialize animations
    initGSAPAnimations();
    initLenisSmootScroll();

    // Additional functionality
    initBackToTopButton();
    initUtilities();
    initParallax();

    console.log('All components initialized');
});

// Enhancement function when fallback components are already loaded
function initEnhancements() {
    try {
        initSliders();
        console.log('Sliders enhanced successfully');
    } catch (error) {
        console.error('Failed to enhance sliders:', error);
    }

    // Initialize animations
    initGSAPAnimations();
    initLenisSmootScroll();

    // Additional functionality
    initBackToTopButton();
    initUtilities();
    initParallax();

    console.log('All enhancements initialized');
}

// Back to Top Button functionality
function initBackToTopButton() {
    createBackToTopButton();

    window.addEventListener('scroll', toggleBackToTopButton);
    window.addEventListener('resize', handleBackToTopResize);
}

function createBackToTopButton() {
    if (window.innerWidth <= 768 && !document.querySelector('.back-to-top')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Späť na vrch');

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(backToTopBtn);
    }
}

function toggleBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn && window.innerWidth <= 768) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
}

function handleBackToTopResize() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (window.innerWidth <= 768) {
        createBackToTopButton();
    } else if (backToTopBtn) {
        backToTopBtn.remove();
    }
}

// Utility functions
function initUtilities() {
    // External link handling
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[target="_blank"]');
        if (link) {
            link.rel = 'noopener noreferrer';
        }
    });

    // Image lazy loading fallback
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// GSAP Animations - Simplified Section-Level
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // No animations for any hero sections - they should be immediately visible

    // Simple section-level fade-in animations
    gsap.utils.toArray('section').forEach((section) => {
        // Skip hero sections as they should be immediately visible
        if (!section.classList.contains('hero') && 
            !section.classList.contains('about-hero') && 
            !section.classList.contains('gallery-hero') && 
            !section.classList.contains('services-hero') &&
            !section.classList.contains('service-hero') &&
            !section.classList.contains('blog-hero') &&
            !section.classList.contains('contact-hero')) {
            
            gsap.fromTo(section, 
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 95%', // Earlier trigger
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });

    // Parallax effect for background images (keep this for visual appeal)
    gsap.utils.toArray('.parallax-bg, .hero-background img').forEach(bg => {
        gsap.fromTo(bg,
            { yPercent: -20 },
            {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: bg.closest('section') || bg,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            }
        );
    });
}

// Lenis Smooth Scrolling
function initLenisSmootScroll() {
    if (typeof Lenis === 'undefined') {
        console.warn('Lenis not loaded');
        return;
    }

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }
}

// Parallax effect for hero images - handled by GSAP
function initParallax() {
    // GSAP parallax is implemented in initGSAPAnimations
    return;
}
