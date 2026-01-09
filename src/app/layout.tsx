import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rifqy.Dev - Fullstack Developer Portfolio",
    template: "%s | Rifqy.Dev",
  },
  description:
    "Professional portfolio of Rifqy, a skilled Fullstack Developer specializing in modern web technologies including Next.js, TypeScript, React, and Node.js. View my projects, experience, and skills.",
  keywords: [
    "Fullstack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Rifqy.Dev",
    "JavaScript",
    "Frontend",
    "Backend",
    "Software Engineer",
  ],
  authors: [{ name: "Rifqy" }],
  creator: "Rifqy",
  publisher: "Rifqy.Dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rifqy.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rifqy.dev",
    title: "Rifqy.Dev - Fullstack Developer Portfolio",
    description:
      "Professional portfolio showcasing modern web development projects, skills, and experience in fullstack development.",
    siteName: "Rifqy.Dev",
    images: [
      {
        url: "https://rifqy.dev/og-image.png",
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
    images: ["https://rifqy.dev/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "portfolio",
  verification: {
    google: "googlebf61d5da6cf3d8be",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="googlebf61d5da6cf3d8be"
        />
      </head>
      <body
        className="antialiased bg-background text-foreground font-sans min-h-screen"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ErrorBoundary>{children}</ErrorBoundary>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
