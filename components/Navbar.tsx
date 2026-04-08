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
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center space-x-3 group relative z-50">
            <svg 
              width="40" 
              height="32" 
              viewBox="0 0 40 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-10 h-auto sm:w-12"
            >
              <path 
                d="M8.5 2L1 18.5L8.5 30H15L7.5 18.5L15 2H8.5Z" 
                fill="white" 
                className="group-hover:fill-gold-500 transition-colors"
              />
              <path 
                d="M18.5 2L11 18.5L18.5 30H39L31.5 18.5C31.5 18.5 36.5 17 38.5 14C40.5 11 39.5 7 37 4C34.5 1 30 2 30 2H18.5ZM25.5 8H31.5C33 8 34 10 33 11.5C32.5 12.5 31.5 13.5 29.5 13.5H23L25.5 8ZM21.5 17.5H30.5L28 23.5H20.5L21.5 17.5Z" 
                fill="white" 
                className="group-hover:fill-gold-500 transition-colors opacity-90"
              />
            </svg>
            <span className="hidden sm:inline-block font-bold tracking-widest text-[10px] uppercase">10Bit</span>
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
            "md:hidden flex flex-col items-center justify-center space-y-1.5 z-[110] relative w-10 h-10 focus:outline-none rounded-full transition-colors",
            menuOpen ? "bg-white/10" : "bg-black/20 backdrop-blur-sm"
          )}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          animate={{
            boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 12px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
          }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          whileTap={{ scale: 0.8 }}
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
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-[#0b0b0b] flex flex-col items-center justify-center min-h-screen"
            onClick={() => setMenuOpen(false)}
          >
            <ul className="flex flex-col items-center justify-center space-y-12 text-3xl sm:text-4xl tracking-[0.2em] uppercase font-light text-center w-full px-6">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                >
                  <Link 
                    href={link.href} 
                    className="flex items-center hover:text-gold-500 transition-colors text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name === "Services" && <span className="w-2 h-2 rounded-full bg-gold-500 mr-4"></span>}
                    {link.name}
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
