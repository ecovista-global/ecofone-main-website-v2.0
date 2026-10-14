const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_EB9knm7bFeCf@ep-blue-sun-adp2jl9q-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    }
  }
});

async function main() {
  const subAdmins = await prisma.subAdmin.findMany();
  console.log('Sub-admins in DB:', JSON.stringify(subAdmins, null, 2));
  const users = await prisma.user.findMany({ where: { role: 'ADMIN' } });
  console.log('Admin users in DB:', JSON.stringify(users, null, 2));
  await prisma.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
