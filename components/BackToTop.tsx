"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/ModalContext";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { openProjectModal } = useModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show immediately after scrolling past the hero section
      if (window.scrollY > window.innerHeight * 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { id: "work", label: "Our Work" },
    { id: "pricing", label: "Packages" }
  ];

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 40, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
            className="fixed bottom-6 left-1/2 md:bottom-8 z-[100] hidden md:flex items-center gap-3 md:gap-4"
          >
            {/* ── ELEMENT 1: PACKAGES PILL ── */}
            {pathname === "/" ? (
              <Link
                href="/#pricing"
                onClick={(e) => handleNavClick(e, "pricing")}
                className="group relative flex items-center justify-center px-6 py-3.5 rounded-full bg-[#050505]/70 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 ease-[0.16,1,0.3,1] hover:border-[#9A0E1F]/40 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(154,14,31,0.2)] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-full pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(154,14,31,0.25)_0%,transparent_70%)] rounded-full transition-opacity duration-700 pointer-events-none" />
                <span className="relative z-10 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors duration-400">
                  Packages
                </span>
              </Link>
            ) : (
              <Link 
                href="/" 
                className="group relative flex items-center justify-center px-6 py-3.5 rounded-full bg-[#050505]/70 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 ease-[0.16,1,0.3,1] hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,255,255,0.1)] active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-full pointer-events-none" />
                <span className="relative z-10 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors duration-400">
                  Home
                </span>
              </Link>
            )}

            {/* ── ELEMENT 2: PRIMARY CTA PILL ── */}
            <button
              onClick={() => openProjectModal()}
              className="group relative flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-b from-[#151515] to-[#050505] backdrop-blur-2xl border border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-500 ease-[0.16,1,0.3,1] hover:scale-[1.03] hover:border-white/40 hover:shadow-[0_25px_60px_rgba(255,255,255,0.1)] active:scale-[0.97]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08)_0%,transparent_60%)] rounded-full pointer-events-none" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_bottom,rgba(154,14,31,0.4)_0%,transparent_80%)] rounded-full transition-opacity duration-700 pointer-events-none" />
              
              <span className="relative z-10 flex items-center gap-3 text-white font-mono font-bold text-[11px] tracking-[0.2em] uppercase">
                Start Project
                <span className="group-hover:translate-x-1.5 transition-transform duration-500 ease-[0.16,1,0.3,1] text-[14px] leading-none">→</span>
              </span>
            </button>

            {/* ── ELEMENT 3: SCROLL TO TOP BUTTON ── */}
            <button
              onClick={scrollToTop}
              className="group relative flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#050505]/70 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 ease-[0.16,1,0.3,1] hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_15px_40px_rgba(255,255,255,0.1)] active:scale-95 flex-shrink-0"
              aria-label="Scroll to top"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-full pointer-events-none" />
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-white/40 group-hover:text-white transition-colors duration-400 relative z-10"
              >
                <path d="M12 21V3M5 10l7-7 7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
