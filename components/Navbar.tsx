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
        "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 text-white transition-all duration-500",
        scrolled ? "bg-[#0b0b0b]/80 backdrop-blur-md border-b border-white/10 py-5 shadow-2xl" : "bg-transparent border-b border-transparent py-6"
      )}>
        <div className="flex items-center space-x-12">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest font-bold uppercase transition-colors relative z-50">
            10 Bit Production
          </Link>
          <Link href="/services" className="hidden lg:flex items-center text-xs tracking-[0.2em] uppercase font-light text-white/50 hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3"></span>
            Expertise
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-10 text-xs tracking-[0.2em] uppercase">
          {navLinks.map((link) => (
            <li key={link.name}>
               <Link href={link.href} className="hover:text-gold-500 transition-colors">
                 {link.name}
               </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle button */}
        <button 
          className="md:hidden flex flex-col items-center justify-center space-y-1.5 z-50 relative w-8 h-8 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
        >
          <motion.span 
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7.5 : 0 }}
            className="block w-6 h-[1.5px] bg-white rounded-full"
          />
          <motion.span 
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-[1.5px] bg-white rounded-full"
          />
          <motion.span 
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7.5 : 0 }}
            className="block w-6 h-[1.5px] bg-white rounded-full"
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0b0b0b] flex flex-col items-center justify-center min-h-screen"
          >
            <ul className="flex flex-col items-center space-y-10 text-xl tracking-[0.2em] uppercase font-light">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={link.href} 
                    className="hover:text-gold-500 transition-colors text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1, duration: 0.5 }}
                className="pt-10"
              >
                <Link 
                    href="/services" 
                    className="flex items-center hover:text-gold-500 transition-colors text-white/50"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="w-2 h-2 rounded-full bg-gold-500 mr-4"></span>
                    Expertise
                  </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
