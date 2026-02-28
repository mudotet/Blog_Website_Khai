"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/lib/utils";

export async function getCategoriesAndTags() {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
    const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
    return { categories, tags };
}

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    if (!name.trim()) return;

    const slug = generateSlug(name);

    try {
        await prisma.category.create({ data: { name, slug } });
        revalidatePath("/admin/taxonomy");
    } catch (error) {
        console.error(error); // Likely unique constraint
    }
}

export async function createTag(formData: FormData) {
    const name = formData.get("name") as string;
    if (!name.trim()) return;

    const slug = generateSlug(name);

    try {
        await prisma.tag.create({ data: { name, slug } });
        revalidatePath("/admin/taxonomy");
    } catch (error) {
        console.error(error); // Likely unique constraint
    }
}

export async function deleteCategory(id: string) {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/taxonomy");
}

export async function deleteTag(id: string) {
    await prisma.tag.delete({ where: { id } });
    revalidatePath("/admin/taxonomy");
}
