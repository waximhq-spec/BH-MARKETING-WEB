"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Understand Your Brand",
    desc: "We learn before we create. We dive into your business, audience, and goals to understand what makes you different and how your brand should feel. No guessing — only clarity.",
  },
  {
    num: "02",
    title: "Plan the Vision",
    desc: "We design how you should be seen. We define the visual direction, messaging, and content style so everything looks intentional, premium, and aligned.",
  },
  {
    num: "03",
    title: "Create Cinematic Content",
    desc: "We bring the vision to life. We produce high-end visuals that elevate your brand. Every frame is crafted to be sharp, consistent, and scroll-stopping.",
  },
  {
    num: "04",
    title: "Refine & Scale",
    desc: "We make your brand consistent everywhere. We align and optimize your content across platforms so your brand feels cohesive, professional, and trustworthy.",
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
    <span className="text-[#B11226] font-mono text-[10px] font-bold tracking-[0.2em] w-4">
      0{activeStep + 1}
    </span>
  );
}

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const leftParallaxY = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <section ref={containerRef} data-theme="split" className="relative w-full bg-black">
      {/* DESKTOP (Split Sticky Scroll) */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full items-start relative z-10">
        
        {/* Left Column: Sticky Dark Header */}
        <div className="lg:w-[41.666667%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between px-8 md:px-14 lg:px-20 xl:px-24 py-20 lg:pt-32 lg:pb-24 z-10 bg-black border-r border-white/10">
          <motion.div style={{ y: leftParallaxY }} className="max-w-md mt-0 flex flex-col relative">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#B11226] font-black tracking-tighter uppercase text-xl md:text-2xl mb-6 lg:mb-10"
            >
              Our Process
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white font-black leading-[0.9] tracking-tighter mb-8 lg:mb-12"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              WE DESIGN<br />
              PERCEPTION.<br />
              <span className="text-white/20">STEP BY</span><br />
              <span className="text-white/20">STEP.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-[12px] lg:text-[14px] font-medium tracking-wide max-w-[280px]"
              style={{ lineHeight: 1.6 }}
            >
              A clear, structured approach to building how your brand is seen.
            </motion.p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="hidden lg:flex items-center gap-6 mt-16 lg:mt-auto relative z-20">
            <StepNumberDisplay progress={scrollYProgress} />
            <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-[#B11226] origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="text-white/20 font-mono text-[10px] tracking-[0.2em]">
              0{STEPS.length}
            </span>
          </div>
        </div>

        {/* Right Column: White Background Steps */}
        <div className="lg:w-[58.333333%] relative bg-white">
          <div className="flex flex-col">
            {STEPS.map((step, index) => (
              <div key={step.num} className="min-h-[70vh] flex flex-col items-start justify-start px-8 md:px-14 lg:px-20 xl:px-24 pt-32 lg:pt-[140px] pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-10% 0px", once: true }}
                  className="flex flex-col max-w-[550px] relative z-10"
                >
                  <span className="text-[#B11226] font-mono text-[11px] tracking-[0.3em] font-bold mb-6">
                    {step.num}
                  </span>
                  <h3
                    className="text-black font-black tracking-tighter mb-8 transition-all duration-500"
                    style={{ fontSize: "clamp(2rem, 3.5vw, 3.8rem)", lineHeight: 1 }}
                  >
                    {step.title.toUpperCase()}
                  </h3>
                  <p className="text-black/40 text-[16px] md:text-[20px] font-light leading-[1.8] mb-12 transition-colors duration-500">
                    {step.desc}
                  </p>
                  <div className="h-px w-24 bg-black/5" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE (PRO UI/UX - Version 2.1) */}
      <div className="lg:hidden flex flex-col bg-white">
        <div className="bg-black px-6 py-24 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(177,18,38,0.1)_0%,transparent_70%)] pointer-events-none" />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#B11226] font-mono text-[10px] uppercase tracking-[0.5em] mb-6 font-black"
          >
            Our Methodology
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white font-black leading-none tracking-tighter text-5xl mb-4"
          >
            WE DESIGN<br />PERCEPTION.
          </motion.h2>
          <p className="text-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">
            Step by Step.
          </p>
        </div>

        <div className="px-6 py-20 flex flex-col gap-8 bg-[#FAFAFA]">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white border border-black/5 p-8 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col gap-6 relative group"
            >
              <div className="absolute top-[-20px] right-[-10px] text-[100px] font-black text-black/[0.03] leading-none select-none pointer-events-none group-hover:text-[#B11226]/[0.05] transition-colors duration-500">
                {step.num}
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[#B11226] font-mono text-[10px] font-bold tracking-[0.3em]">
                  PHASE {step.num}
                </span>
                <h3 className="text-black font-black text-2xl tracking-tighter leading-tight uppercase">
                  {step.title}
                </h3>
              </div>

              <p className="text-black/50 text-[14px] font-light leading-relaxed relative z-10">
                {step.desc}
              </p>

              <div className="w-full h-px bg-black/[0.05] mt-2" />
            </motion.div>
          ))}
        </div>

        <div className="py-12 flex justify-center items-center gap-4 bg-white">
          <div className="h-px w-8 bg-black/10" />
          <p className="text-black/20 font-mono text-[9px] uppercase tracking-[0.4em]">Cinmach Productions</p>
          <div className="h-px w-8 bg-black/10" />
        </div>
      </div>
    </section>
  );
}
