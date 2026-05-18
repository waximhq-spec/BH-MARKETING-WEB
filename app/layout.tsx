import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceWorkerUnregister from "@/components/ServiceWorkerUnregister";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/components/ModalContext";
import ProjectModal from "@/components/ProjectModal";
import SecurityLayer from "@/components/SecurityLayer";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/components/BackToTop";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CalEmbed from "@/components/CalEmbed";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cinmach Productions | Premium Creative & Marketing Agency in Bahrain",
  description: "Cinmach Productions is Bahrain's premier creative marketing agency specializing in cinematic food & hospitality content, real estate shoots, gym promos, and hotel visuals. Book your shoot in Bahrain today.",
  openGraph: {
    title: "Cinmach Productions | Premium Creative & Marketing Agency in Bahrain",
    description: "Cinmach Productions is Bahrain's premier creative marketing agency specializing in cinematic food & hospitality content, real estate shoots, gym promos, and hotel visuals.",
    url: "https://cinmachproductions.com",
    siteName: "Cinmach Productions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cinmach Productions | Premium Creative & Marketing Agency in Bahrain",
    description: "Cinmach Productions is Bahrain's premier creative marketing agency specializing in cinematic food & hospitality content, real estate shoots, gym promos, and hotel visuals.",
  },
  keywords: [
    "Cinmach Productions",
    "Cinmach",
    "Marketing agency in Bahrain",
    "Creative agency in Bahrain",
    "Video production Bahrain",
    "Shoot in Bahrain",
    "Food cinematography Bahrain",
    "Real estate videography Bahrain",
    "Gym promo videos Bahrain",
    "Cinematic brand production",
    "Manama creative studio"
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["VideoProductionCompany", "MarketingAgency"],
  "name": "Cinmach Productions",
  "url": "https://cinmachproductions.com",
  "logo": "https://cinmachproductions.com/logo.png",
  "description": "Cinmach Productions is Bahrain's premier creative marketing agency specializing in cinematic food & hospitality content, real estate shoots, gym promos, and hotel visuals.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Manama",
    "addressCountry": "BH"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Bahrain"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Creative Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Food & Hospitality Cinematography"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Real Estate & Spaces Video Coverage"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Gyms & Fitness Promos"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hotels & Resorts Visuals"
        }
      }
    ]
  },
  "sameAs": [
    "https://instagram.com/cinmach",
    "https://linkedin.com/company/cinmach"
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col text-black/80 dark:text-white/80 selection:bg-[#ff2a2a]/30 selection:text-white">
        <ModalProvider>
          <ServiceWorkerUnregister />
          {/* ── ISOLATED STICKY HEADER
              Direct child of ModalProvider (for context access),
              but NOT inside SmoothScroll or any overflow:hidden/transform wrapper.
              This is the correct pattern for sticky + context access. */}
          <div id="header-root" className="sticky top-0 z-[100]" style={{ contain: "layout style" }}>
            <AnnouncementBanner />
            <Navbar />
          </div>

          {/* Main content wrapper — overflow-x is handled at html level in globals.css,
              NOT here. overflow:hidden on any ancestor breaks position:sticky children. */}
          <div className="flex-1">
            <SmoothScroll>
              <ScrollToTop />
              {children}
              <Footer />
            </SmoothScroll>
          </div>

          <ProjectModal />
          <SecurityLayer />
          <BackToTop />
          <CalEmbed />
        </ModalProvider>
      </body>
    </html>
  );
}
