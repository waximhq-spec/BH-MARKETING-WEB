"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "How does restaurant videography help my business?",
    answer: (
      <>
        Cinematic video content increases engagement on social media, showcases your food in the best light, and drives more footfall to your restaurant or café in Bahrain. It turns digital views into physical bookings by building desire and trust. Learn more about our specialized{" "}
        <Link href="/restaurant-videography-bahrain" className="text-[#B11226] hover:underline">
          Restaurant Videography in Bahrain
        </Link>.
      </>
    )
  },

  {
    question: "What is included in a food videography shoot?",
    answer: "We provide full-scale production including creative direction, high-end filming, lighting, and professional post-production (precision editing, cinematic color grading, and sound design)."
  },
  {
    question: "Do you offer social media video production for cafés?",
    answer: "Yes, we specialize in high-retention social media reels and short-form ads tailored for platforms like Instagram and TikTok, specifically optimized for the Bahraini market."
  },
  {
    question: "Where are you based?",
    answer: "We are a creative video production agency based in the heart of Manama, serving clients across the entire Kingdom of Bahrain."
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: React.ReactNode; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <div className="flex items-start gap-6">
          <span className="text-[#B11226] font-mono text-[10px] mt-1.5 font-bold">0{index + 1}</span>
          <h3 className="text-black font-bold text-xl md:text-2xl tracking-tight group-hover:text-[#B11226] transition-colors duration-300">
            {question}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-2xl font-light text-black/20 group-hover:text-[#B11226] transition-colors"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-12 md:pl-16 pr-12">
              <p className="text-black/50 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section data-theme="light" className="py-32 md:py-48 bg-white text-black border-t border-black/5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-[#B11226]" />
              <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">Common Questions</p>
            </div>
            <h2 className="text-black font-black leading-[0.9] tracking-tighter mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}>
              FREQUENTLY<br /><span className="text-black/10">ASKED.</span>
            </h2>
            <p className="text-black/40 text-lg font-light leading-relaxed max-w-xs">
              Everything you need to know about starting your cinematic shoot in Bahrain.
            </p>
          </div>

          {/* Right Column: Accordions */}
          <div className="lg:col-span-7 border-t border-black/10">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} index={i} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
