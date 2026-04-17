import Link from "next/link";

const PROJECTS: Record<
  string,
  {
    title: string;
    category: string;
    year: string;
    description: string;
    hero: string;
    gallery: string[];
    tags: string[];
  }
> = {
  "dilmunia-waterfront": {
    title: "Dilmunia Waterfront Residences",
    category: "Real Estate",
    year: "2024",
    description:
      "A cinematic study of luxury coastal living. We captured the Dilmunia Waterfront Residences from dawn to dusk — drone sweeps over the sea, intimate interior moments, and the golden hour light that makes this project unlike any other.",
    hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=75",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=75",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=75",
    ],
    tags: ["Drone", "HDR", "Interior", "4K"],
  },
  "palm-villa-al-areen": {
    title: "The Palm Villa — Al Areen",
    category: "Real Estate",
    year: "2024",
    description:
      "Twilight cinematics for an ultra-luxury villa in Al Areen. Every shot captures the interplay between architecture and desert light.",
    hero: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=75",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=75",
    ],
    tags: ["Aerial", "Twilight", "4K"],
  },
  "seef-district-tower": {
    title: "Seef District Tower",
    category: "Real Estate",
    year: "2023",
    description:
      "City-living redefined. A slow-motion study of one of Bahrain's most prominent commercial towers.",
    hero: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=75",
    ],
    tags: ["Interior", "Slow Motion"],
  },
  "khaleej-co": {
    title: "Khaleej & Co.",
    category: "F&B",
    year: "2024",
    description:
      "A brand film for Bahrain's most iconic café chain. We brought the warmth of Khaleeji culture into motion — rich textures, steam rising, intimate moments over coffee.",
    hero: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=75",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=75",
    ],
    tags: ["Food Motion", "Brand Film", "Editorial"],
  },
  "flame-and-salt": {
    title: "Flame & Salt",
    category: "F&B",
    year: "2023",
    description:
      "Colour-graded food cinematics built around texture, heat, and appetite. Shot in slow motion to let every drop and char read on screen.",
    hero: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=75",
    ],
    tags: ["Texture", "Colour Graded"],
  },
  "zafran-house": {
    title: "Zafran House",
    category: "F&B",
    year: "2023",
    description:
      "A full identity rollout — from brand film to motion graphics for social. Zafran House is a modern take on the traditional Khaleeji dining experience.",
    hero: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=75",
    ],
    tags: ["Identity", "Motion"],
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <div className="pt-32 pb-24 container">
        <p className="text-[#666]">Project not found.</p>
        <Link href="/work" className="label mt-4 inline-block hover:text-[#EDEDED] transition-colors">
          ← Back to Work
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero image — full width */}
      <div className="w-full bg-[#111] overflow-hidden" style={{ aspectRatio: "16/7" }}>
        <img
          src={project.hero}
          alt={project.title}
          width={1800}
          height={788}
          className="w-full h-full object-cover"
          style={{ aspectRatio: "16/7" }}
        />
      </div>

      {/* Project info */}
      <div className="container pt-12 pb-24 md:pb-36">
        <Link
          href="/work"
          className="label inline-block mb-10 hover:text-[#EDEDED] transition-colors"
        >
          ← Work
        </Link>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-20">
          {/* Title */}
          <div className="flex-1">
            <h1
              className="text-[#EDEDED] font-black"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {project.title}
            </h1>
          </div>

          {/* Meta */}
          <div className="md:w-72 shrink-0 flex flex-col gap-6">
            <div>
              <p className="label mb-1.5">Category</p>
              <p className="text-[#EDEDED] text-sm">{project.category}</p>
            </div>
            <div>
              <p className="label mb-1.5">Year</p>
              <p className="text-[#EDEDED] text-sm">{project.year}</p>
            </div>
            <div>
              <p className="label mb-1.5">Services</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase text-[#888] border border-white/10 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-2xl mb-20">
          <p
            className="text-[#888] font-light"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.8 }}
          >
            {project.description}
          </p>
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="flex flex-col gap-4">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="w-full bg-[#111] overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={img}
                  alt={`${project.title} — ${i + 1}`}
                  width={1200}
                  height={675}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom nav */}
        <div
          className="mt-20 flex justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "2rem" }}
        >
          <Link href="/work" className="label hover:text-[#EDEDED] transition-colors">← All Projects</Link>
          <Link href="/estimate" className="label hover:text-[#EDEDED] transition-colors">Start a project →</Link>
        </div>
      </div>
    </div>
  );
}
