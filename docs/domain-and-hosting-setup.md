# Domain & Hosting Setup (do this later, when ready to launch)

## Who does what

| Job | Service |
|---|---|
| Registrar (where the domain is bought) | Cloudflare |
| DNS management | Cloudflare DNS |
| Website hosting / CDN | Netlify |
| HTTPS certificate | Netlify (free, automatic) |
| Email forwarding (`info@` → clinic Gmail) | Cloudflare Email Routing (free, receive-only) |

No Railway is needed. Expected yearly cost: the domain only (~$10.46/year for `.com` at Cloudflare).

## Steps

1. **Buy the domain in Cloudflare** — Domain Registration → Register Domains. Turn on auto-renew and keep the card on file current.
2. **Add the custom domain in Netlify first** — Site → Domain management → Add a domain → enter the domain. Netlify then shows the exact DNS records it needs (typically an `A` record for the root `@` and a `CNAME` for `www` pointing to `rivaanshentclinic.netlify.app`). Always copy the values Netlify shows rather than values from this note.
3. **Copy those records into Cloudflare** — Cloudflare → your domain → DNS → Records → Add record.
4. **Set every Netlify record to "DNS only" (gray cloud), not "Proxied" (orange cloud).** Netlify already provides the CDN and HTTPS; running Cloudflare's proxy in front as well can break Netlify's domain verification and certificate issuance.
5. **Wait for HTTPS** — Netlify issues the certificate automatically once DNS resolves (minutes to a few hours). Check Domain management → HTTPS.
6. **Email** — Cloudflare → Email → Email Routing → forward `info@<domain>` to the clinic Gmail. This only *receives*; sending as `info@` later needs Google Workspace or Zoho (switching takes ~15 minutes and doesn't affect the website).
7. **Tell the developer the domain is live** so the site config can be updated:
   - set `site` in `astro.config.mjs` to `https://<domain>` (enables canonical URLs and the sitemap),
   - update the clinic email in `src/config/site.ts` if the domain differs from the one shown there,
   - optionally add a sitemap (`@astrojs/sitemap`) — it needs `site` to be set.

## Netlify build settings for the Astro site

The site is built with Astro (the old `www/` folder and Caddy are gone). `netlify.toml` already contains:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 22 (set via `NODE_VERSION` or `.nvmrc`) |

Deploy previews and branch deploys also set `SHOW_DRAFTS=true`, so unreviewed pages can be checked on a phone before
they go live. Old page addresses are redirected in the same file.
