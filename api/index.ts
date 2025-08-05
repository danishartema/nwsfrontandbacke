import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory data as fallback
const sampleNewsData = [
  {
    id: 1,
    title: "Tensions Escalate Between China and Taiwan After Military Drills",
    source: "Reuters",
    published_date: "2025-08-03",
    content: "China conducted large-scale military drills around Taiwan's airspace and waters, involving over 150 aircraft and 30 naval vessels in the largest display of force this year.",
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
    content: "World leaders gathered in Geneva for a critical climate summit, securing commitments for $300 billion in climate financing and establishing new carbon reduction targets.",
    location: { country: "Switzerland", city: "Geneva", latitude: 46.2044, longitude: 6.1432 },
    category: "diplomacy",
    sentiment: "Positive",
    geopolitical_impact: 8.9,
    economic_impact: 9.2
  },
  {
    id: 3,
    title: "Deadly Earthquake Hits Northern Japan",
    source: "NHK World",
    published_date: "2025-07-28",
    content: "A devastating 7.4 magnitude earthquake struck northern Japan, causing widespread destruction and triggering tsunami warnings across the Pacific Rim.",
    location: { country: "Japan", city: "Sendai", latitude: 38.2682, longitude: 140.8694 },
    category: "disaster",
    sentiment: "Negative",
    geopolitical_impact: 6.8,
    economic_impact: 8.5
  }
];

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Health check endpoint
function handleHealth(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    message: 'NewsMapper API is running successfully',
    supabase_configured: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  });
}

// Get all news
function handleGetNews(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const { category, search, country } = req.query;
    let filteredData = [...sampleNewsData];

    // Apply filters
    if (category) {
      filteredData = filteredData.filter(item => 
        item.category.toLowerCase() === String(category).toLowerCase()
      );
    }

    if (search) {
      const searchTerm = String(search).toLowerCase();
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.location.country.toLowerCase().includes(searchTerm)
      );
    }

    if (country) {
      const countryTerm = String(country).toLowerCase();
      filteredData = filteredData.filter(item =>
        item.location.country.toLowerCase().includes(countryTerm)
      );
    }

    res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error in handleGetNews:', error);
    res.status(500).json({ error: 'Failed to fetch news events' });
  }
}

// Get specific news item
function handleGetNewsById(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const id = Number(req.query.id);
    const newsItem = sampleNewsData.find(item => item.id === id);

    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    console.error('Error in handleGetNewsById:', error);
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
}

// Analytics endpoint
function handleAnalytics(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const analytics = {
      totalEvents: sampleNewsData.length,
      hotspots: 3,
      eventDistribution: sampleNewsData.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      topHotspots: [
        {
          region: "Taiwan Strait",
          type: "High Conflict Risk",
          score: 9.2,
          riskLevel: "Critical"
        },
        {
          region: "South Asia",
          type: "Climate Impact",
          score: 8.7,
          riskLevel: "High"
        },
        {
          region: "Middle East",
          type: "Diplomatic Activity",
          score: 7.9,
          riskLevel: "Medium"
        }
      ]
    };

    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error in handleAnalytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}

// Main handler function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log(`${req.method} ${req.url}`);

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.setHeader('Content-Type', 'application/json');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(200).end();
    }

    const { pathname } = new URL(req.url || '/', `http://${req.headers.host}`);

    // Route handling
    if (pathname === '/api/health') {
      return handleHealth(req, res);
    }

    if (pathname === '/api/news') {
      if (req.method === 'GET') {
        return handleGetNews(req, res);
      }
    }

    if (pathname.startsWith('/api/news/') && req.query.id) {
      if (req.method === 'GET') {
        return handleGetNewsById(req, res);
      }
    }

    if (pathname === '/api/analytics') {
      if (req.method === 'GET') {
        return handleAnalytics(req, res);
      }
    }

    // Serve static files for the React app
    if (pathname === '/' || pathname.startsWith('/assets/') || pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.html')) {
      // Return a simple HTML response
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
            .env-info { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🌍 NewsMapper API</h1>
            <p class="status">✅ API is running successfully!</p>
            
            <div class="env-info">
              <h3>🔧 Environment Status</h3>
              <p><strong>Supabase URL:</strong> ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configured' : '❌ Not configured'}</p>
              <p><strong>Supabase Key:</strong> ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Not configured'}</p>
            </div>
            
            <div class="api-info">
              <h3>Available Endpoints:</h3>
              <div class="endpoint">GET /api/health - Health check</div>
              <div class="endpoint">GET /api/news - Get all news events</div>
              <div class="endpoint">GET /api/news?id=1 - Get specific news event</div>
              <div class="endpoint">GET /api/analytics - Get analytics data</div>
            </div>
            
            <p>This is a simplified version of the NewsMapper application. The full React frontend will be available once the build process is optimized.</p>
          </div>
        </body>
        </html>
      `);
    }

    // 404 for unknown routes
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ error: 'Endpoint not found' });

  } catch (error) {
    console.error('Handler error:', error);
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Something went wrong on our end',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 