export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { category } = req.query;
    
    // Mock data for categories
    const mockData = [
      {
        id: 1,
        title: "Tensions Escalate Between China and Taiwan",
        content: "Recent military drills have raised concerns...",
        category: "conflict"
      },
      {
        id: 2,
        title: "UN Climate Summit",
        content: "World leaders gather for climate action...",
        category: "diplomacy"
      },
      {
        id: 3,
        title: "Tech Innovation Breakthrough",
        content: "New battery technology revolutionizes energy storage...",
        category: "innovation"
      }
    ];
    
    const filteredEvents = mockData.filter(event => event.category === category);
    return res.status(200).json(filteredEvents);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
};