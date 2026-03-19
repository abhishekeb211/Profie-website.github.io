/**
 * ABHISHEK RAUT PORTFOLIO — INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
    let observer;

    // --- INITIALIZE ALL COMPONENTS ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const shouldReduceMotion = prefersReducedMotion || isTouchDevice;

    // T4-E: tag mobile devices for CSS animation budget reduction
    if (isTouchDevice) document.body.classList.add('reduce-motion-mobile');

    initScrollAnimations();
    initServiceWorker();
    initNavbar();
    initContactForm();
    initTheme();
    initModals();
    initCounters();
    initImageErrorHandler();
    initNotifications();
    initMobileMenu();
    initTabs();
    initOrbitChips();

    if (!shouldReduceMotion) {
        initTiltEffects();
        initCursor();
        initParallaxOrbs();
        initCanvasParticles();
        initCardSpotlight();
        initRipple();
        initCardMagnetic();
        initTypewriter();
    }

    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            window.open('./Abhishek Raut Resume 0226.pdf', '_blank', 'noopener,noreferrer');
        });
    }

    // --- TAB SWITCHER LOGIC ---
    function initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        if (!tabBtns.length || !tabPanes.length) return;

        // T2-F: inject sliding indicator element
        const switcher = document.querySelector('.tab-switcher.bottom-dock');
        let indicator = null;
        if (switcher) {
            indicator = document.createElement('div');
            indicator.className = 'tab-switcher-indicator';
            switcher.prepend(indicator);
        }

        function updateIndicator(btn) {
            if (!indicator || !switcher) return;
            const sr = switcher.getBoundingClientRect();
            const br = btn.getBoundingClientRect();
            indicator.style.left = `${br.left - sr.left}px`;
            indicator.style.width = `${br.width}px`;
        }

        function switchToTab(btn) {
            const targetId = `${btn.getAttribute('data-target')}-pane`;
            const targetPane = document.getElementById(targetId);
            if (!targetPane) return;

            // Remove active classes and update ARIA
            tabBtns.forEach((b) => {
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

            updateIndicator(btn);

            const isProf = targetId === 'prof-pane';
            if (isProf) {
                document.body.setAttribute('data-persona', 'prof');
            } else {
                document.body.removeAttribute('data-persona');
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

            window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' });
            refreshAnimations();
        }

        tabBtns.forEach((btn, index) => {
            btn.setAttribute('tabindex', index === 0 ? '0' : '-1');
            btn.addEventListener('click', () => switchToTab(btn));
        });

        // initialise indicator position on first active tab
        const activeBtn = document.querySelector('.tab-btn.active');
        if (activeBtn) requestAnimationFrame(() => updateIndicator(activeBtn));

        const tabList = document.querySelector('.tab-switcher[role="tablist"]');
        if (tabList) {
            tabList.addEventListener('keydown', (e) => {
                const idx = Array.from(tabBtns).indexOf(document.activeElement);
                if idx === -1 return;
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

        toggle.setAttribute('aria-controls', 'nav-links');
        toggle.setAttribute('aria-expanded', 'false');

        const openMenu = () => {
            toggle.classList.add('active');
            nav.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            toggle.classList.remove('active');
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            toggle.focus();
        };

        toggle.addEventListener('click', () => {
            if (nav.classList.contains('active')) closeMenu();
            else openMenu();
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                e.preventDefault();
                closeMenu();
            }
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
                window.showToast(`${label} Clicked`, 'success');
            });
        });

    }

    // --- GLOBAL IMAGE ERROR HANDLER ---
    function initImageErrorHandler() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.src = 'images/ANHACK.jpg'; // Fallback to a known local image
                e.target.style.filter = 'grayscale(1) opacity(0.5)';
            }
        }, true);
    }


    // --- SCROLL REVEAL ANIMATIONS ---
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        refreshAnimations();
    }

    // T1-E: Smart per-grid stagger — resets and re-observes fade-up elements
    function refreshAnimations() {
        if (!observer) return;
        const grids = document.querySelectorAll('.highlights-grid, .expertise-grid, .projects-grid');
        // Stagger children within each grid independently
        grids.forEach(grid => {
            Array.from(grid.querySelectorAll('.fade-up')).forEach((el, i) => {
                el.classList.remove('visible');
                el.style.transitionDelay = `${i * 0.08}s`;
                observer.observe(el);
            });
        });
        // Remaining fade-ups outside grids (section titles, heroes, etc.)
        const gridItems = new Set(document.querySelectorAll('.highlights-grid .fade-up, .expertise-grid .fade-up, .projects-grid .fade-up'));
        document.querySelectorAll('.fade-up').forEach((el, index) => {
            if (!gridItems.has(el)) {
                el.classList.remove('visible');
                el.style.transitionDelay = `${index * 0.05}s`;
                observer.observe(el);
            }
        });
    }

    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').then(() => {

                }).catch((err) => {
                    if (typeof console !== 'undefined' && console.error) console.error('SW Registration Failed', err);
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
                if (header) {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
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
                if (!targetId) return;
                const targetEntry = document.querySelector(targetId);
                if (targetEntry) {
                    window.scrollTo({
                        top: targetEntry.offsetTop - 80,
                        behavior: shouldReduceMotion ? 'auto' : 'smooth'
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

        navLinks.forEach((a) => {
            a.classList.remove('active');
            if (current && a.getAttribute('href') === `#${current}`) {
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

        // T4-D: inject theme-flash overlay once
        let flashEl = document.querySelector('.theme-flash');
        if (!flashEl) {
            flashEl = document.createElement('div');
            flashEl.className = 'theme-flash';
            document.body.appendChild(flashEl);
        }

        function triggerFlash() {
            if (shouldReduceMotion) return;
            flashEl.classList.add('active');
            setTimeout(() => flashEl.classList.remove('active'), 300);
        }

        // T3-C: confetti burst when switching TO light theme
        function spawnConfetti() {
            if (shouldReduceMotion) return;
            const colors = ['#22d3ee', '#14b8a6', '#f59e0b', '#ec4899', '#a78bfa', '#34d399'];
            for (let i = 0; i < 32; i++) {
                const dot = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = 6 + Math.random() * 8;
                const startX = 30 + Math.random() * 40;
                dot.style.cssText = `
                    position:fixed; z-index:99998; pointer-events:none; border-radius:50%;
                    width:${size}px; height:${size}px; background:${color};
                    left:${startX}vw; top:50vh;
                    animation: confetti-fall ${1.8 + Math.random() * 1.2}s ease-out ${Math.random() * 0.4}s forwards;
                    transform: translateX(${(Math.random() - 0.5) * 40}vw);
                `;
                document.body.appendChild(dot);
                dot.addEventListener('animationend', () => dot.remove());
            }
        }

        let prevTheme = '';

        function applyTheme(theme) {
            if (!THEMES.includes(theme)) theme = 'dark';
            if (prevTheme && prevTheme !== theme) triggerFlash();
            if (theme === 'light' && prevTheme && prevTheme !== 'light') spawnConfetti();
            prevTheme = theme;

            body.classList.remove('light-theme', 'dark-theme', 'hacker-theme', 'glass-theme');
            body.classList.add(`${theme}-theme`);
            body.setAttribute('data-mode', theme);

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

        let lastFocused = null;

        const getFocusable = () => modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('hidden', '');
            body.style.overflow = '';
            if (lastFocused) lastFocused.focus();
        };

        const openModal = (card) => {
            const title = card.querySelector('.project-title')?.textContent || 'Project';
            const img = card.querySelector('.project-image')?.src || '';
            const desc = card.getAttribute('data-full-desc') || 'No description available.';
            const tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').split(',') : [];
            const link = card.getAttribute('data-link') || '#';

            if (modalTitle) modalTitle.textContent = title;
            if (modalImg) modalImg.src = img;
            if (modalImg) modalImg.alt = title;
            if (modalDesc) modalDesc.textContent = desc;
            if (modalLink) {
                modalLink.href = link;
                modalLink.style.display = (link && link !== '#') ? '' : 'none';
            }

            if (modalTags) {
                modalTags.innerHTML = '';
                tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'hero-badge';
                    span.textContent = tag.trim();
                    modalTags.appendChild(span);
                });
            }

            lastFocused = document.activeElement;
            modal.removeAttribute('hidden');
            modal.classList.add('active');
            body.style.overflow = 'hidden';
            if (modalClose) modalClose.focus();
        };

        projectCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-haspopup', 'dialog');
            card.addEventListener('click', () => openModal(card));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(card);
                }
            });
        });

        if (modalClose) modalClose.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') {
                e.preventDefault();
                closeModal();
                return;
            }
            if (e.key === 'Tab') {
                const focusable = getFocusable();
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // --- HIGH-PERFORMANCE CANVAS PARTICLES (T4-B DPR, T4-C FPS, T3-A/B/D/E) ---
    function initCanvasParticles() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // T4-C: FPS throttle
        const targetFPS = isTouchDevice ? 30 : 60;
        const frameInterval = 1000 / targetFPS;
        let lastFrame = 0;
        let animationFrame;

        const isHacker = () => document.body.classList.contains('hacker-theme');
        const isGlass = () => document.body.classList.contains('glass-theme');
        const isDark = () => document.body.classList.contains('dark-theme');
        const isProf = () => document.body.hasAttribute('data-persona');

        // T4-B: DPR-aware resize
        function resize() {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(dpr, dpr);
        }
        window.addEventListener('resize', () => { resize(); init(); });
        resize();

        const W = () => window.innerWidth;
        const H = () => window.innerHeight;

        // --- PARTICLES ---
        let particles = [];

        const getParticleCount = () => {
            const base = W() < 760 ? 22 : 42;
            if (isHacker()) return base + 28;
            if (isGlass()) return Math.max(16, base - 10);
            return base;
        };

        class Particle {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * W();
                this.y = Math.random() * H();
                const hacker = isHacker();
                this.size = hacker ? Math.random() * 2.2 + 0.8 : Math.random() * 2 + 1;
                const speed = hacker ? 1.1 : 0.5;
                this.speedX = (Math.random() - 0.5) * speed;
                this.speedY = (Math.random() - 0.5) * speed;
                this.opacity = hacker ? Math.random() * 0.65 + 0.25 : Math.random() * 0.5 + 0.2;
                // T3-A: twinkling phase
                this.twinklePhase = Math.random() * Math.PI * 2;
                this.twinkleSpeed = 0.008 + Math.random() * 0.012;
                this.baseOpacity = this.opacity;
                // T3-B: hacker flicker
                this.flickerOffset = Math.random() * Math.PI * 2;
                this.flickerSpeed = 0.02 + Math.random() * 0.03;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > W()) this.speedX *= -1;
                if (this.y < 0 || this.y > H()) this.speedY *= -1;
                if (isHacker()) {
                    this.flickerOffset += this.flickerSpeed;
                    this.opacity = 0.25 + Math.abs(Math.sin(this.flickerOffset)) * 0.55;
                } else if (isDark()) {
                    // T3-A: twinkling
                    this.twinklePhase += this.twinkleSpeed;
                    this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.2;
                    this.opacity = Math.max(0.05, Math.min(0.85, this.opacity));
                }
            }
            draw() {
                const computed = getComputedStyle(document.body);
                const tint = (computed.getPropertyValue('--particle-tint') || '34, 211, 238').trim();
                if (isHacker()) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 0.55, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 180, 180, ${this.opacity * 0.85})`;
                    ctx.fill();
                    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.8);
                    g.addColorStop(0, `rgba(${tint}, ${this.opacity * 0.9})`);
                    g.addColorStop(0.5, `rgba(${tint}, ${this.opacity * 0.35})`);
                    g.addColorStop(1, `rgba(${tint}, 0)`);
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 2.8, 0, Math.PI * 2);
                    ctx.fillStyle = g;
                    ctx.fill();
                } else {
                    ctx.fillStyle = `rgba(${tint}, ${this.opacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        function drawHackerConnections() {
            const computed = getComputedStyle(document.body);
            const tint = (computed.getPropertyValue('--particle-tint') || '255, 26, 26').trim();
            const maxDist = 130;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.28;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${tint}, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
        }

        // T3-B: Glass bokeh blobs
        let bokehBlobs = [];

        class BokehBlob {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * W();
                this.y = Math.random() * H();
                this.r = 20 + Math.random() * 40;
                this.speedX = (Math.random() - 0.5) * 0.18;
                this.speedY = (Math.random() - 0.5) * 0.18;
                this.opacity = 0.03 + Math.random() * 0.06;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < -this.r) this.x = W() + this.r;
                if (this.x > W() + this.r) this.x = -this.r;
                if (this.y < -this.r) this.y = H() + this.r;
                if (this.y > H() + this.r) this.y = -this.r;
            }
            draw() {
                const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
                g.addColorStop(0, `rgba(56, 189, 248, ${this.opacity})`);
                g.addColorStop(1, 'rgba(56, 189, 248, 0)');
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
            }
        }

        // T3-D: Hacker binary rain
        let rainCols = [];
        let rainSkip = 0;
        const RAIN_CHARS = '01';
        const RAIN_FONT_SIZE = 14;

        function initRain() {
            const cols = Math.floor(W() / RAIN_FONT_SIZE);
            rainCols = Array.from({ length: cols }, () => Math.random() * -H());
        }

        function drawRain() {
            rainSkip++;
            if (rainSkip < 3) return;
            rainSkip = 0;
            ctx.fillStyle = 'rgba(10, 0, 0, 0.08)';
            ctx.fillRect(0, 0, W(), H());
            ctx.font = `${RAIN_FONT_SIZE}px monospace`;
            rainCols.forEach((y, i) => {
                const ch = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
                const x = i * RAIN_FONT_SIZE;
                const bright = y > 0 && y < RAIN_FONT_SIZE * 2;
                ctx.fillStyle = bright ? 'rgba(255, 120, 120, 0.95)' : `rgba(180, 0, 0, ${0.15 + Math.random() * 0.25})`;
                ctx.fillText(ch, x, y > 0 ? y : 0);
                rainCols[i] += RAIN_FONT_SIZE;
                if (y > H() + RAIN_FONT_SIZE) {
                    rainCols[i] = Math.random() * -H() * 0.5;
                }
            });
        }

        // T3-E: Professor drifting formula symbols
        let formulaSymbols = [];
        const FORMULA_CHARS = ['∑', '∫', 'λ', '∇', '∂', '⊕', '{}', '</>', 'π', 'Δ', '≈', '∞'];

        class FormulaSymbol {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * W();
                this.y = Math.random() * H();
                this.char = FORMULA_CHARS[Math.floor(Math.random() * FORMULA_CHARS.length)];
                this.opacity = 0.04 + Math.random() * 0.08;
                this.speedX = (Math.random() - 0.5) * 0.35;
                this.speedY = (Math.random() - 0.5) * 0.35;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.004;
                this.size = 13 + Math.random() * 12;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotSpeed;
                if (this.x < 0) this.x = W();
                if (this.x > W()) this.x = 0;
                if (this.y < 0) this.y = H();
                if (this.y > H()) this.y = 0;
            }
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = 'rgba(45, 212, 191, 1)';
                ctx.font = `${this.size}px monospace`;
                ctx.fillText(this.char, 0, 0);
                ctx.restore();
                ctx.globalAlpha = 1;
            }
        }

        function init() {
            particles = Array.from({ length: getParticleCount() }, () => new Particle());
            bokehBlobs = isGlass() ? Array.from({ length: 10 }, () => new BokehBlob()) : [];
            formulaSymbols = isProf() && !isHacker() ? Array.from({ length: 18 }, () => new FormulaSymbol()) : [];
            if (isHacker()) initRain();
        }

        function animate(timestamp) {
            if (timestamp - lastFrame < frameInterval) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }
            lastFrame = timestamp;

            if (isHacker()) {
                drawRain();
                drawHackerConnections();
            } else {
                ctx.clearRect(0, 0, W(), H());
                if (isGlass()) bokehBlobs.forEach(b => { b.update(); b.draw(); });
            }

            if (isProf() && !isHacker()) {
                formulaSymbols.forEach(s => { s.update(); s.draw(); });
            }

            particles.forEach(p => { p.update(); p.draw(); });
            animationFrame = requestAnimationFrame(animate);
        }

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) { cancelAnimationFrame(animationFrame); return; }
            animationFrame = requestAnimationFrame(animate);
        });

        const themeObserver = new MutationObserver(() => init());
        themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-persona'] });

        init();
        animationFrame = requestAnimationFrame(animate);
    }


    // --- T2-D: EASED COUNTER ENGINE (rAF + easeOutCubic) ---
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        const duration = 1800;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const start = performance.now();

                function tick(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    counter.textContent = Math.round(easeOutCubic(progress) * target);
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        counter.textContent = target;
                    }
                }

                requestAnimationFrame(tick);
                counterObserver.unobserve(counter);
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
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

    // --- T2-C: MOUSE-TRACKING CARD SPOTLIGHT ---
    function initCardSpotlight() {
        const cards = document.querySelectorAll('.project-card, .expertise-card, .education-card, .cert-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', `${x}%`);
                card.style.setProperty('--mouse-y', `${y}%`);
            });
        });
    }

    // --- T2-B: CLICK RIPPLE BURST ---
    function initRipple() {
        const rippleTargets = document.querySelectorAll('.btn-primary, .btn-secondary, .resume-btn, .classroom-card-btn, .tab-btn');
        rippleTargets.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.5;
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.cssText = `
                    width: ${size}px; height: ${size}px;
                    left: ${e.clientX - rect.left - size / 2}px;
                    top: ${e.clientY - rect.top - size / 2}px;
                `;
                btn.appendChild(ripple);
                ripple.addEventListener('animationend', () => ripple.remove());
            });
        });
    }

    // --- T2-A: CARD MAGNETIC HOVER (subtle) ---
    function initCardMagnetic() {
        const cards = document.querySelectorAll('.project-card, .expertise-card, .highlight-item');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
                card.style.setProperty('--mag-x', `${x}px`);
                card.style.setProperty('--mag-y', `${y}px`);
            });
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mag-x', '0px');
                card.style.setProperty('--mag-y', '0px');
            });
        });
    }

    // --- T1-B: TYPEWRITER ROLE CYCLING ---
    function initTypewriter() {
        const heroTags = document.querySelectorAll('.hero-tag');
        const rolesAI = ['AI Architect', 'Agentic AI Engineer', 'GenAI Researcher', 'RL Practitioner'];
        const rolesProf = ['Innovation Mentor', 'PCCOE Professor', 'Coding Club Lead', 'Data Science Educator'];

        heroTags.forEach(tag => {
            const dot = tag.querySelector('.dot');
            const isProf = tag.closest('#prof-pane') !== null;
            const roles = isProf ? rolesProf : rolesAI;
            let roleIdx = 0;
            let charIdx = 0;
            let deleting = false;
            let paused = false;

            // Wrap text node in a span for typewriter, preserve dot
            const span = document.createElement('span');
            span.className = 'typewriter-text';
            span.textContent = roles[0];
            // clear and rebuild
            tag.textContent = '';
            if (dot) tag.appendChild(dot);
            tag.appendChild(span);

            // Add caret
            const caret = document.createElement('span');
            caret.className = 'typewriter-caret';
            caret.textContent = '|';
            tag.appendChild(caret);

            function tick() {
                if (paused) return;
                const current = roles[roleIdx];
                if (!deleting) {
                    charIdx++;
                    span.textContent = current.slice(0, charIdx);
                    if (charIdx === current.length) {
                        paused = true;
                        setTimeout(() => { deleting = true; paused = false; }, 1800);
                        return;
                    }
                    setTimeout(tick, 80);
                } else {
                    charIdx--;
                    span.textContent = current.slice(0, charIdx);
                    if (charIdx === 0) {
                        deleting = false;
                        roleIdx = (roleIdx + 1) % roles.length;
                        setTimeout(tick, 300);
                        return;
                    }
                    setTimeout(tick, 40);
                }
            }
            setTimeout(tick, 1200);
        });
    }

    // --- T1-D: ORBIT CHIPS ---
    function initOrbitChips() {
        if (shouldReduceMotion) return;
        const containers = document.querySelectorAll('.hero-image-container');
        const chipsAI = ['Python', 'LLM', 'RAG', 'AWS', 'PyTorch', 'Agentic'];
        const chipsProf = ['TOC', 'FSDL', 'ML', 'GSoC', 'ICPC', 'GenAI'];

        containers.forEach(container => {
            const isProf = container.closest('#prof-pane') !== null;
            const chips = isProf ? chipsProf : chipsAI;
            const ring = document.createElement('div');
            ring.className = 'orbit-ring';
            ring.setAttribute('aria-hidden', 'true');

            chips.forEach((label, i) => {
                const chip = document.createElement('span');
                chip.className = 'orbit-chip';
                chip.textContent = label;
                const angle = (360 / chips.length) * i;
                const r = 52 + (i % 2) * 18;
                const dur = 10 + (i % 3) * 4;
                const delay = -(dur / chips.length) * i;
                chip.style.setProperty('--orbit-start', `${angle}deg`);
                chip.style.setProperty('--orbit-r', `${r}%`);
                chip.style.setProperty('--orbit-dur', `${dur}s`);
                chip.style.setProperty('--orbit-delay', `${delay}s`);
                ring.appendChild(chip);
            });

            container.appendChild(ring);
        });
    }

    // --- T5-B: TIMELINE DOT SPRING BOUNCE ---
    (function initTimelineDots() {
        const dots = document.querySelectorAll('.timeline-dot');
        if (!dots.length) return;
        const dotObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    dotObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        dots.forEach(d => dotObserver.observe(d));
    }());

});


































































































































































































































































