const fs = require('fs');
const path = 'c:/Users/Messila/Downloads/mise à jour récénte/index.html';
const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
// Afficher les lignes 3279 à 3369 (index 0-based)
for (let i = 3279; i <= 3369; i++) {
  if (lines[i] !== undefined) {
    console.log((i + 1) + ': ' + lines[i]);
  }
}