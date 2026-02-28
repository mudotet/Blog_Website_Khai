import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                // Hardcode an admin super-user from ENV for first-time access without DB seed
                // This makes it "production ready" and easily accessible out of the box.
                const isAdminEnvMatch =
                    credentials.email === process.env.ADMIN_EMAIL &&
                    credentials.password === process.env.ADMIN_PASSWORD;

                if (isAdminEnvMatch) {
                    return {
                        id: "admin-env",
                        email: process.env.ADMIN_EMAIL,
                        name: "Administrator",
                        role: "ADMIN",
                    };
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || user.role !== "ADMIN") {
                    throw new Error("Unauthorized access");
                }

                // Note: For actual DB users, you would need a password field in your schema
                // Or handle OAuth. Since the client only needs Admin access for CMS, 
                // the ENV check above is often sufficient. If DB users are needed, 
                // we would compare password hashes. Since we did not add password to User model,
                // we'll rely on the pure ENV admin or OAuth.

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/admin/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
