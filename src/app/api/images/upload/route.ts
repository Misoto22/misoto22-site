import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/r2';
import { createDb, addImage } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const year = formData.get('year') as string;
    const aspect = formData.get('aspect') as string;
    const className = formData.get('className') as string;

    if (!file || !title || !location || !year || !aspect || !className) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload to R2
    const r2Key = await uploadImage(file);

    // Save to database
    const db = createDb(process.env.DATABASE_URL!);
    const image = await addImage(db, {
      title,
      location,
      year,
      r2Key,
      aspect,
      className,
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 