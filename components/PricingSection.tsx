"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/components/ModalContext";

// Expandable feature item — pro checkmark
function FeatureItem({ label, details, isParentPopular }: { label: string; details: string; isParentPopular?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const isHighlighted = label.toLowerCase().includes("multi") && label.toLowerCase().includes("location");

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex flex-col items-start text-left focus:outline-none group py-1.5 relative overflow-hidden rounded-md transition-all duration-300"
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300 pointer-events-none" />
      <div className="flex items-start gap-3 w-full px-2 relative z-10">
        <div className={`mt-[4px] shrink-0 transition-all duration-300 ${
          isHighlighted ? "text-[#9A0E1F] drop-shadow-[0_0_8px_rgba(154,14,31,0.8)]" : 
          isParentPopular ? "text-[#9A0E1F]/80 group-hover:text-[#9A0E1F]" :
          "text-white/30 group-hover:text-white/70"
        }`}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className={`text-[12.5px] transition-colors duration-300 flex-1 text-left leading-snug tracking-wide ${
          isHighlighted 
            ? "text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
            : isParentPopular 
              ? "text-white/95 font-semibold group-hover:text-white" 
              : "text-white/75 font-medium group-hover:text-white"
        }`}>
          {label}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`shrink-0 transition-colors mt-[3px] ${
            isHighlighted ? "text-[#9A0E1F]" : "text-white/20 group-hover:text-white/50"
          }`}
        >
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full pl-[32px] pr-2 relative z-10"
          >
            <p className="pt-2 pb-1 text-[11px] text-white/50 leading-relaxed font-light">
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
  const [activeCategory, setActiveCategory] = useState("Content Campaigns");

  const CATEGORIES = [
    "Content Campaigns",
    "Commercials",
    "Social Media",
    "Brand Films"
  ];

  const PRICING_DATA: Record<string, any[]> = {
    "Content Campaigns": [
      {
        id: "rest-starter",
        name: "Starter",
        price: "350",
        currency: "BHD",
        target: "For businesses getting started",
        features: [
          { label: "8 Reels (9:16)", details: "High-impact short-form content for social presence." },
          { label: "16 Photos", details: "Professional high-res shots of your food and venue." },
          { label: "1 Location Shoot", details: "Single session production at your primary venue." },
          { label: "Cinematic Editing", details: "Professional cuts with color correction." },
          { label: "1 Revision Round", details: "One set of refinements to ensure perfection." },
          { label: "Fast-Track Delivery", details: "Regular turnaround for final assets." }
        ],
        ctaText: "Get Started",
        isPopular: false,
        isRetainer: false,
      },
      {
        id: "rest-premium",
        name: "Premium",
        price: "599",
        currency: "BHD",
        target: "For brands focused on growth",
        features: [
          { label: "20 Reels (9:16)", details: "High-volume content for daily social engagement." },
          { label: "20 Photos", details: "Premium photography for ads and social media." },
          { label: "10 Carousel Graphics", details: "Custom designed social graphics for education." },
          { label: "Multi-location Shoot", details: "Shoot across multiple venues or branches." },
          { label: "Advanced Editing", details: "Premium sound design and color grading." },
          { label: "2 Revision Rounds", details: "Extended refinement for total satisfaction." },
          { label: "Fast-Track Delivery", details: "Accelerated delivery for timely campaigns." }
        ],
        ctaText: "Choose Premium",
        isPopular: true,
        isRetainer: false,
      },
      {
        id: "rest-retainer",
        name: "Retainer",
        price: "1,000",
        currency: "BHD",
        target: "For businesses scaling monthly",
        features: [
          { label: "30 Reels (9:16)", details: "Maximum visibility with daily content coverage." },
          { label: "30 Photos", details: "Complete monthly visual library for all channels." },
          { label: "15 Carousel Graphics", details: "Extensive graphic support for digital marketing." },
          { label: "Multi-location Shoot", details: "Comprehensive coverage across your entire network." },
          { label: "Master-Level Editing", details: "Highest tier post-production and color science." },
          { label: "3 Revision Rounds", details: "Unlimited focus on detail and quality." },
          { label: "Fast-Track Delivery", details: "24/7 priority support and express delivery." }
        ],
        ctaText: "Start Retainer",
        isPopular: false,
        isRetainer: true,
      },
      {
        id: "rest-custom",
        name: "Enterprise",
        price: "Custom",
        currency: "",
        target: "Tailored solutions for enterprise brands & franchises",
        features: [
          { label: "Multi-location Strategy", details: "Coordinated content across your entire chain." },
          { label: "Full Creative Direction", details: "Dedicated producer and high-end art direction." },
          { label: "Advanced Menu Engineering", details: "Visuals optimized for highest conversion rates." },
          { label: "Full Rights & Master Files", details: "Complete ownership of all raw and final assets." },
          { label: "Priority Asset Delivery", details: "Guaranteed express turnaround for campaign launches." }
        ],
        ctaText: "Contact Us",
        isPopular: false,
        isRetainer: false,
        isEnterprise: true,
      }
    ],
    "Commercials": [
      {
        id: "re-starter",
        name: "Starter",
        price: "120",
        currency: "BHD",
        target: "For businesses getting started",
        features: [
          { label: "1 Cinematic Walkthrough (16:9)", details: "Interior and exterior property filming." },
          { label: "1 Vertical Reel (9:16)", details: "Optimized for Instagram and TikTok listings." },
          { label: "15 Edited Photos", details: "Color corrected and perspective-fixed shots." },
          { label: "Professional Grading", details: "Clean, natural cinematic look for listings." },
          { label: "1 Revision Round", details: "One set of refinements to ensure perfection." },
          { label: "Fast-Track Delivery", details: "Standard turnaround for property assets." }
        ],
        ctaText: "Get Started",
        isPopular: false,
        isRetainer: false,
      },
      {
        id: "re-premium",
        name: "Premium",
        price: "200",
        currency: "BHD",
        target: "For brands focused on growth",
        features: [
          { label: "1 Cinematic Walkthrough (16:9)", details: "Premium cinematography with gimbal work." },
          { label: "1 High-Retention Speed Ramp (16:9)", details: "Dynamic edit for viral social media potential." },
          { label: "1 Vertical Reel (9:16)", details: "High-impact vertical video content." },
          { label: "30 Edited Photos", details: "Full coverage for all rooms and angles." },
          { label: "Advanced Sound Design", details: "Immersive audio to match cinematic visuals." },
          { label: "2 Revision Rounds", details: "Extended refinement for total satisfaction." },
          { label: "Fast-Track Delivery", details: "Priority delivery for faster listing launches." }
        ],
        ctaText: "Choose Premium",
        isPopular: true,
        isRetainer: false,
      },
      {
        id: "re-retainer",
        name: "Retainer",
        price: "Custom",
        currency: "",
        target: "For businesses scaling monthly",
        features: [
          { label: "Multi-location Coverage", details: "Volume shoots for development portfolios." },
          { label: "Drone & Cinematic Shoots (16:9)", details: "Breathtaking aerial coverage for high-end listings." },
          { label: "Monthly Content Strategy", details: "Bespoke planning for agencies and developers." },
          { label: "VFX & Advanced Grading", details: "Top-tier post-production for luxury properties." },
          { label: "Full Rights / Raw Files", details: "Complete ownership of all original assets." },
          { label: "Fast-Track Delivery", details: "Guaranteed express delivery for all listings." }
        ],
        ctaText: "Contact Us",
        isPopular: false,
        isRetainer: true,
      }
    ],
    "Social Media": [
      {
        id: "gym-starter",
        name: "Starter",
        price: "120",
        currency: "BHD",
        target: "For businesses getting started",
        features: [
          { label: "1 Cinematic Fitness Video (16:9)", details: "High-energy footage of workouts or facilities." },
          { label: "1 Vertical Reel (9:16)", details: "Optimized short-form video for social engagement." },
          { label: "10 Edited Photos", details: "Action shots and high-quality facility photos." },
          { label: "1 Location Shoot", details: "Single production session at your gym." },
          { label: "Cinematic Editing", details: "Energy-matched cuts with professional flow." },
          { label: "Fast-Track Delivery", details: "Regular turnaround for final content assets." }
        ],
        ctaText: "Get Started",
        isPopular: false,
        isRetainer: false,
      },
      {
        id: "gym-premium",
        name: "Premium",
        price: "200",
        currency: "BHD",
        target: "For brands focused on growth",
        features: [
          { label: "1 Cinematic Fitness Video (16:9)", details: "Advanced cinematography focused on brand story." },
          { label: "1 Speed Ramp Video (16:9)", details: "High-impact edit with professional transitions." },
          { label: "1 Talking Head Reel (9:16)", details: "Motivational or educational presenter content." },
          { label: "20 Edited Photos", details: "Extensive photo set covering all gym areas." },
          { label: "Premium Sound Design", details: "Aggressive, high-energy audio post-production." },
          { label: "Fast-Track Delivery", details: "Express turnaround for social media trends." }
        ],
        ctaText: "Choose Premium",
        isPopular: true,
        isRetainer: false,
      },
      {
        id: "gym-retainer",
        name: "Retainer",
        price: "499",
        currency: "BHD",
        target: "For businesses scaling monthly",
        features: [
          { label: "15 Reels Per Month (9:16)", details: "Consistent daily or bi-daily content flow." },
          { label: "30 Edited Photos", details: "Monthly library of fresh visual assets." },
          { label: "Multi-location Shoots", details: "Production across multiple facility branches." },
          { label: "Strategic Brand Direction", details: "Ongoing creative partnership for growth." },
          { label: "Optimized for Growth", details: "Content specifically crafted to maximize reach." },
          { label: "Fast-Track Delivery", details: "Ongoing express delivery for consistent posting." }
        ],
        ctaText: "Start Retainer",
        isPopular: false,
        isRetainer: true,
      }
    ],
    "Brand Films": [
      {
        id: "hotel-starter",
        name: "Starter",
        price: "120",
        currency: "BHD",
        target: "For businesses getting started",
        features: [
          { label: "1 Cinematic Walkthrough (16:9)", details: "Interior and exterior filming of guest spaces." },
          { label: "1 Vertical Reel (9:16)", details: "Engaging short-form content for social visibility." },
          { label: "20 Website-Ready Photos", details: "Optimized shots for booking platforms and web." },
          { label: "Lifestyle Cinematography", details: "Focus on guest experiences and atmosphere." },
          { label: "Natural Color Grading", details: "Inviting aesthetic to attract future guests." },
          { label: "Fast-Track Delivery", details: "Regular turnaround for hospitality assets." }
        ],
        ctaText: "Get Started",
        isPopular: false,
        isRetainer: false,
      },
      {
        id: "hotel-premium",
        name: "Premium",
        price: "200",
        currency: "BHD",
        target: "For brands focused on growth",
        features: [
          { label: "1 Cinematic Walkthrough (16:9)", details: "Highest-tier luxury cinematography." },
          { label: "1 High-Retention Speed Ramp (16:9)", details: "Dynamic showcase of resort amenities." },
          { label: "1 Vertical Reel (9:16)", details: "Viral-ready vertical content for growth." },
          { label: "60 Website-Ready Photos", details: "Complete library for every room type and facility." },
          { label: "Immersive Sound Design", details: "Audio that captures the resort experience." },
          { label: "Fast-Track Delivery", details: "Accelerated delivery for seasonal marketing." }
        ],
        ctaText: "Choose Premium",
        isPopular: true,
        isRetainer: false,
      },
      {
        id: "hotel-retainer",
        name: "Retainer",
        price: "Custom",
        currency: "",
        target: "For businesses scaling monthly",
        features: [
          { label: "Multi-location Coverage", details: "Coordinated content across hotel groups or chains." },
          { label: "Drone & Lifestyle Shoots (16:9)", details: "Breathtaking aerial views and lifestyle coverage." },
          { label: "Seasonal Content Strategy", details: "Monthly planning for year-round marketing cycles." },
          { label: "Specialized Color Science", details: "Top-tier grading for luxury brand positioning." },
          { label: "Full Rights / Raw Files", details: "Complete ownership of all high-res master files." },
          { label: "Fast-Track Delivery", details: "Guaranteed express delivery for campaign launches." }
        ],
        ctaText: "Contact Us",
        isPopular: false,
        isRetainer: true,
      }
    ]
  };

  // Default to restaurant data if category not found in map
  const packages = PRICING_DATA[activeCategory] || PRICING_DATA["Content Campaigns"];

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
            Simple, clear prices to help your business get more customers.
          </p>
        </motion.div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-10 md:mb-16 px-0 md:px-2">
          {/* Mobile: Horizontal scroll strip */}
          <div className="md:hidden w-full relative">
            <div className="w-full overflow-x-auto scrollbar-hide -mx-1">
              <div className="flex items-center gap-2 px-5 pb-2 min-w-max pr-14">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category 
                        ? "text-white bg-[#9A0E1F] shadow-[0_4px_16px_rgba(154,14,31,0.4)]" 
                        : "text-white/40 bg-white/5 border border-white/10 active:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {/* Scroll Indicator Arrow & Fade */}
            <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent pointer-events-none flex items-center justify-end pr-2">
              <svg className="w-4 h-4 text-white/40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Desktop: Centered pill group */}
          <div className="hidden md:flex flex-wrap items-center justify-center p-2 bg-white/5 border border-white/10 rounded-full gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
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
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-1 md:grid-cols-2 ${
                packages.length === 3 ? "lg:grid-cols-3 max-w-6xl mx-auto" : "lg:grid-cols-4 lg:max-w-[1400px] w-full mx-auto"
              } gap-5 md:gap-5 items-end px-0 md:px-0 mt-0`}
            >
              {packages.map((pkg, idx) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`group flex flex-col relative rounded-[20px] md:rounded-[24px] overflow-hidden cursor-default
                transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                md:hover:-translate-y-2 md:hover:scale-[1.02]
                ${pkg.isPopular
                  ? "md:-translate-y-3 md:scale-[1.03] shadow-[0_20px_60px_rgba(154,14,31,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] border border-[#9A0E1F]/50 md:hover:shadow-[0_30px_80px_rgba(154,14,31,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] md:hover:border-[#9A0E1F]/80 z-10"
                  : "shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.02)] border border-white/5 md:hover:border-white/10 md:hover:shadow-[0_16px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
                }`}
              style={{
                background: "rgba(10, 10, 10, 0.95)",
                /* No backdrop-filter — solid bg instead. Each card with backdrop-filter
                   creates a new compositing layer, causing iOS repaint storms. */
              }}
            >
              {/* Featured glow overlay */}
              {pkg.isPopular && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-[#9A0E1F]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-[#9A0E1F]/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#9A0E1F]/5 via-transparent to-[#9A0E1F]/5" />
                </div>
              )}

              {/* Top accent bar */}
              <div className={`h-[3px] w-full ${
                pkg.isPopular
                  ? "bg-gradient-to-r from-transparent via-[#9A0E1F] to-transparent shadow-[0_0_15px_#9A0E1F]"
                  : pkg.isRetainer || pkg.isEnterprise
                  ? "bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent"
                  : "bg-gradient-to-r from-transparent via-white/20 to-transparent"
              }`} />

              {/* Dot grid pattern removed */}

              {/* Content */}
              <div className="flex flex-col flex-grow p-6 z-10 relative">
                {/* Popular badge */}
                {pkg.isPopular && (
                  <div className="absolute top-5 right-5 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9A0E1F]/20 border border-[#9A0E1F]/50 text-[#9A0E1F] text-[9px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(154,14,31,0.4)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_5px_#9A0E1F]" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Enterprise / Retainer badge */}
                {(pkg.isRetainer || pkg.isEnterprise) && (
                  <div className="absolute top-5 right-5 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/5 border border-[#c9a84c]/20 text-[#c9a84c]/90 text-[9px] font-bold tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                      {pkg.isRetainer ? "Retainer" : "Enterprise"}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-3 mt-1 ${
                  pkg.isPopular ? "text-[#9A0E1F]"
                  : pkg.isRetainer || pkg.isEnterprise ? "text-[#c9a84c]/80"
                  : "text-white/50"
                }`}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  {pkg.currency && (
                    <span className={`font-bold leading-none ${
                      pkg.isPopular ? "text-[#9A0E1F]/80" : "text-white/40"
                    }`} style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                      {pkg.currency}
                    </span>
                  )}
                  <span className={`font-black tracking-tighter leading-none drop-shadow-2xl ${
                    pkg.isPopular
                      ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                      : pkg.isRetainer || pkg.isEnterprise
                      ? "bg-clip-text text-transparent bg-gradient-to-b from-[#fcebb6] to-[#c9a84c]/80"
                      : "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                  }`} style={{ fontSize: "clamp(2.5rem, 4vw, 3.2rem)" }}>
                    {pkg.price}
                  </span>
                </div>
                <p className="text-white/40 text-[11px] leading-tight mb-5 min-h-[22px] font-light italic tracking-wide">
                  {pkg.target}
                </p>

                <div className={`w-full h-px mb-5 ${
                   pkg.isPopular ? "bg-gradient-to-r from-[#9A0E1F]/40 to-transparent" : "bg-gradient-to-r from-white/10 to-transparent"
                }`} />

                {/* Features */}
                <div className="flex-grow flex flex-col mb-6">
                  <p className="text-white/30 text-[9px] tracking-[0.2em] uppercase font-bold mb-3 ml-1">Includes</p>
                  <div className="space-y-0.5">
                    {pkg.features.map((feature: any, i: number) => (
                      <FeatureItem key={i} label={feature.label} details={feature.details} isParentPopular={pkg.isPopular} />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => openProjectModal(activeCategory)}
                  className={`mt-auto w-full py-4 md:py-3.5 rounded-xl text-[12px] font-bold tracking-[0.2em] uppercase
                    transition-all duration-300 ease-out relative overflow-hidden group/cta
                    active:scale-[0.97] md:hover:-translate-y-[2px]
                    ${pkg.isPopular
                      ? "bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white shadow-[0_8px_30px_rgba(154,14,31,0.4)] md:hover:shadow-[0_12px_40px_rgba(154,14,31,0.6)]"
                      : pkg.isRetainer || pkg.isEnterprise
                      ? "bg-white/[0.02] border border-[#c9a84c]/30 text-[#c9a84c] md:hover:bg-[#c9a84c]/10 md:hover:border-[#c9a84c]/50"
                      : "bg-white/5 border border-white/10 text-white md:hover:bg-white/10 md:hover:text-white md:hover:border-white/30"
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {pkg.ctaText}
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                  {pkg.isPopular && (
                     <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full ease-out" style={{ transitionDuration: '0.7s' }} />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
      </div>
    </section>
  );
}
