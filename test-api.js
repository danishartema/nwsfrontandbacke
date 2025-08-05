import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Testing API handler...');

// Check if the client build exists
const distPublicPath = path.join(process.cwd(), 'dist', 'public');
if (!fs.existsSync(distPublicPath)) {
  console.error('Client build not found. Please run: npm run build:client');
  process.exit(1);
}

console.log('Client build found ✓');

// Test the API handler using tsx (TypeScript runner)
try {
  console.log('Testing API handler with tsx...');
  
  // Create a simple test script
  const testScript = `
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
    console.log(\`Response status: \${code} ✓\`);
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
`;

  // Write the test script to a temporary file
  const testFile = path.join(process.cwd(), 'temp-test.js');
  fs.writeFileSync(testFile, testScript);

  // Run the test with tsx
  execSync('npx tsx temp-test.js', { stdio: 'inherit' });
  
  // Clean up
  fs.unlinkSync(testFile);
  
  console.log('All tests passed! ✓');
} catch (error) {
  console.error('Test failed:', error.message);
  process.exit(1);
} 