import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Videography in Bahrain | Cinmach Productions",
  description: "Professional restaurant videography services in Bahrain. We create cinematic food videos and social media content for cafés and restaurants in Manama.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
