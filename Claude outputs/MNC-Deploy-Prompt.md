# Deploy prompt: MNC website on the company server, port 3012

Copy everything below the line into the Claude chat that has the MNC website code open.

---

I want to deploy the **MNC website** on our company server, on **port 3012**, with its database on the same server. Give me exact commands I can copy and paste. I am not a server expert, so follow every rule below.

## 1. What you must know about the server

- **Login:** `ssh dev1@192.168.90.152` from my Windows laptop (PowerShell). The server name is `websitesvm`, and it runs Ubuntu 24.04.
- **No sudo.** dev1 cannot install system packages or edit anything outside its own folders. If something needs root, tell me what to ask the admin team for.
- **No nginx on the server.** The admin team runs a proxy in front of it that handles the domain names and HTTPS, and forwards each domain to a port on this server. It passes the real visitor IP in `X-Forwarded-For`. The site only needs to listen on its port.
- **Apps folder:** `~/apps`, which points to `/home/sj/apps` (group `appsdev`; dev1 can create folders there).
  - Put the site in `/home/sj/apps/mnc-website`.
  - Put files that must survive a redeploy (uploads, data) in `/home/sj/apps/mnc-website-data`.
- **Apps run under pm2 as dev1.** Other apps already run there and **must never be touched**: al-ihkam, american-lycetuff, cmr-website, quick-ship, rti-website, rti-website-dev, school-mentor, seo-boat, seo-boat-tunnel, shipnest, sj-computers, star-website.
  - The RTI sites use ports 8106 (dev) and 8201 (live). I believe 3012 is free, but **check it first**.
- **After a reboot,** dev1's crontab line `@reboot /usr/bin/pm2 resurrect` restarts everything saved with `pm2 save`. Run `pm2 save` after adding the new app.
- **Memory is tight:** about 15 GB total, often only 2 to 3 GB free. Limit build workers or Node memory so the build does not starve the other sites, and give the app `--max-memory-restart 1G`.
- **Database:** PostgreSQL runs on the same server at `127.0.0.1:5432`.
  - The RTI sites use the database user `rti_dev`. It **can create databases but cannot create users**.
  - For MNC, create a **new database** (for example `mnc_website`) owned by that user, unless the MNC code needs something else.
  - Build the MNC database address from the RTI dev address **without ever printing it**. It is the `DATABASE_URL` line in `/home/sj/apps/rti-website-dev/.env.local`; replace only the database name.
  - Also tell me what to ask the admin team for a separate `mnc` database user later, so MNC does not share RTI's login.
- **Location data:** a free DB-IP location file is already on the server at `/home/sj/apps/rti-website-data/geoip/dbip-city-lite.mmdb`. If MNC needs IP location, read it from there; do not download a second copy.
- **Git:** the code goes from my laptop to GitHub, and the server pulls from GitHub. Find the MNC repository address and branch from the code, or ask me. I run git on my laptop myself.

## 2. Before you write any commands

1. **Read the MNC code and tell me, in short:**
   - the framework and version (for example Next.js 16);
   - the Node version it needs;
   - the install, build and start commands;
   - whether it needs a database, which kind (PostgreSQL, MySQL, MongoDB, SQLite), and how its tables are created (SQL files, Prisma, Drizzle, a setup script);
   - every environment variable it reads, marking which are secrets;
   - where it stores uploaded files;
   - whether it sends email (SMTP);
   - whether it has an admin login, and how the first admin user is created;
   - anything that would stop it running on port 3012, such as a hard-coded port or domain.
2. **Ask me what you cannot find:**
   - the domain name;
   - whether this is the live site or a test copy (a test copy must be hidden from Google with noindex);
   - the GitHub repository address;
   - the folder of the MNC code on my laptop;
   - SMTP details (I type secrets into the server myself);
   - the first admin email.
3. **Wait** for my answers before giving the deploy commands.

## 3. The commands I need, in this order

Give each command **on its own line**, say which window it runs in (**laptop PowerShell** or **server ssh**), and say what I should see after it. I paste one line at a time, so never put several commands in one block that depends on a prompt.

1. **Laptop:**
   - `cd` into the MNC folder;
   - check git status;
   - commit and push (I will run these).
2. **Server, read-only checks first:**
   - Node and npm versions, and whether they match what MNC needs (if not, tell me how to use the right version without sudo, for example nvm);
   - `pm2 ls`;
   - that port 3012 is free (`ss -ltn` filtered on 3012);
   - free memory and disk space;
   - that `psql` works.

   Tell me what each result should look like before I continue.
3. **Server, download the code:** clone the repository into `/home/sj/apps/mnc-website`, then show the last commit.
4. **Server, settings file (`.env.local`):**
   - Create it with `PORT=3012` and every variable the code needs.
   - Secrets are generated on the server (`openssl rand -hex 32`) or typed by me at a prompt (`read -rs`). Give the prompt command on its own line, and tell me to paste only the secret when it asks.
   - `chmod 600` the file.
   - Then print only the variable **names** to check them, never the values.
5. **Server, database:**
   - Create the database.
   - Write its address into `.env.local` without printing it.
   - Run the code's own way of creating tables.
   - Check that the tables exist.
   - Create the first admin user (ask me for the password at a prompt).
   - Every step must be safe to run twice.
6. **Server, folders:** create `/home/sj/apps/mnc-website-data/uploads` (and any other data folders) and point the settings at them.
7. **Server, build:**
   - `npm ci`;
   - the build, with a memory or worker limit;
   - any check scripts the project has.
8. **Server, start:**
   - Start with pm2 under the name `mnc-website`, on port 3012, with `--max-memory-restart 1G` and a restart backoff.
   - Run the start command directly (not `npm start`), so pm2 tracks the real process.
   - Then run `pm2 save`.
9. **Server, check:**
   - `curl` the home page and a few key pages on `127.0.0.1:3012`, expecting 200;
   - check robots.txt (noindex for a test copy);
   - check the admin login page;
   - `pm2 logs mnc-website --lines 30 --nostream`, with no errors.
10. **Laptop, see it before the domain works:** an ssh tunnel, `ssh -L 3012:127.0.0.1:3012 dev1@192.168.90.152`, keeping the window open, then open http://localhost:3012.
11. **What to send the admin team** (write it as a short message I can forward):
    - forward the domain (with and without www) to `192.168.90.152:3012`;
    - HTTPS certificate;
    - redirect http to https, and one canonical host;
    - pass the `Host`, `X-Forwarded-For` and `X-Forwarded-Proto` headers;
    - upload size limit;
    - and, if needed, a separate database user for MNC.
12. **Backups:**
    - a crontab line for a nightly `pg_dump` of the MNC database into `~/backups/mnc-website`, keeping 14 days;
    - a reminder to ask the admins to copy the backups and the uploads folder off the server.
13. **Future updates:** the exact steps.
    - **Laptop:** push.
    - **Server:** `cd`, `git pull`, run any new database step, then `pm2 stop mnc-website && npm run build && pm2 start mnc-website --update-env`.
    - Also: how to roll back to the previous commit.

## 4. Rules you must follow

- **Never touch other apps:**
  - Never `pkill -f`, never `pm2 restart all`, `pm2 stop all` or `pm2 delete all`.
  - Never stop, restart or edit any app other than `mnc-website`.
  - Never use or change the RTI folders, databases or ports, except reading the RTI `DATABASE_URL` to build the MNC one, and reading the shared DB-IP file.
- **Never print secrets:** do not `cat`, `echo` or print `.env` files, passwords, keys or database addresses, and never put them in git, docs or chat. When I must type a secret, give a `read -rs` prompt command.
- **No sudo** commands and no system-wide installs.
- **Never `rm -rf`** anything outside `/home/sj/apps/mnc-website`, and never delete the data folder.
- **Rebuild on the live site:** stop, build, start (`pm2 stop mnc-website && npm run build && pm2 start mnc-website --update-env`). Do not build while it runs, because the running site and the build clash on the `.next` folder.
- **Explain errors.** If a command can fail, tell me what the error means and the next command to run.
- **Plain words:** keep explanations short and simple, one line each.

When you have everything, give me the full command list from step 1 to step 13.
