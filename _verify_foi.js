const fs = require('fs');
const c = fs.readFileSync(__dirname + '/index.html', 'utf8');

const start = c.indexOf('id: "la-foi-en-elohiym"');
if (start < 0) {
  console.error('FAIL: id not found');
  process.exit(1);
}

const contenuStart = c.indexOf('contenuHtml: `', start) + 'contenuHtml: `'.length;
const end = c.indexOf('`\n  },\n  {\n    id: "les-traditions"', contenuStart);
if (end < 0) {
  console.error('FAIL: end not found');
  process.exit(1);
}

const body = c.slice(contenuStart, end);
console.log('contenu length:', body.length);
console.log('h3:', (body.match(/<h3>/g) || []).length);
console.log('h4:', (body.match(/<h4>/g) || []).length);
console.log('blockquote:', (body.match(/<blockquote>/g) || []).length);
console.log('notes:', (body.match(/note-marque/g) || []).length);
console.log('Doc ref:', body.includes('Doc/001/01-2'));
console.log('author:', body.includes('Mvé Mezui Me Mvé Messila'));
console.log('sample title chars:', c.slice(start, start + 120));

// Extract and try to parse PDF_DOCUMENTS array portion roughly
const pdfStart = c.indexOf('const PDF_DOCUMENTS = [');
const pdfEnd = c.indexOf('];', c.indexOf('id: "secret-elevation"') > 0 ? c.indexOf('id: "secret-elevation"') : pdfStart + 100);
// Better: find the script and eval just the const assignment
const scriptMatch = c.match(/const PDF_DOCUMENTS = \[[\s\S]*?\n\];/);
if (!scriptMatch) {
  console.error('FAIL: PDF_DOCUMENTS block not found');
  process.exit(1);
}
try {
  // eslint-disable-next-line no-new-func
  const docs = new Function(scriptMatch[0] + '\nreturn PDF_DOCUMENTS;')();
  const foi = docs.find(d => d.id === 'la-foi-en-elohiym');
  if (!foi) {
    console.error('FAIL: article not in array');
    process.exit(1);
  }
  console.log('Parsed OK. titre:', foi.titre);
  console.log('contenuHtml length:', foi.contenuHtml.length);
  console.log('categorie:', foi.categorie);
  console.log('SUCCESS');
} catch (e) {
  console.error('PARSE ERROR:', e.message);
  process.exit(1);
}
