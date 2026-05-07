import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden text-black/80 dark:text-white/80 selection:bg-[#ff2a2a]/30 selection:text-white">
        
        {/* Global Cinematic Noise */}
        <div 
          className="fixed inset-0 z-[9999] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <ModalProvider>
          <ServiceWorkerUnregister />
          <div className="fixed top-0 left-0 right-0 z-[100]">
            <AnnouncementBanner />
            <Navbar />
          </div>
          <SmoothScroll>
            <ScrollToTop />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <ProjectModal />
          <SecurityLayer />
          <BackToTop />
        </ModalProvider>
      </body>
    </html>
  );
}
