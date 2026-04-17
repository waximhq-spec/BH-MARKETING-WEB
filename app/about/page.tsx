import Link from "next/link";

export const metadata = {
  title: "About — Cinmach Productions",
  description: "Learn about Cinmach Productions, a cinematic creative studio based in Bahrain.",
};

const CAPABILITIES = [
  {
    label: "Brand Films",
    desc: "Narrative-driven campaigns that build emotional equity.",
  },
  {
    label: "Aerial Cinematics",
    desc: "GCAA-certified drone operations for scale and impact.",
  },
  {
    label: "Colour & Grade",
    desc: "DaVinci Resolve pipeline. S-Log3. HDR delivery.",
  },
  {
    label: "Photography",
    desc: "Editorial and product photography for print and digital.",
  },
  {
    label: "Motion Design",
    desc: "Titles, graphic packages, and social-ready animation.",
  },
  {
    label: "Strategy",
    desc: "Brand positioning and visual direction from the ground up.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 md:pb-36">
      <div className="container">
        {/* Hero text */}
        <div className="mb-24 md:mb-36">
          <p className="label mb-8">About Us</p>
          <h1
            className="text-[#EDEDED] font-black"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 8rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.93,
              maxWidth: "14ch",
            }}
          >
            Cinematic studio. Bahrain-based.
          </h1>
        </div>

        {/* Two-column statement */}
        <div
          className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-24"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "4rem" }}
        >
          <div className="lg:w-1/2 lg:sticky lg:top-32 self-start">
            <h2
              className="text-[#EDEDED] font-black"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.04em", lineHeight: 1.05 }}
            >
              We believe the best stories are felt — not just seen.
            </h2>
          </div>
          <div className="lg:w-1/2">
            <p className="text-[#888] font-light mb-8" style={{ lineHeight: 1.85 }}>
              Cinmach Productions was built around a simple conviction: that visual communication,
              when done with obsessive intention, can move people to act, buy, and remember.
            </p>
            <p className="text-[#888] font-light mb-8" style={{ lineHeight: 1.85 }}>
              We are a small, highly focused studio. We don't work with everyone — we choose projects
              where the brief demands craft and the client demands excellence.
            </p>
            <p className="text-[#888] font-light" style={{ lineHeight: 1.85 }}>
              Based in Bahrain and operating across the Gulf, we work in real estate, hospitality,
              F&B, and luxury consumer brands.
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "4rem" }}>
          <p className="label mb-12">Capabilities</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {CAPABILITIES.map((cap) => (
              <div key={cap.label}>
                <p className="label-red mb-3">{cap.label}</p>
                <p className="text-[#666] text-sm font-light leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "3rem" }}
        >
          <p className="text-[#EDEDED] font-light" style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)", maxWidth: "32ch", lineHeight: 1.6 }}>
            Ready to talk about your next project?
          </p>
          <Link
            href="/estimate"
            className="shrink-0 inline-flex items-center gap-3 px-7 py-3.5 border border-[#EDEDED]/20 text-[11px] tracking-[0.2em] uppercase text-[#EDEDED] hover:border-white hover:text-white transition-all duration-300"
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
