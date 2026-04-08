import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import GridOverlay from "@/components/GridOverlay";
import ServiceWorkerUnregister from "@/components/ServiceWorkerUnregister";
import SecurityLayer from "@/components/SecurityLayer";

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${inter.variable} antialiased bg-[#0b0b0b]`}>
      <body className="min-h-full flex flex-col font-sans text-[#e5e5e5] relative">
        <ServiceWorkerUnregister />
        <SecurityLayer />
        <GridOverlay />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
