"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Visual Direction",
    desc: "Every project begins with defining how your brand should be perceived. We align visuals, messaging, and audience intent before anything is produced.",
  },
  {
    num: "02",
    title: "Cinematic Production",
    desc: "We produce cinematic content engineered to position your brand at a higher standard. Every frame is intentional, consistent, and built to elevate perception.",
  },
  {
    num: "03",
    title: "Brand Synergy",
    desc: "We refine and systemize your visual identity across outputs, ensuring every piece of content reinforces a cohesive, premium brand presence.",
  },
];

function StepNumberDisplay({ progress }: { progress: MotionValue<number> }) {
  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const stepIndex = Math.min(
      STEPS.length - 1,
      Math.max(0, Math.floor((latest) * STEPS.length))
    );
    if (stepIndex !== activeStep) setActiveStep(stepIndex);
  });

  return (
    <span className="text-[#8B0016] font-mono text-[10px] font-bold tracking-[0.2em] w-4">
      0{activeStep + 1}
    </span>
  );
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const leftParallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="relative bg-gradient-to-b from-black to-[#0a0a0a]">
      {/* Background Depth layer (Glow + Noise) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(139,0,22,0.03)_0%,transparent_50%)]" />
        {/* Subtle noise grain */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* DESKTOP (Split Sticky Scroll) */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full items-start relative z-10">
        
        {/* Left Column: Sticky Editorial Header */}
        <div className="lg:w-[41.666667%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 py-20 lg:pt-24 lg:pb-24 z-10 lg:border-r border-white-[0.02] bg-transparent">
          
          <motion.div style={{ y: leftParallaxY }} className="max-w-md mt-0 flex flex-col relative">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-[#8B0016] font-mono tracking-[0.3em] uppercase text-[9px] mb-6 lg:mb-8 font-bold"
            >
              The Methodology
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.9] tracking-tighter mb-8 lg:mb-10"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              WE DESIGN<br />
              PERCEPTION.<br />
              <span className="text-white/20">FRAME BY</span><br />
              <span className="text-white/20">FRAME.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/40 text-[12px] lg:text-[14px] font-medium tracking-wide max-w-[280px]"
              style={{ lineHeight: 1.6 }}
            >
              We don&apos;t guess. We understand, plan, and execute with intent.
            </motion.p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="hidden lg:flex items-center gap-6 mt-16 lg:mt-auto relative z-20">
            <StepNumberDisplay progress={scrollYProgress} />
            <div className="w-24 h-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[#8B0016] origin-left shadow-[0_0_10px_rgba(139,0,22,0.8)]"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="text-white/20 font-mono text-[10px] tracking-[0.2em]">
              0{STEPS.length}
            </span>
          </div>
        </div>

        {/* Right Column: Scrollable Steps */}
        <div className="lg:w-[58.333333%] relative bg-transparent">
          <div className="py-[30vh] flex flex-col gap-32">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0.2, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px", once: false }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center px-6 md:px-12 lg:px-24 group relative"
              >
                {/* Active Glow Effect */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-32 bg-[#8B0016]/5 blur-[80px] rounded-full pointer-events-none mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex flex-col max-w-[550px] relative z-10">
                  <span className="text-[#8B0016] font-mono text-[11px] tracking-[0.3em] font-bold mb-6 transition-transform duration-500 group-hover:-translate-y-1">
                    {step.num}
                  </span>
                  <h3
                    className="text-[#8B0016] font-black tracking-tighter mb-6 transition-all duration-500 group-hover:text-white"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1 }}
                  >
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="text-white/40 text-[16px] md:text-[18px] font-light leading-[1.8] mb-12 md:mb-16 transition-colors duration-500 group-hover:text-white/80">
                    {step.desc}
                  </p>
                </div>
                {index !== STEPS.length - 1 && (
                  <div className="h-px w-full bg-white/5 transition-colors duration-500 group-hover:bg-[#8B0016]/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE (Old Vertical Line Expansion) */}
      <div className="lg:hidden flex flex-col px-6 py-24">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[#8B0016] font-mono tracking-[0.4em] uppercase text-[10px] mb-6 font-bold"
        >
          The Methodology
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-white font-black mb-16"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}
        >
          WE DESIGN PERCEPTION.<br />
          <span className="text-white/25">FRAME BY FRAME.</span>
        </motion.h2>

        <div className="relative border-l border-white/10 ml-4 flex flex-col pt-4 pb-12">
          {STEPS.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div 
                initial="initial"
                whileInView="active"
                viewport={{ once: false, amount: 0.5 }}
                className="group relative pl-8 py-10 -ml-[1px] border-b border-white/[0.03] last:border-0 rounded-r-3xl"
              >
                {/* Hover/Scroll Indicator Line */}
                <motion.div 
                  variants={{
                    initial: { scaleY: 0 },
                    active: { scaleY: 1, boxShadow: "0 0 20px #8B0016" }
                  }}
                  className="absolute top-0 bottom-0 left-0 w-[2px] bg-[#8B0016] origin-top transition-all duration-500 ease-out z-10" 
                />
                
                {/* Small Notch */}
                <motion.div 
                  variants={{
                    initial: { width: "1rem", backgroundColor: "rgba(255,255,255,0.2)" },
                    active: { width: "2rem", backgroundColor: "#8B0016" }
                  }}
                  className="absolute top-[4rem] left-0 h-[1px] transition-all duration-500" 
                />

                <div className="flex flex-col gap-4 items-start">
                  {/* Number */}
                  <div className="shrink-0 w-16">
                    <motion.span 
                      variants={{
                        initial: { color: "#8B0016" },
                        active: { color: "#FA002A" }
                      }}
                      className="font-mono font-bold text-2xl tracking-widest transition-colors duration-500 block"
                    >
                      {step.num}
                    </motion.span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4 max-w-[500px]">
                    <motion.h3
                      variants={{
                        initial: { color: "rgba(255,255,255,0.8)" },
                        active: { color: "rgba(255,255,255,1)" }
                      }}
                      className="font-black tracking-tight transition-colors duration-500"
                      style={{ fontSize: "2rem", lineHeight: 1, letterSpacing: "-0.03em" }}
                    >
                      {step.title.toUpperCase()}
                    </motion.h3>
                    <motion.p 
                      variants={{
                        initial: { color: "rgba(255,255,255,0.3)" },
                        active: { color: "rgba(255,255,255,0.7)" }
                      }}
                      className="text-[15px] font-light leading-[1.7] transition-colors duration-500"
                    >
                      {step.desc}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
