import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Portfolio - Website Portofolio Pribadi",
    template: "%s | Portfolio",
  },
  description:
    "Website portofolio pribadi yang menampilkan proyek, pengalaman, dan kemampuan saya sebagai Fullstack Developer.",
  keywords: [
    "portfolio",
    "developer",
    "web",
    "projects",
    "resume",
    "fullstack",
    "nextjs",
    "react",
    "typescript",
  ],
  authors: [{ name: "Portfolio Owner" }],
  creator: "Portfolio Owner",
  publisher: "Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Portfolio - Website Portofolio Pribadi",
    description:
      "Website portofolio pribadi yang menampilkan proyek, pengalaman, dan kemampuan saya sebagai Fullstack Developer.",
    siteName: "Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Website Portofolio Pribadi",
    description:
      "Website portofolio pribadi yang menampilkan proyek, pengalaman, dan kemampuan saya sebagai Fullstack Developer.",
    images: ["/og-image.jpg"],
    creator: "@portfolio_owner",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </>
  );
}
