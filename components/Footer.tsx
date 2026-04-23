"use client";

import Link from "next/link";
import { useModal } from "@/components/ModalContext";

export default function Footer() {
  const { openProjectModal } = useModal();

  return (
    <footer className="bg-white pt-16 md:pt-24 pb-8 mt-16 md:mt-32 border-t border-[#EAEAEA]">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 xl:gap-24 mb-16 md:mb-24">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <p className="text-black text-[14px] font-black tracking-[0.2em] uppercase mb-4">
              Cinmach
            </p>
            <p className="text-[#6B6B6B] text-[13px] leading-relaxed max-w-[280px]">
              We design perception. Frame by frame. A premium brand production company engineered for impact.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col">
            <h4 className="text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Services", href: "/services" },
                { label: "Our Work", href: "/work" },
                { label: "Team", href: "/team" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#6B6B6B] text-[13px] font-medium hover:text-[#B11226] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h4 className="text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@cinmach.com" className="text-[#6B6B6B] text-[13px] font-medium hover:text-[#B11226] transition-colors duration-200 w-fit">
                hello@cinmach.com
              </a>
              <a href="tel:+97300000000" className="text-[#6B6B6B] text-[13px] font-medium hover:text-[#B11226] transition-colors duration-200 w-fit">
                +973 0000 0000
              </a>
              <p className="text-[#6B6B6B] text-[13px] font-medium mt-1">
                Manama, Kingdom of Bahrain
              </p>
            </div>
          </div>

          {/* Column 4: Action / Social */}
          <div className="flex flex-col">
            <h4 className="text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <a href="#" className="text-[#6B6B6B] text-[13px] font-medium hover:text-[#B11226] transition-colors duration-200">
                  Instagram
                </a>
                <a href="#" className="text-[#6B6B6B] text-[13px] font-medium hover:text-[#B11226] transition-colors duration-200">
                  LinkedIn
                </a>
                <a href="#" className="text-[#6B6B6B] text-[13px] font-medium hover:text-[#B11226] transition-colors duration-200">
                  Vimeo
                </a>
              </div>
              <button 
                onClick={openProjectModal}
                className="mt-4 text-left text-black text-[12px] font-bold tracking-[0.1em] uppercase hover:text-[#B11226] transition-colors duration-200 flex items-center justify-between border-b border-[#EAEAEA] pb-3 hover:border-[#B11226] group"
              >
                <span>Start a Project</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#EAEAEA]">
          <p className="text-[#6B6B6B] text-[11px] font-medium tracking-wide">
            © 2026 Cinmach Productions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[#6B6B6B] text-[11px] font-medium hover:text-[#B11226] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-[#6B6B6B] text-[11px] font-medium hover:text-[#B11226] transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
