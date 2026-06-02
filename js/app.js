'use strict';

/* ========================
   STATE
======================== */
let bahans = [];

let ops = [];

let fixeds = [];

let drinks = [
  { category: 'COFFEE BASE', nama: 'Americano', harga: 28000 },
  { category: 'COFFEE BASE', nama: 'Caffee Latte', harga: 35000 },
  { category: 'COFFEE BASE', nama: 'Cappuccino', harga: 35000 },
  { category: 'COFFEE BASE', nama: 'Kopi Anna', harga: 40000 },
  { category: 'COFFEE BASE', nama: 'Vanilla Latte', harga: 42000 },
  { category: 'COFFEE BASE', nama: 'Caramel Latte', harga: 42000 },
  { category: 'COFFEE BASE', nama: 'Hazelnut Latte', harga: 42000 },
  { category: 'COFFEE BASE', nama: 'Dolce Asian Latte', harga: 45000 },
  { category: 'COFFEE BASE', nama: 'Mochachino', harga: 45000 },
  { category: 'COFFEE BASE', nama: 'Caramel Machiatto', harga: 48000 },
  
  { category: 'CHOCOLATE BASE', nama: 'Signature Chocolate', harga: 35000 },
  { category: 'CHOCOLATE BASE', nama: 'Caramel Sig. Chocolate', harga: 40000 },
  { category: 'CHOCOLATE BASE', nama: 'Hazelnut Sig Chocolate', harga: 40000 },
  
  { category: 'NON COFFEE BASE', nama: 'Korean Strawberry', harga: 35000 },
  { category: 'NON COFFEE BASE', nama: 'Dalgona Strawberry', harga: 48000 },
  { category: 'NON COFFEE BASE', nama: 'Matcha Latte', harga: 38000 },
  { category: 'NON COFFEE BASE', nama: 'Red Velvet Latte', harga: 38000 },
  { category: 'NON COFFEE BASE', nama: 'Lychee Tea', harga: 35000 },
  { category: 'NON COFFEE BASE', nama: 'Shaken Lemonade', harga: 30000 },
  { category: 'NON COFFEE BASE', nama: 'Lychee Yakult', harga: 40000 },
  { category: 'NON COFFEE BASE', nama: 'Vanilla Black Tea Latte', harga: 35000 },
  
  { category: 'TEA VARIANT', nama: 'English Breakfast Tea', harga: 25000 },
  { category: 'TEA VARIANT', nama: 'Jasmine Tea', harga: 25000 },
  { category: 'TEA VARIANT', nama: 'Chamomile Tea', harga: 25000 },
  { category: 'TEA VARIANT', nama: 'Earl Grey Tea', harga: 25000 },
  { category: 'TEA VARIANT', nama: 'Papermint Tea', harga: 25000 },
  
  { category: 'COFFEE FRAPPE', nama: 'Espresso Frappe', harga: 40000 },
  { category: 'COFFEE FRAPPE', nama: 'Vanilla Coffee Frappe', harga: 45000 },
  { category: 'COFFEE FRAPPE', nama: 'Caramel Coffee Frappe', harga: 45000 },
  { category: 'COFFEE FRAPPE', nama: 'Hazelnut Coffee Frappe', harga: 45000 },
  { category: 'COFFEE FRAPPE', nama: 'Javachip Frappe', harga: 49000 },
  { category: 'COFFEE FRAPPE', nama: 'Mocha Frappe', harga: 45000 },
  
  { category: 'NON COFFEE FRAPPE', nama: 'Vanilla Cream Frappe', harga: 45000 },
  { category: 'NON COFFEE FRAPPE', nama: 'Caramel Cream Frappe', harga: 45000 },
  { category: 'NON COFFEE FRAPPE', nama: 'Hazelnut Cream Frappe', harga: 45000 },
  { category: 'NON COFFEE FRAPPE', nama: 'Redvelvet Cream Frappe', harga: 48000 },
  { category: 'NON COFFEE FRAPPE', nama: 'Greentea Cream Frappe', harga: 48000 },
  { category: 'NON COFFEE FRAPPE', nama: 'Chococchip Cream Frappe', harga: 49000 },
  { category: 'NON COFFEE FRAPPE', nama: 'Cookies & Cream Frappe', harga: 49000 },
  
  { category: 'JUICE', nama: 'Alpukat', harga: 45000 },
  { category: 'JUICE', nama: 'Mangga', harga: 45000 },
  { category: 'JUICE', nama: 'Melon', harga: 45000 },
  { category: 'JUICE', nama: 'Nanas', harga: 45000 },
  { category: 'JUICE', nama: 'Buah Naga', harga: 45000 },
  { category: 'JUICE', nama: 'Jeruk Sunkist', harga: 45000 },
  { category: 'JUICE', nama: 'Strawberry', harga: 45000 },
  { category: 'JUICE', nama: 'Apel', harga: 45000 },
  
  { category: 'MANUAL BREW', nama: 'V60', harga: 30000 },
  { category: 'MANUAL BREW', nama: 'Japanese Style', harga: 30000 },
  { category: 'MANUAL BREW', nama: 'Kopi Press', harga: 30000 },
  { category: 'MANUAL BREW', nama: 'Vietnam Drip', harga: 30000 },
];

/* ========================
   HELPERS
======================== */
const idr = n => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const pct = n => n.toFixed(1) + '%';
const el = id => document.getElementById(id);

function setInsight(elId, text, type) {
  const box = el(elId);
  box.textContent = text;
  box.className = 'insight-box ' + type;
}

function setBadge(elId, text, cls) {
  const b = el(elId);
  b.textContent = text;
  b.className = 'status-badge ' + cls;
}

/* ========================
   DRINKS MENU
======================== */
function initDrinksMenu() {
  const select = el('menu-select');
  if (!select) return;
  
  let currentCategory = '';
  let optgroup = null;
  
  drinks.forEach(d => {
    if (d.category !== currentCategory) {
      currentCategory = d.category;
      optgroup = document.createElement('optgroup');
      optgroup.label = currentCategory;
      select.appendChild(optgroup);
    }
    const option = document.createElement('option');
    option.value = JSON.stringify({ nama: d.nama, harga: d.harga });
    option.textContent = `${d.nama} — ${idr(d.harga)}`;
    optgroup.appendChild(option);
  });
}

function selectMenuFromList() {
  const select = el('menu-select');
  if (!select.value) return;
  
  const item = JSON.parse(select.value);
  el('menu-name').value = item.nama;
  el('hj').value = item.harga;
  calc();
}

/* ========================
   TAB NAVIGATION
======================== */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    el('tab-' + tab).classList.add('active');
    // close mobile nav
    document.querySelector('.main-nav').classList.remove('open');
    el('hamburger').classList.remove('active');
  });
});

el('hamburger').addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('open');
});

/* ========================
   RENDER TABLES
======================== */
function renderBahan() {
  const tb = el('bahan-body');
  tb.innerHTML = '';
  bahans.forEach((b, i) => {
    const hpg = (b.satuan === 'gr' || b.satuan === 'ml') ? b.harga / 1000 : b.harga;
    const sub = Math.round(b.jml * hpg);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" value="${b.nama}" placeholder="Nama bahan" oninput="bahans[${i}].nama=this.value"/></td>
      <td><input type="number" value="${b.jml}" min="0" oninput="bahans[${i}].jml=+this.value;calcFromBahan()"/></td>
      <td><input type="number" value="${b.harga}" min="0" oninput="bahans[${i}].harga=+this.value;calcFromBahan()"/></td>
      <td>
        <select onchange="bahans[${i}].satuan=this.value;calcFromBahan()">
          <option value="gr"${b.satuan==='gr'?' selected':''}>per kg</option>
          <option value="ml"${b.satuan==='ml'?' selected':''}>per L</option>
          <option value="pcs"${b.satuan==='pcs'?' selected':''}>per pcs</option>
        </select>
      </td>
      <td style="text-align:right;font-family:var(--font-mono);font-size:12px;color:var(--text2)">${sub.toLocaleString('id-ID')}</td>
      <td><button class="del-btn" onclick="bahans.splice(${i},1);renderBahan()" title="Hapus">✕</button></td>
    `;
    tb.appendChild(tr);
  });
  calc();
}

function renderOps() {
  const tb = el('ops-body');
  tb.innerHTML = '';
  ops.forEach((o, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" value="${o.ket}" placeholder="Keterangan" oninput="ops[${i}].ket=this.value"/></td>
      <td><input type="number" value="${o.biaya}" min="0" style="text-align:right" oninput="ops[${i}].biaya=+this.value;calc()"/></td>
      <td><button class="del-btn" onclick="ops.splice(${i},1);renderOps()" title="Hapus">✕</button></td>
    `;
    tb.appendChild(tr);
  });
  calc();
}

function renderFixed() {
  const tb = el('fixed-body');
  tb.innerHTML = '';
  fixeds.forEach((f, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" value="${f.ket}" placeholder="Keterangan" oninput="fixeds[${i}].ket=this.value"/></td>
      <td><input type="number" value="${f.biaya}" min="0" style="text-align:right" oninput="fixeds[${i}].biaya=+this.value;calcBep()"/></td>
      <td><button class="del-btn" onclick="fixeds.splice(${i},1);renderFixed()" title="Hapus">✕</button></td>
    `;
    tb.appendChild(tr);
  });
  calcBep();
}

function addBahan() { bahans.push({ nama: '', jml: 0, harga: 0, satuan: 'gr' }); renderBahan(); }
function addOps()   { ops.push({ ket: '', biaya: 0 }); renderOps(); }
function addFixed() { fixeds.push({ ket: '', biaya: 0 }); renderFixed(); }

function calcFromBahan() { renderBahan(); }

/* ========================
   TAB 1: HPP CALC
======================== */
function calc() {
  let hppBahan = 0;
  bahans.forEach(b => {
    const hpg = (b.satuan === 'gr' || b.satuan === 'ml') ? b.harga / 1000 : b.harga;
    hppBahan += b.jml * hpg;
  });

  const opsTotal = ops.reduce((s, o) => s + o.biaya, 0);
  const waste   = +(el('waste').value) || 0;
  const hj      = +(el('hj').value)    || 0;

  const wasteRp  = hppBahan * (waste / 100);
  const hppTotal = hppBahan + wasteRp + opsTotal;
  const gm       = hj - hppTotal;
  const fcPct    = hj > 0 ? (hppTotal / hj) * 100 : 0;

  // Update menu name display
  const mname = el('menu-name').value.trim();
  el('result-menu-name').textContent = mname || '—';

  el('o-bahan').textContent    = idr(hppBahan);
  el('o-waste-rp').textContent = idr(wasteRp);
  el('o-ops').textContent      = idr(opsTotal);
  el('o-hpp').textContent      = idr(hppTotal);
  el('o-hj-disp').textContent  = idr(hj);
  el('o-gm').textContent       = idr(gm);
  el('o-fc').textContent       = pct(fcPct);
  el('o-hj-ideal').textContent = hppTotal > 0 ? idr(Math.ceil(hppTotal / 0.30 / 500) * 500) : '—';

  // Bar
  const bar = el('fc-bar');
  bar.style.width = Math.min(fcPct, 100) + '%';

  if (!hj || !hppTotal) {
    bar.style.background = 'var(--text3)';
    setBadge('fc-badge', '—', '');
    setInsight('fc-insight', 'Masukkan data bahan dan harga jual untuk melihat analisis food cost.', 'neutral');
    return;
  }

  if (fcPct <= 35) {
    bar.style.background = 'var(--green)';
    setBadge('fc-badge', 'Ideal', 'badge-good');
    setInsight('fc-insight',
      `Food cost ${pct(fcPct)} — sehat. Gross margin ${idr(gm)} per porsi. Pastikan fixed cost per bulan masih bisa ditutup dari margin ini.`,
      'good');
  } else if (fcPct <= 42) {
    bar.style.background = 'var(--amber)';
    setBadge('fc-badge', 'Perlu diperhatikan', 'badge-warn');
    setInsight('fc-insight',
      `Food cost ${pct(fcPct)} — di batas aman. Pertimbangkan naikkan harga jual atau efisiensi porsi agar turun ke bawah 35%.`,
      'warn');
  } else {
    bar.style.background = 'var(--red)';
    setBadge('fc-badge', 'Terlalu tinggi', 'badge-bad');
    const saranHarga = Math.ceil(hppTotal / 0.35 / 500) * 500;
    setInsight('fc-insight',
      `Food cost ${pct(fcPct)} — berbahaya! Harga jual minimal yang disarankan: ${idr(saranHarga)} (target FC 35%).`,
      'bad');
  }

  // sync ke tab BEP & Proj
  el('bep-hpp').value = Math.round(hppTotal);
  el('bep-hj').value  = hj;
  el('pj-hpp').value  = Math.round(hppTotal);
  el('pj-hj').value   = hj;
  calcBep();
  calcProj();
}

/* ========================
   TAB 2: BEP CALC
======================== */
let bepChart = null;

function calcBep() {
  const totalFixed = fixeds.reduce((s, f) => s + f.biaya, 0);
  const hjB   = +(el('bep-hj').value)    || 1;
  const hppB  = +(el('bep-hpp').value)   || 0;
  const hari  = +(el('bep-hari').value)  || 26;
  const target= +(el('bep-target').value)|| 50;
  const cm    = hjB - hppB;
  const bepBulan = cm > 0 ? totalFixed / cm : 0;
  const bepHari  = hari  > 0 ? bepBulan / hari : 0;
  const totalPorsi= hari * target;
  const omset     = totalPorsi * hjB;
  const totalCost = totalFixed + totalPorsi * hppB;
  const netProfit = omset - totalCost;

  el('b-fc-total').textContent = idr(totalFixed);
  el('b-cm').textContent = cm > 0 ? idr(cm) : '—';
  el('b-cm-ratio').textContent = hjB > 0 && cm > 0 ? pct(cm / hjB * 100) : '—';
  el('b-bep-hari').textContent   = cm > 0 ? Math.ceil(bepHari).toLocaleString('id-ID') : '∞';
  el('b-bep-bulan').textContent  = cm > 0 ? Math.ceil(bepBulan).toLocaleString('id-ID') : '∞';
  el('b-omset').textContent      = idr(omset);
  el('b-total-cost').textContent = idr(totalCost);
  el('b-net').textContent        = idr(netProfit);

  // milestones
  const msList = el('ms-list');
  if (cm > 0) {
    const bepH = Math.ceil(bepHari);
    const items = [
      { porsi: bepH,               label: 'BEP harian',          sub: 'Semua biaya tertutup, mulai impas.', col: 'var(--red)' },
      { porsi: Math.ceil(bepH*1.2),label: '+20% dari BEP',       sub: 'Zona aman, mulai menghasilkan profit.', col: 'var(--amber)' },
      { porsi: target,             label: `Target kamu (${target} porsi)`, sub: `Profit per hari ≈ ${idr(Math.max(0,(target - bepH) * cm))}`, col: target >= bepH ? 'var(--green)' : 'var(--red)' },
    ];
    msList.innerHTML = items.map(it => `
      <div class="milestone-row">
        <div class="milestone-num" style="color:${it.col}">${it.porsi}</div>
        <div class="milestone-text">
          <strong>${it.label}</strong>
          ${it.sub}
        </div>
      </div>
    `).join('');
  } else {
    msList.innerHTML = '<div style="font-size:13px;color:var(--text3);padding:10px 0">Contribution margin negatif — harga jual lebih kecil dari HPP.</div>';
  }

  // insight
  if (cm <= 0) {
    setInsight('bep-insight', 'Contribution margin negatif! Harga jual lebih kecil dari HPP. Bisnis ini pasti rugi berapapun porsi yang terjual.', 'bad');
  } else if (bepHari > target) {
    setInsight('bep-insight',
      `Target ${target} porsi/hari belum cukup untuk BEP. Kamu perlu minimal ${Math.ceil(bepHari)} porsi/hari, atau kurangi fixed cost menjadi di bawah ${idr(cm * target * hari)}/bulan.`,
      'bad');
  } else {
    const r = target / bepHari;
    setInsight('bep-insight',
      `BEP tercapai di ${Math.ceil(bepHari)} porsi/hari. Dengan target ${target} porsi/hari, estimasi net profit ${idr(netProfit)}/bulan.`,
      r >= 1.3 ? 'good' : 'warn');
  }

  // BEP chart
  const maxP  = Math.max(target, Math.ceil(bepHari)) * 1.4;
  const steps = 10;
  const labels= Array.from({ length: steps + 1 }, (_, k) => Math.round(k * (maxP / steps)));
  const rev   = labels.map(p => p * hari * hjB);
  const tc    = labels.map(p => totalFixed + p * hari * hppB);
  const fc2   = labels.map(()  => totalFixed);

  const cfg = {
    type: 'line',
    data: {
      labels: labels.map(p => p + ' porsi'),
      datasets: [
        { label: 'Pendapatan', data: rev, borderColor: '#4a9eff', borderWidth: 2, pointRadius: 0, tension: 0.3, fill: false },
        { label: 'Total cost',  data: tc,  borderColor: '#888880', borderWidth: 2, pointRadius: 0, tension: 0.3, fill: false, borderDash: [5, 4] },
        { label: 'Fixed cost',  data: fc2, borderColor: '#e86c3a', borderWidth: 1.5, pointRadius: 0, tension: 0, fill: false, borderDash: [3, 3] },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ctx.dataset.label + ': ' + idr(ctx.raw)
          }
        }
      },
      scales: {
        x: {
          ticks: { font: { size: 11 }, color: '#5c5752', maxTicksLimit: 7 },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: {
            font: { size: 11 }, color: '#5c5752',
            callback: v => v >= 1000000 ? 'Rp ' + (v/1000000).toFixed(1) + 'jt' : v >= 1000 ? 'Rp ' + (v/1000).toFixed(0) + 'rb' : 'Rp ' + v
          },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  };

  if (bepChart) { bepChart.destroy(); }
  bepChart = new Chart(el('bep-chart'), cfg);

  // sync proyeksi
  el('pj-fixed').value = totalFixed;
  calcProj();
}

/* ========================
   TAB 3: PROYEKSI
======================== */
let projChart = null;

function calcProj() {
  const porsi  = +(el('pj-porsi').value)  || 0;
  const hr     = +(el('pj-hari').value)   || 26;
  const hj2    = +(el('pj-hj').value)     || 1;
  const hpp2   = +(el('pj-hpp').value)    || 0;
  const fixed2 = +(el('pj-fixed').value)  || 0;
  const growth = +(el('pj-growth').value) || 0;

  const totalP    = porsi * hr;
  const omset     = totalP * hj2;
  const totalHPP  = totalP * hpp2;
  const gp        = omset - totalHPP;
  const np        = gp - fixed2;
  const gpPct     = omset > 0 ? gp / omset * 100 : 0;
  const npPct     = omset > 0 ? np / omset * 100 : 0;
  const fcPct2    = omset > 0 ? totalHPP / omset * 100 : 0;

  el('pj-omset').textContent     = idr(omset);
  el('pj-total-hpp').textContent = idr(totalHPP);
  el('pj-gp').textContent        = idr(gp);
  el('pj-fc-disp').textContent   = idr(fixed2);
  el('pj-np').textContent        = idr(np);
  el('pj-gm-pct').textContent    = pct(gpPct);
  el('pj-nm-pct').textContent    = pct(npPct);
  el('pj-fc-pct').textContent    = pct(fcPct2);

  // 12 month projections
  const g = 1 + growth / 100;
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
  const mOmset = months.map((_, i) => omset * Math.pow(g, i));
  const mGp    = months.map((_, i) => gp * Math.pow(g, i));
  const mNp    = months.map((_, i) => np * Math.pow(g, i));
  const mCost  = months.map((_, i) => (totalHPP + fixed2) * Math.pow(g, i));

  const annualOmset = mOmset.reduce((s, v) => s + v, 0);
  const annualNp    = mNp.reduce((s, v) => s + v, 0);

  el('pj-annual').textContent    = idr(annualOmset);
  el('pj-annual-np').textContent = idr(annualNp);

  // payback row
  const pb = el('payback-row');
  if (np > 0) {
    pb.textContent = `Jika modal awal Rp 50 jt, estimasi balik modal ≈ ${Math.ceil(50000000 / np)} bulan.`;
  } else {
    pb.textContent = 'Saat ini masih merugi — selesaikan proyeksi agar estimasi balik modal muncul.';
  }

  // insight
  if (np < 0) {
    setInsight('proj-insight', `Rugi ${idr(Math.abs(np))}/bulan. Perlu naikkan porsi, harga, atau pangkas fixed cost sebesar ${idr(Math.abs(np))}.`, 'bad');
  } else if (npPct < 10) {
    setInsight('proj-insight', `Net margin ${pct(npPct)} — tipis. Idealnya FnB kasual minimal 15–20%. Evaluasi fixed cost atau volume penjualan.`, 'warn');
  } else {
    setInsight('proj-insight', `Net margin ${pct(npPct)} — sehat! Profit bersih ${idr(np)}/bulan atau ${idr(annualNp)}/tahun.`, 'good');
  }

  // chart
  const projCfg = {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        { label: 'Omset',        data: mOmset, backgroundColor: 'rgba(74,158,255,0.2)',  borderColor: '#4a9eff', borderWidth: 1.5 },
        { label: 'Gross profit', data: mGp,    backgroundColor: 'rgba(61,184,122,0.2)', borderColor: '#3db87a', borderWidth: 1.5 },
        { label: 'Net profit',   data: mNp,    backgroundColor: 'rgba(29,158,117,0.3)', borderColor: '#1d9e75', borderWidth: 1.5 },
        { label: 'Total cost',   data: mCost,  type: 'line', borderColor: '#e86c3a', borderWidth: 1.5, pointRadius: 3, pointBackgroundColor: '#e86c3a', tension: 0.3, fill: false, borderDash: [4, 3] },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ctx.dataset.label + ': ' + idr(ctx.raw) } }
      },
      scales: {
        x: {
          ticks: { font: { size: 11 }, color: '#5c5752' },
          grid: { display: false }
        },
        y: {
          ticks: {
            font: { size: 11 }, color: '#5c5752',
            callback: v => v >= 1000000 ? 'Rp ' + (v/1000000).toFixed(1) + 'jt' : 'Rp ' + (v/1000).toFixed(0) + 'rb'
          },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      }
    }
  };

  if (projChart) { projChart.destroy(); }
  projChart = new Chart(el('proj-chart'), projCfg);

  // Sync to gaji tab
  el('gaji-gp').value = Math.round(gp);
  el('gaji-np').value = Math.round(np);
  calcGaji();
}

/* ========================
   TAB 4: GAJI KARYAWAN
======================== */
let staffs = [];

function renderStaff() {
  const tb = el('gaji-staff-body');
  tb.innerHTML = '';
  staffs.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" value="${s.posisi}" placeholder="Misal: Barista" oninput="staffs[${i}].posisi=this.value"/></td>
      <td><input type="number" value="${s.jml}" min="0" oninput="staffs[${i}].jml=+this.value;calcGaji()"/></td>
      <td><input type="number" value="${s.gaji}" min="0" style="text-align:right" oninput="staffs[${i}].gaji=+this.value;calcGaji()"/></td>
      <td><button class="del-btn" onclick="staffs.splice(${i},1);renderStaff()" title="Hapus">✕</button></td>
    `;
    tb.appendChild(tr);
  });
  calcGaji();
}

function addStaff() {
  staffs.push({ posisi: '', jml: 1, gaji: 0 });
  renderStaff();
}

function setGajiAllocation(pct) {
  el('gaji-allocation').value = pct;
  document.querySelectorAll('.alloc-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  calcGaji();
}

function calcGaji() {
  const gp = +(el('gaji-gp').value) || 0;
  const np = +(el('gaji-np').value) || 0;
  const jmlKaryawan = +(el('gaji-jml-karyawan').value) || 1;
  const allocation = +(el('gaji-allocation').value) || 25;

  const budgetGaji = Math.round(gp * (allocation / 100));
  const gajiPerKaryawan = jmlKaryawan > 0 ? Math.round(budgetGaji / jmlKaryawan) : 0;
  const sisaProfit = np - budgetGaji;
  const sisaPct = gp > 0 ? ((gp - budgetGaji) / gp) * 100 : 0;

  el('gaji-budget').textContent = idr(budgetGaji);
  el('gaji-budget-pct').textContent = allocation.toFixed(1) + '%';
  el('gaji-per-karyawan').textContent = idr(gajiPerKaryawan);
  el('gaji-sisa-profit').textContent = idr(sisaProfit);
  el('gaji-sisa-pct').textContent = sisaPct.toFixed(1) + '%';

  // Staff summary
  let totalGajiStaff = 0;
  staffs.forEach(s => {
    totalGajiStaff += s.jml * s.gaji;
  });

  if (!gp) {
    setInsight('gaji-insight', 'Masukkan gross profit untuk melihat rekomendasi gaji.', 'neutral');
    return;
  }

  if (totalGajiStaff > budgetGaji) {
    const kelebihan = totalGajiStaff - budgetGaji;
    setInsight('gaji-insight',
      `Total gaji tim: ${idr(totalGajiStaff)} — melebihi budget ${idr(kelebihan)}. Pertimbangkan kurangi jumlah staff atau optimalkan struktur gaji.`,
      'warn');
  } else if (totalGajiStaff > 0) {
    const sisa = budgetGaji - totalGajiStaff;
    setInsight('gaji-insight',
      `Total gaji tim: ${idr(totalGajiStaff)} — efisien. Sisa budget ${idr(sisa)} bisa untuk bonus atau cadangan.`,
      'good');
  } else {
    setInsight('gaji-insight',
      `Budget gaji yang ideal: ${idr(gajiPerKaryawan)}/orang × ${jmlKaryawan} karyawan = ${idr(budgetGaji)}/bulan.`,
      'neutral');
  }
}

/* ========================
   INIT
======================== */
initDrinksMenu();
renderBahan();
renderOps();
renderFixed();
renderStaff();

/* ========================
   RESPONSIVE HANDLER
======================== */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (bepChart) { bepChart.resize(); }
    if (projChart) { projChart.resize(); }
  }, 250);
});

/* Prevent zoom on iOS input focus */
document.addEventListener('touchstart', function() {}, false);