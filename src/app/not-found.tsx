"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-gray-300 dark:text-gray-600">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">😕</div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Home className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              Cari sesuatu yang lain?
            </span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {["Beranda", "Proyek", "Resume", "Kontak"].map((item) => (
              <Link
                key={item}
                href={item === "Beranda" ? "/" : `/${item.toLowerCase()}`}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          Jika Anda merasa ini adalah kesalahan, silakan{" "}
          <Link
            href="/contact"
            className="text-primary hover:text-primary/80 underline"
          >
            hubungi kami
          </Link>
        </p>
      </div>
    </div>
  );
}
