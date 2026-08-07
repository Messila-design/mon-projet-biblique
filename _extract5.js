const fs = require('fs');

// Vérifier les dimensions de l'image b64
const s = fs.readFileSync('C:/Users/Messila/Downloads/lamed_code/images/image_b64.txt', 'utf8');
const b64 = s.replace('data:image/jpeg;base64,', '');
const buf = Buffer.from(b64, 'base64');
console.log('Decoded bytes:', buf.length);

for (let i = 0; i < buf.length - 10; i++) {
  if (buf[i] === 0xFF && (buf[i+1] === 0xC0 || buf[i+1] === 0xC2)) {
    const height = buf.readUInt16BE(i + 5);
    const width = buf.readUInt16BE(i + 7);
    console.log(`SOF found at offset ${i}: ${width}x${height}`);
    break;
  }
}

// Vérifier si l'image est déjà dans le HTML
const html = fs.readFileSync('C:/Users/Messila/Downloads/lamed_code/index.html', 'utf8');
console.log('Image in HTML:', html.includes(b64.substring(0, 100)));