import sharp from "sharp";
import fs from "fs";
import path from "path";

const INPUT_DIR = "./zdjęcia_nowe";
const OUTPUT_DIR = "./zdjęcia_nowe/tyl-proc";

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const files = process.argv.slice(2);
if (!files.length) {
  console.log("Usage: node preprocess-tyl.mjs IMG_9756.JPG IMG_9758.JPG ...");
  process.exit(1);
}

for (const file of files) {
  const inPath = path.join(INPUT_DIR, file);
  const outPath = path.join(OUTPUT_DIR, file.replace(/\.jpe?g$/i, ".png"));
  if (!fs.existsSync(inPath)) {
    console.log(`  ✗ BRAK: ${file}`);
    continue;
  }
  await sharp(inPath)
    .rotate()
    .resize(2400, null, { withoutEnlargement: false })
    .sharpen({ sigma: 1.2 })
    .normalise()
    .png({ compressionLevel: 8 })
    .toFile(outPath);
  const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`  ✓ ${path.basename(outPath)} (${sizeKB} KB)`);
}
