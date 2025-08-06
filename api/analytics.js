export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const analytics = {
    totalEvents: 3,
    hotspots: 3,
    eventDistribution: {
      conflict: 1,
      diplomacy: 1,
      innovation: 1
    },
    topHotspots: [
      {
        region: "Taiwan Strait",
        type: "High Conflict Risk",
        score: 9.2,
        riskLevel: "Critical"
      },
      {
        region: "Geneva",
        type: "Diplomatic Hub",
        score: 8.9,
        riskLevel: "Low"
      },
      {
        region: "San Francisco Bay Area",
        type: "Innovation Center",
        score: 7.2,
        riskLevel: "Low"
      }
    ]
  };

  res.status(200).json(analytics);
};