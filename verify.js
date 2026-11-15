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

function extraireChaines(bloc, champ) {
  const valeurs = [];
  const regex = new RegExp(`\\b${champ}\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 'g');
  for (const match of bloc.matchAll(regex)) {
    try {
      valeurs.push(JSON.parse(`"${match[1]}"`));
    } catch (erreur) {
      valeurs.push(match[1]);
    }
  }
  return valeurs;
}

// Chaque lien interne #article=, #livre= ou #etude= doit désigner un contenu
// de la bonne rubrique, sinon le visiteur atterrit sur le mauvais onglet.
const titresEtudes = extraireChaines(studiesMatch[1], 'titre');
const idsEtudes = extraireChaines(studiesMatch[1], 'id');
const titresArticles = extraireChaines(articlesMatch[1], 'title');
const titresLivres = extraireChaines(booksMatch[1], 'title');
const collections = {
  article: new Set(titresArticles),
  livre: new Set(titresLivres),
  etude: new Set([...idsEtudes, ...titresEtudes])
};

// Deux contenus de rubriques différentes ne doivent pas partager le même
// titre, sinon un lien #article=... pourrait ouvrir l'onglet d'une autre
// rubrique. Les identifiants d'études doivent aussi rester uniques.
function normaliserTitre(valeur) {
  return String(valeur)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const publications = [
  ...titresEtudes.map(titre => ({ rubrique: 'étude', titre })),
  ...titresArticles.map(titre => ({ rubrique: 'article', titre })),
  ...titresLivres.map(titre => ({ rubrique: 'livre', titre }))
];
const titresVus = new Map();
const doublons = [];
for (const publication of publications) {
  const cle = normaliserTitre(publication.titre);
  if (titresVus.has(cle)) {
    doublons.push(`${publication.rubrique} « ${publication.titre} » / ${titresVus.get(cle)}`);
  } else {
    titresVus.set(cle, publication.rubrique);
  }
}
const idsVus = new Set();
for (const id of idsEtudes) {
  if (idsVus.has(id)) doublons.push(`identifiant d'étude dupliqué « ${id} »`);
  idsVus.add(id);
}
if (doublons.length) {
  throw new Error(`Titres ou identifiants ambigus : ${doublons.join(' ; ')}`);
}

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const liensInvalides = [];
for (const attribut of html.matchAll(/href\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
  const lien = attribut[1] !== undefined ? attribut[1] : attribut[2];
  const match = lien.match(/^#(article|livre|etude)=(.+)$/);
  if (!match) continue;
  const prefixe = match[1].toLowerCase();
  let cible;
  try {
    cible = decodeURIComponent(match[2]);
  } catch (erreur) {
    cible = match[2];
  }
  if (!collections[prefixe].has(cible)) {
    liensInvalides.push(lien);
  }
}
if (liensInvalides.length) {
  throw new Error(`Liens internes mal orientés : ${[...new Set(liensInvalides)].join(', ')}`);
}

console.log(`OK — ${files.length} fichiers analysés, ${studies} étude(s), ${articles} article(s) et ${books} livre(s) trouvés.`);
