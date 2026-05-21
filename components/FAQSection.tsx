"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "How does cinematic content help my brand?",
    answer: (
      <>
        High-end visual content elevates your brand&apos;s perceived value, increases engagement, and drives targeted conversions. It turns digital views into real business growth. Learn more about our{" "}
        <Link href="/services" className="text-[#9A0E1F] hover:underline">
          Creative Services
        </Link>.
      </>
    )
  },
  {
    question: "What is included in a content production project?",
    answer: "We handle everything from start to finish: creative concept development, pre-production planning, high-end filming, and professional post-production including cinematic editing, color grading, and sound design."
  },
  {
    question: "Can you help with my company's branding and logo design?",
    answer: "Absolutely. We offer complete Brand Identity design services, including custom logo design, visual positioning, curated color palettes, typography, and professional brand guidelines to make your business memorable."
  },
  {
    question: "Do you produce content optimized for social media?",
    answer: "Yes, we produce high-end, short-form cinematic video reels and photography specifically formatted and optimized to stand out and capture attention on modern digital platforms like Instagram and TikTok."
  },
  {
    question: "Where are you based?",
    answer: "We are a creative marketing and production agency located in Manama, partnering with ambitious brands across Bahrain and the GCC."
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: React.ReactNode; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 md:py-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-start gap-4">
          <span className="text-[#9A0E1F] font-mono text-[10px] mt-1.5 font-bold">0{index + 1}</span>
          <h3 className="text-black font-bold text-lg md:text-xl tracking-tight group-hover:text-[#9A0E1F] transition-colors duration-300">
            {question}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-xl font-light text-black/20 group-hover:text-[#9A0E1F] transition-colors"
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
            <div className="pb-5 pl-10 md:pl-12 pr-6">
              <p className="text-black/50 text-[14px] md:text-[15px] font-light leading-relaxed max-w-2xl">
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
    <section data-theme="light" className="py-16 md:py-24 bg-white text-black border-t border-black/20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                <span className="text-[#9A0E1F] font-mono tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-bold">Common Questions</span>
              </div>
            </div>
            <h2 className="text-[#050505] font-black leading-[0.9] tracking-tighter mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}>
              FREQUENTLY<br /><span className="text-black/10">ASKED.</span>
            </h2>
            <p className="text-black/40 text-lg font-light leading-relaxed max-w-xs">
              Everything you need to know about working with us in Bahrain.
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
