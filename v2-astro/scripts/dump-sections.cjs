const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

function printSection(id) {
  const start = content.indexOf(`id="${id}"`);
  if (start === -1) return;
  const end = content.indexOf('</section>', start);
  console.log(`=== SECTION #${id} ===`);
  const text = content.slice(start, end).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  console.log(text.slice(0, 800));
}

printSection('projects');
printSection('research');
printSection('experience');
