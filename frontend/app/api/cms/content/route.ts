import { NextResponse } from 'next/server';
import { getWebsiteCms, saveWebsiteCms } from '../../../../lib/cms-server';

export async function GET() {
  try {
    const data = getWebsiteCms();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const current = getWebsiteCms() || {};
    const updated = {
      ...current,
      ...body,
      siteSettings: {
        ...(current.siteSettings || {}),
        ...(body.siteSettings || {}),
        sectionVisibility: {
          ...(current.siteSettings?.sectionVisibility || {}),
          ...(body.siteSettings?.sectionVisibility || {}),
        }
      }
    };
    saveWebsiteCms(updated);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
