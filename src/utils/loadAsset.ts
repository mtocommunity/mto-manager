import fs from 'fs/promises';
import { join } from 'path';

/**
 * Load a text asset from the file system
 * @param path path to the asset
 */
export async function getTextAsset(path: string): Promise<string> {
  const data = await fs.readFile(join('./assets/mto-manager', path), 'utf-8');

  return data;
}
