import { AlertTriangle } from "lucide-react";
import type { PermintaanDarah } from "@/src/types";

interface EmergencyBannerProps {
  permintaan: PermintaanDarah;
  faskesNama?: string;
}

export default function EmergencyBanner({
  permintaan,
  faskesNama,
}: EmergencyBannerProps) {
  return (
    <div
      className="
        w-full bg-danger text-white
        px-4 py-3 flex items-start gap-3
        animate-pulse-slow
      "
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5 p-1.5 bg-white/20 rounded-lg">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold">
          🚨 Permintaan Darurat: Gol. {permintaan.golongan}
          {permintaan.rhesus} ({permintaan.jumlah} kantong)
        </p>
        {faskesNama && (
          <p className="text-xs text-white/80 mt-0.5">{faskesNama}</p>
        )}
        {permintaan.keterangan && (
          <p className="text-xs text-white/70 mt-1 line-clamp-1">
            {permintaan.keterangan}
          </p>
        )}
      </div>
    </div>
  );
}
