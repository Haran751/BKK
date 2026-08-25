# 🎓 BKK SMK Negeri 1 Jakarta - Portal Bursa Kerja Khusus

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646C9F?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_React-1.16.0-F97316?style=for-the-badge&logo=lucide&logoColor=white)

Website resmi portal **Bursa Kerja Khusus (BKK) SMK Negeri 1 Jakarta**. Platform ini dirancang untuk menjembatani siswa dan alumni dengan Dunia Usaha dan Dunia Industri (DUDI), memfasilitasi penyaluran tenaga kerja siap pakai, pemagangan, rekrutmen kampus (*campus hiring*), *job fair*, bimbingan karir, serta *tracer study*.

---

## 🌟 Fitur Utama

### 1. 📢 Beranda & Hero Section
- **Highlight Banner & Carousel**: Informasi acara penting, program unggulan, dan pengumuman rekrutmen terbaru.
- **Statistik Interaktif**: Informasi jumlah mitra industri, angka keterserapan alumni, dan program terselenggara.
- **Akses Cepat (Quick CTA)**: Tombol langsung menuju lowongan kerja, pendaftaran event, dan konsultasi karir.

### 2. 💼 Lowongan Kerja (Job Board)
- **Katalog Lowongan Terkini**: Daftar lowongan kerja penuh waktu (*full-time*), magang (*internship*), dan paruh waktu (*part-time*).
- **Pencarian & Filter**: Pencarian berdasarkan kata kunci posisi/perusahaan serta filter bidang keahlian.
- **Detail Lowongan & Lamar Cepat**: Modal rincian kualifikasi, deskripsi pekerjaan, fasilitas/benefit, dan formulir pendaftaran online langsung dengan upload CV/dokumen pendukung.

### 3. 🏢 Kegiatan Rekrutmen & Job Fair
- **Jadwal Campus Hiring & Job Fair**: Informasi tanggal pelaksanaan, lokasi, kuota, dan batas pendaftaran.
- **Pendaftaran Acara Online**: Formulir registrasi tiket/keikutsertaan event rekrutmen.

### 4. 🤝 Mitra Industri & Perusahaan (DUDI)
- Direktori dan galeri logo perusahaan ternama yang telah bekerja sama dan menandatangani MoU dengan SMKN 1 Jakarta.

### 5. 📸 Galeri Dokumentasi & Artikel Karir
- **Galeri Interaktif**: Dokumentasi kegiatan seleksi kerja, pembekalan industri, dan seremoni pelepasan kerja dengan fitur *lightbox viewer*.
- **Artikel Edukasi Karir**: Panduan pembuatan CV profesional, tips interview, etos kerja industri, dan tren teknologi.

### 6. 🛠️ Layanan Terpadu BKK (Modals & Tools)
- **Lacak Lamaran Kerja (*Application Tracker*)**: Pengecekan status seleksi lamaran secara mandiri menggunakan kode registrasi atau email.
- **Tracer Study Alumni**: Formulir pendataan jejak lulusan (bekerja, melanjutkan studi, atau wirausaha).
- **Konseling & Bimbingan Karir**: Pemesanan jadwal konsultasi karir bersama guru BK dan tim BKK.
- **Pasang Lowongan Perusahaan**: Formulir kemitraan bagi HRD/perusahaan yang ingin membuka lowongan kerja bagi lulusan SMKN 1 Jakarta.
- **Sistem Autentikasi**: Modal login & pendaftaran akun untuk kemudahan akses pelamar.
- **Helpdesk WhatsApp Terintegrasi**: Tombol cepat *floating action button* untuk konsultasi langsung via WhatsApp.

---

## 🚀 Teknologi yang Digunakan

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool & Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icon Pack**: [Lucide React](https://lucide.dev/)
- **Class Utilities**: `clsx` & `tailwind-merge`
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Poppins*)

---

## 📁 Struktur Folder Proyek

```text
bkk/
├── public/                  # Aset publik statis
├── src/
│   ├── components/          # Komponen tampilan UI utama
│   │   ├── Modals/          # Komponen modal dialog interaktif
│   │   │   ├── AboutBkkModal.jsx
│   │   │   ├── ApplicationTrackerModal.jsx
│   │   │   ├── ApplyJobModal.jsx
│   │   │   ├── ArticleReaderModal.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── CounselingBookingModal.jsx
│   │   │   ├── EventRegistrationModal.jsx
│   │   │   ├── GalleryLightboxModal.jsx
│   │   │   ├── JobDetailModal.jsx
│   │   │   ├── PostJobModal.jsx
│   │   │   └── TracerStudyModal.jsx
│   │   ├── ArtikelKarir.jsx
│   │   ├── CompanyLogo.jsx
│   │   ├── Footer.jsx
│   │   ├── GaleriKegiatan.jsx
│   │   ├── Hero.jsx
│   │   ├── KegiatanRekrutmen.jsx
│   │   ├── LowonganKerja.jsx
│   │   ├── MitraPerusahaan.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfilAndProgram.jsx
│   │   └── Toast.jsx
│   ├── data/
│   │   └── mockData.js      # Data statis (loker, event, mitra, artikel)
│   ├── App.jsx              # Komponen utama aplikasi & state management
│   ├── index.css            # Custom CSS & Tailwind directive
│   └── main.jsx             # Entry point React
├── index.html               # File HTML utama
├── package.json             # Konfigurasi dependensi dan scripts npm
├── postcss.config.js        # Konfigurasi PostCSS
├── tailwind.config.js       # Konfigurasi tema dan warna Tailwind
├── vite.config.js           # Konfigurasi bundler Vite
├── .gitignore               # Daftar berkas/folder yang diabaikan git
└── README.md                # Dokumentasi proyek
```

---

## 💻 Panduan Instalasi & Menjalankan Proyek

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas disarankan) dan `npm` atau `yarn` di komputer Anda.

### 1. Clone Repositori
```bash
git clone https://github.com/username/bkk-smkn1-jakarta.git
cd bkk
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Development)
```bash
npm run dev
```
Buka browser dan akses alamat lokal yang ditampilkan di terminal (biasanya `http://localhost:5173`).

### 4. Build untuk Lingkungan Produksi
Untuk mengompilasi dan mengoptimasi file aplikasi sebelum dideploy:
```bash
npm run build
```

Hasil build akan tersimpan pada folder `dist/`. Anda dapat menguji hasil build secara lokal dengan perintah:
```bash
npm run preview
```

---

## 🎨 Palet Warna & Desain

Desain portal ini mengusung perpaduan warna institusi yang profesional dan dinamis:
- **BKK Navy (`#0b2347`)**: Warna primer navbar, header, dan elemen branding utama.
- **BKK Blue (`#133e75`)**: Warna sekunder untuk aksen tombol dan border aktif.
- **BKK Orange (`#ff6b00`)**: Warna aksen untuk tombol aksi utama (*Call to Action*), sorotan lencana, dan notifikasi.
- **Slate & Light Sky (`#f8fafc` / `#e8f0fe`)**: Latar belakang yang bersih dan nyaman dibaca.

---

## 📄 Lisensi

Proyek ini dikembangkan untuk kebutuhan operasional **Bursa Kerja Khusus (BKK) SMK Negeri 1 Jakarta**.
Semua hak cipta dilindungi undang-undang.
