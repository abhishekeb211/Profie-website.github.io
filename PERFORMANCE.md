# Performance & PageSpeed Plan

This doc ties the [recommended order of work](README.md#-deployment-github-pages) to **PageSpeed Insights** / Lighthouse and lists applied and optional improvements.

---

## Recommended order (from plan)

1. **Fix PWA/offline** — Done: `offline.html` (no broken `style.css`), `sw.js` ASSETS (real CSS), image path `data%20code.png`.
2. **Align URLs** — Done: canonical, og, sitemap, README for project-page base.
3. **UI** — Done: focus-visible, skip link, tab ARIA + keyboard, theme-aware modal/card/scroll.
4. **Deploy check** — Done: workflow verified, steps in README.
5. **UX audit** — Done: footer nav and tagline persona-aware; scroll to top on tab switch; project modal only for AI cards (`.project-card[data-full-desc]`); Teaching section label "Resources"; dynamic copyright year.

---

## PageSpeed / Lighthouse improvements

[PageSpeed Insights](https://pagespeed.web.dev/) may show "No Data" for **CrUX** (real users) on low-traffic sites; the **Lab** (Lighthouse) still runs when you click *Analyze*. These changes target Lab metrics (LCP, CLS, TBT).

### Applied

- **LCP (Largest Contentful Paint)**  
  - Preload hero image: `<link rel="preload" as="image" href="images/me.webp" type="image/webp">`.  
  - Hero `<img>` has `fetchpriority="high"`, `width="400"` and `height="400"` to avoid layout shift and help prioritization.
- **CLS (Cumulative Layout Shift)**  
  - Hero: `.hero-image-container` uses `aspect-ratio: 1` and `.hero-main-img` has explicit dimensions + `object-fit: cover` so space is reserved before the image loads.
- **Parser-blocking script**  
  - `script.js` loaded with `defer` so HTML parsing is not blocked.
- **Images**  
  - Hero uses `<picture>` with WebP; project images use `loading="lazy"` (unchanged).

### Optional (if the report flags them)

- **Fonts**  
  - Already: `preconnect` for Google Fonts, `display=swap`.  
  - If "Ensure text remains visible during webfont load" appears, keep `display=swap` or consider `optional` and system font fallback in CSS.
- **Third-party (e.g. GitHub Readme Stats)**  
  - Load after LCP (e.g. only when section is near viewport) or use `loading="lazy"` on iframes/images.
- **CSS**  
  - Critical above-the-fold CSS could be inlined; for a single-page portfolio it’s often acceptable to keep external CSS and rely on preload/preconnect and small file size.
- **Cache**  
  - GitHub Pages sends cache headers; the service worker adds offline caching. No change needed unless you add new static assets and want to version them.

### Re-run the report

After deploying:

1. Open [PageSpeed Insights](https://pagespeed.web.dev/).
2. Enter: `https://abhishekeb211.github.io/Profie-website.github.io/`.
3. Run for **Mobile** and **Desktop** and fix any remaining “Diagnose performance issues” items.

If CrUX shows "No Data", rely on the Lab (Lighthouse) scores and suggestions.

---

## Future improvements

- Add full Google Classroom join URLs for Data Exploration Lab and FSDL Lab when available (see TODO comments in `index.html`).
- Re-run PageSpeed after each major release and address new Lab suggestions.
- Consider lazy-loading or reducing third-party payloads (e.g. GitHub Readme Stats) if Performance score drops.
