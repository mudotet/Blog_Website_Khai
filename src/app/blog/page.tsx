import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";

export const metadata = {
    title: "Journal | Aura",
    description: "Read our latest articles on design, architecture, and mindful living.",
};

export default async function BlogListingPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { author: true, categories: true },
    });

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto max-w-4xl px-4">
                    <header className="mb-16 border-b border-border pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-foreground">
                            The <span className="text-primary font-serif italic">Journal</span>
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl">
                            A collection of thoughts, tutorials, and perspectives.
                        </p>
                    </header>

                    <div className="space-y-16">
                        {posts.length === 0 ? (
                            <p className="text-foreground/50 italic">No articles published yet.</p>
                        ) : null}
                        {posts.map((post) => (
                            <article key={post.id} className="group flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-border/40 flex-shrink-0">
                                    {post.coverImage && (
                                        <Link href={`/blog/${post.slug}`}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        </Link>
                                    )}
                                </div>

                                <div className="flex-1 w-full flex flex-col pt-2">
                                    <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-primary font-semibold mb-3">
                                        {post.categories.length > 0 ? post.categories[0].name : "Article"}
                                        <span className="text-foreground/30">•</span>
                                        <time dateTime={post.createdAt.toISOString()} className="text-foreground/50">
                                            {formatDate(post.createdAt)}
                                        </time>
                                    </div>

                                    <Link href={`/blog/${post.slug}`}>
                                        <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors text-foreground">
                                            {post.title}
                                        </h2>
                                    </Link>

                                    {post.excerpt && (
                                        <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    )}

                                    <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden flex items-center justify-center text-[10px] font-bold">
                                                {post.author.name?.charAt(0) || "A"}
                                            </div>
                                            <span className="text-sm font-medium text-foreground">{post.author.name}</span>
                                        </div>
                                        <span className="text-xs text-foreground/50">{post.readingTime} min read</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
