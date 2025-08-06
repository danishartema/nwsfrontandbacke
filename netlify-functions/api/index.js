// Netlify serverless function for API
exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { path } = event;

  // Mock data
  const newsData = [
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
    }
  ];

  // Route handling
  if (path === '/api/news') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(newsData)
    };
  }

  if (path === '/api/health') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'NewsMapper API is running successfully'
      })
    };
  }

  // Default response
  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: 'Endpoint not found' })
  };
}; 