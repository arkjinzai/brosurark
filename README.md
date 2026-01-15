# Website Brosur ARK (Static)

Website (HTML/CSS/JS) yang menampilkan brosur dalam format website.

## Cara pakai

1. Buka `index.html` (double click) atau jalankan dengan Live Server (VS Code) agar navigasi & efeknya terasa lebih halus.
2. Ganti gambar placeholder di folder `assets/` dengan gambar brosur asli Anda.
   - Pertahankan **nama file** agar tidak perlu ubah kode.
3. Di mode brosur, scroll untuk pindah halaman.

## Struktur

- `index.html` — isi website
- `styles.css` — tampilan
- `script.js` — pager aktif, shortcut panah atas/bawah
- `assets/` — tempat gambar (placeholder SVG sudah disiapkan)

## Nama gambar yang dipakai

Silakan replace file berikut. Website akan mencoba memuat versi `.jpg` dulu, lalu otomatis fallback ke `.svg` jika `.jpg` belum ada:

- `assets/brosur-hero.jpg` (fallback: `.svg`)
- `assets/brosur-persyaratan.jpg` (fallback: `.svg`)
- `assets/brosur-alur-proses.jpg` (fallback: `.svg`)
- `assets/brosur-gallery.jpg` (fallback: `.svg`)
- `assets/brosur-tentang-kami.jpg` (fallback: `.svg`)
- `assets/brosur-kontak.jpg` (fallback: `.svg`)
- `assets/logo-koso.jpg` (ikon tab; masih ada cadangan `.svg`)

## (Opsional) Galeri per-foto

Jika Anda ingin grid galeri foto (bukan hanya brosur), siapkan file seperti ini di `assets/`:

- `gallery-01.jpg`
- `gallery-02.jpg`
- `gallery-03.jpg`
- ... dst



