
import { handler } from './api/index.ts';

console.log('API handler imported successfully ✓');

// Create mock request and response objects
const mockReq = {
  method: 'GET',
  url: '/api/health',
  path: '/api/health',
  headers: {},
  query: {},
  body: {}
};

const mockRes = {
  status: (code) => {
    console.log(`Response status: ${code} ✓`);
    return mockRes;
  },
  json: (data) => {
    console.log('Response data:', JSON.stringify(data, null, 2));
    return mockRes;
  },
  send: (data) => {
    console.log('Response sent:', data);
    return mockRes;
  }
};

// Test the handler
async function testHandler() {
  try {
    console.log('Calling handler...');
    await handler(mockReq, mockRes);
    console.log('Handler test completed successfully ✓');
  } catch (error) {
    console.error('Handler test failed:', error);
    process.exit(1);
  }
}

testHandler();
