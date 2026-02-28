import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background py-12 md:py-16">
            <div className="container mx-auto max-w-6xl px-4 text-center">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tighter">
                        <span className="text-primary">✦</span> Aura
                    </Link>
                </div>
                <p className="text-foreground/60 max-w-sm mx-auto text-sm mb-8">
                    A premium editorial experience focused on design, architecture, and mindful living.
                </p>
                <div className="flex justify-center gap-6 mb-8">
                    <Link href="#" className="text-foreground/40 hover:text-primary transition-colors">Twitter</Link>
                    <Link href="#" className="text-foreground/40 hover:text-primary transition-colors">Instagram</Link>
                    <Link href="#" className="text-foreground/40 hover:text-primary transition-colors">LinkedIn</Link>
                </div>
                <div className="text-xs text-foreground/40">
                    © {new Date().getFullYear()} Aura Published. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
