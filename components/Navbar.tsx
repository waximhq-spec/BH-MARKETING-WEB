"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Estimate", href: "/estimate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Calculate highlight position based on hovered item
  useEffect(() => {
    if (hoveredIndex === null || !navRef.current) return;
    const item = itemRefs.current[hoveredIndex];
    if (!item) return;
    const navRect = navRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    setHighlightStyle({
      left: itemRect.left - navRect.left,
      width: itemRect.width,
    });
  }, [hoveredIndex]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] w-full px-4 sm:px-6 lg:px-10 pt-4 pb-2">
        <div
          className="flex items-center justify-between gap-2 px-5 sm:px-6 py-3"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center mr-2 pl-1 shrink-0"
          >
            <img
              src="/logo.svg?v=3"
              alt="Cinmach Logo"
              className="h-7 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
            <span className="ml-2.5 text-[13px] font-black tracking-[-0.03em] uppercase text-[#050505]">
              Cinmach
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-black/10 mx-1 shrink-0" />

          {/* Desktop Nav Items */}
          <ul
            ref={navRef}
            className="hidden md:flex items-center relative"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Sliding Highlight */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  key="highlight"
                  className="absolute top-0 bottom-0 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    left: highlightStyle.left,
                    width: highlightStyle.width,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    left: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                    width: { duration: 0.2, ease: "easeOut" },
                    opacity: { duration: 0.15 },
                  }}
                  style={{
                    background: "rgba(0, 0, 0, 0.04)",
                    boxShadow: "0 0 12px rgba(246, 112, 17, 0.04), inset 0 0 8px rgba(0, 0, 0, 0.02)",
                  }}
                />
              )}
            </AnimatePresence>

            {navLinks.map((link, i) => (
              <li
                key={link.name}
                ref={(el) => { itemRefs.current[i] = el; }}
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className="relative z-10 flex items-center px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors duration-200"
                  style={{
                    color: hoveredIndex === i ? "#050505" : "rgba(5, 5, 5, 0.5)",
                  }}
                >
                  {/* Subtle orange underline on hover */}
                  <span className="relative">
                    {link.name}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                      style={{ background: "#F67011" }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: hoveredIndex === i ? 1 : 0,
                        opacity: hoveredIndex === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider before CTA */}
          <div className="hidden md:block w-px h-4 bg-black/10 mx-1 shrink-0" />

          {/* CTA Button (desktop) */}
          <Link
            href="/estimate"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 text-[12px] font-black tracking-[0.25em] uppercase shrink-0 transition-all duration-300 group shadow-sm active:scale-95 scale-y-[1.1]"
            style={{
              background: "#181818",
              borderRadius: "9999px",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#000000";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#181818";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Get a Quote
            <span style={{ color: "#FFFFFF" }} className="text-xs leading-none group-hover:translate-x-0.5 transition-transform duration-300">→</span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 min-w-[40px] min-h-[40px] aspect-square rounded-full border border-black/10 bg-black/5 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              className="block w-5 h-[1.5px] bg-black/80 rounded-full"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-5 h-[1.5px] bg-black/80 rounded-full"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              className="block w-5 h-[1.5px] bg-black/80 rounded-full"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center min-h-screen"
            style={{ background: "rgba(255, 255, 255, 0.98)", backdropFilter: "blur(20px)" }}
            onClick={() => setMenuOpen(false)}
          >
            <ul className="flex flex-col items-center justify-center gap-10 text-5xl sm:text-6xl tracking-tight uppercase font-black text-center w-full px-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: "easeOut" }}
                  className="w-full flex justify-center"
                >
                  <Link
                    href={link.href}
                    className="text-[#050505] hover:text-black/50 transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.15 + navLinks.length * 0.08, duration: 0.45, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <Link
                  href="/estimate"
                  className="text-md tracking-[0.3em] uppercase font-black px-12 py-6 rounded-full text-white bg-[#181818] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] active:scale-95 transition-all duration-300 scale-y-[1.1]"
                  onClick={() => setMenuOpen(false)}
                >
                  Get a Quote →
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
