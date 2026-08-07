const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

// Trouver toutes les références aux images de la croix
const lines = html.split('\n');
const refs = [];
lines.forEach((line, idx) => {
  if (line.includes('la croix') || line.includes('symbol-inline')) {
    refs.push({ line: idx + 1, text: line.trim().substring(0, 200) });
  }
});

console.log('=== Références aux images de la croix ===');
refs.forEach(r => console.log(`Ligne ${r.line}: ${r.text}`));

console.log('\n=== Vérification des fichiers images ===');
const imgFiles = [
  'images - la croix/image 1.jpg',
  'images - la croix/image 2.jpg',
  'images - la croix/image 3.jpg',
  'images - la croix/image 4.jpg',
  'images - la croix/image du projet.jpg'
];
imgFiles.forEach(img => {
  const full = __dirname + '/' + img;
  if (fs.existsSync(full)) {
    const size = fs.statSync(full).size;
    console.log('OK:', img, '-', size, 'bytes');
  } else {
    console.log('MANQUANT:', img);
  }
});

// Vérifier si le nom du dossier avec espaces est un problème
// Le dossier "images - la croix" existe-il ?
console.log('\n=== Contenu du dossier ===');
const dir = __dirname + '/images - la croix';
if (fs.existsSync(dir)) {
  fs.readdirSync(dir).forEach(f => console.log(' -', f));
} else {
  console.log('DOSSIER MANQUANT:', dir);
}