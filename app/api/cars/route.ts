import { NextResponse } from 'next/server';
import { getCars } from '@/lib/data';

export async function GET() {
  const cars = await getCars();
  if (cars.length === 0) {
    return NextResponse.json({ error: 'Failed to load cars' }, { status: 500 });
  }
  return NextResponse.json(cars);
}
