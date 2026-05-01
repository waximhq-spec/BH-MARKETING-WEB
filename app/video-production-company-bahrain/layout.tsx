import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Production Company Bahrain | Cinmach Productions",
  description: "Cinmach Productions is a premium video production company in Bahrain. We specialize in cinematic brand films, corporate videos, and high-end social media content.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
