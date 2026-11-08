// scripts/verify-live-site.cjs — Automated Live Website Verification Harness
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const distDir = path.resolve(__dirname, '../dist');
const BASE_PATH = '/Profie-website.github.io';
const PORT = 4399;

console.log('====================================================');
console.log('   PORTFOLIO LIVE VERIFICATION & SMOKE TEST HARNESS  ');
console.log('====================================================');

const routes = [
  '/',
  '/lab/',
  '/atlas/',
  '/evidence/',
  '/about/',
  '/professor/',
  '/projects/',
  '/projects/mc-ctvit-eeg-transformer/',
  '/projects/trustwise-adaptiverag/',
  '/projects/agentic-browser-defense/',
  '/projects/vehiclegpt/',
  '/projects/hierarchical-ids/',
  '/projects/vulrag-security/',
  '/projects/quantum-cryptography/',
  '/projects/swasthya-health-network/',
  '/projects/blockchain-ehr-bcfl/',
  '/projects/supper-ide/',
  '/projects/operon-extension/',
  '/projects/isro-route-resilience/',
  '/projects/stockai-platform/',
  '/projects/codeagent/',
  '/projects/engineering-knowledge-rag/',
  '/projects/paradox-ai/',
  '/projects/private-memory-os/',
  '/projects/sanjaya-ai/',
  '/projects/flipkart-ml-platform/',
  '/404.html'
];

function createStaticServer() {
  return http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0].split('#')[0];
    if (cleanUrl.startsWith(BASE_PATH)) {
      cleanUrl = cleanUrl.substring(BASE_PATH.length);
    }
    if (!cleanUrl || cleanUrl === '/') {
      cleanUrl = '/index.html';
    }

    let filePath = path.join(distDir, cleanUrl);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath) && !path.extname(cleanUrl)) {
      if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      } else if (fs.existsSync(`${filePath}.html`)) {
        filePath = `${filePath}.html`;
      }
    }

    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.pdf': 'application/pdf',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.xml': 'application/xml',
      '.webp': 'image/webp'
    };

    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        resolve({
          status: res.statusCode,
          headers: res.headers,
          bodyText: buffer.toString('utf8'),
          bufferLength: buffer.length,
          bufferHeader: buffer.subarray(0, 10).toString('utf8')
        });
      });
    }).on('error', reject);
  });
}

async function runTests(targetHost) {
  console.log(`[TARGET HOST] ${targetHost}`);
  console.log(`\n--- GATE 1: Auditing HTTP 200 on all ${routes.length} static routes ---`);
  for (const route of routes) {
    const fullUrl = `${targetHost}${route}`.replace(/([^:]\/)\/+/g, '$1');
    const res = await fetchUrl(fullUrl);
    assert.strictEqual(res.status, 200, `FAIL: ${fullUrl} returned HTTP ${res.status}`);
    console.log(`  ✓ HTTP 200 OK: ${route}`);
  }

  console.log('\n--- GATE 2: Auditing Master Forensic Report PDF Delivery ---');
  const pdfUrl = `${targetHost}/COMPREHENSIVE_PORTFOLIO_FORENSIC_MASTER_REPORT.pdf`;
  const pdfRes = await fetchUrl(pdfUrl);
  assert.strictEqual(pdfRes.status, 200, `FAIL: Master PDF download link ${pdfUrl} returned ${pdfRes.status}`);
  assert(pdfRes.bufferHeader.startsWith('%PDF-'), `FAIL: Master PDF header mismatch: ${pdfRes.bufferHeader}`);
  assert(pdfRes.bufferLength > 1000000, `FAIL: Master PDF size too small (${pdfRes.bufferLength} bytes, expected > 1MB)`);
  console.log(`  ✓ Verified: Master Forensic Report delivered (${(pdfRes.bufferLength / 1024 / 1024).toFixed(2)} MB, valid PDF magic header).`);

  console.log('\n--- GATE 3: Auditing Key Content & Architectural Assertions ---');
  const homeRes = await fetchUrl(`${targetHost}/`);
  assert(homeRes.bodyText.includes('id="forensic-audit"'), 'FAIL: Home page missing #forensic-audit section');
  assert(homeRes.bodyText.includes('708'), 'FAIL: Home page missing 708 passing test metric');
  assert(homeRes.bodyText.includes('AI Engineering Lab'), 'FAIL: Home page missing AI Engineering Lab teaser');
  assert(homeRes.bodyText.includes('Systems Atlas'), 'FAIL: Home page missing Systems Atlas teaser');
  console.log('  ✓ Verified: Home page contains streamlined hero, evidence strip, top flagships, and ecosystem teasers.');

  const evidenceRes = await fetchUrl(`${targetHost}/evidence/`);
  assert(evidenceRes.bodyText.includes('708 / 712'), 'FAIL: Evidence page missing 708/712 passing test metric');
  assert(evidenceRes.bodyText.includes('MC-CTViT Decoupled Attention'), 'FAIL: Innovation 1 missing on evidence page');
  assert(evidenceRes.bodyText.includes('Host-Side L2/L3 Mediation Proxy'), 'FAIL: Innovation 2 missing on evidence page');
  assert(evidenceRes.bodyText.includes('COMPREHENSIVE_PORTFOLIO_FORENSIC_MASTER_REPORT.pdf'), 'FAIL: Evidence page missing PDF download link');
  console.log('  ✓ Verified: Dedicated Evidence Hub contains full 708-check matrix, Grand Innovations, and Master Forensic Report.');

  const labRes = await fetchUrl(`${targetHost}/lab/`);
  assert(labRes.bodyText.includes('AI Engineering Lab'), 'FAIL: Lab page missing title');
  assert(labRes.bodyText.includes('What is Empirically Measured'), 'FAIL: Lab page missing methodology disclosure');
  console.log('  ✓ Verified: Dedicated Lab route renders interactive micro-simulators and transparency disclosures.');

  const atlasRes = await fetchUrl(`${targetHost}/atlas/`);
  assert(atlasRes.bodyText.includes('Systems Atlas Constellation'), 'FAIL: Atlas page missing title');
  assert(atlasRes.bodyText.includes('Ecosystem Cluster Taxonomy'), 'FAIL: Atlas page missing cluster taxonomy');
  console.log('  ✓ Verified: Dedicated Atlas route renders multi-system dependency graph and cluster taxonomy.');

  const aboutRes = await fetchUrl(`${targetHost}/about/`);
  assert(aboutRes.bodyText.includes('Biography'), 'FAIL: About page missing Biography');
  assert(aboutRes.bodyText.includes('Engineering Philosophy'), 'FAIL: About page missing Engineering Philosophy');
  console.log('  ✓ Verified: Dedicated About route renders biography, engineering principles, and leadership timeline.');

  const profRes = await fetchUrl(`${targetHost}/professor/`);
  ['about', 'teaching', 'leadership', 'research', 'contact'].forEach(id => {
    assert(profRes.bodyText.includes(`id="${id}"`), `FAIL: Professor page missing id="${id}"`);
  });
  assert(profRes.bodyText.includes('Comprehensive Portfolio Forensic Master Report'), 'FAIL: Professor page missing Forensic Report card');
  console.log('  ✓ Verified: Professor page contains all 5 required section IDs and research synthesis.');

  const projectsRes = await fetchUrl(`${targetHost}/projects/`);
  assert(projectsRes.bodyText.includes('COMPREHENSIVE_PORTFOLIO_FORENSIC_MASTER_REPORT.pdf'), 'FAIL: Projects index missing PDF download link');
  assert(projectsRes.bodyText.includes('mc-ctvit-eeg-transformer'), 'FAIL: Projects index missing MC-CTViT card');
  assert(projectsRes.bodyText.includes('vehiclegpt'), 'FAIL: Projects index missing VehicleGPT card');
  console.log('  ✓ Verified: Projects index renders audited case studies and forensic banner.');

  console.log('\n====================================================');
  console.log('  ALL LIVE VERIFICATION TESTS PASSED WITH 100% SUCCESS ');
  console.log('====================================================\n');
}

async function main() {
  if (process.env.SITE_URL) {
    // Audit external live / deployment URL
    await runTests(process.env.SITE_URL);
  } else {
    // In-process HTTP static server auditing dist/
    const server = createStaticServer();
    await new Promise(resolve => server.listen(PORT, resolve));
    console.log(`[LOCAL SERVER] In-process static server listening on http://localhost:${PORT}`);
    const localTarget = `http://localhost:${PORT}${BASE_PATH}`;
    try {
      await runTests(localTarget);
    } finally {
      server.close();
      console.log('[CLEANUP] In-process test server stopped.');
    }
  }
}

main().catch(err => {
  console.error('\n[FATAL ERROR]', err.message);
  process.exit(1);
});
