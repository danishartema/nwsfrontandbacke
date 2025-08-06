export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const { country } = req.query;
    
    // Mock data for countries
    const mockData = [
      {
        id: 1,
        title: "Tensions Escalate Between China and Taiwan",
        content: "Recent military drills have raised concerns...",
        category: "conflict",
        location: { country: "Taiwan", city: "Taipei" }
      },
      {
        id: 2,
        title: "UN Climate Summit",
        content: "World leaders gather for climate action...",
        category: "diplomacy",
        location: { country: "Switzerland", city: "Geneva" }
      },
      {
        id: 3,
        title: "Tech Innovation Breakthrough",
        content: "New battery technology revolutionizes energy storage...",
        category: "innovation",
        location: { country: "United States", city: "San Francisco" }
      }
    ];
    
    const filteredEvents = mockData.filter(event =>
      event.location.country.toLowerCase() === country?.toLowerCase()
    );
    return res.status(200).json(filteredEvents);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
};