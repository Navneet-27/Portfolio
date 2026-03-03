// Home button - scroll to top
const homeBtn = document.getElementById('homeBtn');
homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3-Dot Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const header = document.querySelector('.header');
                
                // Show header on mobile if it's hidden
                if (header.classList.contains('hidden')) {
                    header.classList.remove('hidden');
                    lastScrollPos = 0;
                }
                
                // Calculate proper offset
                const headerHeight = header ? header.offsetHeight : 140;
                const offsetTop = target.offsetTop - headerHeight - 5;
                
                // Scroll to section
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Highlight active nav link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animations on scroll
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

document.querySelectorAll('.skill-category, .project-card, .experience-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hide/Show header on scroll for mobile
let lastScrollPos = 0;
let isMobileView = window.innerWidth <= 768;

window.addEventListener('resize', () => {
    isMobileView = window.innerWidth <= 768;
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    const currentScrollPos = window.scrollY;
    
    // Close mobile menu when scrolling
    if (isMobileView && currentScrollPos > lastScrollPos) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
    
    if (isMobileView) {
        // Scrolling down - hide header
        if (currentScrollPos > lastScrollPos && currentScrollPos > 100) {
            header.classList.add('hidden');
        }
        // Scrolling up - show header
        else if (currentScrollPos < lastScrollPos) {
            header.classList.remove('hidden');
        }
    } else {
        // Always show header on desktop
        header.classList.remove('hidden');
    }
    
    lastScrollPos = currentScrollPos <= 0 ? 0 : currentScrollPos;
});