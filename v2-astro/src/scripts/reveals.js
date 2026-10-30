/**
 * reveals.js — Hardware-accelerated reveal and interactive effects
 *
 * Designed for Astro + ClientRouter:
 * - Truly stops rAF loops in light, hidden, offscreen, and reduced-motion states
 * - Fully idempotent; sets up on astro:page-load and cleans up on astro:before-swap
 * - DPR-aware canvas with device tier capping
 */

let scrollObserver = null;
let countObserver = null;
let ambientCleanup = null;

export function initScrollReveals() {
  if (scrollObserver) {
    scrollObserver.disconnect();
    scrollObserver = null;
  }

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('[data-reveal]');
  if (elements.length === 0) return;

  if (isReduced) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollObserver?.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => scrollObserver.observe(el));
}

/**
 * Initializes count-up animations for statistics cards
 */
export function initCountUps() {
  if (countObserver) {
    countObserver.disconnect();
    countObserver = null;
  }

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('[data-count-target]');
  if (targets.length === 0) return;

  countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.getAttribute('data-count-target') || '0', 10);
        const suffix = el.getAttribute('data-count-suffix') || '';

        if (isReduced || isNaN(targetNum) || targetNum === 0) {
          el.textContent = `${targetNum}${suffix}`;
          countObserver?.unobserve(el);
          return;
        }

        const duration = 900;
        const startTime = performance.now();

        const updateCount = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * targetNum);
          el.textContent = `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${targetNum}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
        countObserver?.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  targets.forEach(el => countObserver.observe(el));
}

/**
 * Ambient Canvas (Constellation Overlay)
 * Truly idle in light mode, hidden tabs, reduced motion, and when scrolled offscreen.
 */
export function initAmbientCanvas(canvasId = 'ambient-canvas') {
  if (ambientCleanup) {
    ambientCleanup();
    ambientCleanup = null;
  }

  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animId = null;
  let isRunning = false;
  let isVisibleInViewport = false;
  let lastTime = 0;
  const fpsInterval = 1000 / 30; // 30fps cap

  // Clamp DPR to max 2.0 to conserve GPU memory
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cssWidth = canvas.offsetWidth || 300;
  let cssHeight = canvas.offsetHeight || 300;

  const updateSize = () => {
    cssWidth = canvas.offsetWidth || 300;
    cssHeight = canvas.offsetHeight || 300;
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  };
  updateSize();

  const resizeObserver = new ResizeObserver(() => updateSize());
  resizeObserver.observe(canvas);

  const particles = Array.from({ length: 24 }, () => ({
    x: Math.random() * cssWidth,
    y: Math.random() * cssHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 1.5 + 1
  }));

  const shouldRun = () => {
    const isDark = document.documentElement.dataset.theme === 'dark' ||
                   document.documentElement.dataset.theme === 'hacker';
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isDark && !isReduced && !document.hidden && isVisibleInViewport;
  };

  function step(now) {
    if (!isRunning) return;

    animId = requestAnimationFrame(step);

    if (now - lastTime < fpsInterval) return;
    lastTime = now;

    if (!shouldRun()) {
      stop();
      return;
    }

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > cssWidth) p.vx *= -1;
      if (p.y < 0 || p.y > cssHeight) p.vy *= -1;

      // Draw dot
      ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect near neighbors
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 100) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.16 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  function start() {
    if (isRunning) return;
    if (!shouldRun()) return;
    isRunning = true;
    lastTime = performance.now();
    animId = requestAnimationFrame(step);
  }

  function stop() {
    if (!isRunning) return;
    isRunning = false;
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    ctx.clearRect(0, 0, cssWidth, cssHeight);
  }

  function evaluate() {
    if (shouldRun()) start();
    else stop();
  }

  // Viewport intersection observer: only animate when canvas is in view
  const viewportObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisibleInViewport = entry.isIntersecting;
      evaluate();
    });
  }, { threshold: 0.05 });
  viewportObserver.observe(canvas);

  const handleVisibility = () => evaluate();
  const handleThemeChange = () => evaluate();
  document.addEventListener('visibilitychange', handleVisibility);
  document.documentElement.addEventListener('atlas:theme-applied', handleThemeChange);

  ambientCleanup = () => {
    stop();
    viewportObserver.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', handleVisibility);
    document.documentElement.removeEventListener('atlas:theme-applied', handleThemeChange);
  };
}

/**
 * Global lifecycle teardown for Astro ClientRouter transitions
 */
export function cleanupMotion() {
  if (scrollObserver) {
    scrollObserver.disconnect();
    scrollObserver = null;
  }
  if (countObserver) {
    countObserver.disconnect();
    countObserver = null;
  }
  if (ambientCleanup) {
    ambientCleanup();
    ambientCleanup = null;
  }
}
