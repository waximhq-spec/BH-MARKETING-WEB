import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Cinmach Productions — Video Production Bahrain",
  description: "Cinematic content production for restaurants, real estate, fitness, hotels, e-commerce, and luxury brands. We create visuals that drive customers, bookings, and growth across Bahrain.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
