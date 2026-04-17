"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="pt-32 pb-24 md:pb-36">
      <div className="container">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <p className="label mb-8">Contact</p>
          <h1
            className="text-[#EDEDED] font-black mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Let&apos;s make something.
          </h1>
          <p className="text-[#666] font-light" style={{ lineHeight: 1.8 }}>
            Tell us what you&apos;re working on. We&apos;ll get back to you within 48 hours.
          </p>
        </div>

        {/* Form + Info */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Form */}
          <div className="flex-1">
            {submitted ? (
              <div className="py-16">
                <p className="label-red mb-4">Message received</p>
                <p className="text-[#EDEDED] text-xl font-light">
                  Thank you. We&apos;ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label block mb-2">Name</label>
                    <input type="text" name="name" required placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="label block mb-2">Email</label>
                    <input type="email" name="email" required placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="label block mb-2">Project Type</label>
                  <select name="type">
                    <option value="">Select…</option>
                    <option value="real-estate">Real Estate Cinematics</option>
                    <option value="fb">Restaurant / F&amp;B</option>
                    <option value="brand-film">Brand Film</option>
                    <option value="photography">Photography</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="label block mb-2">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project…"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-8 py-3.5 border border-[#EDEDED]/20 text-[#EDEDED] text-[11px] tracking-[0.25em] uppercase hover:border-white hover:text-white transition-all duration-300"
                  >
                    Send Message →
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:w-72 shrink-0 flex flex-col gap-10">
            <div>
              <p className="label mb-3">Studio</p>
              <p className="text-[#888] text-sm font-light leading-relaxed">
                Cinmach Productions<br />
                Manama, Kingdom of Bahrain
              </p>
            </div>
            <div>
              <p className="label mb-3">WhatsApp</p>
              <a
                href="https://wa.me/97300000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] text-sm font-light hover:text-[#EDEDED] transition-colors"
              >
                +973 0000 0000 →
              </a>
            </div>
            <div>
              <p className="label mb-3">Email</p>
              <a
                href="mailto:hello@cinmach.com"
                className="text-[#888] text-sm font-light hover:text-[#EDEDED] transition-colors"
              >
                hello@cinmach.com →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
