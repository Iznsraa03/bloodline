"use client";

import { useState, useMemo } from "react";
import { MainLayout } from "@/components/templates";
import { FaskesCard } from "@/components/organisms";
import { SearchBar, BloodGroupSelector } from "@/components/molecules";
import { dummyFaskes, dummyStokDarah } from "@/src/data/dummy";
import type { GolonganDarah } from "@/src/types";

/**
 * Cari Faskes Page — Client Component (search & filter interactivity)
 * Pencarian fasilitas kesehatan dengan filter golongan darah.
 * Sesuai desain Stitch "Cari Faskes".
 */
export default function CariFaskesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGolongan, setSelectedGolongan] =
    useState<GolonganDarah | null>(null);

  // Filter faskes berdasarkan pencarian dan golongan darah
  const filteredFaskes = useMemo(() => {
    return dummyFaskes.filter((faskes) => {
      // Text search filter
      const matchesSearch =
        !searchQuery ||
        faskes.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faskes.alamat.toLowerCase().includes(searchQuery.toLowerCase());

      // Blood type filter: faskes must have stock for selected blood type
      const matchesGolongan =
        !selectedGolongan ||
        dummyStokDarah.some(
          (s) =>
            s.faskesId === faskes.id &&
            s.golongan === selectedGolongan &&
            s.jumlah > 0
        );

      return matchesSearch && matchesGolongan;
    });
  }, [searchQuery, selectedGolongan]);

  // Get stok per faskes
  const getStokForFaskes = (faskesId: string) => {
    return dummyStokDarah.filter((s) => s.faskesId === faskesId);
  };

  const handleGolonganSelect = (g: GolonganDarah) => {
    // Toggle: klik golongan yang sama untuk reset
    setSelectedGolongan((prev) => (prev === g ? null : g));
  };

  return (
    <MainLayout>
      <div className="px-4 pt-6 pb-4">
        {/* Header */}
        <h1 className="text-xl font-bold text-text-primary mb-1">
          Cari Faskes
        </h1>
        <p className="text-sm text-text-secondary mb-4">
          Temukan fasilitas kesehatan dan ketersediaan stok darah
        </p>

        {/* Search */}
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Cari nama faskes, lokasi..."
          className="mb-4"
        />

        {/* Blood Type Filter */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wider">
            Filter Golongan Darah
          </p>
          <BloodGroupSelector
            selected={selectedGolongan}
            onSelect={handleGolonganSelect}
          />
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-text-primary">
            Hasil Pencarian
          </h2>
          <span className="text-xs text-text-secondary">
            {filteredFaskes.length} faskes ditemukan
          </span>
        </div>

        {filteredFaskes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-text-secondary">
              Tidak ada faskes yang cocok dengan pencarian Anda.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaskes.map((faskes) => (
              <FaskesCard
                key={faskes.id}
                faskes={faskes}
                stokList={getStokForFaskes(faskes.id)}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
