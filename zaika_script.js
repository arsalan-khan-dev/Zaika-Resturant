// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Menu Tab Filtering
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCards = document.querySelectorAll('.menu-card');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        menuTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-category');

        // Filter menu cards
        menuCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category').split(' ');
            if (cardCategories.includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Set initial animation for menu cards
menuCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.3s ease-out';
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 50);
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imageUrl = item.getAttribute('data-image');
        modalImage.src = imageUrl;
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    galleryModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// Scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections for scroll animation
document.querySelectorAll('.exp-card, .team-card, .testimonial-card, .award-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Smooth number animation for stats
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (!statValue) return;
            const rawText = statValue.textContent || '';
            const number = parseInt(rawText.replace(/[^\d]/g, ''), 10) || 0;
            animateValue(statValue, 0, number, 1000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// Form submission
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your reservation! We will confirm your booking shortly.');
        bookingForm.reset();
    });
}

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Active nav link highlight based on scroll position
const navLinks = document.querySelectorAll('.nav-link');
const sectionElements = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let currentId = 'home';
    const scrollPos = window.pageYOffset;
    sectionElements.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollPos >= sectionTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', () => {
    // existing navbar shadow effect
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    updateActiveNav();
});

window.addEventListener('hashchange', updateActiveNav);
document.addEventListener('DOMContentLoaded', updateActiveNav);

// remove unsafe query for generic onclick and use dedicated class
document.querySelectorAll('.js-scroll-to').forEach(button => {
    button.addEventListener('click', (e) => {
        const target = button.dataset.target;
        if (!target) return;
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation delay to elements
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.exp-card');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// Lazy load images (optional enhancement)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to current page link
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

setActiveLink();

// Scroll to top smooth behavior
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Contact form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Enhanced form validation
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && !validateEmail(emailInput.value)) {
                e.preventDefault();
                alert('Please enter a valid email address');
            }
        });
    });
});

// Add visual feedback on form input
const formInputs = document.querySelectorAll('.booking-form input, .booking-form select, .booking-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#D4AF37';
    });
    input.addEventListener('blur', function() {
        this.style.borderColor = '#E8E8E8';
    });
});

// Responsive adjustments
function handleResize() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Prevent right-click on images for gallery (optional)
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // Optional: uncomment to disable right-click
        // e.preventDefault();
    });
});
