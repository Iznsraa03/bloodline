-- CreateTable
CREATE TABLE "fasilitas_kesehatan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "kontak" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "stok_darah" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "golongan" TEXT NOT NULL,
    "rhesus" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    "faskesId" TEXT NOT NULL,
    CONSTRAINT "stok_darah_faskesId_fkey" FOREIGN KEY ("faskesId") REFERENCES "fasilitas_kesehatan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pendonor_siaga" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "golonganDarah" TEXT NOT NULL,
    "rhesus" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "desa" TEXT NOT NULL,
    "wilayah" TEXT NOT NULL,
    "statusAktif" TEXT NOT NULL DEFAULT 'AKTIF',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "permintaan_darah" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "golongan" TEXT NOT NULL,
    "rhesus" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'MENDESAK',
    "keterangan" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "faskesId" TEXT NOT NULL,
    CONSTRAINT "permintaan_darah_faskesId_fkey" FOREIGN KEY ("faskesId") REFERENCES "fasilitas_kesehatan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "stok_darah_faskesId_golongan_rhesus_key" ON "stok_darah"("faskesId", "golongan", "rhesus");
