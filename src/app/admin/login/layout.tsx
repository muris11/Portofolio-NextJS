import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Portfolio",
  description: "Login to access the admin panel",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
  );
}
