"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Work", href: "/work" },
  { name: "Estimate", href: "/estimate" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={clsx(
      "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 text-white transition-all duration-500",
      scrolled ? "bg-[#0b0b0b]/60 backdrop-blur-md border-b border-white/10 py-5 shadow-2xl" : "bg-transparent border-b border-transparent py-6"
    )}>
      <div className="flex items-center space-x-12">
        <Link href="/" className="text-sm tracking-widest font-bold uppercase transition-colors">
          10 Bit Production
        </Link>
        <Link href="/services" className="hidden lg:flex items-center text-xs tracking-[0.2em] uppercase font-light text-white/50 hover:text-white transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3"></span>
          Expertise
        </Link>
      </div>

      <ul className="hidden md:flex items-center space-x-10 text-xs tracking-[0.2em] uppercase">
        {navLinks.map((link) => (
          <li key={link.name}>
             <Link href={link.href} className="hover:text-gold-500 transition-colors">
               {link.name}
             </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
