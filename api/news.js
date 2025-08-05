const newsData = require('./newsData');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    if (req.query && req.query.id) {
      const id = Number(req.query.id);
      const newsItem = newsData.find(item => item.id === id);
      if (!newsItem) return res.status(404).json({ error: 'News item not found' });
      return res.status(200).json(newsItem);
    }
    return res.status(200).json(newsData);
  }
  return res.status(405).json({ error: 'Method not allowed' });
};