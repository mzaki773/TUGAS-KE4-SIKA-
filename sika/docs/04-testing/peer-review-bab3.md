# Peer Review Bab 3 - SIKA

Reviewer: ______________  Pemilik repository: ______________  Tanggal: ______________

> Reviewer **tidak mengubah kode**, hanya mencatat temuan. Tugas mewajibkan minimal 3 temuan dan 2 perbaikan. Contoh baris di bawah adalah contoh format; ganti dengan temuan nyata.

## Checklist

| Aspek | Ya/Tidak | Catatan |
|---|---|---|
| Semua halaman memakai CSS eksternal yang sama | | |
| Tidak ada inline style | | |
| Spacing dan tipografi konsisten | | |
| Flexbox/Grid sesuai kasus | | |
| Tidak ada overflow horizontal tak disengaja | | |
| Focus state terlihat | | |
| Error/success tidak hanya warna | | |
| Selector mudah dipelihara (tanpa ID/selector terlalu panjang) | | |
| Tidak ada asumsi bahwa elemen tersembunyi = aman | | |

## Temuan dan Tindak Lanjut

| No | Temuan | Dampak | Perbaikan | Status |
|---|---|---|---|---|
| 1 | (contoh) Warna teks sekunder kurang kontras | Sulit dibaca | Ubah `--muted` menjadi `#4b5563` | Selesai |
| 2 | (contoh) Halaman aktif pada nav hanya dibedakan warna | Tidak jelas bagi buta warna | Tambah garis bawah dan `aria-current` | Selesai |
| 3 | (contoh) Tabel melampaui layar 360px | Overflow halaman | Bungkus dengan `.table-wrapper` | Selesai |
