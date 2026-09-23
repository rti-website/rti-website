# Live site on the dev VM, from the start

The live site runs on the same VM as dev (`dev1@192.168.90.152`, `websitesvm`), next to the other sites in `~/apps`. It shares nothing with dev.

|  | Dev | Live |
|---|---|---|
| Folder | `~/apps/rti-website-dev` | `~/apps/rti-website` |
| pm2 name | `rti-website-dev` | `rti-website` |
| Port | 8106 | **8201** |
| Database | `rti_admin` | `rti_live` (its own user and password) |
| Images | dev's `MEDIA_DIR` | `/var/lib/rti-website/uploads` |
| Google | blocked (noindex) | allowed |

Steps 1 to 8 can be done now, and the current WordPress site keeps running the whole time. Step 9, the DNS switch, is launch day.

---

## Step 1 — laptop (cmd): push the code and send the settings file

```
cd C:\Users\99TECH\Desktop\rti-website
git add -A
git commit -m "Ready for production"
git push origin main
scp deploy\.env.production dev1@192.168.90.152:~/rti-live.env
```

`deploy\.env.production` carries the Mailtrap token, which is why it goes by scp and never through git.

---

## Step 2 — server: quick check

```bash
ssh dev1@192.168.90.152

node -v && pm2 -v && psql --version && nginx -v
ss -ltn | grep -q ':8201 ' && echo "8201 IN USE - stop here" || echo "8201 free"
sudo -v && echo "sudo OK"
grep -l "dev.recycletechnologies.com" /etc/nginx/sites-enabled/*
grep -hE "listen|ssl_certificate |real_ip|X-Forwarded-For" /etc/nginx/sites-enabled/* | sort | uniq -c
```

**Stop and send me the output if either of these happens:**

- There are no `ssl_certificate` lines. That means HTTPS is handled somewhere other than this VM.
- There is any `real_ip` line. That means traffic comes through another proxy first.

---

## Step 3 — server: download the code

```bash
cd ~/apps
REPO=$(git -C ~/apps/rti-website-dev config --get remote.origin.url 2>/dev/null || sed -nE 's/^\s*url = //p' ~/apps/rti-website-dev/.git/config | head -1)
echo "$REPO"
git clone "$REPO" rti-website
cd ~/apps/rti-website && git log -1 --oneline
```

---

## Step 4 — server: settings file

This creates a new database password and admin secret, writes them straight into the file, and never shows them on screen.

```bash
cd ~/apps/rti-website
mv ~/rti-live.env .env.local
chmod 600 .env.local
DB_PW=$(openssl rand -hex 16)
SECRET=$(openssl rand -hex 32)
sed -i "s#^DATABASE_URL=.*#DATABASE_URL=postgres://rti_live:${DB_PW}@127.0.0.1:5432/rti_live#" .env.local
sed -i "s#^ADMIN_SESSION_SECRET=.*#ADMIN_SESSION_SECRET=${SECRET}#" .env.local
sed -i "s#^MEDIA_DIR=.*#MEDIA_DIR=/var/lib/rti-website/uploads#; s#^BUILD_CPUS=.*#BUILD_CPUS=3#; s#^PORT=.*#PORT=8201#" .env.local
grep -E "^(DEPLOY_ENV|NEXT_PUBLIC_NOINDEX|MEDIA_DIR|PORT|BUILD_CPUS|SMTP_HOST|SMTP_USER|LEAD_NOTIFY_TO)=" .env.local
```

The output should show `DEPLOY_ENV=production` and **no** `NEXT_PUBLIC_NOINDEX` line.

---

## Step 5 — server: database

This creates a new database and copies the content from dev into it: posts, SEO fields, users and settings.

```bash
cd ~/apps/rti-website
DB_PW=$(sed -nE 's#^DATABASE_URL=postgres://rti_live:([^@]+)@.*#\1#p' .env.local)
sudo -u postgres psql -c "CREATE ROLE rti_live LOGIN PASSWORD '${DB_PW}';"
sudo -u postgres psql -c "CREATE DATABASE rti_live OWNER rti_live;"

DEV_DB=$(grep -E '^DATABASE_URL=' ~/apps/rti-website-dev/.env.local | cut -d= -f2- | tr -d '"')
LIVE_DB=$(grep -E '^DATABASE_URL=' .env.local | cut -d= -f2-)
pg_dump "$DEV_DB" --no-owner --no-privileges | psql -q -v ON_ERROR_STOP=1 "$LIVE_DB" > /dev/null && echo "copy OK"
psql "$LIVE_DB" -f db/006_tracking.sql

# dev's test enquiries, test signups and logins do not come to live
psql "$LIVE_DB" -c "DELETE FROM sessions; DELETE FROM leads; DELETE FROM subscribers;"
psql "$LIVE_DB" -c "select (select count(*) from posts) as posts, (select count(*) from users) as users;"
```

If the laptop holds newer content than dev, say so before running this. In that case we copy from the laptop instead.

---

## Step 6 — server: images

```bash
sudo mkdir -p /var/lib/rti-website/uploads
sudo chown -R $(whoami): /var/lib/rti-website
DEV_MEDIA=$(sed -nE 's#^MEDIA_DIR=(.*)#\1#p' ~/apps/rti-website-dev/.env.local)
DEV_MEDIA=${DEV_MEDIA:-$HOME/apps/rti-website-dev/var/uploads}
echo "copying from $DEV_MEDIA"
cp -a "$DEV_MEDIA"/. /var/lib/rti-website/uploads/
echo "dev: $(find "$DEV_MEDIA" -type f | wc -l)   live: $(find /var/lib/rti-website/uploads -type f | wc -l)"

# old WordPress images kept at /wp-content/... (not in git)
[ -d ~/apps/rti-website-dev/public/wp-content ] && cp -a ~/apps/rti-website-dev/public/wp-content ~/apps/rti-website/public/ && echo "wp-content copied" || echo "no wp-content on dev"
```

The two counts must match.

---

## Step 7 — server: build, start, auto-restart

```bash
cd ~/apps/rti-website
npm ci
npm run build
npm run verify:static      # must say:  noindex flag: off   deploy env: production
npm run verify:assets

# new admin password (the copied one is dev's)
npm run user:add -- --login admin --password "CHOOSE-A-LONG-NEW-PASSWORD"

# start it, restart it on a crash or when it goes over 1 GB of memory
pm2 start node_modules/next/dist/bin/next --name rti-website --cwd ~/apps/rti-website \
  --max-memory-restart 1G --exp-backoff-restart-delay 200 -- start -p 8201
pm2 save

# come back after a server reboot
systemctl is-enabled pm2-$(whoami) || pm2 startup
```

If `pm2 startup` prints a `sudo env PATH=...` line, run that line, then run `pm2 save` again.

Check that it works:

```bash
pm2 ls
curl -sI http://127.0.0.1:8201/ | head -1          # HTTP/1.1 200 OK
curl -s  http://127.0.0.1:8201/robots.txt          # Allow: /  and a Sitemap line
```

**Look at it in your browser before DNS.** Run this on the laptop (cmd) and keep the window open:

```
ssh -L 8201:127.0.0.1:8201 dev1@192.168.90.152
```

Then open **http://localhost:8201**. The admin works at http://localhost:8201/admin.

A test form sent from here **really emails Usman**, so write TEST in the message.

---

## Step 8 — server: nginx (HTTP only, for now)

Until DNS points here, nobody reaches this. It is ready for step 9.

```bash
sudo mkdir -p /var/www/certbot
sudo tee /etc/nginx/sites-available/recycletechnologies.com.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name recycletechnologies.com www.recycletechnologies.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / {
        proxy_pass http://127.0.0.1:8201;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For   $remote_addr;
        proxy_set_header X-Real-IP         $remote_addr;
        client_max_body_size 50m;
    }
}
EOF
sudo ln -s /etc/nginx/sites-available/recycletechnologies.com.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
curl -s -H "Host: www.recycletechnologies.com" http://127.0.0.1/ | grep -o "<title>[^<]*"
```

`nginx -t` must say `test is successful`. The dev site and the other sites are not affected.

---

## Step 9 — launch day: switch the domain

Do this only when the launch list is done: the old URL redirects are approved and in place, the legal pages have been reviewed, and the site has been checked on localhost:8201.

**The day before, in Network Solutions:** set the TTL of the `@` and `www` records to 300 (5 minutes).

**On the day, in Network Solutions:** change only these two records.

| Record | From | To |
|---|---|---|
| A `@` | 44.218.65.175 | 44.223.230.68 (the same IP dev.recycletechnologies.com uses) |
| A `www` | 44.218.65.175 | 44.223.230.68 |

**Do not touch MX, TXT or CNAME.** Those run the company email.

Right after the change, on the server, get the HTTPS certificate:

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  -d recycletechnologies.com -d www.recycletechnologies.com \
  --deploy-hook "systemctl reload nginx"
```

Then switch nginx to the final HTTPS setup: http goes to https, and the address without www goes to www, in one hop.

```bash
sudo tee /etc/nginx/sites-available/recycletechnologies.com.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name recycletechnologies.com www.recycletechnologies.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://www.recycletechnologies.com$request_uri; }
}
server {
    listen 443 ssl http2;
    server_name recycletechnologies.com;
    ssl_certificate     /etc/letsencrypt/live/recycletechnologies.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/recycletechnologies.com/privkey.pem;
    return 301 https://www.recycletechnologies.com$request_uri;
}
server {
    listen 443 ssl http2;
    server_name www.recycletechnologies.com;
    ssl_certificate     /etc/letsencrypt/live/recycletechnologies.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/recycletechnologies.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    client_max_body_size 50m;
    gzip on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/javascript application/json application/xml image/svg+xml text/x-component;
    access_log /var/log/nginx/recycletechnologies.access.log;
    error_log  /var/log/nginx/recycletechnologies.error.log;
    location / {
        proxy_pass http://127.0.0.1:8201;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For   $remote_addr;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_read_timeout 60s;
    }
}
EOF
sudo nginx -t && sudo systemctl reload nginx
```

Check it:

```bash
curl -sI http://recycletechnologies.com/     | grep -i location   # https://www.recycletechnologies.com/
curl -sI https://recycletechnologies.com/    | grep -i location   # https://www.recycletechnologies.com/
curl -sI https://www.recycletechnologies.com/ | head -1           # 200
curl -s  https://www.recycletechnologies.com/robots.txt
sudo certbot renew --dry-run                                       # auto-renewal works
```

Then:

- Send one real contact form and check that it arrives in both Usman inboxes and in Admin → Enquiries.
- Keep the WordPress server running for 30 days.
- **Rollback:** point `@` and `www` back to 44.218.65.175.

---

## Step 10 — nightly database backup (once)

```bash
mkdir -p ~/backups/rti-live
( crontab -l 2>/dev/null; echo '30 2 * * * cd $HOME/apps/rti-website && pg_dump "$(grep -E "^DATABASE_URL=" .env.local | cut -d= -f2-)" | gzip > $HOME/backups/rti-live/db-$(date +\%F).sql.gz && find $HOME/backups/rti-live -name "db-*.sql.gz" -mtime +14 -delete' ) | crontab -
crontab -l
```

This keeps 14 days of backups. Ask the admin team to copy `~/backups/rti-live` and `/var/lib/rti-website/uploads` off the server as well.

---

## Updating the live site later

```bash
cd ~/apps/rti-website
git pull origin main
npm ci && npm run build && npm run verify:static && pm2 restart rti-website
```
