// File: frontend/lib/json-fallback.ts
import { promises as fs } from 'fs';
import path from 'path';

const BUNDLED_DATA_DIR = path.join(process.cwd(), 'data');
const WRITABLE_TMP_DIR = '/tmp/ecofone-fallback-data';

/**
 * Safely reads fallback JSON data on AWS ECS (checks /tmp override first, then bundled /data/*.json)
 */
export async function readFallbackJson<T>(fileName: string, defaultValue: T): Promise<T> {
  const tmpFile = path.join(WRITABLE_TMP_DIR, fileName);
  const bundledFile = path.join(BUNDLED_DATA_DIR, fileName);

  for (const candidate of [tmpFile, bundledFile]) {
    try {
      const raw = await fs.readFile(candidate, 'utf-8');
      return JSON.parse(raw) as T;
    } catch {
      // Continue to next fallback location
    }
  }
  return defaultValue;
}

/**
 * Safely buffers fallback writes (e.g., /api/contact during DB maintenance) to /tmp
 * so AWS ECS tasks with readonlyRootFilesystem: true never crash with EROFS.
 */
export async function writeFallbackJson<T>(fileName: string, data: T): Promise<void> {
  try {
    await fs.mkdir(WRITABLE_TMP_DIR, { recursive: true });
    const tmpFile = path.join(WRITABLE_TMP_DIR, fileName);
    await fs.writeFile(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[FallbackStorage] Failed to buffer ${fileName} in /tmp:`, err);
  }
}
