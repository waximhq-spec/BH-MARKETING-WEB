"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./ModalContext";

const EASE = [0.16, 1, 0.3, 1] as const;

function CustomDropdown({ label, value, options, onChange, placeholder }: { label: string, value: string, options: string[], onChange: (v: string) => void, placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
      <label className="text-[10px] font-mono tracking-widest uppercase text-black/40 font-bold ml-1">{label}</label>
      <div 
        className={`w-full bg-black/[0.02] border ${isOpen ? 'border-[#9A0E1F]/60 bg-white shadow-[0_0_20px_rgba(154,14,31,0.05)]' : 'border-black/15 hover:border-black/30'} !text-black py-3.5 px-5 rounded-xl text-sm transition-all duration-300 cursor-pointer flex justify-between items-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-black" : "text-black/30"}>{value || placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-black/10 rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col max-h-[200px] overflow-y-auto"
          >
            {options.map((opt: string) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`text-left px-5 py-3.5 hover:bg-black/5 text-sm transition-colors !text-black ${value === opt ? 'bg-black/5 font-medium' : ''}`}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activationNotice, setActivationNotice] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    whatsapp: "",
    service: "",
    industry: "",
    budget: "",
    message: ""
  });

  useEffect(() => {
    if (isProjectModalOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setActivationNotice(false);
        setFormData({ name: "", brand: "", whatsapp: "", service: "", industry: "", budget: "", message: "" });
      }, 0);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
  }, [isProjectModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActivationNotice(false);

    const payload = {
      _subject: "NEW QUOTE REQUEST: " + formData.brand,
      Name: formData.name,
      Brand: formData.brand,
      WhatsApp: formData.whatsapp,
      Service: formData.service || "Not specified",
      Industry: formData.industry || "Not specified",
      Budget: formData.budget || "Not specified",
      Message: formData.message || "No additional message",
      _template: "table",
      _captcha: "false" // Disable captcha completely to avoid lead limits & verification issues
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/cinmachproductions@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const data = await response.json();
      console.log("FormSubmit AJAX response:", data);

      if (data && (data.success === "false" || (data.message && (data.message.toLowerCase().includes("activate") || data.message.toLowerCase().includes("activation"))))) {
        // Form needs activation from owner
        setActivationNotice(true);
        setIsSuccess(true);
      } else {
        // Form successfully submitted
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("AJAX form submission failed, falling back to standard redirect:", error);
      
      // Fallback: standard form POST redirect to ensure the lead is never lost
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://formsubmit.co/cinmachproductions@gmail.com";
      
      for (const [key, value] of Object.entries(payload)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isProjectModalOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
          onClick={closeProjectModal}
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: EASE }}
            data-lenis-prevent
            className="relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] transform-gpu"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProjectModal}
              className="absolute top-6 right-6 p-2 text-black/40 hover:text-black transition-colors duration-200 z-10 bg-black/5 hover:bg-black/10 rounded-full"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] animate-pulse" />
                        <span className="text-black/60 font-mono text-[9px] tracking-[0.2em] uppercase font-bold">Cinmach Productions</span>
                      </div>
                      <h2 className="text-black font-black text-3xl md:text-4xl tracking-tight uppercase leading-none mb-3">
                        Start Your Project
                      </h2>
                      <p className="text-black/60 text-sm md:text-base font-light leading-relaxed">
                        Request a quote for your next cinematic campaign. Please provide details so we can estimate accurately.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      {/* Personal Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono tracking-widest uppercase text-black/40 font-bold ml-1">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Jane Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-black/[0.02] border border-black/15 hover:border-black/30 focus:border-[#9A0E1F]/60 !text-black !placeholder-black/30 py-3.5 px-5 rounded-xl text-sm outline-none transition-all duration-300 focus:bg-white focus:shadow-[0_0_20px_rgba(154,14,31,0.05)]"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-mono tracking-widest uppercase text-black/40 font-bold ml-1">Brand Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Acme Corp"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                            className="w-full bg-black/[0.02] border border-black/15 hover:border-black/30 focus:border-[#9A0E1F]/60 !text-black !placeholder-black/30 py-3.5 px-5 rounded-xl text-sm outline-none transition-all duration-300 focus:bg-white focus:shadow-[0_0_20px_rgba(154,14,31,0.05)]"
                          />
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-black/40 font-bold ml-1">WhatsApp Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+973 3XXX XXXX"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="w-full bg-black/[0.02] border border-black/15 hover:border-black/30 focus:border-[#9A0E1F]/60 !text-black !placeholder-black/30 py-3.5 px-5 rounded-xl text-sm outline-none transition-all duration-300 focus:bg-white focus:shadow-[0_0_20px_rgba(154,14,31,0.05)]"
                        />
                      </div>

                      {/* Project Specifics Grid (Custom Dropdowns) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-20">
                        <CustomDropdown
                          label="Service Needed"
                          placeholder="Select Service"
                          value={formData.service}
                          options={["Content Production", "Brand Identity", "Paid Advertising", "Other"]}
                          onChange={(val) => setFormData({ ...formData, service: val })}
                        />
                        <CustomDropdown
                          label="Industry"
                          placeholder="Select Industry"
                          value={formData.industry}
                          options={["Restaurants & Cafes", "Real Estate", "Hotels & Resorts", "Gyms & Fitness", "Luxury Brands", "E-commerce", "Other"]}
                          onChange={(val) => setFormData({ ...formData, industry: val })}
                        />
                      </div>
                      
                      <div className="relative z-10">
                        <CustomDropdown
                          label="Estimated Budget"
                          placeholder="Select Budget Range"
                          value={formData.budget}
                          options={["Less than 500 BHD", "500 - 1,500 BHD", "1,500 - 5,000 BHD", "5,000+ BHD", "Not sure yet"]}
                          onChange={(val) => setFormData({ ...formData, budget: val })}
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-black/40 font-bold ml-1">Project Details & Vision</label>
                        <textarea
                          rows={4}
                          placeholder="Tell us a bit about what you want to achieve..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-black/[0.02] border border-black/15 hover:border-black/30 focus:border-[#9A0E1F]/60 !text-black !placeholder-black/30 py-3.5 px-5 rounded-xl text-sm outline-none transition-all duration-300 focus:bg-white focus:shadow-[0_0_20px_rgba(154,14,31,0.05)] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.brand || !formData.whatsapp || !formData.service || !formData.industry}
                        className="mt-2 w-full h-[56px] bg-[#9A0E1F] text-white font-mono font-black text-[11px] tracking-[0.2em] uppercase rounded-xl shadow-[0_8px_30px_rgba(154,14,31,0.25)] hover:shadow-[0_12px_40px_rgba(154,14,31,0.35)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            SUBMITTING...
                          </span>
                        ) : (
                          <>SUBMIT REQUEST <span>→</span></>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    {activationNotice ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </div>
                        <h3 className="text-black font-black text-2xl md:text-3xl tracking-tight uppercase mb-3 text-amber-600">Activation Needed</h3>
                        <p className="text-black/70 text-sm leading-relaxed max-w-sm mb-8">
                          First time submitting? FormSubmit has sent an activation email to <strong className="text-black">cinmachproductions@gmail.com</strong>.
                          <br /><br />
                          <strong>Please check your inbox (and spam folder) and click the confirmation link</strong> to activate this email. Once done, future submissions will deliver instantly.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <h3 className="text-black font-black text-2xl md:text-3xl tracking-tight uppercase mb-3">Request Received</h3>
                        <p className="text-black/60 text-sm leading-relaxed max-w-xs mb-8">
                          Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
                        </p>
                      </>
                    )}
                    <button
                      onClick={closeProjectModal}
                      className="w-full max-w-[200px] h-[48px] border border-black/10 hover:bg-black/5 text-black font-mono font-bold text-[10px] tracking-[0.2em] uppercase rounded-full transition-colors duration-300"
                    >
                      Return to Site
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
