'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {
  lirePublications,
  IMAGE_DEFAUT,
  SITE_URL,
  urlAbsolue,
  echapperHtml,
  normaliserTitre
} = require('./publications');

const root = __dirname;
const files = ['app.js', 'articles-contenu.js'];

for (const file of files) {
  const filePath = path.join(root, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Fichier introuvable : ${file}`);
  }
  new vm.Script(fs.readFileSync(filePath, 'utf8'), { filename: file });
}

const { etudes, articles, livres, toutes } = lirePublications(root);
if (!etudes.length || !articles.length || !livres.length) {
  throw new Error('Les données des études, des articles ou des livres sont vides.');
}

// Deux contenus de rubriques différentes ne doivent pas partager le même
// titre, sinon un lien #article=... pourrait ouvrir l'onglet d'une autre
// rubrique. Les identifiants d'études doivent aussi rester uniques.
const titresVus = new Map();
const doublons = [];
for (const publication of toutes) {
  const cle = normaliserTitre(publication.titre);
  if (titresVus.has(cle)) {
    doublons.push(`${publication.type} « ${publication.titre} » / ${titresVus.get(cle)}`);
  } else {
    titresVus.set(cle, publication.type);
  }
}
const idsVus = new Set();
for (const etude of etudes) {
  if (idsVus.has(etude.identifiant)) doublons.push(`identifiant d'étude dupliqué « ${etude.identifiant} »`);
  idsVus.add(etude.identifiant);
}
if (doublons.length) {
  throw new Error(`Titres ou identifiants ambigus : ${doublons.join(' ; ')}`);
}

const collections = {
  article: new Set(articles.map(publication => publication.titre)),
  livre: new Set(livres.map(publication => publication.titre)),
  etude: new Set(etudes.flatMap(publication => [publication.identifiant, publication.titre]))
};

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Chaque lien interne #article=, #livre= ou #etude= doit désigner un contenu
// de la bonne rubrique, sinon le visiteur atterrit sur le mauvais onglet.
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

if (/lamed\.code/i.test(html)) {
  throw new Error('index.html référence encore le domaine inexistant lamed.code.');
}
if (!/<meta http-equiv="Content-Security-Policy"/.test(html)) {
  throw new Error('index.html doit définir une politique de sécurité du contenu (CSP).');
}
if (!/<meta name="referrer" content="strict-origin-when-cross-origin">/.test(html)) {
  throw new Error('index.html doit définir une politique de référent stricte.');
}
const imageDefaut = urlAbsolue(IMAGE_DEFAUT);
if (!html.includes(`content="${imageDefaut}"`)) {
  throw new Error(`index.html doit référencer l'image de partage par défaut : ${imageDefaut}`);
}
if (!html.includes(`<link rel="canonical" href="${SITE_URL}/">`)) {
  throw new Error('index.html doit contenir la balise canonique du site.');
}

// Chaque publication doit avoir sa page de partage et son image optimisée,
// avec des balises Open Graph cohérentes avec le contenu.
const problemes = [];
for (const publication of toutes) {
  const cheminPage = path.join(root, publication.page);
  if (!fs.existsSync(cheminPage)) {
    problemes.push(`page manquante : ${publication.page}`);
    continue;
  }
  const page = fs.readFileSync(cheminPage, 'utf8');
  const imageRelative = `images/partages/${publication.slug}.jpg`;
  const imageAbsolue = urlAbsolue(imageRelative);
  const cheminImage = path.join(root, imageRelative.replace(/\//g, path.sep));
  if (!fs.existsSync(cheminImage)) {
    problemes.push(`image manquante : ${imageRelative}`);
  } else {
    const taille = fs.statSync(cheminImage).size;
    if (taille < 5 * 1024 || taille > 400 * 1024) {
      problemes.push(`image hors limites (${Math.round(taille / 1024)} Ko) : ${imageRelative}`);
    }
  }

  const attendus = [
    `<link rel="canonical" href="${echapperHtml(publication.urlCanonique)}">`,
    `<meta property="og:type" content="${publication.type === 'livre' ? 'book' : 'article'}">`,
    `<meta property="og:title" content="${echapperHtml(publication.titre)}">`,
    `<meta property="og:description" content="${echapperHtml(publication.description)}">`,
    `<meta property="og:image" content="${echapperHtml(imageAbsolue)}">`,
    `<meta property="og:url" content="${echapperHtml(publication.urlPage)}">`,
    `<meta name="twitter:image" content="${echapperHtml(imageAbsolue)}">`,
    `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; base-uri 'none'; form-action 'none'; script-src 'unsafe-inline'">`,
    `<meta name="referrer" content="no-referrer">`,
    `<script>window.location.replace(${JSON.stringify(publication.urlCanonique)});</script>`
  ];
  for (const attendu of attendus) {
    if (!page.includes(attendu)) {
      problemes.push(`balise absente dans ${publication.page} : ${attendu}`);
    }
  }
}
if (problemes.length) {
  throw new Error(`Pages de partage invalides (exécutez npm run partages) : ${problemes.join(' ; ')}`);
}

console.log(
  `OK — ${files.length} fichiers analysés, ${etudes.length} étude(s), ${articles.length} article(s) ` +
  `et ${livres.length} livre(s) trouvés, ${toutes.length} page(s) de partage vérifiée(s).`
);
