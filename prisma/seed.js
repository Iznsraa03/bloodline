// @ts-check
// Prisma seed script — uses direct SQL via better-sqlite3 for reliability

const Database = require("better-sqlite3");
const { randomUUID } = require("crypto");
const path = require("path");

const dbPath = path.join(__dirname, "..", "dev.db");
const db = new Database(dbPath);

// Enable WAL mode for better concurrent access
db.pragma("journal_mode = WAL");

console.log("🌱 Seeding database...");

// Clean existing data (order matters for FK constraints)
db.exec("DELETE FROM permintaan_darah");
db.exec("DELETE FROM stok_darah");
db.exec("DELETE FROM pendonor_siaga");
db.exec("DELETE FROM fasilitas_kesehatan");

// --- Seed Fasilitas Kesehatan ---
const faskesIds = [];
const faskesData = [
  ["Puskesmas Tanjung Harapan", "Jl. Merdeka No. 12, Desa Tanjung", -3.3194, 114.5909, "081234567890"],
  ["RSUD Pulau Laut", "Jl. Kesehatan No. 5, Kota Baru", -3.2942, 116.1674, "081345678901"],
  ["Klinik Desa Sejahtera", "Jl. Bakti No. 3, Desa Sejahtera", -3.4521, 115.2341, "081456789012"],
  ["Puskesmas Gunung Makmur", "Jl. Puncak No. 7, Desa Makmur", -3.1876, 115.8923, "081567890123"],
];

const insertFaskes = db.prepare(
  "INSERT INTO fasilitas_kesehatan (id, nama, alamat, lat, lng, kontak, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))"
);

for (const [nama, alamat, lat, lng, kontak] of faskesData) {
  const id = randomUUID().replace(/-/g, "").slice(0, 25);
  faskesIds.push(id);
  insertFaskes.run(id, nama, alamat, lat, lng, kontak);
}
console.log("✅ Faskes seeded");

// --- Seed Stok Darah ---
const stokData = [
  [faskesIds[0], "A", "+", 15],
  [faskesIds[0], "B", "+", 8],
  [faskesIds[0], "AB", "+", 3],
  [faskesIds[0], "O", "+", 20],
  [faskesIds[1], "A", "+", 12],
  [faskesIds[1], "B", "+", 2],
  [faskesIds[1], "AB", "+", 5],
  [faskesIds[1], "O", "+", 1],
  [faskesIds[2], "A", "+", 7],
  [faskesIds[2], "O", "+", 4],
  [faskesIds[3], "B", "+", 10],
  [faskesIds[3], "O", "-", 0],
];

const insertStok = db.prepare(
  "INSERT INTO stok_darah (id, faskesId, golongan, rhesus, jumlah, updatedAt) VALUES (?, ?, ?, ?, ?, datetime('now'))"
);

for (const [faskesId, golongan, rhesus, jumlah] of stokData) {
  const id = randomUUID().replace(/-/g, "").slice(0, 25);
  insertStok.run(id, faskesId, golongan, rhesus, jumlah);
}
console.log("✅ Stok darah seeded");

// --- Seed Pendonor Siaga ---
const pendonorData = [
  ["Ahmad Fauzi", "O", "+", "081234500001", "Desa Tanjung", "Kec. Tanjung", "AKTIF"],
  ["Siti Rahmawati", "A", "+", "081234500002", "Desa Sejahtera", "Kec. Harapan", "AKTIF"],
  ["Budi Santoso", "B", "+", "081234500003", "Desa Makmur", "Kec. Gunung", "NONAKTIF"],
];

const insertPendonor = db.prepare(
  "INSERT INTO pendonor_siaga (id, nama, golonganDarah, rhesus, telepon, desa, wilayah, statusAktif, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))"
);

for (const [nama, gol, rh, tel, desa, wil, status] of pendonorData) {
  const id = randomUUID().replace(/-/g, "").slice(0, 25);
  insertPendonor.run(id, nama, gol, rh, tel, desa, wil, status);
}
console.log("✅ Pendonor seeded");

// --- Seed Permintaan Darah ---
const permintaanData = [
  [faskesIds[1], "O", "+", 5, "MENDESAK", "Pasien kecelakaan, butuh transfusi segera."],
  [faskesIds[0], "A", "+", 3, "TERPENUHI", "Operasi terjadwal."],
  [faskesIds[3], "B", "+", 2, "MENDESAK", "Ibu melahirkan, pendarahan hebat."],
];

const insertPermintaan = db.prepare(
  "INSERT INTO permintaan_darah (id, faskesId, golongan, rhesus, jumlah, status, keterangan, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))"
);

for (const [faskesId, gol, rh, jumlah, status, ket] of permintaanData) {
  const id = randomUUID().replace(/-/g, "").slice(0, 25);
  insertPermintaan.run(id, faskesId, gol, rh, jumlah, status, ket);
}
console.log("✅ Permintaan darah seeded");

db.close();
console.log("🎉 Database seeded successfully!");
