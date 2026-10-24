import { NextResponse } from 'next/server';
import { readFallbackJson, writeFallbackJson } from '../../../../lib/json-fallback';
import { verifyAdminAuth } from '../../../../lib/auth-guard';

async function getJobs(): Promise<any[]> {
  return await readFallbackJson<any[]>('careers_jobs.json', []);
}

async function saveJobs(jobs: any[]): Promise<void> {
  await writeFallbackJson('careers_jobs.json', jobs);
}

export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const body = await req.json();
    const jobs = await getJobs();
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
    await saveJobs(jobs);
    return NextResponse.json({ success: true, job: newJob });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Job ID required' }, { status: 400 });
    }
    const jobs = await getJobs();
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
    await saveJobs(jobs);
    return NextResponse.json({ success: true, job: jobs[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Job ID required' }, { status: 400 });
    }
    let jobs = await getJobs();
    jobs = jobs.filter((j: any) => j.id !== id);
    await saveJobs(jobs);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
