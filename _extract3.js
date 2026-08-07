const fs = require('fs');

// Vérifier le fichier encoded_clean.txt - c'est une image JPEG en base64
const p = 'C:/Users/Messila/Downloads/lamed_code/images/encoded_clean.txt';
const s = fs.readFileSync(p, 'utf8');

// Vérifier si c'est un JPEG valide
console.log('Starts with JPEG magic:', s.startsWith('/9j/'));
console.log('Length:', s.length);

// Vérifier les dimensions de l'image en décodant le header JPEG
// Le header JPEG SOF0/SOF2 contient les dimensions
const buf = Buffer.from(s, 'base64');
console.log('Decoded bytes:', buf.length);

// Chercher le marqueur SOF (Start of Frame)
for (let i = 0; i < buf.length - 10; i++) {
  if (buf[i] === 0xFF && (buf[i+1] === 0xC0 || buf[i+1] === 0xC2)) {
    const height = buf.readUInt16BE(i + 5);
    const width = buf.readUInt16BE(i + 7);
    console.log(`SOF found at offset ${i}: ${width}x${height}`);
    break;
  }
}

// Vérifier si l'image est déjà utilisée dans index.html
const html = fs.readFileSync('C:/Users/Messila/Downloads/lamed_code/index.html', 'utf8');
console.log('Image used in HTML:', html.includes(s.substring(0, 100)));