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
        className="w-full bg-white border border-[#e5e5e5] text-black py-4 px-5 text-left flex justify-between items-center transition-all duration-300 focus:border-black"
      >
        <span className={value ? "text-black" : "text-[#777]"}>
          {value || label}
        </span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          width="12" height="8" viewBox="0 0 12 8" fill="none"
        >
          <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="1.5" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-[#e5e5e5] shadow-xl"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className="w-full text-left px-5 py-3 text-black hover:bg-black hover:text-white transition-colors text-sm"
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
    email: "",
    company: "",
    service: "",
    budget: "",
    details: "",
  });

  // Lock body scroll
  useEffect(() => {
    if (isProjectModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isProjectModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProjectModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeProjectModal]);

  return (
    <AnimatePresence>
      {isProjectModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 md:p-8 overflow-y-auto"
          onClick={closeProjectModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-[650px] bg-white p-8 md:p-16 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className="absolute top-6 right-6 p-2 text-black/20 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-12 text-center">
              <h2 className="text-black font-black text-3xl md:text-4xl tracking-tight mb-3">
                START A PROJECT
              </h2>
              <p className="text-black/40 font-light text-sm">
                Fill out the form below and we&apos;ll get in touch.
              </p>
            </div>

            {/* Form */}
            <form 
              className="flex flex-col gap-6" 
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submitted:", formData);
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="flex-1 bg-white border border-[#e5e5e5] text-black py-4 px-5 focus:outline-none focus:border-black transition-all placeholder:text-black/30"
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="flex-1 bg-white border border-[#e5e5e5] text-black py-4 px-5 focus:outline-none focus:border-black transition-all placeholder:text-black/30"
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <input 
                type="text" 
                placeholder="Company / Brand Name (Optional)" 
                className="w-full bg-white border border-[#e5e5e5] text-black py-4 px-5 focus:outline-none focus:border-black transition-all placeholder:text-black/30"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />

              <div className="flex flex-col md:flex-row gap-6">
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

              <textarea 
                rows={4} 
                placeholder="Project Details" 
                className="w-full bg-white border border-[#e5e5e5] text-black py-4 px-5 focus:outline-none focus:border-black transition-all resize-none placeholder:text-black/30"
                required
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              ></textarea>

              <div className="mt-4 flex flex-col gap-4">
                <button 
                  type="submit" 
                  className="w-full bg-black text-white font-mono font-bold text-[10px] tracking-[0.25em] uppercase py-5 hover:bg-black/90 active:scale-[0.98] transition-all duration-300 shadow-lg"
                >
                  Submit Project Request
                </button>
                <p className="text-black/30 font-mono text-[9px] tracking-[0.2em] uppercase text-center">
                  We’ll get back to you within 24–48 hours.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
