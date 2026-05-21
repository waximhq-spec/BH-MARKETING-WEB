"use client";

import { useModal } from "@/components/ModalContext";
import Reveal from "@/components/Reveal";

export default function EngagementModels() {
  const { openProjectModal } = useModal();

  const models = [
    {
      number: "01",
      title: "ONE-TIME PROJECTS",
      subtitle: "Perfect if you just need one major video for a grand opening, a new menu launch, or your website homepage.",
      bullets: [
        "Full video planning and script writing",
        "High-end filming and premium photography",
        "Finished, ready-to-post videos that look beautiful",
        "Makes your business look premium from day one"
      ],
      ctaText: "Inquire for Project Rates →",
      isFeatured: false,
    },
    {
      number: "02",
      title: "MONTHLY VIDEOS & PHOTOS",
      subtitle: "Get fresh, high-quality content for your Instagram and TikTok every single month without the stress of filming it yourself.",
      accentTag: "Most Requested",
      bullets: [
        "We come to your business every month to shoot",
        "High-engagement Instagram Reels and short videos",
        "Professional photos for your social media and ads",
        "Consistent content to keep your tables and doors full"
      ],
      ctaText: "Apply for Monthly Spot →",
      isFeatured: true,
    },
    {
      number: "03",
      title: "COMPLETE BRANDING & VIDEO",
      subtitle: "A total visual upgrade from scratch. Best for luxury hotels, large properties, and big companies.",
      bullets: [
        "New professional logo design and brand colors",
        "Premium main films that tell your business story",
        "High-end drone shots and multi-location filming",
        "You get full ownership of all raw original video files"
      ],
      ctaText: "Book a Consultation →",
      isFeatured: false,
    }
  ];

  return (
    <section id="engagement-models" data-theme="dark" className="py-24 md:py-36 lg:py-40 bg-[#050505] relative overflow-hidden text-white border-t border-white/[0.06]">
      {/* Background radial highlight for premium atmospheric depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(154,14,31,0.03),transparent_60%)] pointer-events-none" />

      <div className="container relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-20 lg:mb-28">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-6 lg:mb-10 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                <span className="text-white font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">
                  HIRE US
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-black tracking-[0.08em] leading-[0.95] text-white uppercase antialiased" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
                CHOOSE YOUR<br className="md:hidden" /> OPTION.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="md:mt-16 max-w-[340px]">
            <p className="text-[#999999] text-[14px] md:text-[15px] leading-[1.7] font-light">
              Simple ways to hire us. Clear options with no confusing business talk, built to get you more customers.
            </p>
          </Reveal>
        </div>

        {/* 3 Column Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {models.map((model, idx) => (
            <Reveal key={model.number} delay={idx * 0.1} className="h-full">
              <div
                className={`group flex flex-col justify-between h-full bg-[#0D0D0D] border p-8 md:p-10 transition-all duration-300 ${
                  model.isFeatured
                    ? "border-[#9A0E1F]/50 hover:border-[#9A0E1F] hover:shadow-[0_0_30px_rgba(154,14,31,0.08)]"
                    : "border-white/[0.08] hover:border-white/[0.18]"
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-mono text-white/30 text-xs md:text-sm tracking-widest font-medium">
                      {model.number}
                    </span>
                    {model.accentTag && (
                      <span className="text-[#9A0E1F] font-mono text-[9px] tracking-[0.25em] font-bold uppercase py-1 px-3 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full">
                        {model.accentTag}
                      </span>
                    )}
                  </div>

                  {/* Title & Concept */}
                  <h3 className="font-bold text-lg md:text-xl tracking-[0.06em] text-white uppercase mb-3">
                    {model.title}
                  </h3>
                  <p className="text-[#999999] text-[13px] leading-relaxed font-light mb-6">
                    {model.subtitle}
                  </p>

                  {/* Divider Line (Ultra-thin, low opacity) */}
                  <div className="w-full h-px bg-white/[0.08] mb-6" />

                  {/* Bullets List */}
                  <ul className="space-y-4 mb-10">
                    {model.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-[#999999] text-[13px] leading-relaxed transition-colors duration-150 group-hover:text-white/80">
                        <span className="text-[#9A0E1F] shrink-0 font-light">—</span>
                        <span className="font-light">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button/CTA with Snappy Hover state */}
                <button
                  onClick={() => openProjectModal()}
                  className={`w-full py-4 text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                    model.isFeatured
                      ? "bg-[#9A0E1F] text-white border border-[#9A0E1F] hover:bg-[#b51226] hover:border-[#b51226]"
                      : "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black hover:border-white"
                  }`}
                >
                  {model.ctaText}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
