"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "./ModalContext";

const INDUSTRIES = [
  { id: "restaurants", label: "Restaurants & Cafes", icon: "🍽" },
  { id: "realestate", label: "Real Estate", icon: "🏛" },
  { id: "hotels", label: "Hotels & Resorts", icon: "🏨" },
  { id: "gyms", label: "Gyms & Fitness", icon: "💪" },
  { id: "luxury", label: "Luxury Brands", icon: "✦" },
  { id: "other", label: "Other", icon: "◆" },
];

const PROJECT_TYPES = [
  { id: "monthly", label: "Monthly Content" },
  { id: "onetime", label: "One-Time Shoot" },
  { id: "launch", label: "Brand Launch Campaign" },
  { id: "social", label: "Social Media Growth" },
  { id: "full", label: "Full Production" },
  { id: "custom", label: "Custom Project" },
];

const EASE = [0.16, 1, 0.3, 1];

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function ProjectModal() {
  const { isProjectModalOpen, closeProjectModal } = useModal();
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState("");
  const [projectType, setProjectType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", brand: "", whatsapp: "", location: "", branches: "", message: "",
  });

  useEffect(() => {
    if (isProjectModalOpen) {
      document.body.style.overflow = "hidden";
      setStep(0);
      setIndustry("");
      setProjectType("");
      setFormData({ name: "", brand: "", whatsapp: "", location: "", branches: "", message: "" });
    } else {
      document.body.style.overflow = "";
    }
  }, [isProjectModalOpen]);

  const totalSteps = 5;
  const progress = (step / (totalSteps - 1)) * 100;

  function handleIndustrySelect(id: string) {
    setIndustry(id);
    setTimeout(() => setStep(2), 350);
  }

  function handleProjectTypeSelect(id: string) {
    setProjectType(id);
    setTimeout(() => setStep(3), 350);
  }

  const stepContent = [
    // STEP 0 — INTRO
    <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center justify-center text-center min-h-[420px] px-4"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9A0E1F]/30 bg-[#9A0E1F]/10 mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] animate-pulse" />
        <span className="text-[#9A0E1F] font-mono text-[9px] tracking-[0.35em] uppercase font-bold">Cinmach Productions</span>
      </div>
      <h2 className="text-white font-black text-4xl md:text-6xl tracking-tighter uppercase leading-none mb-5">
        Start Your<br />Project
      </h2>
      <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-sm mb-12">
        Tell us about your brand and we'll craft a cinematic content strategy tailored to your goals.
      </p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setStep(1)}
        className="group relative h-[56px] px-12 bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white font-mono font-black text-[11px] tracking-[0.35em] uppercase rounded-full overflow-hidden shadow-[0_10px_40px_rgba(154,14,31,0.35)] hover:shadow-[0_16px_50px_rgba(154,14,31,0.5)] transition-shadow duration-500"
      >
        <span className="flex items-center gap-3">CONTINUE <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span></span>
      </motion.button>
      <p className="mt-5 text-white/20 text-[9px] tracking-[0.2em] uppercase font-medium">Response within 24 hours</p>
    </motion.div>,

    // STEP 1 — INDUSTRY
    <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col min-h-[420px] px-2"
    >
      <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Step 01</p>
      <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase mb-8">What type of brand are you?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
        {INDUSTRIES.map((ind) => (
          <motion.button
            key={ind.id}
            whileHover={{ scale: 1.03, borderColor: "rgba(154,14,31,0.6)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleIndustrySelect(ind.id)}
            className={`relative flex flex-col items-start justify-between p-5 rounded-2xl border transition-all duration-300 text-left overflow-hidden group ${
              industry === ind.id
                ? "border-[#9A0E1F] bg-[#9A0E1F]/10 shadow-[0_0_25px_rgba(154,14,31,0.25)]"
                : "border-white/8 bg-white/[0.02] hover:bg-white/[0.05]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#9A0E1F]/0 to-[#9A0E1F]/0 group-hover:from-[#9A0E1F]/5 transition-all duration-500 pointer-events-none" />
            <span className="text-2xl mb-4">{ind.icon}</span>
            <span className={`text-[11px] font-bold tracking-wide uppercase leading-snug ${industry === ind.id ? "text-white" : "text-white/60"}`}>
              {ind.label}
            </span>
            {industry === ind.id && (
              <motion.div layoutId="industryCheck" className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#9A0E1F] flex items-center justify-center">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>,

    // STEP 2 — PROJECT TYPE
    <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col min-h-[420px] px-2"
    >
      <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Step 02</p>
      <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase mb-8">What are you looking for?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        {PROJECT_TYPES.map((pt) => (
          <motion.button
            key={pt.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleProjectTypeSelect(pt.id)}
            className={`flex items-center justify-between px-6 py-4 rounded-xl border transition-all duration-300 text-left group ${
              projectType === pt.id
                ? "border-[#9A0E1F] bg-[#9A0E1F]/10 shadow-[0_0_20px_rgba(154,14,31,0.2)]"
                : "border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15"
            }`}
          >
            <span className={`text-[12px] font-bold tracking-widest uppercase ${projectType === pt.id ? "text-white" : "text-white/55"}`}>{pt.label}</span>
            <motion.span animate={{ x: projectType === pt.id ? 4 : 0 }} className={`text-sm ${projectType === pt.id ? "text-[#9A0E1F]" : "text-white/20"}`}>→</motion.span>
          </motion.button>
        ))}
      </div>
    </motion.div>,

    // STEP 3 — DETAILS FORM
    <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col min-h-[420px] px-2"
    >
      <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Step 03</p>
      <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase mb-8">Tell us about your vision</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {[
          { key: "name", placeholder: "Your Full Name", type: "text", required: true },
          { key: "brand", placeholder: "Brand / Company Name", type: "text", required: true },
          { key: "whatsapp", placeholder: "WhatsApp Number", type: "tel", required: true },
          { key: "location", placeholder: "City / Location", type: "text", required: false },
        ].map(({ key, placeholder, type, required }) => (
          <div key={key} className="relative group">
            <input
              type={type}
              placeholder={placeholder}
              required={required}
              value={formData[key as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              className="w-full bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#9A0E1F]/60 text-white placeholder:text-white/20 py-4 px-5 rounded-xl text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(154,14,31,0.1)]"
            />
          </div>
        ))}
        <div className="relative md:col-span-2">
          <input
            type="number"
            placeholder="Number of Branches (optional)"
            min={1}
            value={formData.branches}
            onChange={(e) => setFormData({ ...formData, branches: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#9A0E1F]/60 text-white placeholder:text-white/20 py-4 px-5 rounded-xl text-sm outline-none transition-all duration-300 focus:bg-white/[0.05]"
          />
        </div>
        <div className="relative md:col-span-2">
          <textarea
            placeholder="Tell us about your vision, goals, or anything else..."
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#9A0E1F]/60 text-white placeholder:text-white/20 py-4 px-5 rounded-xl text-sm outline-none transition-all duration-300 focus:bg-white/[0.05] resize-none"
          />
        </div>
      </div>
      <div className="mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!formData.name || !formData.brand || !formData.whatsapp || isSubmitting}
          onClick={() => {
            setIsSubmitting(true);
            
            // FormSubmit requires a standard HTML form submission for the first activation email.
            // We dynamically create a form and submit it.
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://formsubmit.co/contact@cinmachproductions.com";
            
            const data = {
              _subject: "QUOTE REQUEST CINMACH PRODUCTIONS",
              _next: window.location.href, // Redirect back to the site
              _captcha: "false",
              _template: "table",
              Industry: industry,
              ProjectType: projectType,
              Name: formData.name,
              Brand: formData.brand,
              WhatsApp: formData.whatsapp,
              Location: formData.location || "Not provided",
              Branches: formData.branches || "Not provided",
              Message: formData.message || "No additional message"
            };

            Object.entries(data).forEach(([key, value]) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = value;
              form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
          }}
          className="w-full h-[56px] bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white font-mono font-black text-[11px] tracking-[0.3em] uppercase rounded-xl shadow-[0_10px_40px_rgba(154,14,31,0.3)] hover:shadow-[0_16px_50px_rgba(154,14,31,0.5)] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? "REDIRECTING..." : "SUBMIT REQUEST"} <span>→</span>
        </motion.button>
      </div>
    </motion.div>,

    // STEP 4 — SUCCESS
    <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center justify-center text-center min-h-[420px] px-4"
    >
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        className="w-16 h-16 rounded-full border border-[#9A0E1F]/40 bg-[#9A0E1F]/10 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(154,14,31,0.3)]"
      >
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
          <path d="M2 11L10 19L26 2" stroke="#9A0E1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <p className="text-[#9A0E1F] font-mono text-[9px] tracking-[0.4em] uppercase font-bold mb-4">Request Received</p>
      <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter uppercase leading-none mb-5">
        Project Request<br />Received.
      </h2>
      <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs mb-12">
        Our team will review your inquiry and get back to you within 24 hours.
      </p>
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          href="https://wa.me/97330000000"
          target="_blank" rel="noopener noreferrer"
          className="w-full h-[52px] bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white font-mono font-black text-[10px] tracking-[0.3em] uppercase rounded-full flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(154,14,31,0.3)]"
        >
          BOOK A STRATEGY CALL →
        </motion.a>
        <button onClick={closeProjectModal} className="text-white/30 hover:text-white/60 font-mono text-[9px] tracking-[0.25em] uppercase transition-colors duration-300">
          Return to Website
        </button>
      </div>
      <p className="mt-8 text-white/15 text-[9px] uppercase tracking-[0.2em]">Limited client slots available this month.</p>
    </motion.div>,
  ];

  return (
    <AnimatePresence mode="wait">
      {isProjectModalOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
          onClick={closeProjectModal}
        >
          {/* Cinematic backdrop */}
          <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" />
          {/* Ambient red glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(154,14,31,0.08)_0%,transparent_70%)] pointer-events-none" />
          {/* Subtle noise grain */}
          <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+')] pointer-events-none" />

          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full max-w-[680px] bg-[#080808]/90 border border-white/[0.06] rounded-[28px] shadow-[0_40px_120px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9A0E1F]/50 to-transparent" />

            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9A0E1F] to-[#c01529]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-0">
              {/* Step dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === step ? 20 : 6,
                      backgroundColor: i <= step ? "#9A0E1F" : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>

              {/* Back + Close */}
              <div className="flex items-center gap-3">
                {step > 0 && step < 4 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-white/25 hover:text-white/60 transition-colors text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-1"
                  >
                    ← Back
                  </button>
                )}
                <button
                  onClick={closeProjectModal}
                  className="p-2 text-white/20 hover:text-white/60 transition-colors duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Step content */}
            <div className="p-8 pt-6">
              <AnimatePresence mode="wait">
                {stepContent[step]}
              </AnimatePresence>
            </div>

            {/* Bottom ambient glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#9A0E1F]/20 to-transparent blur-sm" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
