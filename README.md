# Tech Plus By Ramzi

A minimal news aggregator site focused on AI, developer tools, and tech industry news. Built with [Astro](https://astro.build/).

## Features

- 📰 Clean, responsive news grid
- 🏷️ Filter by category (AI, Dev Tools, Web Dev, Industry)
- 🌙 Dark mode toggle
- 🔍 Search articles
- 🔖 Bookmark articles (localStorage)
- ⏱️ Reading time estimates
- 🔗 Share buttons (Twitter, LinkedIn, Copy)
- 📊 Trending badges
- 📱 PWA support (installable)

## Quick Start

```bash
# Install dependencies
npm install

# Fetch news and build
npm run build

# Preview the build
npm run preview
```

## Development

```bash
# Start dev server
npm run dev

# Fetch fresh news only
npm run fetch
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Astro dev server |
| `npm run build` | Fetch news + build static site |
| `npm run preview` | Preview production build |
| `npm run fetch` | Fetch latest news from RSS feeds |

## RSS Sources

- TechCrunch AI
- The Verge AI
- Ars Technica
- Hacker News
- Dev.to
- CSS-Tricks
- Smashing Magazine
- web.dev
- MIT Tech Review
- Wired
- ArXiv AI
- Medium (various tech tags)

## Project Structure

```
tech-news-site/
├── src/
│   ├── pages/
│   │   └── index.astro     # Main page
│   ├── components/
│   │   └── NewsCard.astro  # News card component
│   └── layouts/
│       └── Layout.astro    # Base layout
├── public/
│   ├── styles.css          # Global styles
│   ├── manifest.json       # PWA manifest
│   └── sw.js               # Service worker
├── fetch-news.js           # RSS fetcher (ES module)
├── news-data.json          # Cached articles
├── astro.config.mjs        # Astro config
├── vercel.json             # Vercel deployment config
└── package.json
```

## Customization

Edit `fetch-news.js` to add/remove RSS feeds or adjust categorization keywords.
