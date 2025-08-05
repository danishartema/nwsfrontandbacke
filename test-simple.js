import { handler } from './api/index.ts';

console.log('Testing simplified API handler...');

// Test health endpoint
const healthReq = {
  method: 'GET',
  url: '/api/health',
  headers: { host: 'localhost:3000' },
  query: {}
};

const healthRes = {
  statusCode: 200,
  headers: {},
  setHeader: function(key, value) {
    this.headers[key] = value;
  },
  json: function(data) {
    console.log('Health response:', data);
    return this;
  },
  status: function(code) {
    this.statusCode = code;
    return this;
  }
};

// Test news endpoint
const newsReq = {
  method: 'GET',
  url: '/api/news',
  headers: { host: 'localhost:3000' },
  query: {}
};

const newsRes = {
  statusCode: 200,
  headers: {},
  setHeader: function(key, value) {
    this.headers[key] = value;
  },
  json: function(data) {
    console.log('News response:', data);
    return this;
  },
  status: function(code) {
    this.statusCode = code;
    return this;
  }
};

async function testAPI() {
  try {
    console.log('Testing health endpoint...');
    await handler(healthReq, healthRes);
    
    console.log('Testing news endpoint...');
    await handler(newsReq, newsRes);
    
    console.log('✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAPI(); 