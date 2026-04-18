"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/estimate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light" | "red">("red");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme detection logic (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -90% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute("data-theme") as "dark" | "light" | "red";
          if (sectionTheme) setTheme(sectionTheme);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll("[data-theme]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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

  // Dynamic colors
  const isLight = theme === "light";
  const isRed = theme === "red";
  
  const textColor = isLight ? "#000000" : "#FAFAFA";
  const mutedColor = isLight ? "#666666" : isRed ? "rgba(255,255,255,0.7)" : "rgba(250,250,250,0.6)";
  const activeColor = isRed ? "#FFFFFF" : "#C50022";
  
  // Logic for Red theme (Hero): 
  // - Unscrolled: Transparent with a thin white line
  // - Scrolled: Frosted glass (blur + slight bg)
  const redBg = scrolled ? "rgba(0, 0, 0, 0.4)" : "transparent";
  const redBlur = scrolled ? "blur(20px)" : "none";
  const redBorder = scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.15)";

  const bgColor = isRed ? redBg : isLight ? "rgba(250,250,250,0.95)" : "rgba(0,0,0,0.95)";
  const backdropBlur = isRed ? redBlur : scrolled ? "blur(12px)" : "none";
  const borderColor = isRed ? redBorder : isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";
  const burgerColor = isLight ? "#000000" : "#FAFAFA";

  const shadow = "none";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
        style={{
          borderBottom: isRed || scrolled ? `1px solid ${borderColor}` : "1px solid transparent",
          background: isRed || scrolled ? bgColor : "transparent",
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          boxShadow: shadow,
        }}
      >
        <div className="container h-16 flex items-center justify-between">
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
                filter: isLight ? "brightness(0)" : "brightness(0) invert(1)"
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center px-6"
            style={{ 
              background: "#FAFAFA", 
            }}
            onClick={() => setMenuOpen(false)}
          >
            <nav className="flex flex-col items-center gap-8" onClick={(e) => e.stopPropagation()}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.45 }}
                >
                  <Link
                    href={link.href}
                    className="font-black text-black hover:text-[#8B0016] transition-colors duration-300 text-center block pt-1"
                    style={{ fontSize: "clamp(3.5rem, 12vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
