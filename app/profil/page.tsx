import {
  User,
  Droplets,
  Phone,
  MapPin,
  ChevronRight,
  Settings,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { MainLayout } from "@/components/templates";
import Badge from "@/components/atoms/Badge";
import { getPendonorBadgeVariant } from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { dummyPendonor } from "@/src/data/dummy";

/**
 * Profil Page — Server Component
 * Halaman profil pengguna dan status pendonor siaga.
 * Sesuai desain Stitch "Profil".
 */
export default function ProfilPage() {
  // Simulasi: user saat ini adalah pendonor pertama
  const currentUser = dummyPendonor[0];

  const menuItems = [
    { icon: Shield, label: "Riwayat Donasi", href: "#" },
    { icon: Settings, label: "Pengaturan", href: "#" },
    { icon: HelpCircle, label: "Bantuan & FAQ", href: "#" },
  ];

  return (
    <MainLayout>
      <div className="px-4 pt-6 pb-4">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <User className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-lg font-bold text-text-primary">
            {currentUser.nama}
          </h1>
          <Badge
            variant={getPendonorBadgeVariant(currentUser.statusAktif)}
            className="mt-1.5"
          >
            Pendonor {currentUser.statusAktif === "AKTIF" ? "Aktif" : "Nonaktif"}
          </Badge>
        </div>

        {/* Donor Info Card */}
        <div className="bg-surface rounded-xl border border-outline-variant p-4 mb-4">
          <h2 className="text-sm font-bold text-text-primary mb-3">
            Informasi Pendonor
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-danger/10 rounded-lg">
                <Droplets className="h-4 w-4 text-danger" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Golongan Darah</p>
                <p className="text-sm font-bold text-text-primary">
                  {currentUser.golonganDarah}
                  {currentUser.rhesus}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Telepon</p>
                <p className="text-sm font-bold text-text-primary">
                  {currentUser.telepon}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <MapPin className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Wilayah</p>
                <p className="text-sm font-bold text-text-primary">
                  {currentUser.desa}, {currentUser.wilayah}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button variant="primary" fullWidth>
            <Droplets className="h-4 w-4" />
            Siap Donor
          </Button>
          <Button variant="secondary" fullWidth>
            Edit Profil
          </Button>
        </div>

        {/* Menu Items */}
        <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden mb-4">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.label}
                className={`
                  w-full flex items-center gap-3 px-4 py-3.5
                  text-left hover:bg-surface-container/50
                  transition-colors
                  ${index < menuItems.length - 1 ? "border-b border-outline-variant/30" : ""}
                `}
              >
                <IconComponent className="h-4 w-4 text-text-secondary" />
                <span className="flex-1 text-sm font-medium text-text-primary">
                  {item.label}
                </span>
                <ChevronRight className="h-4 w-4 text-text-secondary/50" />
              </button>
            );
          })}
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-3 text-danger text-sm font-semibold hover:bg-danger/5 rounded-xl transition-colors">
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </MainLayout>
  );
}
