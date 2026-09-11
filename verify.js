'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const files = ['app.js', 'articles-contenu.js'];

for (const file of files) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fichier introuvable : ${file}`);
  }
  new vm.Script(fs.readFileSync(filePath, 'utf8'), { filename: file });
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const studiesMatch = app.match(/const\s+ETUDES_BIBLIQUES\s*=\s*\[([\s\S]*?)\n\];/);
const articlesMatch = app.match(/const\s+ARTICLES\s*=\s*\[([\s\S]*?)\n\];/);

if (!studiesMatch || !articlesMatch) {
  throw new Error('Les tableaux ETUDES_BIBLIQUES ou ARTICLES sont introuvables dans app.js.');
}

const studies = [...studiesMatch[1].matchAll(/\bid\s*:/g)].length;
const articles = [...articlesMatch[1].matchAll(/\btitle\s*:/g)].length;

if (studies === 0 || articles === 0) {
  throw new Error('Les données des études ou des articles sont vides.');
}

console.log(`OK — ${files.length} fichiers analysés, ${studies} étude(s) et ${articles} article(s) trouvés.`);
