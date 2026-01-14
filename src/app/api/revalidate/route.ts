import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')

    // Check for secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    if (path) {
      // Revalidate specific path
      revalidatePath(path)
      return NextResponse.json({ 
        message: `Path ${path} revalidated successfully`,
        revalidated: true,
        now: Date.now()
      })
    }

    if (tag) {
      // Revalidate specific tag with 'max' cache profile for SWR behavior
      revalidateTag(tag, 'max')
      return NextResponse.json({
        message: `Tag ${tag} revalidated successfully`,
        revalidated: true,
        now: Date.now()
      })
    }

    // If no specific path or tag, revalidate all main pages
    const paths = ['/', '/projects', '/education', '/experience', '/photography']
    paths.forEach(p => revalidatePath(p))

    return NextResponse.json({ 
      message: 'All pages revalidated successfully',
      revalidated: true,
      paths,
      now: Date.now()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
