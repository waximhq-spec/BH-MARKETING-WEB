import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GridOverlay from "@/components/GridOverlay";
import ServiceWorkerUnregister from "@/components/ServiceWorkerUnregister";
import SecurityLayer from "@/components/SecurityLayer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinmach Productions | High-End Cinematic Storytelling & Brand Strategy",
  description: "Bahrain's premier creative studio for luxury brand building and cinematic visuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-[#e5e5e5] relative">
        <ServiceWorkerUnregister />
        <SecurityLayer />
        <CustomCursor />
        <GridOverlay />
        <FilmGrain />
        {/* Global UI chrome — always visible across all pages */}
        <ScrollProgressBar />
        <BackToTop />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
