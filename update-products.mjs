import fs from "fs";

const batchPath = process.argv[2];
if (!batchPath) {
  console.log("Usage: node update-products.mjs <batch.json>");
  process.exit(1);
}

const batch = JSON.parse(fs.readFileSync(batchPath, "utf8"));
const produkty = JSON.parse(fs.readFileSync("produkty.json", "utf8"));
const postep = JSON.parse(fs.readFileSync("zdjęcia_nowe/postep.json", "utf8"));

let updatedCount = 0;
let skippedAlreadyFilled = 0;
let notFound = 0;
const updatedNames = new Set();

for (const entry of batch) {
  let found = false;
  for (const cat of produkty.kategorie) {
    const prod = cat.produkty.find((p) => p.nazwa === entry.nazwa);
    if (!prod) continue;
    found = true;

    if (prod.sklad !== "b.d." && entry.sklad && entry.sklad !== "b.d.") {
      skippedAlreadyFilled++;
      console.log(`  ○ pominięto (już wypełniony): ${entry.nazwa}`);
      break;
    }

    if (prod.sklad === "b.d." && entry.sklad && entry.sklad !== "b.d.") {
      prod.sklad = entry.sklad;
    }

    for (const key of ["E_kcal", "B", "T", "N", "W", "C", "Bl", "S"]) {
      if (
        prod.wartosci_odzywcze[key] === "b.d." &&
        entry.wartosci_odzywcze?.[key] &&
        entry.wartosci_odzywcze[key] !== "b.d."
      ) {
        prod.wartosci_odzywcze[key] = entry.wartosci_odzywcze[key];
      }
    }

    updatedCount++;
    updatedNames.add(entry.nazwa);
    console.log(`  ✓ ${entry.nazwa}`);
    break;
  }
  if (!found) {
    notFound++;
    console.log(`  ✗ nie znaleziono w produkty.json: ${entry.nazwa}`);
  }
}

for (const p of postep.produkty) {
  if (updatedNames.has(p.nazwa)) {
    p.uzupelniony = true;
  }
}

fs.writeFileSync("produkty.json", JSON.stringify(produkty, null, 2));
fs.writeFileSync("zdjęcia_nowe/postep.json", JSON.stringify(postep, null, 2));

console.log(`\nPodsumowanie: zaktualizowano ${updatedCount}, już wypełnione ${skippedAlreadyFilled}, nieznalezionych ${notFound}`);
