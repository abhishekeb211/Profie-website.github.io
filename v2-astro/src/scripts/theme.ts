/**
 * theme.ts — Theme and persona controller
 *
 * Ownership:
 *   - CSS owns hover/focus states
 *   - This module owns theme swap (View Transitions) + localStorage
 *   - View Transitions own the circular reveal animation (defined in tokens.css)
 */

type Theme = 'light' | 'hacker';

/** Update theme-color meta tag */
function updateMetaThemeColor(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'hacker' ? '#080D0B' : '#FFFFFF');
}

/** Apply theme to <html> and persist */
function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  updateMetaThemeColor(theme);
  try { localStorage.setItem('theme', theme); } catch { /* private mode */ }
}

/** Toggle theme with circular View Transition from the origin element */
export function setTheme(next: Theme, originEl?: Element) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !document.startViewTransition) {
    applyTheme(next);
    return;
  }

  // Set CSS custom properties for the clip-path origin point
  if (originEl) {
    const b = originEl.getBoundingClientRect();
    const s = document.documentElement.style;
    s.setProperty('--vt-x', `${b.left + b.width / 2}px`);
    s.setProperty('--vt-y', `${b.top + b.height / 2}px`);
  }

  document.startViewTransition(() => applyTheme(next)).finished.catch(() => {});
}

/** Toggle between light ↔ hacker */
export function toggleTheme(originEl?: Element) {
  const current = document.documentElement.dataset.theme as Theme;
  setTheme(current === 'hacker' ? 'light' : 'hacker', originEl);
}

/** Wire up the theme toggle button */
export function initTheme() {
  // Sync meta tag with current theme on load
  const current = (document.documentElement.dataset.theme ?? 'light') as Theme;
  updateMetaThemeColor(current);

  // Wire toggle button
  document.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest('[data-theme-toggle]');
    if (btn) {
      toggleTheme(btn);
      // Update aria-label
      const next = document.documentElement.dataset.theme as Theme;
      btn.setAttribute('aria-label', `Switch to ${next === 'hacker' ? 'Light' : 'Console'} appearance`);
    }
  });
}
