import { NextRequest, NextResponse } from 'next/server';
import { getBlogCategories } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const categories = await getBlogCategories();

    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in blog categories API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
