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
      tier: "PROJECT BASIS",
      bestFor: "Grand Openings, Menu Launches, Websites",
      delivery: "2-3 Weeks Turnaround",
      bullets: [
        "Full video planning and script writing",
        "High-end filming and premium photography",
        "Finished, ready-to-post videos that look beautiful",
        "Makes your business look premium from day one"
      ],
      ctaText: "Inquire for Project Rates →",
      isFeatured: false,
      icon: (
        <svg className="w-5 h-5 text-white/40 group-hover:text-[#9A0E1F] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
      )
    },
    {
      number: "02",
      title: "MONTHLY VIDEOS & PHOTOS",
      subtitle: "Get fresh, high-quality content for your Instagram and TikTok every single month without the stress of filming it yourself.",
      tier: "MONTHLY RETAINER",
      bestFor: "Cafes, Restaurants, Gyms, Active Brands",
      delivery: "Ongoing Monthly Delivery",
      accentTag: "Most Requested",
      bullets: [
        "We come to your business every month to shoot",
        "High-engagement Instagram Reels and short videos",
        "Professional photos for your social media and ads",
        "Consistent content to keep your tables and doors full"
      ],
      ctaText: "Apply for Monthly Spot →",
      isFeatured: true,
      icon: (
        <svg className="w-5 h-5 text-[#9A0E1F] group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      )
    },
    {
      number: "03",
      title: "COMPLETE BRANDING & VIDEO",
      subtitle: "A total visual upgrade from scratch. Best for luxury hotels, large properties, and big companies.",
      tier: "BESPOKE PACKAGE",
      bestFor: "Luxury Hotels, Property Groups, Full Rebrands",
      delivery: "6-8 Weeks Turnaround",
      bullets: [
        "New professional logo design and brand colors",
        "Premium main films that tell your business story",
        "High-end drone shots and multi-location filming",
        "You get full ownership of all raw original video files"
      ],
      ctaText: "Book a Consultation →",
      isFeatured: false,
      icon: (
        <svg className="w-5 h-5 text-white/40 group-hover:text-[#9A0E1F] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      )
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          {models.map((model, idx) => (
            <Reveal key={model.number} delay={idx * 0.1} className="h-full">
              <div
                className={`group relative flex flex-col justify-between h-full bg-gradient-to-b from-[#0C0C0C] to-[#060606] border rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 ${
                  model.isFeatured
                    ? "border-[#9A0E1F]/60 shadow-[0_15px_40px_-15px_rgba(154,14,31,0.15)] hover:border-[#9A0E1F] hover:shadow-[0_20px_50px_-10px_rgba(154,14,31,0.25)]"
                    : "border-white/[0.06] hover:border-white/[0.15] hover:shadow-[0_15px_45px_-15px_rgba(0,0,0,0.4)]"
                }`}
              >
                {/* Subtle top light bar for the featured card */}
                {model.isFeatured && (
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9A0E1F] via-[#ff2a2a] to-[#9A0E1F] rounded-t-3xl" />
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors duration-300 ${model.isFeatured ? 'bg-[#9A0E1F]/10 text-[#9A0E1F]' : 'bg-white/[0.03] text-white/40 group-hover:bg-[#9A0E1F]/10 group-hover:text-[#9A0E1F]'}`}>
                        {model.icon}
                      </div>
                      <span className="font-mono text-white/30 text-xs md:text-sm tracking-widest font-medium">
                        {model.number}
                      </span>
                    </div>

                    {model.accentTag ? (
                      <span className="text-white font-mono text-[9px] tracking-[0.25em] font-bold uppercase py-1 px-3 bg-[#9A0E1F] border border-[#9A0E1F]/30 rounded-full shadow-[0_0_15px_rgba(154,14,31,0.3)] animate-pulse">
                        {model.accentTag}
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] tracking-[0.25em] font-bold text-white/40 uppercase py-1 px-3 bg-white/[0.03] border border-white/[0.06] rounded-full">
                        {model.tier}
                      </span>
                    )}
                  </div>

                  {/* Title & Concept */}
                  <h3 className="font-black text-xl md:text-2xl tracking-[0.04em] text-white uppercase mb-2 leading-tight group-hover:text-[#ff2a2a] transition-colors duration-300">
                    {model.title}
                  </h3>

                  {/* Delivery Turnaround Tag */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-[#9A0E1F] font-black uppercase">
                      {model.delivery}
                    </span>
                  </div>

                  <p className="text-[#999999] text-[13px] leading-relaxed font-light mb-6">
                    {model.subtitle}
                  </p>

                  {/* Target Audience Badge */}
                  <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl px-4 py-3 mb-8">
                    <p className="text-[9px] font-mono tracking-widest text-white/30 uppercase mb-1">
                      Ideal For
                    </p>
                    <p className="text-white/80 text-[12px] font-medium leading-normal">
                      {model.bestFor}
                    </p>
                  </div>

                  {/* Divider Line (Ultra-thin, low opacity) */}
                  <div className="w-full h-px bg-white/[0.08] mb-8" />

                  {/* Bullets List */}
                  <div className="mb-10">
                    <p className="text-[9px] font-mono tracking-[0.25em] text-[#9A0E1F] font-bold uppercase mb-5">
                      Included Services
                    </p>
                    <ul className="space-y-4">
                      {model.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3 text-[#999999] text-[13px] leading-relaxed transition-colors duration-150 group-hover:text-white/80">
                          <svg className="w-4 h-4 text-[#9A0E1F] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-light">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button/CTA with Snappy Hover state */}
                <button
                  onClick={() => openProjectModal()}
                  className={`w-full py-4 rounded-xl text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-xl ${
                    model.isFeatured
                      ? "bg-[#9A0E1F] text-white border border-[#9A0E1F] hover:bg-[#b51226] hover:border-[#b51226]"
                      : "bg-transparent border border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
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
