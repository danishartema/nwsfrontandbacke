#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting NewsMapper Development Environment...\n');

// Start the backend server
console.log('📡 Starting backend server on port 5000...');
const server = spawn('npm', ['run', 'dev:server'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Wait a bit for server to start, then start the frontend
setTimeout(() => {
  console.log('🎨 Starting frontend client on port 5173...');
  const client = spawn('npm', ['run', 'dev:client'], {
    stdio: 'inherit',
    shell: true,
    cwd: process.cwd()
  });

  // Handle process cleanup
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development servers...');
    server.kill('SIGINT');
    client.kill('SIGINT');
    process.exit(0);
  });

  client.on('error', (error) => {
    console.error('❌ Frontend client error:', error);
  });

}, 3000);

server.on('error', (error) => {
  console.error('❌ Backend server error:', error);
});

console.log('\n📝 Development servers starting...');
console.log('🔗 Frontend: http://localhost:5173');
console.log('🔗 Backend API: http://localhost:5000/api/health');
console.log('\n💡 Press Ctrl+C to stop both servers');