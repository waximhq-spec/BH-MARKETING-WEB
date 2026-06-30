"use client";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import PageBgSync from "@/components/PageBgSync";

const CEO: {
  name: string;
  role: string;
  desc: string;
  img?: string;
} = {
  name: "Suhail Ahmad Goni",
  role: "CO-FOUNDER & CEO",
  desc: "Suhail leads the company and makes sure everything runs smoothly. He focuses on growing the business and making sure every client gets the best possible results from our team."
};

const DEPARTMENTS: Array<{
  id: string;
  title: string;
  badge: string;
  lead: {
    name: string;
    role: string;
    desc: string;
    img?: string;
  };
  specialists: Array<{
    name: string;
    title: string;
    skills: string[];
    img?: string;
  }>;
}> = [
    {
      id: "production",
      title: "Production Department",
      badge: "ON-SET & CREATIVE EXECUTION",
      lead: {
        name: "Shayan",
        role: "Lead Videographer & Head of Production",
        desc: "Leads every production from planning to execution. Oversees creative direction on set, camera operation, shot composition, and ensures every project is captured to Cinmach's quality standards.",
        img: "/team-img/shayan.png"
      },
      specialists: [
        {
          name: "Moomin Shafi",
          title: "Camera Assistant",
          img: "/team-img/Moomin.png",
          skills: [
            "Camera setup",
            "Lens management",
            "Equipment preparation",
            "Battery & media handling"
          ]
        },
        {
          name: "Faisal Malik",
          title: "Lighting & Grip Specialist",
          skills: [
            "Lighting setup",
            "Modifiers & reflectors",
            "Scene lighting",
            "On-set equipment"
          ]
        },
        {
          name: "Iram Nabi",
          title: "Production Coordinator",
          skills: [
            "Client coordination",
            "Scheduling",
            "Shot lists",
            "Logistics",
            "Location management"
          ]
        }
      ]
    },
    {
      id: "post-production",
      title: "Post-Production Department",
      badge: "POST-WORKFLOW & FINISHING",
      lead: {
        name: "Wasim",
        role: "Lead Editor & Head of Post-Production",
        desc: "Leads the complete post-production workflow from storytelling and editing to color grading, sound design, and final delivery.",
        img: "/team-img/wasim.png"
      },
      specialists: [
        {
          name: "Mohsin Shafi",
          title: "Motion Graphics & VFX Artist",
          img: "/team-img/mohsin.png",
          skills: [
            "Motion graphics",
            "Logo animation",
            "Visual effects",
            "Screen replacement"
          ]
        },
        {
          name: "Omar Farooq",
          title: "Colorist",
          skills: [
            "Color correction",
            "Color grading",
            "Skin tone balancing",
            "Cinematic finishing"
          ]
        },
        {
          name: "Adil Nazir",
          title: "Sound Designer",
          skills: [
            "Audio cleanup",
            "Dialogue enhancement",
            "Sound effects",
            "Music mixing",
            "Audio mastering"
          ]
        }
      ]
    }
  ];

export default function TeamPage() {
  return (
    <main className="relative overflow-hidden bg-white min-h-screen text-black">
      <PageBgSync bg="white" />

      {/* Hero */}
      <section data-theme="light" className="relative pt-36 md:pt-44 pb-10 md:pb-12 bg-transparent overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/5 border border-[#9A0E1F]/20 rounded-full mb-10 opacity-90">
                  <span className="w-2 h-2 rounded-full bg-[#9A0E1F] animate-pulse" />
                  <span className="text-[#9A0E1F] font-mono tracking-[0.3em] uppercase text-[10px] md:text-[11px] font-semibold">The People</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-[#111111] to-[#555555] font-extrabold leading-[0.95] tracking-[-0.035em] antialiased uppercase" style={{ fontSize: "clamp(2.2rem, 9vw, 7.2rem)" }}>
                  OUR<br />TEAM.
                </h1>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="max-w-[360px] md:mt-28">
                <h2 className="text-[#111111] font-semibold text-[13px] md:text-[14px] tracking-tight mb-2.5 antialiased uppercase font-mono">
                  Small team. Big results.
                </h2>
                <p className="text-black/70 text-[15px] md:text-base leading-relaxed font-normal antialiased tracking-tight">
                  A focused crew of creatives, producers, and strategists who care about making your brand look exceptional.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="h-[1px] w-full bg-black/10 mt-10" />
        </div>
      </section>

      {/* Main Team Section */}
      <section data-theme="light" className="pt-12 md:pt-16 pb-24 md:pb-36 bg-[#fafafa] text-black border-t border-black/5">
        <div className="container">

          {/* Executive Leadership Row (CEO) */}
          <Reveal delay={0}>
            <div className="mb-16 md:mb-20">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-semibold uppercase">EXECUTIVE LEADERSHIP</span>
                <div className="h-px flex-1 bg-black/10" />
              </div>

              <div className="group relative p-8 md:p-12 lg:p-14 border border-black/10 rounded-3xl bg-white hover:border-[#9A0E1F]/30 hover:shadow-[0_25px_65px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col md:flex-row items-center gap-8 md:gap-14 transform-gpu">

                {/* Image Container */}
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-2xl bg-gradient-to-br from-[#f8f8f8] to-[#ededed] flex items-center justify-center overflow-hidden border border-black/8 group-hover:border-[#9A0E1F]/30 transition-all duration-500 shadow-sm relative">
                  {CEO.img ? (
                    <img src={CEO.img} alt={CEO.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center text-black/30 group-hover:scale-110 transition-transform duration-500">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" />
                    <span className="text-[#9A0E1F] font-mono text-[9px] md:text-[10px] tracking-[0.25em] font-bold uppercase">FOUNDER & CEO</span>
                  </div>
                  <h3 className="text-black font-bold text-3xl md:text-5xl tracking-tight antialiased uppercase leading-tight mb-2">
                    {CEO.name}
                  </h3>
                  <p className="text-[#9A0E1F] font-mono text-[11px] md:text-[13px] tracking-[0.2em] uppercase font-bold mb-4">
                    {CEO.role}
                  </p>
                  <div className="h-px w-12 bg-black/10 mb-5 group-hover:w-24 group-hover:bg-[#9A0E1F] transition-all duration-500" />
                  <p className="text-black/70 text-[15px] md:text-[17px] leading-[1.75] font-light max-w-3xl">
                    {CEO.desc}
                  </p>
                </div>
              </div>

              {/* Connecting Trunk to Departments */}
              <div className="flex flex-col items-center mt-12 mb-4">
                <div className="w-0.5 h-10 bg-gradient-to-b from-black/20 via-[#9A0E1F]/40 to-[#9A0E1F]" />
                <div className="w-4 h-4 rounded-full bg-[#9A0E1F] ring-4 ring-[#fafafa] shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Departmental Organizational Hierarchy Section */}
          <div className="mb-10 text-center">
            <Reveal delay={0.1}>
              <span className="text-[#9A0E1F] font-mono text-[10px] md:text-[11px] tracking-[0.35em] font-bold uppercase block mb-2">
                DEPARTMENTAL STRUCTURE
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight uppercase">
                PRODUCTION & POST-PRODUCTION TEAMS
              </h2>
            </Reveal>
          </div>

          {/* Side-by-Side Department Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-start">
            {DEPARTMENTS.map((dept, dIdx) => (
              <Reveal key={dept.id} delay={0.15 * (dIdx + 1)}>
                <div className="group/dept relative p-6 md:p-10 rounded-[2.5rem] bg-white border border-black/10 hover:border-black/20 hover:shadow-[0_25px_70px_rgba(0,0,0,0.04)] transition-all duration-500 flex flex-col h-full">

                  {/* Department Title */}
                  <div className="mb-8 pb-6 border-b border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.25em] font-bold uppercase block mb-1">
                        {dept.badge}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight uppercase text-black">
                        {dept.title}
                      </h3>
                    </div>
                    <span className="self-start sm:self-center px-3 py-1 bg-black/5 rounded-full text-black/50 font-mono text-[10px] tracking-widest uppercase font-semibold">
                      DEPT 0{dIdx + 1}
                    </span>
                  </div>

                  {/* 1. TOP TEAM LEAD CARD (35-40% larger than specialists) */}
                  <div className="relative group/lead p-7 md:p-9 rounded-3xl bg-gradient-to-br from-[#fafafa] to-[#f4f4f4] border border-black/10 hover:border-[#9A0E1F]/40 hover:shadow-lg transition-all duration-500 z-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">

                      {/* Lead Avatar Container */}
                      <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-2xl bg-white flex items-center justify-center overflow-hidden border border-black/10 group-hover/lead:border-[#9A0E1F]/40 shadow-sm transition-all duration-500">
                        {dept.lead.img ? (
                          <img src={dept.lead.img} alt={dept.lead.name} className="w-full h-full object-cover group-hover/lead:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#9A0E1F]/10 flex items-center justify-center text-[#9A0E1F] group-hover/lead:scale-110 transition-transform duration-500">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col items-center sm:items-start">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#9A0E1F]/10 rounded-full mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]" />
                          <span className="text-[#9A0E1F] font-mono text-[9px] tracking-widest font-bold uppercase">TEAM LEAD</span>
                        </div>
                        <h4 className="text-black font-bold text-2xl md:text-3xl tracking-tight uppercase leading-tight mb-1">
                          {dept.lead.name}
                        </h4>
                        <p className="text-[#9A0E1F] font-mono text-[10px] md:text-[11px] tracking-wider uppercase font-bold mb-3">
                          {dept.lead.role}
                        </p>
                        <div className="h-px w-8 bg-black/15 mb-3 group-hover/lead:w-16 group-hover/lead:bg-[#9A0E1F] transition-all duration-500" />
                        <p className="text-black/70 text-[13px] md:text-[14px] leading-relaxed font-light">
                          {dept.lead.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. ORGANIZATIONAL CONNECTOR LINES */}
                  <div className="flex flex-col items-center my-5 relative z-0">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-[#9A0E1F] via-[#9A0E1F]/50 to-black/20" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#9A0E1F] ring-4 ring-white shadow-md z-10" />
                  </div>

                  {/* 3. THREE SPECIALIST SUB CARDS UNDERNEATH */}
                  <div className="relative pl-6 md:pl-8 space-y-4 border-l-2 border-dashed border-black/15 ml-4 md:ml-6 pb-2">
                    {dept.specialists.map((spec, sIdx) => (
                      <div key={spec.title} className="relative group/sub">
                        {/* Horizontal Connector Arm */}
                        <div className="absolute -left-[25px] md:-left-[33px] top-6 w-[23px] md:w-[31px] h-0.5 bg-black/15 group-hover/sub:bg-[#9A0E1F] transition-colors duration-300" />
                        <div className="absolute -left-[27px] md:-left-[35px] top-[22px] w-2 h-2 rounded-full bg-black/30 group-hover/sub:bg-[#9A0E1F] group-hover/sub:scale-125 transition-all duration-300" />

                        {/* Specialist Card Container */}
                        <div className="p-5 md:p-6 rounded-2xl bg-white border border-black/10 hover:border-[#9A0E1F]/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover/sub:translate-x-1">

                          {/* Header with Small Profile Avatar and Name */}
                          <div className="flex items-center gap-3.5 mb-4 pb-3 border-b border-black/5">
                            {/* Small Profile Avatar Container */}
                            <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-[#fafafa] to-[#ededed] border border-black/10 flex items-center justify-center overflow-hidden shadow-sm group-hover/sub:border-[#9A0E1F]/40 transition-all duration-300">
                              {spec.img ? (
                                <img src={spec.img} alt={spec.name} className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-300" />
                              ) : (
                                <div className="w-full h-full bg-[#9A0E1F]/10 flex items-center justify-center text-[#9A0E1F]">
                                  <svg className="w-5 h-5 text-[#9A0E1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h5 className="text-black font-bold text-base md:text-lg tracking-tight uppercase truncate">
                                  {spec.name}
                                </h5>
                                <span className="text-[#9A0E1F] font-mono text-xs font-bold shrink-0">0{sIdx + 1}.</span>
                              </div>
                              <p className="text-[#9A0E1F] font-mono text-[10px] md:text-[11px] tracking-wider uppercase font-bold truncate">
                                {spec.title}
                              </p>
                            </div>
                          </div>

                          {/* Specialist Capabilities Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {spec.skills.map((skill) => (
                              <div key={skill} className="flex items-start gap-2 text-[12px] md:text-[13px] text-black/75 font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F]/70 mt-1.5 shrink-0 group-hover/sub:bg-[#9A0E1F] transition-colors" />
                                <span className="leading-snug">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section data-theme="light" className="py-24 md:py-36 bg-white text-black">
        <div className="container">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[#9A0E1F] font-mono text-[10px] tracking-[0.3em] font-bold uppercase">HOW WE WORK</span>
              <div className="h-px flex-1 bg-black/10" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Quality Over Quantity", desc: "We take fewer projects so every client gets our full attention and best work." },
              { title: "Results First", desc: "Every visual decision is made to drive real business outcomes — not just look good." },
              { title: "Direct Communication", desc: "You work directly with the people making your content. No layers, no delays." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div>
                  <h3 className="font-bold text-xl tracking-tight antialiased uppercase mb-3">{v.title}</h3>
                  <p className="text-black/60 text-[14px] leading-[1.7] font-light">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
