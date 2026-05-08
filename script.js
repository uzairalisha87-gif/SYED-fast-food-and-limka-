// ===============================
// PARTICLE ANIMATION
// ===============================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.001;

        if (this.opacity <= 0) {
            return false;
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        return true;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 51, 51, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].update()) {
            particles[i].draw();
        } else {
            particles.splice(i, 1);
        }
    }

    if (particles.length < 100 && Math.random() > 0.5) {
        particles.push(new Particle());
    }

    requestAnimationFrame(animateParticles);
}

if (canvas) {
    createParticles();
    animateParticles();
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===============================
// HAMBURGER MENU
// ===============================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===============================
// MENU TABS
// ===============================

const tabButtons = document.querySelectorAll('.tab-btn');
const menuCategories = document.querySelectorAll('.menu-category');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Hide all categories
        menuCategories.forEach(category => category.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show selected category
        const categoryId = button.getAttribute('data-category');
        const selectedCategory = document.getElementById(categoryId);
        if (selectedCategory) {
            selectedCategory.classList.add('active');
        }
    });
});

// ===============================
// SMOOTH SCROLL FUNCTIONS
// ===============================

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    menuSection.scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

// ===============================
// SCROLL ANIMATIONS
// ===============================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and menu cards for animation
document.querySelectorAll('.feature-card, .menu-card, .testimonial-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.animation = 'none';
    observer.observe(el);
});

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(255, 51, 51, 0.2)';
    } else {
        navbar.style.boxShadow = '0 5px 30px rgba(255, 51, 51, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===============================
// PARALLAX EFFECT
// ===============================

const heroSection = document.querySelector('.hero');
const smokeEffect = document.querySelector('.smoke-effect');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    if (smokeEffect && scrollPosition < window.innerHeight) {
        smokeEffect.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * 0.5}px))`;
    }
});

// ===============================
// ACTIVE NAV LINK ON SCROLL
// ===============================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===============================
// SCROLL TO TOP ON LOAD
// ===============================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ===============================
// LAZY LOADING & PERFORMANCE
// ===============================

if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

// ===============================
// WHATSAPP INTEGRATION
// ===============================

function openWhatsApp() {
    const phoneNumber = '923043041472';
    const message = 'Hello! I would like to order from SYED Fast Food & Limka Corner.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ===============================
// FORM HANDLING (if needed in future)
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===============================
// PERFORMANCE OPTIMIZATION
// ===============================

// Debounce function for resize events
function debounce(func, wait) {
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

window.addEventListener('resize', debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, 250));
