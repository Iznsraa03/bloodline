# Product Requirements Document (PRD)

**Nama Proyek:** Sistem Informasi Darah (Daerah Terpencil)  
**Status:** Draf MVP  
**Platform:** Mobile-First Web Application (PWA)  

---

## 1. Ringkasan Proyek
Aplikasi berbasis web untuk memfasilitasi pencarian dan pengelolaan informasi stok darah di daerah terpencil. Aplikasi ini menjembatani fasilitas kesehatan (faskes) dan masyarakat umum/pendonor, dengan fokus utama pada fungsionalitas di area minim koneksi internet (PWA & *offline-first*).

## 2. Tujuan & Metrik Keberhasilan
* **Tujuan:** Mengurangi waktu tunggu pencarian darah darurat dan memastikan transparansi stok darah antar faskes.
* **Metrik Keberhasilan:** * Aplikasi dapat diakses 100% saat mode *offline* (memuat data *cache* terakhir).
    * Sinkronisasi data berhasil di bawah 5 detik saat koneksi internet kembali stabil.
    * Peningkatan jumlah pendaftaran "Pendonor Siaga".

## 3. Spesifikasi Teknis (Tech Stack)
* **Framework:** Next.js 14+ (App Router) dengan React.
* **Bahasa:** TypeScript (*Strict Mode*).
* **Styling:** Tailwind CSS.
* **State & Caching:** TanStack Query (React Query) untuk manajemen status *offline/online*.
* **Database:** MySQL.
* **ORM:** Prisma.

## 4. Panduan UI/UX & Tema
Desain difokuskan pada keterbacaan tinggi dan efisiensi konsumsi daya perangkat, mengusung tema bersih dan profesional.
* **Background Utama:** Putih (`#FFFFFF`) & Soft Gray (`#F8FAFC`).
* **Komponen Utama/Aksi:** Biru Terang (`#2563EB`).
* **Teks:** Abu-abu Gelap (`#1E293B`).
* **Indikator Darurat:** Merah (`#EF4444`).
* **Indikator Aman:** Hijau (`#10B981`).

## 5. Kebutuhan Fitur (Feature Requirements)

### 5.1. Progressive Web App (PWA) & Offline Mode
* **Deskripsi:** Sistem harus menyimpan *cache* antarmuka dan data terakhir menggunakan *Service Workers*.
* **Kriteria Penerimaan:** Pengguna tetap bisa melihat riwayat stok darah terakhir dan struktur navigasi aplikasi tanpa koneksi internet.

### 5.2. Dashboard Stok Darah Real-time
* **Deskripsi:** Menampilkan agregat stok darah (A, B, AB, O) di layar utama.
* **Kriteria Penerimaan:** Faskes dapat memperbarui jumlah kantong darah; perubahan langsung tersinkronisasi ke tampilan publik saat *online*.

### 5.3. Modul Pendonor Siaga
* **Deskripsi:** Pendaftaran masyarakat sebagai pendonor panggilan darurat.
* **Kriteria Penerimaan:** Tersedia formulir input sederhana (Nama, Golongan Darah, Telepon, Desa/Wilayah) yang terhubung ke database terpusat.

### 5.4. Notifikasi Darurat (Push Notifications)
* **Deskripsi:** Sistem peringatan ketika ada permintaan darah mendesak.
* **Kriteria Penerimaan:** Jika faskes membuat *request* darurat, *banner* merah muncul di beranda dan pendonor dengan golongan darah yang cocok di radius terdekat menerima notifikasi.

## 6. Skema Data (Entity Relationship)
Sistem menggunakan **MySQL** dengan 4 entitas utama:
1.  **Fasilitas Kesehatan:** Menyimpan nama faskes, lokasi (koordinat), dan kontak.
2.  **Stok Darah:** Menyimpan jumlah kantong darah per faskes, dikategorikan berdasarkan golongan dan rhesus. Terhubung ke faskes.
3.  **Pendonor Siaga:** Menyimpan data demografis, kontak, status aktif, dan ketersediaan relawan.
4.  **Permintaan Darah:** Menyimpan log permintaan darurat (mendesak, terpenuhi, dibatalkan). Terhubung ke faskes.

## 7. Fase Pengembangan (Roadmap)
* **Fase 1 (Infrastruktur):** Setup Next.js, integrasi TypeScript, konfigurasi Tailwind CSS (Tema Putih/Biru), inisiasi *routing*.
* **Fase 2 (Backend & Database):** Setup koneksi MySQL, migrasi skema menggunakan Prisma, pembuatan API *Endpoints* (CRUD).
* **Fase 3 (Integrasi PWA):** Konfigurasi *manifest.json*, registrasi *Service Worker*, optimasi *offline caching*.
* **Fase 4 (UI & Fungsionalitas):** Pembuatan komponen UI, integrasi data ke antarmuka, pengujian sinkronisasi data *low-bandwidth*.