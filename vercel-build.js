const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  // Clean previous builds
  if (fs.existsSync('dist')) {
    console.log('🧹 Cleaning previous build...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Install dependencies if needed
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the client
  console.log('🏗️ Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });

  // Verify the build output
  console.log('🔍 Verifying build output...');
  execSync('node build-verify.js', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log('📁 Build output: dist/public');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 