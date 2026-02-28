import Link from "next/link";
import { getPosts, deletePost } from "./actions";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Posts</h1>
                    <p className="text-gray-500 mt-2">Manage your blog articles and publications.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10 sm:rounded-xl overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                    <thead className="bg-gray-50 dark:bg-zinc-900/50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Title</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-6 text-right w-32">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 pl-4 pr-3 text-center text-sm sm:pl-6">
                                    <div className="text-gray-500 dark:text-gray-400">No posts found. Create your first post!</div>
                                </td>
                            </tr>
                        ) : null}
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                    <div className="flex items-center">
                                        <div className="truncate max-w-xs md:max-w-md" title={post.title}>{post.title}</div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${post.published ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(post.createdAt)}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-6">
                                    <div className="flex items-center justify-end gap-2">
                                        {post.published && (
                                            <Button variant="ghost" size="icon" asChild title="View public page" className="text-gray-400 hover:text-primary">
                                                <Link href={`/blog/${post.slug}`} target="_blank">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                            <Link href={`/admin/posts/${post.id}`}>
                                                <Edit2 className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <form action={async () => {
                                            "use server";
                                            await deletePost(post.id);
                                        }}>
                                            <DeletePostButton />
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
