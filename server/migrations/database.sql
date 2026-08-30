CREATE DATABASE IF NOT EXISTS `job_portal`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `job_portal`;

CREATE TABLE `admin` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_admin_email` (`email`)
) ENGINE=InnoDB;

CREATE TABLE `companies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `logo` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `address` TEXT NULL,
  `industry` VARCHAR(120) NULL,
  `status` ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `phone` VARCHAR(30) NULL,
  `email` VARCHAR(150) NULL,
  `website` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_companies_name` (`name`),
  KEY `idx_companies_email` (`email`)
) ENGINE=InnoDB;

CREATE TABLE `jobs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `company_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(220) NOT NULL,
  `image` VARCHAR(255) NULL,
  `location` VARCHAR(160) NOT NULL,
  `job_type` VARCHAR(80) NOT NULL DEFAULT 'Full Time',
  `description` TEXT NOT NULL,
  `requirements` TEXT NOT NULL,
  `skills` TEXT NULL,
  `education` VARCHAR(180) NULL,
  `salary` VARCHAR(255) NULL,
  `deadline` DATE NULL,
  `status` ENUM('draft', 'published', 'closed') NOT NULL DEFAULT 'draft',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_jobs_slug` (`slug`),
  KEY `idx_jobs_company_id` (`company_id`),
  KEY `idx_jobs_status_deadline` (`status`, `deadline`)
) ENGINE=InnoDB;

CREATE TABLE `applications` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `job_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `nisn` VARCHAR(30) NULL,
  `whatsapp` VARCHAR(30) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `graduation_year` YEAR NULL,
  `average_score` DECIMAL(5,2) NULL,
  `major` VARCHAR(150) NULL,
  `main_skill` VARCHAR(200) NULL,
  `cv` VARCHAR(255) NULL,
  `diploma` VARCHAR(255) NULL,
  `cover_message` TEXT NULL,
  `status` ENUM('baru','ditinjau','lolos','tidak_lolos','diterima') NOT NULL DEFAULT 'baru',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_applications_job_id` (`job_id`),
  KEY `idx_applications_status` (`status`),
  KEY `idx_applications_email` (`email`),
  CONSTRAINT `fk_applications_job` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `articles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(280) NOT NULL,
  `thumbnail` VARCHAR(255) NULL,
  `content` LONGTEXT NOT NULL,
  `excerpt` TEXT NULL,
  `category` VARCHAR(120) NULL,
  `author` VARCHAR(120) NOT NULL,
  `status` ENUM('published', 'draft') NOT NULL DEFAULT 'draft',
  `published_at` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_articles_slug` (`slug`),
  KEY `idx_articles_status_published_at` (`status`, `published_at`)
) ENGINE=InnoDB;

CREATE TABLE `galleries` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `category` VARCHAR(120) NULL,
  `event_date` DATE NULL,
  `status` ENUM('draft','published') NOT NULL DEFAULT 'published',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_galleries_title` (`title`)
) ENGINE=InnoDB;

INSERT INTO `admin` (`name`, `email`, `password`) VALUES
  ('Administrator', 'admin@example.com', '$2b$12$bNOZ84A0HJ3PE.3CvdCa9ukR9Lc6An7eHFkuf2RSJ07zzIQBi6O3O');

INSERT INTO `companies` (`name`, `logo`, `description`, `address`, `phone`, `email`, `website`) VALUES
  ('Nusantara Teknologi Digital', 'companies/nusantara-teknologi.png', 'Perusahaan teknologi yang membangun solusi perangkat lunak untuk bisnis Indonesia.', 'Jl. Jenderal Sudirman No. 45, Jakarta Selatan', '021-5550101', 'hr@ntd.co.id', 'https://ntd.co.id'),
  ('Cakrawala Manufaktur Indonesia', 'companies/cakrawala-manufaktur.png', 'Produsen komponen otomotif dengan fasilitas produksi dan standar mutu modern.', 'Jl. Industri Raya No. 18, Bekasi', '021-5550102', 'recruitment@cakrawala.co.id', 'https://cakrawala.co.id'),
  ('Ritel Sejahtera Nusantara', 'companies/ritel-sejahtera.png', 'Jaringan ritel nasional yang menyediakan kebutuhan harian dengan layanan omnichannel.', 'Jl. Gatot Subroto No. 88, Jakarta Selatan', '021-5550103', 'karir@ritelsejahtera.co.id', 'https://ritelsejahtera.co.id'),
  ('Bank Artha Madani', 'companies/bank-artha-madani.png', 'Bank yang menghadirkan layanan keuangan aman dan mudah diakses masyarakat.', 'Jl. Asia Afrika No. 12, Bandung', '022-5550104', 'career@arthamadani.co.id', 'https://arthamadani.co.id'),
  ('LangkahKita Startup', 'companies/langkahkita.png', 'Startup pendidikan yang membantu talenta muda menemukan peluang belajar dan kerja.', 'Jl. Satrio No. 7, Jakarta Selatan', '021-5550105', 'people@langkahkita.id', 'https://langkahkita.id');

INSERT INTO `jobs` (`company_id`, `title`, `slug`, `description`, `requirements`, `location`, `job_type`, `skills`, `education`, `salary`, `deadline`, `status`) VALUES
  (1, 'Frontend Developer', 'frontend-developer-ntd', 'Mengembangkan antarmuka web yang cepat, responsif, dan mudah digunakan bersama tim produk.', 'Minimal D3/S1 Teknik Informatika; menguasai React dan JavaScript; memahami REST API dan Git.', 'Jakarta Selatan', 'Full Time', 'React, JavaScript, Git', 'D3/S1 Teknik Informatika', 'Rp 9.000.000 - Rp 15.000.000', '2026-10-31', 'published'),
  (1, 'Backend Developer', 'backend-developer-ntd', 'Membangun API dan layanan backend yang aman, terukur, dan mudah dipelihara.', 'Menguasai Node.js, Express, SQL, dan desain API.', 'Jakarta Selatan', 'Full Time', 'Node.js, Express, SQL', 'D3/S1 Informatika', 'Rp 10.000.000 - Rp 17.000.000', '2026-10-31', 'published');

INSERT INTO `articles` (`title`, `slug`, `thumbnail`, `content`, `excerpt`, `author`, `status`, `published_at`) VALUES
  ('7 Tips Mencari Kerja Secara Efektif', 'tips-mencari-kerja-secara-efektif', 'articles/tips-mencari-kerja.jpg', 'Mencari kerja membutuhkan strategi yang terarah. Mulailah dengan menentukan bidang yang sesuai, memperbarui profil profesional, memanfaatkan portal lowongan, dan membangun jaringan. Catat setiap lamaran agar proses pencarian dapat dievaluasi.', 'Strategi praktis untuk menemukan lowongan yang sesuai dan meningkatkan peluang dipanggil recruiter.', 'Tim BKK', 'published', '2026-08-01 09:00:00'),
  ('Cara Membuat CV yang Menarik Recruiter', 'cara-membuat-cv-menarik-recruiter', 'articles/tips-membuat-cv.jpg', 'CV yang baik harus ringkas, relevan, dan mudah dipindai. Tampilkan ringkasan profil, pengalaman atau proyek terpilih, keterampilan yang relevan, serta pencapaian yang dapat diukur. Sesuaikan CV dengan posisi yang dilamar dan periksa kembali sebelum mengirimkannya.', 'Panduan menyusun CV yang jelas, relevan, dan mudah dibaca sistem rekrutmen.', 'Tim BKK', 'published', '2026-08-05 09:00:00'),
  ('Persiapan Penting Sebelum Interview', 'persiapan-penting-sebelum-interview', 'articles/persiapan-interview.jpg', 'Pelajari profil perusahaan dan deskripsi pekerjaan sebelum interview. Siapkan contoh pengalaman dengan metode STAR, latihan menjawab pertanyaan umum, dan siapkan pertanyaan untuk interviewer. Hadir tepat waktu dengan perangkat dan koneksi yang siap.', 'Checklist persiapan agar lebih percaya diri saat menghadapi wawancara kerja.', 'Tim BKK', 'published', '2026-08-10 09:00:00'),
  ('Skill yang Dibutuhkan di Dunia Kerja Modern', 'skill-dibutuhkan-dunia-kerja-modern', 'articles/skill-dunia-kerja.jpg', 'Selain kemampuan teknis, dunia kerja membutuhkan komunikasi, pemecahan masalah, kolaborasi, adaptasi, dan literasi digital. Bangun portofolio melalui proyek nyata dan terus perbarui kemampuan sesuai perkembangan industri.', 'Kenali kombinasi hard skill dan soft skill yang banyak dicari perusahaan.', 'Tim BKK', 'published', '2026-08-15 09:00:00'),
  ('Panduan Memulai Karier untuk Fresh Graduate', 'panduan-karier-fresh-graduate', 'articles/tips-fresh-graduate.jpg', 'Fresh graduate dapat memulai karier dengan mengenali kekuatan diri, mengikuti magang atau proyek, dan terbuka terhadap kesempatan entry-level. Jangan menunggu sempurna untuk melamar. Gunakan masukan dari setiap proses seleksi untuk berkembang.', 'Langkah awal yang realistis bagi lulusan baru untuk memasuki dunia kerja.', 'Tim BKK', 'published', '2026-08-20 09:00:00');

INSERT INTO `galleries` (`title`, `image`, `description`) VALUES
  ('Seminar Persiapan Karier', 'gallery/seminar-persiapan-karier.jpg', 'Sesi berbagi bersama praktisi tentang persiapan memasuki dunia kerja.'),
  ('Pelatihan Pembuatan CV', 'gallery/pelatihan-pembuatan-cv.jpg', 'Peserta mempraktikkan penyusunan CV yang profesional.'),
  ('Job Fair BKK 2026', 'gallery/job-fair-bkk-2026.jpg', 'Kegiatan temu kerja antara pencari kerja dan perusahaan mitra.'),
  ('Sesi Simulasi Interview', 'gallery/simulasi-interview.jpg', 'Simulasi interview untuk melatih komunikasi dan kepercayaan diri.'),
  ('Kunjungan Industri', 'gallery/kunjungan-industri.jpg', 'Kunjungan untuk mengenal lingkungan kerja dan proses industri.'),
  ('Workshop Digital Skill', 'gallery/workshop-digital-skill.jpg', 'Workshop pengembangan keterampilan digital bagi peserta.'),
  ('Presentasi Proyek Siswa', 'gallery/presentasi-proyek-siswa.jpg', 'Peserta mempresentasikan proyek dan portofolio terbaiknya.'),
  ('Penandatanganan Kerja Sama', 'gallery/penandatanganan-kerja-sama.jpg', 'Kerja sama BKK dengan perusahaan mitra untuk membuka peluang karier.');
