const fs = require('fs');

// Vérifier image_b64.txt
const p = 'C:/Users/Messila/Downloads/lamed_code/images/image_b64.txt';
if (fs.existsSync(p)) {
  const s = fs.readFileSync(p, 'utf8');
  console.log('=== image_b64.txt ===');
  console.log('Len:', s.length);
  console.log('Start:', s.substring(0, 100));
  console.log('Data URI:', s.startsWith('data:image/'));
  
  // Vérifier les dimensions si c'est un JPEG
  if (s.startsWith('/9j/')) {
    const buf = Buffer.from(s, 'base64');
    console.log('Decoded bytes:', buf.length);
    for (let i = 0; i < buf.length - 10; i++) {
      if (buf[i] === 0xFF && (buf[i+1] === 0xC0 || buf[i+1] === 0xC2)) {
        const height = buf.readUInt16BE(i + 5);
        const width = buf.readUInt16BE(i + 7);
        console.log(`SOF found at offset ${i}: ${width}x${height}`);
        break;
      }
    }
  }
} else {
  console.log('MISSING image_b64.txt');
}

// Vérifier si l'image est utilisée dans le HTML
const html = fs.readFileSync('C:/Users/Messila/Downloads/lamed_code/index.html', 'utf8');
console.log('image_b64 used in HTML:', html.includes('image_b64'));