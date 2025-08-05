const newsData = require('./newsData');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const analytics = {
      totalEvents: newsData.length,
      hotspots: 3,
      eventDistribution: {
        conflict: newsData.filter(e => e.category === 'conflict').length,
        diplomacy: newsData.filter(e => e.category === 'diplomacy').length,
        innovation: newsData.filter(e => e.category === 'innovation').length
      },
      topHotspots: [
        { region: "Taiwan Strait", type: "High Conflict Risk", score: 9.2, riskLevel: "Critical" },
        { region: "Geneva", type: "Diplomatic Hub", score: 8.9, riskLevel: "Low" },
        { region: "San Francisco Bay Area", type: "Innovation Center", score: 7.2, riskLevel: "Low" }
      ]
    };
    return res.status(200).json(analytics);
  }
  return res.status(405).json({ error: 'Method not allowed' });
};