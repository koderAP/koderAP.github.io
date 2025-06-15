// Modern Portfolio JavaScript - Beautiful Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Apply theme immediately to prevent flash
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Ensure hero elements are visible immediately
    ensureHeroVisibility();
    
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initTypewriterEffect();
    initProjectFilters();
    initContactForm();
    initScrollToTop();
    initSkillBars(); // Add this line
    initAboutNavigation(); // Add about card navigation
    initTechSlider(); // Add technologies slider
    initTechSlider(); // Initialize tech slider
    
    // Apply initial theme styles
    applyNavbarTheme(savedTheme);
    
    // Performance optimization - only run animations if user prefers them
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initParallaxEffects();
        // Removed annoying mouse tracker
    }
});

// Ensure hero section elements are always visible
function ensureHeroVisibility() {
    const heroElements = document.querySelectorAll('.hero-content, .hero-text, .hero-buttons, .hero-social, .hero-image');
    heroElements.forEach(element => {
        if (element) {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.display = element.style.display || '';
        }
    });
    
    // Double-check after a short delay
    setTimeout(() => {
        heroElements.forEach(element => {
            if (element) {
                element.style.opacity = '1';
                element.style.visibility = 'visible';
            }
        });
    }, 100);
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Active navigation on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        
        // Add background to navbar on scroll
        if (window.scrollY > 50) {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const bgColor = currentTheme === 'dark' ? 'rgba(26, 26, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
            navbar.style.background = bgColor;
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }
        
        // Update active navigation link
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme immediately to prevent flash
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Apply theme-specific navbar styles immediately
    applyNavbarTheme(currentTheme);
    
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        applyNavbarTheme(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function applyNavbarTheme(theme) {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (theme === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.borderBottomColor = '#4a4a4a';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottomColor = '#ffd7cc';
        }
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements (excluding hero section elements)
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-method');
    animatedElements.forEach(el => {
        // Only apply scroll animations to elements not in the hero section
        if (!el.closest('.hero')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuBtn?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // Close menu with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typewriter Effect
function initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;
    
    const texts = ['System Programmer', 'Linux Kernel Developer', 'AI Enthusiast', 'Computer Science Student'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const subject = formData.get('subject');
        
        // Simple validation
        if (!name || !email || !message || !subject) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again or contact me directly at apiitb01@gmail.com', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Scroll to Top
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn?.classList.add('visible');
        } else {
            scrollTopBtn?.classList.remove('visible');
        }
    });
    
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Mouse Tracker - Removed (was annoying)
// function initMouseTracker() {
//     // Removed this functionality as it was annoying
// }

// Initialize skill bar animations when skills section is in view
function initSkillBars() {
    const skillsSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') + '%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// About Cards Navigation
function initAboutNavigation() {
    console.log('🔍 Initializing about navigation...');
    const prevBtn = document.querySelector('.about-nav-prev');
    const nextBtn = document.querySelector('.about-nav-next');
    const cardsWrapper = document.querySelector('.about-cards-wrapper');
    const cardsContainer = document.querySelector('.about-cards-container');
    const indicators = document.querySelectorAll('.about-indicator');
    
    console.log('📋 Found elements:', {
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        cardsWrapper: !!cardsWrapper,
        cardsContainer: !!cardsContainer,
        indicatorsCount: indicators.length
    });
    
    if (!prevBtn || !nextBtn || !cardsWrapper || !cardsContainer) {
        console.error('❌ Missing required elements for about navigation');
        return;
    }
    
    console.log('✅ About navigation initialized successfully!');
    
    let currentIndex = 0;
    const totalCards = 3;
    let isManualNavigation = false;
    
    // Function to update indicators
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Function to update card position manually
    function updateCardPosition(index, animate = true) {
        console.log(`🎯 Moving to card ${index}`);
        
        // Pause the automatic animation
        cardsWrapper.style.animationPlayState = 'paused';
        isManualNavigation = true;
        
        // Calculate the transform (each card is 33.33%)
        const percentage = -(index * 33.33);
        
        if (animate) {
            cardsWrapper.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            cardsWrapper.style.transition = 'none';
        }
        
        cardsWrapper.style.transform = `translateX(${percentage}%)`;
        currentIndex = index;
        updateIndicators(index);
        
        // Resume automatic animation after a delay
        clearTimeout(cardsWrapper.resumeTimeout);
        cardsWrapper.resumeTimeout = setTimeout(() => {
            if (!cardsContainer.matches(':hover')) {
                console.log('🔄 Resuming automatic animation');
                isManualNavigation = false;
                cardsWrapper.style.transition = '';
                cardsWrapper.style.animationPlayState = 'running';
            }
        }, 4000); // 4 second delay before resuming
    }
    
    // Navigation functions
    function goToPrev() {
        const newIndex = currentIndex === 0 ? totalCards - 1 : currentIndex - 1;
        updateCardPosition(newIndex);
    }
    
    function goToNext() {
        const newIndex = currentIndex === totalCards - 1 ? 0 : currentIndex + 1;
        updateCardPosition(newIndex);
    }
    
    function goToIndex(index) {
        if (index !== currentIndex) {
            updateCardPosition(index);
        }
    }
    
    // Pause animation on hover
    cardsContainer.addEventListener('mouseenter', () => {
        if (!isManualNavigation) {
            cardsWrapper.style.animationPlayState = 'paused';
        }
    });
    
    cardsContainer.addEventListener('mouseleave', () => {
        if (!isManualNavigation) {
            cardsWrapper.style.animationPlayState = 'running';
        }
    });
    
    // Add button event listeners
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToPrev();
    });
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToNext();
    });
    
    // Add indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            goToIndex(index);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only trigger if the about section is in view or focused
        const aboutSection = document.querySelector('#about');
        const rect = aboutSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (isInView && !e.target.matches('input, textarea, select')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToNext();
            } else if (e.key >= '1' && e.key <= '3') {
                e.preventDefault();
                goToIndex(parseInt(e.key) - 1);
            }
        }
    });
    
    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    cardsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    cardsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToNext(); // Swipe left = next
            } else {
                goToPrev(); // Swipe right = previous
            }
        }
    }
    
    // Initialize indicators
    updateIndicators(0);
}

// Technologies Slider Navigation
function initTechSlider() {
    console.log('🔍 Initializing tech slider...');
    const prevBtn = document.querySelector('.tech-nav-prev');
    const nextBtn = document.querySelector('.tech-nav-next');
    const sliderWrapper = document.querySelector('.tech-slider-wrapper');
    const sliderContainer = document.querySelector('.tech-slider-container');
    const indicators = document.querySelectorAll('.tech-indicator');
    
    console.log('📋 Found tech slider elements:', {
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        sliderWrapper: !!sliderWrapper,
        sliderContainer: !!sliderContainer,
        indicatorsCount: indicators.length
    });
    
    if (!prevBtn || !nextBtn || !sliderWrapper || !sliderContainer) {
        console.error('❌ Missing required elements for tech slider');
        return;
    }
    
    console.log('✅ Tech slider initialized successfully!');
    
    let currentSlide = 0;
    const totalSlides = 6; // Total number of slides
    let isAutoSliding = true;
    let autoSlideInterval;
    
    // Function to update indicators
    function updateIndicators(activeIndex) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Function to update slide position
    function updateSlidePosition(index, animate = true) {
        console.log(`🎯 Moving to slide ${index}`);
        
        // Stop auto-sliding when manually navigated
        stopAutoSlide();
        
        // Calculate the transform (each slide is 16.67% = 100/6)
        const percentage = -(index * (100/6));
        
        if (animate) {
            sliderWrapper.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            sliderWrapper.style.transition = 'none';
        }
        
        sliderWrapper.style.transform = `translateX(${percentage}%)`;
        currentSlide = index;
        updateIndicators(index);
        
        // Resume auto-sliding after a delay
        setTimeout(() => {
            if (!sliderContainer.matches(':hover')) {
                startAutoSlide();
            }
        }, 4000);
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (isAutoSliding) return;
        isAutoSliding = true;
        autoSlideInterval = setInterval(() => {
            const nextIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            updateSlidePosition(nextIndex);
        }, 4000); // Change slide every 4 seconds
    }
    
    function stopAutoSlide() {
        isAutoSliding = false;
        clearInterval(autoSlideInterval);
    }
    
    // Navigation functions
    function goToPrev() {
        const newIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        updateSlidePosition(newIndex);
    }
    
    function goToNext() {
        const newIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
        updateSlidePosition(newIndex);
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            updateSlidePosition(index);
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.activeElement && document.activeElement.closest('.tech-slider-container')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNext();
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                    e.preventDefault();
                    goToSlide(parseInt(e.key) - 1);
                    break;
            }
        }
    });
    
    // Pause auto-slide on hover
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', () => {
        setTimeout(startAutoSlide, 1000);
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        setTimeout(() => {
            if (!sliderContainer.matches(':hover')) {
                startAutoSlide();
            }
        }, 2000);
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left, go to next slide
                goToNext();
            } else {
                // Swiped right, go to previous slide
                goToPrev();
            }
        }
    }
    
    // Initialize auto-sliding
    setTimeout(startAutoSlide, 2000);
    
    console.log('🎉 Tech slider fully configured with auto-slide, navigation, and touch support!');
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: var(--border-radius);
    color: white;
    font-weight: 500;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    background: linear-gradient(135deg, #10b981, #059669);
}

.notification-error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}

.notification-info {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
}

/* Removed custom cursor CSS as it was annoying */
`;

// Add notification styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);




































