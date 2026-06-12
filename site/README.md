# Ali Parchekani — Personal Website

Built with **Astro** + **Tailwind CSS** + TypeScript. Static output deployed to GitHub Pages.

## Setup

```sh
npm install
npm run dev       # dev server at localhost:4321
npm run build     # production build → ./dist/
npm run preview   # preview the production build locally
```

## Deploying to GitHub Pages

1. **Create the repo** on GitHub (e.g. `aliparchekan/personal_web_claude`).
2. In `astro.config.mjs`, update `site` and `base` to match your repo:
   ```js
   site: 'https://aliparchekan.github.io',
   base: '/personal_web_claude',  // ← your repo name
   ```
3. Push to the `main` branch. The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
4. In your repo settings → Pages → Source, select **GitHub Actions**.

## Adding PDFs

Drop PDF files into `public/files/`. Expected files:
- `academic-teaching-cv.pdf`
- `premium-tutoring-profile.pdf`
- `teaching-philosophy.pdf`
- `industry-resume.pdf`

They are linked from the Teaching, Tutoring, and Industry pages respectively.

## Switching to Cloudflare Pages

See the one-line comment at the top of `astro.config.mjs`. Remove `base`, add `@astrojs/cloudflare` adapter, and connect the repo in the Cloudflare Pages dashboard.
