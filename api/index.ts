import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory data
const newsData = [
  {
    id: 1,
    title: "Tensions Escalate Between China and Taiwan After Military Drills",
    source: "Reuters",
    published_date: "2025-08-03",
    content: "China conducted large-scale military drills around Taiwan's airspace and waters.",
    location: { country: "Taiwan", city: "Taipei", latitude: 25.0330, longitude: 121.5654 },
    category: "conflict",
    sentiment: "Negative",
    geopolitical_impact: 9.5,
    economic_impact: 8.7
  },
  {
    id: 2,
    title: "UN Hosts Global Summit on Climate Action in Geneva",
    source: "BBC",
    published_date: "2025-08-01",
    content: "World leaders gathered in Geneva for a critical climate summit.",
    location: { country: "Switzerland", city: "Geneva", latitude: 46.2044, longitude: 6.1432 },
    category: "diplomacy",
    sentiment: "Positive",
    geopolitical_impact: 8.9,
    economic_impact: 9.2
  }
];

// Main handler function
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { pathname } = new URL(req.url || '/', `http://${req.headers.host}`);

    // Health check
    if (pathname === '/api/health') {
      return res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'NewsMapper API is running successfully'
      });
    }

    // Get all news
    if (pathname === '/api/news' && req.method === 'GET') {
      return res.status(200).json(newsData);
    }

    // Get specific news
    if (pathname.startsWith('/api/news/') && req.method === 'GET') {
      const id = Number(req.query.id);
      const newsItem = newsData.find(item => item.id === id);
      
      if (!newsItem) {
        return res.status(404).json({ error: 'News item not found' });
      }
      
      return res.status(200).json(newsItem);
    }

    // Analytics
    if (pathname === '/api/analytics' && req.method === 'GET') {
      return res.status(200).json({
        totalEvents: newsData.length,
        hotspots: 3,
        eventDistribution: {
          conflict: 1,
          diplomacy: 1
        },
        topHotspots: [
          {
            region: "Taiwan Strait",
            type: "High Conflict Risk",
            score: 9.2,
            riskLevel: "Critical"
          }
        ]
      });
    }

    // Serve main page
    if (pathname === '/') {
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>NewsMapper - Geo-Political News Mapper</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; text-align: center; }
            .api-info { background: #f0f8ff; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .endpoint { background: #f9f9f9; padding: 10px; margin: 5px 0; border-left: 4px solid #007bff; }
            .status { color: green; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🌍 NewsMapper API</h1>
            <p class="status">✅ API is running successfully!</p>
            
            <div class="api-info">
              <h3>Available Endpoints:</h3>
              <div class="endpoint">GET /api/health - Health check</div>
              <div class="endpoint">GET /api/news - Get all news events</div>
              <div class="endpoint">GET /api/news?id=1 - Get specific news event</div>
              <div class="endpoint">GET /api/analytics - Get analytics data</div>
            </div>
            
            <p>This is a simplified version of the NewsMapper application.</p>
          </div>
        </body>
        </html>
      `);
    }

    // 404 for unknown routes
    return res.status(404).json({ error: 'Endpoint not found' });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
} 