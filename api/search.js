export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  // Mock search results
  const searchResults = [
    {
      id: 1,
      title: "Tensions Escalate Between China and Taiwan",
      content: "Recent military drills have raised concerns...",
      category: "conflict"
    }
  ];

  res.status(200).json(searchResults);
};