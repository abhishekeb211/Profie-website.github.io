const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

console.log('--- FINDING HEADINGS & SECTIONS ---');
const matches = content.match(/<section[^>]*id=["']([^"']+)["'][^>]*>/g);
if (matches) {
  matches.forEach(m => console.log(m));
}

// Find publications or papers
const pubMatches = content.match(/<div[^>]*class=["'][^"']*publication[^"']*["'][^>]*>[\s\S]*?<\/div>/gi);
console.log('--- PUBLICATIONS FOUND ---', pubMatches ? pubMatches.length : 0);
if (pubMatches) {
  pubMatches.slice(0, 5).forEach((p, i) => console.log(`[Pub ${i}]:\n`, p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
}

// Find projects
const projMatches = content.match(/<div[^>]*class=["'][^"']*project-card[^"']*["'][^>]*>[\s\S]*?<\/div>/gi);
console.log('--- PROJECTS FOUND ---', projMatches ? projMatches.length : 0);
if (projMatches) {
  projMatches.slice(0, 10).forEach((p, i) => console.log(`[Project ${i}]:\n`, p.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
}
