"use client";

import Link from "next/link";
import { useModal } from "@/components/ModalContext";

export default function Footer() {
  const { openProjectModal } = useModal();

  return (
    <footer className="bg-[#000000] text-white pt-24 md:pt-40 pb-6 md:pb-8 relative overflow-hidden">
      {/* Subtle Noise Texture overlay - optimized without blend-modes */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Extremely subtle radial glow from the absolute bottom center - optimized without blur-3xl */}
      <div className="absolute -bottom-[200px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(139,0,22,0.15)_0%,transparent_70%)] pointer-events-none opacity-60" />

      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 xl:px-24 relative z-10 flex flex-col items-center">
        
        {/* ══════════════════════════════════════════════════════
            TOP LAYER: THE FINAL CTA — REFINED & COMPACT
        ══════════════════════════════════════════════════════ */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24 md:mb-32">
          
          {/* Left: Content Block */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            <p className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] mb-6 font-bold">
              The Next Step
            </p>
            <h2
              className="font-black text-white leading-[1.1] mb-6 tracking-tighter"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em" }}
            >
              Let&apos;s build your <span className="text-white/30 italic font-serif">cinematic legacy.</span>
            </h2>
            <p className="text-white/50 text-sm md:text-base font-light max-w-lg leading-relaxed">
              We transform average visual identities into high-end brand authorities. Built for brands that demand a higher standard.
            </p>
          </div>
          
          {/* Right: Action Block */}
          <div className="shrink-0 pb-2">
            <button 
              onClick={openProjectModal}
              className="group relative flex items-center gap-6 px-10 py-5 bg-white text-black text-[11px] font-mono font-bold tracking-[0.25em] uppercase transition-all duration-500 overflow-hidden"
            >
               <span className="relative z-10 transition-colors duration-500 flex items-center group-hover:text-white">
                 Book a Shoot <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-500">→</span>
               </span>
               {/* Minimal hover fill */}
               <div className="absolute inset-0 bg-[#8B0016] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            MIDDLE LAYER: NAVIGATION & INFO GRID
        ══════════════════════════════════════════════════════ */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 border-t border-white/10 pt-16 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <Link href="/" className="mb-6 block">
              {/* Minimal SVG or Text Logo alternative - Using standard heavy text for brutalism */}
              <span className="font-black text-xl tracking-tighter uppercase text-white hover:text-white/70 transition-colors">CINMACH.</span>
            </Link>
            <p className="text-white/40 font-serif italic text-sm md:text-base leading-relaxed tracking-wide">
              Cinematic.<br />Strategic.<br />Intentional.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col">
            <h4 className="text-white/30 text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-8">
              Navigation
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Services", href: "/services" },
                { label: "Our Work", href: "/work" },
                { label: "Team", href: "/team" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center text-white/70 text-[13px] font-medium transition-colors"
                >
                   <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-[#8B0016] transition-all duration-300 ease-out font-black opacity-0 group-hover:opacity-100">-</span>
                   <span className="group-hover:text-white transition-colors duration-300">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col">
            <h4 className="text-white/30 text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-8">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:contact@cinmachproductions.com" className="group flex flex-col w-fit">
                <span className="text-white/70 text-[13px] font-medium group-hover:text-white transition-colors">contact@cinmachproductions.com</span>
                <span className="w-0 h-[1px] bg-[#8B0016] group-hover:w-full transition-all duration-500 ease-out mt-1" />
              </a>
            </div>
          </div>

          {/* Column 4: Social */}
          <div className="flex flex-col">
            <h4 className="text-white/30 text-[10px] font-mono font-bold tracking-[0.3em] uppercase mb-8">
              Social
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { label: "Instagram", href: "#" },
                { label: "LinkedIn", href: "#" },
              ].map((link) => (
                 <a 
                   key={link.label} 
                   href={link.href} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group flex w-fit items-center text-white/70 text-[13px] font-medium transition-colors"
                 >
                   <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-[#8B0016] transition-all duration-300 ease-out font-black opacity-0 group-hover:opacity-100">-</span>
                   <span className="group-hover:text-white transition-colors duration-300">{link.label}</span>
                 </a>
              ))}
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM STRIP
        ══════════════════════════════════════════════════════ */}
        <div className="w-full flex justify-between items-center border-t border-white/5 pt-6 mt-auto">
          <p className="text-white/30 text-[10px] md:text-[11px] font-mono tracking-widest uppercase">
            © 2026 Cinmach Productions
          </p>
          <p className="text-white/30 text-[10px] md:text-[11px] font-mono tracking-widest uppercase">
            All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
}
