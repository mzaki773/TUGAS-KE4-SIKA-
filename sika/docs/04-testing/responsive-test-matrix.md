# Responsive Test Matrix SIKA (Bab 3)

Alat: Browser Developer Tools > Responsive/Device Toolbar.
Viewport sampel: 360 px (mobile), 768 px (medium), 1200 px (desktop).

> Template ini sudah diisi dengan hasil yang diharapkan dari kode awal. **Isi ulang kolom "Hasil" dan "Bukti" dengan pengamatan Anda sendiri**, lalu tambahkan screenshot sebelum/sesudah pada folder `docs/04-testing/screenshots/`.

## Matriks Pengujian

| Halaman | Viewport | Hasil | Defect | Perbaikan | Bukti |
|---|---|---|---|---|---|
| index.html | 360 px | Dashboard 1 kolom, nav vertikal | - | - | screenshots/index-360.png |
| index.html | 768 px | Dashboard 2 kolom, nav horizontal | - | - | screenshots/index-768.png |
| index.html | 1200 px | Dashboard 3 kolom | - | - | screenshots/index-1200.png |
| mahasiswa.html | 360 px | Profil 1 kolom, tabel bisa digeser horizontal | Tabel melebihi lebar layar | Dibungkus `.table-wrapper` dengan `overflow-x: auto` | screenshots/mhs-360.png |
| mahasiswa.html | 768 px | Foto di samping info | - | - | screenshots/mhs-768.png |
| mahasiswa.html | 1200 px | Layout rapi dalam container 1100px | - | - | screenshots/mhs-1200.png |
| form-mahasiswa.html | 360 px | Form 1 kolom | Teks hint terlalu abu-abu (kontras rendah) | `--muted` diganti `#4b5563` | screenshots/form-360.png |
| form-mahasiswa.html | 768 px | Form dua kolom | - | - | screenshots/form-768.png |
| form-mahasiswa.html | 1200 px | Form maksimal 760px | - | - | screenshots/form-1200.png |

## Pengujian Keyboard dan State

| Uji | Hasil yang diharapkan | Status |
|---|---|---|
| Tab pada link nav | Outline oranye terlihat | Isi sendiri |
| Tab pada input/select/textarea | Outline 3px terlihat | Isi sendiri |
| Tab pada tombol Simpan/Batal | Outline terlihat | Isi sendiri |
| Pesan error | Ada ikon + teks "Error:" + border, bukan hanya merah | Isi sendiri |
| Pesan sukses | Ada ikon + teks "Berhasil:" + border | Isi sendiri |
| Horizontal overflow halaman | Tidak ada, kecuali wrapper tabel | Isi sendiri |

## Catatan Breakpoint

Breakpoint 640/700/768/960 px dipilih dari perilaku layout (kartu mulai renggang, profil cukup lebar untuk dua kolom, dua input muat sebaris), bukan nama perangkat.

## Regression untuk Bab 4

Ulangi matriks ini setelah JavaScript ditambahkan untuk memastikan layout dan focus state tidak rusak.
