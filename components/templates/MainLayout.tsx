import { BottomNav } from "@/components/organisms";

interface MainLayoutProps {
  children: React.ReactNode;
  /** Optional: hide BottomNav for specific pages (e.g. forms) */
  hideNav?: boolean;
}

export default function MainLayout({
  children,
  hideNav = false,
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto w-full">
      {/* Main Content Area — padded for bottom nav */}
      <main className={`flex-1 ${hideNav ? "" : "pb-20"}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {!hideNav && <BottomNav />}
    </div>
  );
}
