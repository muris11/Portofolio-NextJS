import AdminFooter from "@/components/AdminFooter";
import AdminNavbar from "@/components/AdminNavbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ADMIN_SESSION_TOKEN } from "@/lib/auth";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Panel - Portfolio",
  description: "Admin panel for managing portfolio content",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check authentication on the server side
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session")?.value;

  if (!adminSession || adminSession !== ADMIN_SESSION_TOKEN) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ErrorBoundary>
        <AdminNavbar />
        <main className="pt-16">{children}</main>
        <AdminFooter />
      </ErrorBoundary>
    </div>
  );
}
