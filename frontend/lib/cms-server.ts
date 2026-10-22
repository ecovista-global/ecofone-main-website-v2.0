import fs from 'fs';
import path from 'path';

function getCmsFilePath(): string {
  const candidates = [
    path.join(process.cwd(), 'data', 'website_cms.json'),
    path.join(process.cwd(), 'frontend', 'data', 'website_cms.json'),
    path.join(__dirname, '..', 'data', 'website_cms.json'),
    path.join(__dirname, '..', '..', 'data', 'website_cms.json'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  const frontendData = path.join(process.cwd(), 'frontend', 'data', 'website_cms.json');
  if (fs.existsSync(path.dirname(frontendData))) return frontendData;
  return path.join(process.cwd(), 'data', 'website_cms.json');
}

export function getWebsiteCms(): any {
  try {
    const filePath = getCmsFilePath();
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading website_cms.json:', err);
  }
  return null;
}

export function saveWebsiteCms(data: any): boolean {
  try {
    const filePath = getCmsFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving website_cms.json:', err);
    return false;
  }
}

