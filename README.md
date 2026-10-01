# BKK SMK Negeri 20 Jakarta

Portal **Bursa Kerja Khusus (BKK) SMK Negeri 20 Jakarta** — website publik (lowongan kerja, mitra perusahaan, galeri kegiatan, artikel karier) plus **dashboard admin** untuk mengelola seluruh data dari satu aplikasi.

Dibangun dengan React (Vite) di sisi klien dan Express + Sequelize + MySQL di sisi server.

---

## Fitur

**Halaman Publik (`/`)**

- Hero dengan background foto crossfade + teks statis
- Profil BKK & 3 program unggulan (pelatihan kerja, konseling karier, program magang)
- Agenda rekrutmen (Job Fair, Campus Hiring) + form pendaftaran event
- Daftar lowongan kerja dengan pencarian, filter, dan detail lowongan
- Form lamaran kerja (upload CV + ijazah) dengan kode pelacakan
- Pelacakan status lamaran via NISN / email
- Mitra perusahaan, galeri kegiatan (lightbox), artikel karier (reader)
- Kuesioner Tracer Study Alumni, WhatsApp helpdesk, tombol back-to-top

**Dashboard Admin (`/admin`)**

- Login admin (JWT, rate-limited) + ubah profil & password
- Ringkasan statistik & aktivitas terbaru
- CRUD Lowongan Kerja, Mitra Perusahaan, Galeri, Artikel (dengan upload gambar)
- Manajemen Lamaran: filter status, ubah status, unduh CV/ijazah, hapus
- Pengaturan akun admin

---

## Tech Stack

| Layer | Teknologi |
| --- | --- |
| Frontend | React 18, Vite 5, routing manual berbasis `window.location.pathname` |
| Styling | TailwindCSS 3 + CSS kustom di `src/index.css` |
| Ikon | lucide-react |
| HTTP | axios (base URL `/api`, proxy Vite) |
| Backend | Node.js, Express 5 (CommonJS) |
| Database | MySQL / MariaDB + Sequelize ORM |
| Auth | JWT (`jsonwebtoken`) + bcryptjs, disimpan di `sessionStorage` |
| Upload | multer (disk storage, maks 5MB/file) |
| Keamanan | helmet, cors, express-rate-limit, express-validator |

---

## Prasyarat

- Node.js **18+** (disarankan 20 LTS)
- MySQL 8 / MariaDB 10.4+ yang sedang berjalan
- npm

---

## Instalasi

### 1. Clone & install dependency

```bash
git clone <url-repo>
cd BKK

npm install          # frontend
cd server && npm install && cd ..   # backend
```

### 2. Buat file environment server

Buat `server/.env` (file ini tidak masuk git):

```env
# Server
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
PUBLIC_API_URL=http://localhost:5001

# JWT
JWT_SECRET=ganti-dengan-string-rahasia-anda
JWT_EXPIRES_IN=8h

# Database
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password-mysql-anda
MYSQL_DATABASE=job_portal

# Seeder admin (opsional, ada nilai default)
ADMIN_SEED_NAME=Administrator BKK
ADMIN_SEED_EMAIL=admin.bkk@smkn20jakarta.sch.id
ADMIN_SEED_PASSWORD=admin123
```

> **Penting:** Vite mem-proxy `/api` ke `http://127.0.0.1:5001`, jadi isi `PORT=5001` di `.env` (default kode server adalah `5000`).

### 3. Siapkan database

Buat database lalu import schema dasar:

```sql
CREATE DATABASE job_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
mysql -u root -p job_portal < server/migrations/database.sql
```

Lalu jalankan migrasi idempotent (menambah kolom & menormalkan enum status):

```bash
node server/migrate.js
```

### 4. Buat akun admin

```bash
npm run seed:admin
# atau dengan kredensial sendiri:
node server/seeders/admin.js "admin@smkn20.sch.id" "PasswordKuat123" "Admin BKK"
```

Kredensial default jika tidak diisi argumen: `admin.bkk@smkn20jakarta.sch.id` / `admin123`.

### 5. Jalankan aplikasi

Dua terminal:

```bash
# Terminal 1 — API
npm run server        # http://localhost:5001

# Terminal 2 — frontend
npm run dev          # http://localhost:3000
```

Buka `http://localhost:3000` untuk situs publik, `http://localhost:3000/admin` untuk dashboard admin.

---

## Scripts

| Command | Keterangan |
| --- | --- |
| `npm run dev` | Jalankan Vite dev server (port 3000) |
| `npm run build` | Build produksi ke `dist/` |
| `npm run preview` | Preview hasil build |
| `npm run server` | Jalankan Express API (`node server/server.js`) |
| `npm run server:dev` | Jalankan API dengan watch mode |
| `npm run seed:admin` | Buat/perbarui akun admin |
| `node server/migrate.js` | Migrasi database (aman diulang) |
| `node server/check-db.js` | Cek koneksi database |
| `node server/check-update.js` | Cek pembaruan (opsional) |

---

## Struktur Project

```
.
├── index.html                 # Entry HTML, load Google Fonts
├── vite.config.js             # Dev server + proxy /api & /uploads
├── tailwind.config.js         # Theme BKK (warna, font, shadow)
├── src/
│   ├── main.jsx               # Root React
│   ├── App.jsx                # Routing halaman publik + orchestrator modal
│   ├── index.css              # Tailwind + CSS kustom (termasuk workspace admin)
│   ├── assets/                # Logo sekolah
│   ├── components/
│   │   ├── Navbar.jsx         # Navigasi + pencarian + menu user
│   │   ├── Hero.jsx           # Hero background slideshow + teks statis
│   │   ├── ProfilAndProgram.jsx
│   │   ├── KegiatanRekrutmen.jsx
│   │   ├── LowonganKerja.jsx
│   │   ├── MitraPerusahaan.jsx
│   │   ├── GaleriKegiatan.jsx
│   │   ├── ArtikelKarir.jsx
│   │   ├── Footer.jsx
│   │   ├── Toast.jsx
│   │   ├── AdminDashboard.jsx # Halaman /admin (login + dashboard)
│   │   └── Modals/            # Auth, ApplyJob, JobDetail, Tracer, dll
│   ├── data/mockData.js       # Data statis (hero, program, event, FAQ, info sekolah)
│   ├── services/              # Wrapper axios per fitur
│   └── api/adminApi.js        # Endpoint admin (CRUD generik)
├── server/
│   ├── server.js              # Entry API + authenticate DB
│   ├── app.js                 # Seluruh route Express
│   ├── config/database.js     # Konfigurasi Sequelize
│   ├── models/index.js        # Model Admin, Company, Job, Application, Gallery, Article
│   ├── middleware/            # auth (JWT), validate, upload (multer), error
│   ├── migrations/            # database.sql + migrasi SQL
│   ├── seeders/admin.js       # Seeder akun admin
│   └── uploads/               # File unggahan (diabaikan git)
└── public/                    # Aset statis
```

---

## Database

| Tabel | Keterangan |
| --- | --- |
| `admin` | Akun pengelola (bcrypt hash) |
| `companies` | Mitra perusahaan (+ logo, status `active`/`inactive`) |
| `jobs` | Lowongan kerja (slug unik, status `draft`/`published`/`closed`) |
| `applications` | Lamaran pelamar (CV + ijazah, status `baru`/`ditinjau`/`lolos`/`tidak_lolos`/`diterima`) |
| `galleries` | Foto kegiatan (status `draft`/`published`) |
| `articles` | Artikel karier (slug unik, `published_at`) |

Relasi: `companies 1—N jobs 1—N applications`.

---

## API

Semua response memakai bentuk:

```json
{ "success": true, "message": "...", "data": ... }
```

### Publik

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| GET | `/api/health` | Health check server + koneksi DB |
| GET | `/api/jobs` | Lowongan published (`?search=`) |
| GET | `/api/jobs/:id` | Detail lowongan |
| GET | `/api/companies` | Mitra aktif (tanpa email/telp/alamat) |
| GET | `/api/companies/:id` | Detail mitra |
| GET | `/api/gallery` / `/api/galleries` | Foto kegiatan published |
| GET | `/api/galleries/:id` | Detail foto |
| GET | `/api/articles` | Artikel published |
| GET | `/api/articles/:id` | Detail artikel |
| POST | `/api/applications` | Kirim lamaran (multipart: `cv`, `diploma`) |
| GET | `/api/applications/track?nisn=&email=` | Lacak status lamaran |

### Admin (wajib header `Authorization: Bearer <token>`)

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| POST | `/api/admin/login` | Login (rate limit 30/15 menit) |
| POST | `/api/admin/logout` | Logout |
| GET/PUT | `/api/admin/me` | Profil admin |
| PUT | `/api/admin/me/password` | Ganti password |
| GET | `/api/admin/dashboard` | Statistik & aktivitas terbaru |
| GET/POST | `/api/admin/jobs` | List (paginate, `?status=`, `?search=`, `?page=`, `?limit=`) / buat |
| GET/PUT/DELETE | `/api/admin/jobs/:id` | Detail / ubah / hapus |
| GET/POST | `/api/admin/companies` | List / buat |
| GET/PUT/DELETE | `/api/admin/companies/:id` | Detail / ubah / hapus |
| GET/POST | `/api/admin/gallery` | List / buat |
| GET/PUT/DELETE | `/api/admin/gallery/:id` | Detail / ubah / hapus |
| GET/POST | `/api/admin/articles` | List / buat |
| GET/PUT/DELETE | `/api/admin/articles/:id` | Detail / ubah / hapus |
| GET | `/api/admin/applications` | List lamaran (`?status=`, `?search=`) |
| GET/PUT/DELETE | `/api/admin/applications/:id` | Detail / ubah status / hapus |
| GET | `/api/admin/applications/:id/document/:type` | Unduh `cv` atau `diploma` |

### Media statis

`/uploads/public/{companies,jobs,gallery,articles}` dilayani langsung. Dokumen pelamar (`cv`, `diploma`) **tidak** publik — hanya lewat endpoint auth di atas.

---

## Upload

| Field | Folder | Tipe diizinkan |
| --- | --- | --- |
| `logo` | `uploads/companies` | jpg, png, webp |
| `image` (jobs) | `uploads/jobs` | jpg, png, webp |
| `image` (gallery) | `uploads/gallery` | jpg, png, webp |
| `thumbnail` | `uploads/articles` | jpg, png, webp |
| `cv` | `uploads/cv` | pdf, doc, docx |
| `diploma` | `uploads/diploma` | pdf, jpg, png |

Batas ukuran **5 MB** per file. Folder dibuat otomatis saat upload pertama.

---

## Environment Variables

| Variabel | Default | Keterangan |
| --- | --- | --- |
| `PORT` | `5000` | Port API (isi `5001` agar sesuai proxy Vite) |
| `NODE_ENV` | – | `development` / `production` |
| `CLIENT_URL` | `http://localhost:3000` | Origin yang diizinkan CORS |
| `PUBLIC_API_URL` | host request | Basis URL untuk gambar yang dikembalikan API |
| `JWT_SECRET` | `secret-key` | **Wajib diganti** di produksi |
| `JWT_EXPIRES_IN` | `8h` | Masa berlaku token |
| `MYSQL_HOST` / `MYSQL_PORT` | `127.0.0.1` / `3306` | Koneksi database |
| `MYSQL_USER` / `MYSQL_PASSWORD` | `root` / – | Kredensial database |
| `MYSQL_DATABASE` | `job_portal` | Nama database |
| `VITE_API_URL` | `/api` | Override base URL axios di frontend |

---

## Catatan

- Data seperti hero, program BKK, agenda rekrutmen, dan info sekolah masih statis di `src/data/mockData.js`; lowongan, mitra, galeri, dan artikel diambil dari API.
- Form login admin masih ter-prefill `admin@example.com` / `ChangeMe123!` di `src/components/AdminDashboard.jsx` — ganti dengan kredensial hasil seeder.
- `server/uploads/` diabaikan git; backup folder tersebut bila menyimpan berkas CV pelamar.
- Jalankan `node server/migrate.js` setiap kali ada perubahan skema sebelum menyalakan API.