import { getPost } from "../actions";
import { PostEditor } from "@/components/editor/PostEditor";
import { notFound } from "next/navigation";

export default async function EditPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.id);

    if (!post) {
        notFound();
    }

    return <PostEditor post={post} />;
}
