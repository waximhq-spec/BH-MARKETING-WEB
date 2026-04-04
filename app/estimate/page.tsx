"use client";

import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Select Service Architecture",
    options: [
      { id: "single", label: "Single Service", desc: "Targeted dynamic capture for specific deliverables." },
      { id: "full", label: "Full Campaign", desc: "End-to-end cinematic production & immersive UI branding." }
    ]
  },
  {
    id: 2,
    title: "Define Property Scale",
    options: [
      { id: "villa", label: "Luxury Villa", desc: "Private multi-story residential estates and isolated compounds." },
      { id: "tower", label: "Commercial Tower", desc: "High-rise structural captures and penthouse arrays." },
      { id: "interior", label: "Interior Design", desc: "Precision lighting profiles and highly detailed spatial mapping." }
    ]
  },
  {
    id: 3,
    title: "Geographic Target",
    options: [
      { id: "manama", label: "Manama Center", desc: "Bahrain Financial Harbour, Seef, and Diplomatic Area." },
      { id: "muharraq", label: "Diyar Al Muharraq", desc: "Amwaj Islands, Diyar, and coastal expansion plots." },
      { id: "southern", label: "Southern Governorate", desc: "Awali, Zallaq, and luxury desert estates." }
    ]
  }
];

export default function Estimate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<Record<number, string>>({});

  const handleSelect = (optionId: string) => {
    setSelections(prev => ({ ...prev, [currentStep]: optionId }));
    
    if (currentStep < steps.length) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setCurrentStep(4);
      }, 500);
    }
  };

  const currentStepData = steps.find(s => s.id === currentStep);
  const progress = (Math.min(currentStep, steps.length) / steps.length) * 100;

  return (
    <main className="w-full relative px-6 md:px-12 lg:px-16 z-10 mx-auto min-h-screen pb-32 flex flex-col">
      <Navbar />

      <section className="pt-48 pb-12 border-b border-white/5" >
         <AnimatedText text="THE QUOTE" className="text-[clamp(4rem,14vw,16rem)] leading-[0.8] font-bold tracking-[-0.05em] uppercase text-white" />
         <p className="mt-8 tracking-[0.3em] uppercase text-[10px] font-bold text-white/50">Architecting Your Digital Twin</p>
      </section>

      {/* Progress Bar */}
      <div className="w-full h-[2px] bg-white/5 mt-16 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-gold-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      <section className="flex-grow w-full relative mt-24 max-w-5xl">
        <AnimatePresence mode="wait">
          {currentStep < 4 ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col w-full"
            >
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-[-0.04em] mb-12 text-white">
                <span className="text-gold-500 mr-6">0{currentStep}</span>
                {currentStepData?.title}
              </h2>

              <div className="flex flex-col gap-6">
                {currentStepData?.options.map(opt => {
                  const isSelected = selections[currentStep] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className={`group relative flex flex-col text-left p-8 md:p-12 w-full rounded-[2rem] border transition-all duration-500 ${
                        isSelected 
                          ? "border-gold-500 bg-[#c5a059]/10 shadow-[0_0_60px_rgba(197,160,89,0.15)]" 
                          : "border-white/10 hover:border-white/30 bg-[#111] hover:bg-[#151515]"
                      }`}
                    >
                      <h3 className={`text-2xl md:text-4xl font-bold tracking-[-0.03em] uppercase mb-4 transition-colors ${isSelected ? "text-gold-500" : "text-white"}`}>
                        {opt.label}
                      </h3>
                      <p className="text-[#a0a0a0] font-light text-sm md:text-lg tracking-wide max-w-2xl">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start pt-12"
            >
              <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-bold uppercase tracking-[-0.05em] text-white leading-[0.85] mb-12">
                Parameters <span className="text-gold-500"><br/>Locked</span>
              </h2>
              <p className="text-xl md:text-2xl text-[#a0a0a0] font-light mb-16 tracking-wide max-w-3xl leading-relaxed">
                Our operations team has secured your architecture payload. We will coordinate a physical reconnaissance protocol shortly.
              </p>
              
              <div className="flex flex-col gap-8 w-full max-w-lg bg-[#111] p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 font-bold">Service</span>
                  <span className="font-bold text-gold-500 uppercase tracking-tighter text-lg md:text-xl text-right">
                    {steps[0].options.find(o => o.id === selections[1])?.label}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 font-bold">Scale</span>
                  <span className="font-bold text-gold-500 uppercase tracking-tighter text-lg md:text-xl text-right">
                    {steps[1].options.find(o => o.id === selections[2])?.label}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 font-bold">Target</span>
                  <span className="font-bold text-gold-500 uppercase tracking-tighter text-lg md:text-xl text-right">
                    {steps[2].options.find(o => o.id === selections[3])?.label}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
