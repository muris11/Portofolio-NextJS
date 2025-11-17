"use client";

import { useProfile } from "@/hooks/useProfile";
import { Github, Instagram, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfile();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  // Dynamically generate social links from profile data or fallback
  const socialLinks = [
    profile?.githubUrl
      ? {
          icon: Github,
          href: profile.githubUrl,
          label: "GitHub",
        }
      : null,
    profile?.linkedinUrl
      ? {
          icon: Linkedin,
          href: profile.linkedinUrl,
          label: "LinkedIn",
        }
      : null,
    profile?.instagramUrl
      ? {
          icon: Instagram,
          href: profile.instagramUrl,
          label: "Instagram",
        }
      : null,
  ].filter((link): link is NonNullable<typeof link> => link !== null);

  // Fallback social links if profile data is not available
  const fallbackSocialLinks = [
    {
      icon: Github,
      href: "https://github.com/muris11",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/rifqy-saputra-022236261/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/rfqy_sptr",
      label: "Instagram",
    },
  ];

  // Use profile social links if available, otherwise use fallback
  const displaySocialLinks =
    socialLinks.length > 0 ? socialLinks : fallbackSocialLinks;

  return (
    <>
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-2xl border-b border-white/20 z-50 transition-all duration-500 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent transition-all duration-500 hover:scale-110 hover:from-blue-200 hover:to-cyan-300"
              >
                Rifqy.Dev
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-gray-300 hover:text-white px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-500 group hover:bg-white/10 backdrop-blur-xl border border-transparent hover:border-white/20 overflow-hidden"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 group-hover:w-3/4 rounded-full"></span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center justify-center p-3 rounded-2xl text-gray-300 hover:text-white hover:bg-white/10 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300 touch-manipulation border border-white/20 hover:border-white/40 overflow-hidden group"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative z-10">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Improved slide-in animation */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/70 backdrop-blur-2xl transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-950/95 backdrop-blur-2xl border-l border-white/30 shadow-2xl transform transition-transform duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                Navigation Menu
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="relative p-3 rounded-2xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 touch-manipulation border border-white/20 hover:border-white/40 group"
                aria-label="Close menu"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <X className="h-5 w-5 relative z-10" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative block px-5 py-4 text-gray-300 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-500 font-medium touch-manipulation border border-transparent hover:border-white/20 overflow-hidden group"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm font-medium bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-4">
                  Connect With Me
                </p>
                <div className="flex space-x-4">
                  {displaySocialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="relative text-gray-400 hover:text-white transition-all duration-300 p-4 rounded-2xl hover:bg-white/10 touch-manipulation border border-white/20 hover:border-primary/60 group"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        <Icon className="h-5 w-5 relative z-10" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
