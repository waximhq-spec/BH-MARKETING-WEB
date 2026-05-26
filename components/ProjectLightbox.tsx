"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { type Project } from "@/lib/project-types";

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  // Prevent scroll behind the modal
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl bg-[#090909] border border-white/5 rounded-2xl overflow-hidden shadow-2xl my-auto text-white flex flex-col md:flex-row gap-8 md:gap-12 p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 z-[101]"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Project Media Column (Left side / Full width on mobile) */}
            <div className="flex-1 flex flex-col gap-6 max-h-[50vh] md:max-h-[70vh] overflow-y-auto pr-0 md:pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {project.media.length > 0 ? (
                project.media.map((item, i) => (
                  <div
                    key={i}
                    className="w-full bg-[#111] overflow-hidden rounded-xl border border-white/5 relative aspect-video"
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={item.url}
                        alt={`${project.title} — ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                        loading="lazy"
                        className="object-cover hover:scale-[1.02] transition-transform duration-[1s]"
                      />
                    )}
                  </div>
                ))
              ) : (
                // Fallback to thumbnail if no media list
                <div className="w-full bg-[#111] overflow-hidden rounded-xl border border-white/5 relative aspect-video">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Project Details Column (Right side) */}
            <div className="md:w-80 shrink-0 flex flex-col justify-between gap-8 md:pt-4 text-left">
              <div className="flex flex-col gap-6">
                {/* Category & Year */}
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] uppercase text-white/50 border-b border-white/5 pb-4">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-black leading-none uppercase tracking-tight text-white">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-white/60 font-light leading-relaxed text-sm md:text-[15px] antialiased">
                  {project.description}
                </p>
              </div>

              {/* Tags / Details */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.15em] uppercase text-white/70 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
