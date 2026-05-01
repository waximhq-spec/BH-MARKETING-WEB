import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Cinmach Productions",
  description: "Insights, guides, and case studies on restaurant videography, food marketing, and cinematic video production in Bahrain.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
