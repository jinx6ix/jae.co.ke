// app/api/tours/french/route.ts
/*
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Tour } from '@/types/tour';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'french_tour_pages.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const tours: Tour[] = JSON.parse(jsonData);
    return NextResponse.json(tours);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load tour data' }, { status: 500 });
  }
}
*/