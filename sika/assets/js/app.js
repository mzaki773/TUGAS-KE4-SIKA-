/* SIKA - Bab 4: Interaktivitas dengan JavaScript (Vanilla JS)
   File ini dibuat agar langsung bekerja dengan HTML buatan sendiri:
   - form-mahasiswa.html : memakai id nim, nama, email, prodi, angkatan yang sudah ada.
                           Pesan error, pratinjau nama, dan CSS pendukung dibuat otomatis oleh script.
   - mahasiswa.html      : script menambahkan bagian Status Aplikasi serta Daftar Mahasiswa + pencarian.
   - index.html          : tidak terpengaruh.
   Catatan keamanan:
   - Tidak ada secret/credential di file ini.
   - Validasi client-side hanya untuk UX; server (PHP, Bab 6) wajib validasi ulang.
   - Semua teks ditampilkan dengan textContent, bukan innerHTML. */

console.log('JavaScript SIKA aktif');

/* ========== 0. Aturan validasi (ubah di sini bila aturan kampus berbeda) ========== */
const NIM_PATTERN = /^[A-Za-z]{2}\d{8}$/;   // contoh: TI22250021 (2 huruf + 8 digit)
const NAMA_MIN = 3;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ANGKATAN_MIN = 2020;
const ANGKATAN_MAX = 2030;

// Data contoh untuk tabel pencarian (array of object)
const DATA_MAHASISWA = [
  { nim: 'TI22250023', nama: 'M.ZAKI ISMAIL', prodi: 'Teknik Informatika' },
  { nim: 'TI22250022', nama: 'Andi Pratama', prodi: 'Teknik Informatika' },
  { nim: 'SI22250031', nama: 'Siti Rahma', prodi: 'Sistem Informasi' },
  { nim: 'SI22250032', nama: 'Budi Santoso', prodi: 'Sistem Informasi' }
];

/* ========== 1. Fungsi bantu DOM ========== */
function buatElemen(tag, atribut, teks) {
  const el = document.createElement(tag);
  if (atribut) {
    Object.keys(atribut).forEach(function (key) {
      el.setAttribute(key, atribut[key]);
    });
  }
  if (teks !== undefined) el.textContent = teks;   // textContent, bukan innerHTML
  return el;
}

function pasangCss() {
  if (document.getElementById('sika-bab4-style')) return;
  const style = buatElemen('style', { id: 'sika-bab4-style' });
  style.textContent =
    '.error-message{display:block;min-height:1.2rem;margin-top:.25rem;color:#b42318;font-size:.875rem;}' +
    '.input-error{border-color:#b42318 !important;outline-color:#b42318;}' +
    '.status{color:#5b6676;}.success{color:#067647;}' +
    '.table-wrap{overflow-x:auto;}' +
    '#tabelMahasiswa{width:100%;border-collapse:collapse;}' +
    '#tabelMahasiswa th,#tabelMahasiswa td{text-align:left;padding:.5rem .65rem;border-bottom:1px solid #d5dae1;}' +
    'tr[hidden]{display:none;}' +
    '#pesanKosong{font-style:italic;color:#5b6676;}' +
    '.preview-nama{color:#5b6676;font-size:.9rem;}';
  document.head.appendChild(style);
}

function pastikanElemenError(input, id) {
  let el = document.getElementById(id);
  if (!el) {
    el = buatElemen('small', { id: id, class: 'error-message', 'aria-live': 'polite' });
    input.insertAdjacentElement('afterend', el);
  }
  return el;
}

function setError(input, errorEl, pesan) {
  errorEl.textContent = pesan;
  input.classList.add('input-error');
}

function clearError(input, errorEl) {
  errorEl.textContent = '';
  input.classList.remove('input-error');
}

/* ========== 2. Halaman form-mahasiswa.html ========== */
function initFormMahasiswa() {
  const nim = document.getElementById('nim');
  const nama = document.getElementById('nama');
  const email = document.getElementById('email');
  const prodi = document.getElementById('prodi');
  const angkatan = document.getElementById('angkatan');

  // Hanya jalan di halaman yang benar-benar punya semua field ini
  if (!nim || !nama || !email || !prodi || !angkatan) return;
  const form = nim.closest('form');
  if (!form) return;

  form.noValidate = true;   // matikan balon validasi bawaan browser agar pesan kustom tampil

  const errorNim = pastikanElemenError(nim, 'errorNim');
  const errorNama = pastikanElemenError(nama, 'errorNama');
  const errorEmail = pastikanElemenError(email, 'errorEmail');
  const errorProdi = pastikanElemenError(prodi, 'errorProdi');
  const errorAngkatan = pastikanElemenError(angkatan, 'errorAngkatan');

  // Pratinjau nama (membuktikan input tampil sebagai teks, bukan HTML)
  let previewNama = document.getElementById('previewNama');
  if (!previewNama) {
    const p = buatElemen('p', { class: 'preview-nama' }, 'Pratinjau nama: ');
    previewNama = buatElemen('strong', { id: 'previewNama' });
    p.appendChild(previewNama);
    errorNama.insertAdjacentElement('afterend', p);
  }

  function validateNim() {
    if (!NIM_PATTERN.test(nim.value.trim())) {
      setError(nim, errorNim, 'NIM harus 2 huruf diikuti 8 digit angka (contoh: TI22250019).');
      return false;
    }
    clearError(nim, errorNim);
    return true;
  }

  function validateNama() {
    if (nama.value.trim().length < NAMA_MIN) {
      setError(nama, errorNama, 'Nama minimal ' + NAMA_MIN + ' karakter.');
      return false;
    }
    clearError(nama, errorNama);
    return true;
  }

  function validateEmail() {
    if (!EMAIL_PATTERN.test(email.value.trim())) {
      setError(email, errorEmail, 'Format email tidak valid.');
      return false;
    }
    clearError(email, errorEmail);
    return true;
  }

  function validateProdi() {
    if (prodi.value === '') {
      setError(prodi, errorProdi, 'Program studi wajib dipilih.');
      return false;
    }
    clearError(prodi, errorProdi);
    return true;
  }

  function validateAngkatan() {
    const nilai = angkatan.value.trim();
    const tahun = Number(nilai);
    if (nilai === '' || !Number.isInteger(tahun)) {
      setError(angkatan, errorAngkatan, 'Angkatan wajib diisi dengan angka tahun.');
      return false;
    }
    if (tahun < ANGKATAN_MIN || tahun > ANGKATAN_MAX) {
      setError(angkatan, errorAngkatan, 'Angkatan harus antara ' + ANGKATAN_MIN + ' dan ' + ANGKATAN_MAX + '.');
      return false;
    }
    clearError(angkatan, errorAngkatan);
    return true;
  }

  function resetFeedback() {
    clearError(nim, errorNim);
    clearError(nama, errorNama);
    clearError(email, errorEmail);
    clearError(prodi, errorProdi);
    clearError(angkatan, errorAngkatan);
    previewNama.textContent = '';
  }

  // Validasi saat pengguna selesai mengisi field
  nim.addEventListener('blur', validateNim);
  nama.addEventListener('blur', validateNama);
  email.addEventListener('blur', validateEmail);
  prodi.addEventListener('change', validateProdi);
  angkatan.addEventListener('blur', validateAngkatan);

  // Pemulihan: pesan error hilang begitu input diperbaiki
  nim.addEventListener('input', function () { if (errorNim.textContent) validateNim(); });
  nama.addEventListener('input', function () {
    if (errorNama.textContent) validateNama();
    previewNama.textContent = nama.value;
  });
  email.addEventListener('input', function () { if (errorEmail.textContent) validateEmail(); });
  angkatan.addEventListener('input', function () { if (errorAngkatan.textContent) validateAngkatan(); });

  form.addEventListener('reset', resetFeedback);

  form.addEventListener('submit', function (event) {
    // Jalankan semua validasi (tidak berhenti di error pertama)
    const nimValid = validateNim();
    const namaValid = validateNama();
    const emailValid = validateEmail();
    const prodiValid = validateProdi();
    const angkatanValid = validateAngkatan();

    // Bab 4 belum menyimpan ke server, jadi aksi default selalu dicegah.
    event.preventDefault();

    if (!nimValid || !namaValid || !emailValid || !prodiValid || !angkatanValid) return;
    alert('Validasi berhasil. Data siap diproses pada tahap PHP.');
  });
}

/* ========== 3. Halaman mahasiswa.html ========== */
function initProfilMahasiswa() {
  const nama = location.pathname.split('/').pop().toLowerCase();
  const main = document.querySelector('main');
  const sudahAdaTabel = document.getElementById('tabelMahasiswa');

  // Hanya menambah bagian baru di halaman mahasiswa.html (bukan form-mahasiswa.html)
  if (!main) return;
  if (nama !== 'mahasiswa.html' && !sudahAdaTabel) return;

  /* --- Status aplikasi (klik tombol -> ubah teks & class) --- */
  if (!document.getElementById('btnCek')) {
    const sectionStatus = buatElemen('section');
    sectionStatus.appendChild(buatElemen('h2', null, 'Status Aplikasi'));
    sectionStatus.appendChild(buatElemen('p', { id: 'statusAplikasi', class: 'status' }, 'Siap digunakan'));
    sectionStatus.appendChild(buatElemen('button', { type: 'button', id: 'btnCek' }, 'Cek Status'));
    main.appendChild(sectionStatus);
  }

  const btnCek = document.getElementById('btnCek');
  const statusAplikasi = document.getElementById('statusAplikasi');
  if (btnCek && statusAplikasi) {
    btnCek.addEventListener('click', function () {
      statusAplikasi.textContent = 'SIKA aktif dan JavaScript berjalan.';
      statusAplikasi.classList.add('success');
    });
  }

  /* --- Daftar mahasiswa + pencarian --- */
  if (!document.getElementById('tabelMahasiswa')) {
    const section = buatElemen('section');
    section.appendChild(buatElemen('h2', null, 'Daftar Mahasiswa'));
    section.appendChild(buatElemen('label', { for: 'cariMahasiswa' }, 'Cari Mahasiswa'));
    section.appendChild(buatElemen('input', {
      type: 'search', id: 'cariMahasiswa', placeholder: 'Cari NIM atau nama...', autocomplete: 'off'
    }));

    const wrap = buatElemen('div', { class: 'table-wrap' });
    const tabel = buatElemen('table', { id: 'tabelMahasiswa' });
    tabel.appendChild(buatElemen('caption', null, 'Daftar mahasiswa SIKA'));

    const thead = buatElemen('thead');
    const trHead = buatElemen('tr');
    ['NIM', 'Nama', 'Program Studi'].forEach(function (judul) {
      trHead.appendChild(buatElemen('th', { scope: 'col' }, judul));
    });
    thead.appendChild(trHead);
    tabel.appendChild(thead);

    const tbody = buatElemen('tbody');
    DATA_MAHASISWA.forEach(function (mhs) {
      const tr = buatElemen('tr');
      tr.appendChild(buatElemen('td', null, mhs.nim));
      tr.appendChild(buatElemen('td', null, mhs.nama));
      tr.appendChild(buatElemen('td', null, mhs.prodi));
      tbody.appendChild(tr);
    });
    tabel.appendChild(tbody);
    wrap.appendChild(tabel);
    section.appendChild(wrap);
    section.appendChild(buatElemen('p', { id: 'pesanKosong', hidden: '' }, 'Data tidak ditemukan.'));
    main.appendChild(section);
  }

  const cari = document.getElementById('cariMahasiswa');
  const rows = document.querySelectorAll('#tabelMahasiswa tbody tr');
  const pesanKosong = document.getElementById('pesanKosong');

  if (cari) {
    cari.addEventListener('input', function () {
      const keyword = cari.value.trim().toLowerCase();
      let tampil = 0;
      rows.forEach(function (row) {
        const cocok = row.textContent.toLowerCase().includes(keyword);
        row.hidden = !cocok;
        if (cocok) tampil++;
      });
      if (pesanKosong) pesanKosong.hidden = tampil > 0;
    });
  }
}

/* ========== 4. Jalankan setelah HTML siap ========== */
function mulai() {
  pasangCss();
  initFormMahasiswa();
  initProfilMahasiswa();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mulai);
} else {
  mulai();
}