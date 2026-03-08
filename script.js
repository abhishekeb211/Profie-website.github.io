/**
 * ABHISHEK RAUT PORTFOLIO — INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- TAB SWITCH ENGINE ---
    const tabButtons = document.querySelectorAll('.tab-pill');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const body = document.body;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Update Buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `${targetTab}-pane`) {
                    pane.classList.add('active');
                }
            });

            // Update Body Class for CSS Variables
            body.classList.remove('ai-mode', 'prof-mode');
            body.classList.add(`${targetTab}-mode`);

            // Reset Scroll Position or Trigger Animations
            window.scrollTo({ top: 0, behavior: 'smooth' });
            refreshAnimations();
        });
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    function refreshAnimations() {
        const fadeElements = document.querySelectorAll('.fade-up');
        fadeElements.forEach(el => {
            el.classList.remove('visible'); // Reset for re-animation on tab switch
            observer.observe(el);
        });
    }

    refreshAnimations();

    // --- NAVBAR SCROLL EFFECT ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Tracking
        updateActiveLink();
    });

    // --- ACTIVE LINK TRACKING ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
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

    // --- SMOOTH SCROLL FOR NAV ---
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

});
