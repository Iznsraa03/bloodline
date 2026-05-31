// ============================================================
// BloodLink — TypeScript Interfaces
// Sistem Informasi Darah (Daerah Terpencil)
// ============================================================

// --- Enums ---

export type GolonganDarah = 'A' | 'B' | 'AB' | 'O';
export type Rhesus = '+' | '-';
export type StatusPermintaan = 'MENDESAK' | 'TERPENUHI' | 'DIBATALKAN';
export type StatusPendonor = 'AKTIF' | 'NONAKTIF';

// --- Entities ---

export interface FasilitasKesehatan {
  id: string;
  nama: string;
  alamat: string;
  lat: number;
  lng: number;
  kontak: string;
  stokDarah?: StokDarah[];
  permintaan?: PermintaanDarah[];
  createdAt: string;
  updatedAt: string;
}

export interface StokDarah {
  id: string;
  faskesId: string;
  golongan: GolonganDarah;
  rhesus: Rhesus;
  jumlah: number;
  faskes?: FasilitasKesehatan;
  updatedAt: string;
}

export interface PendonorSiaga {
  id: string;
  nama: string;
  golonganDarah: GolonganDarah;
  rhesus: Rhesus;
  telepon: string;
  desa: string;
  wilayah: string;
  statusAktif: StatusPendonor;
  createdAt: string;
  updatedAt: string;
}

export interface PermintaanDarah {
  id: string;
  faskesId: string;
  golongan: GolonganDarah;
  rhesus: Rhesus;
  jumlah: number;
  status: StatusPermintaan;
  keterangan?: string;
  faskes?: FasilitasKesehatan;
  createdAt: string;
  updatedAt: string;
}

// --- Aggregates (for Dashboard) ---

export interface StokAgregat {
  golongan: GolonganDarah;
  rhesus: Rhesus;
  totalKantong: number;
  statusLevel: 'AMAN' | 'RENDAH' | 'KRITIS';
}

// --- Notification ---

export interface Notifikasi {
  id: string;
  tipe: 'DARURAT' | 'INFO' | 'STOK_RENDAH';
  judul: string;
  pesan: string;
  dibaca: boolean;
  permintaanId?: string;
  faskesId?: string;
  createdAt: string;
}

// --- Form Inputs ---

export interface PendonorFormInput {
  nama: string;
  golonganDarah: GolonganDarah;
  rhesus: Rhesus;
  telepon: string;
  desa: string;
  wilayah: string;
}

export interface PermintaanFormInput {
  faskesId: string;
  golongan: GolonganDarah;
  rhesus: Rhesus;
  jumlah: number;
  keterangan?: string;
}
