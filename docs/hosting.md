# Hosting CampusAid with Render + Supabase

The local app uses SQLite for development. Before deploying, switch the Prisma datasource to PostgreSQL as described below. Supabase provides the database and Render runs the Next.js web service continuously.

## 1. Create the Supabase database

1. Go to `supabase.com`, create an account, and create a new project.
2. Choose a strong database password and select a region near your users.
3. Open **Project Settings → Database → Connection string**.
4. Copy the **Transaction pooler** URI for `DATABASE_URL`.
5. Copy the **Session pooler** URI for `DIRECT_URL`.
6. Replace the password placeholders and URL-encode special password characters. For example, `@` becomes `%40`.

Before the first production deploy, edit `prisma/schema.prisma`:

```prisma
datasource db {
	provider  = "postgresql"
	url       = env("DATABASE_URL")
	directUrl = env("DIRECT_URL")
}
```

Use this shape:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-REGION.pooler.supabase.com:5432/postgres"
```

`DATABASE_URL` uses the transaction pooler on port `6543` for the running app. `DIRECT_URL` uses the session pooler on port `5432` for Prisma schema operations. The session pooler avoids the IPv6 connectivity problem that can cause Render error `P1001` with the `db.PROJECT_REF.supabase.co` host.

In Supabase, choose **Session pooler**, not **Direct connection**, when copying the second URL. The host should end in `.pooler.supabase.com`, not `db.PROJECT_REF.supabase.co`.

## 2. Prepare the repository

From the project directory:

```powershell
npm install
Copy-Item .env.example .env
```

Put your Supabase URLs in `.env`, then create the tables:

```powershell
npm run db:push
npm run db:generate
npm run build
```

The database starts empty. Create the first account through `/signup`.

For later schema changes, use a development database and create migrations:

```powershell
npm run db:migrate -- --name describe_your_change
```

Commit the generated `prisma/migrations` files. Do not put database passwords in GitHub.

## 3. Push the code to GitHub

1. Create a private GitHub repository.
2. Commit the CampusAid project.
3. Push the repository to GitHub.
4. Confirm `.env` and `.env.local` are ignored by Git.

## 4. Create the Render web service

1. Go to `render.com` and choose **New → Web Service**.
2. Connect the GitHub repository.
3. Select the project root directory.
4. Use these settings:

```text
Environment: Node
Build Command: npm install && npm run db:push && npm run build
Start Command: npm run start
```

5. Choose a paid Render instance for reliable always-on production uptime. Free instances can spin down after inactivity and are not suitable for a 24/7 marketplace.
6. Add these Render environment variables:

```text
DATABASE_URL=your Supabase transaction pooler URL
DIRECT_URL=your Supabase session pooler URL on port 5432
SESSION_SECRET=a-long-random-secret
INITIAL_ADMIN_EMAIL=the-email-that-should-own-first-admin-access
NODE_ENV=production
```

For the first admin account, set `INITIAL_ADMIN_EMAIL` to the exact email address before that user signs up or logs in. In your current setup, use the email you want to own administration. After login, open `/admin`; that account can promote or demote other registered users with one click. Keep `SESSION_SECRET` private and rotate it if it is ever exposed.

7. Click **Create Web Service**.
8. Wait for the first deploy to finish and open the generated `onrender.com` URL.

## 5. Add a custom domain and HTTPS

1. In Render, open **Settings → Custom Domains**.
2. Add your domain.
3. Add the DNS record Render provides at your domain registrar.
4. Wait for DNS verification. Render provisions HTTPS automatically.

## 6. Supabase production checklist

- Enable database backups and review the retention period.
- Add Row Level Security if the browser ever talks directly to Supabase.
- Keep all Prisma queries server-side through Next.js API routes.
- Never expose `DIRECT_URL` or database credentials to client code.
- Add Supabase Auth or a proper session system before treating login as production authentication.

## 7. 24/7 operations checklist

- Use a paid Render instance to avoid free-tier sleeping.
- Add a Render health check path such as `/`.
- Set up Render deploy notifications.
- Monitor Supabase database size, connections, and backups.
- Add a real email provider for notifications.
- Add object storage for attachments; do not store uploads on Render’s local filesystem.
- Add verified payment webhooks before enabling wallet withdrawals.
- Test signup, login, task creation, college filtering, offers, disputes, and payment recovery after deployment.
