"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

// ============================================================
// Server Action: Daftar Pendonor Siaga
// ============================================================

interface RegisterPendonorInput {
  nama: string;
  golonganDarah: string;
  rhesus: string;
  telepon: string;
  desa: string;
  wilayah: string;
}

export async function registerPendonor(input: RegisterPendonorInput) {
  try {
    const pendonor = await prisma.pendonorSiaga.create({
      data: {
        nama: input.nama,
        golonganDarah: input.golonganDarah,
        rhesus: input.rhesus,
        telepon: input.telepon,
        desa: input.desa,
        wilayah: input.wilayah,
        statusAktif: "AKTIF",
      },
    });

    revalidatePath("/profil");
    return { success: true, data: pendonor };
  } catch (error) {
    console.error("Error registering pendonor:", error);
    return { success: false, error: "Gagal mendaftarkan pendonor." };
  }
}

// ============================================================
// Server Action: Update Stok Darah
// ============================================================

interface UpdateStokInput {
  faskesId: string;
  golongan: string;
  rhesus: string;
  jumlah: number;
}

export async function updateStok(input: UpdateStokInput) {
  try {
    const stok = await prisma.stokDarah.upsert({
      where: {
        faskesId_golongan_rhesus: {
          faskesId: input.faskesId,
          golongan: input.golongan,
          rhesus: input.rhesus,
        },
      },
      update: {
        jumlah: input.jumlah,
      },
      create: {
        faskesId: input.faskesId,
        golongan: input.golongan,
        rhesus: input.rhesus,
        jumlah: input.jumlah,
      },
    });

    revalidatePath("/");
    revalidatePath("/cari-faskes");
    return { success: true, data: stok };
  } catch (error) {
    console.error("Error updating stok:", error);
    return { success: false, error: "Gagal memperbarui stok darah." };
  }
}

// ============================================================
// Server Action: Buat Permintaan Darah Darurat
// ============================================================

interface CreatePermintaanInput {
  faskesId: string;
  golongan: string;
  rhesus: string;
  jumlah: number;
  keterangan?: string;
}

export async function createPermintaan(input: CreatePermintaanInput) {
  try {
    const permintaan = await prisma.permintaanDarah.create({
      data: {
        faskesId: input.faskesId,
        golongan: input.golongan,
        rhesus: input.rhesus,
        jumlah: input.jumlah,
        status: "MENDESAK",
        keterangan: input.keterangan,
      },
    });

    revalidatePath("/");
    revalidatePath("/notifikasi");
    return { success: true, data: permintaan };
  } catch (error) {
    console.error("Error creating permintaan:", error);
    return { success: false, error: "Gagal membuat permintaan darurat." };
  }
}

// ============================================================
// Server Action: Update Status Permintaan
// ============================================================

export async function updatePermintaanStatus(
  id: string,
  status: "MENDESAK" | "TERPENUHI" | "DIBATALKAN"
) {
  try {
    const permintaan = await prisma.permintaanDarah.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/");
    revalidatePath("/notifikasi");
    return { success: true, data: permintaan };
  } catch (error) {
    console.error("Error updating permintaan:", error);
    return { success: false, error: "Gagal memperbarui status permintaan." };
  }
}
