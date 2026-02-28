import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await prisma.post.findUnique({
        where: { slug: resolvedParams.slug },
    });

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: `${post.title} | Aura`,
        description: post.excerpt || `Read ${post.title} on Aura.`,
        openGraph: {
            title: post.title,
            description: post.excerpt || "",
            type: "article",
            publishedTime: post.createdAt.toISOString(),
            authors: [post.authorId],
        },
    };
}

// Simple TOC extractor
function extractTOC(html: string) {
    const toc: { id: string, text: string, level: number }[] = [];
    const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
    let match;

    while ((match = regex.exec(html)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2].replace(/<[^>]+>/g, ''); // strip internal tags
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        toc.push({ id, text, level });
    }
    return toc;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await prisma.post.findUnique({
        where: { slug: resolvedParams.slug },
        include: { author: true, tags: true },
    });

    if (!post || !post.published) {
        notFound();
    }

    const toc = extractTOC(post.content);

    // Basic injection of IDs into headers for TOC linking
    let contentHtml = post.content;
    toc.forEach(item => {
        const searchRegex = new RegExp(`(<h${item.level}[^>]*)>(.*?${item.text}.*?<\/h${item.level}>)`, 'i');
        contentHtml = contentHtml.replace(searchRegex, `$1 id="${item.id}">$2`);
    });

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
            <Navbar />

            <main className="flex-1">
                <article className="py-16 md:py-24">
                    <div className="container mx-auto max-w-3xl px-4 text-center mb-16">
                        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold mb-6">
                            <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
                            <span>•</span>
                            <span>{post.readingTime} min read</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                                {post.excerpt}
                            </p>
                        )}

                        <div className="flex items-center justify-center gap-3 mt-8 pt-8 border-t border-border w-48 mx-auto">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-bold">
                                {post.author.name?.charAt(0)}
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-foreground">{post.author.name}</div>
                                <div className="text-xs text-foreground/50">Editor</div>
                            </div>
                        </div>
                    </div>

                    {post.coverImage && (
                        <div className="container mx-auto max-w-5xl px-4 flex justify-center mb-16">
                            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-border/30">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    )}

                    <div className="container mx-auto max-w-6xl px-4 flex flex-col lg:flex-row gap-12 items-start relative">
                        {/* Table of Contents sidebar */}
                        {toc.length > 0 && (
                            <aside className="hidden lg:block w-64 sticky top-32 flex-shrink-0">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50 mb-4">In this article</h4>
                                <nav className="flex flex-col space-y-3 border-l border-border pl-4">
                                    {toc.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={`#${item.id}`}
                                            className={`text-sm text-foreground/60 hover:text-primary transition-colors line-clamp-2 ${item.level === 3 ? 'ml-4 inline-flex items-center before:content-["-"] before:mr-2 before:opacity-50' : ''}`}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </aside>
                        )}

                        {/* Main Content */}
                        <div className="flex-1 w-full max-w-3xl mx-auto">
                            <div
                                className="prose dark:prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-hover prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: contentHtml }}
                            />

                            {post.tags.length > 0 && (
                                <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-2">
                                    <span className="text-sm font-semibold text-foreground/50 mr-2 flex items-center">Tags:</span>
                                    {post.tags.map(tag => (
                                        <span key={tag.id} className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
