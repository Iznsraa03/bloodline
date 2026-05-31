import { MainLayout } from "@/components/templates";
import NotifList from "@/components/organisms/NotifList";
import Badge from "@/components/atoms/Badge";
import { dummyNotifikasi } from "@/src/data/dummy";

/**
 * Notifikasi Page — Server Component
 * Daftar semua notifikasi (darurat, stok rendah, info).
 * Sesuai desain Stitch "Notifikasi".
 */
export default function NotifikasiPage() {
  const unreadCount = dummyNotifikasi.filter((n) => !n.dibaca).length;

  return (
    <MainLayout>
      <div className="pt-6 pb-4">
        {/* Header */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-text-primary">Notifikasi</h1>
            {unreadCount > 0 && (
              <Badge variant="danger" pulse>
                {unreadCount} baru
              </Badge>
            )}
          </div>
          <p className="text-sm text-text-secondary mt-0.5">
            Peringatan darurat dan pembaruan stok darah
          </p>
        </div>

        {/* Notification List */}
        {dummyNotifikasi.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-text-secondary">
              Belum ada notifikasi.
            </p>
          </div>
        ) : (
          <NotifList notifikasi={dummyNotifikasi} />
        )}
      </div>
    </MainLayout>
  );
}
