"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./ModalContext";

const SERVICES = [
  "Real Estate Films",
  "Brand Commercials",
  "Social Media Ads",
  "Video Editing",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
];

function CustomSelect({ 
  label, 
  options, 
  value, 
  onChange 
}: { 
  label: string, 
  options: string[], 
  value: string, 
  onChange: (val: string) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex-1 relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 text-white py-4 px-5 text-left flex justify-between items-center transition-all duration-300 focus:border-[#B11226]/50"
      >
        <span className={value ? "text-white" : "text-white/20"}>
          {value || label}
        </span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          width="12" height="8" viewBox="0 0 12 8" fill="none"
        >
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" className="text-white/40" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-[#111] border border-white/10 shadow-2xl overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className="w-full text-left px-5 py-3 text-white/60 hover:bg-[#B11226] hover:text-white transition-colors text-sm"
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectModal() {
  const { isProjectModalOpen, closeProjectModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    details: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isProjectModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isProjectModalOpen]);

  return (
    <AnimatePresence mode="wait">
      {isProjectModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-end md:items-center justify-center bg-black/90 md:bg-black/80 md:p-8 overflow-y-auto"
          onClick={closeProjectModal}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className={`relative w-full ${isMobile ? "max-w-full" : "max-w-[700px]"} bg-[#0B0B0B]/95 backdrop-blur-2xl p-8 md:p-14 border-t md:border border-white/10 rounded-t-[32px] md:rounded-none shadow-[0_-20px_80px_rgba(0,0,0,0.8)]`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grabber for Mobile */}
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-10 md:hidden" />

            {/* Close Button (Desktop Only) */}
            <button
              onClick={closeProjectModal}
              className="hidden md:flex absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-white font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-4 uppercase leading-[0.9]">
                {isMobile ? "Book Your\nShoot" : "Get a\nQuote"}
              </h2>
              <p className="text-white/30 font-light text-sm tracking-[0.1em] uppercase">
                {isMobile ? "Limited Slots Available" : "Start your cinematic journey today."}
              </p>
            </div>

            {/* Form */}
            <form 
              className="flex flex-col gap-4" 
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted:", formData);
              }}
            >
              <div className="space-y-5">
                {isMobile ? (
                  /* MOBILE SHORT FORM */
                  <>
                    <div className="relative group/input">
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        className="w-full bg-white/[0.03] border border-white/10 text-white py-5 px-6 focus:outline-none focus:border-[#B11226] focus:bg-white/[0.06] transition-all duration-500 placeholder:text-white/10 rounded-sm text-base relative z-10 focus:shadow-[0_0_20px_rgba(177,18,38,0.2)]"
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <div className="absolute -inset-1 bg-[#B11226]/20 opacity-0 group-focus-within/input:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
                    </div>
                    
                    <div className="relative group/input">
                      <input 
                        type="tel" 
                        placeholder="Phone / WhatsApp Number" 
                        className="w-full bg-white/[0.03] border border-white/10 text-white py-5 px-6 focus:outline-none focus:border-[#B11226] focus:bg-white/[0.06] transition-all duration-500 placeholder:text-white/10 rounded-sm text-base relative z-10 focus:shadow-[0_0_20px_rgba(177,18,38,0.2)]"
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                      <div className="absolute -inset-1 bg-[#B11226]/20 opacity-0 group-focus-within/input:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
                    </div>

                    <div className="relative group/input">
                      <input 
                        type="text" 
                        placeholder="Business Name (Optional)" 
                        className="w-full bg-white/[0.03] border border-white/10 text-white py-5 px-6 focus:outline-none focus:border-[#B11226] focus:bg-white/[0.06] transition-all duration-500 placeholder:text-white/10 rounded-sm text-base relative z-10 focus:shadow-[0_0_20px_rgba(177,18,38,0.2)]"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                      <div className="absolute -inset-1 bg-[#B11226]/20 opacity-0 group-focus-within/input:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
                    </div>
                  </>
                ) : (
                  /* DESKTOP DETAILED FORM */
                  <>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="relative group/input">
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          className="w-full bg-white/[0.03] border border-white/10 text-white py-5 px-6 focus:outline-none focus:border-[#B11226] focus:bg-white/[0.06] transition-all duration-500 placeholder:text-white/10 rounded-sm text-sm relative z-10 focus:shadow-[0_0_20px_rgba(177,18,38,0.2)]"
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        <div className="absolute -inset-1 bg-[#B11226]/20 opacity-0 group-focus-within/input:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
                      </div>
                      <div className="relative group/input">
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          className="w-full bg-white/[0.03] border border-white/10 text-white py-5 px-6 focus:outline-none focus:border-[#B11226] focus:bg-white/[0.06] transition-all duration-500 placeholder:text-white/10 rounded-sm text-sm relative z-10 focus:shadow-[0_0_20px_rgba(177,18,38,0.2)]"
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        <div className="absolute -inset-1 bg-[#B11226]/20 opacity-0 group-focus-within/input:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="relative group/input">
                      <input 
                        type="text" 
                        placeholder="Company / Brand Name" 
                        className="w-full bg-white/[0.03] border border-white/10 text-white py-5 px-6 focus:outline-none focus:border-[#B11226] focus:bg-white/[0.06] transition-all duration-500 placeholder:text-white/10 rounded-sm text-sm relative z-10 focus:shadow-[0_0_20px_rgba(177,18,38,0.2)]"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                      <div className="absolute -inset-1 bg-[#B11226]/20 opacity-0 group-focus-within/input:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <CustomSelect 
                        label="Service Required" 
                        options={SERVICES} 
                        value={formData.service}
                        onChange={(val) => setFormData({...formData, service: val})}
                      />
                      <CustomSelect 
                        label="Project Budget" 
                        options={BUDGETS} 
                        value={formData.budget}
                        onChange={(val) => setFormData({...formData, budget: val})}
                      />
                    </div>
                  </>
                )}

                <div className="relative group/input">
                  <textarea 
                    rows={3} 
                    placeholder={isMobile ? "Briefly tell us what you need" : "Project Details / Specific Requirements"} 
                    className="w-full bg-white/[0.03] border border-white/10 text-white py-5 px-6 focus:outline-none focus:border-[#B11226] focus:bg-white/[0.06] transition-all duration-500 resize-none placeholder:text-white/10 rounded-sm text-base relative z-10 focus:shadow-[0_0_20px_rgba(177,18,38,0.2)]"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                  ></textarea>
                  <div className="absolute -inset-1 bg-[#B11226]/20 opacity-0 group-focus-within/input:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <button 
                  type="submit" 
                  className="w-full bg-[#B11226] text-white font-mono font-black text-[11px] tracking-[0.4em] uppercase h-[75px] hover:bg-[#8B101F] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_40px_rgba(177,18,38,0.3)] rounded-sm"
                >
                  {isMobile ? "Send Request" : "Submit Brief"}
                </button>
                
                <div className="py-2 flex items-center justify-center">
                  <div className="w-12 h-px bg-white/5" />
                </div>

                <a 
                  href="https://wa.me/97333333333" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full border border-white/10 bg-transparent text-white/40 font-mono font-bold text-[9px] tracking-[0.3em] uppercase h-[60px] flex items-center justify-center gap-3 hover:bg-white/5 hover:text-white transition-all active:scale-[0.98] rounded-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-40">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.522-2.961-2.638-.087-.117-.708-.941-.708-1.803 0-.861.449-1.284.609-1.455.16-.171.348-.214.464-.214.116 0 .232.001.334.006.109.004.254-.041.399.31.144.354.493 1.204.536 1.29.043.087.072.188.014.305-.058.116-.087.188-.174.29-.087.101-.183.225-.261.305-.087.087-.178.182-.077.354.101.171.449.741.965 1.201.664.591 1.223.774 1.397.86.174.087.275.073.376-.041.101-.116.434-.506.55-.68.116-.174.232-.145.391-.087.159.058 1.013.477 1.187.564.174.087.29.13.334.203.041.07.041.405-.104.81zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.66 1.438 5.17L2 22l4.99-1.398A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.477 0-2.866-.395-4.066-1.078l-.291-.166-3.024.846.862-3.148-.184-.294A7.957 7.957 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                
                <button 
                  onClick={closeProjectModal}
                  className="mt-2 text-white/5 font-mono text-[9px] uppercase tracking-[0.4em] py-4 md:hidden border-t border-white/5"
                >
                  Return to Site
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
