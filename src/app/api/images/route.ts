import { NextResponse } from 'next/server';

// My Unsplash API key
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// List of photo IDs from Unsplash
const PHOTO_IDS = [
  'C9ZwRUAPaIQ', // Milky Way
  'XxVQlk2QILE', // Nanchang Overpass
  'O3Kbs823FQk', // Sydney Bus
  'U3KJgS4xwJ0', // Coastal Road
  'jkqYv6tFAXY', // Newcastle Sunset
  'RpKKalTH0-c', // Wollongong Beach
  '6asZ7mSkNQ4', // University of Sydney
  'b-dBvZY8fFk', // Sydney Harbour
  '8cMKZ-5LLEc', // Sydney Opera House
];

export async function GET() {
  try {
    // Fetch all photos in parallel
    const photoPromises = PHOTO_IDS.map(id => {
      // Handle different ID formats
      const photoId = id.startsWith('photo-') ? id : `photo-${id}`;
      return fetch(`https://api.unsplash.com/photos/${photoId}`, {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }).then(res => res.json())
    });

    const photos = await Promise.all(photoPromises);
    
    // Convert Unsplash data format to our GalleryImage format
    const images = photos
      .filter((photo: any) => photo && photo.urls && photo.urls.regular) // Filter out invalid photo data
      .map((photo: any, index: number) => ({
        id: index + 1,
        title: photo.description || photo.alt_description || 'Untitled',
        location: photo.location?.title || 'Unknown Location',
        year: new Date(photo.created_at).getFullYear().toString(),
        r2Key: photo.urls.regular,
        aspect: photo.width / photo.height > 1 ? 'landscape' : 'portrait',
        className: photo.width / photo.height > 1 ? 'aspect-[4/3]' : 'aspect-[3/4]',
        exif: {
          Make: photo.exif?.make,
          Model: photo.exif?.model,
          LensModel: photo.exif?.lens_model,
          FNumber: photo.exif?.aperture,
          ExposureTime: photo.exif?.exposure_time,
          ISO: photo.exif?.iso,
        }
      }));

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No valid images found' },
        { status: 404 }
      );
    }

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 