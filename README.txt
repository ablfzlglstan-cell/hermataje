Hermitage PWA files

Upload/replace these files at the ROOT of the existing GitHub repository, keeping the folders:
- index.html
- manifest.json
- sw.js
- icons/icon-192.png
- icons/icon-512.png
- icons/icon-512-maskable.png

Do not delete or replace worker.js, schema.sql, wrangler.toml, or any existing database settings.
The Cloudflare Worker must serve static assets from the repository root and route /sw.js, /manifest.json and /icons/* to these files.
After deployment, open the website in Chrome, refresh it, then use Chrome menu > Install app (or Add to Home screen).
