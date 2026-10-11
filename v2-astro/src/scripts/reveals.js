/**
 * reveals.js — Open-source lightweight reveal and interactive effects
 * Uses IntersectionObserver + CSS for 60fps hardware accelerated reveals
 * Respects prefers-reduced-motion
 */

export function initScrollReveals() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.removeAttribute('data-reveal');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Initializes count-up animations for statistics cards
 */
export function initCountUps() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNum = parseInt(el.getAttribute('data-count-target') || '0', 10);
        const suffix = el.getAttribute('data-count-suffix') || '';
        
        if (isReduced || isNaN(targetNum) || targetNum === 0) {
          el.textContent = `${targetNum}${suffix}`;
          observer.unobserve(el);
          return;
        }

        const duration = 1000;
        const startTime = performance.now();

        const updateCount = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(easeOut * targetNum);
          el.textContent = `${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = `${targetNum}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count-target]').forEach(el => observer.observe(el));
}

/**
 * Interactive Hacker Mode Console Canvas (Sparse Node Network)
 * Runs at 30fps when Hacker theme is active. Completely idle in Light mode.
 */
export function initAmbientCanvas(canvasId = 'ambient-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let animationFrameId;
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: Math.random() * 1.5 + 1
  }));

  let lastTime = 0;
  const fpsInterval = 1000 / 30; // 30fps cap

  function draw(now) {
    animationFrameId = requestAnimationFrame(draw);

    if (now - lastTime < fpsInterval) return;
    lastTime = now;

    // Only render when Hacker theme is active and tab is visible
    const isHacker = document.documentElement.dataset.theme === 'hacker';
    if (!isHacker || document.hidden) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw dot
      ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect near neighbors with faint circuit lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.strokeStyle = `rgba(34, 197, 94, ${0.18 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(draw);
}
