import { Droplets } from "lucide-react";
import Badge, { getStokBadgeVariant } from "@/components/atoms/Badge";
import type { StokAgregat } from "@/src/types";

interface BloodStockCardProps {
  stok: StokAgregat;
}

const statusLabel = {
  AMAN: "Aman",
  RENDAH: "Rendah",
  KRITIS: "Kritis",
};

export default function BloodStockCard({ stok }: BloodStockCardProps) {
  const variant = getStokBadgeVariant(stok.statusLevel);

  // Dynamic border color based on status
  const borderColor =
    stok.statusLevel === "KRITIS"
      ? "border-danger/40"
      : stok.statusLevel === "RENDAH"
        ? "border-warning/40"
        : "border-success/40";

  // Dynamic accent color for the blood type icon background
  const iconBg =
    stok.statusLevel === "KRITIS"
      ? "bg-danger/10"
      : stok.statusLevel === "RENDAH"
        ? "bg-warning/10"
        : "bg-success/10";

  const iconColor =
    stok.statusLevel === "KRITIS"
      ? "text-danger"
      : stok.statusLevel === "RENDAH"
        ? "text-warning"
        : "text-success";

  return (
    <div
      className={`
        bg-surface rounded-xl border ${borderColor}
        p-4 flex flex-col gap-3
        transition-all duration-200 hover:shadow-md
      `}
    >
      {/* Header: Blood Type + Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Droplets className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">
              {stok.golongan}
              <span className="text-sm font-medium text-text-secondary ml-0.5">
                {stok.rhesus}
              </span>
            </p>
          </div>
        </div>
        <Badge
          variant={variant}
          pulse={stok.statusLevel === "KRITIS"}
        >
          {statusLabel[stok.statusLevel]}
        </Badge>
      </div>

      {/* Jumlah Kantong */}
      <div>
        <p className="text-2xl font-bold text-text-primary">
          {stok.totalKantong}
        </p>
        <p className="text-xs text-text-secondary">kantong tersedia</p>
      </div>

      {/* Progress bar visual */}
      <div className="w-full bg-surface-container rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ${
            stok.statusLevel === "KRITIS"
              ? "bg-danger"
              : stok.statusLevel === "RENDAH"
                ? "bg-warning"
                : "bg-success"
          }`}
          style={{ width: `${Math.min((stok.totalKantong / 50) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
