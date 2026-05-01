import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function BlogListingPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen text-white pt-32 pb-24">
      <div className="container max-w-5xl mx-auto px-6">
        <header className="mb-20 border-b border-white/10 pb-12">
          <h1 className="font-black text-5xl md:text-7xl tracking-tighter leading-none mb-6">
            THE <span className="text-[#B11226]">JOURNAL.</span>
          </h1>
          <p className="text-white/50 text-xl font-light max-w-2xl">
            Insights, strategies, and case studies on cinematic video production and restaurant marketing in Bahrain.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group border border-white/5 bg-white/[0.02] p-8 md:p-12 hover:bg-white/[0.04] transition-colors duration-500">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest text-[#B11226] uppercase mb-6 font-bold">
                <time dateTime={post.publishDate}>{post.publishDate}</time>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{post.readTime}</span>
              </div>
              
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-[#B11226] transition-colors duration-300">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-3xl">
                {post.excerpt}
              </p>
              
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-4 text-sm font-mono tracking-[0.2em] uppercase font-bold text-white hover:text-[#B11226] transition-colors"
              >
                Read Article <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
