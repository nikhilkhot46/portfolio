# Deployment — EC2 + nginx

Deploy `nikhilkhot.com` (Next.js static export) to an existing EC2 instance. Domain is on Namecheap and the A record already points to the EC2 public IP.

---

## 1. One-time server setup

SSH into the EC2 instance, then:

```bash
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx rsync

# Document root
sudo mkdir -p /var/www/html/nikhilkhot
sudo chown -R ubuntu:www-data /var/www/html/nikhilkhot
sudo chmod -R 755 /var/www/html/nikhilkhot
```

Check the EC2 security group has **inbound 80 and 443** open to `0.0.0.0/0` (needed for visitors and for Let's Encrypt to verify the domain).

---

## 2. Install the nginx config

From your laptop:

```bash
scp nginx.conf ubuntu@<EC2_IP>:/tmp/nikhilkhot.com
```

On the server:

```bash
sudo mv /tmp/nikhilkhot.com /etc/nginx/sites-available/nikhilkhot.com
sudo ln -sf /etc/nginx/sites-available/nikhilkhot.com /etc/nginx/sites-enabled/nikhilkhot.com
sudo rm -f /etc/nginx/sites-enabled/default
```

The config references TLS certs that don't exist yet. Temporarily comment out both `listen 443 ssl` server blocks, keep only the `listen 80` block, then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## 3. Get the TLS certificate

```bash
sudo certbot --nginx \
  -d nikhilkhot.com -d www.nikhilkhot.com \
  --non-interactive --agree-tos -m nikhilkhot46@gmail.com --redirect
```

Certbot creates the certs under `/etc/letsencrypt/live/nikhilkhot.com/` and sets up auto-renewal.

Now uncomment the two `listen 443 ssl` blocks in `/etc/nginx/sites-available/nikhilkhot.com` and reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Renewals happen automatically via systemd — no cron needed. Verify:

```bash
sudo certbot renew --dry-run
```

---

## 4. Deploy

On your laptop, from the project root:

```bash
npm ci
npm run build

rsync -avz --delete ./out/ ubuntu@<EC2_IP>:/var/www/html/nikhilkhot/
```

`--delete` removes files on the server that no longer exist in `out/`, so stale pages don't linger. That's it — no server restart needed.

For repeat deploys, the one-liner is:

```bash
npm run build && rsync -avz --delete ./out/ ubuntu@<EC2_IP>:/var/www/html/nikhilkhot/
```

Optionally save as `deploy.sh` in the repo.

---

## 5. Verify

```bash
curl -I https://nikhilkhot.com/              # 200
curl -I http://nikhilkhot.com/               # 301 to https
curl -I https://www.nikhilkhot.com/          # 301 to apex
curl -s https://nikhilkhot.com/sitemap.xml | head
```

Then open the site in a browser and check a blog post loads.

---

## 6. Rollback (if needed)

Before each deploy, snapshot the current live version on the server:

```bash
sudo rsync -a --delete /var/www/html/nikhilkhot/ /var/www/html/nikhilkhot-prev/
```

To roll back:

```bash
sudo rsync -a --delete /var/www/html/nikhilkhot-prev/ /var/www/html/nikhilkhot/
```

---

## Troubleshooting

- **nginx won't start after cert install** — check `sudo nginx -t` output; usually a typo in the vhost or a missing `include` path.
- **Certbot fails** — confirm port 80 is open in the security group and the Namecheap A record has propagated (`dig nikhilkhot.com +short` should return the EC2 IP).
- **New build not showing** — HTML is served with `expires -1` (never cached), so a hard refresh is enough. If it still shows stale, check `rsync` actually uploaded — run with `-v` and look for the changed files.
- **403/404 on a page that exists** — permissions. Files should be `755` for dirs, `644` for files, owner `ubuntu:www-data`.
