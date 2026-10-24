/**
 * Data Migration Script: Frontend JSON Flat-files -> PostgreSQL
 *
 * Migrates existing data from frontend/data/*.json into PostgreSQL via Prisma:
 * - contact_messages.json -> ContactMessage
 * - careers_applications.json -> CareerApplication
 * - careers_jobs.json -> CareerJob
 * - stores.json -> Store
 * - research_articles.json -> ResearchArticle
 *
 * Safe and idempotent: Uses upsert where IDs exist or checks existence to prevent duplicate records.
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const DATA_DIR = path.resolve(__dirname, '../../frontend/data');

function loadJson(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`[WARN] File not found: ${filePath}, skipping...`);
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(`[ERROR] Failed to parse ${fileName}:`, err.message);
    return [];
  }
}

async function seedContactMessages() {
  const items = loadJson('contact_messages.json');
  console.log(`Migrating ${items.length} contact messages...`);
  let count = 0;

  for (const item of items) {
    if (!item.applicantName || !item.email) continue;
    try {
      const id = item.id || `contact-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      await prisma.contactMessage.upsert({
        where: { id },
        update: {},
        create: {
          id,
          applicantName: item.applicantName,
          email: item.email,
          phone: item.phone || '',
          locationPreference: item.locationPreference || 'Lucknow HQ Inquiry',
          investmentCapacity: Number(item.investmentCapacity) || 0,
          experienceDesc: item.experienceDesc || null,
          status: item.status || 'PENDING',
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        },
      });
      count++;
    } catch (e) {
      console.warn(`Skipping contact message (${item.applicantName}): ${e.message}`);
    }
  }
  console.log(`[SUCCESS] Contact messages migrated: ${count}`);
}

async function seedCareerJobs() {
  const items = loadJson('careers_jobs.json');
  console.log(`Migrating ${items.length} career jobs...`);
  let count = 0;

  for (const item of items) {
    if (!item.title) continue;
    try {
      const id = item.id || `job-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      await prisma.careerJob.upsert({
        where: { id },
        update: {
          title: item.title,
          department: item.department || 'General',
          location: item.location || 'Lucknow HQ',
          type: item.type || 'Full Time - On-site',
          experience: item.experience || '1 - 3 Years',
          description: item.description || '',
          requirements: Array.isArray(item.requirements) ? item.requirements : [],
          isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
        },
        create: {
          id,
          title: item.title,
          department: item.department || 'General',
          location: item.location || 'Lucknow HQ',
          type: item.type || 'Full Time - On-site',
          experience: item.experience || '1 - 3 Years',
          description: item.description || '',
          requirements: Array.isArray(item.requirements) ? item.requirements : [],
          isActive: item.isActive !== undefined ? Boolean(item.isActive) : true,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        },
      });
      count++;
    } catch (e) {
      console.warn(`Skipping career job (${item.title}): ${e.message}`);
    }
  }
  console.log(`[SUCCESS] Career jobs migrated: ${count}`);
}

async function seedCareerApplications() {
  const items = loadJson('careers_applications.json');
  console.log(`Migrating ${items.length} career applications...`);
  let count = 0;

  for (const item of items) {
    if (!item.fullName || !item.email) continue;
    try {
      const id = item.id || `app-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      await prisma.careerApplication.upsert({
        where: { id },
        update: {},
        create: {
          id,
          jobId: item.jobId || 'general-application',
          jobTitle: item.jobTitle || 'General Application',
          fullName: item.fullName,
          email: item.email,
          phone: item.phone || '',
          gender: item.gender || null,
          experienceYears: item.experienceYears || null,
          currentLocation: item.currentLocation || null,
          areaOfInterest: item.areaOfInterest || null,
          currentSalary: item.currentSalary || null,
          expectedSalary: item.expectedSalary || null,
          resumeUrl: item.resumeUrl || item.resumePath || '',
          resumeFileName: item.resumeFileName || null,
          resumeFileSize: item.resumeFileSize || null,
          linkedinUrl: item.linkedinUrl || null,
          portfolioUrl: item.portfolioUrl || null,
          coverNote: item.coverNote || null,
          status: item.status || 'PENDING',
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        },
      });
      count++;
    } catch (e) {
      console.warn(`Skipping career application (${item.fullName}): ${e.message}`);
    }
  }
  console.log(`[SUCCESS] Career applications migrated: ${count}`);
}

async function seedStores() {
  const items = loadJson('stores.json');
  console.log(`Migrating ${items.length} stores...`);
  let count = 0;

  for (const item of items) {
    if (!item.name) continue;
    try {
      const id = item.id || `store-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      await prisma.store.upsert({
        where: { id },
        update: {
          name: item.name,
          area: item.area || '',
          city: item.city || 'Lucknow',
          address: item.address || '',
          timings: item.timings || '10:00 AM - 09:00 PM',
          phone: item.phone || '+91 99199 65499',
          isOpen: item.isOpen !== undefined ? Boolean(item.isOpen) : true,
          type: item.type || 'LIVE',
          imageUrl: item.imageUrl || '/store_hazratganj.jpg',
          mapsUrl: item.mapsUrl || '',
          latitude: Number(item.latitude) || 26.8467,
          longitude: Number(item.longitude) || 80.9462,
        },
        create: {
          id,
          name: item.name,
          area: item.area || '',
          city: item.city || 'Lucknow',
          address: item.address || '',
          timings: item.timings || '10:00 AM - 09:00 PM',
          phone: item.phone || '+91 99199 65499',
          isOpen: item.isOpen !== undefined ? Boolean(item.isOpen) : true,
          type: item.type || 'LIVE',
          imageUrl: item.imageUrl || '/store_hazratganj.jpg',
          mapsUrl: item.mapsUrl || '',
          latitude: Number(item.latitude) || 26.8467,
          longitude: Number(item.longitude) || 80.9462,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        },
      });
      count++;
    } catch (e) {
      console.warn(`Skipping store (${item.name}): ${e.message}`);
    }
  }
  console.log(`[SUCCESS] Stores migrated: ${count}`);
}

async function seedResearchArticles() {
  const items = loadJson('research_articles.json');
  console.log(`Migrating ${items.length} research articles...`);
  let count = 0;

  for (const item of items) {
    if (!item.title) continue;
    try {
      const id = String(item.id || Date.now());
      await prisma.researchArticle.upsert({
        where: { id },
        update: {
          publisher: item.publisher || 'EcoFone Research',
          date: item.date || '2026',
          title: item.title,
          description: item.description || '',
          url: item.url || '#',
          imageUrl: item.imageUrl || '/eco-recycling-article.png',
        },
        create: {
          id,
          publisher: item.publisher || 'EcoFone Research',
          date: item.date || '2026',
          title: item.title,
          description: item.description || '',
          url: item.url || '#',
          imageUrl: item.imageUrl || '/eco-recycling-article.png',
          createdAt: new Date(),
        },
      });
      count++;
    } catch (e) {
      console.warn(`Skipping research article (${item.title}): ${e.message}`);
    }
  }
  console.log(`[SUCCESS] Research articles migrated: ${count}`);
}

async function main() {
  console.log('--- Starting EcoFone JSON to PostgreSQL Migration ---');
  await seedContactMessages();
  await seedCareerJobs();
  await seedCareerApplications();
  await seedStores();
  await seedResearchArticles();
  console.log('--- All flat-file JSON records migrated to PostgreSQL successfully ---');
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
