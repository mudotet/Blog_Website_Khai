import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // Only require auth for /admin routes
            if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
                return token?.role === "ADMIN";
            }
            return true; // Other routes are public
        },
    },
    pages: {
        signIn: "/admin/login",
    },
});

export const config = {
    matcher: ["/admin/:path*"],
};
