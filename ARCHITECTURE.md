# Technical Architecture

This document serves as the technical blueprint for the structural and visual capabilities of the Abhishek S. Raut portfolio website. It specifically outlines the engineering behind the **Dual-Persona Tabbed Interface**, the **Dynamic Theming System**, and the **Offline PWA Architecture**.

---

## 1. Dual-Persona System (AI Architect vs Professor)

The website uses a dynamic, zero-reload tab switching system to completely alter the layout context and visual aesthetic instantly without making additional network requests.

### 1.1 HTML Structure (`index.html`)
The `main` tag is subdivided into two distinct wrappers:
*   `<div id="ai-pane">`: Contains the industrial portfolio (Hero → Highlights → Expertise → Projects → Experience → Research → Certifications → Education → Competitions).
*   `<div id="prof-pane">`: Contains the academic identity with the same section flow: Hero (`#hero-prof`) → Highlights → Expertise (`#expertise-prof`) → Teaching & Resources (`#teaching-prof`). Teaching cards use `.project-card` with `.project-image-placeholder` and a direct "Join Classroom" CTA; they do not open the project modal.

Both panes share the same CSS classes (`.hero`, `.hero-inner`, `.expertise-grid`, `.project-card`, etc.) so layout and theming stay consistent when swapping content.

### 1.2 JavaScript Navigation (`script.js`)
The `initTabs()` function (and `switchToTab`) handle state navigation.
1.  **Event Listening**: Intercepts clicks on `.tab-btn` and keyboard (Arrow keys, Home, End) on the tablist.
2.  **Display Toggling**: Sets the inactive pane to `display: none` and the active pane to `display: block`; updates ARIA (`aria-selected`, `aria-hidden`, `tabindex`).
3.  **Nav and Footer Sync**: Header nav (`#nav-links a`) and footer nav (`.footer-nav a[data-ai]`) hrefs are set from `data-ai` or `data-prof` so both point to sections in the active pane. Footer tagline (`#footer-tagline`) is set to "Professor & Innovation Mentor" or "AI Engineer & Innovation Mentor".
4.  **Scroll to Top**: `window.scrollTo({ top: 0, behavior: 'smooth' })` runs on tab switch so the user lands at the top of the new pane.
5.  **Animation Reset**: `refreshAnimations()` re-triggers staggered `.fade-up` animations on the newly visible pane.

The project modal is bound only to `.project-card[data-full-desc]` (AI project cards); Professor teaching cards have no `data-full-desc` and therefore do not open the modal.

---

## 2. Dynamic Component Theming & CSS Variables

The website utilizes a highly configurable nested CSS variable ecosystem located in `css/variables.css` that responds to both the active *Theme* (Light/Dark/Hacker) and the active *Persona*.

### 2.1 Persona Variable Swapping
When the Professor pane is navigated to, the JS logic injects `data-persona="prof"` into the `body` tag and dynamically overdrives the `root` CSS tokens. 

```javascript
// Default AI Architect Context
--accent: #38BDF8; /* Blue */

// Professor Context Overlay
--prof-accent: #10B981; /* Premium Emerald */
root.style.setProperty('--accent', 'var(--prof-accent)');
```
This instantly recolors all glows, typography gradients, particle systems, and buttons on the screen without rewriting individual CSS classes.

### 2.2 Hacker Mode Matrix Toggling
Hacker Mode relies on terminal aesthetics. When combined with the Dual-Persona setup, it requires different variations of green:
*   **AI Architect (Hacker Mode)**: Uses Neon Green (`#00FF41`) simulating a raw terminal input.
*   **Professor (Hacker Mode)**: Drops down to deep Matrix Green (`#32CD32`), enforcing distinction between the two identities.

---

## 3. Progressive Web App (PWA) Systems

The repository acts as an offline-first PWA, heavily utilizing `manifest.json` and a specific Service Worker architecture.

### 3.1 Fetch and Cache Strategy (`sw.js`)
The application operates on a **Stale-While-Revalidate with Offline Fallback** strategy.
1.  **Cache First**: Requests intercept `sw.js` and serve matching static assets immediately if available in `abhishek-raut-v9` (or current `CACHE_NAME`) cache.
2.  **Network Resolution**: Requests are mirrored over the network. If successful, the cache is quietly overwritten with updated assets for the *next* reload.
3.  **Fallback**: If completely offline and the cache is missed (e.g. user clears cache), `sw.js` fails gracefully to `./offline.html`.

### 3.2 Cache Versioning
Service Worker caches (`CACHE_NAME`) must be manually bumped (e.g. `v9` -> `v10`) whenever core architectural, HTML, or large CSS shifts are deployed, triggering the `activate` event which dumps stale buckets. Pre-cached assets include `index.html`, `offline.html`, `css/*.css`, `script.js`, `manifest.json`, and hero images.
