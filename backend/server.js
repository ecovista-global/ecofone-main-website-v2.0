const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('[Server Entry] Starting EcoFone Production Server...');

// Ensure Prisma Client is generated
try {
  const { execSync } = require('child_process');
  console.log('[Server Entry] Ensuring Prisma client is generated...');
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (e) {
  console.warn('[Server Entry] Prisma generation note:', e.message);
}

// Check if compiled main.js exists
const mainJsPath = path.join(__dirname, 'dist', 'src', 'main.js');
const altMainJsPath = path.join(__dirname, 'dist', 'main.js');

let targetPath = null;
if (fs.existsSync(mainJsPath)) {
  targetPath = mainJsPath;
} else if (fs.existsSync(altMainJsPath)) {
  targetPath = altMainJsPath;
} else {
  console.log('[Server Entry] dist not found, compiling NestJS project...');
  try {
    const { execSync } = require('child_process');
    execSync('npx @nestjs/cli build || npx tsc', { stdio: 'inherit' });
    if (fs.existsSync(mainJsPath)) targetPath = mainJsPath;
    else if (fs.existsSync(altMainJsPath)) targetPath = altMainJsPath;
  } catch (err) {
    console.error('[Server Entry] Build error:', err);
  }
}

if (targetPath) {
  console.log(`[Server Entry] Running compiled application from: ${targetPath}`);
  require(targetPath);
} else {
  console.error('[Server Entry] CRITICAL: Could not find compiled dist entry point!');
  process.exit(1);
}
