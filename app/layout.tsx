import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ServiceWorkerUnregister from "@/components/ServiceWorkerUnregister";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/components/ModalContext";
import ProjectModal from "@/components/ProjectModal";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700", "900"],
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
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ModalProvider>
          <ServiceWorkerUnregister />
          <Navbar />
          <SmoothScroll>
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <ProjectModal />
          <BackToTop />
        </ModalProvider>
      </body>
    </html>
  );
}
