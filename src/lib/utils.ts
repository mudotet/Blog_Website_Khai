import slugify from "slugify";

export function generateSlug(title: string): string {
    return slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    });
}

export function calculateReadingTime(text: string): number {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time === 0 ? 1 : time;
}

export function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}
