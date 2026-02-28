import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        let variantStyles = "bg-primary text-white hover:bg-primary-hover shadow-sm";

        if (variant === "outline") {
            variantStyles = "border border-border bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground";
        } else if (variant === "ghost") {
            variantStyles = "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-foreground";
        }

        let sizeStyles = "h-10 px-4 py-2";
        if (size === "sm") sizeStyles = "h-9 rounded-md px-3 text-xs";
        if (size === "lg") sizeStyles = "h-11 rounded-md px-8";
        if (size === "icon") sizeStyles = "h-10 w-10";

        return (
            <Comp
                ref={ref}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantStyles} ${sizeStyles} ${className}`}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
