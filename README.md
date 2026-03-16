# Abhishek S. Raut — AI Architect & Innovation Lead

**Live Deploy:** [https://abhishekeb211.github.io/Profie-website.github.io/](https://abhishekeb211.github.io/Profie-website.github.io/)
A premium, high-performance personal portfolio website built with a focus on **Agentic AI**, **Generative Transformers**, and **Innovation Mentorship**.

## 🚀 Key Features

### 🧩 Dual-Persona Architecture
- **Tabbed Interface**: Seamless, instantaneous switching between the **AI Architect** and **Professor** personas. Scroll resets to top on switch; header and footer nav stay in sync with the active persona.
- **AI Architect pane**: Hero → Highlights → Core Expertise → Featured Projects (with modal) → Experience → Research → Certifications → Education → Competitions.
- **Professor pane**: Hero → Highlights → Teaching Expertise → Teaching & Resources (Google Classroom cards). Same layout patterns as AI pane for consistency.
- **Dynamic Theming Ecosystem**:
  - *AI Architect*: Bright Blue gradients and glows.
  - *Professor*: Premium Emerald/Teal aesthetics; footer tagline switches to "Professor & Innovation Mentor".
  - *Hacker Mode*: Neon Green (AI) vs Matrix Green (Professor).

### 🧠 Profile & Expertise
- **Agentic AI & RAG**: Detailed highlights of ISRO Cross-Domain RAG, Skoda Automation, and Agentic CLI systems.
- **Quantum Security**: Performance tracking for Fujitsu Quantum Challenge and Quantum Passkey research.
- **PWA Integration**: Fully offline-capable Progressive Web App with service worker orchestration and manifest support.
- **Live GitHub Stats**: Dynamic rendering of open-source impact and tech stack proficiency.

### ✨ Premium Design & UX
- **Accessibility**: Skip link, focus-visible outlines, tab ARIA and keyboard (Arrow keys, Home, End), theme-aware modal/card/scroll. Project modal opens only for AI project cards (teaching cards use direct "Join Classroom" link).
- **Persona-aware footer**: Footer "About" and "Work" links and tagline update with the active tab.
- **3D Interactive Experience**: Specialized 3D tilt effects on all premium cards (Education, Awards, Research, Projects).
- **Glassmorphism & Neumorphism**: Curated backdrop-blur effects and subtle depth for a modern, high-end feel.
- **Fluid Animations**: Smooth mesh gradients, staggered reveal animations, and particle systems.
- **Responsive Mastery**: Tailored layouts for everything from ultra-wide monitors to mobile handhelds.

### 🛡️ Security & Privacy
- **Hardened Security**: Content Security Policy (CSP) implementation and link hardening (`rel="noopener"`).
- **ZeroTrust Focus**: Showcasing research in ZeroTrust architectures and PQC (Post-Quantum Cryptography) testing.

### 🎓 Academic & Mentorship
- **Coding Club Leadership**: Full integration of the PCCoE Coding Club vision, achievements (ICPC, SIH), and industrial partner marquee.
- **Educational Resources**: Integrated Google Classroom join portals for TOC, DE&VL, Data Exploration, and FSDL.
- **Competition Tracker**: A live roadmap of major technical festivals and global hackathons.

## 🛠️ Tech Stack
- **Core**: HTML5 (Semantic), CSS3 (Modern Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Design**: Google Fonts (Outfit, JetBrains Mono), Inline SVGs, CSS Variable Design System.
- **Tools**: Service Workers (PWA), GitHub Actions (CI/CD), Llama 3.2 (Content Optimization).

## 📂 Project Structure
- `index.html`: Unified entry point with integrated AI Architect & Mentorship flow.
- `css/variables.css`, `css/base.css`, `css/layout.css`, `css/components.css`: Design system with persona-specific visual tokens.
- `script.js`: Core interactivity (scrolling, modals, counters, 3D tilt, canvas particles).
- `manifest.json`: PWA configuration.
- `sw.js`: Service worker for caching and offline support.

## 🏅 Prime Achievements
- **Fujitsu Quantum Challenge 2026 Finalist**.
- **ICPC 2024 Preliminary Round Participant** (Team PurpleSector3).

## ⚡ Performance (PageSpeed / Lighthouse)

See [PERFORMANCE.md](PERFORMANCE.md) for the recommended order of work and PageSpeed-oriented improvements (LCP preload, hero image dimensions, deferred script, CLS reserves). After deploying, re-run [PageSpeed Insights](https://pagespeed.web.dev/) for Mobile and Desktop.

## 🔍 Local verification

Before pushing, run lint and validation:

```bash
npm ci
npm run verify
```

This runs HTML validation (`html-validate`), CSS linting (`stylelint`), JS linting (`eslint`), and image-reference checks (`scripts/check-assets.js`) across `index.html`, `offline.html`, `css/**/*.css`, `script.js`, and `sw.js`. The same command runs in CI before each deploy.

## 🚢 Deployment (GitHub Pages)

The site is deployed via **GitHub Actions** (see `.github/workflows/pages.yml`). No branch source is used; the workflow builds a deterministic `_site` artifact and deploys only website assets. Each run executes `npm run verify` before packaging the artifact.

### Verifying deployment

1. **Settings → Pages**: Source must be **GitHub Actions** (not "Deploy from a branch").
2. **Actions**: "Deploy GitHub Pages" runs on push to `main` and on `workflow_dispatch`. Ensure the latest run succeeded.
3. **Live checks**: Open the [live URL](https://abhishekeb211.github.io/Profie-website.github.io/), then:
   - Test header and footer nav (persona-aware), tab switch (AI Architect / Professor; scroll to top), theme toggle, Resume button, AI project card (modal), Professor teaching card (Join Classroom only), and back-to-top.
   - In DevTools → Network (disable cache), reload and confirm no 404s for `css/*.css`, `script.js`, `images/`, `manifest.json`.
   - In Application → Service Worker and Manifest, confirm registration and icons.
   - Open `https://abhishekeb211.github.io/Profie-website.github.io/sitemap.xml` and confirm the `<loc>` URL matches. If the live sitemap returns 500, the file in repo is valid; re-check after deploy or GitHub support.
   - Confirm `robots.txt` contains `Sitemap: https://abhishekeb211.github.io/Profie-website.github.io/sitemap.xml`.
   - If app shell content changes (`index.html`, `offline.html`, `script.js`, `css/*`, `manifest.json`, precached images), bump `CACHE_NAME` in `sw.js` so clients refresh stale caches.

## 📋 Future Improvements

- **Classroom links**: Add full Google Classroom join URLs for Data Exploration Lab (code `r4er6t5`) and FSDL Lab (code `avixrhy`) when available; see TODO comments in `index.html`.
- **PageSpeed**: Re-run [PageSpeed Insights](https://pagespeed.web.dev/) after deploy and address any new Lab suggestions (see [PERFORMANCE.md](PERFORMANCE.md)).
- **Content**: Keep resume PDF, structured data (JSON-LD), and sitemap in sync with role changes.

---
*Built with ❤️ by Prof. Abhishek S. Raut | AI Engineer & Innovation Mentor*

