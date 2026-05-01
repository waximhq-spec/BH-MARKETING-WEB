import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceWorkerUnregister from "@/components/ServiceWorkerUnregister";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/components/ModalContext";
import ProjectModal from "@/components/ProjectModal";
import BackToTop from "@/components/BackToTop";
import SecurityLayer from "@/components/SecurityLayer";
import ScrollToTop from "@/components/ScrollToTop";

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
  title: "Cinmach Productions | Cinematic Brand Studio — Bahrain",
  description: "A cinematic creative studio based in Bahrain, crafting high-end visual stories for luxury brands.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cinmach Productions",
  "url": "https://cinmach.com",
  "logo": "https://cinmach.com/logo.png",
  "description": "Cinematic content production for restaurants, cafés, and luxury brands in Bahrain.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Manama",
    "addressCountry": "BH"
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
          <Navbar />
          <SmoothScroll>
            <ScrollToTop />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <ProjectModal />
          <BackToTop />
          <SecurityLayer />
        </ModalProvider>
      </body>
    </html>
  );
}
