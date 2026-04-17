"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/estimate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Theme detection logic (Intersection Observer)
  useEffect(() => {
    if (pathname !== "/") {
      setTheme("dark");
      return;
    }

    const observerOptions = {
      root: null,
      // Intersection happens as soon as the section touches the top 80px (navbar height-ish)
      rootMargin: "-80px 0px -90% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute("data-theme") as "dark" | "light";
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
  const textColor = isLight ? "#000000" : "#FAFAFA";
  const mutedColor = isLight ? "#666666" : "rgba(250,250,250,0.6)";
  const activeColor = isLight ? "#C50022" : "#C50022";
  const bgColor = isLight ? "rgba(250,250,250,0.95)" : "rgba(0,0,0,0.95)";
  const borderColor = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
  const burgerColor = isLight ? "#000000" : "#FAFAFA";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-in-out"
        style={{
          borderBottom: scrolled ? `1px solid ${borderColor}` : "1px solid transparent",
          background: scrolled ? bgColor : "transparent",
        }}
      >
        <div className="container h-16 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-[11px] font-black tracking-[0.28em] uppercase transition-colors duration-500"
            style={{ color: textColor }}
          >
            Cinmach
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] tracking-[0.2em] uppercase transition-colors duration-500"
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
            className="fixed inset-0 z-40 flex flex-col items-start justify-end pb-16 px-6"
            style={{ background: "#050505" }}
            onClick={() => setMenuOpen(false)}
          >
            <nav className="flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.45 }}
                >
                  <Link
                    href={link.href}
                    className="text-5xl font-black tracking-tight text-[#EDEDED] hover:text-white"
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
