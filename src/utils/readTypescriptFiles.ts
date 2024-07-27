import { readdir } from 'fs/promises';

/**
 * Read the folder and return the list of files in recursive mode
 * @param dir Path to the files folder
 * @returns List of files in the folder in revursive mode
 */
export async function readTypescriptFiles(dir: string) {
  return (await readdir(dir, { recursive: true })).filter((file) => file.endsWith('.ts')).map((file) => file.split('\\').join('/').replace('.ts', ''));
}
