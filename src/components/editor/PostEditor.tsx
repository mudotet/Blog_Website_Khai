"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { savePost } from "@/app/admin/posts/actions";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";
import type { Post } from "@prisma/client";

interface PostEditorProps {
    post?: Post | null;
}

export function PostEditor({ post }: PostEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");
    const [excerpt, setExcerpt] = useState(post?.excerpt || "");
    const [loading, setLoading] = useState(false);

    const handleSave = async (isDraft: boolean) => {
        if (!title.trim() || !content.trim()) {
            alert("Title and content are required");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        if (post?.id) formData.append("id", post.id);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("excerpt", excerpt);
        formData.append("isDraft", isDraft.toString());

        try {
            await savePost(formData);
            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to save post.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/posts">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {post ? "Edit Post" : "New Post"}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => handleSave(true)}
                        disabled={loading}
                        className="gap-2"
                    >
                        <Save className="h-4 w-4" />
                        {loading ? "Saving..." : "Save Draft"}
                    </Button>
                    <Button
                        onClick={() => handleSave(false)}
                        disabled={loading}
                        className="gap-2"
                    >
                        <Send className="h-4 w-4" />
                        Publish
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                    </label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post title..."
                        className="text-lg font-semibold h-12"
                    />
                </div>

                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Excerpt (optional)
                    </label>
                    <textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="A short summary of the post..."
                        className="flex min-h-[80px] w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:placeholder:text-zinc-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Content
                    </label>
                    <div className="min-h-[500px]">
                        <RichTextEditor
                            content={content}
                            onChange={(html) => setContent(html)}
                            placeholder="Write your story..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
