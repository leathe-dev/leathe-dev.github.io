const fs = require('fs');
const path = require('path');

const layout = fs.readFileSync('layout.html', 'utf-8');
const contentDir = path.join(__dirname, 'content');
const outputDir = __dirname;

fs.readdirSync(contentDir).forEach(file => {
  if (!file.endsWith('.html')) return;

  const pageContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const finalPage = layout.replace('{{content}}', pageContent);

  fs.writeFileSync(path.join(outputDir, file), finalPage);
  console.log(`Generated ${file}`);
});
