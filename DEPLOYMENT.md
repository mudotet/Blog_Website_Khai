# Aura CMS Deployment Guide

This blog platform is built with Next.js App Router, Prisma, and Tailwind CSS. It is fully production-ready and optimized for deployment on Vercel.

## 1. Prerequisites
- A GitHub repository containing this codebase.
- A Vercel account (free tier works great).
- A Supabase account (or any Postgres hosting) for production database.

## 2. Setting Up the Production Database
For local development, we used SQLite. For production on Vercel, it is recommended to use PostgreSQL since serverless environments work better with remote connection pools.

1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Go to Project Settings -> Database.
3. Copy the **Connection String (URI)**. It should look like: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`. Make sure you use the pooled connection string (usually port 6543) if using IPv4.

**Important Database Schema Update for Postgres:**
Before deploying, open `prisma/schema.prisma` and update the `datasource` block to use postgresql:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // Add this for Supabase migrations
}
```
And add `DIRECT_URL` to your Vercel env pointing to the direct connection string (port 5432).

## 3. Deploying to Vercel
1. Push this codebase to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Open the **Environment Variables** section and add the following:
   - `DATABASE_URL`: Your pooled Supabase connection string.
   - `DIRECT_URL`: Your direct Supabase connection string for Prisma migrations.
   - `NEXTAUTH_URL`: The URL of your Vercel deployment (e.g., `https://my-blog.vercel.app`).
   - `NEXTAUTH_SECRET`: A long random string. You can generate one by running `openssl rand -base64 32` in terminal.
   - `ADMIN_EMAIL`: Your secure admin email address for the CMS login.
   - `ADMIN_PASSWORD`: Your secure admin password for the CMS login.

## 4. Run Migrations on Production
Because Vercel builds the app, you need to ensure the database schema is pushed to Supabase. Next.js `build` command does not push DB migrations automatically unless configured.

To set up the production database from your local machine:
1. Temporarily replace the local `.env` values with your Supabase credentials.
2. Run `npx prisma db push` or `npx prisma migrate deploy` to create the tables in Supabase.
3. Then trigger a redeploy on Vercel.

Your luxury blog platform is now live!
