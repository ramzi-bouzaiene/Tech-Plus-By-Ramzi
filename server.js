const express = require('express');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');
const { fetchAllNews } = require('./fetch-news');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for news
app.get('/api/news', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'news-data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load news data' });
  }
});

// Schedule daily fetch at 8 AM
cron.schedule('0 8 * * *', async () => {
  console.log('\n🕗 Running scheduled news fetch...');
  try {
    await fetchAllNews();
    console.log('✅ Scheduled fetch complete\n');
  } catch (err) {
    console.error('❌ Scheduled fetch failed:', err.message);
  }
});

app.listen(PORT, () => {
  console.log(`
╭──────────────────────────────────────╮
│                                      │
│   🚀 Tech Plus By Ramzi News Server          │
│                                      │
│   Running at http://localhost:${PORT}   │
│                                      │
│   News updates daily at 8:00 AM      │
│                                      │
╰──────────────────────────────────────╯
`);
});
