"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Understand Your Brand",
    desc: "We learn what makes your audience connect with you.",
  },
  {
    num: "02",
    title: "Plan The Strategy",
    desc: "We build a creative roadmap to elevate your digital presence.",
  },
  {
    num: "03",
    title: "Execute The Creative",
    desc: "We produce premium visual content designed to convert.",
  },
  {
    num: "04",
    title: "Scale Your Growth",
    desc: "We manage campaigns to ensure your brand reaches new heights.",
  },
];

// Highlight the word "customers" with the brand accent color
function HighlightDesc({ text }: { text: string }) {
  const parts = text.split(/(brand|growth|convert)/gi);
  return (
    <>
      {parts.map((part, i) =>
        /(brand|growth|convert)/i.test(part) ? (
          <span key={i} className="text-[#9A0E1F] font-medium">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
}

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
    <span className="text-[#9A0E1F] font-mono text-[10px] font-bold tracking-[0.2em] w-4">
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
    <section id="process" ref={containerRef} data-theme="split" className="relative w-full bg-black" style={{ position: "relative" }}>
      {/* DESKTOP (Split Sticky Scroll) */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full items-start relative z-10">
        
        {/* Left Column: Sticky Dark Header */}
        <div className="lg:w-[41.666667%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between py-20 lg:pt-32 lg:pb-24 z-10 bg-black border-r border-white/10">
          <motion.div style={{ y: leftParallaxY }} className="flex flex-col h-full justify-between w-full">
            {/* INNER CONTENT WRAPPER - TO ALIGN WITH CONTAINER */}
            <div className="container !max-w-none w-full flex flex-col justify-between h-full">
               <div>
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-6 lg:mb-10"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_10px_#9A0E1F]" />
                    <span className="text-white font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Our Process</span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 1, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-black tracking-tighter mb-4 lg:mb-6 uppercase pr-8"
                    style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                  >
                    WE SCALE YOUR<br />
                    BRAND.
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-white/70 font-mono tracking-[0.4em] uppercase text-[10px] md:text-[12px] font-medium mb-12"
                  >
                    Step by step.
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-white/40 text-[12px] lg:text-[14px] font-medium tracking-wide max-w-[280px]"
                    style={{ lineHeight: 1.6 }}
                  >
                    A strategic four-step process to elevate your brand presence and drive real engagement.
                  </motion.p>
               </div>
              {/* Progress Indicator */}
              <div className="hidden lg:flex items-center gap-6 mt-16 relative z-20">
                <StepNumberDisplay progress={scrollYProgress} />
                <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-[#9A0E1F] origin-left"
                    style={{ scaleX: scrollYProgress }}
                  />
                </div>
                <span className="text-white/20 font-mono text-[10px] tracking-[0.2em]">
                  0{STEPS.length}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Right Column: White Background Steps */}
        <div className="lg:w-[58.333333%] relative bg-white">
          {/* Continuous Journey Line */}
          <div className="absolute left-[calc(1.5rem+6px)] md:left-[calc(3.5rem+6px)] lg:left-[calc(5rem+6px)] xl:left-[calc(6rem+6px)] top-[150px] bottom-[200px] w-px border-l border-dashed border-[#9A0E1F]/20 hidden lg:block z-0" />
          
          <div className="flex flex-col relative z-10">
            {STEPS.map((step, index) => (
              <div 
                key={step.num} 
                className={`flex flex-col items-start 
                  ${index === 0 ? "pt-[60vh] lg:pt-[50vh]" : "pt-40 lg:pt-48"}
                  ${index === STEPS.length - 1 ? "pb-[calc(100vh-24rem)] lg:pb-[calc(100vh-28rem)]" : "pb-40 lg:pb-48"}`}
              >
                <motion.div
                  initial={{ opacity: 1, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-10% 0px", once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex flex-col relative z-10"
                >
                  {/* INNER CONTENT WRAPPER */}
                  <div className="container !max-w-none w-full flex flex-col">
                    {/* Step number */}
                    <div className="relative inline-flex mb-8">
                      <span className="text-[#9A0E1F] font-mono text-[11px] tracking-[0.3em] font-bold relative z-10 bg-white py-2 pr-4">
                        {step.num}
                      </span>
                    </div>
                    {/* Heading */}
                    <h3
                      className="text-black font-black tracking-tighter mb-10"
                      style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                    >
                      {step.title.toUpperCase()}
                    </h3>
                    {/* Description with keyword highlight */}
                    <p className="text-black/80 text-[17px] md:text-[19px] font-light leading-[1.75] mb-14 max-w-lg">
                      <HighlightDesc text={step.desc} />
                    </p>
                    {/* Animated divider */}
                    <motion.div
                      className="h-px bg-[#9A0E1F]/20 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ margin: "-15% 0px", once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      style={{ width: "80px" }}
                    />
                  </div>
                </motion.div>

                {/* Subtle Divider between steps */}
                {index !== STEPS.length - 1 && (
                  <div className="container !max-w-none w-full mt-auto">
                    <div className="h-px w-full bg-black/[0.06]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* MOBILE (PRO UI/UX - Light Premium Timeline) */}
      <div className="lg:hidden flex flex-col">
        
        {/* Header - Light */}
        <div className="bg-white px-6 py-24 flex flex-col items-start relative border-b border-black/5">
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/5 border border-[#9A0E1F]/20 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_10px_#9A0E1F]" />
            <span className="text-[#9A0E1F] font-mono tracking-[0.3em] uppercase text-[10px] md:text-[12px] font-bold">Our Process</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-black font-black tracking-tighter mb-4 uppercase"
            style={{ fontSize: "clamp(2.2rem, 9vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
          >
            WE SCALE YOUR<br />
            BRAND.
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-black/40 font-mono tracking-[0.4em] uppercase text-[10px] md:text-[11px] font-bold mb-8"
          >
            Step by step.
          </motion.div>
          
          <motion.p
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-black/60 text-[14px] md:text-[15px] font-medium tracking-wide max-w-[280px]"
            style={{ lineHeight: 1.6 }}
          >
            A strategic four-step process to elevate your brand presence and drive real engagement.
          </motion.p>
        </div>

        {/* Steps - Light Timeline */}
        <div className="bg-[#fafafa] relative flex flex-col py-16 md:py-24 overflow-hidden">
          {/* Vertical dashed line for timeline */}
          <div className="absolute left-[44px] md:left-[48px] top-24 bottom-24 w-px border-l border-dashed border-black/10 z-0" />
          
          {STEPS.map((step, index) => (
            <div key={step.num} className="flex flex-col relative z-10 px-6 py-6 md:px-8 group">
              <motion.div
                initial={{ opacity: 1, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-10% 0px", once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex gap-6 md:gap-8 items-start relative"
              >
                {/* Step Number Badge */}
                <div className="relative z-10 shrink-0 bg-[#fafafa] py-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-black/5 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-[#9A0E1F]/30 group-hover:shadow-md">
                    <span className="text-[#9A0E1F] font-mono text-[10px] md:text-[11px] font-bold">
                      {step.num}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col pt-1 pb-8 md:pb-10 w-full relative">
                  <h3 className="text-black font-black tracking-tighter mb-3 text-2xl md:text-3xl uppercase leading-[1.05]">
                    {step.title}
                  </h3>
                  
                  <p className="text-black/60 text-[14px] md:text-[16px] leading-[1.7] md:leading-[1.75] font-light max-w-sm">
                    <HighlightDesc text={step.desc} />
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
