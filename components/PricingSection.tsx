"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/components/ModalContext";

// Expandable feature item — checkmark, no dividers
function FeatureItem({ label, details }: { label: string; details: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex flex-col items-start text-left focus:outline-none group py-1"
    >
      <div className="flex items-center gap-2.5 w-full">
        {/* Checkmark dot */}
        <span className="w-[5px] h-[5px] rounded-full bg-white/30 shrink-0 group-hover:bg-white/60 transition-colors duration-200" />
        <span className="text-[12px] text-white/70 font-medium group-hover:text-white transition-colors duration-200 flex-1 text-left leading-snug">
          {label}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-white/20 group-hover:text-white/50 transition-colors text-[12px] leading-none shrink-0"
        >
          +
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden w-full pl-[17px]"
          >
            <p className="pt-2 pb-1 text-[10px] text-white/40 leading-relaxed">
              {details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function PricingSection() {
  const { openProjectModal } = useModal();
  const [activeCategory, setActiveCategory] = useState("Restaurants & Cafes");

  const CATEGORIES = [
    "Restaurants & Cafes",
    "Real Estate",
    "Gyms & Fitness",
    "Hotels & Resorts",
    "E-commerce",
    "Luxury"
  ];


  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "350",
      currency: "BHD",
      target: "Start your presence",
      features: [
        { label: "8 Reels", details: "Cinematic short-form videos optimized for engagement." },
        { label: "16 Photos", details: "Professional high-resolution shots covering your brand." },
        { label: "1 Location Shoot", details: "Production session at a single venue of your choice." },
        { label: "Basic Color Grading", details: "Standard cinematic color correction for a consistent look." },
        { label: "1 Round Revision", details: "One set of refinements to ensure content meets your vision." },
        { label: "Standard Scheduling", details: "Standard queue for production and editing timeline." },
        { label: "Standard Delivery", details: "Regular turnaround for final assets." }
      ],
      ctaText: "Get Started",
      isPopular: false,
      isEnterprise: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "599",
      currency: "BHD",
      target: "Everything you need to bring in customers",
      features: [
        { label: "20 Reels", details: "High-volume short-form content for consistent social presence." },
        { label: "20 Photos", details: "Premium photography for menus, ads, and social media." },
        { label: "10 Carousel Graphics", details: "Custom designed graphics for educational or promotional posts." },
        { label: "Multi-location", details: "Flexibility to shoot across multiple venues or branches." },
        { label: "Advanced Editing + Premium Grade", details: "High-end post-production with cinematic color science." },
        { label: "Content Strategy Guidance", details: "Expert advice on hook-writing and content performance." },
        { label: "2 Rounds Revisions", details: "Extended refinement process for perfect deliverables." },
        { label: "Fast-Track Scheduling", details: "Priority booking for your production sessions." },
        { label: "Fast-Track Delivery", details: "Accelerated editing turnaround for timely campaigns." },
        { label: "Included Ad-Ready Content", details: "Content optimized specifically for paid social campaigns." },
        { label: "Priority Access", details: "Direct communication and faster support response." }
      ],
      ctaText: "Choose Premium",
      isPopular: true,
      isEnterprise: false,
    },
    {
      id: "diamond",
      name: "Diamond",
      price: "1,000",
      currency: "BHD",
      target: "Built to scale faster",
      features: [
        { label: "30 Reels", details: "Daily content coverage for maximum brand visibility." },
        { label: "30 Photos", details: "Complete visual library updated monthly." },
        { label: "15 Carousel Graphics", details: "Extensive graphic support for all digital channels." },
        { label: "Multi-location", details: "Comprehensive coverage across your entire business network." },
        { label: "Advanced Editing + Premium Grade", details: "Master-level post-production and color finishing." },
        { label: "Content Strategy Guidance", details: "Full strategic roadmap for your digital growth." },
        { label: "3 Rounds Revisions", details: "Unlimited focus on detail for the highest quality output." },
        { label: "Fast-Track Scheduling", details: "Priority booking for your production sessions." },
        { label: "Fast-Track Delivery", details: "Accelerated editing turnaround for timely campaigns." },
        { label: "Included Ad-Ready Content", details: "Content optimized specifically for paid social campaigns." },
        { label: "Priority Access", details: "24/7 direct communication and immediate support." }
      ],
      ctaText: "Go Diamond",
      isPopular: false,
      isEnterprise: false,
    },
    {
      id: "custom",
      name: "Enterprise",
      price: "Custom",
      currency: "",
      target: "Scalable solutions for groups & chains",
      features: [
        { label: "Multi-Location Support", details: "Coordinated shoots across multiple venues/branches." },
        { label: "Dedicated Producer", details: "Single point of contact for all your production needs." },
        { label: "Full Rights / Raw Files", details: "Complete ownership of all captured raw assets." },
        { label: "Priority Turnaround", details: "Express delivery for time-sensitive marketing campaigns." }
      ],
      ctaText: "Contact Us",
      isPopular: false,
      isEnterprise: true,
    }
  ];

  return (
    <section id="pricing" data-theme="pricing" className="py-32 md:py-40 bg-[#050505] relative overflow-hidden">
      {/* Top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9A0E1F]/40 to-transparent" />
      {/* Background radial for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(154,14,31,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_10px_#9A0E1F]" />
            <span className="text-white font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Investment</span>
          </div>
          <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-black text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            CINMACH PRODUCTIONS<br />PACKAGES.
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-xs md:text-sm font-light">
            Simple, transparent pricing built for high-end hospitality and modern brand growth.
          </p>
        </motion.div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-12 md:mb-16 px-2">
          <div className="flex flex-wrap items-center justify-center p-1.5 md:p-2 bg-white/5 border border-white/10 rounded-2xl md:rounded-full gap-x-1 gap-y-2 lg:gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === category 
                    ? "text-white" 
                    : "text-white/40 hover:text-white/80"
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="pricingCategoryIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#9A0E1F] to-[#c01529] shadow-[0_0_20px_rgba(154,14,31,0.4)] rounded-full z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid — align tops, Standard lifts */}
        <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 items-end px-2 md:px-0 mt-4 md:mt-0">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: 0.08 * idx, ease: [0.22, 1, 0.36, 1] }}
              className={`group flex flex-col relative rounded-2xl overflow-hidden cursor-default
                transition-all duration-400 ease-out
                hover:-translate-y-2 hover:scale-[1.02]
                ${pkg.isPopular
                  ? "-translate-y-2 md:-translate-y-3 md:scale-[1.05] shadow-[0_20px_60px_rgba(154,14,31,0.25),0_0_0_1px_rgba(154,14,31,0.2)] hover:shadow-[0_28px_70px_rgba(154,14,31,0.35),0_0_0_1px_rgba(154,14,31,0.4)]"
                  : pkg.isEnterprise
                  ? "shadow-[0_8px_30px_rgba(255,255,255,0.03),0_0_0_1px_rgba(255,255,255,0.07)] hover:shadow-[0_16px_50px_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.12)]"
                  : "shadow-[0_8px_30px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.07)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12)]"
                }`}
              style={{
                background: pkg.isPopular
                  ? "linear-gradient(160deg, #111 0%, #0d0d0d 60%, #0a0a0a 100%)"
                  : pkg.isEnterprise
                  ? "linear-gradient(160deg, #0f0f0d 0%, #0a0a09 100%)"
                  : "#0a0a0a",
              }}
            >
              {/* Featured glow overlay */}
              {pkg.isPopular && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-[#9A0E1F]/12 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#9A0E1F]/6 to-transparent" />
                </div>
              )}

              {/* Enterprise gold tint */}
              {pkg.isEnterprise && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/5 to-transparent pointer-events-none" />
              )}

              {/* Top accent bar */}
              <div className={`h-[2px] w-full ${
                pkg.isPopular
                  ? "bg-gradient-to-r from-transparent via-[#9A0E1F] to-transparent"
                  : pkg.isEnterprise
                  ? "bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent"
                  : "bg-gradient-to-r from-transparent via-white/10 to-transparent"
              }`} />

              {/* Dot grid pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" width="100%" height="100%">
                <defs>
                  <pattern id={`dots-${pkg.id}`} width="18" height="18" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#dots-${pkg.id})`} />
              </svg>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4 z-10 relative">
                {/* Popular badge */}
                {pkg.isPopular && (
                  <div className="mb-3 self-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9A0E1F]/20 border border-[#9A0E1F]/40 text-[#9A0E1F] text-[9px] font-bold tracking-widest uppercase">
                      <span className="w-1 h-1 rounded-full bg-[#9A0E1F] animate-pulse" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Enterprise badge */}
                {pkg.isEnterprise && (
                  <div className="mb-2 self-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] text-[9px] font-bold tracking-widest uppercase">
                      <span className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                      Enterprise
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-2 ${
                  pkg.isPopular ? "text-[#9A0E1F]"
                  : pkg.isEnterprise ? "text-[#c9a84c]/70"
                  : "text-white/40"
                }`}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-1">
                  {pkg.currency && (
                    <span className={`font-bold leading-none ${
                      pkg.isPopular ? "text-[#9A0E1F]/80" : "text-white/40"
                    }`} style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}>
                      {pkg.currency}
                    </span>
                  )}
                  <span className={`font-black tracking-tighter leading-none ${
                    pkg.isPopular
                      ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                      : pkg.isEnterprise
                      ? "bg-clip-text text-transparent bg-gradient-to-b from-[#e8c87a] to-[#c9a84c]/70"
                      : "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
                  }`} style={{ fontSize: "clamp(2.2rem, 3.5vw, 2.8rem)" }}>
                    {pkg.price}
                  </span>
                </div>
                <p className="text-white/35 text-[10px] leading-tight mb-3 min-h-[20px] font-light">
                  {pkg.target}
                </p>

                <div className={`w-full h-px mb-2.5 ${
                   pkg.isPopular ? "bg-[#9A0E1F]/15" : "bg-white/[0.04]"
                }`} />

                {/* Features */}
                <div className="flex-grow flex flex-col mb-3">
                  <p className="text-white/20 text-[8px] tracking-[0.2em] uppercase font-bold mb-0.5">Includes</p>
                  {pkg.features.map((feature: any, i: number) => (
                    <FeatureItem key={i} label={feature.label} details={feature.details} />
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={openProjectModal}
                  className={`mt-auto w-full py-3 rounded-xl text-[11px] font-bold tracking-[0.2em] uppercase
                    transition-all duration-300 ease-out
                    hover:-translate-y-[2px] hover:brightness-110 active:scale-[0.98]
                    ${pkg.isPopular
                      ? "bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white shadow-[0_6px_24px_rgba(154,14,31,0.35)] hover:shadow-[0_8px_32px_rgba(154,14,31,0.55)]"
                      : pkg.isEnterprise
                      ? "bg-gradient-to-r from-[#c9a84c]/20 to-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/25 hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
                    }`}
                >
                  {pkg.ctaText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
