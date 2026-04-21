import fs from "fs";

const data = JSON.parse(fs.readFileSync("./produkty.json", "utf-8"));

const emptyNutri = { E_kcal: "b.d.", B: "b.d.", T: "b.d.", N: "b.d.", W: "b.d.", C: "b.d.", Bl: "b.d.", S: "b.d." };

// [nazwa, kategoria, png-filename-bez-rozszerzenia, sklad, wartosci]
const NEW_PRODUCTS = [
  // RYBY I OWOCE MORZA (→ Mięso i wędliny)
  ["Mazury Fish Szczupak w oliwie z oliwek", "Mięso i wędliny", "Mazury Fish Szczupak w oliwie z oliwek", "b.d.", emptyNutri],
  ["El Raño Małże w zalewie naturalnej", "Mięso i wędliny", "El Raño Małże w zalewie naturalnej", "b.d.", emptyNutri],
  ["Coargal Filety Anchois w oleju z oliwek", "Mięso i wędliny", "Coargal Filety Anchois w oleju z oliwek", "b.d.", emptyNutri],
  ["Mari de Sud Filety Anchois (słoik)", "Mięso i wędliny", "Mari de Sud Filety Anchois", "b.d.", emptyNutri],
  ["Nazarena Filety z Makreli w oliwie", "Mięso i wędliny", "Nazarena Filety z Makreli w oliwie", "b.d.", emptyNutri],
  ["Nazarena Tuńczyk w wodzie", "Mięso i wędliny", "Nazarena Tuńczyk w wodzie", "b.d.", emptyNutri],
  ["Nazarena Sardynki w sosie pomidorowym", "Mięso i wędliny", "Nazarena Sardynki w sosie pomidorowym", "b.d.", emptyNutri],
  ["Tenorio Filety tuńczyka ao natural", "Mięso i wędliny", "Tenorio Filety tuńczyka ao natural", "b.d.", emptyNutri],
  ["Emperatriz Tuńczyk Biały w oliwie z oliwek", "Mięso i wędliny", "Emperatriz Tuńczyk Biały w oliwie z oliwek", "b.d.", emptyNutri],
  ["Śledzie od Serca Filety Norweskie z pieprzem", "Mięso i wędliny", "Śledzie od Serca Filety Norweskie z pieprzem", "b.d.", emptyNutri],
  ["Mirko Śledź z Żurawiną (chłodzony)", "Mięso i wędliny", "Mirko Śledź z Żurawiną", "b.d.", emptyNutri],
  ["Auchan Filet z Pstrąga wędzony naturalny", "Mięso i wędliny", "Auchan Filet z Pstrąga wędzony naturalny", "b.d.", emptyNutri],
  ["Auchan Filet z Pstrąga z Pieprzem wędzony", "Mięso i wędliny", "Auchan Filet z Pstrąga z Pieprzem wędzony", "b.d.", emptyNutri],
  ["Suempol Łosoś Atlantycki wędzony na zimno", "Mięso i wędliny", "Suempol Łosoś Atlantycki wędzony na zimno", "b.d.", emptyNutri],
  ["Mowi Signature Łosoś wędzony na gorąco", "Mięso i wędliny", "Mowi Signature Łosoś wędzony na gorąco", "b.d.", emptyNutri],
  ["Connoisseur Łosoś wędzony na gorąco", "Mięso i wędliny", "Connoisseur Łosoś wędzony na gorąco", "b.d.", emptyNutri],
  ["Seamor Halibut wędzony na gorąco", "Mięso i wędliny", "Seamor Halibut wędzony na gorąco", "b.d.", emptyNutri],
  ["Seamor Trewal wędzony na gorąco", "Mięso i wędliny", "Seamor Trewal wędzony na gorąco", "b.d.", emptyNutri],
  ["Seamor Sieja Kanadyjska wędzona na gorąco", "Mięso i wędliny", "Seamor Sieja Kanadyjska wędzona na gorąco", "b.d.", emptyNutri],
  ["Pikok Pure Szynka Wieprzowa 95%", "Mięso i wędliny", "Pikok Pure Szynka Wieprzowa", "b.d.", emptyNutri],
  ["Italiamo Prosciutto di Parma DOP", "Mięso i wędliny", "Italiamo Prosciutto di Parma DOP", "b.d.", emptyNutri],

  // NABIAŁ
  ["Deluxe Burrata di Bufala", "Nabiał", "Deluxe Burrata di Bufala", "b.d.", emptyNutri],
  ["Milbona Free From Lactose Burrata", "Nabiał", "Milbona Free From Lactose Burrata", "b.d.", emptyNutri],
  ["Milbona Free From Lactose Mascarpone", "Nabiał", "Milbona Free From Lactose Mascarpone", "b.d.", emptyNutri],
  ["Lublanka Twaróg z Bychawy tłusty", "Nabiał", "Lublanka Twaróg z Bychawy tłusty", "b.d.", emptyNutri],
  ["Piłos Serek Wiejski Lekki 3%", "Nabiał", "Piłos Serek Wiejski Lekki", "b.d.", emptyNutri],
  ["Cambozola (ser niemiecki)", "Nabiał", "Cambozola", "b.d.", emptyNutri],
  ["Le Gruyère (ser szwajcarski)", "Nabiał", "Le Gruyère", "b.d.", emptyNutri],
  ["Feta Grecki Ser Sałatkowy", "Nabiał", "Feta Grecki Ser Sałatkowy", "b.d.", emptyNutri],
  ["Vemondo Tofu", "Nabiał", "Vemondo Tofu", "b.d.", emptyNutri],

  // PIECZYWO
  ["Piekarnia Lidla Chleb Złocisty Pszenno-Żytni", "Pieczywo", "Piekarnia Lidla Chleb Złocisty Pszenno-Żytni", "b.d.", emptyNutri],
  ["Tastino Chrupkie Pieczywo Żytnie z Sezamem", "Pieczywo", "Tastino Chrupkie Pieczywo Żytnie z Sezamem", "b.d.", emptyNutri],
  ["Tastino Chrupkie Pieczywo Żytnie", "Pieczywo", "Tastino Chrupkie Pieczywo Żytnie", "b.d.", emptyNutri],
  ["Piekarnia Lidla Chleb Żytni z Ziarnami Żyta", "Pieczywo", "Piekarnia Lidla Chleb Żytni z Ziarnami Żyta", "b.d.", emptyNutri],
  ["Piekarnia Lidla Burger z Nasionami Sezamu", "Pieczywo", "Piekarnia Lidla Burger z Nasionami Sezamu", "b.d.", emptyNutri],
  ["Piekarnia Lidla Hot Dog amerykański", "Pieczywo", "Piekarnia Lidla Hot Dog amerykański", "b.d.", emptyNutri],
  ["Piekarnia Lidla Pinsa Pełnoziarnista Flat Bread", "Pieczywo", "Piekarnia Lidla Pinsa Pełnoziarnista", "b.d.", emptyNutri],

  // MAKARONY I DANIA GOTOWE
  ["Chef Select Pierogi z Mięsem (Kuchnia Polska)", "Makarony i dania gotowe", "Chef Select Pierogi z Mięsem", "b.d.", emptyNutri],
  ["Chef Select Pierogi Ruskie (Kuchnia Polska)", "Makarony i dania gotowe", "Chef Select Pierogi Ruskie", "b.d.", emptyNutri],
  ["Chef Select Tortelloni z Pomidorami i Mozzarellą", "Makarony i dania gotowe", "Chef Select Tortelloni z Pomidorami i Mozzarellą", "b.d.", emptyNutri],
  ["Vemondo Gyros Roślinny", "Makarony i dania gotowe", "Vemondo Gyros Roślinny", "b.d.", emptyNutri],
  ["Well Well Pasta Falafelowa", "Makarony i dania gotowe", "Well Well Pasta Falafelowa", "b.d.", emptyNutri],

  // PRZEKĄSKI
  ["Auchan Musli Owocowe Polskie Owoce", "Przekąski", "Auchan Musli Owocowe Polskie Owoce", "b.d.", emptyNutri],
  ["Vivi Musli tropikalne", "Przekąski", "Vivi Musli tropikalne", "b.d.", emptyNutri],
  ["One Day More Muesli Fruit", "Przekąski", "One Day More Muesli Fruit", "b.d.", emptyNutri],
  ["One Day More Oatmeal Apple & Cinnamon", "Przekąski", "One Day More Oatmeal Apple and Cinnamon", "b.d.", emptyNutri],
  ["Auchan Wafle Ryżowe Naturalne (białe)", "Przekąski", "Auchan Wafle Ryżowe Naturalne białe", "b.d.", emptyNutri],
  ["Auchan Wafle Ryżowe Naturalne (brązowe)", "Przekąski", "Auchan Wafle Ryżowe Naturalne brązowe", "b.d.", emptyNutri],
  ["Sante Extra Cienkie Wafle Ryżowe", "Przekąski", "Sante Extra Cienkie Wafle Ryżowe", "b.d.", emptyNutri],
  ["Sonko Wafle Ryżowe Naturalne", "Przekąski", "Sonko Wafle Ryżowe Naturalne", "b.d.", emptyNutri],
  ["EuroWafki Waflitki Kukurydziane", "Przekąski", "EuroWafki Waflitki Kukurydziane", "b.d.", emptyNutri],
  ["Głodny Wilk Owocowe Puzzle Truskawka", "Przekąski", "Głodny Wilk Owocowe Puzzle Truskawka", "b.d.", emptyNutri],
  ["Irenki OatŁanki Ciastka z Żurawiną", "Przekąski", "Irenki OatŁanki Ciastka z Żurawiną", "b.d.", emptyNutri],
  ["Irenki OatŁanki Ciastka z Czekoladą", "Przekąski", "Irenki OatŁanki Ciastka z Czekoladą", "b.d.", emptyNutri],
  ["Sante Fit Ciasteczka Zbożowe z Jagodą", "Przekąski", "Sante Fit Ciasteczka Zbożowe z Jagodą", "b.d.", emptyNutri],
  ["Sante Fit Ciasteczka Zbożowe z Morelą", "Przekąski", "Sante Fit Ciasteczka Zbożowe z Morelą", "b.d.", emptyNutri],
  ["Kopernik Pierniki Toruńskie Śliwka", "Przekąski", "Kopernik Pierniki Toruńskie Śliwka", "b.d.", emptyNutri],
  ["Kopernik Serca Piernikowe z Czekoladą i Miodem", "Przekąski", "Kopernik Serca Piernikowe z Czekoladą i Miodem", "b.d.", emptyNutri],
  ["Kopernik Torcik Piernikowy smak limonki", "Przekąski", "Kopernik Torcik Piernikowy limonka", "b.d.", emptyNutri],
  ["Eat Real Veggie Straws (pomidor, jarmuż, szpinak)", "Przekąski", "Eat Real Veggie Straws", "b.d.", emptyNutri],
  ["Eat Real Quinoa Chips Sour Cream & Chive", "Przekąski", "Eat Real Quinoa Chips Sour Cream and Chive", "b.d.", emptyNutri],
  ["Biosaurus Chrupki Kukurydziane Ketchup", "Przekąski", "Biosaurus Chrupki Kukurydziane Ketchup", "b.d.", emptyNutri],
  ["Biosaurus Chrupki Kukurydziane Sea Salt", "Przekąski", "Biosaurus Chrupki Kukurydziane Sea Salt", "b.d.", emptyNutri],
  ["Gullón Zero Sugar Free Short Bread", "Przekąski", "Gullón Zero Sugar Free Short Bread", "b.d.", emptyNutri],
  ["Dobra Kaloria Mini Batoniki Odporność Żurawina", "Przekąski", "Dobra Kaloria Mini Batoniki Odporność Żurawina", "b.d.", emptyNutri],
  ["Sens Cricket Protein Bar Dark Chocolate & Sour Cherry", "Przekąski", "Sens Cricket Protein Bar Dark Chocolate and Sour Cherry", "b.d.", emptyNutri],
  ["Dobra Kaloria Chrupiący Orzech", "Przekąski", "Dobra Kaloria Chrupiący Orzech", "b.d.", emptyNutri],
  ["Dobra Kaloria Nerkowce & Kokos", "Przekąski", "Dobra Kaloria Nerkowce Kokos", "b.d.", emptyNutri],
  ["Dobra Kaloria Mini Batoniki Dla Serca Wiśnia", "Przekąski", "Dobra Kaloria Mini Batoniki Dla Serca Wiśnia", "b.d.", emptyNutri],
  ["Sens Pea Cricket Protein Chips Poppy Seeds & Sea Salt", "Przekąski", "Sens Pea Cricket Protein Chips Poppy Seeds and Sea Salt", "b.d.", emptyNutri],
  ["Zawiera Błonnik Junior Pałeczki Wielozbożowe", "Przekąski", "Zawiera Błonnik Junior Pałeczki Wielozbożowe", "b.d.", emptyNutri],
  ["Box Vital Ciasteczka Marchewkowe", "Przekąski", "Box Vital Ciasteczka Marchewkowe", "b.d.", emptyNutri],
  ["Cere Brownie Style Protein Organic Bar", "Przekąski", "Cere Brownie Style Protein Organic Bar", "b.d.", emptyNutri],
  ["Foods by Ann Energy Choco Bar Śliwka & Czarna Porzeczka", "Przekąski", "Foods by Ann Energy Choco Bar Śliwka Czarna Porzeczka", "b.d.", emptyNutri],
  ["Dobra Kaloria Proteina Krem Orzechowy & Sól", "Przekąski", "Dobra Kaloria Proteina Krem Orzechowy Sól", "b.d.", emptyNutri],
  ["Dobra Kaloria Proteina Mini Batoniki o smaku karmelu", "Przekąski", "Dobra Kaloria Proteina Mini Batoniki karmel", "b.d.", emptyNutri],
  ["Be Keto Keto Chips Swiss Cheese & French Onion", "Przekąski", "Be Keto Keto Chips Swiss Cheese French Onion", "b.d.", emptyNutri],
  ["Alesto RAW Kokos & Kakao", "Przekąski", "Alesto RAW Kokos Kakao", "b.d.", emptyNutri],
  ["Sondey Pop Corn Snack Wafle Kukurydziane smak Pizza", "Przekąski", "Sondey Pop Corn Snack Pizza", "b.d.", emptyNutri],

  // NAPOJE
  ["Słońce WOW Smoothie Keen for Green (Banan, Szpinak, Jęczmień)", "Napoje", "Słońce WOW Smoothie Keen for Green", "b.d.", emptyNutri],
  ["Solevita Smoothie Strawberry & Friends", "Napoje", "Solevita Smoothie Strawberry and Friends", "b.d.", emptyNutri],
  ["Solevita Smoothie Pomarańcza Mango Mandarynka", "Napoje", "Solevita Smoothie Pomarańcza Mango Mandarynka", "b.d.", emptyNutri],
  ["Cymes Tłocznia Sok Dnia Burak Jabłko", "Napoje", "Cymes Tłocznia Sok Burak Jabłko", "b.d.", emptyNutri],
  ["Cymes Tłocznia Sok świeża Marchewka Pomarańcza Jabłko", "Napoje", "Cymes Tłocznia Sok Marchewka Pomarańcza Jabłko", "b.d.", emptyNutri],
  ["Solevita Sok 100% Pomarańcza Kiwi (tłoczony na zimno)", "Napoje", "Solevita Sok 100% Pomarańcza Kiwi", "b.d.", emptyNutri],

  // SOSY I KONDYMENTY
  ["Mutti Sos Do Makaronu z Papryką Chili", "Sosy i kondymenty", "Mutti Sos z Papryką Chili", "b.d.", emptyNutri],
  ["Mutti Sos Do Makaronu z Bazylią", "Sosy i kondymenty", "Mutti Sos z Bazylią", "b.d.", emptyNutri],
  ["Mutti Sos Do Makaronu z Serem Parmigiano Reggiano", "Sosy i kondymenty", "Mutti Sos z Parmigiano Reggiano", "b.d.", emptyNutri],
  ["Mutti Sos Do Makaronu Bolognese", "Sosy i kondymenty", "Mutti Sos Bolognese", "b.d.", emptyNutri],
  ["Combino Sos Pomidorowy Arrabbiata", "Sosy i kondymenty", "Combino Sos Pomidorowy Arrabbiata", "b.d.", emptyNutri],
  ["Combino Sos Pomidorowy Basilico", "Sosy i kondymenty", "Combino Sos Pomidorowy Basilico", "b.d.", emptyNutri],

  // PRZETWORY
  ["Owocal Bio Charsznickie Ogórki Kiszone", "Przetwory", "Owocal Bio Charsznickie Ogórki Kiszone", "b.d.", emptyNutri],
  ["Dole Tropical Gold Pineapple Chunks", "Przetwory", "Dole Tropical Gold Pineapple Chunks", "b.d.", emptyNutri],
  ["Dole Tropical Gold Pineapple Slices", "Przetwory", "Dole Tropical Gold Pineapple Slices", "b.d.", emptyNutri],

  // SYROPY/SŁODYCZE → przekąski
  ["Maple Joe Syrop Klonowy Amber Rich", "Przekąski", "Maple Joe Syrop Klonowy Amber Rich", "b.d.", emptyNutri],
];

for (const [nazwa, kategoria, pngName, sklad, nutri] of NEW_PRODUCTS) {
  let cat = data.kategorie.find(k => k.nazwa === kategoria);
  if (!cat) {
    cat = { nazwa: kategoria, produkty: [] };
    data.kategorie.push(cat);
  }
  // Sprawdź duplikat po nazwie
  if (cat.produkty.find(p => p.nazwa === nazwa)) {
    console.log(`  ○ pomijam duplikat: ${nazwa}`);
    continue;
  }
  cat.produkty.push({
    nazwa,
    zdjecie_przod: pngName + ".png",
    sklad,
    wartosci_odzywcze: nutri,
  });
  console.log(`  + ${kategoria}: ${nazwa}`);
}

fs.writeFileSync("./produkty.json", JSON.stringify(data, null, 2), "utf-8");
console.log(`\nZapisano produkty.json. Dodano ${NEW_PRODUCTS.length} produktów.`);
