const newsData = require('./newsData');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const query = req.query && req.query.q;
    if (!query) return res.status(400).json({ error: "Query parameter 'q' is required" });
    const filteredEvents = newsData.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.content.toLowerCase().includes(query.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    return res.status(200).json(filteredEvents);
  }
  return res.status(405).json({ error: 'Method not allowed' });
};