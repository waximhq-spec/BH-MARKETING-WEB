"use client";

import CTASection from "@/components/CTASection";
import PageBgSync from "@/components/PageBgSync";

export default function TermsPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <PageBgSync bg="black" />
      
      {/* Hero Section */}
      <section data-theme="dark" className="relative pt-36 md:pt-48 pb-12 md:pb-24 bg-[#050505] border-b border-white/5">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#9A0E1F]/10 border border-[#9A0E1F]/20 rounded-full mb-8">
            <span className="text-[#9A0E1F] font-mono tracking-[0.3em] uppercase text-[10px] font-bold">Legal</span>
          </div>
          <h1 className="text-white font-black leading-[0.95] tracking-tighter mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.03em" }}>
            TERMS &<br />
            CONDITIONS.
          </h1>
          <p className="text-white/40 font-mono text-[11px] uppercase tracking-[0.2em]">
            Last Updated: May 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section data-theme="dark" className="py-16 md:py-24 bg-[#050505]">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="max-w-3xl">
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              Welcome to CINMACH Productions. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              1. General Website Usage
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-6">
              This website is operated by CINMACH Productions to showcase our creative portfolio, detail our services, and allow prospective clients to contact us. You agree to use the site respectfully and solely for lawful purposes related to viewing our work or inquiring about our services.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              2. Intellectual Property & Copyright
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-6">
              All visual content, videos, photography, branding elements, typography treatments, and text displayed on this website are the exclusive intellectual property of CINMACH Productions (or used with permission from our clients). 
            </p>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              You may not scrape, download, copy, reproduce, or distribute any of our cinematic assets or portfolio items without our explicit written consent. Our work is our livelihood; please respect the copyright of our digital creations.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              3. Project Inquiries & Quotes
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              Submitting a request through our &quot;Get a Quote&quot; forms does not constitute a binding contract. Any project proposals, strategy frameworks, or pricing estimates provided by our team are subject to final agreement via a formalized production contract signed by both parties. We reserve the right to decline project requests that do not align with our current capacity or agency direction.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              4. No Guarantee of Business Results
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              While we produce high-end content designed to elevate your brand and drive conversions, marketing is a dynamic field. CINMACH Productions does not make any absolute guarantees regarding specific financial returns, immediate revenue growth, or specific social media metric increases resulting directly from the use of our visual assets.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              5. Limitation of Liability
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              CINMACH Productions shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use of this website, any interruptions to the website&apos;s availability, or your reliance on any information provided on the site.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              6. Contact & Legal
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-6">
              If you have any questions or concerns regarding these terms, please contact us directly:
            </p>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mt-8 inline-block">
              <p className="text-white/80 font-mono text-[12px] tracking-widest uppercase mb-2">Legal Team</p>
              <a href="mailto:contact@cinmachproductions.com" className="text-white text-lg hover:text-[#9A0E1F] transition-colors">
                contact@cinmachproductions.com
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Reused global CTA to maintain visual consistency */}
      <CTASection />
    </main>
  );
}
