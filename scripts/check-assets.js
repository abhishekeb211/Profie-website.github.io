const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const filesToScan = ['index.html', 'script.js', 'sw.js'];
const assetRegex = /(?:\.\/)?(images\/[^"'`\r\n)]+)/g;

const missing = [];

for (const relativeFile of filesToScan) {
    const absoluteFile = path.join(root, relativeFile);
    if (!fs.existsSync(absoluteFile)) {
        missing.push(`[missing source file] ${relativeFile}`);
        continue;
    }

    const content = fs.readFileSync(absoluteFile, 'utf8');
    const matches = [...content.matchAll(assetRegex)];
    const uniqueAssets = new Set(matches.map((match) => decodeURIComponent(match[1])));

    for (const assetPath of uniqueAssets) {
        const absoluteAsset = path.join(root, assetPath);
        if (!fs.existsSync(absoluteAsset)) {
            missing.push(`${relativeFile} -> ${assetPath}`);
        }
    }
}

if (missing.length > 0) {
    console.error('Asset validation failed. Missing asset references:');
    for (const item of missing) {
        console.error(`- ${item}`);
    }
    process.exit(1);
}

console.log('Asset validation passed: all referenced local images exist.');
