/**
 * Master Seed Script for EcoFone Backend Database
 */

const { spawn } = require('child_process');
const path = require('path');

async function runScript(scriptRelativePath) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(__dirname, scriptRelativePath);
    console.log(`\n>>> Running seed: ${scriptRelativePath}`);
    const proc = spawn('node', [fullPath], { stdio: 'inherit' });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.warn(`Script ${scriptRelativePath} exited with status ${code}`);
        resolve(); // Continue with other seeds
      }
    });

    proc.on('error', (err) => {
      console.error(`Failed to execute ${scriptRelativePath}:`, err.message);
      resolve();
    });
  });
}

async function main() {
  console.log('=== EcoFone Database Seeding Started ===');
  await runScript('seed-reviews.js');
  await runScript('prisma/seed-json-to-postgres.js');
  console.log('=== EcoFone Database Seeding Complete ===\n');
}

main().catch(console.error);
