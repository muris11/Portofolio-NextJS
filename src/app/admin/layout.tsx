import AdminNavbar from "@/components/AdminNavbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
// Ensure global Tailwind styles are present even if this layout
// is rendered without the root layout for some reason.
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Panel - Portfolio",
  description: "Admin panel untuk mengelola konten portfolio",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AdminNavbar />
      <main className="pt-0">{children}</main>
      <Toaster />
    </ThemeProvider>
  );
}
