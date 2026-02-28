import Link from "next/link";
import { Button } from "../ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-2">
                        <span className="text-primary">✦</span> Aura
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/blog" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                            Journal
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                        <Link href="/admin">Dashboard</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/#subscribe">Subscribe</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
