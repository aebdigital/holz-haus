// Header Component - Navigation functionality

export function initHeader() {
    loadNavigation();
    initMobileNavigation();
    initScrollEffects();
    initNavigationListeners();
}

// Make functions globally available for fallback - after function declarations

function loadNavigation() {
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    
    // Set navigation paths based on current location
    let basePath;
    
    if (isInPagesFolder) {
        // We're in /pages/
        basePath = '../';  // To reach root for index.html and assets
    } else {
        // We're in root directory
        basePath = '';     // assets are in same directory
    }
    
    const navigationHTML = `
        <!-- Scroll Progress Indicator -->
        <div class="scroll-progress">
            <div class="scroll-progress-bar"></div>
        </div>

        <!-- Transparent Navigation -->
        <nav class="navbar navbar-transparent">
            <div class="nav-container">
                <div class="nav-social">
                    <a href="mailto:info@holz-haus.sk" class="social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                    <a href="https://instagram.com" class="social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2"/>
                            <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" stroke-width="2"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </a>
                    <a href="https://facebook.com" class="social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
                <ul class="nav-menu nav-menu-left">
                    <li><a href="${basePath}index.html" class="nav-link">Domov</a></li>
                    <li><a href="${basePath}pages/drevostavba.html" class="nav-link">Drevostavba</a></li>
                    <li><a href="${basePath}pages/konstrukcie.html" class="nav-link">Konštrukcie</a></li>
                    <li><a href="${basePath}pages/about.html" class="nav-link">O nás</a></li>
                </ul>
                <div class="nav-logo">
                    <a href="${basePath}index.html" class="logo-link">
                        <img src="${basePath}logo.png" alt="HolzHaus" class="logo-image">
                    </a>
                </div>
                <ul class="nav-menu nav-menu-right">
                    <li><a href="${basePath}pages/referencie.html" class="nav-link">Referencie</a></li>
                    <li><a href="${basePath}pages/blog.html" class="nav-link">Blog</a></li>
                    <li><a href="${basePath}pages/contact.html" class="nav-link">Kontakt</a></li>
                </ul>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    `;
    
    const headerContainer = document.getElementById('header-container') || document.body;
    if (headerContainer === document.body) {
        headerContainer.insertAdjacentHTML('afterbegin', navigationHTML);
    } else {
        headerContainer.innerHTML = navigationHTML;
    }
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPage === '/' || currentPage.includes('index.html')) {
            if (href.includes('index.html')) {
                link.classList.add('active');
            }
        } else if (currentPage.includes(href.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

function initMobileNavigation() {
    document.addEventListener('click', function(e) {
        // Toggle mobile sidebar
        if (e.target.closest('.hamburger')) {
            const hamburger = e.target.closest('.hamburger');
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });
}

function initScrollEffects() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    // Set initial navbar state on page load
    updateNavbarBackground();
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update scroll progress
        if (scrollProgress) {
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            scrollProgress.style.height = `${scrollPercentage}%`;
        }
        
        // Update navbar background
        updateNavbarBackground();
    });
}

function updateNavbarBackground() {
    const transparentNavbar = document.querySelector('.navbar-transparent');

    if (!transparentNavbar) return;

    // Always keep the navbar with white background
    transparentNavbar.classList.add('scrolled');
}

function initNavigationListeners() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadNavigation = loadNavigation;
    window.initMobileNavigation = initMobileNavigation;
    window.initScrollEffects = initScrollEffects;
    window.initNavigationListeners = initNavigationListeners;
    window.updateNavbarBackground = updateNavbarBackground;
    window.setActiveNavLink = setActiveNavLink;
}