import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rifqy.Dev - Fullstack Developer Portfolio",
    template: "%s | Rifqy.Dev",
  },
  description:
    "Professional portfolio of Rifqy, a skilled Fullstack Developer specializing in modern web technologies including Next.js, TypeScript, React, and Node.js.",
  keywords: [
    "Rifqy.Dev",
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
  authors: [{ name: "Rifqy Saputra" }],
  creator: "Rifqy Saputra",
  publisher: "Rifqy.Dev",
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
    locale: "en_US",
    url: "/",
    title: "Rifqy.Dev - Fullstack Developer Portfolio",
    description:
      "Professional portfolio showcasing modern web development projects, skills, and experience in fullstack development.",
    siteName: "Rifqy.Dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rifqy.Dev - Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rifqy.Dev - Fullstack Developer Portfolio",
    description:
      "Professional portfolio showcasing modern web development projects and skills.",
    images: ["/og-image.png"],
    creator: "@rifqydev",
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
