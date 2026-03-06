import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser({
  customFields: {
    item: ['media:content', 'content:encoded']
  }
});

// RSS feeds for tech news
const FEEDS = [
  // AI Sources
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', source: 'TechCrunch', defaultCategory: 'AI' },
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', source: 'The Verge', defaultCategory: 'AI' },
  { url: 'https://export.arxiv.org/rss/cs.AI', source: 'ArXiv AI', defaultCategory: 'AI' },
  { url: 'https://medium.com/feed/tag/artificial-intelligence', source: 'Medium', defaultCategory: 'AI' },
  { url: 'https://medium.com/feed/tag/machine-learning', source: 'Medium', defaultCategory: 'AI' },

  // Developer Tools
  { url: 'https://hnrss.org/frontpage', source: 'Hacker News', defaultCategory: 'Developer Tools' },
  { url: 'https://hnrss.org/show', source: 'HN Show', defaultCategory: 'Developer Tools' },
  { url: 'https://hnrss.org/ask', source: 'HN Ask', defaultCategory: 'Developer Tools' },
  { url: 'https://blog.github.com/feed.xml', source: 'GitHub Blog', defaultCategory: 'Developer Tools' },
  { url: 'https://dev.to/feed', source: 'Dev.to', defaultCategory: 'Developer Tools' },
  { url: 'https://dev.to/feed/tag/programming', source: 'Dev.to', defaultCategory: 'Developer Tools' },
  { url: 'https://medium.com/feed/tag/programming', source: 'Medium', defaultCategory: 'Developer Tools' },
  { url: 'https://medium.com/feed/tag/software-development', source: 'Medium', defaultCategory: 'Developer Tools' },

  // Web Development
  { url: 'https://css-tricks.com/feed/', source: 'CSS-Tricks', defaultCategory: 'Web Development' },
  { url: 'https://www.smashingmagazine.com/feed/', source: 'Smashing Magazine', defaultCategory: 'Web Development' },
  { url: 'https://web.dev/feed.xml', source: 'web.dev', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/webdev', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/javascript', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/react', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/typescript', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/css', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/html', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/nextjs', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/javascript', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/web-development', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/react', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/frontend', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/css', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://www.freecodecamp.org/news/rss/', source: 'freeCodeCamp', defaultCategory: 'Web Development' },
  { url: 'https://daily.dev/blog/rss.xml', source: 'daily.dev', defaultCategory: 'Web Development' },
  { url: 'https://blog.logrocket.com/feed/', source: 'LogRocket', defaultCategory: 'Web Development' },
  { url: 'https://www.sitepoint.com/feed/', source: 'SitePoint', defaultCategory: 'Web Development' },
  { url: 'https://www.joshwcomeau.com/rss.xml', source: 'Josh W Comeau', defaultCategory: 'Web Development' },
  { url: 'https://kentcdodds.com/blog/rss.xml', source: 'Kent C. Dodds', defaultCategory: 'Web Development' },
  { url: 'https://www.robinwieruch.de/index.xml', source: 'Robin Wieruch', defaultCategory: 'Web Development' },

  // Tips and Tricks
  { url: 'https://dev.to/feed/tag/tips', source: 'Dev.to', defaultCategory: 'Tips and Tricks' },
  { url: 'https://dev.to/feed/tag/productivity', source: 'Dev.to', defaultCategory: 'Tips and Tricks' },
  { url: 'https://dev.to/feed/tag/tutorial', source: 'Dev.to', defaultCategory: 'Tips and Tricks' },
  { url: 'https://dev.to/feed/tag/beginners', source: 'Dev.to', defaultCategory: 'Tips and Tricks' },
  { url: 'https://dev.to/feed/tag/codenewbie', source: 'Dev.to', defaultCategory: 'Tips and Tricks' },
  { url: 'https://medium.com/feed/tag/tips', source: 'Medium', defaultCategory: 'Tips and Tricks' },
  { url: 'https://medium.com/feed/tag/coding-tips', source: 'Medium', defaultCategory: 'Tips and Tricks' },
  { url: 'https://medium.com/feed/tag/productivity', source: 'Medium', defaultCategory: 'Tips and Tricks' },
  { url: 'https://medium.com/feed/tag/tutorial', source: 'Medium', defaultCategory: 'Tips and Tricks' },
  { url: 'https://www.freecodecamp.org/news/tag/tips/rss/', source: 'freeCodeCamp', defaultCategory: 'Tips and Tricks' },
  { url: 'https://blog.codepen.io/feed/', source: 'CodePen', defaultCategory: 'Tips and Tricks' },
  { url: 'https://davidwalsh.name/feed', source: 'David Walsh', defaultCategory: 'Tips and Tricks' },
  { url: 'https://www.30secondsofcode.org/feed.xml', source: '30 Seconds of Code', defaultCategory: 'Tips and Tricks' },

  // Tech Industry
  { url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', source: 'Ars Technica', defaultCategory: 'Tech Industry' },
  { url: 'https://www.wired.com/feed/rss', source: 'Wired', defaultCategory: 'Tech Industry' },
  { url: 'https://www.technologyreview.com/feed/', source: 'MIT Tech Review', defaultCategory: 'Tech Industry' },
  { url: 'https://medium.com/feed/tag/technology', source: 'Medium', defaultCategory: 'Tech Industry' },
  { url: 'https://medium.com/feed/tag/startup', source: 'Medium', defaultCategory: 'Tech Industry' },
];

// Keywords for categorization
const CATEGORY_KEYWORDS = {
  'AI': ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'claude', 'gemini', 'openai', 'anthropic', 'chatbot', 'neural', 'deep learning', 'transformer', 'diffusion', 'stable diffusion', 'midjourney'],
  'Developer Tools': ['developer', 'code', 'programming', 'github', 'git', 'ide', 'vscode', 'cursor', 'api', 'sdk', 'framework', 'library', 'open source', 'devops', 'ci/cd', 'docker', 'kubernetes'],
  'Web Development': ['javascript', 'typescript', 'react', 'vue', 'angular', 'svelte', 'nextjs', 'css', 'html', 'frontend', 'backend', 'fullstack', 'node', 'deno', 'web', 'browser', 'dom', 'tailwind', 'webpack', 'vite', 'sass', 'scss', 'responsive', 'animation', 'flexbox', 'grid', 'astro', 'remix', 'nuxt', 'gatsby', 'vercel', 'netlify'],
  'Tips and Tricks': ['tip', 'tips', 'trick', 'tricks', 'shortcut', 'hack', 'hacks', 'productivity', 'efficient', 'quick', 'cheatsheet', 'cheat sheet', 'best practice', 'gotcha', 'pro tip', 'tutorial', 'how to', 'guide', 'learn', 'beginner', 'snippet', 'useful', 'hidden feature', 'must know', 'essential'],
  'Tech Industry': ['startup', 'funding', 'acquisition', 'layoff', 'ceo', 'valuation', 'ipo', 'regulation', 'antitrust', 'privacy', 'big tech', 'meta', 'google', 'apple', 'microsoft', 'amazon']
};

// Calculate reading time (words per minute)
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

// Calculate trending score based on recency and source weight
function calculateTrendingScore(date, source) {
  const sourceWeights = {
    'Hacker News': 1.5,
    'TechCrunch': 1.4,
    'The Verge': 1.3,
    'MIT Tech Review': 1.3,
    'Wired': 1.2,
    'ArXiv AI': 1.1,
    'Medium': 1.2,
    'Dev.to': 1.2,
  };

  const hoursAgo = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60);
  const recencyScore = Math.max(0, 100 - hoursAgo * 2); // Decays over ~50 hours
  const weight = sourceWeights[source] || 1.0;

  return Math.round(recencyScore * weight);
}

function categorize(title, content = '') {
  const text = (title + ' ' + content).toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      return category;
    }
  }
  return 'Tech Industry';
}

function extractSummary(item) {
  let content = item.contentSnippet || item.content || item['content:encoded'] || '';
  // Clean and truncate
  content = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return content.length > 200 ? content.slice(0, 197) + '...' : content;
}

async function fetchAllNews() {
  console.log('🔄 Fetching latest tech news...\n');
  const articles = [];
  let id = 1;

  for (const feed of FEEDS) {
    try {
      console.log(`📡 Fetching from ${feed.source}...`);
      const feedData = await parser.parseURL(feed.url);

      const items = feedData.items.slice(0, 10); // Get latest 10 from each

      for (const item of items) {
        const category = categorize(item.title, item.contentSnippet);
        const summary = extractSummary(item) || `Latest from ${feed.source}`;
        const fullText = item.title + ' ' + summary;
        const articleDate = item.isoDate || new Date().toISOString();

        articles.push({
          id: id++,
          title: item.title,
          source: feed.source,
          category,
          url: item.link,
          date: articleDate.split('T')[0],
          summary,
          readingTime: calculateReadingTime(fullText),
          trendingScore: calculateTrendingScore(articleDate, feed.source)
        });
      }

      console.log(`   ✅ Got ${items.length} articles\n`);
    } catch (err) {
      console.log(`   ⚠️  Failed to fetch ${feed.source}: ${err.message}\n`);
    }
  }

  // Sort by date, newest first
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Keep only latest 50
  const finalArticles = articles.slice(0, 50);

  const data = {
    lastUpdated: new Date().toISOString(),
    articles: finalArticles
  };

  // Save to root folder (Astro reads from here at build time)
  const outputPath = path.join(__dirname, 'news-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`\n✨ Saved ${finalArticles.length} articles to news-data.json`);
  console.log(`📅 Last updated: ${data.lastUpdated}`);
}

// Run if called directly
fetchAllNews().catch(console.error);

export { fetchAllNews };
