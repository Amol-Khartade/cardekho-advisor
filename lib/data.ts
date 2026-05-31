import fs from 'fs/promises';
import path from 'path';

let cachedCars: any[] | null = null;

export async function getCars(): Promise<any[]> {
  if (cachedCars) return cachedCars;
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'cars.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    cachedCars = JSON.parse(fileData);
    return cachedCars || [];
  } catch (error) {
    console.error("Failed to load cars data:", error);
    return [];
  }
}
