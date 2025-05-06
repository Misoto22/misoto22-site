import { NextResponse } from 'next/server';

// 这里需要替换成你的 Unsplash API key
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// 你想要展示的特定照片的 ID 列表
const PHOTO_IDS = [
  'C9ZwRUAPaIQ', // 银河
  'photo-1470071459604-3b5ec3a7fe05', // 日落
  'photo-1441974231531-c6227db76b6e', // 森林
  'photo-1472214103451-9374bd1c798e', // 山景
  'photo-1472396961693-142e6e269027', // 海滩
  'photo-1447752875215-b2761acb3c5d', // 森林
  'photo-1470252649378-9c29740c9fa8', // 日出
  'photo-1469474968028-56623f02e42e', // 湖泊
  'photo-1447752875215-b2761acb3c5d', // 森林
  'photo-1472396961693-142e6e269027', // 海滩
  'photo-1472214103451-c6227db76b6e', // 山景
  'photo-1470071459604-3b5ec3a7fe05', // 日落
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
    const images = photos.map((photo: any, index: number) => ({
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

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 