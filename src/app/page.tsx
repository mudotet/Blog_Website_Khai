import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";

export default async function HomePage() {
  const featuredPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: { author: true },
  });

  const heroPost = featuredPosts[0];
  const morePosts = featuredPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
              Thoughts & <span className="text-primary font-serif italic">Perspectives</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light">
              Explore curated insights on design, architecture, and mindful living, written for the modern aesthete.
            </p>
          </div>

          {heroPost && (
            <Link href={`/blog/${heroPost.slug}`} className="group block mb-16">
              <div className="relative rounded-2xl overflow-hidden aspect-[21/9] bg-zinc-100 dark:bg-zinc-800 mb-8 w-full border border-border/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                {heroPost.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={heroPost.coverImage} alt={heroPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-400">
                    <span className="text-4xl text-primary/30 font-serif italic">Aura</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center gap-3 text-white/80 text-sm mb-3">
                    <time dateTime={heroPost.createdAt.toISOString()}>{formatDate(heroPost.createdAt)}</time>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {heroPost.readingTime} min read</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                    {heroPost.title}
                  </h2>
                  {heroPost.excerpt && (
                    <p className="text-white/80 line-clamp-2 max-w-2xl text-lg hidden sm:block">
                      {heroPost.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* More Posts */}
          {morePosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                <h3 className="text-2xl font-bold tracking-tight">Latest from the Journal</h3>
                <Link href="/blog" className="text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {morePosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="rounded-xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 mb-4 border border-border/40">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 text-zinc-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60 text-xs mb-2">
                      <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                    <h4 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h4>
                    {post.excerpt && (
                      <p className="text-foreground/70 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
