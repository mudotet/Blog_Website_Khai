import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
    title: "About | Aura",
    description: "Learn more about Aura and our editorial mission.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto max-w-3xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 text-foreground">
                        About <span className="text-primary font-serif italic">Aura</span>
                    </h1>
                    <div className="prose dark:prose-invert prose-lg mx-auto text-left leading-relaxed text-foreground/80">
                        <p>
                            Aura is a premium editorial platform designed to elevate the reading and writing experience.
                            We believe that content should not only be insightful but also beautifully presented.
                            Our mission is to provide a serene, distraction-free environment for modern aesthetes, designers, and thinkers.
                        </p>
                        <p>
                            Whether you are here to explore perspectives on architecture, mindful living, or digital design,
                            Aura offers a curated space to engage with ideas that matter.
                        </p>
                        <h2 className="text-2xl font-bold mt-12 mb-6">Our Philosophy</h2>
                        <p>
                            We prioritize typography, whitespace, and a harmonious color palette to create a digital sanctuary.
                            Every article published on Aura is treated with the care of a printed magazine, ensuring that
                            both the author&apos;s voice and the reader&apos;s attention are respected.
                        </p>
                        <p className="mt-12 text-center text-primary font-serif italic text-xl">
                            &quot;Design is the silent ambassador of your brand.&quot;
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
