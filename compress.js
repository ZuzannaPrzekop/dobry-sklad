'use strict';

const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const ZDJECIA = path.join(__dirname, 'zdjecia');
const WEB     = path.join(__dirname, 'zdjecia-web');

if (!fs.existsSync(WEB)) fs.mkdirSync(WEB);

async function run() {
  const files = fs.readdirSync(ZDJECIA)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f) && !f.includes('tył') && !f.includes('tabela'));

  if (!files.length) {
    console.log('Brak zdjęć do kompresji.');
    return;
  }

  console.log(`Kompresuję ${files.length} zdjęć...\n`);

  for (const file of files) {
    const inPath  = path.join(ZDJECIA, file);
    const outPath = path.join(WEB, file);

    await sharp(inPath)
      .resize(800, 900, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toFile(outPath);

    const inKB  = Math.round(fs.statSync(inPath).size  / 1024);
    const outKB = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`✓ ${file}`);
    console.log(`  ${inKB} KB → ${outKB} KB (−${Math.round((1 - outKB / inKB) * 100)}%)\n`);
  }

  console.log(`Gotowe! Skompresowane zdjęcia zapisane w zdjecia-web/`);
}

run().catch(err => { console.error('Błąd:', err.message); process.exit(1); });
