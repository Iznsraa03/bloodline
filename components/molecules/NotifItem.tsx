import { AlertTriangle, Bell, Info, PackageCheck } from "lucide-react";
import type { Notifikasi } from "@/src/types";

interface NotifItemProps {
  notifikasi: Notifikasi;
  onClick?: (id: string) => void;
}

const tipeConfig = {
  DARURAT: {
    icon: AlertTriangle,
    iconColor: "text-danger",
    bgColor: "bg-danger/5",
    borderColor: "border-l-danger",
  },
  STOK_RENDAH: {
    icon: PackageCheck,
    iconColor: "text-warning",
    bgColor: "bg-warning/5",
    borderColor: "border-l-warning",
  },
  INFO: {
    icon: Info,
    iconColor: "text-primary",
    bgColor: "bg-primary/5",
    borderColor: "border-l-primary",
  },
};

/** Format relative time in Indonesian */
function formatWaktu(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour} jam lalu`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

export default function NotifItem({ notifikasi, onClick }: NotifItemProps) {
  const config = tipeConfig[notifikasi.tipe];
  const IconComponent = config.icon;

  return (
    <button
      onClick={() => onClick?.(notifikasi.id)}
      className={`
        w-full flex items-start gap-3 p-4
        border-l-4 ${config.borderColor}
        ${notifikasi.dibaca ? "bg-surface" : config.bgColor}
        hover:bg-surface-container/50
        transition-colors text-left
      `}
    >
      {/* Icon */}
      <div
        className={`
          flex-shrink-0 mt-0.5 p-2 rounded-full
          ${notifikasi.dibaca ? "bg-surface-container" : `${config.bgColor}`}
        `}
      >
        <IconComponent className={`h-4 w-4 ${config.iconColor}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-tight ${
            notifikasi.dibaca
              ? "text-text-secondary font-normal"
              : "text-text-primary font-semibold"
          }`}
        >
          {notifikasi.judul}
        </p>
        <p className="text-xs text-text-secondary mt-1 line-clamp-2">
          {notifikasi.pesan}
        </p>
        <p className="text-[11px] text-text-secondary/70 mt-1.5">
          {formatWaktu(notifikasi.createdAt)}
        </p>
      </div>

      {/* Unread dot */}
      {!notifikasi.dibaca && (
        <span className="flex-shrink-0 mt-2 h-2 w-2 rounded-full bg-primary" />
      )}
    </button>
  );
}
