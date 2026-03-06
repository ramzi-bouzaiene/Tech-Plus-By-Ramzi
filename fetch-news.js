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
  { url: 'https://github.blog/feed/', source: 'GitHub Blog', defaultCategory: 'Developer Tools' },
  { url: 'https://dev.to/feed', source: 'Dev.to', defaultCategory: 'Developer Tools' },
  { url: 'https://dev.to/feed/tag/programming', source: 'Dev.to', defaultCategory: 'Developer Tools' },
  { url: 'https://dev.to/feed/tag/opensource', source: 'Dev.to', defaultCategory: 'Developer Tools' },
  { url: 'https://dev.to/feed/tag/devops', source: 'Dev.to', defaultCategory: 'Developer Tools' },
  { url: 'https://medium.com/feed/tag/programming', source: 'Medium', defaultCategory: 'Developer Tools' },
  { url: 'https://medium.com/feed/tag/software-development', source: 'Medium', defaultCategory: 'Developer Tools' },

  // Web Development - Core Resources
  { url: 'https://css-tricks.com/feed/', source: 'CSS-Tricks', defaultCategory: 'Web Development' },
  { url: 'https://www.smashingmagazine.com/feed/', source: 'Smashing Magazine', defaultCategory: 'Web Development' },
  { url: 'https://web.dev/feed.xml', source: 'web.dev', defaultCategory: 'Web Development' },
  { url: 'https://www.freecodecamp.org/news/rss/', source: 'freeCodeCamp', defaultCategory: 'Web Development' },
  { url: 'https://daily.dev/blog/rss.xml', source: 'daily.dev', defaultCategory: 'Web Development' },
  { url: 'https://blog.logrocket.com/feed/', source: 'LogRocket', defaultCategory: 'Web Development' },
  { url: 'https://blog.bitsrc.io/feed', source: 'Bits and Pieces', defaultCategory: 'Web Development' },

  // Dev.to - Languages
  { url: 'https://dev.to/feed/tag/webdev', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/javascript', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/typescript', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/python', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/php', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/ruby', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/go', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/rust', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/java', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/csharp', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/kotlin', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/swift', source: 'Dev.to', defaultCategory: 'Web Development' },

  // Dev.to - Frontend Frameworks
  { url: 'https://dev.to/feed/tag/react', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/vue', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/angular', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/svelte', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/nextjs', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/nuxt', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/gatsby', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/remix', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/astro', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/solidjs', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/qwik', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/htmx', source: 'Dev.to', defaultCategory: 'Web Development' },

  // Dev.to - Backend & Runtime
  { url: 'https://dev.to/feed/tag/node', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/deno', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/bun', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/express', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/nestjs', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/fastapi', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/django', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/flask', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/rails', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/laravel', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/spring', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/dotnet', source: 'Dev.to', defaultCategory: 'Web Development' },

  // Dev.to - CSS & Styling
  { url: 'https://dev.to/feed/tag/css', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/html', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/tailwindcss', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/sass', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/bootstrap', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/materialui', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/styledcomponents', source: 'Dev.to', defaultCategory: 'Web Development' },

  // Dev.to - State & Data
  { url: 'https://dev.to/feed/tag/redux', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/graphql', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/api', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/restapi', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/prisma', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/mongodb', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/postgresql', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/firebase', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/supabase', source: 'Dev.to', defaultCategory: 'Web Development' },

  // Dev.to - Testing & Tools
  { url: 'https://dev.to/feed/tag/testing', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/jest', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/cypress', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/playwright', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/webpack', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/vite', source: 'Dev.to', defaultCategory: 'Web Development' },
  { url: 'https://dev.to/feed/tag/eslint', source: 'Dev.to', defaultCategory: 'Web Development' },

  // Medium - Languages & Frameworks
  { url: 'https://medium.com/feed/tag/javascript', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/typescript', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/python', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/web-development', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/react', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/vuejs', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/angular', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/nextjs', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/svelte', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/frontend', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/backend', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/css', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/nodejs', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/graphql', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/django', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/golang', source: 'Medium', defaultCategory: 'Web Development' },
  { url: 'https://medium.com/feed/tag/rust', source: 'Medium', defaultCategory: 'Web Development' },

  // Expert Blogs
  { url: 'https://www.joshwcomeau.com/rss.xml', source: 'Josh W Comeau', defaultCategory: 'Web Development' },
  { url: 'https://kentcdodds.com/blog/rss.xml', source: 'Kent C. Dodds', defaultCategory: 'Web Development' },
  { url: 'https://www.robinwieruch.de/index.xml', source: 'Robin Wieruch', defaultCategory: 'Web Development' },
  { url: 'https://www.taniarascia.com/rss.xml', source: 'Tania Rascia', defaultCategory: 'Web Development' },
  { url: 'https://jakearchibald.com/posts.rss', source: 'Jake Archibald', defaultCategory: 'Web Development' },
  { url: 'https://addyosmani.com/rss.xml', source: 'Addy Osmani', defaultCategory: 'Web Development' },

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
'AI': [
    'ai', 'artificial intelligence', 'machine learning', 'ml',
    'deep learning', 'neural network', 'neural networks',
    'transformer', 'attention', 'diffusion', 'stable diffusion',

    'llm', 'large language model', 'foundation model',
    'generative ai', 'genai',

    'gpt', 'chatgpt', 'claude', 'gemini',
    'openai', 'anthropic', 'deepmind',

    'copilot', 'ai assistant', 'coding assistant',
    'ai agent', 'autonomous agent', 'agentic ai',

    'chatbot', 'ai chatbot', 'conversational ai',

    'computer vision', 'nlp', 'natural language processing',
    'speech recognition', 'text to speech', 'speech to text',

    'image generation', 'text to image', 'image diffusion',
    'midjourney', 'dalle', 'dall-e', 'runwayml',

    'fine tuning', 'model training', 'inference',
    'prompt engineering', 'prompt design',

    'rag', 'retrieval augmented generation',
    'vector database', 'embedding', 'semantic search',

    'huggingface', 'transformers library',
    'pytorch', 'tensorflow', 'keras', 'jax',

    'langchain', 'llamaindex', 'autogen',
    'ollama', 'vllm', 'llama', 'mistral', 'mixtral',

    'model serving', 'mlops', 'ai pipeline',
    'model deployment', 'model optimization',

    'gpu', 'cuda', 'tensor cores', 'ai accelerator'
],  'Developer Tools': ['developer', 'code', 'programming', 'github', 'git', 'ide', 'vscode', 'cursor', 'api', 'sdk', 'framework', 'library', 'open source', 'devops', 'ci/cd', 'docker', 'kubernetes'],
'Web Development': [
    'javascript', 'typescript', 'react', 'vue', 'angular', 'svelte',
    'nextjs', 'next.js', 'nuxt', 'nuxtjs', 'gatsby', 'remix', 'astro',

    'html', 'html5', 'css', 'css3',
    'sass', 'scss', 'less',
    'tailwind', 'bootstrap', 'material ui', 'chakra ui',

    'frontend', 'backend', 'fullstack',
    'web', 'webdev', 'web development',

    'node', 'nodejs', 'node.js',
    'deno', 'bun',

    'browser', 'dom', 'web api', 'web components',

    'responsive design', 'mobile first',
    'flexbox', 'css grid', 'grid layout',
    'animation', 'css animation', 'css transition',

    'webpack', 'vite', 'rollup', 'parcel', 'babel',

    'rest api', 'graphql', 'api design', 'openapi',

    'authentication', 'jwt', 'oauth', 'session',

    'testing', 'unit testing', 'integration testing',
    'jest', 'mocha', 'chai', 'vitest',
    'cypress', 'playwright',

    'seo', 'web performance', 'lazy loading',
    'server side rendering', 'ssr',
    'static site generation', 'ssg',

    'pwa', 'progressive web app',

    'docker', 'deployment', 'ci cd',
    'vercel', 'netlify', 'cloudflare',

    'java', 'python', 'ruby', 'php', 'go', 'golang',
    'rust', 'dotnet', '.net',

    'spring', 'spring boot',
    'django', 'flask',
    'rails', 'ruby on rails',
    'laravel',
    'express', 'fastify', 'nestjs'
],'Tips and Tricks': [
    'tip', 'tips', 'trick', 'tricks', 'pro tip', 'developer tips',
    'coding tips', 'programming tips', 'engineering tips',
    'shortcut', 'shortcuts', 'hack', 'hacks', 'lifehack',
    'productivity', 'developer productivity', 'efficient coding',
    'best practice', 'best practices', 'coding standards',
    'clean code', 'code quality', 'refactoring',
    'tutorial', 'tutorials', 'how to', 'step by step',
    'guide', 'developer guide', 'programming guide',
    'walkthrough', 'example', 'code example',
    'snippet', 'code snippet', 'sample code',
    'beginner', 'beginners', 'getting started',
    'advanced', 'advanced techniques',
    'debugging', 'debugging tips', 'troubleshooting',
    'fix', 'bug fix', 'common mistakes',
    'optimization', 'performance optimization',
    'speed up', 'performance tips',
    'design pattern', 'design patterns',
    'software architecture', 'system design',
    'scalability', 'best way', 'recommended approach',
    'developer workflow', 'development workflow',
    'dev tips', 'engineering tricks',
    'must know', 'essential', 'deep dive',
    'explained', 'implementation', 'integration'],
'Tech Industry': [
    'startup', 'startups', 'tech startup',
    'funding', 'seed funding', 'series a', 'series b', 'series c', 'venture capital', 'vc',
    'investment', 'investor', 'valuation', 'unicorn',
    'ipo', 'public offering',
    'acquisition', 'acquired', 'merger', 'm&a', 'buyout',
    'layoff', 'layoffs', 'job cuts', 'hiring freeze', 'restructuring',
    'ceo', 'cto', 'founder', 'co-founder', 'executive', 'leadership',
    'regulation', 'antitrust', 'privacy', 'data protection', 'compliance',
    'big tech', 'tech giants',

    'meta', 'facebook',
    'google', 'alphabet',
    'apple',
    'microsoft',
    'amazon', 'aws',

    'openai', 'anthropic',
    'nvidia', 'intel', 'amd',
    'tesla', 'spacex',
    'netflix', 'spotify',
    'oracle', 'salesforce',
    'adobe', 'ibm',
    'tencent', 'alibaba', 'bytedance',
    'samsung', 'sony',

    'ai industry', 'artificial intelligence industry',
    'cloud computing', 'saas', 'platform',
    'developer ecosystem', 'tech ecosystem',
    'tech layoffs', 'tech hiring',
    'tech market', 'tech trends',
    'industry analysis', 'market share'
]};

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

  // Keep articles from last 7 days for category views, more articles total
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const weeklyArticles = articles.filter(a => new Date(a.date) >= sevenDaysAgo);

  // Keep up to 300 articles (weekly accumulation with more web dev content)
  const finalArticles = weeklyArticles.slice(0, 300);

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
