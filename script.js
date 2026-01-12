// ============================================
// Portfolio Website - Enhanced JavaScript
// ============================================

// Project Data with Categories
const myProjects = [
    {
        title: "E-Commerce Platform",
        desc: "A full-scale online store focusing on user flow, performance optimization, and seamless checkout experience.",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "web",
        icon: "fa-shopping-cart",
        link: "#",
        github: "#"
    },
    {
        title: "Portfolio Design System",
        desc: "A minimalist approach to personal branding with reusable components and design tokens.",
        tags: ["UI/UX", "Figma", "Design System"],
        category: "design",
        icon: "fa-palette",
        link: "#",
        github: "#"
    },
    {
        title: "Task Management App",
        desc: "Helping teams organize workflows through intuitive interfaces and real-time collaboration.",
        tags: ["React", "Node.js", "MongoDB"],
        category: "app",
        icon: "fa-tasks",
        link: "#",
        github: "#"
    },
    {
        title: "Weather Dashboard",
        desc: "Real-time weather application with beautiful visualizations and location-based forecasts.",
        tags: ["API", "JavaScript", "CSS"],
        category: "web",
        icon: "fa-cloud-sun",
        link: "#",
        github: "#"
    },
    {
        title: "Mobile Banking UI",
        desc: "Modern and secure mobile banking interface design with intuitive navigation patterns.",
        tags: ["UI/UX", "Prototype", "Mobile"],
        category: "design",
        icon: "fa-mobile-alt",
        link: "#",
        github: "#"
    },
    {
        title: "Fitness Tracker",
        desc: "Comprehensive fitness tracking application with workout plans and progress analytics.",
        tags: ["Vue.js", "Firebase", "PWA"],
        category: "app",
        icon: "fa-heartbeat",
        link: "#",
        github: "#"
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set current year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Initialize all features
    initMobileMenu();
    initScrollEffects();
    initRevealAnimations();
    initProjects();
    initFeaturedProjects();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initStatCounters();
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
}

// ============================================
// Reveal Animations
// ============================================
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================
// Projects Rendering
// ============================================
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.dataset.category = project.category;

    card.innerHTML = `
        <div class="project-image">
            <i class="fas ${project.icon}"></i>
        </div>
        <div class="project-content">
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <div class="project-links">
                <a href="${project.link}" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>
                <a href="${project.github}" class="project-link"><i class="fab fa-github"></i> Code</a>
            </div>
        </div>
    `;

    return card;
}

function initProjects() {
    const container = document.getElementById('project-container');
    if (!container) return;

    container.innerHTML = '';
    myProjects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });

    // Re-observe new elements
    setTimeout(() => {
        document.querySelectorAll('.project-card.reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);
}

function initFeaturedProjects() {
    const container = document.getElementById('featured-projects');
    if (!container) return;

    // Show only first 3 projects on home page
    const featuredProjects = myProjects.slice(0, 3);
    featuredProjects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

// ============================================
// Project Filters
// ============================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter projects
            document.querySelectorAll('.project-card').forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// Contact Form with Validation
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Character counter for message
    if (messageInput && charCount) {
        messageInput.addEventListener('input', () => {
            const count = messageInput.value.length;
            charCount.textContent = count;

            if (count > 500) {
                charCount.style.color = 'var(--error)';
            } else {
                charCount.style.color = 'var(--text-dim)';
            }
        });
    }

    // Real-time validation
    const validateField = (input, validationFn) => {
        const errorEl = input.parentElement.querySelector('.error-message');
        const result = validationFn(input.value);

        if (result.valid) {
            input.classList.remove('error');
            input.classList.add('success');
            if (errorEl) errorEl.textContent = '';
            return true;
        } else {
            input.classList.remove('success');
            input.classList.add('error');
            if (errorEl) errorEl.textContent = result.message;
            return false;
        }
    };

    const validators = {
        name: (value) => {
            if (!value.trim()) return { valid: false, message: 'Name is required' };
            if (value.trim().length < 2) return { valid: false, message: 'Name must be at least 2 characters' };
            return { valid: true };
        },
        email: (value) => {
            if (!value.trim()) return { valid: false, message: 'Email is required' };
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return { valid: false, message: 'Please enter a valid email address' };
            return { valid: true };
        },
        subject: (value) => {
            if (!value) return { valid: false, message: 'Please select a subject' };
            return { valid: true };
        },
        message: (value) => {
            if (!value.trim()) return { valid: false, message: 'Message is required' };
            if (value.trim().length < 10) return { valid: false, message: 'Message must be at least 10 characters' };
            if (value.length > 500) return { valid: false, message: 'Message cannot exceed 500 characters' };
            return { valid: true };
        }
    };

    // Add blur event listeners for real-time validation
    if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput, validators.name));
    if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput, validators.email));
    if (subjectInput) subjectInput.addEventListener('blur', () => validateField(subjectInput, validators.subject));
    if (messageInput) messageInput.addEventListener('blur', () => validateField(messageInput, validators.message));

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = nameInput ? validateField(nameInput, validators.name) : true;
        const isEmailValid = emailInput ? validateField(emailInput, validators.email) : true;
        const isSubjectValid = subjectInput ? validateField(subjectInput, validators.subject) : true;
        const isMessageValid = messageInput ? validateField(messageInput, validators.message) : true;

        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            showFormStatus('Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success
            showFormStatus(`Thank you, ${nameInput.value}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
            form.reset();

            // Reset field states
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                if (input) {
                    input.classList.remove('success', 'error');
                }
            });

            if (charCount) charCount.textContent = '0';

        } catch (error) {
            showFormStatus('Oops! Something went wrong. Please try again later.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    function showFormStatus(message, type) {
        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;

        // Auto-hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.className = 'form-status';
        }, 5000);
    }
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Stat Counter Animation
// ============================================
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

// ============================================
// CSS Animation Keyframes (added via JS)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);