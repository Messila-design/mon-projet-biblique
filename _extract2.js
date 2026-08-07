const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

// Chercher le bouton "Lire en ligne" dans le contexte des études
const boutonIdx = html.indexOf("ouvrirLecteur('${e.id}')");
if (boutonIdx >= 0) {
  console.log('=== CONTEXTE BOUTON LIRE EN LIGNE (études) ===');
  console.log(html.substring(boutonIdx - 500, boutonIdx + 500));
} else {
  console.log('NOT FOUND bouton etude');
}

// Chercher où le "Télécharger" est géré pour études
const telIdx = html.indexOf("ICONES.download} Télécharger");
if (telIdx >= 0) {
  console.log('=== CONTEXTE BOUTON TELECHARGER ===');
  console.log(html.substring(telIdx - 800, telIdx + 300));
}