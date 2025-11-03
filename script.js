// ==================== MENU TOGGLE ====================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// ==================== SCROLL SECTIONS ACTIVE LINK ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    // Sticky navbar
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when clicking nav link
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

// ==================== SCROLL REVEAL ANIMATION ====================
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .section-title', { origin: 'top' });
ScrollReveal().reveal('.profile-section, .about-image', { origin: 'right' });
ScrollReveal().reveal('.about-content, .contact-info', { origin: 'left' });
ScrollReveal().reveal('.stats-container, .social-media, .cta-buttons', { origin: 'bottom', delay: 400 });
ScrollReveal().reveal('.skill-category', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.timeline-item', { origin: 'bottom', interval: 300 });
ScrollReveal().reveal('.project-card', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.cert-card', { origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.trailblazer-card', { origin: 'top' });

// ==================== TYPED.JS ANIMATION ====================
const typed = new Typed(".multiple-text", {
    strings: [
        "Data Analyst",
        "Business Intelligence Analyst", 
        "Data Engineer",
        "Salesforce Engineer",
        "Business Analyst"
    ],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true
});

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.stat-number');
const speed = 200; // Animation speed

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;

    const updateCount = () => {
        const count = +counter.innerText;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target + '+';
        }
    };

    updateCount();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (counter.innerText === '0') {
                animateCounter(counter);
            }
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ==================== SKILL BAR ANIMATION ====================
const skillItems = document.querySelectorAll('.skill-item');

const animateSkillBars = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const progress = skillItem.getAttribute('data-progress');
            const progressBar = skillItem.querySelector('.skill-progress');
            
            skillItem.classList.add('visible');
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 200);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
    threshold: 0.5
});

skillItems.forEach(item => skillObserver.observe(item));

// ==================== SMOOTH SCROLLING FOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navbar.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
        }
    });
});

// ==================== GOOGLE SHEETS FORM SUBMISSION ====================
const scriptURL = 'https://script.google.com/macros/s/AKfycbxddeY2G51mDM-Ce3IJ_gquo157rh2TGydb_qYnzNZBgmkeXINa0Y00pK957c2s364P/exec';
const form = document.forms['submit-to-google-sheet'];
const messageEl = document.getElementById('messageEl');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText ? btnText.textContent : 'Send Message';
        
        if (btnText) {
            btnText.textContent = 'Sending...';
        }
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                console.log('Success!', response);
                if (messageEl) {
                    messageEl.textContent = "✓ Message sent successfully! I'll get back to you soon.";
                    messageEl.style.color = "#00d4ff";
                }
                form.reset();
                 
                // Reset button
                if (btnText) { 
                    btnText.textContent = originalText;
                }
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    if (messageEl) {
                        messageEl.textContent = "";
                    }
                }, 5000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                if (messageEl) {
                    messageEl.textContent = "✗ Oops! Something went wrong. Please try again.";
                    messageEl.style.color = "#ff6b9d";
                }
                
                // Reset button
                if (btnText) {
                    btnText.textContent = originalText;
                }
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'auto';
                
                // Clear error message after 5 seconds
                setTimeout(() => {
                    if (messageEl) {
                        messageEl.textContent = "";
                    }
                }, 5000);
            });
    });
}

// ==================== PARALLAX EFFECT ON SCROLL ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-sphere');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.1 + (index * 0.05);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== DYNAMIC YEAR IN FOOTER ====================
const yearElement = document.querySelector('.footer-content p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; ${currentYear} Ashish Ghaytadak. Crafted with 💙 and ☕`;
}

// ==================== CURSOR GLOW EFFECT ====================
const createCursorGlow = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.5) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
};

// Only add cursor glow on desktop
if (window.innerWidth > 768) {
    createCursorGlow();
}

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    setTimeout(() => {
        const homeContent = document.querySelector('.home-content');
        const profileSection = document.querySelector('.profile-section');
        
        if (homeContent) homeContent.style.opacity = '1';
        if (profileSection) profileSection.style.opacity = '1';
    }, 100);
});

// ==================== INTERACTIVE PROJECT CARDS ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== HEADER HIDE ON SCROLL DOWN ====================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 100) {
        header.style.transform = 'translateY(0)';
        return;
    } 
    
    if (currentScroll > lastScroll && !navbar.classList.contains('active')) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
console.log('%cInterested in the code? Check out my GitHub!', 'font-size: 14px; color: #8b5cf6;');
console.log('%c🔗 https://github.com/ashishghaytadak', 'font-size: 14px; color: #00d4ff;');

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Scroll logic here if needed
}, 10);

window.addEventListener('scroll', debouncedScroll);