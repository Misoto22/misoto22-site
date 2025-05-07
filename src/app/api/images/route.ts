import { NextResponse } from 'next/server';

// 这里需要替换成你的 Unsplash API key
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// 你想要展示的特定照片的 ID 列表
const PHOTO_IDS = [
  'C9ZwRUAPaIQ', // 银河
  'XxVQlk2QILE', // 南昌天桥
  'O3Kbs823FQk', // 悉尼公交车
  'U3KJgS4xwJ0', // 海边公路
  'jkqYv6tFAXY', // 纽卡斯尔日落
  'RpKKalTH0-c', // 卧龙岗海滩
  '6asZ7mSkNQ4', // 悉尼大学
  'b-dBvZY8fFk', // 悉尼港
  '8cMKZ-5LLEc', // 悉尼歌剧院
];

export async function GET() {
  try {
    // 并行获取所有照片
    const photoPromises = PHOTO_IDS.map(id => {
      // 处理不同格式的 ID
      const photoId = id.startsWith('photo-') ? id : `photo-${id}`;
      return fetch(`https://api.unsplash.com/photos/${photoId}`, {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }).then(res => res.json())
    });

    const photos = await Promise.all(photoPromises);
    
    // 转换 Unsplash 数据格式为我们的 GalleryImage 格式
    const images = photos
      .filter((photo: any) => photo && photo.urls && photo.urls.regular) // 过滤掉无效的照片数据
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