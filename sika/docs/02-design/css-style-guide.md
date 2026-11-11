# CSS Style Guide SIKA (Bab 3)

Stylesheet: `assets/css/style.css` (satu file untuk semua halaman).

## 1. Design Tokens

| Token | Nilai | Fungsi |
|---|---|---|
| `--primary` | `#1d4ed8` | Warna utama (nav, tombol, judul header) |
| `--primary-dark` | `#1e40af` | Hover/focus/aktif pada nav dan tombol |
| `--surface` | `#ffffff` | Latar kartu, form, tabel |
| `--background` | `#f3f4f6` | Latar halaman |
| `--text` | `#1f2937` | Teks utama |
| `--muted` | `#4b5563` | Teks sekunder (kontras diperkuat dari modul) |
| `--border` | `#d1d5db` | Garis pembatas |
| `--error` / `--error-bg` | `#b91c1c` / `#fef2f2` | Status error |
| `--success` / `--success-bg` | `#166534` / `#f0fdf4` | Status sukses |
| `--focus` | `#f59e0b` | Outline focus keyboard |

## 2. Tipografi

- Font: Arial, Helvetica, sans-serif; `line-height: 1.6`.
- `h1` 1.75rem, `h2` 1.35rem, `h3` 1.1rem, body 1rem.
- Satuan relatif (`rem`) untuk teks dan spacing.

## 3. Spacing, Radius, Container

- Skala spacing: 0.5rem, 1rem, 1.5rem, 2rem (`--space-1..4`).
- Radius: 0.75rem (kartu/form), 0.4rem (input/tombol).
- Container: `width: min(100% - 2rem, 1100px); margin-inline: auto;`
- `box-sizing: border-box` untuk semua elemen.

## 4. Komponen

| Komponen | Class/Selector | Layout |
|---|---|---|
| Navigasi | `nav ul` | Flexbox (satu dimensi) |
| Dashboard | `.dashboard-grid` + `.card` | Grid (dua dimensi) |
| Profil | `.profile` | Grid 180px + 1fr |
| Tabel | `.table-wrapper` + `table` | Overflow-x pada layar kecil |
| Form | `form`, `.form-group`, `.form-row` | Grid dua kolom mulai 768px |
| Pesan status | `.message-error`, `.message-success` | Flex: ikon + teks + border |
| Tombol | `button`, `.btn-secondary` | Flex group |

## 5. Aturan Penamaan Class

- Huruf kecil, kata dipisah tanda hubung (`dashboard-grid`, `form-row`).
- Nama berdasarkan fungsi, bukan tampilan.
- ID tidak dipakai untuk styling.
- Tidak memakai inline style.

## 6. Breakpoint (mobile-first)

| Breakpoint | Perubahan |
|---|---|
| Dasar (<640px) | Satu kolom, nav vertikal |
| >= 640px | Dashboard 2 kolom |
| >= 700px | Profil: foto di samping info |
| >= 768px | Form dua kolom |
| >= 960px | Dashboard 3 kolom |

Breakpoint dipilih dari titik layout mulai terasa sempit/renggang, bukan nama perangkat.

## 7. State Visual

- Focus: outline 3px `--focus` + offset 2px pada input, select, textarea, tombol, link nav.
- Halaman aktif pada nav: `aria-current="page"` + garis bawah + tebal (tidak hanya warna).
- Error/success: warna + ikon + teks berlabel + border kiri tebal.

## 8. Urutan File CSS

1 Reset/Base, 2 Variables, 3 Typography, 4 Layout, 5 Components, 6 Forms & Tables, 7 Media Queries.
