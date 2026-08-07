const fs = require('fs');
const path = __dirname + '/index.html';
let html = fs.readFileSync(path, 'utf8');

// Remplacer TOUS les chemins d'images de la croix encodés (%20) par des espaces réels
const before = html;

// 1. Corriger le dossier encodé
html = html.replace(/images%20-%20la%20croix%2F/g, 'images - la croix/');
html = html.replace(/images%20-%20la%20croix\//g, 'images - la croix/');

// 2. Corriger les noms de fichiers encodés individuellement
const remplacementsFichiers = [
  ['image%20du%20projet.jpg', 'image du projet.jpg'],
  ['image%201.jpg', 'image 1.jpg'],
  ['image%202.jpg', 'image 2.jpg'],
  ['image%203.jpg', 'image 3.jpg'],
  ['image%204.jpg', 'image 4.jpg']
];
remplacementsFichiers.forEach(([src, dst]) => {
  html = html.split(src).join(dst);
});

const count = (before.match(/%20/g) || []).length;
const afterCount = (html.match(/%20/g) || []).length;

if (before === html) {
  console.log('Aucun changement nécessaire (déjà corrigé ou aucune occurrence).');
  console.log('Occurrences %20 restantes:', count);
} else {
  fs.writeFileSync(path, html, 'utf8');
  console.log('=== Correctif appliqué ===');
  console.log('Occurrences %20 avant :', count);
  console.log('Occurrences %20 après :', afterCount);
}

// Vérifier que le fichier est toujours valide
const arrStart = html.indexOf('const ETUDES_BIBLIQUES = ');
if (arrStart >= 0) {
  let i = arrStart + 'const ETUDES_BIBLIQUES = '.length;
  let depth = 0;
  let j = i;
  for (; j < html.length; j++) {
    if (html[j] === '[') depth++;
    else if (html[j] === ']') {
      depth--;
      if (depth === 0) { j++; break; }
    }
  }
  try {
    const arr = eval(html.slice(i, j));
    console.log('Vérification parsing: OK (' + arr.length + ' études)');
  } catch (e) {
    console.error('PARSE ERROR:', e.message);
    process.exit(1);
  }
}