export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col pt-32 px-4 container mx-auto max-w-6xl animate-pulse">
            {/* Header Skeleton */}
            <div className="h-12 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-6" />
            <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-16" />

            {/* Grid of cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        <div className="w-full aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                        <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
}
