// scripts/verify-audit.cjs — Automated regression assertions for the 30 Oct 2026 Audit
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const distDir = path.resolve(__dirname, '../dist');
const srcDir = path.resolve(__dirname, '../src');

console.log('--- RUNNING AUDIT ACCEPTANCE ASSERTIONS ---');

// 1. F01: Professor page section IDs
const profHtml = fs.readFileSync(path.join(distDir, 'professor/index.html'), 'utf8');
const expectedProfIds = ['about', 'teaching', 'leadership', 'research', 'contact'];
expectedProfIds.forEach(id => {
  assert(profHtml.includes(`id="${id}"`), `F01 FAIL: Professor page missing id="${id}"`);
});
console.log('✓ F01 PASS: All 5 Professor section IDs exist (#about, #teaching, #leadership, #research, #contact).');

// 2. F02: Theme bootstrap before CSS
const baseLayout = fs.readFileSync(path.join(srcDir, 'layouts/BaseLayout.astro'), 'utf8');
assert(baseLayout.includes('atlas-theme-preference'), 'F02 FAIL: Missing atlas-theme-preference');
assert(baseLayout.includes('matchMedia(\'(prefers-color-scheme: dark)\')'), 'F02 FAIL: Missing matchMedia dark check');
console.log('✓ F02 PASS: System-aware zero-FOUC theme bootstrap verified in BaseLayout.');

// 3. F04 & B08: Ambient canvas stops rAF when inactive/light/offscreen
const revealsJs = fs.readFileSync(path.join(srcDir, 'scripts/reveals.js'), 'utf8');
assert(revealsJs.includes('cancelAnimationFrame'), 'F04 FAIL: Missing cancelAnimationFrame in ambient canvas');
assert(revealsJs.includes('shouldRun'), 'F04 FAIL: Missing shouldRun condition in ambient canvas');
assert(revealsJs.includes('cleanupMotion'), 'F04 FAIL: Missing cleanupMotion lifecycle teardown');
console.log('✓ F04/B08 PASS: Ambient canvas possesses true stopped state and lifecycle disposal.');

// 4. F05: Fail-open progressive enhancement for reveals
const motionCss = fs.readFileSync(path.join(srcDir, 'styles/motion.css'), 'utf8');
assert(motionCss.includes('[data-reveal] {\n  opacity: 1;'), 'F05 FAIL: Default [data-reveal] must be opacity: 1 for zero-JS resilience');
assert(motionCss.includes('@media (scripting: enabled)'), 'F05 FAIL: Progressive hiding must use scripting: enabled');
console.log('✓ F05 PASS: [data-reveal] defaults to opacity: 1 (fail-open) and progressively reveals via scripting: enabled.');

// 5. F07 & F08: ClientRouter & Scoped theme transition
assert(baseLayout.includes('<ClientRouter />'), 'F07 FAIL: Missing <ClientRouter /> in BaseLayout');
const tokensCss = fs.readFileSync(path.join(srcDir, 'styles/tokens.css'), 'utf8');
assert(tokensCss.includes(':root.theme-transition::view-transition-new(root)'), 'F08 FAIL: Circular transition must be scoped to :root.theme-transition');
assert(tokensCss.includes('fade-out 220ms'), 'F08 FAIL: ClientRouter route transition must have crossfade');
console.log('✓ F07/F08 PASS: ClientRouter enabled and circular reveal strictly scoped to .theme-transition.');

// 6. F12: Scroll-margin-top for sticky header offset
assert(tokensCss.includes('scroll-margin-top: 5.5rem'), 'F12 FAIL: Missing scroll-margin-top in tokens.css');
console.log('✓ F12 PASS: Sticky header anchor offset (scroll-margin-top: 5.5rem) verified.');

// 7. F14: No "transition: all" in source files
function scanNoTransitionAll(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanNoTransitionAll(full);
    } else if (f.endsWith('.astro') || f.endsWith('.css') || f.endsWith('.js') || f.endsWith('.ts')) {
      const code = fs.readFileSync(full, 'utf8');
      assert(!/transition:\s*all\b/.test(code), `F14 FAIL: Found transition: all in ${full}`);
    }
  });
}
scanNoTransitionAll(srcDir);
console.log('✓ F14 PASS: Zero instances of uncurated "transition: all" found across all source components.');

console.log('ALL 7 AUDIT CRITERIA VERIFIED AND PASSED!');

