#!/usr/bin/env node
/**
 * scripts/generate-checksums.cjs
 * Computes cryptographically verified SHA-256 digests for all production build artifacts in dist/.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const distDir = path.resolve(__dirname, '../dist');
const outputFile = path.join(distDir, 'CHECKSUMS.sha256');

if (!fs.existsSync(distDir)) {
  console.error('[CHECKSUM ERROR] dist/ directory not found. Run astro build first.');
  process.exit(1);
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (file !== 'CHECKSUMS.sha256') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(distDir);
const entries = [];

for (const filePath of allFiles) {
  const fileBuffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
  const relativePath = path.relative(distDir, filePath).replace(/\\/g, '/');
  entries.push(`${hash}  ${relativePath}`);
}

entries.sort();
fs.writeFileSync(outputFile, entries.join('\n') + '\n', 'utf8');

console.log(`[CHECKSUM] Successfully generated SHA-256 digests for ${entries.length} distribution files.`);
console.log(`[CHECKSUM] Manifest saved to: ${path.relative(process.cwd(), outputFile)}`);

