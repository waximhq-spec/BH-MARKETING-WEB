"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Estimate", href: "/estimate" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(11, 11, 11, 0.2)", "rgba(11, 11, 11, 0.65)"]
  );
  
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(255, 255, 255, 0.05)", "1px solid rgba(255, 106, 0, 0.15)"]
  );

  useEffect(() => {
    const updateScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] w-full px-4 sm:px-6 lg:px-10 pt-4 pb-2 transition-transform duration-500">
        <motion.div
          className="flex items-center justify-between gap-2 px-5 sm:px-6 py-3 transition-shadow duration-500"
          style={{
            background: navBackground,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: navBorder,
            borderRadius: "16px",
            boxShadow: isScrolled ? "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -10px 30px rgba(255,106,0,0.03)" : "none",
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
              className="h-7 w-auto object-contain hover:scale-105 transition-transform duration-300 brightness-0 invert"
            />
            <span className="ml-2.5 text-[13px] font-black tracking-[-0.03em] uppercase text-white">
              Cinmach
            </span>
          </Link>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-white/10 mx-1 shrink-0" />

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center relative gap-2">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="relative z-10 flex items-center px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase text-white/70 group-hover:text-white transition-colors duration-300"
                >
                  <span className="relative">
                    {link.name}
                    {/* Left-sliding underline */}
                    <span 
                      className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#FF6A00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[0.22,1,0.36,1]"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider before CTA */}
          <div className="hidden md:block w-px h-4 bg-white/10 mx-1 shrink-0" />

          {/* CTA Button (desktop) */}
          <div className="hidden md:flex items-center shrink-0 relative">
            <Link
              href="/estimate"
              className="flex items-center gap-2 px-6 py-2.5 text-[12px] font-black tracking-[0.25em] uppercase transition-all duration-300 ease-out group hover:scale-[1.05] hover:-translate-y-[2px] active:scale-[0.98] relative z-10 hover:shadow-[0_0_20px_rgba(255,106,0,0.4)]"
              style={{
                background: "#FF6A00",
                borderRadius: "16px",
                color: "#FFFFFF",
                border: "1px solid rgba(255,106,0,1)",
              }}
            >
              Get a Quote
              <span className="text-xs leading-none group-hover:translate-x-1 duration-300 ease-out text-white">→</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 min-w-[40px] min-h-[40px] aspect-square rounded-full border border-white/10 bg-white/5 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              className="block w-5 h-[1.5px] bg-white rounded-full"
            />
          </button>
        </motion.div>

        {/* Orange Frost / Glow Effect (Right side - Floating behind the edge) */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF6A00]/25 blur-[45px] rounded-full pointer-events-none z-[-1]"
          style={{
            maskImage: "radial-gradient(circle at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)"
          }}
        />
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
                  className="text-md tracking-[0.3em] uppercase font-black px-12 py-6 rounded-[16px] text-white bg-[#FF6A00] hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] active:scale-95 transition-all duration-300 scale-y-[1.1]"
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
