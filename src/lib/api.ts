import { prisma } from "@/src/lib/prisma";

/**
 * API helper functions — untuk digunakan di Server Components
 * atau untuk menggantikan dummy data dengan data dari database.
 */

// ============================================================
// Faskes
// ============================================================

export async function getAllFaskes() {
  return prisma.fasilitasKesehatan.findMany({
    include: { stokDarah: true },
    orderBy: { nama: "asc" },
  });
}

export async function getFaskesById(id: string) {
  return prisma.fasilitasKesehatan.findUnique({
    where: { id },
    include: { stokDarah: true, permintaan: true },
  });
}

// ============================================================
// Stok Darah
// ============================================================

export async function getAllStok() {
  return prisma.stokDarah.findMany({
    include: { faskes: true },
    orderBy: { golongan: "asc" },
  });
}

export async function getStokByFaskes(faskesId: string) {
  return prisma.stokDarah.findMany({
    where: { faskesId },
    orderBy: { golongan: "asc" },
  });
}

/** Agregat stok darah per golongan+rhesus di seluruh faskes */
export async function getStokAgregat() {
  const allStok = await prisma.stokDarah.findMany();

  const agregat = new Map<string, { golongan: string; rhesus: string; total: number }>();

  for (const s of allStok) {
    const key = `${s.golongan}${s.rhesus}`;
    const existing = agregat.get(key);
    if (existing) {
      existing.total += s.jumlah;
    } else {
      agregat.set(key, { golongan: s.golongan, rhesus: s.rhesus, total: s.jumlah });
    }
  }

  return Array.from(agregat.values()).map((a) => ({
    golongan: a.golongan,
    rhesus: a.rhesus,
    totalKantong: a.total,
    statusLevel: a.total <= 5 ? "KRITIS" : a.total <= 15 ? "RENDAH" : "AMAN",
  }));
}

// ============================================================
// Pendonor
// ============================================================

export async function getAllPendonor() {
  return prisma.pendonorSiaga.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPendonorByGolongan(golongan: string, rhesus: string) {
  return prisma.pendonorSiaga.findMany({
    where: {
      golonganDarah: golongan,
      rhesus,
      statusAktif: "AKTIF",
    },
    orderBy: { nama: "asc" },
  });
}

// ============================================================
// Permintaan Darah
// ============================================================

export async function getAllPermintaan() {
  return prisma.permintaanDarah.findMany({
    include: { faskes: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPermintaanDarurat() {
  return prisma.permintaanDarah.findMany({
    where: { status: "MENDESAK" },
    include: { faskes: true },
    orderBy: { createdAt: "desc" },
  });
}
