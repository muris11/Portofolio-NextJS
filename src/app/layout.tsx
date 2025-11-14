import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />

        {/* Preconnect to external domains */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* Resource Hints for better performance */}
        <link rel="prefetch" href="/contact" />
        <link rel="prefetch" href="/projects" />
        <link rel="prefetch" href="/resume" />

        {/* Module Preloading for critical components */}
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />

        {/* Preload critical CSS */}
        <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />

        {/* Preload critical images */}
        <link rel="preload" href="/favicon.ico" as="image" />
        <link rel="preload" href="/icon.svg" as="image" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>

        {/* Navigation Prefetching Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Prefetch pages on hover for better navigation performance
                const prefetchUrls = ['/contact', '/projects', '/resume'];

                function prefetchPage(url) {
                  if (!document.querySelector('link[href="' + url + '"][rel="prefetch"]')) {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = url;
                    link.as = 'document';
                    document.head.appendChild(link);
                  }
                }

                // Add hover listeners to navigation links
                function addHoverListeners() {
                  const navLinks = document.querySelectorAll('a[href^="/"]');
                  navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (prefetchUrls.includes(href)) {
                      link.addEventListener('mouseenter', () => {
                        prefetchPage(href);
                      }, { once: true });
                    }
                  });
                }

                // Initialize after DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', addHoverListeners);
                } else {
                  addHoverListeners();
                }

                // Also prefetch on touchstart for mobile devices
                document.addEventListener('touchstart', function(e) {
                  const target = e.target.closest('a[href^="/"]');
                  if (target) {
                    const href = target.getAttribute('href');
                    if (prefetchUrls.includes(href)) {
                      prefetchPage(href);
                    }
                  }
                }, { passive: true });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
