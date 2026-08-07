const fs = require('fs');
const c = fs.readFileSync('C:\\Users\\Messila\\Downloads\\lamed_code\\index.html', 'utf8');
const idx = c.indexOf('la-foi-en-elohiym');
console.log('Found at:', idx);
if (idx >= 0) {
  const titleStart = c.indexOf('titre:', idx);
  const titleEnd = c.indexOf(',', titleStart);
  console.log(c.substring(titleStart, titleEnd + 1));
  
  const docStart = c.indexOf('const PDF_DOCUMENTS');
  const docEnd = c.indexOf('];', docStart + 500);
  const block = c.substring(docStart, docEnd);
  const matches = block.match(/id: "[^"]+"/g);
  console.log('Articles count:', matches ? matches.length : 0);
  if (matches) console.log(matches.join('\n'));
} else {
  console.log('ARTICLE NOT FOUND');
  const docStart = c.indexOf('const PDF_DOCUMENTS');
  console.log('PDF_DOCUMENTS at:', docStart);
  console.log(c.substring(docStart, docStart + 200));
}
