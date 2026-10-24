const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(process.env.DATABASE_URL ? {
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
} : undefined);

async function main() {
  const subAdmins = await prisma.subAdmin.findMany();
  console.log('Sub-admins in DB:', JSON.stringify(subAdmins, null, 2));
  const users = await prisma.user.findMany({ where: { role: 'ADMIN' } });
  console.log('Admin users in DB:', JSON.stringify(users, null, 2));
  await prisma.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
