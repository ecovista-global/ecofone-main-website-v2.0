import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import { verifyAdminAuth } from '../../../../lib/auth-guard';

const DATA_FILE = path.join(process.cwd(), 'data', 'careers_applications.json');

function getApplications() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading applications file:', err);
  }
  return [];
}

export async function GET(req: Request) {
  try {
    const auth = verifyAdminAuth(req);
    if (!auth.isAuthorized) {
      return NextResponse.json({ success: false, error: auth.error }, { status: 401 });
    }

    const url = new URL(req.url);
    const format = url.searchParams.get('format') || 'xlsx';
    const apps = getApplications();

    if (format === 'csv') {
      let csv = 'ID,JOB_TITLE,AREA_OF_INTEREST,CANDIDATE_NAME,GENDER,EMAIL,PHONE,EXPERIENCE_YEARS,CURRENT_LOCATION,CURRENT_SALARY,EXPECTED_SALARY,RESUME_DRIVE_LINK,LINKEDIN_URL,PORTFOLIO_URL,COVER_NOTE,STATUS,SUBMISSION_DATE\n';
      apps.forEach((app: any) => {
        const id = app.id || '';
        const job = (app.jobTitle || '').replace(/"/g, '""');
        const area = (app.areaOfInterest || app.jobTitle || '').replace(/"/g, '""');
        const name = (app.fullName || '').replace(/"/g, '""');
        const gender = (app.gender || 'Not specified').replace(/"/g, '""');
        const email = app.email || '';
        const phone = app.phone || '';
        const exp = (app.experienceYears || '').replace(/"/g, '""');
        const loc = (app.currentLocation || '').replace(/"/g, '""');
        const curSal = (app.currentSalary || '').replace(/"/g, '""');
        const expSal = (app.expectedSalary || '').replace(/"/g, '""');
        const resume = (app.resumeUrl || app.linkedinPortfolio || '').replace(/"/g, '""');
        const linkedin = (app.linkedinUrl || '').replace(/"/g, '""');
        const portfolio = (app.portfolioUrl || '').replace(/"/g, '""');
        const note = (app.coverNote || '').replace(/"/g, '""').replace(/\n/g, ' ');
        const status = app.status || 'PENDING';
        const date = app.createdAt ? new Date(app.createdAt).toISOString() : '';
        csv += `${id},"${job}","${area}","${name}","${gender}",${email},${phone},"${exp}","${loc}","${curSal}","${expSal}","${resume}","${linkedin}","${portfolio}","${note}",${status},"${date}"\n`;
      });

      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="ecofone_ecovista_careers_${new Date().toISOString().slice(0, 10)}.csv"`
        }
      });
    }

    // Default: Professional Excel Workbook (.xlsx)
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'EcoFone HR & Ecovista Global';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Career Applications', {
      views: [{ showGridLines: true }]
    });

    worksheet.columns = [
      { header: 'Application ID', key: 'id', width: 20 },
      { header: 'Target Role', key: 'jobTitle', width: 26 },
      { header: 'Area of Interest', key: 'areaOfInterest', width: 24 },
      { header: 'Candidate Name', key: 'fullName', width: 24 },
      { header: 'Gender', key: 'gender', width: 14 },
      { header: 'Email Address', key: 'email', width: 28 },
      { header: 'Phone Number', key: 'phone', width: 18 },
      { header: 'Experience (Yrs)', key: 'experienceYears', width: 16 },
      { header: 'Location', key: 'currentLocation', width: 20 },
      { header: 'Current Salary', key: 'currentSalary', width: 18 },
      { header: 'Expected Salary', key: 'expectedSalary', width: 18 },
      { header: 'Resume (Drive Link)', key: 'resumeUrl', width: 35 },
      { header: 'LinkedIn Profile', key: 'linkedinUrl', width: 28 },
      { header: 'Portfolio / Website', key: 'portfolioUrl', width: 28 },
      { header: 'Candidate Pitch / Note', key: 'coverNote', width: 40 },
      { header: 'Status', key: 'status', width: 16 },
      { header: 'Applied At', key: 'createdAt', width: 22 }
    ];

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0F766E' } // Teal brand color
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 28;

    apps.forEach((app: any) => {
      const row = worksheet.addRow({
        id: app.id,
        jobTitle: app.jobTitle,
        areaOfInterest: app.areaOfInterest || app.jobTitle || 'General',
        fullName: app.fullName,
        gender: app.gender || 'Not specified',
        email: app.email,
        phone: app.phone,
        experienceYears: app.experienceYears,
        currentLocation: app.currentLocation,
        currentSalary: app.currentSalary || 'N/A',
        expectedSalary: app.expectedSalary || 'N/A',
        resumeUrl: app.resumeUrl || app.linkedinPortfolio || 'N/A',
        linkedinUrl: app.linkedinUrl || 'N/A',
        portfolioUrl: app.portfolioUrl || 'N/A',
        coverNote: app.coverNote,
        status: app.status || 'PENDING',
        createdAt: app.createdAt ? new Date(app.createdAt).toLocaleString('en-IN') : ''
      });

      // Status dropdown validation
      const statusCell = row.getCell('status');
      statusCell.dataValidation = {
        type: 'list',
        allowBlank: false,
        formulae: ['"PENDING,REVIEWING,SHORTLISTED,HIRED,REJECTED"']
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="ecofone_future_careers_${new Date().toISOString().slice(0, 10)}.xlsx"`
      }
    });
  } catch (err: any) {
    console.error('Error generating careers export:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
