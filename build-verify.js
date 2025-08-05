const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying build output...');

const requiredFiles = [
  'dist/public/index.html',
  'dist/public/assets',
  'dist/public/vite.svg'
];

const requiredDirs = [
  'dist/public',
  'dist/public/assets'
];

function checkBuild() {
  let hasErrors = false;

  // Check if dist directory exists
  if (!fs.existsSync('dist')) {
    console.error('❌ dist directory not found');
    hasErrors = true;
  } else {
    console.log('✅ dist directory exists');
  }

  // Check required directories
  requiredDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.error(`❌ Required directory not found: ${dir}`);
      hasErrors = true;
    } else {
      console.log(`✅ Directory exists: ${dir}`);
    }
  });

  // Check required files
  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.error(`❌ Required file not found: ${file}`);
      hasErrors = true;
    } else {
      const stats = fs.statSync(file);
      if (stats.isFile()) {
        console.log(`✅ File exists: ${file} (${stats.size} bytes)`);
      } else {
        console.log(`✅ Directory exists: ${file}`);
      }
    }
  });

  // Check if index.html has the correct content
  if (fs.existsSync('dist/public/index.html')) {
    const indexContent = fs.readFileSync('dist/public/index.html', 'utf8');
    if (indexContent.includes('root')) {
      console.log('✅ index.html contains root element');
    } else {
      console.error('❌ index.html missing root element');
      hasErrors = true;
    }
  }

  // List all files in dist/public
  if (fs.existsSync('dist/public')) {
    console.log('\n📁 Files in dist/public:');
    const files = fs.readdirSync('dist/public', { recursive: true });
    files.forEach(file => {
      const filePath = path.join('dist/public', file);
      const stats = fs.statSync(filePath);
      console.log(`  ${file} (${stats.isDirectory() ? 'dir' : stats.size + ' bytes'})`);
    });
  }

  if (hasErrors) {
    console.error('\n❌ Build verification failed');
    process.exit(1);
  } else {
    console.log('\n✅ Build verification passed');
  }
}

checkBuild(); 