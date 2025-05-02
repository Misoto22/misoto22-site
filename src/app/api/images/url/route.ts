import { NextResponse } from 'next/server';
import { getImageUrl } from '@/lib/r2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 });
  }

  try {
    const url = await getImageUrl(key);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error getting image URL:', error);
    return NextResponse.json(
      { error: 'Failed to get image URL' },
      { status: 500 }
    );
  }
} 