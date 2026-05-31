"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Bell, User } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/cari-faskes", label: "Cari", icon: Search },
  { href: "/notifikasi", label: "Notifikasi", icon: Bell },
  { href: "/profil", label: "Profil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-surface/95 backdrop-blur-md
        border-t border-outline-variant/50
        safe-bottom
      "
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex flex-col items-center gap-0.5
                py-1 px-3 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary"
                }
              `}
            >
              <div
                className={`
                  p-1.5 rounded-xl transition-all duration-200
                  ${isActive ? "bg-primary/10" : ""}
                `}
              >
                <IconComponent
                  className={`h-5 w-5 ${
                    isActive ? "stroke-[2.5]" : "stroke-[1.5]"
                  }`}
                />
              </div>
              <span
                className={`text-[10px] leading-none ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
