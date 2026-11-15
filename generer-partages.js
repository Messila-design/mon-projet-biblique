'use strict';

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { SITE_URL, IMAGE_DEFAUT, lirePublications, urlAbsolue, echapperHtml } = require('./publications');

const RACINE = __dirname;
const DOSSIER_PAGES = path.join(RACINE, 'p');
const DOSSIER_IMAGES = path.join(RACINE, 'images', 'partages');
const SOURCE_DEFAUT = path.join(RACINE, 'images', 'pub-1.jpg');
const LARGEUR = 1200;
const HAUTEUR = 630;
const POIDS_MAX = 300 * 1024;
const CSP_PARTAGE = "default-src 'none'; base-uri 'none'; form-action 'none'; script-src 'unsafe-inline'";

function estDansRacine(chemin) {
  const relatif = path.relative(RACINE, chemin);
  return relatif !== '' && relatif !== '..' && !relatif.startsWith('..' + path.sep) && !path.isAbsolute(relatif);
}

function resoudreImageSource(publication) {
  if (publication.image && !publication.imageDefaut && !/^data:/i.test(publication.image)) {
    const candidat = path.resolve(RACINE, publication.image.replace(/\\/g, '/'));
    if (estDansRacine(candidat) && fs.existsSync(candidat) && fs.statSync(candidat).isFile()) {
      return candidat;
    }
  }
  return SOURCE_DEFAUT;
}

async function genererImage(source, destination) {
  let qualite = 82;
  let tampon;
  do {
    tampon = await sharp(source)
      .rotate()
      .resize(LARGEUR, HAUTEUR, { fit: 'cover', position: 'attention' })
      .flatten({ background: '#101E3C' })
      .jpeg({ quality: qualite, mozjpeg: true })
      .toBuffer();
    if (tampon.length <= POIDS_MAX) break;
    qualite -= 6;
  } while (qualite >= 60);

  await fs.promises.writeFile(destination, tampon);
  return tampon.length;
}

function construirePage(publication, imageRelative) {
  const image = urlAbsolue(imageRelative);
  const titre = echapperHtml(publication.titre);
  const description = echapperHtml(publication.description);
  const urlPage = echapperHtml(publication.urlPage);
  const urlCanonique = echapperHtml(publication.urlCanonique);
  const typeOg = publication.type === 'livre' ? 'book' : 'article';
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="${CSP_PARTAGE}">
  <meta name="referrer" content="no-referrer">
  <title>${titre} — Laméd</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${urlCanonique}">
  <meta property="og:type" content="${typeOg}">
  <meta property="og:site_name" content="Laméd">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:title" content="${titre}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${echapperHtml(image)}">
  <meta property="og:image:secure_url" content="${echapperHtml(image)}">
  <meta property="og:image:width" content="${LARGEUR}">
  <meta property="og:image:height" content="${HAUTEUR}">
  <meta property="og:image:alt" content="${titre}">
  <meta property="og:url" content="${urlPage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${titre}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${echapperHtml(image)}">
  <meta name="twitter:image:alt" content="${titre}">
  <script>window.location.replace(${JSON.stringify(publication.urlCanonique)});</script>
</head>
<body>
  <p><a href="${urlCanonique}">Ouvrir « ${titre} » sur Laméd</a></p>
</body>
</html>
`;
}

async function main() {
  await fs.promises.mkdir(DOSSIER_PAGES, { recursive: true });
  await fs.promises.mkdir(DOSSIER_IMAGES, { recursive: true });

  const { toutes } = lirePublications(RACINE);
  if (!toutes.length) throw new Error('Aucune publication trouvée dans app.js.');

  await genererImage(SOURCE_DEFAUT, path.join(RACINE, IMAGE_DEFAUT.replace(/\//g, path.sep)));

  const pages = new Set();
  for (const publication of toutes) {
    if (pages.has(publication.page)) {
      throw new Error(`Page de partage en double : ${publication.page}`);
    }
    pages.add(publication.page);

    const source = resoudreImageSource(publication);
    const imageRelative = `images/partages/${publication.slug}.jpg`;
    const imageDestination = path.join(RACINE, imageRelative.replace(/\//g, path.sep));
    await genererImage(source, imageDestination);

    const contenu = construirePage(publication, imageRelative);
    await fs.promises.writeFile(path.join(RACINE, publication.page.replace(/\//g, path.sep)), contenu, 'utf8');
  }

  console.log(`OK — ${toutes.length} page(s) de partage et image(s) générées (${SITE_URL}).`);
}

if (require.main === module) {
  main().catch(erreur => {
    console.error('Impossible de générer les pages de partage :', erreur);
    process.exitCode = 1;
  });
}

module.exports = { main };
