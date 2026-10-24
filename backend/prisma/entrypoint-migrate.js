/**
 * Automated Production Migration & Seeding Entrypoint
 * Executes during the single-task ECS migration step before rolling service deployment.
 *
 * 1. Runs 'npx prisma migrate deploy'
 * 2. Automatically verifies and seeds the initial Master Admin if not present.
 */

const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function run() {
  console.log('================================================================');
  console.log(' [EcoFone ECS Migrator] Stage 1: Deploying Database Migrations');
  console.log('================================================================');

  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log(' [SUCCESS] Prisma migrations deployed successfully.');
  } catch (err) {
    console.error(' [FATAL] Prisma migration deployment failed:', err);
    process.exit(1);
  }

  console.log('================================================================');
  console.log(' [EcoFone ECS Migrator] Stage 2: Verifying Admin RBAC Initialization');
  console.log('================================================================');

  const prisma = new PrismaClient();
  try {
    const existingAdmin = await prisma.subAdmin.findUnique({
      where: { username: 'admin' },
    });

    if (existingAdmin && existingAdmin.password) {
      console.log(' [OK] Master Admin already initialized in PostgreSQL.');
    } else {
      console.log(' [INIT] Master Admin not found in PostgreSQL. Auto-seeding initial admin...');
      
      const password = process.env.INITIAL_ADMIN_PASSWORD || process.env.ADMIN_SECRET || crypto.randomBytes(14).toString('base64url');
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await prisma.subAdmin.upsert({
        where: { username: 'admin' },
        update: {
          password: hashedPassword,
          permissions: ['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates', 'inventory', 'cms', 'orders'],
        },
        create: {
          username: 'admin',
          password: hashedPassword,
          permissions: ['franchise', 'contact', 'stores', 'team', 'logs', 'security', 'reviews', 'certificates', 'inventory', 'cms', 'orders'],
        },
      });

      console.log('================================================================');
      console.log(' [SUCCESS] Master Admin Auto-Seeded in PostgreSQL');
      console.log(' Username : admin');
      if (process.env.INITIAL_ADMIN_PASSWORD || process.env.ADMIN_SECRET) {
        console.log(' Password : [Set from INITIAL_ADMIN_PASSWORD / ADMIN_SECRET]');
      } else {
        console.log(` Generated Password : ${password}`);
        console.log(' [IMPORTANT] Please record this generated password securely!');
      }
      console.log('================================================================');
    }
  } catch (err) {
    console.error(' [ERROR] Failed to verify or seed admin:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }

  console.log(' [EcoFone ECS Migrator] Migration and bootstrap tasks complete.');
}

run();
