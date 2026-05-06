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

export default function FoodVideographyPage() {
  const { openProjectModal } = useModal();

  return (
    <main className="bg-white min-h-screen text-black">
      {/* ── SEO CONTENT LAYER (Invisible but Indexable) ── */}
      <VisualHiddenSEO>
        <h1>Food Videography Services in Bahrain: Cinematic Culinary Content</h1>
        <p>At Cinmach Productions, we specialize in high-end food videography services across Bahrain. From mouth-watering slow-motion shots to dynamic social media reels, our expert team in Manama captures the essence of your culinary creations.</p>
        
        <h2>Why Professional Food Videography Matters</h2>
        <p>In today's digital landscape, people eat with their eyes first. High-quality food videography is essential for restaurants, FMCG brands, and hospitality businesses in Bahrain to stand out. It builds anticipation, showcases the quality of ingredients, and directly drives sales.</p>
        
        <h2>Our Food Videography Services</h2>
        <ul>
          <li>Menu Highlights: Detailed, appetizing close-ups of your signature dishes.</li>
          <li>Recipe & Preparation Videos: Engaging behind-the-scenes content of your kitchen.</li>
          <li>Social Media Content: High-retention clips optimized for Instagram, TikTok, and YouTube Shorts.</li>
          <li>Commercial Food Styling: Working with top food stylists to ensure perfect visual appeal.</li>
        </ul>

        <h2>Why Choose Us?</h2>
        <p>As a leading video production company in Bahrain, we combine cinematic lighting techniques with specialized macro lenses to capture textures and details that standard photography misses. Our portfolio includes top restaurants and cafes across Manama, Seef, and Adliya.</p>

        <p>Return to our <Link href="/">homepage</Link> or view our <Link href="/services">services</Link>.</p>
      </VisualHiddenSEO>

      {/* ══════════════════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black flex items-center">
        <SmartVideo 
          src="https://images.pexels.com/photos/33033789/pexels-photo-33033789.jpeg" // Placeholder
          autoPlay={true}
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        
        <div className="container relative z-10 pt-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[#B11226]" />
              <p className="text-[#B11226] font-mono tracking-[0.4em] uppercase text-[10px] font-bold">Food Content &middot; Bahrain</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-black text-white leading-[0.85] mb-12" style={{ fontSize: "clamp(2.5rem, 10vw, 8.5rem)", letterSpacing: "-0.05em" }}>
              FOOD<br />
              VIDEOGRAPHY<br />
              <span className="text-[#B11226]">SERVICES.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2} className="max-w-2xl border-l border-white/10 pl-8">
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
              We capture the texture, the steam, and the sizzle. Cinematic food content that makes your audience crave what you serve.
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
                  PEOPLE EAT<br />WITH THEIR EYES.
                </h2>
                <p className="text-black/60 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl">
                  In Bahrain's highly competitive food scene, average visuals don't cut it. Our food videography services are designed to trigger cravings, highlight your culinary expertise, and drive direct engagement across all digital platforms.
                </p>
              </Reveal>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <Reveal delay={0.1}>
                  <h3 className="font-bold text-xl mb-4">Macro Details</h3>
                  <p className="text-black/50 text-sm leading-relaxed">We use specialized macro lenses to capture the finest details—the glaze on a pastry, the steam off a steak, the perfect pour of a coffee.</p>
                </Reveal>
                <Reveal delay={0.2}>
                  <h3 className="font-bold text-xl mb-4">Lighting Mastery</h3>
                  <p className="text-black/50 text-sm leading-relaxed">Food requires specific, sculpted lighting to look appetizing. Our cinematic lighting techniques ensure your dishes look fresh, vibrant, and premium.</p>
                </Reveal>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal className="bg-black text-white p-10 md:p-14 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B11226]/10 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                <h4 className="font-mono text-[#B11226] text-[10px] tracking-[0.3em] uppercase mb-8 font-bold">What We Offer</h4>
                <div className="flex flex-col gap-6">
                   <div className="flex items-start gap-4">
                     <span className="text-[#B11226] font-bold mt-1">01</span>
                     <div>
                       <h5 className="font-bold uppercase tracking-wide">Menu Showcases</h5>
                       <p className="text-white/40 text-xs mt-1">Cinematic reels of your top-selling items.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4">
                     <span className="text-[#B11226] font-bold mt-1">02</span>
                     <div>
                       <h5 className="font-bold uppercase tracking-wide">Action Shots</h5>
                       <p className="text-white/40 text-xs mt-1">Chefs at work, sizzling pans, and dynamic prep.</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4">
                     <span className="text-[#B11226] font-bold mt-1">03</span>
                     <div>
                       <h5 className="font-bold uppercase tracking-wide">Social Media Packs</h5>
                       <p className="text-white/40 text-xs mt-1">Batched content ready for Instagram & TikTok.</p>
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
            <h2 className="font-black text-3xl md:text-5xl mb-12 text-center uppercase tracking-tighter">Food Videography FAQs</h2>
          </Reveal>
          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <h3 className="font-bold text-xl mb-2">What makes food videography different from regular videography?</h3>
              <p className="text-black/60 leading-relaxed">Food videography requires specialized equipment like macro lenses and specific lighting modifiers to make the food look appetizing. It also involves an understanding of food styling, timing (shooting before food wilts or melts), and capturing the "hero" moment of a dish.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <h3 className="font-bold text-xl mb-2">Do we need a food stylist?</h3>
              <p className="text-black/60 leading-relaxed">For high-end commercial shoots, a food stylist is highly recommended. For standard social media content, our experienced videographers can guide your chefs to plate the food in a way that looks best on camera.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <h3 className="font-bold text-xl mb-2">How many dishes can we shoot in one day?</h3>
              <p className="text-black/60 leading-relaxed">It depends on the complexity. For cinematic, highly-styled shots, we might focus on 3-5 hero dishes. For faster-paced social media reels, we can cover a wider variety of menu items within a full day shoot in Bahrain.</p>
            </Reveal>
            <Reveal delay={0.4}>
              <h3 className="font-bold text-xl mb-2">Can you shoot at our restaurant?</h3>
              <p className="text-black/60 leading-relaxed">Yes, we provide on-location food videography services across Bahrain, bringing our professional lighting and camera equipment directly to your kitchen or dining area.</p>
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
              MAKE THEM<br />
              <span className="text-white/20">HUNGRY.</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.15}>
            <button
              onClick={() => openProjectModal()}
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
