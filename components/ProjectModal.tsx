"use client";

import React, { useState, useEffect } from "react";
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

const SERVICES = [
  { id: "content", label: "Content Production", icon: "🎥" },
  { id: "brand", label: "Brand Identity", icon: "✨" },
  { id: "ads", label: "Paid Advertising", icon: "📈", disabled: true },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

function getNextWorkingDays(numDays: number) {
  const days = [];
  const current = new Date();
  while (days.length < numDays) {
    current.setDate(current.getDate() + 1);
    const day = current.getDay();
    // In Bahrain, weekend is typically Friday (5) and Saturday (6)
    if (day !== 5 && day !== 6) {
      days.push(new Date(current));
    }
  }
  return days;
}

export default function ProjectModal() {
  const { isProjectModalOpen, modalMode, closeProjectModal } = useModal();
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState("");
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "", brand: "", whatsapp: "", location: "", branches: "", message: "", preferredDate: "", preferredTime: ""
  });

  const workingDays = getNextWorkingDays(5);
  const timeSlots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  useEffect(() => {
    if (isProjectModalOpen) {
      document.body.style.overflow = "hidden";
      setStep(modalMode === "booking" ? 5 : 0);
      setIndustry("");
      setService("");
      setFormData({ name: "", brand: "", whatsapp: "", location: "", branches: "", message: "", preferredDate: "", preferredTime: "" });
    } else {
      document.body.style.overflow = "";
    }
  }, [isProjectModalOpen, modalMode]);

  const currentFlowSteps = modalMode === "booking" ? 2 : 5;
  const normalizedStep = modalMode === "booking" ? step - 5 : step;
  const progress = (normalizedStep / (currentFlowSteps - 1)) * 100;

  function handleServiceSelect(id: string) {
    setService(id);
    setTimeout(() => setStep(2), 350);
  }

  function handleIndustrySelect(id: string) {
    setIndustry(id);
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
      <button
        onClick={() => setStep(1)}
        className="group relative h-[56px] px-12 bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white font-mono font-black text-[11px] tracking-[0.35em] uppercase rounded-full overflow-hidden shadow-[0_8px_30px_rgba(154,14,31,0.3)] active:scale-[0.97] transition-transform duration-200"
      >
        <span className="flex items-center gap-3">CONTINUE <span className="inline-block">→</span></span>
      </button>
      <p className="mt-5 text-white/20 text-[9px] tracking-[0.2em] uppercase font-medium">Response within 24 hours</p>
    </motion.div>,

    // STEP 1 — SERVICE
    <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col min-h-[420px] px-2"
    >
      <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Step 01</p>
      <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase mb-8">What service do you need?</h3>
      <div className="grid grid-cols-1 gap-3 flex-1">
        {SERVICES.map((svc) => (
          <button
            key={svc.id}
            disabled={svc.disabled}
            onClick={() => handleServiceSelect(svc.id)}
            className={`flex items-center gap-4 px-6 py-5 rounded-2xl border transition-all duration-200 text-left ${
              svc.disabled 
                ? "opacity-50 cursor-not-allowed border-white/5 bg-white/[0.01]"
                : service === svc.id
                  ? "border-[#9A0E1F] bg-[#9A0E1F]/10 active:scale-[0.98]"
                  : "border-white/8 bg-white/[0.02] active:scale-[0.98]"
            }`}
          >
            <span className="text-2xl">{svc.icon}</span>
            <div className="flex flex-col">
              <span className={`text-[12px] md:text-[13px] font-bold tracking-widest uppercase ${service === svc.id ? "text-white" : "text-white/60"}`}>{svc.label}</span>
              {svc.disabled && <span className="text-[9px] font-mono tracking-widest text-[#9A0E1F] uppercase mt-1">Coming Soon</span>}
            </div>
          </button>
        ))}
      </div>
    </motion.div>,

    // STEP 2 — INDUSTRY
    <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col min-h-[420px] px-2"
    >
      <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Step 02</p>
      <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase mb-8">What type of brand are you?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            onClick={() => handleIndustrySelect(ind.id)}
            className={`relative flex flex-col items-start justify-between p-5 rounded-2xl border transition-all duration-200 text-left overflow-hidden active:scale-[0.97] ${
              industry === ind.id
                ? "border-[#9A0E1F] bg-[#9A0E1F]/10"
                : "border-white/8 bg-white/[0.02]"
            }`}
          >
            <span className="text-2xl mb-4">{ind.icon}</span>
            <span className={`text-[11px] font-bold tracking-wide uppercase leading-snug ${industry === ind.id ? "text-white" : "text-white/60"}`}>
              {ind.label}
            </span>
            {industry === ind.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#9A0E1F] flex items-center justify-center">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            )}
          </button>
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
        <button
          disabled={!formData.name || !formData.brand || !formData.whatsapp || isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            try {
              await fetch("https://formsubmit.co/ajax/contact@cinmachproductions.com", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  _subject: "QUOTE REQUEST CINMACH PRODUCTIONS",
                  Industry: industry,
                  Service: service,
                  Name: formData.name,
                  Brand: formData.brand,
                  WhatsApp: formData.whatsapp,
                  Location: formData.location || "Not provided",
                  Branches: formData.branches || "Not provided",
                  Message: formData.message || "No additional message",
                  _template: "table"
                })
              });
              setStep(4);
            } catch (error) {
              console.error("Form submission error:", error);
              setStep(4);
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="w-full h-[56px] bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white font-mono font-black text-[11px] tracking-[0.3em] uppercase rounded-xl shadow-[0_8px_30px_rgba(154,14,31,0.3)] active:scale-[0.97] transition-transform duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? "SENDING..." : "SUBMIT REQUEST"} <span>→</span>
        </button>
      </div>
    </motion.div>,

    // STEP 4 — SUCCESS (PROJECT MODE)
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
        <button onClick={closeProjectModal} className="w-full h-[52px] border border-white/20 hover:bg-white/5 text-white font-mono font-bold text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors duration-300">
          Return to Website
        </button>
      </div>
    </motion.div>,

    // STEP 5 — BOOK A CALL (BOOKING MODE INTRO)
    <motion.div key="step5" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col min-h-[420px] px-2"
    >
      <p className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-3">Strategy Call</p>
      <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase mb-6">Schedule Your Session</h3>
      
      <div className="flex-1 flex flex-col gap-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#9A0E1F]/60 text-white py-3 px-4 rounded-xl text-sm outline-none transition-all duration-300" />
          <input type="text" placeholder="Brand / Company" required value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#9A0E1F]/60 text-white py-3 px-4 rounded-xl text-sm outline-none transition-all duration-300" />
          <input type="tel" placeholder="WhatsApp Number" required value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className="md:col-span-2 bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#9A0E1F]/60 text-white py-3 px-4 rounded-xl text-sm outline-none transition-all duration-300" />
        </div>

        {/* Visual Calendar */}
        <div>
          <label className="text-white/40 text-[10px] uppercase tracking-widest mb-3 block">Select Date</label>
          <div className="grid grid-cols-5 gap-2">
            {workingDays.map((date, i) => {
              const dateString = date.toISOString().split('T')[0];
              const isSelected = formData.preferredDate === dateString;
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <button
                  key={i}
                  onClick={() => setFormData({ ...formData, preferredDate: dateString })}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-300 ${
                    isSelected 
                      ? "bg-[#9A0E1F]/20 border-[#9A0E1F] shadow-[0_0_15px_rgba(154,14,31,0.2)]" 
                      : "bg-white/[0.02] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <span className={`text-[9px] uppercase font-mono tracking-wider ${isSelected ? "text-white" : "text-white/40"}`}>{dayName}</span>
                  <span className={`text-lg font-black mt-1 ${isSelected ? "text-white" : "text-white/70"}`}>{date.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Time Slots */}
        <AnimatePresence>
          {formData.preferredDate && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <label className="text-white/40 text-[10px] uppercase tracking-widest mb-3 block">Select Time</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {timeSlots.map((time) => {
                  const isSelected = formData.preferredTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, preferredTime: time })}
                      className={`py-2.5 rounded-xl border text-[10px] font-mono tracking-wider transition-all duration-300 ${
                        isSelected 
                          ? "bg-[#9A0E1F] border-[#9A0E1F] text-white shadow-[0_5px_15px_rgba(154,14,31,0.3)]" 
                          : "bg-white/[0.02] border-white/10 text-white/50 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <button
          disabled={!formData.name || !formData.brand || !formData.whatsapp || !formData.preferredDate || !formData.preferredTime || isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            try {
              await fetch("https://formsubmit.co/ajax/contact@cinmachproductions.com", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  _subject: "STRATEGY CALL: " + formData.brand,
                  Name: formData.name,
                  Brand: formData.brand,
                  WhatsApp: formData.whatsapp,
                  PreferredDate: formData.preferredDate,
                  PreferredTime: formData.preferredTime,
                  _template: "table"
                })
              });
              setStep(6);
            } catch (error) {
              console.error("Booking submission error:", error);
              setStep(6);
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="w-full h-[52px] bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white font-mono font-black text-[10px] tracking-[0.3em] uppercase rounded-xl shadow-[0_8px_24px_rgba(154,14,31,0.3)] active:scale-[0.97] transition-transform duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isSubmitting ? "CONFIRMING..." : "CONFIRM BOOKING"} <span>→</span>
        </button>
      </div>
    </motion.div>,

    // STEP 6 — FINAL CONFIRMATION (BOOKING MODE)
    <motion.div key="step6" variants={slideVariants} initial="enter" animate="center" exit="exit"
      transition={{ duration: 0.55, ease: EASE }}
      className="flex flex-col items-center justify-center text-center min-h-[420px] px-4"
    >
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        className="w-16 h-16 rounded-full border border-green-500/40 bg-green-500/10 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
      >
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
          <path d="M2 11L10 19L26 2" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <p className="text-green-500 font-mono text-[9px] tracking-[0.4em] uppercase font-bold mb-4">Meeting Confirmed</p>
      <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter uppercase leading-none mb-5">
        You're All<br />Set.
      </h2>
      <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs mb-12">
        We have received your request for {formData.preferredDate}. We will confirm the schedule via WhatsApp shortly.
      </p>
      <button onClick={closeProjectModal} className="w-full max-w-[240px] h-[52px] border border-white/20 hover:bg-white/5 text-white font-mono font-bold text-[10px] tracking-[0.25em] uppercase rounded-full transition-colors duration-300">
        Return to Website
      </button>
    </motion.div>
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
          <div className="absolute inset-0 bg-black/95" />
          {/* Ambient red glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(154,14,31,0.08)_0%,transparent_70%)] pointer-events-none" />
          {/* Subtle noise grain removed */}

          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto bg-[#080808] border border-white/[0.06] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform-gpu"
            style={{ WebkitBackfaceVisibility: "hidden" } as React.CSSProperties}
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
                {Array.from({ length: currentFlowSteps }).map((_, i) => {
                  const isActive = i === normalizedStep;
                  const isPast = i < normalizedStep;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        width: isActive ? 20 : 6,
                        backgroundColor: isActive || isPast ? (modalMode === "booking" && normalizedStep === 1 ? "#22c55e" : "#9A0E1F") : "rgba(255,255,255,0.12)",
                      }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="h-1.5 rounded-full"
                    />
                  );
                })}
              </div>

              {/* Back + Close */}
              <div className="flex items-center gap-3">
                {((modalMode === "project" && step > 0 && step < 4) || (modalMode === "booking" && step > 5 && step < 6)) && (
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
