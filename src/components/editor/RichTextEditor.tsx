"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Toolbar } from "./Toolbar";
import { useEffect } from "react";

interface RichTextEditorProps {
    content: string;
    onChange: (html: string, plainText: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "rounded-lg max-w-full h-auto mx-auto my-4",
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-primary hover:text-primary-hover underline cursor-pointer",
                },
            }),
            Underline,
        ],
        content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-foreground",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML(), editor.getText());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            // Small check to avoid cursor jumping
            // editor.commands.setContent(content, false)
        }
    }, [content, editor]);

    return (
        <div className="border border-border rounded-md shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} className="bg-transparent" />
        </div>
    );
}
