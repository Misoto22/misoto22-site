import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8');
  const start = (page - 1) * limit;

  try {
    const snapshot = await db.collection('photos')
      .orderBy('id')
      .offset(start)
      .limit(limit)
      .get();

    const photos = snapshot.docs.map(doc => doc.data());
    const total = (await db.collection('photos').count().get()).data().count;

    return NextResponse.json({
      photos,
      total,
      hasMore: start + photos.length < total
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
} 