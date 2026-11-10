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
    initPrismaticTerminal();
    initBenchmarkGauges();

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
        const switcher = document.querySelector('.tab-switcher');
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
            if (footerTagline) footerTagline.textContent = isProf ? 'Faculty In-charge & Secretary — PCCOE Coding Club' : 'AI Engineer & Innovation Mentor';

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

    // --- TACTILE 2-STATE THEME SWITCHER (Hacker Cyber & Titanium White) ---
    function initTheme() {
        const togglePill = document.getElementById('theme-toggle');
        const hackerBtn = document.getElementById('theme-hacker-btn') || document.getElementById('theme-dark-btn');
        const lightBtn = document.getElementById('theme-light-btn');
        const body = document.body;

        if (!togglePill || !hackerBtn || !lightBtn) return;

        function applyTheme(theme, animate = true) {
            const isHacker = theme !== 'light';
            const targetTheme = isHacker ? 'hacker' : 'light';

            if (animate && !shouldReduceMotion) {
                body.classList.add('theme-transitioning');
                setTimeout(() => body.classList.remove('theme-transitioning'), 380);
            }

            body.classList.remove('light-theme', 'dark-theme', 'glass-theme', 'hacker-theme');
            body.classList.add(isHacker ? 'hacker-theme' : 'light-theme');
            document.documentElement.setAttribute('data-theme', targetTheme);
            body.setAttribute('data-mode', targetTheme);

            hackerBtn.classList.toggle('active', isHacker);
            hackerBtn.setAttribute('aria-checked', isHacker ? 'true' : 'false');
            lightBtn.classList.toggle('active', !isHacker);
            lightBtn.setAttribute('aria-checked', !isHacker ? 'true' : 'false');

            togglePill.setAttribute('data-active', targetTheme);
            localStorage.setItem('portfolio-theme', targetTheme);

            // Swap portrait asset for pure theme immersion
            const heroImg = document.getElementById('hero-portrait-img') || document.querySelector('.portrait-quantum-img');
            const heroSource = document.getElementById('hero-portrait-source') || document.querySelector('#hero-portrait-picture source');
            if (heroImg) {
                const newSrc = targetTheme === 'light' ? 'images/hero-abhishek-light.webp' : 'images/hero-abhishek-hacker.webp';
                heroImg.src = newSrc;
                if (heroSource) heroSource.srcset = newSrc;
            }
        }

        // Initialize from localStorage (defaulting to 'hacker')
        const savedTheme = localStorage.getItem('portfolio-theme') || 'hacker';
        applyTheme(savedTheme, false);

        hackerBtn.addEventListener('click', () => applyTheme('hacker'));
        lightBtn.addEventListener('click', () => applyTheme('light'));

        // Keyboard accessibility
        togglePill.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === ' ') {
                e.preventDefault();
                const current = togglePill.getAttribute('data-active') === 'hacker' ? 'light' : 'hacker';
                applyTheme(current);
                (current === 'hacker' ? hackerBtn : lightBtn).focus();
            }
        });
    }

    // --- BENCHMARK GAUGES & COUNTER ANIMATIONS ---
    function initBenchmarkGauges() {
        const benchmarkSection = document.getElementById('swarms-benchmarks');
        if (!benchmarkSection) return;

        let animated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateGauges();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.25 });

        observer.observe(benchmarkSection);

        function animateGauges() {
            // Gauge 1: 320 Tokens/sec
            animateValue(document.querySelector('.card-samanvay .gauge-item:nth-child(1) .gauge-value'), 0, 320, 1400, '');
            // Gauge 2: 99.4% Accuracy
            animateValue(document.querySelector('.card-samanvay .gauge-item:nth-child(2) .gauge-value'), 0, 99.4, 1400, '%', 1);
            // Gauge 3: 98 Tokens/sec
            animateValue(document.querySelector('.card-coding-agent .gauge-item:nth-child(1) .gauge-value'), 0, 98, 1400, '');
            // Gauge 4: 99.4% Accuracy
            animateValue(document.querySelector('.card-coding-agent .gauge-item:nth-child(2) .gauge-value'), 0, 99.4, 1400, '%', 1);
        }

        function animateValue(el, start, end, duration, suffix = '', decimals = 0) {
            if (!el) return;
            const startTime = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = start + (end - start) * ease;
                el.textContent = current.toFixed(decimals) + suffix;
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = end.toFixed(decimals) + suffix;
                }
            }
            requestAnimationFrame(update);
        }
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
        const isDark = () => !document.body.classList.contains('light-theme');
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
            return W() < 760 ? 24 : 45;
        };

        class Particle {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * W();
                this.y = Math.random() * H();
                this.size = Math.random() * 2 + 0.8;
                this.speedX = (Math.random() - 0.5) * 0.45;
                this.speedY = (Math.random() - 0.5) * 0.45;
                this.opacity = Math.random() * 0.45 + 0.15;
                this.twinklePhase = Math.random() * Math.PI * 2;
                this.twinkleSpeed = 0.008 + Math.random() * 0.012;
                this.baseOpacity = this.opacity;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > W()) this.speedX *= -1;
                if (this.y < 0 || this.y > H()) this.speedY *= -1;

                if (isHacker()) {
                    this.twinklePhase += this.twinkleSpeed * 1.6;
                    this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.35;
                    this.opacity = Math.max(0.15, Math.min(0.85, this.opacity));
                } else if (isDark()) {
                    this.twinklePhase += this.twinkleSpeed;
                    this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.2;
                    this.opacity = Math.max(0.08, Math.min(0.75, this.opacity));
                } else {
                    this.opacity = 0.12 + Math.sin(this.twinklePhase) * 0.06;
                }
            }
            draw() {
                const computed = getComputedStyle(document.body);
                const tint = (computed.getPropertyValue('--particle-tint') || '34, 211, 238').trim();
                ctx.fillStyle = 'rgba(' + tint + ', ' + this.opacity + ')';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Cyber matrix digital telemetry for Hacker mode
        let rainCols = [];
        let rainSkip = 0;
        const RAIN_CHARS = '01λ∂π⊕0x';
        const RAIN_FONT_SIZE = 14;

        function initRain() {
            const cols = Math.floor(W() / RAIN_FONT_SIZE);
            rainCols = Array.from({ length: cols }, () => Math.random() * -H());
        }

        function drawRain() {
            rainSkip++;
            if (rainSkip < 3) return;
            rainSkip = 0;
            ctx.font = `${RAIN_FONT_SIZE}px monospace`;
            rainCols.forEach((y, i) => {
                const ch = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
                const x = i * RAIN_FONT_SIZE;
                const bright = y > 0 && y < RAIN_FONT_SIZE * 2;
                ctx.fillStyle = bright ? 'rgba(255, 120, 120, 0.65)' : 'rgba(255, 26, 26, 0.12)';
                ctx.fillText(ch, x, y > 0 ? y : 0);
                rainCols[i] += RAIN_FONT_SIZE * 0.75;
                if (y > H() + RAIN_FONT_SIZE) {
                    rainCols[i] = Math.random() * -H() * 0.5;
                }
            });
        }

        function drawHackerConnections() {
            const maxDist = 110;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255, 42, 42, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        // Professor drifting formula symbols
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
                ctx.font = this.size + 'px monospace';
                ctx.fillText(this.char, 0, 0);
                ctx.restore();
                ctx.globalAlpha = 1;
            }
        }

        function init() {
            particles = Array.from({ length: getParticleCount() }, () => new Particle());
            formulaSymbols = isProf() ? Array.from({ length: 18 }, () => new FormulaSymbol()) : [];
            if (isHacker()) initRain();
        }

        function animate(timestamp) {
            if (timestamp - lastFrame < frameInterval) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }
            lastFrame = timestamp;

            ctx.clearRect(0, 0, W(), H());

            if (isHacker()) {
                drawRain();
                drawHackerConnections();
            }

            if (isProf()) {
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
        const tiltCards = document.querySelectorAll('.education-card, .mentorship-card, .teaching-card, .expertise-card, .highlight-item, .project-card, .award-item, .cert-card, .freebie-card, .cta-content');
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
        const hoverElements = document.querySelectorAll('a, button, .tab-pill, .project-card, .photo-item, .hero-avatar, .hero-image-container, .expertise-card, .education-card, .mentorship-card, .teaching-card, .cta-content');
        const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .resume-btn, .social-links-grid a');

        if (!cursorDot || !cursorOutline) return;

        let cursorX = window.innerWidth / 2;
        let cursorY = window.innerHeight / 2;
        let outlineX = window.innerWidth / 2;
        let outlineY = window.innerHeight / 2;

        window.addEventListener('mousemove', (e) => {
            if (!document.body.classList.contains('has-cursor')) {
                document.body.classList.add('has-cursor');
            }
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = `${cursorX}px`;
            cursorDot.style.top = `${cursorY}px`;
        });

        document.addEventListener('mouseleave', () => {
            document.body.classList.remove('has-cursor');
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
        const rippleTargets = document.querySelectorAll('.btn-primary, .btn-secondary, .resume-btn, .classroom-card-btn, .tab-btn, .social-links-grid a');
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

    // --- TIMELINE LINE DRAW-IN ---
    (function initTimelineLineDraw() {
        const timelines = document.querySelectorAll('.timeline');
        if (!timelines.length) return;
        const tlObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    tlObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });
        timelines.forEach(t => tlObserver.observe(t));
    }());

    // --- HIGHLIGHT ITEM VISIBLE CLASS (for num-reveal animation) ---
    (function initHighlightReveal() {
        const items = document.querySelectorAll('.highlight-item');
        if (!items.length) return;
        const hiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    hiObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35 });
        items.forEach(i => hiObserver.observe(i));
    }());

    // --- SECTION ACTIVE NAV: precise scroll spy using IntersectionObserver ---
    (function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        if (!sections.length || !navLinks.length) return;

        const spyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.toggle('active', href === `#${id}`);
                });
            });
        }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

        sections.forEach(s => spyObserver.observe(s));
    }());

    // --- EXPERTISE ICON: pause float on hover for better interaction ---
    (function initIconHoverPause() {
        document.querySelectorAll('.expertise-card').forEach(card => {
            const icon = card.querySelector('.expertise-icon');
            if (!icon) return;
            card.addEventListener('mouseenter', () => { icon.style.animationPlayState = 'paused'; });
            card.addEventListener('mouseleave', () => { icon.style.animationPlayState = 'running'; });
        });
    }());

    // --- COMP TABLE ROW: staggered fade-in on scroll ---
    (function initTableRowReveal() {
        const tables = document.querySelectorAll('.comp-table tbody');
        if (!tables.length) return;
        const tableObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const rows = entry.target.querySelectorAll('tr');
                rows.forEach((row, i) => {
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(-10px)';
                    row.style.transition = `opacity 0.35s ease ${i * 0.05}s, transform 0.35s ease ${i * 0.05}s`;
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            row.style.opacity = '1';
                            row.style.transform = 'translateX(0)';
                        });
                    });
                });
                tableObserver.unobserve(entry.target);
            });
        }, { threshold: 0.1 });
        tables.forEach(t => tableObserver.observe(t));
    }());

    // --- PRISMATIC DEVELOPER TERMINAL INTERACTION ---
    function initPrismaticTerminal() {
        const terminalBody = document.getElementById('terminal-body');
        const actionBtns = document.querySelectorAll('.term-action-btn');
        if (!terminalBody || !actionBtns.length) return;

        let isStreaming = false;

        const defaultLogs = [
            '<div class="terminal-line"><span class="t-prompt">$</span> <span class="t-cmd">abhishek.init_orchestrator</span>(<span class="t-param">models</span>=[<span class="t-str">"Llama-3.2"</span>, <span class="t-str">"DeepSeek-R1"</span>, <span class="t-str">"Claude-3.5"</span>])</div>',
            '<div class="terminal-line t-info">[SYSTEM] Prismatic Multi-Agent Mesh initialized across 5 nodes</div>',
            '<div class="terminal-line t-success">[SYNAPSE] Consensus achieved: Swasthya AI decentralized audit passed (99.8%)</div>',
            '<div class="terminal-line t-cyan">[BENCHMARK] Inference speed: 84 tokens/sec on vLLM + CUDA 12.4</div>',
            '<div class="terminal-line t-amber">[AGENT_SYNC] SAMANVAY-7 multi-agent triage stream active (latency: 18ms)</div>',
            '<div class="terminal-line t-stream" id="terminal-stream-line"><span class="t-prompt">&gt;</span> <span class="t-cursor">_</span></div>'
        ];

        const commands = {
            samanvay: [
                { text: '$ python -m samanvay.triage --offline --privacy-pod', type: 'cmd' },
                { text: '[INIT] Loading local Llama-3.2 3B Instruct weights (quantized 4-bit GGUF)...', type: 'info' },
                { text: '[PRIVACY] Air-gapped container: 0 outbound connections, zero biometric data retained.', type: 'cyan' },
                { text: '[AUDIO] Real-time VAD voice synthesis active (streaming latency: 12ms).', type: 'amber' },
                { text: '[READY] Anonymous therapy companion active. Listening to user...', type: 'success' }
            ],
            consensus: [
                { text: '$ ./coding-agent-cli audit --agents=5 --zero-trust', type: 'cmd' },
                { text: '[DISPATCH] 5 autonomous subagents inspecting repository AST & dependency graph...', type: 'info' },
                { text: '[AGENT-1] Security gate verification: PASS (OWASP Top 10 validated)', type: 'cyan' },
                { text: '[AGENT-2] Memory leak analysis: 0 leaks, 712 tests passing (99.4%)', type: 'success' },
                { text: '[AGENT-3] SARIF report normalized. Zero-Trust verification signature signed.', type: 'magenta' },
                { text: '[CONSENSUS] 100% agreement reached: Multi-agent consensus validated.', type: 'success' }
            ],
            benchmark: [
                { text: '$ vllm benchmark --model Llama-3.2-11B --tensor-parallel 2', type: 'cmd' },
                { text: '[CUDA] CUDA 12.4 initialized on dual GPU cluster (H100 NVLink)', type: 'info' },
                { text: '[THROUGHPUT] Prefill: 1,480 tokens/sec | Decode: 94.2 tokens/sec', type: 'cyan' },
                { text: '[TTFT] Time to first token: 13.6ms | P99 latency: 19.8ms', type: 'amber' },
                { text: '[STATUS] Benchmark complete: Top 1% inference efficiency achieved.', type: 'success' }
            ]
        };

        function printLog(entry, onComplete) {
            const streamLine = document.getElementById('terminal-stream-line');
            const line = document.createElement('div');
            line.className = 'terminal-line';

            if (entry.type === 'cmd') {
                line.innerHTML = `<span class="t-prompt">$</span> <span class="t-cmd">${escapeHtml(entry.text.replace('$ ', ''))}</span>`;
            } else if (entry.type === 'success') {
                line.className += ' t-success';
                line.textContent = entry.text;
            } else if (entry.type === 'cyan') {
                line.className += ' t-cyan';
                line.textContent = entry.text;
            } else if (entry.type === 'amber') {
                line.className += ' t-amber';
                line.textContent = entry.text;
            } else if (entry.type === 'magenta') {
                line.className += ' t-magenta';
                line.textContent = entry.text;
            } else {
                line.className += ' t-info';
                line.textContent = entry.text;
            }

            if (streamLine && streamLine.parentNode === terminalBody) {
                terminalBody.insertBefore(line, streamLine);
            } else {
                terminalBody.appendChild(line);
            }

            terminalBody.scrollTop = terminalBody.scrollHeight;
            if (onComplete) setTimeout(onComplete, 160);
        }

        function escapeHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (isStreaming) return;
                const cmd = btn.getAttribute('data-cmd');

                if (cmd === 'clear') {
                    terminalBody.innerHTML = defaultLogs.join('');
                    return;
                }

                const script = commands[cmd];
                if (!script) return;

                isStreaming = true;
                btn.style.opacity = '0.5';

                let idx = 0;
                function step() {
                    if (idx < script.length) {
                        printLog(script[idx], () => {
                            idx++;
                            step();
                        });
                    } else {
                        isStreaming = false;
                        btn.style.opacity = '1';
                    }
                }
                step();
            });
        });

        // Launch Interactive Terminal CTA
        const launchBtn = document.getElementById('btn-interactive-term');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => {
                const consoleElem = document.querySelector('.quantum-code-console');
                if (consoleElem) {
                    consoleElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    consoleElem.style.transition = 'box-shadow 0.4s ease';
                    consoleElem.style.boxShadow = '0 0 50px rgba(56, 189, 248, 0.6)';
                    setTimeout(() => {
                        consoleElem.style.boxShadow = '';
                    }, 1500);
                }
                const firstAction = document.querySelector('.term-action-btn[data-cmd="samanvay"]');
                if (firstAction && !isStreaming) {
                    setTimeout(() => firstAction.click(), 400);
                }
            });
        }
    }

});

























































































































































































































































































































































































































































































































