"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Tags, LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Categories & Tags", href: "/admin/taxonomy", icon: Tags },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Don't show sidebar on login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex dark:bg-zinc-950">
            <div className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Aura CMS
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                <item.icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-500"
                                        }`}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="group flex w-full items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                        <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                        Sign out
                    </button>
                </div>
            </div>
            <main className="flex-1 overflow-y-auto w-full">
                <div className="p-8 max-w-6xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
