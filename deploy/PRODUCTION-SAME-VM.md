# Live site on the dev VM (websitesvm), from the start

Checked on the VM on 23 Sep 2026:

- The VM is `dev1@192.168.90.152`.
- `~/apps` points to `/home/sj/apps`. That folder belongs to the group `appsdev`, and dev1 can create folders in it.
- **There is no nginx on the VM, and dev1 has no sudo.** HTTPS and the domain names are handled by the admin team's proxy in front of the VM. The same proxy serves dev.recycletechnologies.com and forwards it to port 8106 here. It passes the real visitor IP, which shows in dev's leads.
- Dev's database is `rti_admin_dev`, with user `rti_dev`. That user can create databases but not users, so the live database is a separate database under the same user.
- RAM is tight: 15 GB, with about 2.6 GB available. The live build therefore uses 2 workers.
- Restart after a reboot is handled by dev1's crontab line `@reboot /usr/bin/pm2 resurrect`, together with `pm2 save`. This was added on 23 Sep and covers dev and live.

|  | Dev | Live |
|---|---|---|
| Folder | `~/apps/rti-website-dev` | `~/apps/rti-website` |
| pm2 name | `rti-website-dev` | `rti-website` |
| Port | 8106 | **8201** |
| Database | `rti_admin_dev` | `rti_live` (same DB user, `rti_dev`) |
| Images | `~/apps/rti-website-dev/var/uploads` | `~/apps/rti-website-data/uploads` |
| Google | blocked (noindex) | allowed |

---

## Step 1: laptop (PowerShell, NOT inside ssh)

```
cd C:\Users\99TECH\Desktop\rti-website
git add -A
git commit -m "Ready for production"
git push origin main
scp deploy\.env.production dev1@192.168.90.152:~/rti-live.env
```

## Step 2: server, download the code

```bash
ssh dev1@192.168.90.152
cd ~/apps
REPO=$(git -C ~/apps/rti-website-dev config --get remote.origin.url 2>/dev/null || sed -nE 's/^\s*url = //p' ~/apps/rti-website-dev/.git/config | head -1)
git clone "$REPO" rti-website
cd ~/apps/rti-website && git log -1 --oneline
```

## Step 3: settings file

This writes the live database address and a new admin secret into the file. Neither value is printed.

```bash
cd ~/apps/rti-website
mv ~/rti-live.env .env.local
DEV_DB=$(grep -E '^DATABASE_URL=' ~/apps/rti-website-dev/.env.local | cut -d= -f2- | tr -d '"')
LIVE_DB=$(printf '%s' "$DEV_DB" | sed -E 's#/[^/?]+(\?.*)?$#/rti_live\1#')
SECRET=$(openssl rand -hex 32)
grep -vE '^(DATABASE_URL|ADMIN_SESSION_SECRET|MEDIA_DIR|BUILD_CPUS|PORT)=' .env.local > .env.tmp
printf 'DATABASE_URL=%s\nADMIN_SESSION_SECRET=%s\nMEDIA_DIR=/home/sj/apps/rti-website-data/uploads\nBUILD_CPUS=2\nPORT=8201\n' "$LIVE_DB" "$SECRET" >> .env.tmp
mv .env.tmp .env.local
chmod 600 .env.local
grep -E "^(DEPLOY_ENV|NEXT_PUBLIC_NOINDEX|MEDIA_DIR|PORT|BUILD_CPUS|SMTP_HOST|LEAD_NOTIFY_TO)=" .env.local
sed -nE 's#^DATABASE_URL=postgres://([^:]+):[^@]*@(.*)#DB user=\1  at \2#p' .env.local
```

The output should include `DEPLOY_ENV=production`, **no** `NEXT_PUBLIC_NOINDEX` line, and `DB user=rti_dev at 127.0.0.1:5432/rti_live`.

## Step 4: database

This copies dev's content (posts, SEO, users and settings) into a new database, `rti_live`.

```bash
cd ~/apps/rti-website
DEV_DB=$(grep -E '^DATABASE_URL=' ~/apps/rti-website-dev/.env.local | cut -d= -f2- | tr -d '"')
LIVE_DB=$(grep -E '^DATABASE_URL=' .env.local | cut -d= -f2-)
psql "$DEV_DB" -c "CREATE DATABASE rti_live;"
pg_dump "$DEV_DB" --no-owner --no-privileges | psql -q -v ON_ERROR_STOP=1 "$LIVE_DB" > /dev/null && echo "copy OK"
psql "$LIVE_DB" -f db/006_tracking.sql
psql "$LIVE_DB" -c "DELETE FROM sessions; DELETE FROM leads; DELETE FROM subscribers;"
psql "$LIVE_DB" -c "select (select count(*) from posts) as posts, (select count(*) from users) as users;"
```

The DELETE line clears dev's test enquiries, test signups and logins out of the **live copy** only. Dev keeps its own.

## Step 5: images

```bash
DEV_MEDIA=$(sed -nE 's#^MEDIA_DIR=(.*)#\1#p' ~/apps/rti-website-dev/.env.local)
mkdir -p /home/sj/apps/rti-website-data/uploads
cp -a "$DEV_MEDIA"/. /home/sj/apps/rti-website-data/uploads/
echo "dev: $(find "$DEV_MEDIA" -type f | wc -l)   live: $(find /home/sj/apps/rti-website-data/uploads -type f | wc -l)"
[ -d ~/apps/rti-website-dev/public/wp-content ] && cp -a ~/apps/rti-website-dev/public/wp-content ~/apps/rti-website/public/ && echo "wp-content copied" || echo "no wp-content on dev"
```

The two counts must match.

## Step 6: build, start, auto-restart

```bash
cd ~/apps/rti-website
npm ci
npm run build
npm run verify:static      # must say: noindex flag: off / deploy env: production
npm run verify:assets
npm run user:add -- --login admin --password "CHOOSE-A-LONG-NEW-PASSWORD"

pm2 start node_modules/next/dist/bin/next --name rti-website --cwd /home/sj/apps/rti-website \
  --max-memory-restart 1G --exp-backoff-restart-delay 200 -- start -p 8201
pm2 save
pm2 ls
curl -sI http://127.0.0.1:8201/ | head -1     # HTTP/1.1 200 OK
curl -s  http://127.0.0.1:8201/robots.txt     # Allow: /  and a Sitemap line
```

- **Crash:** pm2 restarts the site.
- **Over 1 GB of memory:** pm2 restarts it.
- **Server reboot:** the crontab line runs `pm2 resurrect`, which starts everything `pm2 save` recorded.

**See it in your browser before launch.** On the laptop, in PowerShell, run this and keep the window open:

```
ssh -L 8201:127.0.0.1:8201 dev1@192.168.90.152
```

Then open **http://localhost:8201**. The admin is at http://localhost:8201/admin.

A test form sent from here **really emails Usman**, so write TEST in the message.

## Step 7: the admin team, on their proxy

- Add `recycletechnologies.com` and `www.recycletechnologies.com`, both forwarding to `192.168.90.152:8201`.
- HTTPS for both names. Plain http goes to https, and the name without www 301s to `https://www.recycletechnologies.com`.
- Pass the Host, X-Forwarded-For and X-Forwarded-Proto headers.
- Allow uploads up to 50 MB.

## Step 8: launch day (DNS at Network Solutions)

Only when the launch list is done: the old URL redirects are approved and added, and the legal pages are reviewed.

1. **The day before:** set the TTL on `@` and `www` to 300.
2. **On the day:** change **only** the A records for `@` and `www`, from `44.218.65.175` to the proxy's public IP. dev.recycletechnologies.com uses `44.223.230.68`; the admins confirm the right one. **Do not touch MX, TXT or CNAME.** Those run the company email.
3. The admins issue the certificate on the proxy.
4. Check that `https://recycletechnologies.com` redirects to `https://www.recycletechnologies.com`, that the page loads, and that `/robots.txt` shows `Allow: /`.
5. Send one real form, and check it arrives in both Usman inboxes and in Admin → Enquiries.
6. **Rollback:** point `@` and `www` back to `44.218.65.175`. Keep WordPress running for 30 days.

## Step 9: nightly database backup (run once)

```bash
mkdir -p ~/backups/rti-live
( crontab -l 2>/dev/null; echo '30 2 * * * cd /home/sj/apps/rti-website && pg_dump "$(grep -E "^DATABASE_URL=" .env.local | cut -d= -f2-)" | gzip > $HOME/backups/rti-live/db-$(date +\%F).sql.gz && find $HOME/backups/rti-live -name "db-*.sql.gz" -mtime +14 -delete' ) | crontab -
crontab -l
```

This keeps 14 days of backups. Ask the admins to copy `~/backups/rti-live` and `/home/sj/apps/rti-website-data/uploads` off the server as well.

## Updating the live site later

```bash
cd ~/apps/rti-website && git pull origin main && npm ci && npm run build && npm run verify:static && pm2 restart rti-website
```
