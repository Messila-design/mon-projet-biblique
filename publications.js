'use strict';

const fs = require('node:fs');
const path = require('node:path');
const acorn = require('acorn');

const SITE_URL = (process.env.SITE_URL || 'https://centre-lamed.onrender.com').replace(/\/+$/, '');
const IMAGE_DEFAUT = 'images/partages/defaut.jpg';
const DESCRIPTION_DEFAUT = 'Des études bibliques pour approfondir les Écritures : articles et publications.';

function valeurNoeud(noeud) {
  if (!noeud) return undefined;
  if (noeud.type === 'Literal') return noeud.value;
  if (noeud.type === 'TemplateLiteral' && noeud.expressions.length === 0) {
    return noeud.quasis.map(quasi => quasi.value.cooked || '').join('');
  }
  if (noeud.type === 'UnaryExpression' && noeud.operator === '-' && noeud.argument.type === 'Literal') {
    return -noeud.argument.value;
  }
  return undefined;
}

function objetVersDonnees(noeud) {
  const donnees = {};
  if (!noeud || noeud.type !== 'ObjectExpression') return donnees;
  for (const propriete of noeud.properties) {
    if (propriete.type !== 'Property' || propriete.computed) continue;
    const cle = propriete.key.type === 'Identifier'
      ? propriete.key.name
      : (propriete.key.type === 'Literal' ? String(propriete.key.value) : null);
    if (!cle) continue;
    const valeur = valeurNoeud(propriete.value);
    if (valeur !== undefined) donnees[cle] = valeur;
  }
  return donnees;
}

function trouverTableaux(source) {
  const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'script' });
  const tableaux = {};
  const noms = new Set(['ETUDES_BIBLIQUES', 'ARTICLES', 'LIVRES']);
  for (const noeud of ast.body) {
    if (noeud.type !== 'VariableDeclaration') continue;
    for (const declaration of noeud.declarations) {
      if (declaration.id.type !== 'Identifier') continue;
      if (!noms.has(declaration.id.name)) continue;
      if (!declaration.init || declaration.init.type !== 'ArrayExpression') continue;
      tableaux[declaration.id.name] = declaration.init.elements
        .filter(element => element && element.type === 'ObjectExpression')
        .map(objetVersDonnees);
    }
  }
  for (const nom of noms) {
    if (!tableaux[nom]) throw new Error(`Tableau ${nom} introuvable dans app.js.`);
  }
  return tableaux;
}

function slugifier(texte) {
  return String(texte || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function identifiantSur(valeur) {
  const brut = String(valeur || '');
  if (/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,120}$/.test(brut)) return brut;
  return slugifier(brut) || 'item';
}

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

function encoderTitre(titre) {
  return encodeURIComponent(titre).replace(/'/g, '%27');
}

function urlAbsolue(chemin) {
  return new URL(String(chemin || '').replace(/\\/g, '/'), SITE_URL + '/').href;
}

function echapperHtml(valeur) {
  return String(valeur || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function nettoyerDescription(valeur) {
  const texte = String(valeur || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!texte) return DESCRIPTION_DEFAUT;
  return texte.length > 200 ? texte.slice(0, 200).trim() + '…' : texte;
}

function normaliserPublication(type, brut) {
  const estEtude = type === 'etude';
  const titre = String((estEtude ? brut.titre : brut.title) || '').trim();
  const identifiant = estEtude ? identifiantSur(brut.id) : (brut.id || titre);
  const slug = slugifier(identifiant) || 'item';
  const hash = estEtude
    ? '#etude=' + encodeURIComponent(identifiant)
    : '#' + type + '=' + encoderTitre(titre);
  return {
    type,
    titre,
    identifiant,
    description: nettoyerDescription(estEtude ? brut.resume : brut.description),
    date: String(brut.date || ''),
    image: String(brut.image || '') || IMAGE_DEFAUT,
    imageDefaut: !brut.image,
    hash,
    page: `p/${type}-${slug}.html`,
    slug: `${type}-${slug}`,
    urlCanonique: SITE_URL + '/' + hash,
    urlPage: SITE_URL + '/' + `p/${type}-${slug}.html`
  };
}

function lirePublications(racine = __dirname) {
  const source = fs.readFileSync(path.join(racine, 'app.js'), 'utf8');
  const tableaux = trouverTableaux(source);
  const etudes = tableaux.ETUDES_BIBLIQUES.map(brut => normaliserPublication('etude', brut));
  const articles = tableaux.ARTICLES.map(brut => normaliserPublication('article', brut));
  const livres = tableaux.LIVRES.map(brut => normaliserPublication('livre', brut));
  return { etudes, articles, livres, toutes: [...etudes, ...articles, ...livres] };
}

module.exports = {
  SITE_URL,
  IMAGE_DEFAUT,
  DESCRIPTION_DEFAUT,
  lirePublications,
  slugifier,
  identifiantSur,
  normaliserTitre,
  urlAbsolue,
  echapperHtml
};
