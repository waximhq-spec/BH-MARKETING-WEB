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
      name: "Starter",
      price: "$499",
      target: "Best for small brands or basic shoots",
      imageGradient: "from-blue-500/20 to-purple-500/20",
      features: [
        { label: "10 Edited Photos", details: "High-resolution professionally color-graded photos." },
        { label: "1 Short Reel (15-30 sec)", details: "Optimized for Instagram/TikTok with trending transitions." },
        { label: "Basic Color Grading", details: "Standard cinematic color correction for a consistent look." },
        { label: "1 Location Shoot", details: "Up to 2 hours of production at a single venue." }
      ],
      ctaText: "Get Started",
      isPopular: false
    },
    {
      id: "pro",
      name: "Standard",
      price: "$899",
      target: "Comprehensive content for monthly growth",
      imageGradient: "from-[#B11226]/20 to-orange-500/20",
      features: [
        { label: "25 Edited Photos", details: "Full gallery covering food, ambiance, and team." },
        { label: "3 Reels / Short Videos", details: "A mix of storytelling, fast-paced, and cinematic edits." },
        { label: "Advanced Color Grading", details: "Premium 'film-look' grading tailored to your brand." },
        { label: "Drone / 4K Footage", details: "Stunning aerials and crisp 4K production quality." }
      ],
      ctaText: "Choose Standard",
      isPopular: true
    },
    {
      id: "elite",
      name: "Premium",
      price: "$1499",
      target: "The ultimate cinematic brand overhaul",
      imageGradient: "from-amber-500/20 to-red-500/20",
      features: [
        { label: "50+ Edited Photos", details: "Infinite content for ads, website, and socials." },
        { label: "6 Reels + 1 Main Film", details: "Complete content ecosystem including a 60-sec brand story." },
        { label: "Creative Direction", details: "We handle the concepts, script, and storyboarding." },
        { label: "Full Day Production", details: "Comprehensive shoot covering every angle of your brand." }
      ],
      ctaText: "Go Premium",
      isPopular: false
    },
    {
      id: "custom",
      name: "Enterprise",
      price: "Custom",
      target: "Scalable solutions for groups & chains",
      imageGradient: "from-emerald-500/20 to-teal-500/20",
      features: [
        { label: "Multi-Location Support", details: "Coordinated shoots across multiple venues/branches." },
        { label: "Dedicated Producer", details: "Single point of contact for all your production needs." },
        { label: "Full Rights / Raw Files", details: "Complete ownership of all captured raw assets." },
        { label: "Priority Turnaround", details: "Express delivery for time-sensitive marketing campaigns." }
      ],
      ctaText: "Contact Us",
      isPopular: false
    }
  ];

  return (
    <section data-theme="pricing" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#B11226]/50 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[#B11226] font-mono text-[10px] tracking-[0.4em] uppercase font-bold mb-4">Investment</p>
          <h2 className="text-white font-black text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            CHOOSE YOUR<br />PACKAGE.
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-light">
            Simple, transparent pricing built for high-end hospitality and modern brand growth.
          </p>
        </motion.div>

        {/* Pricing Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className={`group flex flex-col h-full relative rounded-2xl overflow-hidden transition-all duration-500 md:hover:-translate-y-2 ${
                pkg.isPopular 
                  ? "bg-[#0A0A0A] border border-[#B11226]/40 hover:border-[#B11226]/80" 
                  : "bg-[#0A0A0A] border border-white/5 hover:border-white/20"
              }`}
            >
              <PricingCardContent pkg={pkg} openProjectModal={openProjectModal} />
            </motion.div>
          ))}
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
