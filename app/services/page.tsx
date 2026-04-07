"use client";

import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";
import { motion } from "framer-motion";

const services = [
  {
    title: "Brand Identity & Strategy",
    description: "We craft brands from the ground up — defining how they look, feel, and communicate with the world.",
    includes: [
      "Brand positioning",
      "Visual identity design",
      "Creative direction",
      "Brand guidelines"
    ]
  },
  {
    title: "Cinematic Content Production",
    description: "High-end visuals designed to elevate your brand presence and create impact.",
    includes: [
      "Brand films",
      "Product cinematics",
      "Commercial shoots",
      "Lifestyle visuals"
    ]
  },
  {
    title: "Visual Storytelling",
    description: "We turn ideas into compelling narratives that connect with your audience.",
    includes: [
      "Campaign storytelling",
      "Concept development",
      "Narrative-driven shoots",
      "Storyboarding"
    ]
  },
  {
    title: "Post-Production & Editing",
    description: "Precision editing that brings your visuals to life with a polished, cinematic finish.",
    includes: [
      "Video editing",
      "Color grading",
      "Sound design",
      "Motion graphics"
    ]
  },
  {
    title: "Social Media Content",
    description: "Content built for attention, engagement, and consistent brand growth.",
    includes: [
      "Short-form videos (Reels)",
      "Platform-specific edits",
      "Content planning",
      "Trend-based creatives"
    ]
  },
  {
    title: "Creative Direction",
    description: "We lead the vision behind every project to ensure a cohesive and premium outcome.",
    includes: [
      "Shoot planning",
      "Moodboards",
      "Art direction",
      "On-set supervision"
    ]
  },
  {
    title: "Brand Launch Packages",
    description: "Everything you need to launch or relaunch your brand with impact.",
    isSpecial: true,
    includes: [
      "Full brand identity",
      "Launch campaign visuals",
      "Content bundle for social media",
      "Marketing-ready assets"
    ]
  }
];

export default function Services() {
  return (
    <main className="w-full relative px-6 md:px-12 lg:px-16 z-10 mx-auto bg-[#0b0b0b] min-h-screen pb-32 font-sans">
      <Navbar />

      {/* Header Section */}
      <section className="pt-48 pb-24">
        <div className="max-w-5xl">
          <AnimatedText 
            text="OUR SERVICES" 
            className="text-[clamp(3.5rem,12vw,14rem)] leading-[0.8] font-bold tracking-[-0.05em] uppercase text-white mb-8" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-2xl text-[#a0a0a0] font-light max-w-2xl tracking-wide leading-relaxed uppercase"
          >
            We build brands through strategy, visuals, and storytelling.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 border-t border-white/10 pt-24">
        {services.map((service, idx) => (
          <motion.div 
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`flex flex-col ${service.isSpecial ? "lg:col-span-3 bg-white/5 p-12 rounded-3xl border border-white/10" : ""}`}
          >
            <div className="flex flex-col h-full">
              <span className="text-gold-500 text-[10px] tracking-[0.3em] font-bold uppercase mb-4">
                Service {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-6 leading-none">
                {service.title}
              </h3>
              <p className="text-[#a0a0a0] font-light leading-relaxed mb-8 max-w-sm">
                {service.description}
              </p>
              
              <div className="mt-auto">
                <p className="text-white/40 text-[10px] tracking-[0.2em] font-bold uppercase mb-4">Includes</p>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-center text-sm text-[#e5e5e5] font-light">
                      <span className="w-1 h-1 rounded-full bg-gold-500/60 mr-3 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Final CTA or Footer Spacer */}
      <section className="mt-48 pt-24 border-t border-white/5 text-center">
         <p className="text-sm tracking-[0.4em] uppercase text-white/20">Experience the 10 Bit standard.</p>
      </section>
    </main>
  );
}
