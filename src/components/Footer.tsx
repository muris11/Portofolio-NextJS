import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ];

  const quickLinks = [
    { name: "Beranda", href: "/" },
    { name: "Proyek", href: "/projects" },
    { name: "Resume", href: "/resume" },
    { name: "Kontak", href: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mb-6 leading-relaxed max-w-sm">
              Website portofolio pribadi yang menampilkan proyek, pengalaman,
              dan kemampuan saya dalam dunia pengembangan digital.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/10 touch-manipulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">
              Navigasi Cepat
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 dark:text-gray-500 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">
              Informasi Kontak
            </h4>
            <div className="space-y-4 text-gray-400 dark:text-gray-500">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <a
                    href="mailto:contact@example.com"
                    className="text-sm hover:text-primary transition-colors"
                  >
                    contact@example.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-white">Lokasi</p>
                  <span className="text-sm">Indonesia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 mt-12 sm:mt-16 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            © {currentYear} Portfolio. Dibuat dengan ❤️ menggunakan Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
