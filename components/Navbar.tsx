"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useModal } from "@/components/ModalContext";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; disabled?: boolean }[];
};

const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/work" },
  { 
    label: "Services", 
    href: "/services",
    dropdown: [
      { label: "Content Production", href: "/content-production" },
      { label: "Brand Identity", href: "/brand-identity" },
      { label: "Paid Advertising", href: "#", disabled: true },
      { label: "All Services →", href: "/services" },
    ]
  },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/estimate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "red" | "pricing" | "split">("dark");
  const pathname = usePathname();
  const { openProjectModal } = useModal();
  // Store sections ref to avoid re-querying on every scroll
  const sectionsRef = useRef<Element[]>([]);
  const lastThemeRef = useRef(theme);
  const tickingRef = useRef(false);

  // Query sections once after mount/pathname change
  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll("[data-theme]"));
    // Set initial theme immediately
    const offset = 64;
    let active: string | null = null;
    sectionsRef.current.forEach((s) => {
      const rect = s.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom >= offset) {
        active = s.getAttribute("data-theme");
      }
    });
    if (!active) {
      // If no section found (top of page), infer from pathname
      active = pathname === "/" ? "dark" : "light";
    }
    setTheme(active as any);
    lastThemeRef.current = active as any;
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const offset = 64;
        let activeTheme: string | null = null;
        sectionsRef.current.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            activeTheme = section.getAttribute("data-theme");
          }
        });
        if (activeTheme && activeTheme !== lastThemeRef.current) {
          lastThemeRef.current = activeTheme;
          setTheme(activeTheme as any);
        }
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const isLight = theme === "light" || (!isHome && (theme === "red" || theme === "pricing"));
  
  // Solid backgrounds only — no rgba, no backdrop-filter, no transitions
  const bgColor = isLight ? "#ffffff" : "#000000";
  const textColor = isLight ? "#000000" : "#FAFAFA";
  const mutedTextColor = isLight ? "rgba(0,0,0,0.5)" : "rgba(250,250,250,0.5)";
  const accentColor = "#9A0E1F";

  return (
    <>
      <header
        className="relative z-[100]"
        style={{ background: bgColor, contain: "layout style" }}
      >
        <div className="container h-14 md:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="block"
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
              className="h-[26px] md:h-[32px] w-auto"
              style={{
                // Pre-compute filter values to avoid triggering layout on change
                filter: isLight
                  ? "brightness(0)"
                  : "brightness(0) invert(1)",
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <div className="flex items-center gap-7 lg:gap-9">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.dropdown && link.dropdown.some(d => pathname === d.href));
                return (
                  <div key={link.href} className="relative group flex items-center h-full">
                    <Link
                      href={link.href}
                      className="relative py-2 text-[10px] font-medium tracking-[0.18em] uppercase transition-colors flex items-center gap-1.5"
                      style={{
                        color: isActive ? accentColor : textColor,
                      }}
                    >
                      {link.label}
                      {link.dropdown && (
                        <svg className="w-2.5 h-2.5 opacity-50 transition-transform duration-300 group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#9A0E1F]" />
                      )}
                    </Link>

                    {link.dropdown && (
                      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200]">
                        <div className="flex flex-col min-w-[240px] rounded-2xl overflow-hidden border border-black/5 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                          {link.dropdown.map((item, idx) => {
                            if (item.disabled) {
                              return (
                                <div key={item.label} className="px-6 py-4 border-b border-black/5 last:border-0 opacity-50 cursor-not-allowed flex items-center justify-between">
                                  <span className="text-[13px] font-medium tracking-tight text-black/80">
                                    {item.label}
                                  </span>
                                  <span className="text-[9px] font-mono tracking-widest text-[#9A0E1F] uppercase">Coming Soon</span>
                                </div>
                              );
                            }
                            return (
                              <Link 
                                key={item.href} 
                                href={item.href}
                                className="px-6 py-4 transition-colors hover:bg-black/5 border-b border-black/5 last:border-0"
                              >
                                <span className={`block ${
                                  idx === link.dropdown!.length - 1 
                                    ? "text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#9A0E1F]" 
                                    : "text-[13px] font-medium tracking-tight text-black/80"
                                }`}>
                                  {item.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => openProjectModal()}
              className={`h-9 px-5 text-[9px] font-mono font-black tracking-[0.25em] uppercase rounded-full border transition-all duration-300 ${
                isLight 
                  ? "bg-black text-white border-transparent hover:bg-black/90" 
                  : "bg-white text-black border-transparent hover:bg-white/90"
              }`}
            >
              GET A QUOTE →
            </button>
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-px transition-transform duration-250 origin-center"
                style={{
                  background: textColor,
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform:
                    i === 0 && menuOpen ? "translateY(6px) rotate(45deg)" :
                    i === 2 && menuOpen ? "translateY(-6px) rotate(-45deg)" : "",
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu — 100dvh for iOS/Android perfection */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-[100dvh] z-[200] flex flex-col bg-white"
          >
            {/* Header matching main navbar height */}
            <div className="w-full h-14 shrink-0 flex items-center justify-between px-6 border-b border-black/5 bg-white">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <img
                  src="/HERO-LOGO.svg"
                  alt="Cinmach"
                  className="h-[26px] w-auto"
                  style={{ filter: "brightness(0)" }}
                />
              </Link>
              <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Links Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
              <nav className="flex flex-col px-8 py-10 gap-8">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <div key={link.href} className="flex flex-col">
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          if (link.dropdown) e.preventDefault();
                          else setMenuOpen(false);
                        }}
                        className="text-black font-medium tracking-tight flex items-center justify-between"
                        style={{
                          fontSize: "36px",
                          lineHeight: 1,
                          color: isActive ? accentColor : "#000000",
                        }}
                      >
                        {link.label}
                        {link.dropdown && (
                          <svg className="w-6 h-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </Link>

                      {/* Render mobile dropdown if exists */}
                      {link.dropdown && (
                        <div className="flex flex-col gap-6 mt-8 pl-4 border-l-2 border-black/10">
                          {link.dropdown.map((item, idx) => {
                            if (item.disabled) {
                              return (
                                <div key={item.label} className="flex flex-wrap items-center gap-3 opacity-50">
                                  <span className="text-[16px] font-medium tracking-tight text-black/70">{item.label}</span>
                                  <span className="text-[9px] font-mono font-bold tracking-widest text-[#9A0E1F] uppercase mt-0.5">Coming Soon</span>
                                </div>
                              );
                            }
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={`text-[16px] font-medium tracking-tight text-black/80 ${
                                  idx === link.dropdown!.length - 1 ? "text-[11px] font-mono font-bold tracking-[0.2em] uppercase !text-[#9A0E1F] pt-2" : ""
                                }`}
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
              <div className="px-8 pb-8 pt-4">
                <p className="text-black/20 font-mono text-[9px] uppercase tracking-[0.3em]">© 2026 Cinmach Productions</p>
              </div>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="shrink-0 p-6 pb-8 border-t border-black/5 bg-white">
              <button
                type="button"
                onClick={() => { setMenuOpen(false); openProjectModal(); }}
                className="w-full flex items-center justify-center h-14 rounded-full bg-[#9A0E1F] text-white text-[11px] font-mono font-black tracking-[0.25em] uppercase shadow-[0_10px_30px_rgba(154,14,31,0.25)] transition-transform active:scale-[0.98]"
              >
                GET A QUOTE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
