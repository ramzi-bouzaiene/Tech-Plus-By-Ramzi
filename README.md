# Tech Plus By Ramzi

A minimal news site focused on AI, developer tools, and tech industry news.

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

## Quick Start (Local)

```bash
# Install dependencies
npm install

# Serve locally
npm start
```

Then open http://localhost:3000

## Deploy to Vercel (Free)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tech-news-site.git
git push -u origin main
```

2. **Deploy:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Click **Deploy** (no config needed!)

Your site will be live at `https://tech-news-site.vercel.app`

## Update News

To pull fresh news from RSS feeds:

```bash
npm run fetch
```

Then commit and push to trigger a new deploy.

## RSS Sources

- TechCrunch AI
- The Verge AI
- Ars Technica
- Hacker News (Front, Show, Ask)
- GitHub Blog
- Dev.to
- CSS-Tricks
- Smashing Magazine
- web.dev
- MIT Tech Review
- Wired
- ArXiv AI

## Project Structure

```
tech-news-site/
├── public/
│   ├── index.html      # Frontend
│   ├── styles.css      # Styling
│   ├── news-data.json  # Cached articles
│   ├── manifest.json   # PWA manifest
│   └── sw.js           # Service worker
├── fetch-news.js       # RSS fetcher
├── vercel.json         # Vercel config
└── package.json
```

## Customization

Edit `fetch-news.js` to add/remove RSS feeds or adjust categorization keywords.
