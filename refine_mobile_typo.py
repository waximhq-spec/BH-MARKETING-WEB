import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# 1. Update Headline
old_headline = """                    {/* MOBILE HEADLINE */}
                    <h1 className="md:hidden text-white font-bold leading-[0.85] tracking-tight antialiased uppercase mb-5 text-center" style={{ fontSize: "14.5vw", letterSpacing: "-0.03em" }}>
                      <span className="block text-[0.45em] font-light tracking-normal opacity-90 mb-1 uppercase">
                        We <span className="font-black">build brands</span><br/>people
                      </span>
                      <span className="text-[#9A0E1F] uppercase block mt-1.5">REMEMBER.</span>
                    </h1>"""

new_headline = """                    {/* MOBILE HEADLINE */}
                    <h1 className="md:hidden text-white font-bold leading-[0.9] tracking-tight antialiased uppercase mb-4 text-center mx-auto max-w-[320px]" style={{ fontSize: "12vw", letterSpacing: "-0.02em" }}>
                      <span className="block text-[0.65em] font-light tracking-normal opacity-90 mb-1 uppercase">
                        We <span className="font-black">build brands</span> people
                      </span>
                      <span className="text-[#9A0E1F] uppercase block mt-1">REMEMBER.</span>
                    </h1>"""

content = content.replace(old_headline, new_headline)

# 2. Update Paragraph
old_paragraph = """                    <Reveal delay={0.2} className="w-full">
                      <p className="text-white/80 text-[14px] md:text-[15px] lg:text-base leading-[1.6] font-light mb-8 md:mb-10 text-center lg:text-left">
                        We combine strategy, storytelling, and cinematic production to turn businesses into recognizable brands.
                      </p>
                    </Reveal>"""

new_paragraph = """                    {/* MOBILE PARAGRAPH */}
                    <Reveal delay={0.2} className="w-full md:hidden">
                      <p className="text-white/60 text-[13px] leading-[1.7] font-light mb-8 text-center max-w-[260px] mx-auto">
                        We combine strategy, storytelling, and cinematic production to turn businesses into recognizable brands.
                      </p>
                    </Reveal>
                    {/* DESKTOP PARAGRAPH */}
                    <Reveal delay={0.2} className="w-full hidden md:block">
                      <p className="text-white/80 text-[15px] lg:text-base leading-[1.6] font-light mb-10 text-left">
                        We combine strategy, storytelling, and cinematic production to turn businesses into recognizable brands.
                      </p>
                    </Reveal>"""

content = content.replace(old_paragraph, new_paragraph)

# 3. Update Mobile Hero Content (CTA & Trust Text)
old_mobile_cta = """                {/* Mobile Hero Content - Rendered with Static Solids */}
                <div className="lg:hidden flex flex-col items-center gap-4 w-full mt-2 mb-6">
                  <div className="w-full flex justify-center px-4">
                    <button
                      data-cal-link="wasim-ebxvk8/schedule-call"
                      data-cal-namespace="schedule-call"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      aria-label="Book a strategy call for your marketing campaign in Bahrain"
                      className="relative flex items-center justify-center w-full max-w-[260px] h-[48px] bg-[#9A0E1F] text-white text-[10px] font-mono font-black tracking-[0.2em] uppercase rounded-full shadow-[0_8px_20px_rgba(154,14,31,0.2)] active:scale-[0.98] transition-transform"
                    >
                      BOOK A STRATEGY CALL
                    </button>
                  </div>
                  
                  <Reveal delay={0.3} className="w-full">
                    <p className="w-full text-white/40 text-[8px] text-center font-mono tracking-[0.15em] uppercase font-medium">
                      Response within <span className="font-black text-white/90">24 hours</span>
                    </p>
                  </Reveal>
                </div>"""

new_mobile_cta = """                {/* Mobile Hero Content - Rendered with Static Solids */}
                <div className="lg:hidden flex flex-col items-center gap-3 w-full mt-2 mb-8">
                  <div className="w-full flex justify-center px-4">
                    <button
                      data-cal-link="wasim-ebxvk8/schedule-call"
                      data-cal-namespace="schedule-call"
                      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                      aria-label="Book a strategy call for your marketing campaign in Bahrain"
                      className="relative flex items-center justify-center w-full max-w-[260px] h-[48px] bg-[#9A0E1F] text-white text-[11px] font-mono font-black tracking-[0.1em] uppercase rounded-full shadow-[0_8px_20px_rgba(154,14,31,0.2)] active:scale-[0.98] transition-transform"
                    >
                      BOOK A STRATEGY CALL
                    </button>
                  </div>
                  
                  <Reveal delay={0.3} className="w-full">
                    <p className="w-full text-white/40 text-[9px] text-center font-mono tracking-[0.1em] uppercase font-medium mt-1">
                      Response within <span className="font-black text-white/80">24 hours</span>
                    </p>
                  </Reveal>
                </div>"""

content = content.replace(old_mobile_cta, new_mobile_cta)

# 4. Update Stats
old_stats = """              {/* Bottom Metrics - Restored with Hardware Acceleration */}
              <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 md:pb-24 lg:pb-20 w-full px-5 md:px-0">
                <div className="container mx-auto border-t border-white/5 pt-5 md:pt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN: All 3 Metrics */}
                    <div className="lg:col-span-7 flex flex-row items-end justify-center lg:justify-start gap-6 md:gap-16 lg:gap-20">
                      <Reveal delay={0.7}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white font-black text-xl md:text-4xl tracking-tighter">GULF</span>
                          <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">Clients</span>
                        </div>
                      </Reveal>
                      <Reveal delay={0.8}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white font-black text-xl md:text-4xl tracking-tighter">
                            <CountUp start={0} end={40} duration={5} redraw={true} suffix="+" />
                          </span>
                          <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">Brands Built</span>
                        </div>
                      </Reveal>
                      <Reveal delay={0.9}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white font-black text-xl md:text-4xl tracking-tighter">
                            <CountUp start={0} end={300} duration={5} redraw={true} suffix="%" />
                          </span>
                          <span className="text-white/50 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.2em] mt-1">More Engagement</span>
                        </div>
                      </Reveal>
                    </div>"""

new_stats = """              {/* Bottom Metrics - Restored with Hardware Acceleration */}
              <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-24 lg:pb-20 w-full px-5 md:px-0">
                <div className="container mx-auto border-t border-white/5 pt-5 md:pt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* LEFT COLUMN: All 3 Metrics */}
                    <div className="lg:col-span-7 flex flex-row items-end justify-center lg:justify-start gap-8 md:gap-16 lg:gap-20">
                      <Reveal delay={0.7}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white/90 font-black text-[15px] md:text-4xl tracking-tighter">GULF</span>
                          <span className="text-white/30 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.1em] mt-1">Clients</span>
                        </div>
                      </Reveal>
                      <Reveal delay={0.8}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white/90 font-black text-[15px] md:text-4xl tracking-tighter">
                            <CountUp start={0} end={40} duration={5} redraw={true} suffix="+" />
                          </span>
                          <span className="text-white/30 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.1em] mt-1">Brands Built</span>
                        </div>
                      </Reveal>
                      <Reveal delay={0.9}>
                        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                          <span className="text-white/90 font-black text-[15px] md:text-4xl tracking-tighter">
                            <CountUp start={0} end={300} duration={5} redraw={true} suffix="%" />
                          </span>
                          <span className="text-white/30 font-mono font-bold text-[7px] md:text-[9px] uppercase tracking-[0.1em] mt-1">More Engagement</span>
                        </div>
                      </Reveal>
                    </div>"""

content = content.replace(old_stats, new_stats)

with open('app/page.tsx', 'w') as f:
    f.write(content)

print("Done refining mobile typography.")
