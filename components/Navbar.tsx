"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative py-2 text-[10px] font-medium tracking-[0.18em] uppercase"
                    style={{
                      color: isActive ? accentColor : textColor,
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[#9A0E1F]" />
                    )}
                  </Link>
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

      {/* Mobile full-screen menu — use CSS visibility instead of opacity animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col bg-white"
            style={{ WebkitBackfaceVisibility: "hidden", backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-14 flex items-center justify-between px-6 shrink-0 border-b border-black/5">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <img
                  src="/HERO-LOGO.svg"
                  alt="Cinmach"
                  className="h-7 w-auto"
                  style={{ filter: "brightness(0)" }}
                />
              </Link>
              <button onClick={() => setMenuOpen(false)} className="p-2 -mr-2" aria-label="Close menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1.5">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-start px-8 pt-12 gap-8">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-black font-medium"
                  style={{
                    fontSize: "clamp(28px, 9vw, 42px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: pathname === link.href ? accentColor : "#000000",
                  }}
                >
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => { setMenuOpen(false); openProjectModal(); }}
                className="mt-8 flex items-center justify-between w-full h-[56px] px-6 bg-[#9A0E1F] text-white text-[11px] font-mono font-black tracking-[0.25em] uppercase"
              >
                <span>GET A QUOTE</span>
                <span>→</span>
              </button>
            </nav>

            <div className="px-8 py-8">
              <p className="text-black/20 font-mono text-[9px] uppercase tracking-[0.3em]">© 2026 Cinmach Productions</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
