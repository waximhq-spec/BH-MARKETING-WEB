"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";

export default function CTASection() {
  const { openProjectModal } = useModal();

  return (
    <section data-theme="light" className="py-24 md:py-36 bg-white relative overflow-hidden border-t border-black/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(154,14,31,0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9A0E1F]/15 to-transparent" />

      <div className="container relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/5 border border-[#9A0E1F]/20 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
            <span className="text-[#9A0E1F] font-mono tracking-[0.3em] uppercase text-[10px] md:text-[11px] font-bold">Start Your Journey</span>
          </div>

          <h2 
            className="text-black font-bold tracking-tight antialiased uppercase leading-[1.05] mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Ready to elevate <br />
            <span className="text-black">your brand?</span>
          </h2>

          <p className="text-black/60 text-[15px] md:text-[17px] max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Let&apos;s build a tailored visual strategy and premium cinematic assets designed specifically to accelerate your growth.
          </p>

          <button
            onClick={() => openProjectModal()}
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-black text-white font-mono font-bold text-[12px] md:text-[13px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transform-gpu will-change-transform cursor-pointer"
          >
            <span>Get a Quote Now</span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/20 text-[14px]">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
