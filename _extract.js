const fs = require('fs');

// Vérifier les fichiers d'images encodées
const p1 = 'C:/Users/Messila/Downloads/lamed_code/images/encoded_clean.txt';
const p2 = 'C:/Users/Messila/Downloads/lamed_code/images/encoded.txt';

for (const p of [p1, p2]) {
  if (fs.existsSync(p)) {
    const s = fs.readFileSync(p, 'utf8');
    console.log(`=== ${p} ===`);
    console.log('Len:', s.length);
    console.log('Start:', s.substring(0, 80));
    console.log('Data URI:', s.startsWith('data:image/'));
    console.log('');
  } else {
    console.log('MISSING:', p);
  }
}

// Vérifier les autres images
const imgs = ['images/grand-rouleau-isaie-great-isaiah-scroll.jpg', 'images/mur-occidental-pexels-8446694.jpg', 'images/rouleau-isaie-panoramique-alex-gutman.jpg', 'images/torah-rcascoh-israel-5191727_1920.jpg', 'images/yves-moret-wCGdRGUyZ1w-unsplash.jpg', 'images/cocoparisienne-mountaineer-2100050_1920.jpg'];
for (const img of imgs) {
  const full = 'C:/Users/Messila/Downloads/lamed_code/' + img;
  if (fs.existsSync(full)) {
    const size = fs.statSync(full).size;
    console.log(img, '-', size, 'bytes');
  } else {
    console.log('MISSING:', img);
  }
}
