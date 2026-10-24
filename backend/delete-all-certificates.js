const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(process.env.DATABASE_URL ? {
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
} : undefined);

async function main() {
  console.log('[DB Operation] Connecting to database...');
  const countBefore = await prisma.certificate.count();
  console.log('[DB Operation] Certificates count before deletion:', countBefore);
  
  const result = await prisma.certificate.deleteMany({});
  console.log('[DB Operation] Successfully deleted certificate records:', result.count);
  
  const countAfter = await prisma.certificate.count();
  console.log('[DB Operation] Remaining certificates in database:', countAfter);
  
  await prisma.$disconnect();
}

main().catch(err => {
  console.error('[DB Operation] Error:', err);
  process.exit(1);
});
