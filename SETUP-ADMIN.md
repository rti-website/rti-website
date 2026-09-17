# RTI Publisher — setup

The admin lives at **`/admin`** in this same project. It needs PostgreSQL; the
public site does not, and nothing below changes how the site builds or deploys.

Four steps, about ten minutes.

---

## 1. Install PostgreSQL

Open **PowerShell** and run:

```powershell
winget install -e --id PostgreSQL.PostgreSQL.18
```

The installer asks you to set a password for the **postgres** user.
**Write it down** — step 2 needs it.

*(Installer instead, if you prefer: <https://www.postgresql.org/download/windows/>)*

Already have PostgreSQL? Skip this. The setup script looks in
`C:\Program Files\PostgreSQL\` as well as on PATH, so it will find an existing
install even though the installer usually does not add `psql` to PATH.

## 2. Create `.env.local`

In the project folder, copy `.env.example` to `.env.local` and fill in two lines:

```
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/rti_admin
ADMIN_SESSION_SECRET=paste-a-long-random-string-here
```

`YOUR_PASSWORD` is the one from step 1. For the secret, run:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`.env.local` is git-ignored. It never leaves your machine.

## 3. Set up the database

```powershell
npm install
npm run db:setup
```

It creates the database, applies the schema, loads the ten blog categories and
the six social-link slots, imports the 301s already in `data/url-map.csv`, and
asks you to create the first administrator account.

If you would rather not be prompted:

```powershell
npm run db:setup -- --email you@recycletechnologies.com --name "Your Name" --password "a good password"
```

Safe to run again any time — it only applies what is missing.

**Optional:** `npm run db:seed` puts four sample posts, some subscribers and a
few enquiries in, so the screens are not empty the first time you look.
`npm run db:seed -- --clear` removes exactly those rows and nothing else.

## 4. Open it

```powershell
npm run dev
```

Then **<http://localhost:3000/admin>** and sign in.

---

## If something is wrong

| What you see | What it means |
|---|---|
| **"PostgreSQL is not installed"** | Step 1. The script prints the exact command. |
| **"PostgreSQL is installed but not running"** | Open Services, find `postgresql-x64-18`, press Start. |
| **"PostgreSQL refused that password"** | The password in `.env.local` is not the one from the installer. |
| **"Not set up yet" on the /admin screen** | `.env.local` is missing or `npm run db:setup` has not run. |
| **Signed out every time you restart** | `ADMIN_SESSION_SECRET` changed. Changing it is also how you sign everyone out on purpose. |

---

## What this added to the project

| | |
|---|---|
| `db/001_init.sql` | The schema. Migrations are numbered files in this folder. |
| `scripts/db-setup.mjs` | Finds PostgreSQL, creates the database, applies migrations, makes the first user. |
| `scripts/db-seed.mjs` | Optional sample content, removable. |
| `src/lib/db.ts` | The connection. Marked `server-only`. |
| `src/lib/auth.ts` | Passwords and sessions, on `node:crypto`. No auth library. |
| `src/lib/editor-extensions.ts` | The editor's extension list — shared by the editor and the server renderer. |
| `src/lib/post-content.ts` | Turns stored JSON into HTML, a table of contents and a word count. |
| `src/app/admin/page.tsx` | One static page. |
| `src/app/api/admin/**` | The endpoints. The only dynamic routes in the build. |
| `src/components/client/admin/**` | The screens and the editor. |
| `src/styles/admin.css` | Loaded only by `/admin`, never by a public page. |

**Four dependencies were added** (CLAUDE.md rule 10): `pg` for the database,
`server-only` to keep it out of client bundles, the `@tiptap/*` MIT packages for
the editor, and `@types/pg`. Tiptap charges for documents kept in *their* cloud;
ours are in your Postgres, so the licence cost is zero.

## What the public site did NOT get

Nothing. `app/layout.tsx` still carries `dynamic = 'error'`, every page is still
prerendered, and `npm run verify:static` still passes. The admin is one static
page plus route handlers, which are not wrapped by that layout at all — so the
guarantee on the 600 ranking URLs is untouched.

The build now lists the `/api/admin/*` routes under **ƒ (Dynamic)**. That is
correct and expected: they are behind a login and Google never sees them. The
"zero dynamic routes" line in CLAUDE.md is about pages.

## Still to come

Uploading images (needs the hosting decision — R2, S3 or Vercel Blob), the
newsletter send, the public form endpoints that fill the Enquiries screen, and
rendering posts from the database on the public site. The plan doc in the
project, `admin-dashboard-plan.md`, has the order.
