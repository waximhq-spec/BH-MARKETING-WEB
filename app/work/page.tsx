"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import PageBgSync from "@/components/PageBgSync";
import { FALLBACK_PROJECTS, type Project } from "@/lib/project-types";
import ProjectLightbox from "@/components/ProjectLightbox";

type FilterType = "ALL" | "VIDEOS" | "PHOTOS";

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState<FilterType>("ALL");
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error loading portfolio archive:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "VIDEOS") return project.hasVideos;
    if (activeTab === "PHOTOS") return project.hasPhotos;
    return true;
  });

  return (
    <main className="relative overflow-hidden bg-[#fafafa] min-h-screen text-[#1a1a1a] selection:bg-[#9A0E1F] selection:text-white pb-32">
      <PageBgSync bg="white" />
      
      {/* ── SEO CONTENT LAYER ── */}
      <VisualHiddenSEO>
        <h1>Our Portfolio: Selected Cinematic Work by Cinmach Productions</h1>
        <p>Explore our archive of high-end cinematic films, vertical reels, and visual narratives. We partner with visionaries in luxury hospitality, real estate, and high-end consumer brands to shape global narratives.</p>
      </VisualHiddenSEO>

      {/* HERO SECTION */}
      <section data-theme="light" className="pt-40 md:pt-56 pb-12 md:pb-20">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-8 md:mb-10 opacity-80">
              <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
              <span className="text-[#9A0E1F] font-mono tracking-[0.4em] uppercase text-[11px] md:text-[12px] font-bold">Archive</span>
            </div>
            <h1
              className="bg-clip-text text-transparent bg-gradient-to-b from-[#1a1a1a] to-[#666] font-bold leading-[0.95] tracking-tight antialiased uppercase"
              style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)", letterSpacing: "-0.03em" }}
            >
              OUR<br />WORK.
            </h1>
          </Reveal>
          
          <Reveal delay={0.1} className="mt-12 md:mt-20 border-t border-black/10 pt-10">
            <p className="text-black/60 max-w-2xl font-light leading-relaxed text-[15px] md:text-lg antialiased">
              A curated selection of dynamic cinematic assets and branding campaigns. We partner with visionaries in luxury hospitality, real estate, and high-end consumer brands to shape global narratives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FILTER AND GRID SECTION */}
      <section data-theme="light" className="py-8 bg-white">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          
          {/* Tab Filter Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-16 border-b border-black/5 pb-8">
            {(["ALL", "VIDEOS", "PHOTOS"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                  activeTab === tab
                    ? "bg-[#9A0E1F] text-white border-[#9A0E1F] font-bold shadow-[0_4px_12px_rgba(154,14,31,0.25)]"
                    : "bg-transparent text-black/60 border-black/10 hover:text-[#9A0E1F] hover:bg-[#9A0E1F]/5 hover:border-[#9A0E1F]/20"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Grid Layout */}
          {filteredProjects.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-black/40 font-mono text-sm">No items found matching the selected filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project, idx) => {
                const isVideo = project.hasVideos;
                return (
                  <Reveal key={project.id} delay={0.05 * (idx % 3)}>
                    <button
                      onClick={() => setActiveProject(project)}
                      className="group relative block text-left w-full aspect-video md:aspect-[4/3] bg-black/5 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-[transform,shadow] duration-500 hover:-translate-y-1 transform-gpu"
                    >
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.03] transform-gpu"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-500 z-[5] pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-[6] opacity-95" />
                      
                      {/* Centered Media Icon Overlay */}
                      <div className="absolute inset-0 z-[7] flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-[#050505]/70 flex items-center justify-center transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-[#9A0E1F]/90 shadow-[0_0_15px_rgba(0,0,0,0.3)] transform-gpu">
                          {isVideo ? (
                            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Card Details Text */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-1.5 transform-gpu">
                        <div className="flex items-center justify-between text-white/70 font-mono text-[9px] tracking-[0.25em] uppercase mb-1.5 font-bold drop-shadow-md">
                          <span>{project.category}</span>
                          <span>{project.year}</span>
                        </div>
                        <h4 className="text-white font-bold text-lg md:text-xl tracking-tight drop-shadow-lg leading-tight uppercase">{project.title}</h4>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          )}

        </div>
      </section>

      <CTASection />

      <ProjectLightbox project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
