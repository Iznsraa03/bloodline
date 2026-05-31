import type {
  FasilitasKesehatan,
  StokDarah,
  PendonorSiaga,
  PermintaanDarah,
  StokAgregat,
  Notifikasi,
} from '@/src/types';

// ============================================================
// Dummy Data — Fasilitas Kesehatan
// ============================================================

export const dummyFaskes: FasilitasKesehatan[] = [
  {
    id: 'faskes-001',
    nama: 'Puskesmas Tanjung Harapan',
    alamat: 'Jl. Merdeka No. 12, Desa Tanjung',
    lat: -3.3194,
    lng: 114.5909,
    kontak: '081234567890',
    createdAt: '2026-01-15T08:00:00Z',
    updatedAt: '2026-05-30T10:30:00Z',
  },
  {
    id: 'faskes-002',
    nama: 'RSUD Pulau Laut',
    alamat: 'Jl. Kesehatan No. 5, Kota Baru',
    lat: -3.2942,
    lng: 116.1674,
    kontak: '081345678901',
    createdAt: '2026-01-20T08:00:00Z',
    updatedAt: '2026-05-30T11:00:00Z',
  },
  {
    id: 'faskes-003',
    nama: 'Klinik Desa Sejahtera',
    alamat: 'Jl. Bakti No. 3, Desa Sejahtera',
    lat: -3.4521,
    lng: 115.2341,
    kontak: '081456789012',
    createdAt: '2026-02-01T08:00:00Z',
    updatedAt: '2026-05-29T14:00:00Z',
  },
  {
    id: 'faskes-004',
    nama: 'Puskesmas Gunung Makmur',
    alamat: 'Jl. Puncak No. 7, Desa Makmur',
    lat: -3.1876,
    lng: 115.8923,
    kontak: '081567890123',
    createdAt: '2026-02-10T08:00:00Z',
    updatedAt: '2026-05-31T06:00:00Z',
  },
];

// ============================================================
// Dummy Data — Stok Darah
// ============================================================

export const dummyStokDarah: StokDarah[] = [
  { id: 'stok-001', faskesId: 'faskes-001', golongan: 'A', rhesus: '+', jumlah: 15, updatedAt: '2026-05-31T06:00:00Z' },
  { id: 'stok-002', faskesId: 'faskes-001', golongan: 'B', rhesus: '+', jumlah: 8, updatedAt: '2026-05-31T06:00:00Z' },
  { id: 'stok-003', faskesId: 'faskes-001', golongan: 'AB', rhesus: '+', jumlah: 3, updatedAt: '2026-05-31T06:00:00Z' },
  { id: 'stok-004', faskesId: 'faskes-001', golongan: 'O', rhesus: '+', jumlah: 20, updatedAt: '2026-05-31T06:00:00Z' },
  { id: 'stok-005', faskesId: 'faskes-002', golongan: 'A', rhesus: '+', jumlah: 12, updatedAt: '2026-05-30T14:00:00Z' },
  { id: 'stok-006', faskesId: 'faskes-002', golongan: 'B', rhesus: '+', jumlah: 2, updatedAt: '2026-05-30T14:00:00Z' },
  { id: 'stok-007', faskesId: 'faskes-002', golongan: 'AB', rhesus: '+', jumlah: 5, updatedAt: '2026-05-30T14:00:00Z' },
  { id: 'stok-008', faskesId: 'faskes-002', golongan: 'O', rhesus: '+', jumlah: 1, updatedAt: '2026-05-30T14:00:00Z' },
  { id: 'stok-009', faskesId: 'faskes-003', golongan: 'A', rhesus: '+', jumlah: 7, updatedAt: '2026-05-29T10:00:00Z' },
  { id: 'stok-010', faskesId: 'faskes-003', golongan: 'O', rhesus: '+', jumlah: 4, updatedAt: '2026-05-29T10:00:00Z' },
  { id: 'stok-011', faskesId: 'faskes-004', golongan: 'B', rhesus: '+', jumlah: 10, updatedAt: '2026-05-31T05:00:00Z' },
  { id: 'stok-012', faskesId: 'faskes-004', golongan: 'O', rhesus: '-', jumlah: 0, updatedAt: '2026-05-31T05:00:00Z' },
];

// ============================================================
// Dummy Data — Pendonor Siaga
// ============================================================

export const dummyPendonor: PendonorSiaga[] = [
  {
    id: 'donor-001',
    nama: 'Ahmad Fauzi',
    golonganDarah: 'O',
    rhesus: '+',
    telepon: '081234500001',
    desa: 'Desa Tanjung',
    wilayah: 'Kec. Tanjung',
    statusAktif: 'AKTIF',
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-05-30T08:00:00Z',
  },
  {
    id: 'donor-002',
    nama: 'Siti Rahmawati',
    golonganDarah: 'A',
    rhesus: '+',
    telepon: '081234500002',
    desa: 'Desa Sejahtera',
    wilayah: 'Kec. Harapan',
    statusAktif: 'AKTIF',
    createdAt: '2026-03-05T08:00:00Z',
    updatedAt: '2026-05-30T08:00:00Z',
  },
  {
    id: 'donor-003',
    nama: 'Budi Santoso',
    golonganDarah: 'B',
    rhesus: '+',
    telepon: '081234500003',
    desa: 'Desa Makmur',
    wilayah: 'Kec. Gunung',
    statusAktif: 'NONAKTIF',
    createdAt: '2026-03-10T08:00:00Z',
    updatedAt: '2026-04-15T08:00:00Z',
  },
];

// ============================================================
// Dummy Data — Permintaan Darah
// ============================================================

export const dummyPermintaan: PermintaanDarah[] = [
  {
    id: 'req-001',
    faskesId: 'faskes-002',
    golongan: 'O',
    rhesus: '+',
    jumlah: 5,
    status: 'MENDESAK',
    keterangan: 'Pasien kecelakaan, butuh transfusi segera.',
    createdAt: '2026-05-31T07:00:00Z',
    updatedAt: '2026-05-31T07:00:00Z',
  },
  {
    id: 'req-002',
    faskesId: 'faskes-001',
    golongan: 'A',
    rhesus: '+',
    jumlah: 3,
    status: 'TERPENUHI',
    keterangan: 'Operasi terjadwal.',
    createdAt: '2026-05-28T10:00:00Z',
    updatedAt: '2026-05-29T08:00:00Z',
  },
  {
    id: 'req-003',
    faskesId: 'faskes-004',
    golongan: 'B',
    rhesus: '+',
    jumlah: 2,
    status: 'MENDESAK',
    keterangan: 'Ibu melahirkan, pendarahan hebat.',
    createdAt: '2026-05-31T06:30:00Z',
    updatedAt: '2026-05-31T06:30:00Z',
  },
];

// ============================================================
// Dummy Data — Stok Agregat (Dashboard)
// ============================================================

export const dummyStokAgregat: StokAgregat[] = [
  { golongan: 'A', rhesus: '+', totalKantong: 34, statusLevel: 'AMAN' },
  { golongan: 'B', rhesus: '+', totalKantong: 20, statusLevel: 'RENDAH' },
  { golongan: 'AB', rhesus: '+', totalKantong: 8, statusLevel: 'KRITIS' },
  { golongan: 'O', rhesus: '+', totalKantong: 25, statusLevel: 'AMAN' },
];

// ============================================================
// Dummy Data — Notifikasi
// ============================================================

export const dummyNotifikasi: Notifikasi[] = [
  {
    id: 'notif-001',
    tipe: 'DARURAT',
    judul: 'Permintaan Darurat: Gol. O+ (5 kantong)',
    pesan: 'RSUD Pulau Laut membutuhkan 5 kantong darah O+ segera untuk pasien kecelakaan.',
    dibaca: false,
    permintaanId: 'req-001',
    faskesId: 'faskes-002',
    createdAt: '2026-05-31T07:00:00Z',
  },
  {
    id: 'notif-002',
    tipe: 'DARURAT',
    judul: 'Permintaan Darurat: Gol. B+ (2 kantong)',
    pesan: 'Puskesmas Gunung Makmur membutuhkan 2 kantong darah B+ untuk ibu melahirkan.',
    dibaca: false,
    permintaanId: 'req-003',
    faskesId: 'faskes-004',
    createdAt: '2026-05-31T06:30:00Z',
  },
  {
    id: 'notif-003',
    tipe: 'STOK_RENDAH',
    judul: 'Stok AB+ Rendah',
    pesan: 'Total stok darah golongan AB+ di seluruh faskes hanya tersisa 8 kantong.',
    dibaca: true,
    createdAt: '2026-05-30T18:00:00Z',
  },
  {
    id: 'notif-004',
    tipe: 'INFO',
    judul: 'Permintaan Terpenuhi: Gol. A+',
    pesan: 'Permintaan 3 kantong darah A+ dari Puskesmas Tanjung Harapan telah terpenuhi.',
    dibaca: true,
    permintaanId: 'req-002',
    faskesId: 'faskes-001',
    createdAt: '2026-05-29T08:00:00Z',
  },
];
