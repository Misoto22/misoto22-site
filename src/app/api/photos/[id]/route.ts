import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  context: Context
) {
  const { id } = context.params;

  // 400 Bad Request: Invalid id format (must be 5 digits)
  if (!id || !/^\d{5}$/.test(id)) {
    return NextResponse.json({ error: 'Invalid photo ID format' }, { status: 400 });
  }

  try {
    const doc = await db.collection('photos').doc(id).get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    return NextResponse.json(doc.data());
  } catch (error) {
    console.error('Error fetching photo:', error);
    return NextResponse.json({ error: 'Failed to fetch photo' }, { status: 500 });
  }
} 