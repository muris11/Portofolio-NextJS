"use client";

import { useProfile } from "@/hooks/useProfile";
import { Github, Instagram, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useProfile();
  const pathname = usePathname();

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

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed top-0 w-full bg-background border-b-4 border-black z-40 h-[var(--header-height)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="shrink-0">
              <Link
                href="/"
                className="text-2xl font-black uppercase tracking-tighter border-4 border-black bg-neo-accent px-4 py-2 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Rifqy.Dev
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-bold uppercase tracking-wide border-2 px-4 py-2 transition-all duration-200 ${
                      isActive(item.href)
                        ? "border-black bg-neo-secondary shadow-neo"
                        : "border-transparent hover:border-black hover:bg-neo-secondary hover:shadow-neo"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border-4 border-black bg-white shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-8 w-8" />
                ) : (
                  <Menu className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
        style={{ top: "var(--header-height)", height: "calc(100vh - var(--header-height))" }}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 w-full bg-background border-b-4 border-black shadow-neo-xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex flex-col pt-8 px-6 pb-8">
            {/* Navigation Items */}
            <div className="flex-1 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block w-full text-center text-xl font-black uppercase tracking-widest border-4 border-black py-4 transition-all ${
                    isActive(item.href)
                      ? "bg-neo-secondary shadow-neo-lg -translate-y-1"
                      : "bg-white shadow-neo hover:bg-neo-secondary hover:-translate-y-1 hover:shadow-neo-lg"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t-4 border-black">
              <p className="text-sm font-bold uppercase tracking-widest mb-4 text-center">
                Connect With Me
              </p>
              <div className="flex justify-center space-x-4">
                {displaySocialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 border-4 border-black bg-neo-accent shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
