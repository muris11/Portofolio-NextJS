"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-neo-accent border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform rotate-2">
            <span className="font-bold uppercase tracking-widest text-sm">
              Page Not Found
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
            404 - Error
          </h1>
          <p className="text-xl font-medium max-w-2xl mx-auto border-l-4 border-black pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="neo-card p-12 text-center bg-white">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="text-9xl font-black text-black opacity-10">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">😕</div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl font-black uppercase mb-4">
              Halaman Tidak Ditemukan
            </h2>

            <p className="font-medium mb-8 text-lg leading-relaxed max-w-md mx-auto">
              Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                href="/"
                className="neo-btn flex items-center justify-center gap-2"
              >
                <Home className="h-5 w-5" />
                Kembali ke Beranda
              </Link>

              <button
                onClick={() => window.history.back()}
                className="neo-btn-secondary flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Kembali
              </button>
            </div>

            {/* Search Suggestion */}
            <div className="p-6 bg-neo-secondary border-4 border-black shadow-neo">
              <div className="flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-black mr-2" />
                <span className="font-black uppercase">
                  Coba halaman lain:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-bold uppercase">
                <Link
                  href="/projects"
                  className="p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-all shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  📁 Projects
                </Link>
                <Link
                  href="/contact"
                  className="p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-all shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  💬 Contact
                </Link>
                <Link
                  href="/resume"
                  className="p-3 bg-white border-2 border-black hover:bg-black hover:text-white transition-all shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  📄 Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
