"use client";

import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/estimate" },
];

const EXPERTISE_LINKS = [
  { label: "Restaurant Videography", href: "/restaurant-videography-bahrain" },
  { label: "Food Videography", href: "/food-videography-bahrain" },
  { label: "Video Production", href: "/video-production-company-bahrain" },
  { label: "Marketing Guide", href: "/restaurant-video-marketing-bahrain" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/cinmach" },
  { label: "LinkedIn", href: "https://linkedin.com/company/cinmach" },
  { label: "TikTok", href: "https://tiktok.com/@cinmach" },
];

export default function Footer() {
  return (
    <footer data-theme="dark" className="bg-black text-white relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container pt-20 md:pt-28 pb-8">

        {/* ─── Grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-8 mb-20">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <Link href="/" className="block mb-5">
              <img
                src="/HERO-LOGO.svg"
                alt="Cinmach"
                className="h-4 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="text-white/30 text-[12px] font-light leading-relaxed max-w-[200px]">
              Cinematic content production for brands that demand more.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/25 text-[9px] font-mono font-bold tracking-[0.3em] uppercase mb-6">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/50 text-[13px] font-light hover:text-white transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-white/25 text-[9px] font-mono font-bold tracking-[0.3em] uppercase mb-6">
              Expertise
            </h4>
            <nav className="flex flex-col gap-3">
              {EXPERTISE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/50 text-[13px] font-light hover:text-white transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/25 text-[9px] font-mono font-bold tracking-[0.3em] uppercase mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contact@cinmachproductions.com" className="text-white/50 text-[13px] font-light hover:text-white transition-colors duration-300 w-fit break-all">
                contact@cinmachproductions.com
              </a>
              <a href="https://wa.me/97330000000" target="_blank" rel="noopener noreferrer" className="text-white/50 text-[13px] font-light hover:text-white transition-colors duration-300 w-fit">
                WhatsApp
              </a>
              <p className="text-white/30 text-[12px] font-light mt-1">Manama, Bahrain</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white/25 text-[9px] font-mono font-bold tracking-[0.3em] uppercase mb-6">
              Social
            </h4>
            <div className="flex flex-col gap-3">
              {SOCIALS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 text-[13px] font-light hover:text-white transition-colors duration-300 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[10px] font-mono tracking-[0.15em] uppercase">
            &copy; 2026 Cinmach Productions. All rights reserved.
          </p>
          <p className="text-white/15 text-[10px] font-mono tracking-[0.15em] uppercase">
            Bahrain
          </p>
        </div>
      </div>
    </footer>
  );
}
