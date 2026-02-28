import { getCategoriesAndTags, createCategory, createTag, deleteCategory, deleteTag } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export default async function TaxonomyPage() {
    const { categories, tags } = await getCategoriesAndTags();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Categories & Tags</h1>
                <p className="text-gray-500 mt-2">Organize your content effectively.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Categories Section */}
                <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Categories</h2>

                    <form action={createCategory} className="flex gap-2 mb-6">
                        <Input name="name" placeholder="New category name..." required />
                        <Button type="submit">Add</Button>
                    </form>

                    <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {categories.length === 0 && <li className="py-4 text-sm text-gray-500">No categories yet.</li>}
                        {categories.map((c) => (
                            <li key={c.id} className="flex items-center justify-between py-3">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{c.name} <span className="text-gray-400 font-normal">({c.slug})</span></span>
                                <form action={async () => { "use server"; await deleteCategory(c.id) }}>
                                    <Button variant="ghost" size="icon" type="submit" className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tags Section */}
                <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Tags</h2>

                    <form action={createTag} className="flex gap-2 mb-6">
                        <Input name="name" placeholder="New tag name..." required />
                        <Button type="submit">Add</Button>
                    </form>

                    <ul className="divide-y divide-gray-100 dark:divide-zinc-800">
                        {tags.length === 0 && <li className="py-4 text-sm text-gray-500">No tags yet.</li>}
                        {tags.map((t) => (
                            <li key={t.id} className="flex items-center justify-between py-3">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">{t.name} <span className="text-gray-400 font-normal">({t.slug})</span></span>
                                <form action={async () => { "use server"; await deleteTag(t.id) }}>
                                    <Button variant="ghost" size="icon" type="submit" className="text-gray-400 hover:text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
