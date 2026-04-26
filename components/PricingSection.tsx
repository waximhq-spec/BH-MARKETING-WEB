"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/components/ModalContext";

// Accordion feature item
function FeatureItem({ label, details }: { label: string; details: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="text-[12px] text-white/80 font-medium group-hover:text-white transition-colors duration-200">
          {label}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-white/40 group-hover:text-white/80 transition-colors text-[14px]"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pt-2 text-[10px] text-white/50 leading-relaxed max-w-[90%]">
              {details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingSection() {
  const { openProjectModal } = useModal();

  const packages = [
    {
      id: "starter",
      name: "STARTER",
      price: "$499",
      target: "Best for small brands or basic shoots",
      features: [
        { label: "10 Edited Photos", details: "High-resolution, retouched images ready for web and social." },
        { label: "1 Short Reel (15–30 sec)", details: "Dynamic, fast-paced video cut for TikTok or IG Reels." },
        { label: "Basic Color Grading", details: "Standard color correction ensuring brand consistency." },
        { label: "1 Location Shoot", details: "Up to 2 hours of coverage at a single approved location." },
      ],
      ctaText: "Explore Package",
      isPopular: false,
      imageGradient: "from-black/80 to-[#1a1a1a]"
    },
    {
      id: "creator",
      name: "CREATOR",
      price: "$899",
      target: "Most chosen package for growing brands",
      features: [
        { label: "20 Edited Photos", details: "Extensive gallery of retouched, multi-format images." },
        { label: "2 Reels (30–45 sec)", details: "Engaging vertical videos tailored for maximum retention." },
        { label: "Advanced Color Grading", details: "Cinematic color manipulation mapping to your brand palette." },
        { label: "Creative Direction", details: "We guide the visual narrative and on-set talent." },
        { label: "1–2 Locations", details: "Up to 4 hours of shooting across two nearby locations." },
      ],
      ctaText: "Explore Package",
      isPopular: false,
      imageGradient: "from-black/80 to-[#222]"
    },
    {
      id: "cinematic",
      name: "CINEMATIC",
      price: "$1,499",
      target: "Designed for brands that want premium storytelling",
      features: [
        { label: "30+ Edited Photos", details: "A comprehensive library of editorial-grade brand imagery." },
        { label: "3–4 Cinematic Reels", details: "High-retention, narrative-driven vertical content." },
        { label: "Full Creative Direction", details: "Pre-production planning, moodboards, and full on-set control." },
        { label: "Drone Shots", details: "Aerial establishing shots for massive scale and production value." },
        { label: "Lighting Setup", details: "Professional studio lighting tailored to external environments." },
        { label: "Story-Based Edit", details: "Complex sound design, pacing, and multi-cam editing." },
      ],
      ctaText: "Explore Package",
      isPopular: true,
      imageGradient: "from-black/80 to-[#B11226]/40"
    },
    {
      id: "custom",
      name: "CUSTOM",
      price: "Custom",
      target: "Build your own package based on your exact needs",
      features: [
        { label: "Product Shoot", details: "Studio or lifestyle product photography with precise lighting." },
        { label: "Real Estate Shoot", details: "Interior, exterior, and drone coverage of premium properties." },
        { label: "Drone Footage", details: "Dedicated aerial videography sessions." },
        { label: "Ads / Commercials", details: "Full-scale TV or web commercials with crew and talent." },
        { label: "Social Media Content", details: "Bulk retained content creation for monthly posting." },
      ],
      ctaText: "Build Your Package",
      isPopular: false,
      imageGradient: "from-black/80 to-[#111]"
    }
  ];

  return (
    <section data-theme="pricing" className="relative py-20 md:py-28 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background Soft Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white opacity-[0.01] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#B11226] opacity-[0.02] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-8 md:px-14 lg:px-20 xl:px-24 relative z-10 w-full overflow-hidden">
        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 
            className="text-white font-black tracking-tighter leading-[1.1] mb-6 uppercase"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            Packages Designed to <br className="hidden md:block" /> Elevate Your Brand
          </h2>
          <p className="text-white/50 text-[13px] md:text-[15px] max-w-xl mx-auto leading-relaxed">
            Choose a plan that matches your vision — from simple shoots to full cinematic production.
          </p>
        </motion.div>

        {/* 4 Column Pricing Grid (Desktop) / Horizontal Scroll (Mobile) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className={`group flex flex-col h-full relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                pkg.isPopular 
                  ? "bg-[#0A0A0A] border border-[#B11226]/40 hover:border-[#B11226]/80" 
                  : "bg-[#0A0A0A] border border-white/5 hover:border-white/20"
              }`}
            >
              {/* Card Content (Shared Logic) */}
              <PricingCardContent pkg={pkg} openProjectModal={openProjectModal} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Horizontal Scrollable Cards */}
        <div className="lg:hidden -mx-8 px-8 overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-12">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className={`min-w-[85vw] md:min-w-[320px] snap-center flex flex-col relative rounded-2xl overflow-hidden ${
                  pkg.isPopular 
                    ? "bg-[#0A0A0A] border border-[#B11226]/40" 
                    : "bg-[#0A0A0A] border border-white/5"
                }`}
              >
                <PricingCardContent pkg={pkg} openProjectModal={openProjectModal} />
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="flex justify-center gap-1.5 mt-2">
            {packages.map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-white/20 last:bg-[#B11226]/40" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Extracted card content to avoid duplication
function PricingCardContent({ pkg, openProjectModal }: { pkg: any, openProjectModal: () => void }) {
  return (
    <>
      {/* Highlight / Glow Behind Card */}
      {pkg.isPopular && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#B11226]/10 to-transparent pointer-events-none" />
      )}
      
      {/* Image Area */}
      <div className="relative h-20 w-full overflow-hidden bg-[#111]">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${pkg.imageGradient} opacity-60 z-10 transition-opacity duration-300 group-hover:opacity-40`} 
        />
        
        {pkg.isPopular && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#B11226]/20 border border-[#B11226]/50 text-[#B11226] text-[9px] font-bold tracking-widest uppercase">
              Most Popular
            </span>
          </div>
        )}
        
        <svg className="absolute inset-0 w-full h-full opacity-20 text-white mix-blend-overlay" width="100%" height="100%">
            <defs>
              <pattern id={`grid-${pkg.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="none"></rect>
                <circle cx="2" cy="2" r="1.5" fill="currentColor"></circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${pkg.id})`}></rect>
        </svg>
      </div>

      {/* Content block */}
      <div className="flex flex-col flex-grow p-6 pt-5 z-10">
        <div className="mb-4">
          <h3 className="text-white text-[12px] font-bold tracking-[0.2em] uppercase mb-2">
            {pkg.name}
          </h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className={`text-4xl font-black tracking-tighter ${pkg.isPopular ? "text-[#B11226]" : "text-white"}`}>
              {pkg.price}
            </span>
          </div>
          <p className="text-white/40 text-[11px] leading-relaxed min-h-[32px]">
            {pkg.target}
          </p>
        </div>

        <div className="w-full h-px bg-white/5 mb-4" />

        <div className="flex-grow flex flex-col mb-8">
          <p className="text-white/30 text-[9px] tracking-widest uppercase font-bold mb-2">Includes</p>
          {pkg.features.map((feature: any, i: number) => (
            <FeatureItem key={i} label={feature.label} details={feature.details} />
          ))}
        </div>

        <button 
          onClick={openProjectModal}
          className={`mt-auto w-full py-3.5 rounded-xl text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
            pkg.isPopular
              ? "bg-gradient-to-r from-[#B11226] to-[#7a0b19] text-white hover:scale-[1.02]"
              : "bg-white/5 text-white hover:bg-white hover:text-black hover:scale-[1.02]"
          }`}
        >
          {pkg.ctaText}
        </button>
      </div>
    </>
  );
}

