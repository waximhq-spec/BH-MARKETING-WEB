"use client";

import Navbar from "@/components/Navbar";
import AnimatedText from "@/components/AnimatedText";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All Projects", "Residential", "Commercial", "360° Tours"];

const projects = [
  { id: 1, title: "Manama Bay Skyline", category: "Commercial", type: "Drone Film", thumbnail: "https://images.unsplash.com/photo-1596404988451-bceebc8531e2?q=80&w=600", video: "https://cdn.pixabay.com/vimeo/328224716/buildings-22340.mp4?width=640" },
  { id: 2, title: "Diyar Al Muharraq Villas", category: "Residential", type: "Full Branding", thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600", video: "https://cdn.pixabay.com/vimeo/328224716/buildings-22340.mp4?width=640" },
  { id: 3, title: "Bahrain Financial Harbour", category: "Commercial", type: "3D Capture", thumbnail: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=600", video: "https://cdn.pixabay.com/vimeo/328224716/buildings-22340.mp4?width=640" },
  { id: 4, title: "Amwaj Islands Villa", category: "Residential", type: "Drone Film", thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600", video: "https://cdn.pixabay.com/vimeo/328224716/buildings-22340.mp4?width=640" },
  { id: 5, title: "Seef Digital Twin", category: "360° Tours", type: "3D Capture", thumbnail: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=600", video: "https://cdn.pixabay.com/vimeo/328224716/buildings-22340.mp4?width=640" },
  { id: 6, title: "Reef Island Highrise", category: "Residential", type: "Full Branding", thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600", video: "https://cdn.pixabay.com/vimeo/328224716/buildings-22340.mp4?width=640" },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative overflow-hidden group rounded-2xl bg-[#111] aspect-[4/5] cursor-pointer shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img 
        src={project.thumbnail} 
        alt={project.title} 
        className="absolute inset-0 w-full h-full object-cover grayscale-[30%] opacity-70 group-hover:opacity-0 transition-opacity duration-700 ease-out" 
      />
      
      {/* Preload "none" explicitly prevents bandwidth drain until hover or programmatic fetching occurs. */}
      <video
         ref={videoRef}
         src={project.video}
         muted
         loop
         playsInline
         preload="none"
         className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out scale-105 group-hover:scale-100"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/90 via-[#0b0b0b]/10 to-transparent flex flex-col justify-end p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
         <span className="text-[10px] tracking-[0.2em] text-gold-500 mb-2 uppercase font-bold">{project.type}</span>
         <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-[-0.04em] text-white leading-tight">{project.title}</h3>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("All Projects");

  const filteredProjects = filter === "All Projects" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <main className="w-full relative px-6 md:px-12 lg:px-16 z-10 mx-auto min-h-[120vh] pb-32">
      <Navbar />

      <section className="pt-48 pb-16 border-b border-white/5" >
         <AnimatedText text="LIVE DEMO" className="text-[clamp(4rem,14vw,16rem)] leading-[0.8] font-bold tracking-[-0.05em] uppercase text-white" />
         <p className="mt-8 tracking-[0.3em] uppercase text-[10px] font-bold text-white/50">Immersive Real Estate Experiences</p>
      </section>

      {/* Filter Bar */}
      <section className="w-full py-12 flex flex-wrap gap-8 items-center border-b border-white/5">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 pb-3 border-b-2 ${filter === cat ? 'border-gold-500 text-gold-500 font-bold' : 'border-transparent text-white/50 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="w-full pt-16">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence mode="popLayout">
             {filteredProjects.map(project => (
               <ProjectCard key={project.id} project={project} />
             ))}
           </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
