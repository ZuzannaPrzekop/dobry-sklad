'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT      = __dirname;
const ZDJECIA   = path.join(ROOT, 'zdjecia');
const OUTPUT    = path.join(ROOT, 'output');
const DATA_FILE = path.join(ROOT, 'produkty.json');

if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

function imageToBase64(filename) {
  if (!filename) return null;
  const fp = path.join(ZDJECIA, filename);
  if (!fs.existsSync(fp)) return null;
  const ext  = path.extname(filename).toLowerCase().replace('.', '');
  const mime = (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' : 'image/png';
  return 'data:' + mime + ';base64,' + fs.readFileSync(fp).toString('base64');
}

// Wbuduj zdjęcia jako base64
const embeddedData = {
  ...data,
  kategorie: data.kategorie.map(kat => ({
    ...kat,
    produkty: kat.produkty.map(prod => ({
      ...prod,
      img: imageToBase64(prod.zdjecie_przod)
    }))
  }))
};

// ── HTML ──────────────────────────────────────────────────────────────────────

const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dobry Skład — Zuzanna Przekop</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:ital,wght@0,300;0,400;0,600;1,400&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink:       #1F2937;
      --bg:        #FFFBF5;
      --surface:   #FFFFFF;
      --navy:      #0B2162;
      --sage:      #8BC9A2;
      --sage-soft: #D6E7E1;
      --lime:      #CBEA4F;
      --warning:   #F59E0B;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: var(--bg);
      color: var(--ink);
      min-height: 100vh;
    }

    /* ── HEADER ─────────────────────────────────────────────── */
    .app-header {
      background: var(--surface);
      border-bottom: 1px solid var(--sage-soft);
      padding: 20px 32px 14px;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    }

    .header-top {
      display: flex;
      align-items: baseline;
      gap: 14px;
      margin-bottom: 14px;
    }

    .app-title {
      font-family: 'Sora', sans-serif;
      font-weight: 700;
      font-size: 20px;
      letter-spacing: -0.3px;
      color: var(--ink);
    }

    .app-subtitle {
      font-family: 'Crimson Pro', serif;
      font-style: italic;
      font-size: 15px;
      color: #aaa;
    }

    .search-wrap {
      position: relative;
      margin-bottom: 12px;
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #bbb;
      pointer-events: none;
      font-size: 14px;
    }

    .search-bar {
      width: 100%;
      padding: 10px 16px 10px 38px;
      border: 1.5px solid var(--sage-soft);
      border-radius: 99px;
      font-family: 'Inter', sans-serif;
      font-size: 13.5px;
      background: var(--bg);
      color: var(--ink);
      outline: none;
      transition: border-color 0.2s;
    }
    .search-bar:focus { border-color: var(--sage); background: #fff; }
    .search-bar::placeholder { color: #ccc; }

    .filters { display: flex; flex-wrap: wrap; gap: 6px; }

    .filter-btn {
      font-family: 'Sora', sans-serif;
      font-size: 10.5px;
      font-weight: 600;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 99px;
      border: 1.5px solid var(--sage-soft);
      background: transparent;
      color: var(--ink);
      cursor: pointer;
      transition: all 0.15s;
    }
    .filter-btn:hover  { background: var(--sage-soft); }
    .filter-btn.active { background: var(--sage); border-color: var(--sage); }

    /* ── MAIN ───────────────────────────────────────────────── */
    .app-main {
      padding: 20px 32px 56px;
      max-width: 1140px;
      margin: 0 auto;
    }

    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .results-count {
      font-size: 11.5px;
      color: #aaa;
      font-family: 'Inter', sans-serif;
    }

    .legenda-toggle {
      background: none;
      border: none;
      font-family: 'Inter', sans-serif;
      font-size: 11px;
      color: var(--sage);
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 2px;
      padding: 0;
    }

    /* ── LEGENDA ─────────────────────────────────────────────── */
    .legenda-box {
      background: var(--surface);
      border: 1px solid var(--sage-soft);
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 20px;
      display: none;
      flex-wrap: wrap;
      gap: 6px 22px;
    }
    .legenda-box.open { display: flex; }
    .legenda-box span { font-size: 11.5px; color: #666; }
    .legenda-box b    { color: var(--navy); font-family: 'Sora', sans-serif; }

    /* ── KATEGORIA ───────────────────────────────────────────── */
    .kat-section    { margin-bottom: 28px; }

    .kat-label {
      font-family: 'Sora', sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--navy);
      border-bottom: 2px solid var(--sage);
      padding-bottom: 6px;
      margin-bottom: 14px;
    }

    /* ── GRID ────────────────────────────────────────────────── */
    .produkty-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(430px, 1fr));
      gap: 10px;
    }

    /* ── KARTA ───────────────────────────────────────────────── */
    .produkt-card {
      background: var(--surface);
      border-radius: 10px;
      border: 1px solid #ede9e3;
      display: flex;
      gap: 14px;
      padding: 14px;
      transition: box-shadow 0.2s, border-color 0.2s;
    }
    .produkt-card:hover {
      box-shadow: 0 4px 20px rgba(139,201,162,0.15);
      border-color: var(--sage-soft);
    }

    .card-photo {
      flex: 0 0 105px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-img {
      width: 105px;
      height: 135px;
      object-fit: contain;
    }

    .no-img {
      width: 105px;
      height: 135px;
      background: var(--bg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ddd;
      font-size: 11px;
    }

    .card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 9px;
      min-width: 0;
    }

    .card-nazwa {
      font-family: 'Sora', sans-serif;
      font-size: 13.5px;
      font-weight: 700;
      color: var(--ink);
      line-height: 1.3;
    }

    .card-etykieta {
      display: block;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--sage);
      margin-bottom: 3px;
      font-family: 'Sora', sans-serif;
    }

    .card-sklad {
      font-size: 11.5px;
      line-height: 1.65;
      color: #555;
    }

    /* ── TABELA ODŻYWCZA ─────────────────────────────────────── */
    .nut-table {
      border-collapse: collapse;
      font-size: 11px;
    }

    .nut-table th {
      background: var(--navy);
      color: #fff;
      padding: 4px 9px;
      text-align: center;
      font-family: 'Sora', sans-serif;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }

    .nut-table td {
      background: var(--bg);
      border: 1px solid var(--sage-soft);
      padding: 4px 9px;
      text-align: center;
      color: var(--ink);
      white-space: nowrap;
    }

    .nut-table td.check {
      background: #fff8e1;
      color: #7a5c00;
      font-style: italic;
    }

    /* ── EMPTY STATE ─────────────────────────────────────────── */
    .empty-state {
      text-align: center;
      padding: 72px 32px;
      color: #ccc;
      font-family: 'Crimson Pro', serif;
      font-style: italic;
      font-size: 20px;
    }

    /* ── RESPONSIVE ──────────────────────────────────────────── */
    @media (max-width: 640px) {
      .app-header  { padding: 14px 16px 12px; }
      .app-main    { padding: 16px 16px 48px; }
      .header-top  { flex-direction: column; gap: 2px; }
      .produkty-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<header class="app-header">
  <div class="header-top">
    <span class="app-title">Dobry Skład</span>
    <span class="app-subtitle">Zuzanna Przekop</span>
  </div>
  <div class="search-wrap">
    <span class="search-icon">&#128269;</span>
    <input type="search" class="search-bar" id="search" placeholder="Szukaj produktu lub składnika\u2026">
  </div>
  <div class="filters" id="filters"></div>
</header>

<main class="app-main">
  <div class="top-bar">
    <span class="results-count" id="count"></span>
    <button class="legenda-toggle" id="legenda-btn" onclick="toggleLegenda()">pokaż legendę skrótów</button>
  </div>
  <div class="legenda-box" id="legenda"></div>
  <div id="app"></div>
</main>

<script>
var DATA = ${JSON.stringify(embeddedData, null, 0)};

var COLS = [
  { key: 'E_kcal', label: 'E',  unit: 'kcal' },
  { key: 'B',      label: 'B',  unit: 'g' },
  { key: 'T',      label: 'T',  unit: 'g' },
  { key: 'N',      label: 'N',  unit: 'g' },
  { key: 'W',      label: 'W',  unit: 'g' },
  { key: 'C',      label: 'C',  unit: 'g' },
  { key: 'Bl',     label: 'B\u0142', unit: 'g' },
  { key: 'S',      label: 'S',  unit: 'g' }
];

// Flat lista wszystkich produktów
var PRODUKTY = [];
DATA.kategorie.forEach(function(kat) {
  kat.produkty.forEach(function(p) {
    PRODUKTY.push(Object.assign({}, p, { kategoria: kat.nazwa }));
  });
});
PRODUKTY.sort(function(a, b) { return a.nazwa.localeCompare(b.nazwa, 'pl'); });

var aktywnaKat = 'Wszystkie';
var szukana    = '';

// ── Legenda ──────────────────────────────────────────────────────────────────
var legBox = document.getElementById('legenda');
Object.entries(DATA.legenda).forEach(function(entry) {
  var k = entry[0]; var v = entry[1];
  var s = document.createElement('span');
  s.innerHTML = '<b>' + (k === 'Bl' ? 'B\u0142' : k) + '</b> \u2014 ' + v;
  legBox.appendChild(s);
});

function toggleLegenda() {
  legBox.classList.toggle('open');
  document.getElementById('legenda-btn').textContent =
    legBox.classList.contains('open') ? 'ukryj legend\u0119' : 'poka\u017c legend\u0119 skr\u00f3t\u00f3w';
}

// ── Filtry kategorii ─────────────────────────────────────────────────────────
var KATEGORIE = ['Wszystkie'].concat(DATA.kategorie.map(function(k) { return k.nazwa; }));
var filtersEl = document.getElementById('filters');

KATEGORIE.forEach(function(kat) {
  var btn = document.createElement('button');
  btn.className = 'filter-btn' + (kat === aktywnaKat ? ' active' : '');
  btn.textContent = kat;
  btn.addEventListener('click', function() {
    aktywnaKat = kat;
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    render();
  });
  filtersEl.appendChild(btn);
});

// ── Wyszukiwarka ─────────────────────────────────────────────────────────────
document.getElementById('search').addEventListener('input', function(e) {
  szukana = e.target.value.toLowerCase().trim();
  render();
});

// ── Tabela odżywcza ──────────────────────────────────────────────────────────
function buildTable(w) {
  var heads = COLS.map(function(c) { return '<th>' + c.label + '</th>'; }).join('');
  var cells = COLS.map(function(c) {
    var val     = (w[c.key] !== undefined && w[c.key] !== null) ? w[c.key] : '\u2014';
    var special = (val === '?' || val === '\u2014');
    var cls     = val === '?' ? ' class="check"' : '';
    var text    = special ? val : val + '\u00a0' + c.unit;
    return '<td' + cls + '>' + text + '</td>';
  }).join('');
  return '<table class="nut-table"><thead><tr>' + heads + '</tr></thead><tbody><tr>' + cells + '</tr></tbody></table>';
}

// ── Karta produktu ────────────────────────────────────────────────────────────
function buildCard(p) {
  var imgTag = p.img
    ? '<img src="' + p.img + '" alt="' + p.nazwa + '" class="card-img">'
    : '<div class="no-img">brak zdj\u0119cia</div>';

  return '<div class="produkt-card">'
    + '<div class="card-photo">' + imgTag + '</div>'
    + '<div class="card-body">'
    +   '<div class="card-nazwa">' + p.nazwa + '</div>'
    +   '<div>'
    +     '<span class="card-etykieta">Sk\u0142ad</span>'
    +     '<div class="card-sklad">' + p.sklad + '</div>'
    +   '</div>'
    +   '<div>'
    +     '<span class="card-etykieta">Warto\u015bci od\u017cywcze (100\u00a0g)</span>'
    +     buildTable(p.wartosci_odzywcze)
    +   '</div>'
    + '</div>'
    + '</div>';
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  var filtered = PRODUKTY.filter(function(p) {
    var katOk  = aktywnaKat === 'Wszystkie' || p.kategoria === aktywnaKat;
    var tekst  = (p.nazwa + ' ' + p.sklad).toLowerCase();
    var szukOk = !szukana || tekst.includes(szukana);
    return katOk && szukOk;
  });

  var n = filtered.length;
  var slowo = n === 1 ? 'produkt' : (n >= 2 && n <= 4 ? 'produkty' : 'produkt\u00f3w');
  document.getElementById('count').textContent = n + '\u00a0' + slowo;

  var app = document.getElementById('app');

  if (!filtered.length) {
    app.innerHTML = '<div class="empty-state">Brak wynik\u00f3w dla podanej frazy\u2026</div>';
    return;
  }

  // Grupuj po kategorii
  var grupy = {};
  DATA.kategorie.forEach(function(k) { grupy[k.nazwa] = []; });
  filtered.forEach(function(p) { grupy[p.kategoria].push(p); });

  var html = '';
  Object.keys(grupy).forEach(function(kat) {
    var prods = grupy[kat];
    if (!prods.length) return;
    html += '<div class="kat-section">'
      + '<div class="kat-label">' + kat + '</div>'
      + '<div class="produkty-grid">'
      + prods.map(buildCard).join('')
      + '</div></div>';
  });

  app.innerHTML = html;
}

render();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(OUTPUT, 'index.html'), html, 'utf8');
console.log('\u2713 Wygenerowano: output/index.html');
console.log('  \u2192 Otw\u00f3rz w przegl\u0105darce');
