"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/components/ModalContext";

// Expandable feature item — pro checkmark
function FeatureItem({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-3 w-full py-1.5 relative z-10 transition-colors duration-300 group">
      <div className="mt-[4px] shrink-0 text-[#9A0E1F]/80 group-hover:text-[#9A0E1F] transition-all duration-300">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span className="text-[13px] text-white/75 font-medium group-hover:text-white transition-colors duration-300 flex-1 text-left leading-snug tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function EngagementModels() {
  const { openProjectModal } = useModal();

  const models = [
    {
      id: "launch",
      name: "Launch",
      priceLabel: "Starting From",
      priceValue: "BHD 350",
      target: "For growing businesses establishing their online presence.",
      features: [
        { label: "Content Production" },
        { label: "Brand Positioning" },
        { label: "Creative Direction" },
        { label: "Social Media Assets" },
        { label: "Visual Presence" }
      ],
      ctaText: "Explore Launch",
      isPopular: false,
    },
    {
      id: "growth",
      name: "Growth",
      priceLabel: "Partnership Model",
      priceValue: "Custom Monthly Retainer",
      target: "For businesses focused on scaling visibility, leads, and brand authority.",
      features: [
        { label: "Premium Content Systems" },
        { label: "Meta Ads & Campaigns" },
        { label: "Campaign Strategy" },
        { label: "Performance Creative" },
        { label: "Conversion-Focused Marketing" },
        { label: "Creative Testing" }
      ],
      ctaText: "Explore Growth",
      isPopular: true,
    },
    {
      id: "scale",
      name: "Scale",
      priceLabel: "Enterprise Level",
      priceValue: "Tailored Engagement",
      target: "For established brands, franchises, hotels, and enterprise businesses.",
      features: [
        { label: "Full Creative Partnership" },
        { label: "Brand Identity Systems" },
        { label: "Multi-Location Campaigns" },
        { label: "Paid Advertising Infrastructure" },
        { label: "Brand Expansion Strategy" },
        { label: "Advanced Creative Direction" },
        { label: "Full Funnel Growth Systems" }
      ],
      ctaText: "Book Strategy Call",
      isPopular: false,
      isEnterprise: true,
    }
  ];

  return (
    <section id="engagement-models" data-theme="pricing" className="py-32 md:py-40 bg-[#050505] relative overflow-hidden">
      {/* Top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9A0E1F]/40 to-transparent" />
      {/* Background radial for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(154,14,31,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
            <span className="text-white font-mono tracking-[0.3em] uppercase text-[10px] md:text-[11px] font-bold">Engagement Models</span>
          </div>
          <h2 
            className="text-white font-black tracking-tighter leading-[1.05] uppercase mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Growth Engagements
          </h2>
          <p className="text-white/40 text-[14px] md:text-[16px] max-w-2xl mx-auto font-light leading-relaxed">
            We are a strategic premium growth partner. We don&apos;t just sell assets; we build comprehensive content and performance ecosystems that scale brands.
          </p>
        </motion.div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {models.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className={`group flex flex-col h-full relative rounded-3xl overflow-hidden transition-all duration-500 p-8 md:p-10 transform-gpu will-change-transform ${
                pkg.isPopular 
                  ? "bg-gradient-to-b from-[#0A0A0A] to-[#110507] border border-[#9A0E1F]/30 hover:border-[#9A0E1F]/60 shadow-[0_0_40px_rgba(154,14,31,0.1)] hover:shadow-[0_0_60px_rgba(154,14,31,0.2)]" 
                  : "bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
              }`}
            >
              {/* Highlight / Glow Behind Card */}
              {pkg.isPopular && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#9A0E1F]/10 to-transparent pointer-events-none" />
              )}
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Popular / Enterprise badge */}
                {(pkg.isPopular || pkg.isEnterprise) && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                      pkg.isPopular 
                        ? "bg-[#9A0E1F]/10 border-[#9A0E1F]/30 text-[#9A0E1F]" 
                        : "bg-[#c9a84c]/5 border-[#c9a84c]/20 text-[#c9a84c]/90"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pkg.isPopular ? "bg-[#9A0E1F] animate-pulse" : "bg-[#c9a84c]"}`} />
                      {pkg.isPopular ? "Most Popular" : "Enterprise"}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className={`text-[12px] font-bold tracking-[0.25em] uppercase mb-4 mt-2 ${
                  pkg.isPopular ? "text-[#9A0E1F]"
                  : pkg.isEnterprise ? "text-[#c9a84c]/80"
                  : "text-white/60"
                }`}>
                  {pkg.name}
                </h3>

                {/* Price */}
                <div className="flex flex-col gap-2 mb-2">
                  <span className={`font-mono text-[10px] tracking-widest uppercase ${
                    pkg.isPopular ? "text-[#9A0E1F]/80" : "text-white/40"
                  }`}>
                    {pkg.priceLabel}
                  </span>
                  <span className={`font-black tracking-tighter leading-tight drop-shadow-2xl ${
                    pkg.isPopular
                      ? "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
                      : pkg.isEnterprise
                      ? "bg-clip-text text-transparent bg-gradient-to-b from-[#fcebb6] to-[#c9a84c]/80"
                      : "bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
                  }`} style={{ fontSize: pkg.priceValue.length > 15 ? "clamp(1.5rem, 2vw, 2rem)" : "clamp(2rem, 3vw, 2.5rem)" }}>
                    {pkg.priceValue}
                  </span>
                </div>
                
                <p className="text-white/40 text-[13px] leading-relaxed mb-8 min-h-[44px] font-light">
                  {pkg.target}
                </p>

                <div className={`w-full h-px mb-8 ${
                   pkg.isPopular ? "bg-gradient-to-r from-[#9A0E1F]/40 to-transparent" : "bg-gradient-to-r from-white/10 to-transparent"
                }`} />

                {/* Features */}
                <div className="flex-grow flex flex-col mb-10">
                  <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold mb-4 ml-1">Focus Areas</p>
                  <div className="space-y-1">
                    {pkg.features.map((feature: any, i: number) => (
                      <FeatureItem key={i} label={feature.label} />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => openProjectModal()}
                  className={`mt-auto w-full py-4 rounded-xl text-[11px] font-bold tracking-[0.2em] uppercase
                    transition-all duration-300 ease-out relative overflow-hidden group/cta transform-gpu will-change-transform
                    hover:-translate-y-[2px] active:scale-[0.98]
                    ${pkg.isPopular
                      ? "bg-gradient-to-r from-[#9A0E1F] to-[#c01529] text-white shadow-[0_8px_30px_rgba(154,14,31,0.4)] hover:shadow-[0_12px_40px_rgba(154,14,31,0.6)]"
                      : pkg.isEnterprise
                      ? "bg-white/[0.02] border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]/50"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/30"
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {pkg.ctaText}
                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
