# Production deploy — www.recycletechnologies.com

Step by step, in order. Commands marked **laptop** run in
`C:\Users\99TECH\Desktop\rti-website`; everything else runs on the production
server. The dev server runbook (the project doc `dev-server-deploy-runbook.md`)
is the same shape; the differences here are the live settings, the domain
and the cutover.

---

## 0. What the server needs

| | |
|---|---|
| OS | Ubuntu 22.04 or 24.04 LTS |
| CPU / RAM | 2 vCPU / 4 GB minimum (a build peaks around 740 MB per worker; set `BUILD_CPUS` to fit) |
| Disk | 40 GB SSD (app + `node_modules` + `.next` ~2 GB, media ~265 MB and growing, DB, logs, backups) |
| Software | Node.js **22.22+**, PostgreSQL 15+, nginx, pm2, certbot, git |
| Network | Public IP, ports 80 and 443 open, outbound 587 (mail) and 443 (the ZIP lookup API) |
| Backups | Nightly `pg_dump` + the media folder, kept off the server |

```bash
node -v            # v22.22 or newer
psql --version
nginx -v
pm2 -v
```

---

## 1. Code

```bash
mkdir -p ~/apps && cd ~/apps
git clone <repo> rti-website        # read-only deploy key on the server
cd rti-website
git checkout main
```

**laptop**, first, while WordPress is still live:

```
node scripts/fetch-figma-assets.mjs --missing
npm run verify:assets
git add -A && git commit -m "..." && git push origin main
```

---

## 2. Environment

```bash
cp deploy/env.production.example .env.local
nano .env.local            # fill in every blank; see the comments in the file
chmod 600 .env.local
```

The two lines that matter most:

- `DEPLOY_ENV=production`
- `NEXT_PUBLIC_NOINDEX` **not set**

With those, `/robots.txt` allows crawling and lists the sitemap, pages carry
`index, follow`, and the build refuses to run if someone sets
`NEXT_PUBLIC_NOINDEX=true` by mistake.

---

## 3. Database

**laptop** — dump it (plain SQL restores into any newer PostgreSQL):

```
"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -U postgres -h 127.0.0.1 --no-owner --no-privileges -f rti_admin.sql rti_admin
tar -czf rti_admin.sql.gz rti_admin.sql
scp rti_admin.sql.gz <user>@<server>:~/
```

Server — an EMPTY database, then restore. **Do not run `npm run db:setup`**;
the dump brings its own schema.

```bash
sudo -u postgres createuser --pwprompt rti
sudo -u postgres createdb -O rti rti_admin
gunzip -c ~/rti_admin.sql.gz | psql -h 127.0.0.1 -U rti -d rti_admin
psql -h 127.0.0.1 -U rti -d rti_admin -c "select count(*) from posts;"   # 307
rm ~/rti_admin.sql.gz       # it holds password hashes
```

---

## 4. Media library (`var/uploads`)

About 265 MB, and today the only copy is on the laptop. **Back it up first.**

```bash
sudo mkdir -p /var/lib/rti-website/uploads
sudo chown -R $USER /var/lib/rti-website
```

**laptop**:

```
scp -r C:\Users\99TECH\Desktop\rti-website\var\uploads\* <user>@<server>:/var/lib/rti-website/uploads/
```

```bash
find /var/lib/rti-website/uploads -type f | wc -l    # same count as the laptop
```

---

## 5. Build and run

The database must be up BEFORE the build: the blog, every post and every
category archive get their URLs from it at build time.

```bash
cd ~/apps/rti-website
npm ci
npm run build
npm run verify:static      # "noindex flag: off"  and  "deploy env: production"
npm run verify:assets

pm2 start "npx next start -p 3000" --name rti-website
pm2 save
pm2 startup                # once, so it comes back after a reboot

curl -sI http://127.0.0.1:3000/ | head -1        # HTTP/1.1 200
curl -s  http://127.0.0.1:3000/robots.txt         # Allow: /  and a Sitemap: line
```

---

## 6. Admin account

The dump carries `admin` / `admin123`. Change it before anyone can reach the
server:

```bash
npm run user:add -- --login admin --password "a long real password"
```

---

## 7. nginx and HTTPS

```bash
sudo cp deploy/nginx/recycletechnologies.com.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/recycletechnologies.com.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Do not add security `add_header` lines to it. The site sends them itself
(`next.config.ts`), and two copies with different values is the RTI-12 bug.

The certificate is issued once DNS points here (step 9), or earlier with a DNS
challenge:

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
     -d recycletechnologies.com -d www.recycletechnologies.com
```

---

## 8. Before the switch: checks

Point your own computer at the new server without touching DNS (add
`<server IP> www.recycletechnologies.com` to your hosts file) and check:

- [ ] Home, a service page, a location page, the blog and one post load
- [ ] One real contact form lead arrives in the `LEAD_NOTIFY_TO` inbox and in the admin
- [ ] One newsletter signup appears in the admin's Subscribers
- [ ] `/favicon.ico`, `/og-default.png`, `/logo.png`, `/apple-icon.png` load
- [ ] `curl -sI https://www.recycletechnologies.com/ | grep -ci strict-transport-security` prints `1`
- [ ] `BASE=https://www.recycletechnologies.com bash launch-check.sh` (the audit's gate)

---

## 9. Cutover day

1. A day before: set the DNS TTL on `@` and `www` to 300 seconds.
2. Change ONLY the A/AAAA (or CNAME) records for `@` and `www` to the new
   server. **Do not touch MX, SPF, DKIM, DMARC or any other TXT record** —
   that is the company's email.
3. Issue the certificate (step 7) if it was not issued already.
4. Run the launch check against the live domain. It must say `RESULT: GO`.
5. Send one real test lead and one newsletter signup; confirm both arrive.
6. Keep the old WordPress server running, password protected, for 30 days.

**Rollback:** point `@` and `www` back to the WordPress server's IP. With a
300 second TTL it takes effect within minutes.

---

## 10. Updating later

```bash
cd ~/apps/rti-website
git pull origin main
npm ci && npm run build && pm2 restart rti-website
```

`.env.local` and the media folder are outside git, so a pull never touches
them.
