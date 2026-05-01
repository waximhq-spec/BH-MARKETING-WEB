import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Cinmach Productions`,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen text-black pt-32 pb-24">
      <article className="container max-w-3xl mx-auto px-6">
        
        {/* HEADER */}
        <header className="mb-16 border-b border-black/10 pb-12">
          <div className="flex items-center gap-4 text-[#B11226] font-mono tracking-widest text-[10px] uppercase font-bold mb-6">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span className="w-1 h-1 bg-[#B11226] rounded-full" />
            <time dateTime={post.publishDate}>{post.publishDate}</time>
            <span className="w-1 h-1 bg-[#B11226] rounded-full" />
            <span>{post.readTime}</span>
          </div>
          
          <h1 className="font-black text-4xl md:text-6xl tracking-tighter leading-[1.1] mb-8">
            {post.title}
          </h1>
          
          <p className="text-black/50 text-xl font-light leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* CONTENT */}
        <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[#B11226] prose-a:no-underline hover:prose-a:underline marker:text-[#B11226]">
          {post.content.map((block, index) => {
            switch (block.type) {
              case "h2":
                return <h2 key={index}>{block.text}</h2>;
              case "h3":
                return <h3 key={index}>{block.text}</h3>;
              case "p":
                if (block.html) {
                  return <p key={index} dangerouslySetInnerHTML={{ __html: block.html }} />;
                }
                return <p key={index}>{block.text}</p>;
              case "ul":
                return (
                  <ul key={index}>
                    {block.items?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* FOOTER */}
        <footer className="mt-24 pt-12 border-t border-black/10">
          <div className="bg-[#FAFAFA] p-8 rounded-sm">
            <h4 className="font-bold text-xl mb-4">Ready to elevate your brand?</h4>
            <p className="text-black/60 mb-6">Cinmach Productions is Bahrain's premier cinematic video agency. We help restaurants and brands turn views into physical footfall.</p>
            <Link 
              href="/restaurant-videography-bahrain"
              className="inline-block px-8 py-4 bg-black text-white text-[11px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-[#B11226] transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </footer>

      </article>
    </main>
  );
}
