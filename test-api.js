const fetch = require('node-fetch');

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing API endpoints...');
  console.log('Base URL:', BASE_URL);

  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);

    // Test news endpoint
    console.log('\n2. Testing news endpoint...');
    const newsResponse = await fetch(`${BASE_URL}/api/news`);
    const newsData = await newsResponse.json();
    console.log('News count:', newsData.length);
    console.log('First news item:', newsData[0]?.title);

    // Test analytics endpoint
    console.log('\n3. Testing analytics endpoint...');
    const analyticsResponse = await fetch(`${BASE_URL}/api/analytics`);
    const analyticsData = await analyticsResponse.json();
    console.log('Analytics:', analyticsData);

    // Test search endpoint
    console.log('\n4. Testing search endpoint...');
    const searchResponse = await fetch(`${BASE_URL}/api/search?q=climate`);
    const searchData = await searchResponse.json();
    console.log('Search results:', searchData.length);

    console.log('\n✅ All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    process.exit(1);
  }
}

testAPI(); 