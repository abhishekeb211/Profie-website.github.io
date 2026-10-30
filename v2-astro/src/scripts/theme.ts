/**
 * theme.ts — Atlas v2.2 Adaptive Light/Dark appearance controller
 *
 * Implements the single source of truth contract:
 *   explicit local override ('light' | 'dark') > OS/browser preference > 'light' compatibility fallback.
 *
 * Emits 'atlas:theme-applied' on document.documentElement
 * Listens to 'atlas:theme-selection' on window
 */

export const THEME_KEY = 'atlas-theme-preference';
export type Theme = 'light' | 'dark';
export type ThemePreference = 'system' | Theme;

const isValidTheme = (val: unknown): val is Theme => val === 'light' || val === 'dark';

/** Update theme-color meta tag */
export function updateMetaThemeColor(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#080D0B' : '#FFFFFF');
}

/** Get resolved active theme */
export function getActiveTheme(): Theme {
  return (document.documentElement.dataset.theme as Theme) || 'light';
}

/** Get stored preference */
export function getStoredPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (isValidTheme(saved)) return saved;
  } catch {
    /* storage may be unavailable */
  }
  return 'system';
}

/** Synchronize all button ARIA attributes and icons */
export function syncThemeControls() {
  const root = document.documentElement;
  const active = getActiveTheme();
  const preference = root.dataset.themePreference || 'system';
  const next: Theme = active === 'dark' ? 'light' : 'dark';

  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', `Switch to ${next} mode`);
    btn.setAttribute('title', `Switch to ${next} mode (currently ${active})`);
    const iconLight = btn.querySelector('.theme-icon-light');
    const iconDark = btn.querySelector('.theme-icon-dark');
    if (iconLight && iconDark) {
      (iconLight as HTMLElement).hidden = active === 'light';
      (iconDark as HTMLElement).hidden = active === 'dark';
    }
  });

  document.querySelectorAll<HTMLButtonElement>('[data-theme-auto]').forEach((btn) => {
    const isAuto = preference === 'system';
    btn.setAttribute('aria-pressed', String(isAuto));
    btn.classList.toggle('active', isAuto);
  });
}

/** Apply resolved theme to <html> and update controls synchronously */
export function applyTheme(theme: Theme, preference: ThemePreference) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.themePreference = preference;
  root.style.colorScheme = theme;
  updateMetaThemeColor(theme);
  syncThemeControls();

  root.dispatchEvent(
    new CustomEvent('atlas:theme-applied', {
      detail: { theme, preference },
    })
  );
}

let isThemeTransitioning = false;

/** Set theme with circular View Transition if supported */
export function setTheme(preference: ThemePreference, originEl?: Element | null) {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  const resolved: Theme = preference === 'system' ? (query.matches ? 'dark' : 'light') : preference;

  // Persist preference
  try {
    if (preference === 'system') {
      localStorage.removeItem(THEME_KEY);
    } else {
      localStorage.setItem(THEME_KEY, preference);
    }
  } catch {
    /* private browsing / quota exceeded */
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !document.startViewTransition) {
    applyTheme(resolved, preference);
    return;
  }

  if (isThemeTransitioning) {
    // If user clicks rapidly while transition runs, apply immediately without starting nested transition
    applyTheme(resolved, preference);
    return;
  }

  const root = document.documentElement;
  if (originEl) {
    const b = originEl.getBoundingClientRect();
    root.style.setProperty('--vt-x', `${b.left + b.width / 2}px`);
    root.style.setProperty('--vt-y', `${b.top + b.height / 2}px`);
  }

  isThemeTransitioning = true;
  root.classList.add('theme-transition');

  try {
    const vt = document.startViewTransition(() => {
      applyTheme(resolved, preference);
    });

    vt.finished
      .catch(() => {})
      .finally(() => {
        root.classList.remove('theme-transition');
        isThemeTransitioning = false;
      });
  } catch {
    root.classList.remove('theme-transition');
    isThemeTransitioning = false;
    applyTheme(resolved, preference);
  }
}

/** One-click toggle between light ↔ dark (pins an explicit preference) */
export function toggleTheme(originEl?: Element | null) {
  const current = getActiveTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  setTheme(next, originEl);
}

/** Reset to device/system theme */
export function resetToSystemTheme(originEl?: Element | null) {
  setTheme('system', originEl);
}

let isInitialized = false;

/** Initialize listeners and wire buttons (idempotent across Astro navigation) */
export function initTheme() {
  const root = document.documentElement;
  const query = window.matchMedia('(prefers-color-scheme: dark)');

  // Sync state on boot
  const currentTheme = getActiveTheme();
  updateMetaThemeColor(currentTheme);
  syncThemeControls();

  if (isInitialized) return;
  isInitialized = true;

  root.addEventListener('atlas:theme-applied', () => syncThemeControls());

  // Listen for external atlas:theme-selection events
  window.addEventListener('atlas:theme-selection', ((event: CustomEvent<ThemePreference>) => {
    const next = event.detail;
    if (next === 'system' || isValidTheme(next)) {
      setTheme(next);
    }
  }) as EventListener);

  // Wire quick toggle clicks with delegation
  document.addEventListener('click', (e) => {
    const toggleBtn = (e.target as Element).closest<HTMLButtonElement>('[data-theme-toggle]');
    if (toggleBtn) {
      toggleTheme(toggleBtn);
      return;
    }

    const autoBtn = (e.target as Element).closest<HTMLButtonElement>('[data-theme-auto]');
    if (autoBtn) {
      resetToSystemTheme(autoBtn);
    }
  });

  // OS dynamic preference changes when on 'system' mode
  query.addEventListener?.('change', () => {
    if (getStoredPreference() === 'system') {
      const resolved: Theme = query.matches ? 'dark' : 'light';
      applyTheme(resolved, 'system');
    }
  });

  // Cross-tab synchronization
  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_KEY) return;
    const val = event.newValue;
    const pref: ThemePreference = isValidTheme(val) ? val : 'system';
    const resolved: Theme = pref === 'system' ? (query.matches ? 'dark' : 'light') : pref;
    applyTheme(resolved, pref);
  });
}
