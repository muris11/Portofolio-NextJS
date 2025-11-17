"use client";

import { ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background - Consistent with Homepage */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-cyan-500/20 rotate-12 animate-spin-reverse"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-indigo-500/20 rotate-30 animate-spin-slow animation-delay-3000"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 border border-sky-500/20 -rotate-45 animate-spin-reverse animation-delay-5000"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2363b3ed' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-scale-in shadow-lg shadow-blue-500/10">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
            </span>
            <span className="text-sm font-semibold text-white tracking-wide">
              Page Not Found
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6 animate-slide-in-left tracking-tight">
            404 - Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 hover:bg-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 hover:scale-[1.02] transform-gpu backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-blue-500/20 p-12 text-center animate-fade-in-up animation-delay-600">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="text-9xl font-bold text-gray-600 animate-pulse">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl animate-bounce">😕</div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Halaman Tidak Ditemukan
            </h2>

            <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-md mx-auto">
              Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 font-semibold shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 transform-gpu overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Kembali ke Beranda
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-50"></div>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-500 font-semibold hover:scale-105 transform-gpu backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-500" />
                  Kembali
                </span>
              </button>
            </div>

            {/* Search Suggestion */}
            <div className="mt-12 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-white font-semibold">
                  Coba halaman lain:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <Link
                  href="/projects"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 text-gray-300 hover:text-white"
                >
                  📁 Projects
                </Link>
                <Link
                  href="/contact"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 text-gray-300 hover:text-white"
                >
                  💬 Contact
                </Link>
                <Link
                  href="/resume"
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-400/50 transition-all duration-300 text-gray-300 hover:text-white"
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
