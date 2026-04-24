# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for **whatomate.io** — the landing page for the open-source Whatomate WhatsApp Business API product and the related Frappe WhatsApp Suite.

No build system, no package manager, no framework. Plain HTML, CSS, and vanilla JS edited and served as-is.

## Local development

Serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`. Edits to HTML/CSS/JS take effect on reload.

## Deployment

Hosted on GitHub Pages with custom domain `whatomate.io` (configured via `CNAME`). Pushing to `main` publishes the site — there is no CI build step. `_headers` is a Netlify/Cloudflare-style headers file; GitHub Pages ignores it, so security headers need to be enforced upstream, not via meta tags (see recent commit `f1ef3ea`).

## Structure worth knowing

- `index.html` — primary page, focused on the **standalone Whatomate app** (Go + Vue.js product)
- `frappe.html` — separate page for the **Frappe/ERPNext WhatsApp Suite** (`frappe_whatsapp`, `whatsapp_chat`, `frappe_whatsapp_chatbot`)
- `css/styles.css` — all styles; `index.html` also inlines critical above-the-fold CSS in a `<style>` block in `<head>` for performance
- `js/main.js` — shared across both pages; handles IntersectionObserver fade-ins, copy-to-clipboard for terminal commands, smooth anchor scroll, nav border on scroll
- `assets/` — SVG logo/favicons and `site.webmanifest`
- `llms.txt`, `robots.txt`, `sitemap.xml` — SEO / AI-crawler metadata; update `sitemap.xml` when pages are added/removed
- Analytics: GoatCounter snippet at the bottom of both HTML pages (`whatomate.goatcounter.com`)

## Editing conventions

- Each HTML page embeds its own JSON-LD structured data (`Organization`, `SoftwareApplication`, etc.) in `<head>`. Keep these in sync with visible page content when changing product descriptions.
- The two pages are intentionally split by audience: keep Frappe-specific links, installation, and copy out of `index.html` (see commit `bb57fcd`, `7c744a3`).
- When adding an element that should animate in, give it the `fade-in` class — `js/main.js` observes it.
- Copy-to-clipboard buttons rely on the DOM shape `.terminal-line > .terminal-cmd` + button — preserve that structure.
