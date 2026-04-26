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
    <span className="text-[#8B0016] font-mono text-[10px] font-bold tracking-[0.2em] w-4">
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

  const leftParallaxY = useTransform(scrollYProgress, [0, 1], [0, 0]); // Keep it stable during stick

  return (
    <section ref={containerRef} className="relative w-full bg-black">
      {/* DESKTOP (Split Sticky Scroll) */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full items-start relative z-10">
        
        {/* Left Column: Sticky Dark Header */}
        <div className="lg:w-[41.666667%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between px-8 md:px-14 lg:px-20 xl:px-24 py-20 lg:pt-24 lg:pb-24 z-10 bg-black">
          <motion.div style={{ y: leftParallaxY }} className="max-w-md mt-0 flex flex-col relative h-full justify-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-[#8B0016] font-black tracking-tighter uppercase text-xl md:text-2xl mb-6 lg:mb-8"
            >
              Our Process
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
              <span className="text-white/20">STEP BY</span><br />
              <span className="text-white/20">STEP.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/40 text-[12px] lg:text-[14px] font-medium tracking-wide max-w-[280px]"
              style={{ lineHeight: 1.6 }}
            >
              A clear, structured approach to building how your brand is seen.
            </motion.p>

            {/* Progress Indicator inside the center-justified block */}
            <div className="hidden lg:flex items-center gap-6 mt-16 lg:mt-24 relative z-20">
              <StepNumberDisplay progress={scrollYProgress} />
              <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-[#8B0016] origin-left"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
              <span className="text-white/20 font-mono text-[10px] tracking-[0.2em]">
                0{STEPS.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: White Background Steps (Sticky Scroll Momentum) */}
        <div className="lg:w-[58.333333%] relative bg-white">
          <div className="flex flex-col">
            {STEPS.map((step, index) => (
              <div key={step.num} className="min-h-screen flex items-center justify-center px-8 md:px-14 lg:px-20 xl:px-24">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-10% 0px", once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col max-w-[550px] relative z-10"
                >
                  <span className="text-[#8B0016] font-mono text-[11px] tracking-[0.3em] font-bold mb-6">
                    {step.num}
                  </span>
                  <h3
                    className="text-black font-black tracking-tighter mb-6 transition-all duration-500"
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

      {/* MOBILE (Hybrid List) */}
      <div className="lg:hidden flex flex-col bg-black">
        <div className="px-8 py-24 border-b border-white/5">
          <motion.p className="text-[#8B0016] font-black tracking-tighter uppercase text-xl mb-6">Our Process</motion.p>
          <h2 className="text-white font-black" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
            WE DESIGN PERCEPTION.<br /><span className="text-white/25">STEP BY STEP.</span>
          </h2>
        </div>
        <div className="bg-white px-8 py-24 flex flex-col gap-16">
          {STEPS.map((step, i) => (
            <motion.div key={i} className="flex flex-col gap-4">
              <span className="text-[#8B0016] font-mono text-xs font-bold tracking-widest">{step.num}</span>
              <h3 className="text-black font-black text-3xl tracking-tighter leading-none">{step.title.toUpperCase()}</h3>
              <p className="text-black/40 text-base font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
