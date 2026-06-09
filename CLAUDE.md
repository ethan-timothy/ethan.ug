# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog for Kevin Raaijmakers (raaijmakers.it). Built with a Hugo static site and a Node.js/Express API backend for the contact form. The site is bilingual (English default, Dutch).

### Site Content

- **Homepage** — Hero section with avatar, name, subtitle, and a list of the 5 most recent blog posts.
- **About** — Personal introduction: IT enthusiast from 's-Hertogenbosch. Lists interests (web dev, self-hosting, home automation), tech stack (Python, JS, Hugo, Vue.js, Node.js, Linux, Docker, Proxmox VE, pfSense), and projects.
- **Blog** — Posts include a "Hello World" welcome post and a Curriculum Vitae page with downloadable PDF CVs (`/documents/cv.pdf`, `/documents/cv.nl.pdf`).
- **Contact** — Form with Cloudflare Turnstile CAPTCHA, backed by the API.

## Architecture

- **website/** — Hugo static site with a custom `raaijmakers` theme. Content is Markdown, templates use Hugo's Go templating. CSS uses vanilla CSS variables for theming (light/dark mode). The Inter font (Regular 400, SemiBold 600) is self-hosted in WOFF2 format.
- **api/** — Single-file Express.js server (`server.js`). Serves the built static site from `website/public/` and provides `POST /api/send` for contact form submissions (Cloudflare Turnstile verification, rate limiting at 3 req/24h per IP, email via nodemailer).

## Development Commands

### Website (Hugo)
```bash
cd website && hugo server -D    # Dev server at localhost:1313
cd website && hugo --minify     # Production build to website/public/
```

### API
```bash
cd api && npm install           # Install dependencies
cd api && node server.js        # Start server (requires .env, see .env.example)
```

## Deployment

The server pulls from the Git repository and rebuilds automatically. No manual deploy scripts — push to `main` to deploy.

## Key Conventions

- **i18n**: Content files use Hugo's naming convention (`about.md` for English, `about.nl.md` for Dutch). UI strings live in `i18n/en.yaml` and `i18n/nl.yaml`.
- **Theming**: CSS variables defined in `:root` and `[data-theme="dark"]` in `website/themes/raaijmakers/assets/css/style.css`. Light theme uses warm beige tones (#FAF9F7 bg, #4A9E9E accent); dark theme uses dark grays (#1a1a1a bg, #5fbfbf accent). Respects system preference with manual override via `data-theme` attribute stored in localStorage.
- **No build tooling for frontend**: Pure Hugo + vanilla CSS/JS. No npm, webpack, or preprocessors for the website.
- **API is a single file**: All API logic (routing, validation, rate limiting, email) lives in `api/server.js`.
- **Static assets**: Avatar images in `website/static/images/`, CV PDFs in `website/static/documents/`, self-hosted fonts in `website/themes/raaijmakers/static/fonts/`.
