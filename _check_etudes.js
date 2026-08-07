const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

const arrStart = html.indexOf('const ETUDES_BIBLIQUES = ');
let i = arrStart + 'const ETUDES_BIBLIQUES = '.length;
let depth = 0;
let j = i;
for (; j < html.length; j++) {
  if (html[j] === '[') depth++;
  else if (html[j] === ']') {
    depth--;
    if (depth === 0) {
      j++;
      break;
    }
  }
}

try {
  const arr = eval(html.slice(i, j));
  console.log('Total études:', arr.length);
  console.log('=========================\n');
  for (const e of arr) {
    const img = e.image || '(AUCUNE IMAGE)';
    const imgPreview = img.length > 80 ? img.substring(0, 80) + '... [len=' + img.length + ']' : img;
    console.log(`ID: ${e.id}`);
    console.log(`Titre: ${e.titre}`);
    console.log(`Date: ${e.date}`);
    console.log(`Image: ${imgPreview}`);
    console.log(`Image type: ${e.image ? (e.image.startsWith('data:') ? 'DATA-URI' : 'CHEMIN') : 'AUCUNE'}`);
    console.log('---');
  }
} catch (e) {
  console.error('PARSE ERROR:', e.message);
  process.exit(1);
}