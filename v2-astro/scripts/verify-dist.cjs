const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const base = '/Profie-website.github.io';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getHtmlFiles(distDir);
console.log('Auditing ' + htmlFiles.length + ' HTML pages in dist...');

let errors = 0;
let checkedLinks = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hrefRegex = /href=["']([^"']+)["']/g;
  const srcRegex = /src=["']([^"']+)["']/g;
  
  let m;
  const allUrls = [];
  while ((m = hrefRegex.exec(content)) !== null) {
    allUrls.push(m[1]);
  }
  while ((m = srcRegex.exec(content)) !== null) {
    allUrls.push(m[1]);
  }

  allUrls.forEach(url => {
    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('mailto:') ||
      url.startsWith('#') ||
      url.startsWith('data:')
    ) {
      return; // external or anchor
    }

    checkedLinks++;
    let cleanUrl = url.split('#')[0].split('?')[0];
    cleanUrl = decodeURIComponent(cleanUrl);

    if (cleanUrl.startsWith(base)) {
      cleanUrl = cleanUrl.substring(base.length);
    }

    let targetPath = path.join(distDir, cleanUrl);
    if (!fs.existsSync(targetPath)) {
      if (cleanUrl.endsWith('/')) {
        targetPath = path.join(distDir, cleanUrl, 'index.html');
      } else if (!path.extname(cleanUrl)) {
        targetPath = path.join(distDir, cleanUrl, 'index.html');
      }
    }

    if (!fs.existsSync(targetPath)) {
      console.error('BROKEN LINK in ' + path.relative(distDir, file) + ': ' + url + ' -> ' + targetPath);
      errors++;
    }
  });
});

console.log('Checked ' + checkedLinks + ' internal URLs.');
if (errors === 0) {
  console.log('PASSED: 100% of internal links and assets exist in dist!');
} else {
  console.error('FAILED: Found ' + errors + ' broken links.');
  process.exit(1);
}
