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
      <div className="flex flex-col lg:flex-row w-full items-start">
        
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
    </section>
  );
}
