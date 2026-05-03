"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue, useTransform } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Understand Your Customers",
    desc: "We learn what makes people choose you and what brings real demand.",
  },
  {
    num: "02",
    title: "Plan What To Shoot",
    desc: "We plan exactly what to shoot so your content looks clear and effective.",
  },
  {
    num: "03",
    title: "Create Content That Sells",
    desc: "We create content that grabs attention and drives people to visit or buy.",
  },
  {
    num: "04",
    title: "Improve & Grow",
    desc: "We refine your content so it stays consistent and keeps bringing customers.",
  },
];

// Highlight the word "customers" with the brand accent color
function HighlightDesc({ text }: { text: string }) {
  const parts = text.split(/(customers)/gi);
  return (
    <>
      {parts.map((part, i) =>
        /customers/i.test(part) ? (
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
    <section ref={containerRef} data-theme="split" className="relative w-full bg-black">
      {/* DESKTOP (Split Sticky Scroll) */}
      <div className="hidden lg:flex flex-col lg:flex-row w-full items-start relative z-10">
        
        {/* Left Column: Sticky Dark Header */}
        <div className="lg:w-[41.666667%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between py-20 lg:pt-32 lg:pb-24 z-10 bg-black border-r border-white/10">
          <motion.div style={{ y: leftParallaxY }} className="flex flex-col h-full justify-between w-full">
            {/* INNER CONTENT WRAPPER - TO ALIGN WITH CONTAINER */}
            <div className="container !max-w-none w-full flex flex-col justify-between h-full">
               <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/15 border border-[#9A0E1F]/30 rounded-full mb-6 lg:mb-10"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse shadow-[0_0_10px_#9A0E1F]" />
                    <span className="text-white font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Our Process</span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 font-black tracking-tighter mb-4 lg:mb-6 uppercase pr-8"
                    style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.8rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                  >
                    WE GET YOU<br />
                    MORE CUSTOMERS.
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    viewport={{ once: true }}
                    className="text-white/70 font-mono tracking-[0.4em] uppercase text-[10px] md:text-[12px] font-medium mb-12"
                  >
                    Step by step.
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-white/40 text-[12px] lg:text-[14px] font-medium tracking-wide max-w-[280px]"
                    style={{ lineHeight: 1.6 }}
                  >
                    A clear, structured approach to building how your brand is seen.
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
              <div key={step.num} className="min-h-[70vh] flex flex-col items-start justify-start pt-32 lg:pt-[140px] pb-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
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
            className="text-[#9A0E1F] font-mono text-[10px] uppercase tracking-[0.5em] mb-6 font-black"
          >
            Our Methodology
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white font-black leading-[1.1] tracking-tighter text-4xl md:text-5xl mb-4 uppercase"
          >
            WE GET YOU<br />MORE CUSTOMERS.
          </motion.h2>
          <p className="text-white/70 text-[9px] font-mono uppercase tracking-[0.4em]">
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
              className="bg-white border border-black/5 p-8 rounded-sm shadow-[0_10px_30_rgba(0,0,0,0.02)] flex flex-col gap-6 relative group"
            >
              <div className="absolute top-[-20px] right-[-10px] text-[100px] font-black text-black/[0.03] leading-none select-none pointer-events-none group-hover:text-[#9A0E1F]/[0.05] transition-colors duration-500">
                {step.num}
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[#9A0E1F] font-mono text-[10px] font-bold tracking-[0.3em]">
                  PHASE {step.num}
                </span>
                <h3 className="text-black font-black text-2xl tracking-tighter leading-tight uppercase">
                  {step.title}
                </h3>
              </div>

              <p className="text-black/80 text-[14px] font-light leading-relaxed relative z-10">
                <HighlightDesc text={step.desc} />
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
