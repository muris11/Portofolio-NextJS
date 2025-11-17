import { db } from "@/lib/db";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

async function getProfile() {
  try {
    const profile = await db.profile.findFirst();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const profile = await getProfile();

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
  ].filter((link): link is NonNullable<typeof link> => link !== null);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Web Development",
    "UI/UX Design",
    "Mobile Apps",
    "Database Design",
    "API Development",
    "Consulting",
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-900 border-t border-slate-800">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900"></div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              {profile?.fullName || "Rifqy.Dev"}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              {profile?.bio ||
                "A passionate developer creating innovative solutions and beautiful user experiences. Let's build something amazing together."}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-gray-400"
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
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {profile?.email && (
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{profile.email}</span>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{profile.phone}</span>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center">
            © {currentYear} {profile?.fullName || "Rifqy.Dev"}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
