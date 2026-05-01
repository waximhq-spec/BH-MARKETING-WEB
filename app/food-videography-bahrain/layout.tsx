import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Videography Services in Bahrain | Cinmach Productions",
  description: "Specialized food videography services in Bahrain. We capture mouth-watering, cinematic food content for restaurants, brands, and social media in Manama.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
