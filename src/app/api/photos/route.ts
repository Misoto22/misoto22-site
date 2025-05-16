import { NextResponse } from 'next/server';

const photos = [
  {
    "id": "00001",
    "src": "https://images.misoto22.com/00001.webp",
    "width": 4000,
    "height": 6000,
    "alt": "00001"
  },
  {
    "id": "00002",
    "src": "https://images.misoto22.com/00002.webp",
    "width": 7008,
    "height": 4672,
    "alt": "00002"
  },
  {
    "id": "00003",
    "src": "https://images.misoto22.com/00003.webp",
    "width": 6222,
    "height": 4148,
    "alt": "00003"
  },
  {
    "id": "00004",
    "src": "https://images.misoto22.com/00004.webp",
    "width": 4664,
    "height": 6996,
    "alt": "00004"
  },
  {
    "id": "00005",
    "src": "https://images.misoto22.com/00005.webp",
    "width": 3864,
    "height": 5796,
    "alt": "00005"
  },
  {
    "id": "00006",
    "src": "https://images.misoto22.com/00006.webp",
    "width": 3865,
    "height": 5797,
    "alt": "00006"
  },
  {
    "id": "00007",
    "src": "https://images.misoto22.com/00007.webp",
    "width": 5545,
    "height": 3119,
    "alt": "00007"
  },
  {
    "id": "00008",
    "src": "https://images.misoto22.com/00008.webp",
    "width": 3967,
    "height": 5951,
    "alt": "00008"
  },
  {
    "id": "00009",
    "src": "https://images.misoto22.com/00009.webp",
    "width": 4057,
    "height": 5934,
    "alt": "00009"
  },
  {
    "id": "00010",
    "src": "https://images.misoto22.com/00010.webp",
    "width": 6240,
    "height": 4160,
    "alt": "00010"
  },
  {
    "id": "00011",
    "src": "https://images.misoto22.com/00011.webp",
    "width": 4568,
    "height": 3045,
    "alt": "00011"
  },
  {
    "id": "00012",
    "src": "https://images.misoto22.com/00012.webp",
    "width": 4160,
    "height": 6240,
    "alt": "00012"
  },
  {
    "id": "00013",
    "src": "https://images.misoto22.com/00013.webp",
    "width": 6000,
    "height": 4000,
    "alt": "00013"
  },
  {
    "id": "00014",
    "src": "https://images.misoto22.com/00014.webp",
    "width": 3068,
    "height": 4602,
    "alt": "00014"
  },
  {
    "id": "00015",
    "src": "https://images.misoto22.com/00015.webp",
    "width": 6000,
    "height": 4000,
    "alt": "00015"
  },
  {
    "id": "00016",
    "src": "https://images.misoto22.com/00016.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00016"
  },
  {
    "id": "00017",
    "src": "https://images.misoto22.com/00017.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00017"
  },
  {
    "id": "00018",
    "src": "https://images.misoto22.com/00018.webp",
    "width": 1707,
    "height": 2560,
    "alt": "00018"
  },
  {
    "id": "00019",
    "src": "https://images.misoto22.com/00019.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00019"
  },
  {
    "id": "00020",
    "src": "https://images.misoto22.com/00020.webp",
    "width": 2560,
    "height": 1440,
    "alt": "00020"
  },
  {
    "id": "00021",
    "src": "https://images.misoto22.com/00021.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00021"
  },
  {
    "id": "00022",
    "src": "https://images.misoto22.com/00022.webp",
    "width": 1440,
    "height": 1800,
    "alt": "00022"
  },
  {
    "id": "00023",
    "src": "https://images.misoto22.com/00023.webp",
    "width": 3120,
    "height": 1760,
    "alt": "00023"
  },
  {
    "id": "00024",
    "src": "https://images.misoto22.com/00024.webp",
    "width": 1707,
    "height": 2560,
    "alt": "00024"
  },
  {
    "id": "00025",
    "src": "https://images.misoto22.com/00025.webp",
    "width": 1707,
    "height": 2560,
    "alt": "00025"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8');
  
  const start = (page - 1) * limit;
  const end = start + limit;
  
  const paginatedPhotos = photos.slice(start, end);
  const totalPhotos = photos.length;
  
  return NextResponse.json({
    photos: paginatedPhotos,
    total: totalPhotos,
    hasMore: end < totalPhotos
  });
} 