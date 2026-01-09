"use client";

import { useAuth } from "@/app/admin/hooks/useAuth";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useAuth();

  const handleLogoutClick = () => {
    handleLogout();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 w-full bg-white border-b-4 border-black z-40 h-[var(--header-height)] flex-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo & Title */}
            <div className="flex items-center">
              <Link
                href="/admin"
                className="text-xl font-black uppercase tracking-tighter border-4 border-black bg-neo-accent px-4 py-2 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                Admin Panel
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Right Section */}
              <div className="flex items-center space-x-4 pl-6 border-l-4 border-black h-12">
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white border-4 border-black shadow-neo font-bold uppercase tracking-wide hover:bg-red-700 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border-4 border-black bg-white shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t-4 border-black">
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Logout */}
              <button
                onClick={handleLogoutClick}
                className="flex items-center justify-center space-x-3 px-4 py-3 w-full bg-red-600 text-white border-4 border-black shadow-neo font-bold uppercase tracking-wide hover:bg-red-700 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
