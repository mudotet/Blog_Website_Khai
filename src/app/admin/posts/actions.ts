"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { generateSlug, calculateReadingTime } from "@/lib/utils";


export async function getPosts() {
    return await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: true },
    });
}

export async function getPost(id: string) {
    return await prisma.post.findUnique({
        where: { id },
    });
}

export async function savePost(formData: FormData) {
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const isDraft = formData.get("isDraft") === "true";

    // Actually we need to get authorId from session but for simple CMS where admin manages everything:
    // we'll get or create a default Admin user if none exists (since we use ENV for login).
    let author = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!author) {
        author = await prisma.user.create({
            data: {
                email: process.env.ADMIN_EMAIL || "admin@example.com",
                name: "Admin",
                role: "ADMIN",
            }
        });
    }

    const slug = generateSlug(title);
    const readingTime = calculateReadingTime(content);

    const data = {
        title,
        slug,
        content,
        excerpt,
        published: !isDraft,
        readingTime,
        authorId: author.id,
    };

    if (id) {
        await prisma.post.update({
            where: { id },
            data,
        });
    } else {
        // If slug exists, add random string
        const existing = await prisma.post.findUnique({ where: { slug } });
        if (existing) {
            data.slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
        }
        await prisma.post.create({ data });
    }

    revalidatePath("/admin/posts");
    revalidatePath("/");
    return;
}

export async function deletePost(id: string) {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/posts");
    revalidatePath("/");
}
