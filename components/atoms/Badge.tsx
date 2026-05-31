import type { StatusPendonor } from "@/src/types";

type BadgeVariant = "success" | "danger" | "warning" | "info" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  /** Pulsing dot indicator for urgent badges */
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-success/15 text-green-700 border-success/30",
  danger: "bg-danger/15 text-red-700 border-danger/30",
  warning: "bg-warning/15 text-amber-700 border-warning/30",
  info: "bg-primary/15 text-blue-700 border-primary/30",
  neutral: "bg-surface-container text-text-secondary border-outline-variant",
};

export default function Badge({
  variant = "neutral",
  children,
  className = "",
  pulse = false,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-0.5 rounded-full
        text-xs font-semibold border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`
              animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
              ${variant === "danger" ? "bg-danger" : "bg-primary"}
            `}
          />
          <span
            className={`
              relative inline-flex rounded-full h-2 w-2
              ${variant === "danger" ? "bg-danger" : "bg-primary"}
            `}
          />
        </span>
      )}
      {children}
    </span>
  );
}

/** Helper: map status level to badge variant */
export function getStokBadgeVariant(
  statusLevel: "AMAN" | "RENDAH" | "KRITIS"
): BadgeVariant {
  switch (statusLevel) {
    case "AMAN":
      return "success";
    case "RENDAH":
      return "warning";
    case "KRITIS":
      return "danger";
  }
}

/** Helper: map pendonor status to badge variant */
export function getPendonorBadgeVariant(status: StatusPendonor): BadgeVariant {
  return status === "AKTIF" ? "success" : "neutral";
}
