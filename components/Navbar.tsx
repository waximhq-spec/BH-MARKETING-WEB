"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/ModalContext";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/estimate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "red" | "pricing">("red");
  const pathname = usePathname();
  const { openProjectModal } = useModal();

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);

          const sections = document.querySelectorAll("[data-theme]");
          let activeTheme: "dark" | "light" | "red" | "pricing" | null = null;
          
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            // Check if section occupies the space just below the navbar (e.g., 100px from top)
            if (rect.top <= 100 && rect.bottom >= 100) {
              activeTheme = section.getAttribute("data-theme") as "dark" | "light" | "red" | "pricing";
            }
          });

          if (activeTheme) {
            setTheme(activeTheme);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Trigger immediately to set initial state
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Dynamic colors - derived from state but with a failsafe for secondary pages
  const isHome = pathname === "/";
  // If we're not on home, force isLight to true unless explicitly in a dark section
  const isLight = theme === "light" || (!isHome && theme === "red");
  const isRed = theme === "red" && isHome;
  const isDark = theme === "dark";
  const isPricing = theme === "pricing";
  
  const textColor = isPricing ? "#B11226" : isLight ? "#000000" : "#FAFAFA";
  const mutedColor = isPricing ? "rgba(255,255,255,0.6)" : isLight ? "rgba(0,0,0,0.4)" : isRed ? "rgba(255,255,255,0.7)" : "rgba(250,250,250,0.6)";
  const activeColor = isPricing ? "#B11226" : isRed ? "#FFFFFF" : isLight ? "#000000" : "#C50022";
  
  // Logic for Red theme (Hero): 
  // - Unscrolled: Transparent with a thin white line
  // - Scrolled: Frosted glass (blur + slight bg)
  const redBg = scrolled ? "rgba(0, 0, 0, 0.6)" : "transparent";
  const redBorder = scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.15)";

  const bgColor = isPricing ? "rgba(10,10,10,0.98)" : isRed ? redBg : isLight ? "rgba(250,250,250,0.95)" : "rgba(0,0,0,0.95)";
  const borderColor = isPricing ? "rgba(177, 18, 38, 0.4)" : isRed ? redBorder : isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
  const burgerColor = isPricing ? "#B11226" : isLight ? "#000000" : "#FAFAFA";

  const shadow = isPricing ? "0 20px 60px rgba(177, 18, 38, 0.15)" : "none";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
        style={{
          borderBottom: isRed || scrolled ? `1px solid ${borderColor}` : "1px solid transparent",
          background: isRed || scrolled ? bgColor : "transparent",
          willChange: "transform, background",
        }}
      >
        <div className="w-full h-16 flex items-center justify-between px-8 md:px-14 lg:px-20 xl:px-24">
          {/* Wordmark Logo */}
          <Link
            href="/"
            className="block transition-all duration-500 hover:opacity-70"
          >
            <img 
              src="/HERO-LOGO.svg" 
              alt="Cinmach" 
              className="h-5 md:h-6 w-auto transition-all duration-500"
              style={{
                filter: isLight 
                  ? "brightness(0)" 
                  : isPricing 
                    ? "brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(3660%) hue-rotate(335deg) brightness(85%) contrast(105%)"
                    : "brightness(0) invert(1)"
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase transition-colors duration-500"
                style={{
                  color: pathname === link.href ? activeColor : mutedColor,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

        {/* Mobile toggle */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block w-5 h-px transition-all duration-300 origin-center"
                  style={{
                    background: burgerColor,
                    opacity: i === 1 && menuOpen ? 0 : 1,
                    transform: i === 0 && menuOpen ? "translateY(6px) rotate(45deg)" : 
                               i === 2 && menuOpen ? "translateY(-6px) rotate(-45deg)" : "",
                  }}
                />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#FAFAFA]"
          >
            {/* Dedicated Overlay Header */}
            <div className="container h-16 flex items-center justify-between shrink-0">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <img 
                  src="/HERO-LOGO.svg" 
                  alt="Cinmach" 
                  className="h-5 md:h-6 w-auto" 
                  style={{ filter: "brightness(0)" }} 
                />
              </Link>
              <button 
                onClick={() => setMenuOpen(false)} 
                aria-label="Close menu" 
                className="p-2 -mr-2 transition-transform hover:scale-90 active:scale-75"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Body */}
            <nav className="flex-1 flex flex-col justify-center items-start px-6 pb-20 gap-5 lg:px-12">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-bold text-black hover:text-[#8B0016] transition-colors duration-300 block"
                    style={{ fontSize: "clamp(28px, 8vw, 36px)", letterSpacing: "-0.03em" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                className="mt-8 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: NAV_LINKS.length * 0.08 + 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); openProjectModal(); }}
                  className="flex items-center justify-center w-full sm:w-auto h-[52px] px-10 bg-black text-white text-[10px] font-mono font-bold tracking-[0.25em] uppercase hover:bg-[#8B0016] active:scale-[0.98] transition-all duration-500 shadow-2xl"
                >
                  Start a Project
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
