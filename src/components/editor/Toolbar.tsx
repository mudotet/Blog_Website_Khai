"use client";

import { Editor } from "@tiptap/react";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Image as ImageIcon,
    Link as LinkIcon,
    Undo,
    Redo,
} from "lucide-react";
import { Button } from "../ui/button";

interface ToolbarProps {
    editor: Editor | null;
}

export function Toolbar({ editor }: ToolbarProps) {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt("Enter image URL:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) return;

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-zinc-50 dark:bg-zinc-800/50 rounded-t-md">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <Bold size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <Italic size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive("underline") ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <UnderlineIcon size={16} />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <Heading1 size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive("heading", { level: 2 }) ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <Heading2 size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive("heading", { level: 3 }) ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <Heading3 size={16} />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <List size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <ListOrdered size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <Quote size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "bg-zinc-200 dark:bg-zinc-700" : ""}
                type="button"
            >
                <Code size={16} />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button variant="ghost" size="sm" onClick={setLink} type="button" className={editor.isActive("link") ? "bg-zinc-200 dark:bg-zinc-700" : ""}>
                <LinkIcon size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={addImage} type="button">
                <ImageIcon size={16} />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} type="button">
                <Undo size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} type="button">
                <Redo size={16} />
            </Button>
        </div>
    );
}
