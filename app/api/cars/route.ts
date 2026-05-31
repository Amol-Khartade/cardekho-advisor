import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'cars.json');
    const fileData = await fs.readFile(filePath, 'utf8');
    const cars = JSON.parse(fileData);
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load cars' }, { status: 500 });
  }
}
