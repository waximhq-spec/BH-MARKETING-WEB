"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";

export default function CTASection() {
  const { openProjectModal } = useModal();

  return (
    <section data-theme="pricing" className="py-24 md:py-36 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(154,14,31,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9A0E1F]/20 to-transparent" />

      <div className="container relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
            <span className="text-white font-mono tracking-[0.3em] uppercase text-[10px] md:text-[11px] font-bold">Start Your Journey</span>
          </div>

          <h2 
            className="text-white font-black tracking-tighter leading-[1.05] uppercase mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Ready to scale your <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-[#9A0E1F]">brand's revenue?</span>
          </h2>

          <p className="text-white/40 text-[15px] md:text-[17px] max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Let's build a tailored creative strategy and high-converting marketing engine designed specifically for your growth goals.
          </p>

          <button
            onClick={() => openProjectModal()}
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-white text-black font-mono font-bold text-[12px] md:text-[13px] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transform-gpu will-change-transform"
          >
            <span>Get a Quote Now</span>
            <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-black/20 text-[14px]">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
