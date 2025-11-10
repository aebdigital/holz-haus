// GSAP Animations - Simplified Section-Level
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scrolling
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

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. HERO SECTIONS - Make immediately visible
    gsap.set('.hero-title, .about-hero-title, .gallery-hero-title, .services-hero-title', 
        { opacity: 1, y: 0 }
    );
    
    gsap.set('.hero-subtitle, .about-hero-subtitle, .gallery-hero-subtitle, .services-hero-subtitle', 
        { opacity: 1, y: 0 }
    );
    
    gsap.set('.hero-actions, .hero-feature', 
        { opacity: 1, y: 0, scale: 1 }
    );
    
    // 2. SIMPLIFIED SECTION ANIMATIONS
    // Only animate sections as a whole, not individual elements
    gsap.utils.toArray('section').forEach((section) => {
        // Skip hero sections as they should be immediately visible
        if (!section.classList.contains('hero') && 
            !section.classList.contains('about-hero') && 
            !section.classList.contains('gallery-hero') && 
            !section.classList.contains('services-hero')) {
            
            gsap.fromTo(section, 
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 95%', // Earlier trigger - starts animation sooner
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });
    
    // 3. COUNTER ANIMATIONS (keep these for numbers)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        
        gsap.fromTo(counter, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // 4. PARALLAX BACKGROUND IMAGES (keep for visual appeal)
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
    
    console.log('Simplified GSAP animations initialized');
});