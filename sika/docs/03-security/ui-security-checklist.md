# UI Security Checklist SIKA (diperbarui Bab 3)

## Prinsip

CSS mengatur presentasi. `display:none`, `visibility:hidden`, `opacity:0`, atau class penyembunyi hanyalah keputusan UI. Pengguna dapat mengubahnya lewat Developer Tools, sehingga hak akses **harus** diperiksa di server pada setiap request sensitif (akan dibangun pada bab PHP/MariaDB).

## Security Checkpoint Bab 3

| Pertanyaan | Jawaban | Bukti |
|---|---|---|
| Apakah elemen sensitif hanya disembunyikan dengan CSS? | Tidak. Tidak ada elemen sensitif yang dilindungi hanya dengan CSS. | Review `style.css` dan HTML |
| Apakah style/pseudo-element memuat token, password, atau data sensitif? | Tidak. | `style.css` tidak memuat `content:` dengan data, tidak ada kredensial |
| Apakah tombol/fitur administratif dipahami sebagai UI saja? | Ya. Belum ada fitur admin; saat ada, tombol disembunyikan hanya untuk kenyamanan UI dan server wajib menolak request tanpa hak. | Catatan ini |
| Apakah focus state terlihat dan pesan status tidak hanya warna? | Ya. Outline 3px; error/success memakai ikon + teks + border. | Screenshot keyboard/error state (lampirkan) |
| Apakah responsive layout menyembunyikan informasi penting tanpa alternatif? | Tidak. Tidak ada konten disembunyikan pada layar kecil; tabel digeser lewat wrapper. | Responsive test matrix |

## Catatan Tambahan

- Form hanya memuat data minimum (NIM, nama, email, prodi, dst.); tidak ada kolom password.
- Kelas `.visually-hidden` hanya untuk teks bantu pembaca layar (caption tabel), bukan untuk menyembunyikan data yang dibatasi aksesnya.
- Tidak ada inline style dan tidak ada rahasia pada sisi klien.

## Pertanyaan Reflektif: Tombol "Hapus"

Jika tombol Hapus disembunyikan untuk mahasiswa biasa, server tetap harus memeriksa hak akses saat request hapus dikirim langsung (misalnya lewat URL atau alat HTTP) dan menolaknya jika pengguna tidak berhak.
