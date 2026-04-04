"use client";

import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Cinematic Production",
    desc: "Experience 10-bit color depth and dynamic FPV drone footage that captures architectural scale in breathless parity. Unmatched visual precision tailored for premium developers.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    colSpan: "md:col-span-12 lg:col-span-8",
    height: "h-[65vh]"
  },
  {
    id: 2,
    title: "3D Reality & Digital Twins",
    desc: "Unlocking global investor access. Allow buyers worldwide to seamlessly walk through unbuilt towers and opulent waterfront villas.",
    img: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2670&auto=format&fit=crop",
    colSpan: "md:col-span-12 lg:col-span-4",
    height: "h-[65vh]"
  },
  {
    id: 3,
    title: "Property Branding & UI/UX",
    desc: "Bespoke sales portals for elite developers. We build immersive digital environments and touch interfaces that perfectly mirror the physical prestige of the property itself.",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2680&auto=format&fit=crop",
    colSpan: "md:col-span-12",
    height: "h-[50vh]"
  }
];

export default function Services() {
  return (
    <main className="w-full relative px-6 md:px-12 lg:px-16 z-10 mx-auto">
      <Navbar />

      <section className="pt-48 pb-16 border-b border-white/5" >
         <AnimatedText text="OUR EXPERTISE" className="text-[clamp(4rem,14vw,16rem)] leading-[0.8] font-bold tracking-[-0.05em] uppercase text-white" />
         <p className="mt-6 tracking-[0.3em] uppercase text-[10px] text-gold-500 font-bold">The Minimalist Hub</p>
      </section>

      {/* Bento Layout Grid */}
      <section className="w-full py-24 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
          {services.map((item, idx) => (
            <motion.div 
              key={item.id} 
              className={`${item.colSpan} ${item.height} relative overflow-hidden group rounded-[2rem] bg-[#111] shadow-2xl`}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }} // smooth exponential ease
            >
              {/* Background Plate */}
              <img 
                src={item.img} 
                className="w-full h-full object-cover opacity-50 transition-transform duration-[2000ms] group-hover:scale-110 ease-out grayscale-[20%]" 
                alt={item.title} 
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent flex flex-col justify-end p-8 md:p-16">
                 <div className="transform translate-y-6 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                   <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] uppercase text-white mb-6 leading-[0.9]">
                     {item.title}
                   </h3>
                   <div className="w-12 h-[1px] bg-gold-500 mb-6 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 ease-out" />
                   <p className="text-sm md:text-lg text-[#a0a0a0] max-w-2xl font-light tracking-wide leading-relaxed">
                     {item.desc}
                   </p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
