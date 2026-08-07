const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
let checks = 0;

function verifyJavaScript(source, filename) {
  new vm.Script(source, { filename });
  checks += 1;
}

for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
  const attributes = match[1];
  const inlineSource = match[2];
  const src = attributes.match(/\bsrc=["']([^"']+)["']/i);

  if (src) {
    const scriptPath = path.resolve(root, src[1]);
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Script introuvable : ${src[1]}`);
    }
    verifyJavaScript(fs.readFileSync(scriptPath, 'utf8'), src[1]);
  } else {
    verifyJavaScript(inlineSource, 'index.html (script inline)');
  }
}

const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(match => match[1]));
const duplicateIds = [...ids].filter(id => (html.match(new RegExp(`\\bid=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'gi')) || []).length > 1);
if (duplicateIds.length) {
  throw new Error(`IDs dupliqués : ${duplicateIds.join(', ')}`);
}

const usedIds = [...html.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(match => match[1]);
const missingIds = [...new Set(usedIds.filter(id => !ids.has(id)))];
if (missingIds.length) {
  throw new Error(`IDs utilisés mais absents : ${missingIds.join(', ')}`);
}

console.log(`OK — ${checks} script(s) analysé(s), ${ids.size} ID(s) vérifié(s).`);
