"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6 font-serif italic text-2xl">
                !
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
                Something went wrong
            </h2>
            <p className="text-lg text-foreground/60 max-w-md mx-auto mb-8">
                We encountered an error while trying to load this page. Our editorial team has been notified.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()}>Try again</Button>
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                    Return Home
                </Button>
            </div>
        </div>
    );
}
