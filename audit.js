'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const codeFiles = ['app.js', 'articles-contenu.js', 'serve.js'];

for (const file of codeFiles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  new vm.Script(source, { filename: file });
}

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(match => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) {
  throw new Error(`IDs dupliqués : ${duplicateIds.join(', ')}`);
}

const localReferences = new Set();
for (const file of ['index.html', 'app.js', 'articles-contenu.js']) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of source.matchAll(/["']((?:images|articles|Textes|la croix)\/[^"'#?<>]+)/g)) {
    localReferences.add(match[1]);
  }
}

const missingFiles = [...localReferences].filter(reference =>
  !fs.existsSync(path.join(root, reference))
);
if (missingFiles.length) {
  throw new Error(`Ressources introuvables : ${missingFiles.join(', ')}`);
}

const conflictMarkers = [];
for (const file of ['index.html', ...codeFiles]) {
  const lines = fs.readFileSync(path.join(root, file), 'utf8').split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/^(?:<<<<<<< |>>>>>>> |=======$)/.test(line)) {
      conflictMarkers.push(`${file}:${index + 1}`);
    }
  });
}
if (conflictMarkers.length) {
  throw new Error(`Marqueurs de conflit Git : ${conflictMarkers.join(', ')}`);
}

console.log(
  `OK — audit terminé : ${codeFiles.length} fichiers JavaScript, ${ids.length} ID(s) et ${localReferences.size} ressource(s) locale(s) vérifiés.`
);
