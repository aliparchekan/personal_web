# AI chat avatar

Your site now has a floating **"Ask Ali's AI"** assistant (bottom-right on every page).

## It works out of the box

With no setup, the assistant answers from a built-in knowledge base baked into
`site/public/chat.js` — research, teaching, industry/AI, tutoring, contact, education,
and location. This needs **no backend and no API key**, so it works on GitHub Pages today.

To edit those canned answers, open `site/public/chat.js` and adjust the `KB` array.

## Upgrade to real Claude answers (optional)

To have the assistant answer free-form questions with the Claude API, deploy the
included Cloudflare Worker. Your API key stays on the server — it never reaches the browser.

1. Get a key at https://console.anthropic.com → **API Keys**.

2. Install Wrangler and deploy:

   ```bash
   npm install -g wrangler
   cd chat-worker
   wrangler login
   wrangler secret put ANTHROPIC_API_KEY      # paste your key when prompted
   wrangler deploy
   ```

   Wrangler prints a URL like `https://ali-chat.<your-subdomain>.workers.dev`.

3. (Recommended) Lock the Worker to your domain: uncomment the `[vars]` block in
   `chat-worker/wrangler.toml`, set `ALLOWED_ORIGIN = "https://aliparchekan.github.io"`,
   then run `wrangler deploy` again.

4. Paste the Worker URL into **`site/src/layouts/Layout.astro`**, replacing `null`:

   ```js
   window.__CHAT_ENDPOINT__ = "https://ali-chat.<your-subdomain>.workers.dev";
   ```

5. Commit and push. The chat now uses Claude, and automatically falls back to the
   built-in responder if the Worker is ever unreachable.

The Worker uses `claude-haiku-4-5` (fast and cheap). Change the `model` in
`chat-worker/worker.js` if you prefer. The system prompt there holds Ali's bio —
keep it in sync with the site as your background changes.
