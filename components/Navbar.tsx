"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Estimate", href: "/estimate" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={clsx(
        "fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-12 lg:px-16 text-white transition-all duration-500",
        scrolled ? "bg-[#0b0b0b]/80 backdrop-blur-md border-b border-white/10 py-5 shadow-2xl" : "bg-transparent border-b border-transparent py-6"
      )}>
        <div className="flex items-center space-x-12">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center group relative z-50">
            <img 
              src="/logo.svg" 
              alt="Cinmach Logo" 
              className="h-9 sm:h-14 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-10 text-xs tracking-[0.2em] uppercase">
          {navLinks.map((link) => (
            <li key={link.name}>
               <Link href={link.href} className="flex items-center hover:text-gold-500 transition-colors">
                 {link.name === "Services" && <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3"></span>}
                 {link.name}
               </Link>
            </li>
          ))}
        </ul>

        <motion.button 
          className={clsx(
            "md:hidden flex flex-col items-center justify-center space-y-1.5 z-[110] relative w-14 h-14 focus:outline-none rounded-full transition-colors border border-white/10",
            menuOpen ? "bg-white/10" : "bg-black/20 backdrop-blur-sm"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          animate={{
            boxShadow: menuOpen ? ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 0px rgba(255,255,255,0)"] : ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.2)", "0px 0px 0px rgba(255,255,255,0)"]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span 
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7.5 : 0 }}
            className="block w-6 h-[2px] bg-white rounded-none"
          />
          <motion.span 
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-[2px] bg-white rounded-none"
          />
          <motion.span 
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7.5 : 0 }}
            className="block w-6 h-[2px] bg-white rounded-none"
          />
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#0b0b0b] flex flex-col items-center justify-center min-h-screen"
            onClick={() => setMenuOpen(false)}
          >
            <ul className="flex flex-col items-center justify-center space-y-10 text-5xl sm:text-6xl tracking-tight uppercase font-black text-center w-full px-6">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center"
                >
                  <Link 
                    href={link.href} 
                    className={clsx(
                      "transition-colors",
                      link.name === "Estimate" 
                        ? "bg-[#f97316] text-black px-8 py-4 rounded-full text-2xl sm:text-3xl w-full max-w-[300px] hover:bg-[#ea6a0a] transition-colors" 
                        : "hover:text-[#f97316] text-white"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name === "Estimate" ? "Get a Quote" : link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
