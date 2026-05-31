import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "BloodLink — Sistem Informasi Darah",
    template: "%s | BloodLink",
  },
  description:
    "Aplikasi pencarian dan pengelolaan informasi stok darah di daerah terpencil. Menjembatani fasilitas kesehatan dan pendonor siaga.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BloodLink",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
