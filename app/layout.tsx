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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
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
