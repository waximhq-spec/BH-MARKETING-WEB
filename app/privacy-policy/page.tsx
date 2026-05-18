"use client";

import CTASection from "@/components/CTASection";
import PageBgSync from "@/components/PageBgSync";

export default function PrivacyPolicyPage() {
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
            PRIVACY POLICY.
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
              At CINMACH Productions, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or inquire about our creative services.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              1. Information We Collect
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-6">
              We keep things simple. We only collect information that you voluntarily provide to us when you:
            </p>
            <ul className="list-none space-y-3 mb-10 pl-2">
              <li className="flex items-start gap-3 text-white/60 text-[15px] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] mt-2 flex-shrink-0" />
                Fill out our contact or project inquiry forms.
              </li>
              <li className="flex items-start gap-3 text-white/60 text-[15px] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] mt-2 flex-shrink-0" />
                Communicate with us via email or WhatsApp.
              </li>
              <li className="flex items-start gap-3 text-white/60 text-[15px] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] mt-2 flex-shrink-0" />
                Schedule a strategy call or request a custom proposal.
              </li>
            </ul>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              This information typically includes your name, email address, phone number, company name, and details about your brand or project goals.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              2. How We Use Your Information
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-6">
              The information you provide is used exclusively to evaluate your project needs and communicate with you effectively. Specifically, we use it to:
            </p>
            <ul className="list-none space-y-3 mb-12 pl-2">
              <li className="flex items-start gap-3 text-white/60 text-[15px] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] mt-2 flex-shrink-0" />
                Respond to your inquiries and provide accurate quotes.
              </li>
              <li className="flex items-start gap-3 text-white/60 text-[15px] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] mt-2 flex-shrink-0" />
                Deliver the creative services you have requested.
              </li>
              <li className="flex items-start gap-3 text-white/60 text-[15px] font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A0E1F] mt-2 flex-shrink-0" />
                Send important updates regarding your project timeline or deliverables.
              </li>
            </ul>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              3. Analytics & Cookies
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              We may use basic, non-intrusive analytics tools to understand general website traffic and improve our user experience. These tools may use essential cookies. We do not use heavy, invasive third-party ad tracking pixels to monitor your browsing behavior across the internet.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              4. Data Protection & Sharing
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-12">
              Your trust is our priority. We implement reasonable security measures to protect your submitted information from unauthorized access. We do not sell, trade, or rent your personal data to outside parties or marketing agencies under any circumstances.
            </p>

            <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight uppercase mb-6 mt-16">
              5. Contact Us
            </h2>
            <p className="text-white/60 text-[15px] leading-[1.8] font-light mb-6">
              If you have any questions regarding this Privacy Policy or how we handle your project details, please reach out to our team:
            </p>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mt-8 inline-block">
              <p className="text-white/80 font-mono text-[12px] tracking-widest uppercase mb-2">Email</p>
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
