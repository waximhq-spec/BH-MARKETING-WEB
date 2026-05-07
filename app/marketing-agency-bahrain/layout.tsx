import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Agency in Bahrain | Cinmach Productions",
  description: "Searching for a premium marketing agency in Bahrain? Cinmach Productions specializes in high-end cinematography, post-production, and digital design. Enter our site to see our work.",
};

export default function MarketingAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
