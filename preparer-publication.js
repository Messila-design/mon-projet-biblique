'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { main: genererPartages } = require('./generer-partages');

const RACINE = __dirname;
const DIST = path.join(RACINE, 'dist');

const FICHIERS = [
  'index.html',
  'app.js',
  'articles-contenu.js',
  'livres-contenu.js'
];

const DOSSIERS = [
  'images',
  'p',
  'articles',
  'Textes',
  'la croix',
  '3 - Livres'
];

function copierElement(relatif) {
  const source = path.join(RACINE, relatif);
  const destination = path.join(DIST, relatif);
  if (!fs.existsSync(source)) {
    throw new Error(`Ressource introuvable : ${relatif}`);
  }
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.cpSync(source, destination, { recursive: true });
  } else if (stat.isFile()) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  } else {
    throw new Error(`Ressource non prise en charge : ${relatif}`);
  }
}

async function main() {
  await genererPartages();

  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  for (const fichier of FICHIERS) copierElement(fichier);
  for (const dossier of DOSSIERS) copierElement(dossier);

  fs.writeFileSync(
    path.join(DIST, 'robots.txt'),
    'User-agent: *\nAllow: /\n',
    'utf8'
  );

  console.log(`OK — dossier dist/ prêt pour la publication (${FICHIERS.length} fichiers, ${DOSSIERS.length} dossiers).`);
}

if (require.main === module) {
  main().catch(erreur => {
    console.error('Impossible de préparer la publication :', erreur);
    process.exitCode = 1;
  });
}

module.exports = { main, DIST };
