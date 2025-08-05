const newsData = require('../newsData');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const { country } = req.query;
    const filteredEvents = newsData.filter(event =>
      event.location.country.toLowerCase() === country?.toLowerCase()
    );
    return res.status(200).json(filteredEvents);
  }
  return res.status(405).json({ error: 'Method not allowed' });
};