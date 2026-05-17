"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/ModalContext";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/estimate" },
];


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "red" | "pricing" | "split">("red");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const pathname = usePathname();
  const { openProjectModal } = useModal();

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const lastThemeRef = { current: theme };
    // Cache the NodeList once — avoids querying DOM on every scroll tick
    let sections: NodeListOf<Element> | null = null;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const newScrolled = window.scrollY > 40;
          setScrolled(prev => prev !== newScrolled ? newScrolled : prev);

          if (!sections) {
            sections = document.querySelectorAll("[data-theme]");
          }

          let activeTheme: "dark" | "light" | "red" | "pricing" | "split" | null = null;
          const offset = 64;
          sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= offset && rect.bottom >= offset) {
              activeTheme = section.getAttribute("data-theme") as any;
            }
          });

          if (activeTheme && activeTheme !== lastThemeRef.current) {
            lastThemeRef.current = activeTheme;
            setTheme(activeTheme);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      sections = null;
    };
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

  const isHome = pathname === "/";
  const isLight = theme === "light" || (!isHome && theme === "red");
  const isRed = theme === "red" && isHome;
  const isPricing = theme === "pricing";
  const isSplit = theme === "split" && isLargeScreen;
  
  // On mobile, if theme is split, we treat it as dark (since the mobile header of that section is black)
  const isDark = theme === "dark" || (theme === "split" && !isLargeScreen);
  
  const textColor = isPricing ? "#B11226" : isLight ? "#000000" : "#FAFAFA";
  const mutedColor = isPricing ? "rgba(255,255,255,0.5)" : (isLight || isSplit) ? "rgba(0,0,0,0.35)" : isRed ? "rgba(255,255,255,0.6)" : "rgba(250,250,250,0.5)";
  const activeColor = isPricing ? "#B11226" : isRed ? "#FFFFFF" : (isLight || isSplit) ? "#000000" : "#C50022";
  
  const redBg = scrolled ? "#050505" : "#080102";
  const redBorder = scrolled ? "rgba(255,255,255,0.06)" : "transparent";

  /* FULLY SOLID BACKGROUNDS FOR iOS FIX:
     Using rgba() transparency on a fixed header forces WebKit to composite the header
     against the scrolling video behind it on every frame, causing white repaints.
     Solid hex colors eliminate the alpha blending bottleneck completely. */
  const bgColor = isPricing 
    ? (scrolled ? "#0a0a0a" : "#0d0d0d") 
    : isRed 
    ? redBg 
    : isLight 
    ? (scrolled ? "#ffffff" : "#fafafa") 
    : (scrolled ? "#000000" : "#050505");
  const borderColor = isPricing 
    ? (scrolled ? "rgba(177,18,38,0.15)" : "rgba(177, 18, 38, 0.4)") 
    : isRed 
    ? redBorder 
    : (isLight || isSplit) 
    ? (scrolled ? "rgba(0,0,0,0.04)" : "rgba(0,0,0,0.06)") 
    : (scrolled ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)");
  const burgerColor = isPricing ? "#B11226" : (isLight || isSplit) ? "#000000" : "#FAFAFA";

  return (
    <>
      <header
        className="relative z-[100] transition-[background-color,border-color] duration-500 ease-[0.16,1,0.3,1]"
        style={{
          borderBottom: `1px solid ${borderColor}`,
          background: isSplit ? "transparent" : bgColor,
          /* Simplified rendering - removed transform3d to prevent GPU layer creation conflicts on iOS */
          WebkitBackfaceVisibility: "hidden" as const,
          backfaceVisibility: "hidden" as const,
        }}
      >
        {/* SPLIT BACKGROUND FOR SPLIT THEME (Desktop Only) */}
        {isSplit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex pointer-events-none overflow-hidden transition-all duration-500 ease-[0.16,1,0.3,1]"
          >
            <div className="w-[41.666667%] bg-black h-full border-r border-white/10 border-b border-white/10 transition-all duration-700" />
            <div className="flex-1 bg-white h-full transition-all duration-700" />
          </motion.div>
        )}

        <div className="container h-14 md:h-16 flex items-center justify-between relative z-10">
          <Link 
            href="/" 
            className="block transition-all duration-400 hover:opacity-60"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img 
              src="/HERO-LOGO.svg" 
              alt="Cinmach" 
              className="h-[26px] md:h-[32px] w-auto transition-all duration-400"
              style={{
                filter: isLight 
                  ? "brightness(0)" 
                  : isPricing 
                    ? "brightness(0) saturate(100%) invert(18%) sepia(85%) saturate(3660%) hue-rotate(335deg) brightness(85%) contrast(105%)"
                    : "brightness(0) invert(1)"
              }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-7 lg:gap-9">
              {NAV_LINKS.map((link) => {
                const [isHovered, setIsHovered] = useState(false);
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative py-2 text-[10px] font-medium tracking-[0.18em] uppercase transition-all duration-400"
                    style={{ 
                      color: isHovered 
                        ? (isLight || isSplit ? "#9A0E1F" : "#FFFFFF")
                        : isActive
                        ? activeColor
                        : (isSplit ? "#000000" : (scrolled ? (isLight ? "#000000" : "#FFFFFF") : mutedColor)) 
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#9A0E1F]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA — Premium pill */}
            <button
              onClick={() => openProjectModal()}
              className={`group relative h-9 px-5 text-[9px] font-mono font-black tracking-[0.25em] uppercase overflow-hidden transition-all duration-400 rounded-full border
                ${isHome 
                  ? "bg-white text-black border-black hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)]" 
                  : "bg-[#9A0E1F] text-white border-transparent shadow-[0_4px_20px_rgba(154,14,31,0.15)]"
                }`}
            >
              <span className={`relative z-10 transition-colors duration-300 flex items-center gap-2.5 ${isHome ? "group-hover:text-white" : ""}`}>
                GET A QUOTE <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </span>
              {isHome && (
                <div className="absolute inset-0 bg-[#9A0E1F] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-[0.16,1,0.3,1] origin-left" />
              )}
            </button>
          </nav>

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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col bg-white"
          >
            <div className="w-full h-16 flex items-center justify-between px-8 shrink-0">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <img 
                  src="/HERO-LOGO.svg" 
                  alt="Cinmach" 
                  className="h-7 md:h-8 w-auto" 
                  style={{ filter: "brightness(0)" }} 
                />
              </Link>
              <button 
                onClick={() => setMenuOpen(false)} 
                className="p-2 -mr-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-10 pt-20 pb-4">
              <p className="text-black/20 font-mono text-[9px] uppercase tracking-[0.5em] font-bold">Menu</p>
            </div>

            <nav className="flex-1 flex flex-col items-start px-10 gap-10">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-black transition-all duration-300 hover:translate-x-1 hover:text-[#B11226] ${
                      pathname === link.href ? "font-semibold opacity-100" : "font-medium opacity-50"
                    }`}
                    style={{ 
                      fontSize: "clamp(32px, 10vw, 48px)", 
                      letterSpacing: "-0.03em",
                      lineHeight: 1
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                className="mt-12 w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: NAV_LINKS.length * 0.08 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); openProjectModal(); }}
                  className="flex items-center justify-between w-full h-[64px] px-8 bg-[#9A0E1F] text-white text-[11px] font-mono font-black tracking-[0.25em] uppercase active:bg-[#7a0b18] transition-colors duration-200"
                >
                  <span>GET A QUOTE</span>
                  <span>→</span>
                </button>
              </motion.div>
            </nav>

            <div className="px-10 py-12 mt-auto">
               <p className="text-black/10 font-mono text-[9px] uppercase tracking-[0.3em]">© 2026 Cinmach Productions</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
