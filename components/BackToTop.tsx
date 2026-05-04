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

  const [isPricingVisible, setIsPricingVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show immediately after scrolling past the hero section (approx 100vh)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Intersection Observer to detect if we are in the Pricing/Packages section
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPricingVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.05,
        rootMargin: "-10% 0px -10% 0px" // Slight buffer to ensure it hides/shows cleanly
      }
    );

    const pricingElement = document.getElementById("pricing");
    if (pricingElement) {
      observer.observe(pricingElement);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (pricingElement) observer.unobserve(pricingElement);
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

  return (
    <>
      <AnimatePresence>
        {isVisible && !isPricingVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 50, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 md:bottom-8 left-1/2 z-[100] hidden md:flex items-center gap-3 md:gap-4"
          >
            {/* ── THE NAVIGATION PILL ── */}
            <div className="flex items-center bg-white rounded-full p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-black/5">
              <div className="flex items-center px-4 md:px-6 gap-5 md:gap-8">
                {pathname === "/" ? (
                  <>
                    <Link 
                      href="/#work" 
                      onClick={(e) => handleNavClick(e, "work")}
                      className="text-[11px] font-mono font-bold text-black/80 hover:text-[#B11226] tracking-[0.15em] uppercase transition-colors whitespace-nowrap"
                    >
                      Our Work
                    </Link>
                    
                    <Link 
                      href="/#pricing" 
                      onClick={(e) => handleNavClick(e, "pricing")}
                      className="text-[11px] font-mono font-bold text-black/80 hover:text-[#B11226] tracking-[0.15em] uppercase transition-colors whitespace-nowrap"
                    >
                      Packages
                    </Link>
                  </>
                ) : (
                  <Link 
                    href="/" 
                    className="text-[11px] font-mono font-bold text-black/80 hover:text-[#B11226] tracking-[0.15em] uppercase transition-colors whitespace-nowrap px-2"
                  >
                    Home
                  </Link>
                )}
              </div>
              
              <button
                onClick={openProjectModal}
                className="ml-2 md:ml-3 bg-[#111] hover:bg-black text-white px-6 py-3 rounded-full text-[11px] font-mono font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center gap-2 whitespace-nowrap"
              >
                FREE CONSULTATION <span className="opacity-70">→</span>
              </button>
            </div>

            {/* ── THE BACK TO TOP BUTTON ── */}
            <button
              onClick={scrollToTop}
              className="w-[46px] h-[46px] rounded-full bg-white border border-black/5 text-black flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-[#B11226] hover:text-white hover:border-[#B11226] md:hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
              aria-label="Scroll to top"
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="square" 
                strokeLinejoin="miter"
                className="mb-0.5"
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
