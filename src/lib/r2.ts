import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// Debug: Log environment variables
console.log('R2 Configuration:', {
  accountId: process.env.R2_ACCOUNT_ID,
  bucketName: process.env.R2_BUCKET_NAME,
  hasAccessKey: !!process.env.R2_ACCESS_KEY_ID,
  hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY,
});

export async function getUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function getImageUrl(key: string): Promise<string> {
  if (!process.env.R2_BUCKET_NAME) {
    throw new Error('R2_BUCKET_NAME environment variable is not set');
  }

  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  // Get a signed URL that expires in 24 hours
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 86400 });
  return signedUrl;
}

export async function uploadImage(file: File): Promise<string> {
  if (!process.env.R2_BUCKET_NAME) {
    throw new Error('R2_BUCKET_NAME environment variable is not set');
  }

  const key = `images/${Date.now()}-${file.name}`;
  const arrayBuffer = await file.arrayBuffer();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    })
  );

  return key;
} 