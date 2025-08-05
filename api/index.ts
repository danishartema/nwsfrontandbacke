import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseStorage } from '../lib/supabase-storage.js';

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
    message: 'NewsMapper API is running successfully with Supabase backend'
  });
}

// Get all news
async function handleGetNews(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const filter = {
      category: req.query.category as string,
      search: req.query.search as string,
      country: req.query.country as string,
      minImpact: req.query.minImpact ? Number(req.query.minImpact) : undefined,
      maxImpact: req.query.maxImpact ? Number(req.query.maxImpact) : undefined,
      categories: req.query.categories ? String(req.query.categories).split(',') : undefined
    };

    const events = await supabaseStorage.getNewsEvents(filter);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news events' });
  }
}

// Get specific news item
async function handleGetNewsById(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const id = Number(req.query.id);
    const newsItem = await supabaseStorage.getNewsEvent(id);

    if (!newsItem) {
      return res.status(404).json({ error: 'News item not found' });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    console.error('Error fetching news item:', error);
    res.status(500).json({ error: 'Failed to fetch news item' });
  }
}

// Analytics endpoint
async function handleAnalytics(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const analytics = await supabaseStorage.getAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
}

// Search events
async function handleSearch(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const events = await supabaseStorage.searchEvents(query);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(500).json({ error: 'Search failed' });
  }
}

// Get events by category
async function handleGetEventsByCategory(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const category = req.query.category as string;
    const events = await supabaseStorage.getEventsByCategory(category);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events by category:', error);
    res.status(500).json({ error: 'Failed to fetch events by category' });
  }
}

// Get events by country
async function handleGetEventsByCountry(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const country = req.query.country as string;
    const events = await supabaseStorage.getEventsByCountry(country);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events by country:', error);
    res.status(500).json({ error: 'Failed to fetch events by country' });
  }
}

// Generate study guide
async function handleGenerateStudyGuide(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const eventId = Number(req.query.eventId);
    const options = req.body || {};
    
    const studyGuide = await supabaseStorage.generateStudyGuide(eventId, options);
    if (!studyGuide) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.status(200).json(studyGuide);
  } catch (error) {
    console.error('Error generating study guide:', error);
    res.status(500).json({ error: 'Failed to generate study guide' });
  }
}

// Get all study guides
async function handleGetAllStudyGuides(req: VercelRequest, res: VercelResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const studyGuides = await supabaseStorage.getAllStudyGuides();
    res.status(200).json(studyGuides);
  } catch (error) {
    console.error('Error fetching study guides:', error);
    res.status(500).json({ error: 'Failed to fetch study guides' });
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
        return await handleGetNews(req, res);
      }
    }

    if (pathname.startsWith('/api/news/') && req.query.id) {
      if (req.method === 'GET') {
        return await handleGetNewsById(req, res);
      }
    }

    if (pathname === '/api/analytics') {
      if (req.method === 'GET') {
        return await handleAnalytics(req, res);
      }
    }

    if (pathname === '/api/search') {
      if (req.method === 'GET') {
        return await handleSearch(req, res);
      }
    }

    if (pathname === '/api/category') {
      if (req.method === 'GET') {
        return await handleGetEventsByCategory(req, res);
      }
    }

    if (pathname === '/api/country') {
      if (req.method === 'GET') {
        return await handleGetEventsByCountry(req, res);
      }
    }

    if (pathname.startsWith('/api/study-guide/') && req.query.eventId) {
      if (req.method === 'POST') {
        return await handleGenerateStudyGuide(req, res);
      }
      if (req.method === 'GET') {
        return await handleGenerateStudyGuide(req, res);
      }
    }

    if (pathname === '/api/study-guides') {
      if (req.method === 'GET') {
        return await handleGetAllStudyGuides(req, res);
      }
    }

    // Serve static files for the React app
    if (pathname === '/' || pathname.startsWith('/assets/') || pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.html')) {
      // For now, return a simple HTML response
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
            .supabase-info { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🌍 NewsMapper API</h1>
            <p class="status">✅ API is running successfully with Supabase backend!</p>
            
            <div class="supabase-info">
              <h3>🔗 Database: Supabase</h3>
              <p>This application now uses Supabase as the database backend, providing reliable data persistence and real-time capabilities.</p>
            </div>
            
            <div class="api-info">
              <h3>Available Endpoints:</h3>
              <div class="endpoint">GET /api/health - Health check</div>
              <div class="endpoint">GET /api/news - Get all news events</div>
              <div class="endpoint">GET /api/news?id=1 - Get specific news event</div>
              <div class="endpoint">GET /api/analytics - Get analytics data</div>
              <div class="endpoint">GET /api/search?q=query - Search events</div>
              <div class="endpoint">GET /api/category?category=conflict - Get events by category</div>
              <div class="endpoint">GET /api/country?country=China - Get events by country</div>
              <div class="endpoint">POST /api/study-guide?eventId=1 - Generate study guide</div>
              <div class="endpoint">GET /api/study-guides - Get all study guides</div>
            </div>
            
            <p>This is a simplified version of the NewsMapper application with Supabase integration. The full React frontend will be available once the build process is optimized.</p>
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
      message: 'Something went wrong on our end'
    });
  }
} 