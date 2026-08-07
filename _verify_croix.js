const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

console.log('has id:', html.includes('croix-symbole-paien-ou-volonte-divine'));
console.log('has titre:', html.includes('LA CROIX : SYMBOLE'));

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
  console.log('parse OK, count:', arr.length);
  console.log('first:', arr[0].id);
  console.log('date:', arr[0].date);
  console.log('titre:', arr[0].titre);
  console.log('contenu length:', arr[0].contenu.length);
  console.log('h3 count:', (arr[0].contenu.match(/<h3>/g) || []).length);
  console.log('h4 count:', (arr[0].contenu.match(/<h4>/g) || []).length);
  console.log('motsCles:', arr[0].motsCles);
} catch (e) {
  console.error('PARSE ERROR:', e.message);
  process.exit(1);
}
