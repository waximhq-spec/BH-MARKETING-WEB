"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Strategy",
    desc: "Every decision is rooted in your business objectives. We don't design for aesthetics alone; we design for conversion, engagement, and growth.",
  },
  {
    num: "02",
    title: "Production",
    desc: "We strip away the unnecessary, leaving only what drives impact. Clean lines, deliberate spacing, and intuitive user journeys.",
  },
  {
    num: "03",
    title: "Post-Production",
    desc: "Applying high-end visual standards to every pixel. Smooth motion, refined typography, and pixel-perfect layouts.",
  },
  {
    num: "04",
    title: "Delivery",
    desc: "Built on modern, robust architecture. Ready to handle traffic spikes and evolve seamlessly as your brand scales.",
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
    offset: ["start center", "end center"],
  });

  return (
    <section ref={containerRef} className="relative bg-[#000000]">
      {/* DESKTOP (Split Sticky Scroll) */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full items-start">
        
        {/* Left Column: Sticky Editorial Header */}
        <div 
          className="lg:w-[41.666667%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between px-6 md:px-12 lg:px-20 py-20 lg:pt-24 lg:pb-24 z-10 lg:border-r border-white/5 bg-[#000000]"
        >
          <div className="max-w-xl mt-6 lg:mt-12">

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#8B0016] font-mono tracking-[0.25em] uppercase text-[9px] mb-8 lg:mb-12 font-bold"
            >
              The Methodology
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-black leading-[0.92] tracking-tight text-white mb-6 lg:mb-8"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.2rem)", letterSpacing: "-0.04em" }}
            >
              WE DON&apos;T<br />
              <span className="text-white/25">DECORATE</span><br />
              <span className="text-white/25">BRANDS.</span><br />
              WE BUILD THEM TO<br />
              LAST.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/40 text-[12px] lg:text-[13px] font-medium tracking-wide"
            >
              Cinematic. More Intentional.
            </motion.p>
          </div>

          {/* Progress Indicator */}
          <div className="hidden lg:flex items-center gap-6 mt-16 lg:mt-auto">
            <StepNumberDisplay progress={scrollYProgress} />
            <div className="w-16 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[#8B0016] origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="text-white/30 font-mono text-[10px] tracking-[0.2em]">
              0{STEPS.length}
            </span>
          </div>
        </div>

        {/* Right Column: Scrollable Steps */}
        <div className="lg:w-[58.333333%] relative bg-[#000000]">
          <div className="py-[15vh] lg:py-[20vh] flex flex-col gap-12 md:gap-16">
            {STEPS.map((step, index) => (
              <div
                key={step.num}
                className="flex flex-col justify-center px-6 md:px-12 lg:px-20"
              >
                <div className="flex flex-col max-w-[500px]">
                  <span className="text-[#8B0016] font-mono text-[10px] tracking-[0.2em] font-bold mb-4">
                    {step.num}
                  </span>
                  <h3
                    className="text-[#8B0016] font-bold tracking-tight mb-4"
                    style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                  >
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="text-white/50 text-[15px] md:text-[17px] font-light leading-[1.7] mb-12 md:mb-16">
                    {step.desc}
                  </p>
                </div>
                {index !== STEPS.length - 1 && (
                  <div className="h-px w-full bg-white/5" />
                )}
              </div>
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
          THE PROCESS.
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
