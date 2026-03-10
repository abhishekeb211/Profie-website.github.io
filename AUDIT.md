# Repository audit — standards classification

Audit date: 2026-03-11. Classifies each file/area for required upgrades per industry standards.

## Runtime files

| File | Classification | Notes |
|------|----------------|-------|
| index.html | Hardening | Semantic structure OK; add `rel="noopener"` to external links missing it; CSP already present; ensure all external links use noopener. |
| script.js | Hardening | Init order OK post-fix; add null checks where querySelector returns optional nodes; group init blocks; remove console.log in production path. |
| css/*.css | Hardening | Variables/base/layout/components OK; add reduced-motion media query where animations run; ensure focus-visible coverage. |
| sw.js | Hardening | Stale-while-revalidate OK; scope fetch to same-origin; add skipWaiting/claim for faster updates; document cache version bump policy. |
| manifest.json | Minor | start_url and id OK; icons reference single image for 192/512 (acceptable); ensure scope if needed. |
| offline.html | Minor | Add lang, skip-link, and meta theme-color for consistency. |
| robots.txt | OK | Sitemap URL correct. |
| sitemap.xml | Fix | Valid in repo; live 500 may be GitHub Pages; ensure served as application/xml and path correct. |

## Repo hygiene

| Item | Status | Action |
|------|--------|--------|
| .gitignore | Missing | Add (node_modules, .env, .DS_Store, logs, .cursor if desired). |
| .editorconfig | Missing | Add for indent/trim consistency. |
| .gitattributes | Missing | Add for line endings and export-ignore if needed. |

## CI / deploy

| Item | Classification | Notes |
|------|----------------|-------|
| .github/workflows/pages.yml | Hardening | Add pre-deploy verify step (lint/validate); keep concurrency; artifact path '.' is deterministic. |

## Documentation

| File | Status |
|------|--------|
| README.md, PERFORMANCE.md, ARCHITECTURE.md | OK; update with verify commands and cache policy. |

## Execution order

1. Quality gates (tooling + .editorconfig, .gitattributes, .gitignore).
2. HTML/JS/CSS hardening (noopener, null checks, SW, offline.html, reduced-motion).
3. Cache hardening (SW docs, version policy, scope).
4. Sitemap/SEO (content-type, path; document 500 follow-up).
5. CI (verify step in workflow).
6. Docs (README/PERFORMANCE with verify and cache policy).
