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
      className="w-full flex flex-col items-start text-left focus:outline-none group py-2.5"
    >
      <div className="flex items-center gap-3 w-full">
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

  const packages = [
    {
      id: "starter",
      name: "Starter",
      price: "499",
      currency: "$",
      target: "Best for small brands or basic shoots",
      features: [
        { label: "10 Edited Photos", details: "High-resolution professionally color-graded photos." },
        { label: "1 Short Reel (15–30 sec)", details: "Optimized for Instagram/TikTok with trending transitions." },
        { label: "Basic Color Grading", details: "Standard cinematic color correction for a consistent look." },
        { label: "1 Location Shoot", details: "Up to 2 hours of production at a single venue." }
      ],
      ctaText: "Get Started",
      isPopular: false,
      isEnterprise: false,
    },
    {
      id: "pro",
      name: "Standard",
      price: "899",
      currency: "$",
      target: "Comprehensive content for monthly growth",
      features: [
        { label: "25 Edited Photos", details: "Full gallery covering food, ambiance, and team." },
        { label: "3 Reels / Short Videos", details: "A mix of storytelling, fast-paced, and cinematic edits." },
        { label: "Advanced Color Grading", details: "Premium 'film-look' grading tailored to your brand." },
        { label: "Drone / 4K Footage", details: "Stunning aerials and crisp 4K production quality." }
      ],
      ctaText: "Choose Standard",
      isPopular: true,
      isEnterprise: false,
    },
    {
      id: "elite",
      name: "Premium",
      price: "1,499",
      currency: "$",
      target: "The ultimate cinematic brand overhaul",
      features: [
        { label: "50+ Edited Photos", details: "Infinite content for ads, website, and socials." },
        { label: "6 Reels + 1 Main Film", details: "Complete content ecosystem including a 60-sec brand story." },
        { label: "Creative Direction", details: "We handle the concepts, script, and storyboarding." },
        { label: "Full Day Production", details: "Comprehensive shoot covering every angle of your brand." }
      ],
      ctaText: "Go Premium",
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
    <section data-theme="pricing" className="py-24 md:py-36 bg-[#050505] relative overflow-hidden">
      {/* Top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9A0E1F]/40 to-transparent" />
      {/* Background radial for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(154,14,31,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_10px_#9A0E1F]" />
            <span className="text-white font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Investment</span>
          </div>
          <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-black text-4xl md:text-6xl tracking-tighter leading-none mb-6">
            CHOOSE YOUR<br />PACKAGE.
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base font-light">
            Simple, transparent pricing built for high-end hospitality and modern brand growth.
          </p>
        </motion.div>

        {/* Grid — align tops, Standard lifts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
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
                  ? "-translate-y-3 scale-[1.05] shadow-[0_20px_60px_rgba(154,14,31,0.25),0_0_0_1px_rgba(154,14,31,0.2)] hover:shadow-[0_28px_70px_rgba(154,14,31,0.35),0_0_0_1px_rgba(154,14,31,0.4)]"
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
              <div className="flex flex-col flex-grow p-6 z-10 relative">
                {/* Popular badge */}
                {pkg.isPopular && (
                  <div className="mb-5 self-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9A0E1F]/20 border border-[#9A0E1F]/40 text-[#9A0E1F] text-[9px] font-bold tracking-widest uppercase">
                      <span className="w-1 h-1 rounded-full bg-[#9A0E1F] animate-pulse" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Enterprise badge */}
                {pkg.isEnterprise && (
                  <div className="mb-5 self-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 text-[#c9a84c] text-[9px] font-bold tracking-widest uppercase">
                      <span className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                      Enterprise
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className={`text-[11px] font-bold tracking-[0.25em] uppercase mb-5 ${
                  pkg.isPopular ? "text-[#9A0E1F]"
                  : pkg.isEnterprise ? "text-[#c9a84c]/70"
                  : "text-white/40"
                }`}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
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
                  }`} style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}>
                    {pkg.price}
                  </span>
                </div>
                <p className="text-white/35 text-[11px] leading-relaxed mb-6 min-h-[32px] font-light">
                  {pkg.target}
                </p>

                {/* Divider */}
                <div className={`w-full h-px mb-4 ${
                  pkg.isPopular ? "bg-[#9A0E1F]/15" : "bg-white/[0.05]"
                }`} />

                {/* Features */}
                <div className="flex-grow flex flex-col mb-8">
                  <p className="text-white/20 text-[9px] tracking-widest uppercase font-bold mb-1">Includes</p>
                  {pkg.features.map((feature: any, i: number) => (
                    <FeatureItem key={i} label={feature.label} details={feature.details} />
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={openProjectModal}
                  className={`mt-auto w-full py-3.5 rounded-xl text-[11px] font-bold tracking-[0.2em] uppercase
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
