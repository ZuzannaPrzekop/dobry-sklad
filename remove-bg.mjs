import sharp from "sharp";
import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";
import path from "path";

const INPUT_DIR = "./zdjęcia_nowe";
const OUTPUT_DIR = "./zdjecia-web";

const FRONTS = {
  "Mazury Fish Szczupak w oliwie z oliwek": "IMG_9734.JPG",
  "El Raño Małże w zalewie naturalnej": "IMG_9736.JPG",
  "Coargal Filety Anchois w oleju z oliwek": "IMG_9738.JPG",
  "Mari de Sud Filety Anchois": "IMG_9740.JPG",
  "Nazarena Filety z Makreli w oliwie": "IMG_9742.JPG",
  "Nazarena Tuńczyk w wodzie": "IMG_9744.JPG",
  "Nazarena Sardynki w sosie pomidorowym": "IMG_9747.JPG",
  "Tenorio Filety tuńczyka ao natural": "IMG_9749.JPG",
  "Emperatriz Tuńczyk Biały w oliwie z oliwek": "IMG_9751.JPG",
  "Mutti Sos z Papryką Chili": "IMG_9755.JPG",
  "Mutti Sos z Bazylią": "IMG_9757.JPG",
  "Mutti Sos z Parmigiano Reggiano": "IMG_9759.JPG",
  "Mutti Sos Bolognese": "IMG_9761.JPG",
  "Maple Joe Syrop Klonowy Amber Rich": "IMG_9763.JPG",
  "Dole Tropical Gold Pineapple Chunks": "IMG_9767.JPG",
  "Dole Tropical Gold Pineapple Slices": "IMG_9770.JPG",
  "Auchan Musli Owocowe Polskie Owoce": "IMG_9771.JPG",
  "Vivi Musli tropikalne": "IMG_9773.JPG",
  "One Day More Muesli Fruit": "IMG_9775.JPG",
  "One Day More Oatmeal Apple and Cinnamon": "IMG_9777.JPG",
  "Auchan Wafle Ryżowe Naturalne białe": "IMG_9779.JPG",
  "Auchan Wafle Ryżowe Naturalne brązowe": "IMG_9781.JPG",
  "Sante Extra Cienkie Wafle Ryżowe": "IMG_9783.JPG",
  "Sonko Wafle Ryżowe Naturalne": "IMG_9785.JPG",
  "EuroWafki Waflitki Kukurydziane": "IMG_9787.JPG",
  "Głodny Wilk Owocowe Puzzle Truskawka": "IMG_9795.JPG",
  "Irenki OatŁanki Ciastka z Żurawiną": "IMG_9797.JPG",
  "Irenki OatŁanki Ciastka z Czekoladą": "IMG_9799.JPG",
  "Sante Fit Ciasteczka Zbożowe z Jagodą": "IMG_9801.JPG",
  "Sante Fit Ciasteczka Zbożowe z Morelą": "IMG_9803.JPG",
  "Kopernik Pierniki Toruńskie Śliwka": "IMG_9805.JPG",
  "Kopernik Serca Piernikowe z Czekoladą i Miodem": "IMG_9807.JPG",
  "Kopernik Torcik Piernikowy limonka": "IMG_9809.JPG",
  "Śledzie od Serca Filety Norweskie z pieprzem": "IMG_9811.JPG",
  "Mirko Śledź z Żurawiną": "IMG_9813.JPG",
  "Auchan Filet z Pstrąga wędzony naturalny": "IMG_9815.JPG",
  "Auchan Filet z Pstrąga z Pieprzem wędzony": "IMG_9817.JPG",
  "Suempol Łosoś Atlantycki wędzony na zimno": "IMG_9819.JPG",
  "Mowi Signature Łosoś wędzony na gorąco": "IMG_9821.JPG",
  "Connoisseur Łosoś wędzony na gorąco": "IMG_9823.JPG",
  "Eat Real Veggie Straws": "IMG_9825.JPG",
  "Eat Real Quinoa Chips Sour Cream and Chive": "IMG_9827.JPG",
  "Biosaurus Chrupki Kukurydziane Ketchup": "IMG_9829.JPG",
  "Biosaurus Chrupki Kukurydziane Sea Salt": "IMG_9831.JPG",
  "Gullón Zero Sugar Free Short Bread": "IMG_9833.JPG",
  "Dobra Kaloria Mini Batoniki Odporność Żurawina": "IMG_9836.JPG",
  "Sens Cricket Protein Bar Dark Chocolate and Sour Cherry": "IMG_9838.JPG",
  "Dobra Kaloria Chrupiący Orzech": "IMG_9840.JPG",
  "Dobra Kaloria Nerkowce Kokos": "IMG_9842.JPG",
  "Dobra Kaloria Mini Batoniki Dla Serca Wiśnia": "IMG_9844.JPG",
  "Sens Pea Cricket Protein Chips Poppy Seeds and Sea Salt": "IMG_9846.JPG",
  "Zawiera Błonnik Junior Pałeczki Wielozbożowe": "IMG_9848.JPG",
  "Box Vital Ciasteczka Marchewkowe": "IMG_9852.JPG",
  "Cere Brownie Style Protein Organic Bar": "IMG_9854.JPG",
  "Foods by Ann Energy Choco Bar Śliwka Czarna Porzeczka": "IMG_9856.JPG",
  "Dobra Kaloria Proteina Krem Orzechowy Sól": "IMG_9858.JPG",
  "Dobra Kaloria Proteina Mini Batoniki karmel": "IMG_9860.JPG",
  "Be Keto Keto Chips Swiss Cheese French Onion": "IMG_9862.JPG",
  "Owocal Bio Charsznickie Ogórki Kiszone": "IMG_9864.JPG",
  "Piekarnia Lidla Chleb Złocisty Pszenno-Żytni": "IMG_9913.JPG",
  "Tastino Chrupkie Pieczywo Żytnie z Sezamem": "IMG_9915.JPG",
  "Tastino Chrupkie Pieczywo Żytnie": "IMG_9918.JPG",
  "Piekarnia Lidla Chleb Żytni z Ziarnami Żyta": "IMG_9920.JPG",
  "Piekarnia Lidla Burger z Nasionami Sezamu": "IMG_9922.JPG",
  "Sondey Pop Corn Snack Pizza": "IMG_9925.JPG",
  "Piekarnia Lidla Hot Dog amerykański": "IMG_9927.JPG",
  "Piekarnia Lidla Pinsa Pełnoziarnista": "IMG_9930.JPG",
  "Combino Sos Pomidorowy Arrabbiata": "IMG_9932.JPG",
  "Combino Sos Pomidorowy Basilico": "IMG_9935.JPG",
  "Alesto RAW Kokos Kakao": "IMG_9938.JPG",
  "Deluxe Burrata di Bufala": "IMG_9941.JPG",
  "Milbona Free From Lactose Burrata": "IMG_9944.JPG",
  "Milbona Free From Lactose Mascarpone": "IMG_9947.JPG",
  "Lublanka Twaróg z Bychawy tłusty": "IMG_9949.JPG",
  "Słońce WOW Smoothie Keen for Green": "IMG_9952.JPG",
  "Solevita Smoothie Strawberry and Friends": "IMG_9954.JPG",
  "Solevita Smoothie Pomarańcza Mango Mandarynka": "IMG_9956.JPG",
  "Cymes Tłocznia Sok Burak Jabłko": "IMG_9959.JPG",
  "Cymes Tłocznia Sok Marchewka Pomarańcza Jabłko": "IMG_9961.JPG",
  "Solevita Sok 100% Pomarańcza Kiwi": "IMG_9963.JPG",
  "Vemondo Tofu": "IMG_9966.JPG",
  "Well Well Pasta Falafelowa": "IMG_9968.JPG",
  "Vemondo Gyros Roślinny": "IMG_9970.JPG",
  "Seamor Halibut wędzony na gorąco": "IMG_9972.JPG",
  "Seamor Trewal wędzony na gorąco": "IMG_9975.JPG",
  "Seamor Sieja Kanadyjska wędzona na gorąco": "IMG_9977.JPG",
  "Chef Select Pierogi z Mięsem": "IMG_9979.JPG",
  "Chef Select Pierogi Ruskie": "IMG_9981.JPG",
  "Chef Select Tortelloni z Pomidorami i Mozzarellą": "IMG_9983.JPG",
  "Pikok Pure Szynka Wieprzowa": "IMG_9986.JPG",
  "Italiamo Prosciutto di Parma DOP": "IMG_9988.JPG",
  "Cambozola": "IMG_9990.JPG",
  "Le Gruyère": "IMG_9992.JPG",
  "Piłos Serek Wiejski Lekki": "IMG_9994.JPG",
  "Feta Grecki Ser Sałatkowy": "IMG_9998.JPG",
};

async function processFront(productName, filename) {
  const inputPath = path.join(INPUT_DIR, filename);
  const outputPath = path.join(OUTPUT_DIR, productName + ".png");

  if (!fs.existsSync(inputPath)) {
    console.log(`  ✗ BRAK: ${filename}`);
    return;
  }
  if (fs.existsSync(outputPath)) {
    console.log(`  ○ pomijam (istnieje): ${productName}.png`);
    return;
  }

  console.log(`Przetwarzam: ${productName}...`);

  const imageData = fs.readFileSync(inputPath);
  const blob = new Blob([imageData], { type: "image/jpeg" });

  const resultBlob = await removeBackground(blob, {
    model: "small",
    output: { format: "image/png" },
  });

  const arrayBuffer = await resultBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await sharp(buffer)
    .resize(600, null, { withoutEnlargement: true })
    .png({ compressionLevel: 8 })
    .toFile(outputPath);

  const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`  ✓ ${productName}.png (${sizeKB} KB)`);
}

const total = Object.keys(FRONTS).length;
let done = 0;
for (const [name, file] of Object.entries(FRONTS)) {
  done++;
  console.log(`[${done}/${total}]`);
  try {
    await processFront(name, file);
  } catch (err) {
    console.log(`  ✗ BŁĄD: ${name} — ${err.message}`);
  }
}
console.log("\nGotowe!");
