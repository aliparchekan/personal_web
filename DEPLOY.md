# Deploy to GitHub Pages (free)

The repo name **must be `personal_web`** (it must match `base` in `site/astro.config.mjs`).
Your local folder can keep any name — only the GitHub repo name matters.

## One-time setup

1. Create an empty repo at github.com/new named `personal_web` (public, no README).

2. From this folder, run:

   ```bash
   git init
   git add .
   git commit -m "Personal website"
   git branch -M main
   git remote add origin https://github.com/aliparchekan/personal_web.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
   Watch progress under the **Actions** tab (~1–2 min).

5. Site is live at: **https://aliparchekan.github.io/personal_web/**

## Updating the site

Just commit and push to `main` — it redeploys automatically:

```bash
git add . && git commit -m "Update" && git push
```

## Notes

- If you later rename the repo, update `base` in `site/astro.config.mjs` to match.
- For a custom domain or cleaner URL, Cloudflare Pages is also free: remove `base`
  from `astro.config.mjs`, connect the repo at pages.cloudflare.com, set build
  command `npm run build` and output `dist` with root directory `site`.
