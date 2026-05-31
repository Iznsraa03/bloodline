import { MapPin, Phone, Droplets } from "lucide-react";
import Badge, { getStokBadgeVariant } from "@/components/atoms/Badge";
import type { FasilitasKesehatan, StokDarah } from "@/src/types";

interface FaskesCardProps {
  faskes: FasilitasKesehatan;
  stokList?: StokDarah[];
  onClick?: (id: string) => void;
}

function getOverallStatus(stokList: StokDarah[]): "AMAN" | "RENDAH" | "KRITIS" {
  if (stokList.length === 0) return "KRITIS";
  const totalStok = stokList.reduce((sum, s) => sum + s.jumlah, 0);
  if (totalStok <= 5) return "KRITIS";
  if (totalStok <= 15) return "RENDAH";
  return "AMAN";
}

export default function FaskesCard({
  faskes,
  stokList = [],
  onClick,
}: FaskesCardProps) {
  const overallStatus = getOverallStatus(stokList);

  return (
    <button
      onClick={() => onClick?.(faskes.id)}
      className="
        w-full bg-surface rounded-xl border border-outline-variant
        p-4 text-left
        transition-all duration-200 hover:shadow-md hover:border-primary/30
        active:scale-[0.99]
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-text-primary truncate">
            {faskes.nama}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3 text-text-secondary flex-shrink-0" />
            <p className="text-xs text-text-secondary truncate">
              {faskes.alamat}
            </p>
          </div>
        </div>
        <Badge variant={getStokBadgeVariant(overallStatus)}>
          {overallStatus === "AMAN"
            ? "Stok Aman"
            : overallStatus === "RENDAH"
              ? "Stok Rendah"
              : "Stok Kritis"}
        </Badge>
      </div>

      {/* Stok Grid */}
      {stokList.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          {stokList.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-center bg-surface-container/50 rounded-lg py-1.5"
            >
              <span className="text-xs font-bold text-text-primary">
                {s.golongan}{s.rhesus}
              </span>
              <span
                className={`text-sm font-bold ${
                  s.jumlah <= 2
                    ? "text-danger"
                    : s.jumlah <= 5
                      ? "text-warning"
                      : "text-success"
                }`}
              >
                {s.jumlah}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer: Kontak */}
      <div className="flex items-center gap-1.5 pt-2 border-t border-outline-variant/50">
        <Phone className="h-3 w-3 text-primary" />
        <span className="text-xs text-primary font-medium">{faskes.kontak}</span>
      </div>
    </button>
  );
}
