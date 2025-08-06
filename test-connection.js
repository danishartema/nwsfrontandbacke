// Test script to verify frontend-backend connectivity
const fetch = require('node-fetch');

async function testConnection() {
  console.log('🔍 Testing NewsMapper API connectivity...\n');

  const tests = [
    { name: 'Health Check', url: 'http://localhost:5000/api/health' },
    { name: 'News Events', url: 'http://localhost:5000/api/news' },
    { name: 'Analytics', url: 'http://localhost:5000/api/analytics' },
    { name: 'Search', url: 'http://localhost:5000/api/search?q=climate' }
  ];

  for (const test of tests) {
    try {
      console.log(`Testing ${test.name}...`);
      const response = await fetch(test.url);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${test.name}: SUCCESS`);
        
        if (test.name === 'News Events') {
          console.log(`   📊 Found ${data.length} news events`);
        } else if (test.name === 'Analytics') {
          console.log(`   📈 Total events: ${data.totalEvents}, Hotspots: ${data.hotspots}`);
        }
      } else {
        console.log(`❌ ${test.name}: FAILED (${response.status})`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`);
    }
    console.log('');
  }

  console.log('🎯 Connection test completed!');
  console.log('\n📝 Next steps:');
  console.log('1. Start the server: npm run dev:server');
  console.log('2. Start the client: npm run dev:client');
  console.log('3. Open http://localhost:5173 in your browser');
}

testConnection();