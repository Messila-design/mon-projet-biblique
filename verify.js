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
const booksMatch = app.match(/const\s+LIVRES\s*=\s*\[([\s\S]*?)\n\];/);

if (!studiesMatch || !articlesMatch || !booksMatch) {
  throw new Error('Les tableaux ETUDES_BIBLIQUES, ARTICLES ou LIVRES sont introuvables dans app.js.');
}

const studies = [...studiesMatch[1].matchAll(/\bid\s*:/g)].length;
const articles = [...articlesMatch[1].matchAll(/\btitle\s*:/g)].length;
const books = [...booksMatch[1].matchAll(/\btitle\s*:/g)].length;

if (studies === 0 || articles === 0 || books === 0) {
  throw new Error('Les données des études, des articles ou des livres sont vides.');
}

console.log(`OK — ${files.length} fichiers analysés, ${studies} étude(s), ${articles} article(s) et ${books} livre(s) trouvés.`);
