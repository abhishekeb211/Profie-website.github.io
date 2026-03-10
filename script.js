/**
 * ABHISHEK RAUT PORTFOLIO — INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- INITIALIZE ALL COMPONENTS ---
    initScrollAnimations();
    initServiceWorker();
    initNavbar();
    initContactForm();
    initTheme();
    initModals();
    initCounters();
    initTiltEffects();
    initCursor();
    initParallaxOrbs();
    initImageErrorHandler();
    initNotifications();
    initMobileMenu();
    initCanvasParticles();
    initTabs();

    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // --- TAB SWITCHER LOGIC ---
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        const root = document.documentElement;

        if (!tabBtns.length || !tabPanes.length) return;

        function switchToTab(btn) {
            const targetId = `${btn.getAttribute('data-target')}-pane`;
            const targetPane = document.getElementById(targetId);
            if (!targetPane) return;

            // Remove active classes and update ARIA
            tabBtns.forEach((b, i) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
                b.setAttribute('tabindex', '-1');
            });
            tabPanes.forEach(p => {
                p.classList.remove('active');
                p.style.display = 'none';
                p.setAttribute('aria-hidden', 'true');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            btn.setAttribute('tabindex', '0');
            targetPane.style.display = 'block';
            targetPane.setAttribute('aria-hidden', 'false');
            setTimeout(() => targetPane.classList.add('active'), 10);

            const isProf = targetId === 'prof-pane';
            if (isProf) {
                document.body.setAttribute('data-persona', 'prof');
                root.style.setProperty('--accent', 'var(--prof-accent)');
                root.style.setProperty('--accent2', 'var(--prof-accent2)');
                root.style.setProperty('--glow', 'var(--prof-glow)');
                root.style.setProperty('--grad', 'var(--prof-grad)');
            } else {
                document.body.removeAttribute('data-persona');
                root.style.removeProperty('--accent');
                root.style.removeProperty('--accent2');
                root.style.removeProperty('--glow');
                root.style.removeProperty('--grad');
            }

            const navLinks = document.querySelectorAll('#nav-links a');
            navLinks.forEach(link => {
                const profHref = link.getAttribute('data-prof');
                const aiHref = link.getAttribute('data-ai');
                if (isProf && profHref) link.setAttribute('href', profHref);
                else if (!isProf && aiHref) link.setAttribute('href', aiHref);
            });

            const footerNavLinks = document.querySelectorAll('.footer-nav a[data-ai]');
            footerNavLinks.forEach(link => {
                const profHref = link.getAttribute('data-prof');
                const aiHref = link.getAttribute('data-ai');
                if (isProf && profHref) link.setAttribute('href', profHref);
                else if (!isProf && aiHref) link.setAttribute('href', aiHref);
            });

            const footerTagline = document.getElementById('footer-tagline');
            if (footerTagline) footerTagline.textContent = isProf ? 'Professor & Innovation Mentor' : 'AI Engineer & Innovation Mentor';

            window.scrollTo({ top: 0, behavior: 'smooth' });
            refreshAnimations();
        }

        tabBtns.forEach((btn, index) => {
            btn.setAttribute('tabindex', index === 0 ? '0' : '-1');
            btn.addEventListener('click', () => switchToTab(btn));
        });

        const tabList = document.querySelector('.tab-switcher[role="tablist"]');
        if (tabList) {
            tabList.addEventListener('keydown', (e) => {
                const idx = Array.from(tabBtns).indexOf(document.activeElement);
                if (idx === -1) return;
                let next = idx;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    next = (idx + 1) % tabBtns.length;
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    next = (idx - 1 + tabBtns.length) % tabBtns.length;
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    next = 0;
                } else if (e.key === 'End') {
                    e.preventDefault();
                    next = tabBtns.length - 1;
                } else return;
                tabBtns[next].focus();
                switchToTab(tabBtns[next]);
            });
        }
    }

    // --- MOBILE MENU LOGIC ---
    function initMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const nav = document.getElementById('nav-links');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- TOAST NOTIFICATIONS ---
    function initNotifications() {
        window.showToast = function (message, type = 'info') {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            const icon = type === 'success' ? '✅' : 'ℹ️';
            toast.innerHTML = `<span class="toast-icon">${icon}</span> ${message}`;

            container.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('hiding');
                setTimeout(() => toast.remove(), 400);
            }, 3000);
        };

        // Attach to contact links
        const contactLinks = document.querySelectorAll('.contact-link, .email-link');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                const label = link.querySelector('.contact-link-label')?.textContent || "Contact";
                showToast(`${label} Clicked`, 'success');
            });
        });

    }

    // --- GLOBAL IMAGE ERROR HANDLER ---
    function initImageErrorHandler() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.src = 'images/data%20code.png'; // Fallback to a known local image
                e.target.style.filter = 'grayscale(1) opacity(0.5)';
            }
        }, true);
    }


    // --- SCROLL REVEAL ANIMATIONS ---
    let observer;
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        refreshAnimations();
    }

    function refreshAnimations() {
        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach((el, index) => {
            el.classList.remove('visible'); // Reset
            el.style.transitionDelay = `${index * 0.05}s`; // Staggered reveal
            observer.observe(el);
        });
    }

    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').then(reg => {
                    console.log('SW Registered');
                }).catch(err => {
                    console.log('SW Registration Failed', err);
                });
            });
        }
    }

    // --- NAVBAR & SCROLL EFFECTS ---
    function initNavbar() {
        const header = document.getElementById('header');
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        const scrollProgressBar = document.querySelector('.scroll-progress-bar');
        const navLinks = document.querySelectorAll('.nav-links a');

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }

            scrollTimeout = window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                if (window.scrollY > 500) {
                    if (scrollToTopBtn) scrollToTopBtn.classList.add('visible');
                } else {
                    if (scrollToTopBtn) scrollToTopBtn.classList.remove('visible');
                }

                updateActiveLink();

                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollPercentage = (scrollTop / scrollHeight) * 100;
                if (scrollProgressBar) scrollProgressBar.style.width = scrollPercentage + '%';
            });
        });

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetEntry = document.querySelector(targetId);
                if (targetEntry) {
                    window.scrollTo({
                        top: targetEntry.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // --- ACTIVE LINK TRACKING ---
    function updateActiveLink() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');
        let current = "";
        sections.forEach(section => {
            if (section.offsetParent === null) return; // SKIP HIDDEN SECTIONS
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    }

    // --- EMAIL DECODER ---
    function initContactForm() {
        const emailLinks = document.querySelectorAll('.email-link');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const user = link.getAttribute('data-user');
                const domain = link.getAttribute('data-domain');
                if (user && domain) {
                    const email = `${user}@${domain}`;
                    window.location.href = `mailto:${email}`;
                    const display = link.querySelector('.contact-link-val');
                    if (display) {
                        display.textContent = email;
                        setTimeout(() => {
                            const userPart = user.substring(0, 5);
                            display.textContent = `${userPart}...[at]...${domain}`;
                        }, 3000);
                    }
                }
            });
        });
    }

    // --- THEME SWITCHER (Light, Dark, Hacker, Glass) ---
    function initTheme() {
        const trigger = document.getElementById('theme-switcher-trigger');
        const dropdown = document.getElementById('theme-switcher-dropdown');
        const currentLabel = document.getElementById('theme-current-label');
        const options = document.querySelectorAll('.theme-option');
        const body = document.body;

        if (!trigger || !dropdown || !currentLabel) return;

        const THEMES = ['light', 'dark', 'hacker', 'glass'];

        function applyTheme(theme) {
            if (!THEMES.includes(theme)) theme = 'dark';
            body.classList.remove('light-theme', 'dark-theme', 'hacker-theme', 'glass-theme');
            body.classList.add(`${theme}-theme`);

            const labels = { light: 'Light', dark: 'Dark', hacker: 'Hacker', glass: 'Glass' };
            currentLabel.textContent = labels[theme];

            options.forEach(opt => {
                const isActive = opt.getAttribute('data-theme') === theme;
                opt.setAttribute('aria-current', isActive ? 'true' : 'false');
                opt.classList.toggle('active', isActive);
            });

            localStorage.setItem('portfolio-theme', theme);
            dropdown.setAttribute('hidden', '');
            trigger.setAttribute('aria-expanded', 'false');
        }

        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        applyTheme(savedTheme);

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.getAttribute('hidden') == null;
            if (isOpen) {
                dropdown.setAttribute('hidden', '');
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                dropdown.removeAttribute('hidden');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });

        dropdown.addEventListener('click', (e) => e.stopPropagation());

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                applyTheme(opt.getAttribute('data-theme'));
            });
        });

        document.addEventListener('click', () => {
            if (dropdown.getAttribute('hidden') == null) {
                dropdown.setAttribute('hidden', '');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (dropdown.getAttribute('hidden') != null) return;
            if (e.key === 'Escape') {
                dropdown.setAttribute('hidden', '');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
                e.preventDefault();
                return;
            }
            const opts = Array.from(options);
            const current = document.activeElement;
            const idx = opts.indexOf(current);
            if (idx === -1) return;
            if (e.key === 'ArrowDown' && idx < opts.length - 1) {
                e.preventDefault();
                opts[idx + 1].focus();
            } else if (e.key === 'ArrowUp' && idx > 0) {
                e.preventDefault();
                opts[idx - 1].focus();
            } else if (e.key === 'ArrowUp' && idx === 0) {
                e.preventDefault();
                trigger.focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                opts[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                opts[opts.length - 1].focus();
            }
        });

        trigger.addEventListener('keydown', (e) => {
            if (dropdown.getAttribute('hidden') == null) return;
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                dropdown.removeAttribute('hidden');
                trigger.setAttribute('aria-expanded', 'true');
                const first = options[0];
                if (first) first.focus();
            }
        });
    }

    // --- PROJECT MODAL ENGINE ---
    function initModals() {
        const modal = document.getElementById('project-modal');
        if (!modal) return;
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalTags = document.getElementById('modal-tags');
        const modalDesc = document.getElementById('modal-description');
        const modalLink = document.getElementById('modal-link');
        const modalClose = modal.querySelector('.modal-close');
        const projectCards = document.querySelectorAll('.project-card[data-full-desc]');
        const body = document.body;

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('.project-title')?.textContent || "Project";
                const img = card.querySelector('.project-image')?.src || "";
                const desc = card.getAttribute('data-full-desc') || "No description available.";
                const tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').split(',') : [];
                const link = card.getAttribute('data-link') || '#';

                if (modalTitle) modalTitle.textContent = title;
                if (modalImg) modalImg.src = img;
                if (modalDesc) modalDesc.textContent = desc;
                if (modalLink) modalLink.href = link;

                if (modalTags) {
                    modalTags.innerHTML = '';
                    tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'hero-badge';
                        span.textContent = tag.trim();
                        modalTags.appendChild(span);
                    });
                }

                modal.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            body.style.overflow = '';
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- HIGH-PERFORMANCE CANVAS PARTICLES ---
    function initCanvasParticles() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrame;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                const isHacker = document.body.classList.contains('hacker-theme');
                const isProf = document.body.getAttribute('data-persona') === 'prof';

                let color = 'rgba(56, 189, 248, '; // default AI Light/Dark
                if (isProf) color = 'rgba(16, 185, 129, '; // Prof Light/Dark
                if (isHacker) {
                    color = isProf ? 'rgba(50, 205, 50, ' : 'rgba(0, 255, 65, ';
                }

                ctx.fillStyle = color + this.opacity + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrame = requestAnimationFrame(animate);
        }

        init();
        animate();
    }


    // --- IMPACT COUNTER ENGINE ---
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const counterObserverOptions = { threshold: 0.5 };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const speed = 200;
                    const increment = target / speed;

                    const updateCount = () => {
                        const currentCount = +counter.innerText;
                        if (currentCount < target) {
                            counter.innerText = Math.ceil(currentCount + increment);
                            setTimeout(updateCount, 1);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    counterObserver.unobserve(counter);
                }
            });
        }, counterObserverOptions);

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // --- 3D TILT EFFECT ---
    function initTiltEffects() {
        const tiltCards = document.querySelectorAll('.education-card, .mentorship-card, .teaching-card, .expertise-card, .highlight-item, .project-card, .award-item, .cert-card, .freebie-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            });
        });
    }

    // --- CUSTOM CURSOR ---
    function initCursor() {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const hoverElements = document.querySelectorAll('a, button, .tab-pill, .project-card, .photo-item, .hero-avatar, .hero-image-container, .expertise-card, .education-card, .mentorship-card, .teaching-card');
        const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .resume-btn');

        if (!cursorDot || !cursorOutline) return;

        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;
        let outlineX = window.innerWidth / 2;
        let outlineY = window.innerHeight / 2;

        window.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = `${cursorX}px`;
            cursorDot.style.top = `${cursorY}px`;
        });

        function animateCursor() {
            let dx = cursorX - outlineX;
            let dy = cursorY - outlineY;
            outlineX += dx * 0.15;
            outlineY += dy * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hovered');
                cursorDot.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hovered');
                cursorDot.classList.remove('hovered');
            });
        });

        magneticElements.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // --- PARALLAX ORBS ---
    function initParallaxOrbs() {
        const orbs = document.querySelectorAll('.hero-orb');
        if (!orbs.length) return;
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            orbs.forEach(orb => {
                const speedX = orb.classList.contains('hero-orb-1') ? 35 : -45;
                const speedY = orb.classList.contains('hero-orb-1') ? 35 : -45;
                orb.style.transform = `translate(${x * speedX}px, ${y * speedY}px)`;
            });
        });
    }

});
