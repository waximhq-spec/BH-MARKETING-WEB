"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/ModalContext";
import VisualHiddenSEO from "@/components/VisualHiddenSEO";
import SmartVideo from "@/components/SmartVideo";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Scroll-triggered reveal utility
   ─────────────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function VideoProductionPage() {
  const { openProjectModal } = useModal();

  return (
    <main className="bg-white min-h-screen text-black">
      {/* ── SEO CONTENT LAYER (Invisible but Indexable) ── */}
      <VisualHiddenSEO>
        <h1>Video Production Company Bahrain: High-End Cinematic Content</h1>
        <p>Looking for a top-tier video production company in Bahrain? Cinmach Productions delivers world-class cinematic video content, brand films, and high-performance social media reels for luxury brands, restaurants, and corporate clients in Manama and across the GCC.</p>
        
        <h2>Comprehensive Video Production Services</h2>
        <p>As a full-service creative production, we handle everything from pre-production strategy to final delivery.</p>
        <ul>
          <li>Brand Commercials: Epic, story-driven films that establish market authority.</li>
          <li>Corporate Video Production: Professional content that communicates your brand values effectively.</li>
          <li>Hospitality & Real Estate Videography: Showcasing luxury spaces and culinary experiences.</li>
          <li>High-Retention Social Media Videos: Engineered for engagement on modern platforms.</li>
        </ul>

        <h2>Why Cinmach Productions?</h2>
        <p>What sets us apart from other video production companies in Bahrain is our obsession with quality. We don't just record video; we design perception. We use cinema-grade equipment and advanced post-production techniques to ensure your brand looks premium, professional, and intentional.</p>

        <p>Return to our <Link href="/">homepage</Link> or view our <Link href="/work">portfolio</Link>.</p>
      </VisualHiddenSEO>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black flex items-center">
        <SmartVideo 
          src="https://images.pexels.com/photos/33033789/pexels-photo-33033789.jpeg" // Placeholder
          autoPlay={true}
          autoPlayViewport={true}
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        
        <div className="container relative z-10 pt-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[#B11226]" />
              <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">Premium Agency &middot; Bahrain</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-black text-white leading-[0.85] mb-12" style={{ fontSize: "clamp(2.5rem, 10vw, 8.5rem)", letterSpacing: "-0.05em" }}>
              VIDEO<br />
              PRODUCTION<br />
              <span className="text-[#B11226]">COMPANY.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2} className="max-w-2xl border-l border-white/10 pl-8">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              We are a premier video production agency based in Bahrain, specializing in high-end cinematic content that transforms brands into industry authorities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2: WHY IT MATTERS & SERVICES
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="text-black font-black text-4xl md:text-6xl tracking-tighter leading-none mb-10">
                  WE DESIGN<br />PERCEPTION.
                </h2>
                <p className="text-black/60 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl">
                  In a saturated digital market, quality is your strongest differentiator. As a leading video production company in Bahrain, we create visual assets that make your brand impossible to ignore.
                </p>
              </Reveal>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <Reveal delay={0.1}>
                  <h3 className="font-bold text-xl mb-4">End-to-End Production</h3>
                  <p className="text-black/50 text-sm leading-relaxed">From initial concept and scriptwriting to filming, color grading, and final delivery, we manage the entire creative process seamlessly.</p>
                </Reveal>
                <Reveal delay={0.2}>
                  <h3 className="font-bold text-xl mb-4">Cinema-Grade Quality</h3>
                  <p className="text-black/50 text-sm leading-relaxed">We utilize industry-leading cameras and lighting setups to ensure your content meets international broadcast and digital standards.</p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal className="bg-black text-white p-10 md:p-14 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                <h4 className="font-mono text-[#B11226] text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">Our Core Expertise</h4>
                <div className="flex flex-col gap-6">
                   <div className="flex items-start gap-4">
                     <span className="text-[#B11226] font-bold mt-1">01</span>
                     <div>
                       <h5 className="font-bold uppercase tracking-wide">Brand Commercials</h5>
                       <p className="text-white/40 text-xs mt-1">High-impact storytelling for campaigns.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4">
                     <span className="text-[#B11226] font-bold mt-1">02</span>
                     <div>
                       <h5 className="font-bold uppercase tracking-wide">Corporate Films</h5>
                       <p className="text-white/40 text-xs mt-1">Professional overviews, interviews, and company profiles.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4">
                     <span className="text-[#B11226] font-bold mt-1">03</span>
                     <div>
                       <h5 className="font-bold uppercase tracking-wide">Hospitality & Real Estate</h5>
                       <p className="text-white/40 text-xs mt-1">Showcasing spaces and experiences cinematically.</p>
                     </div>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3: FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#FAFAFA] text-black">
        <div className="container max-w-4xl">
          <Reveal>
            <h2 className="font-black text-3xl md:text-5xl mb-12 text-center uppercase tracking-tighter">Video Production FAQs</h2>
          </Reveal>
          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <h3 className="font-bold text-xl mb-2">What industries do you serve in Bahrain?</h3>
              <p className="text-black/60 leading-relaxed">We work extensively with the hospitality sector (restaurants, cafes, hotels), real estate developers, luxury retail brands, and corporate institutions looking for premium visual storytelling.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="font-bold text-xl mb-2">How much does a commercial video cost?</h3>
              <p className="text-black/60 leading-relaxed">Costs vary widely based on the project's scope, including pre-production planning, days of filming, required crew, and post-production complexity. We offer transparent quoting after an initial discovery call.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <h3 className="font-bold text-xl mb-2">How long is the production process?</h3>
              <p className="text-black/60 leading-relaxed">A standard corporate or brand film typically takes 3 to 5 weeks from initial concept to final delivery. Rush services are occasionally available depending on our current schedule.</p>
            </Reveal>
            <Reveal delay={0.4}>
              <h3 className="font-bold text-xl mb-2">Do you travel outside of Manama?</h3>
              <p className="text-black/60 leading-relaxed">Yes, while we are based in Manama, we provide full video production services across the entirety of Bahrain and frequently travel across the GCC for larger client projects.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4: CALL TO ACTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-48 bg-[#0A0A0A] text-white border-t border-white/5">
        <div className="container text-center flex flex-col items-center">
          <Reveal>
            <h2 className="text-white font-black leading-none mb-12" style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)", letterSpacing: "-0.04em" }}>
              READY TO<br />
              <span className="text-white/20">CREATE?</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.15}>
            <button
              onClick={openProjectModal}
              className="px-14 py-7 bg-white text-black text-[11px] font-mono font-bold tracking-[0.3em] uppercase hover:bg-[#B11226] hover:text-white transition-all duration-500 shadow-2xl"
            >
              Start Your Project
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
