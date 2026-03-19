const fs = require('fs');
const path = 'c:\\Users\\Abhis\\Profie-website.github.io\\css\\components.css';
try {
    let content = fs.readFileSync(path, 'utf8');
    const originalLength = content.length;
    content = content.replace(/\u2028|\u2029/g, '\n');
    fs.writeFileSync(path, content, 'utf8');
    console.log(`Successfully cleaned up ${path}. Original length: ${originalLength}, New length: ${content.length}`);
} catch (err) {
    console.error('Error cleaning file:', err);
    process.exit(1);
}
