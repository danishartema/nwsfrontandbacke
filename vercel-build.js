import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Starting Vercel build...');

try {
  // Build the client
  console.log('Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });
  
  // Ensure the dist/public directory exists
  const distPublicPath = path.join(process.cwd(), 'dist', 'public');
  if (!fs.existsSync(distPublicPath)) {
    console.error('Client build failed: dist/public directory not found');
    process.exit(1);
  }
  
  console.log('Client build completed successfully');
  console.log('Vercel build completed');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 