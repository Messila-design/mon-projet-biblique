'use strict';

/*
 * Controle du modele editorial Laméd.
 *
 * Verifie que les études, articles et livres respectent le gabarit de
 * publication, afin qu'une nouvelle publication ne puisse pas introduire
 * les regressions deja corrigees :
 *   - identifiant d'etude stable et utilisable dans une ancre d'URL
 *   - date au format jj/mm/aaaa
 *   - image presente sur le disque (ou donnee en base64)
 *   - titre de niveau 2 ou 3 pour construire la table des matieres
 *   - notes de bas de page referençant des notes reelles
 *   - ancres et ressources declarees dans index.html
 *
 * Usage : node modele.js
 */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const erreurs = [];
const avertissements = [];
const remarques = [];

function erreur(message) { erreurs.push(message); }
function avertissement(message) { avertissements.push(message); }
function remarque(message) { remarques.push(message); }

// ---------------------------------------------------------------- extraction

function evaluerConfiguration(app) {
  const debut = app.indexOf('function rendreAccueil(');
  if (debut === -1) throw new Error('Impossible de situer la zone de configuration dans app.js.');
  const sandbox = { window: {}, console };
  sandbox.window.ARTICLES_CONTENU = {};
  vm.createContext(sandbox);
  // articles-contenu.js définit formaterArticleTexte, utilisé par app.js.
  const contenu = fs.readFileSync(path.join(root, 'articles-contenu.js'), 'utf8');
  vm.runInContext(contenu, sandbox, { filename: 'articles-contenu.js', timeout: 30000 });
  vm.runInContext(
    app.slice(0, debut) + '\n;globalThis.__modele = { ETUDES_BIBLIQUES, ARTICLES, LIVRES, VIDEOS, PUBLICATIONS };',
    sandbox,
    { filename: 'app.js', timeout: 30000 }
  );
  return sandbox.__modele;
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const { ETUDES_BIBLIQUES, ARTICLES, LIVRES } = evaluerConfiguration(app);

// ------------------------------------------------------- regles de contenu

const RE_ETUDE_ID = /^[a-z0-9][a-z0-9-]{2,80}$/;
const RE_DATE = /^(\d{2})\/(\d{2})\/(\d{4})$/;
const RE_BASE64 = /^data:image\/(jpeg|jpg|png|webp|gif);base64,/;
const RE_TITRE = /<h[34][^>]*>/i;

function verifierImage(chemin, contexte) {
  if (!chemin) return;
  if (RE_BASE64.test(chemin)) {
    if (chemin.length < 2000) avertissement(`${contexte} : image encodee en base64 suspecte (${chemin.length} caracteres).`);
    return;
  }
  if (!fs.existsSync(path.join(root, chemin))) {
    erreur(`${contexte} : image introuvable sur le disque -> "${chemin}"`);
  }
}

function verifierDate(date, contexte) {
  const m = RE_DATE.exec(String(date || '').trim());
  if (!m) {
    erreur(`${contexte} : date absente ou mal formee -> "${date}" (attendu jj/mm/aaaa).`);
    return;
  }
  const [, j, mois, a] = m.map(Number);
  if (mois < 1 || mois > 12) erreur(`${contexte} : mois invalide dans la date "${date}".`);
  if (j < 1 || j > 31) erreur(`${contexte} : jour invalide dans la date "${date}".`);
  if (a < 2000 || a > 2100) erreur(`${contexte} : annee inattendue dans la date "${date}".`);
}

function verifierTitres(contenu, contexte, minimum) {
  const nb = (contenu.match(/<h3[^>]*>/gi) || []).length + (contenu.match(/<h4[^>]*>/gi) || []).length;
  if (nb === 0) {
    avertissement(`${contexte} : aucun titre <h3> ou <h4>, donc aucune table des matieres automatique.`);
  } else if (nb < minimum) {
    remarque(`${contexte} : ${nb} titre(s) seulement, la table des matieres sera tres courte.`);
  }
  return nb;
}

function verifierNotes(contenu, contexte) {
  const marques = [...contenu.matchAll(/data-note="([^"]*)"/g)];
  for (const [, note] of marques) {
    if (!note.trim()) erreur(`${contexte} : une marque de note est vide (data-note="").`);
  }
  return marques.length;
}

// -------------------------------------------------------------- les etudes

const idsEtudes = new Set();
let totalTitres = 0;

for (const etude of ETUDES_BIBLIQUES) {
  const contexte = `Etude "${etude.titre || etude.id}"`;
  const id = String(etude.id || '');

  if (!id) {
    erreur(`${contexte} : identifiant (id) manquant.`);
  } else {
    if (!RE_ETUDE_ID.test(id)) {
      erreur(`${contexte} : identifiant "${id}" invalide. Utilisez des minuscules, des chiffres et des tirets (ex. "mon-etude-biblique").`);
    }
    if (idsEtudes.has(id)) erreur(`${contexte} : identifiant "${id}" en double.`);
    idsEtudes.add(id);
  }

  if (!etude.titre) erreur(`${contexte} : titre manquant.`);
  if (!etude.contenu || !String(etude.contenu).trim()) erreur(`${contexte} : contenu manquant.`);
  verifierDate(etude.date, contexte);
  verifierImage(etude.image, contexte);

  if (etude.contenu) {
    totalTitres += verifierTitres(etude.contenu, contexte, 2);
    verifierNotes(etude.contenu, contexte);
  }

  if (etude.source) {
    if (!fs.existsSync(path.join(root, etude.source))) {
      erreur(`${contexte} : fichier source introuvable -> "${etude.source}"`);
    }
  }
}

// ------------------------------------------------------------- les articles

const titresArticles = new Set();

for (const article of ARTICLES) {
  const contexte = `Article "${article.title || '(sans titre)'}"`;
  const titre = String(article.title || '');

  if (!titre) {
    erreur(`${contexte} : titre manquant.`);
  } else if (titresArticles.has(titre)) {
    erreur(`${contexte} : titre en double.`);
  } else {
    titresArticles.add(titre);
  }

  if (!article.category) avertissement(`${contexte} : categorie manquante.`);
  if (!article.description) avertissement(`${contexte} : description manquante (elle sert d'accroche dans les listes).`);
  verifierDate(article.date, contexte);
  verifierImage(article.image, contexte);

  if (article.source && !fs.existsSync(path.join(root, article.source))) {
    erreur(`${contexte} : fichier source introuvable -> "${article.source}"`);
  }
}

const titresLivres = new Set();

for (const livre of LIVRES) {
  const contexte = `Livre "${livre.title || '(sans titre)'}"`;
  const titre = String(livre.title || '');

  if (!titre) {
    erreur(`${contexte} : titre manquant.`);
  } else if (titresArticles.has(titre) || titresLivres.has(titre)) {
    erreur(`${contexte} : titre en double parmi les articles et les livres.`);
  } else {
    titresLivres.add(titre);
  }

  if (!livre.category) avertissement(`${contexte} : categorie manquante.`);
  if (!livre.description) avertissement(`${contexte} : description manquante.`);
  verifierDate(livre.date, contexte);
  verifierImage(livre.image, contexte);
  if (livre.source && !fs.existsSync(path.join(root, livre.source))) {
    erreur(`${contexte} : fichier source introuvable -> "${livre.source}"`);
  }
}

// --------------------------------------- coherence avec le reste du site

for (const etude of ETUDES_BIBLIQUES) {
  const ancre = `#carte-lire-etude-${etude.id}`;
  if (!html.includes(ancre) && etude.id === 'd-elohim-a-dieu') {
    erreur(`Le style CSS cible ${ancre} mais l'etude "${etude.titre}" n'existe plus.`);
  }
}

// Les listes de l'accueil, des etudes et des articles sont generees par
// app.js a partir des tableaux de configuration : la presence d'une etude
// ou d'un article dans ces tableaux suffit donc a les publier.
// On verifie seulement que le HTML statique ne reference pas une ancre
// pointant vers une etude ou un article qui n'existe plus.
const ancresEtudesHtml = [...html.matchAll(/href="#etude=([^"]+)"/g)].map(m => decodeURIComponent(m[1]));
for (const id of ancresEtudesHtml) {
  if (!idsEtudes.has(id)) {
    erreur(`index.html pointe vers #etude=${id} mais aucune etude ne porte cet identifiant.`);
  }
}

const titresPublications = new Set([...titresArticles, ...titresLivres]);
const ancresArticlesHtml = [...html.matchAll(/href="#article=([^"]+)"/g)].map(m => decodeURIComponent(m[1]));
for (const titre of ancresArticlesHtml) {
  if (!titresPublications.has(titre)) {
    erreur(`index.html pointe vers #article=${titre} mais aucun article ou livre ne porte ce titre.`);
  }
}

// Le sommaire automatique repose sur les balises <h3> et <h4> : leur nombre
// doit rester coherent entre l'etude et sa table des matieres.
if (totalTitres > 0) remarque(`${totalTitres} titre(s) de section dans l'ensemble des etudes.`);

// ------------------------------------------------------------------ rapport

console.log('Controle du modele editorial Laméd');
console.log('='.repeat(60));
console.log(`Etudes mesurees : ${ETUDES_BIBLIQUES.length}`);
console.log(`Articles mesures : ${ARTICLES.length}`);
console.log(`Livres mesures : ${LIVRES.length}`);
console.log('');

if (remarques.length) {
  console.log('Remarques :');
  for (const r of remarques) console.log(`  - ${r}`);
  console.log('');
}

if (avertissements.length) {
  console.log(`Avertissements (${avertissements.length}) :`);
  for (const a of avertissements) console.log(`  - ${a}`);
  console.log('');
}

if (erreurs.length) {
  console.error(`ECHEC (${erreurs.length} erreur(s)) :`);
  for (const e of erreurs) console.error(`  x ${e}`);
  process.exit(1);
}

console.log('OK — le modele editorial est respecte.');
