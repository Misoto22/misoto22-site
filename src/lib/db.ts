import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the images table schema
export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  year: text('year').notNull(),
  r2Key: text('r2_key').notNull(),
  aspect: text('aspect').notNull(),
  className: text('class_name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Initialize the database connection
export function createDb(connectionString: string) {
  const neonClient = neon(connectionString);
  return drizzle(neonClient);
}

// Database operations
export async function getAllImages(db: ReturnType<typeof createDb>) {
  return await db.select().from(images).orderBy(images.createdAt);
}

export async function addImage(
  db: ReturnType<typeof createDb>,
  imageData: {
    title: string;
    location: string;
    year: string;
    r2Key: string;
    aspect: string;
    className: string;
  }
) {
  return await db.insert(images).values(imageData).returning();
}

export async function deleteImage(db: ReturnType<typeof createDb>, id: number) {
  return await db.delete(images).where(eq(images.id, id)).returning();
} 