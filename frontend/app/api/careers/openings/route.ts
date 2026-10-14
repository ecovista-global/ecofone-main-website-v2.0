import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'careers_jobs.json');

function getJobs() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading jobs file:', err);
  }
  return [];
}

function saveJobs(jobs: any[]) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing jobs file:', err);
  }
}

export async function GET() {
  const jobs = getJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const jobs = getJobs();
    const newJob = {
      id: body.id || `job-${Date.now()}`,
      title: body.title || 'Untitled Role',
      department: body.department || 'General',
      location: body.location || 'Lucknow HQ',
      type: body.type || 'Full Time - On-site',
      experience: body.experience || '1 - 3 Years',
      description: body.description || '',
      requirements: Array.isArray(body.requirements) ? body.requirements : (body.requirements ? body.requirements.split('\n').filter(Boolean) : []),
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date().toISOString()
    };
    jobs.unshift(newJob);
    saveJobs(jobs);
    return NextResponse.json({ success: true, job: newJob });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Job ID required' }, { status: 400 });
    }
    const jobs = getJobs();
    const index = jobs.findIndex((j: any) => j.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }
    jobs[index] = {
      ...jobs[index],
      ...body,
      requirements: Array.isArray(body.requirements)
        ? body.requirements
        : (typeof body.requirements === 'string' ? body.requirements.split('\n').filter(Boolean) : jobs[index].requirements)
    };
    saveJobs(jobs);
    return NextResponse.json({ success: true, job: jobs[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Job ID required' }, { status: 400 });
    }
    let jobs = getJobs();
    jobs = jobs.filter((j: any) => j.id !== id);
    saveJobs(jobs);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
