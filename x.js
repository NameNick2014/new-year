const fs = require('fs');
const path = require('path');

// Знаходимо головний JS файл
const assetsDir = './assets';
const files = fs.readdirSync(assetsDir);
const mainJsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

if (!mainJsFile) {
  console.error('Не знайдено головний JS файл!');
  process.exit(1);
}

const jsPath = path.join(assetsDir, mainJsFile);
let jsContent = fs.readFileSync(jsPath, 'utf-8');

// Замінюємо history:ku("/") на history:ku("/2026/")
jsContent = jsContent.replace(/history:ku\("\/"\)/, 'history:ku("/2026/")');

// Також виправляємо всі інші абсолютні шляхи
jsContent = jsContent.replace(/"\/assets\//g, '"./assets/');
jsContent = jsContent.replace(/'\/assets\//g, "'./assets/");

fs.writeFileSync(jsPath, jsContent);

// Виправляємо HTML теж
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(/<base href="[^"]*"/, '<base href="/2026/"');
html = html.replace(/href="\/assets\//g, 'href="./assets/');
html = html.replace(/src="\/assets\//g, 'src="./assets/');

fs.writeFileSync('index.html', html);

console.log('✅ Виправлено base path для GitHub Pages!');
console.log('✅ Файл:', mainJsFile);