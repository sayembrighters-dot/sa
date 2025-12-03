// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Theme Toggle
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
}

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Flag to track if speech has been played
let speechPlayed = false;

// Initialize animations when page loads
window.addEventListener('load', () => {
    // Hero title typing animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !speechPlayed) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1500);
        
        // Auto-play text-to-speech after typing animation (only once)
        setTimeout(() => {
            speakText('Today we are building tomorrow\'s leadership');
            speechPlayed = true;
        }, 3000);
    }
    
    // Animate counters when they come into view
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => animateCounter(counter, target)
        });
    });
});

// GSAP Scroll Animations
gsap.timeline()
    .from('.hero-content', {
        opacity: 0,
        y: 100,
        duration: 1,
        delay: 0.5
    });

// Floating shapes animation
gsap.to('.shape-1', {
    y: -30,
    rotation: 360,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

gsap.to('.shape-2', {
    y: -40,
    rotation: -360,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

gsap.to('.shape-3', {
    y: -25,
    rotation: 360,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

// Scroll-triggered animations
ScrollTrigger.batch('.feature-card', {
    onEnter: (elements) => {
        gsap.from(elements, {
            opacity: 0,
            y: 100,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        });
    }
});

ScrollTrigger.batch('.gallery-item', {
    onEnter: (elements) => {
        gsap.from(elements, {
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
    }
});

// Principal section animation
ScrollTrigger.create({
    trigger: '.principal-section',
    start: "top 70%",
    onEnter: () => {
        gsap.timeline()
            .from('.principal-image', {
                opacity: 0,
                x: -100,
                duration: 0.8
            })
            .from('.principal-text', {
                opacity: 0,
                x: 100,
                duration: 0.8
            }, "-=0.4");
    }
});

// Navbar scroll effect
ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: {className: "scrolled", targets: ".navbar"}
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power2.inOut"
            });
        }
    });
});

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
        
        // Animate the new panel
        gsap.from(`#${targetTab}`, {
            opacity: 0,
            y: 30,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Parallax effect for hero background
ScrollTrigger.create({
    trigger: '.hero',
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
        const progress = self.progress;
        gsap.to('.floating-shapes', {
            y: progress * 100,
            duration: 0.3,
            ease: "none"
        });
    }
});

// Hover effects for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -15,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('img'), {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out"
        });
        
        gsap.to(this.querySelector('.gallery-overlay'), {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    item.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('img'), {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        
        gsap.to(this.querySelector('.gallery-overlay'), {
            y: '100%',
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Button hover animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    });
});

// Scroll indicator animation
gsap.to('.scroll-arrow', {
    y: 10,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});

// Add loading animation
window.addEventListener('load', () => {
    gsap.to('body', {
        opacity: 1,
        duration: 0.5
    });
});

// Initialize body opacity
gsap.set('body', { opacity: 0 });

// Text-to-Speech function
function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-speech not supported in this browser');
    }
}

// Background slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

setInterval(nextSlide, 4000);

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: "power2.inOut"
    });
});