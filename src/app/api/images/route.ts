import { NextResponse } from 'next/server';
import { createDb, getAllImages } from '@/lib/db';

export async function GET() {
  try {
    const db = createDb(process.env.DATABASE_URL!);
    const images = await getAllImages(db);
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 