import { Suspense } from "react";
import { Activity, TrendingUp } from "lucide-react";
import { MainLayout } from "@/components/templates";
import { BloodStockCard, EmergencyBanner } from "@/components/organisms";
import { LoadingSpinner } from "@/components/atoms";
import {
  dummyStokAgregat,
  dummyPermintaan,
  dummyFaskes,
} from "@/src/data/dummy";

/**
 * Dashboard Home — Server Component
 * Menampilkan stok darah agregat, banner darurat, dan ringkasan status.
 * Sesuai desain Stitch "Dashboard Home".
 */
export default function DashboardPage() {
  // Filter permintaan darurat yang aktif (MENDESAK)
  const permintaanDarurat = dummyPermintaan.filter(
    (p) => p.status === "MENDESAK"
  );

  // Hitung total stok
  const totalKantong = dummyStokAgregat.reduce(
    (sum, s) => sum + s.totalKantong,
    0
  );

  return (
    <MainLayout>
      {/* Emergency Banners — non-dismissible, top of page */}
      {permintaanDarurat.map((p) => {
        const faskes = dummyFaskes.find((f) => f.id === p.faskesId);
        return (
          <EmergencyBanner
            key={p.id}
            permintaan={p}
            faskesNama={faskes?.nama}
          />
        );
      })}

      <div className="px-4 pt-6 pb-4">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-text-primary">
            Selamat Datang 👋
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Monitor stok darah di wilayah Anda
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-primary/5 rounded-xl p-3 flex items-center gap-3 border border-primary/10">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">
                {totalKantong}
              </p>
              <p className="text-[11px] text-text-secondary">Total Kantong</p>
            </div>
          </div>
          <div className="bg-success/5 rounded-xl p-3 flex items-center gap-3 border border-success/10">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">
                {dummyFaskes.length}
              </p>
              <p className="text-[11px] text-text-secondary">Faskes Aktif</p>
            </div>
          </div>
        </div>

        {/* Stok Darah Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-text-primary">
              Stok Darah
            </h2>
            <span className="text-xs text-text-secondary">
              Terakhir diperbarui: Hari ini
            </span>
          </div>

          <Suspense fallback={<LoadingSpinner className="py-8" />}>
            <div className="grid grid-cols-2 gap-3">
              {dummyStokAgregat.map((stok) => (
                <BloodStockCard key={`${stok.golongan}${stok.rhesus}`} stok={stok} />
              ))}
            </div>
          </Suspense>
        </div>

        {/* Permintaan Darurat Active List */}
        {permintaanDarurat.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-text-primary mb-3">
              Permintaan Aktif
            </h2>
            <div className="space-y-2">
              {permintaanDarurat.map((p) => {
                const faskes = dummyFaskes.find((f) => f.id === p.faskesId);
                return (
                  <div
                    key={p.id}
                    className="
                      bg-danger/5 border border-danger/20 rounded-xl p-3
                      flex items-center justify-between
                    "
                  >
                    <div>
                      <p className="text-sm font-bold text-text-primary">
                        Gol. {p.golongan}
                        {p.rhesus} — {p.jumlah} kantong
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {faskes?.nama || "Faskes tidak dikenal"}
                      </p>
                    </div>
                    <span className="flex-shrink-0 px-2.5 py-1 bg-danger text-white text-xs font-bold rounded-lg">
                      MENDESAK
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
