# Clinical Inference

Minimal blog built with Astro, React, Tailwind CSS, and Markdown content.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Writing Posts

Create a Markdown or MDX file in `src/content/posts/`.

```md
---
title: "Post title"
subtitle: "Short subtitle"
date: "2026-08-08"
author: "Matheus"
cover: "/images/posts/default-cover.png"
tags: ["clinical inference"]
published: true
---

Post body.
```

Posts with `published: false` are excluded from the homepage and feed.

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys the site when changes are pushed to `main`.
In the repository settings, set Pages source to GitHub Actions.
