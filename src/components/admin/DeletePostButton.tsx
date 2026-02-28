"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function DeletePostButton() {
    return (
        <Button
            variant="ghost"
            size="icon"
            type="submit"
            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            title="Delete post"
            onClick={(e) => {
                if (!confirm("Are you sure you want to delete this post?")) {
                    e.preventDefault();
                }
            }}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
