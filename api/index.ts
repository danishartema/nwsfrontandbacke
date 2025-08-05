import type { VercelRequest, VercelResponse } from '@vercel/node';

// Import shared schema types
import { NewsEvent } from '../shared/schema';

// Comprehensive news data with all required fields
const newsData: NewsEvent[] = [
  {
    id: 1,
    title: "Tensions Escalate Between China and Taiwan After Military Drills",
    source: "Reuters",
    published_date: "2025-08-03",
    content: "China conducted large-scale military drills around Taiwan's airspace and waters, raising concerns about regional stability. The exercises included air and naval operations in the Taiwan Strait, prompting strong responses from Taiwan and international observers.",
    location: { 
      country: "Taiwan", 
      city: "Taipei", 
      latitude: 25.0330, 
      longitude: 121.5654 
    },
    category: "conflict",
    sentiment: "negative",
    sentiment_score: 0.85,
    geopolitical_impact: 9.5,
    economic_impact: 8.7,
    conflict_escalation_probability: 0.75,
    ai_summary: "China's military exercises around Taiwan represent a significant escalation in regional tensions, with potential implications for global trade routes and international relations.",
    educational_context: {
      learning_objectives: [
        "Understand the historical context of China-Taiwan relations",
        "Analyze the geopolitical implications of military exercises",
        "Evaluate the role of international law in territorial disputes"
      ],
      related_topics: ["One China Policy", "Taiwan Strait", "Military Diplomacy", "Regional Security"]
    },
    entities: {
      countries: ["China", "Taiwan", "United States"],
      people: ["Xi Jinping", "Tsai Ing-wen"],
      organizations: ["People's Liberation Army", "Taiwan Defense Ministry"]
    },
    trend_analysis: "Increasing military posturing in the Asia-Pacific region suggests a potential shift toward more confrontational diplomacy.",
    tags: ["military", "tensions", "Asia-Pacific", "diplomacy"],
    related_events: [2, 3],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 2,
    title: "UN Hosts Global Summit on Climate Action in Geneva",
    source: "BBC",
    published_date: "2025-08-01",
    content: "World leaders gathered in Geneva for a critical climate summit aimed at accelerating global climate action. The summit focused on implementing the Paris Agreement goals and establishing new commitments for carbon reduction.",
    location: { 
      country: "Switzerland", 
      city: "Geneva", 
      latitude: 46.2044, 
      longitude: 6.1432 
    },
    category: "diplomacy",
    sentiment: "positive",
    sentiment_score: 0.78,
    geopolitical_impact: 8.9,
    economic_impact: 9.2,
    conflict_escalation_probability: 0.1,
    ai_summary: "The Geneva climate summit represents a crucial moment for international cooperation on climate change, with potential for significant policy developments.",
    educational_context: {
      learning_objectives: [
        "Understand the Paris Agreement and its implementation",
        "Analyze international cooperation on climate issues",
        "Evaluate the economic implications of climate policies"
      ],
      related_topics: ["Climate Change", "Paris Agreement", "International Cooperation", "Sustainable Development"]
    },
    entities: {
      countries: ["Switzerland", "United States", "China", "European Union"],
      people: ["António Guterres", "Climate Envoys"],
      organizations: ["United Nations", "World Bank", "IMF"]
    },
    trend_analysis: "Growing international consensus on climate action suggests a shift toward more coordinated global environmental policies.",
    tags: ["climate", "summit", "cooperation", "environment"],
    related_events: [1, 3],
    study_guide: null,
    created_at: new Date()
  },
  {
    id: 3,
    title: "Major Tech Innovation in Renewable Energy Storage",
    source: "TechCrunch",
    published_date: "2025-07-30",
    content: "A breakthrough in battery technology promises to revolutionize renewable energy storage, potentially solving the intermittency problem of solar and wind power.",
    location: { 
      country: "United States", 
      city: "San Francisco", 
      latitude: 37.7749, 
      longitude: -122.4194 
    },
    category: "innovation",
    sentiment: "positive",
    sentiment_score: 0.92,
    geopolitical_impact: 7.2,
    economic_impact: 9.8,
    conflict_escalation_probability: 0.05,
    ai_summary: "This technological breakthrough could accelerate the global transition to renewable energy and reduce dependence on fossil fuels.",
    educational_context: {
      learning_objectives: [
        "Understand renewable energy technologies and challenges",
        "Analyze the impact of technological innovation on geopolitics",
        "Evaluate the economic implications of energy transitions"
      ],
      related_topics: ["Renewable Energy", "Battery Technology", "Energy Security", "Climate Innovation"]
    },
    entities: {
      countries: ["United States", "China", "Germany"],
      people: ["Tech Entrepreneurs", "Energy Researchers"],
      organizations: ["Tesla", "Energy Research Institutes", "Venture Capital Firms"]
    },
    trend_analysis: "Accelerating innovation in clean energy technology suggests a fundamental shift in global energy markets.",
    tags: ["innovation", "renewable energy", "technology", "sustainability"],
    related_events: [1, 2],
    study_guide: null,
    created_at: new Date()
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
      const analytics = {
        totalEvents: newsData.length,
        hotspots: 3,
        eventDistribution: {
          conflict: newsData.filter(e => e.category === 'conflict').length,
          diplomacy: newsData.filter(e => e.category === 'diplomacy').length,
          innovation: newsData.filter(e => e.category === 'innovation').length
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
      return res.status(200).json(analytics);
    }

    // Search events
    if (pathname === '/api/search' && req.method === 'GET') {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
      }
      
      const filteredEvents = newsData.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.content.toLowerCase().includes(query.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      
      return res.status(200).json(filteredEvents);
    }

    // Get events by category
    if (pathname.startsWith('/api/category/') && req.method === 'GET') {
      const category = pathname.split('/').pop();
      const filteredEvents = newsData.filter(event => event.category === category);
      return res.status(200).json(filteredEvents);
    }

    // Get events by country
    if (pathname.startsWith('/api/country/') && req.method === 'GET') {
      const country = pathname.split('/').pop();
      const filteredEvents = newsData.filter(event => 
        event.location.country.toLowerCase() === country?.toLowerCase()
      );
      return res.status(200).json(filteredEvents);
    }

    // Study guide generation (simplified)
    if (pathname.startsWith('/api/study-guide/') && req.method === 'POST') {
      const eventId = Number(pathname.split('/').pop());
      const event = newsData.find(e => e.id === eventId);
      
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      const studyGuide = {
        eventId: event.id,
        title: event.title,
        summary: event.ai_summary,
        learningObjectives: event.educational_context.learning_objectives,
        relatedTopics: event.educational_context.related_topics,
        keyQuestions: [
          "What are the historical roots of this event?",
          "How does this event impact global relations?",
          "What are the potential future implications?"
        ],
        resources: [
          "UN Reports",
          "Academic Papers",
          "Expert Analysis"
        ]
      };
      
      return res.status(200).json(studyGuide);
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
              <div class="endpoint">GET /api/search?q=climate - Search events</div>
              <div class="endpoint">GET /api/category/conflict - Get events by category</div>
              <div class="endpoint">GET /api/country/taiwan - Get events by country</div>
              <div class="endpoint">POST /api/study-guide/1 - Generate study guide</div>
            </div>
            
            <p>This is a comprehensive NewsMapper API with educational features.</p>
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