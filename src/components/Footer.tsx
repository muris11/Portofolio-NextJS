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
    <footer className="bg-neo-secondary border-t-4 border-black text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-4xl font-black uppercase tracking-tighter">
              {profile?.fullName || "Rifqy.Dev"}
            </h3>
            <p className="text-lg font-medium leading-relaxed max-w-md border-l-4 border-black pl-4">
              The official portfolio website of Muhammad Rifqy Saputra.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="p-3 border-4 border-black bg-white shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <Icon className="h-6 w-6" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-black uppercase tracking-widest mb-6 border-b-4 border-black inline-block">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-lg font-bold hover:underline decoration-4 underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-black uppercase tracking-widest mb-6 border-b-4 border-black inline-block">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-lg font-bold">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t-4 border-black mt-12 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {profile?.email && (
              <div className="flex items-center space-x-3 font-bold">
                <div className="p-2 border-2 border-black bg-white">
                  <Mail className="h-5 w-5" />
                </div>
                <span>{profile.email}</span>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center space-x-3 font-bold">
                <div className="p-2 border-2 border-black bg-white">
                  <Phone className="h-5 w-5" />
                </div>
                <span>{profile.phone}</span>
              </div>
            )}
            {profile?.location && (
              <div className="flex items-center space-x-3 font-bold">
                <div className="p-2 border-2 border-black bg-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <span>{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="font-bold text-center uppercase tracking-wide">
            © {currentYear} {profile?.fullName || "Rifqy.Dev"}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
