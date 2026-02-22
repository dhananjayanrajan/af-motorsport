// FILE: seed.ts

import type { SanitizedConfig } from 'payload';
import payload from 'payload';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import type { SeedContext } from './seed/types';

import { preload as categoriesPreload } from './collections/Attributes/Categories/preload';
import { generate as generateCategories } from './collections/Attributes/Categories/generator';

const createWithRetry = async <T>(
  collection: string,
  data: Partial<T>,
  retries = 3
): Promise<number | null> => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Creating ${collection} with data:`, JSON.stringify(data, null, 2));
      const doc = await payload.create({
        collection: collection as any,
        data,
      });
      return doc.id;
    } catch (error: any) {
      if (i === retries - 1) {
        payload.logger.error(`Failed to create ${collection}: ${error.message}`);
        return null;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return null;
};

const createMediaWithFile = async (
  data: any,
  filePath: string,
  retries = 3
): Promise<number | null> => {
  for (let i = 0; i < retries; i++) {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      const filename = path.basename(filePath);

      const doc = await payload.create({
        collection: 'media',
        data,
        file: {
          data: fileBuffer as any,
          mimetype: 'image/png',
          name: filename,
          size: fileBuffer.length,
        },
      });
      return doc.id;
    } catch (error: any) {
      if (i === retries - 1) {
        payload.logger.error(`Failed to create media: ${error.message}`);
        return null;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return null;
};

const seedCollection = async <T>(
  ctx: SeedContext,
  collectionName: string,
  preloadData: any[],
  generateFn?: (ctx: SeedContext, count: number) => Promise<any[]>,
  generateCount: number = 25
): Promise<number[]> => {
  payload.logger.info(`Seeding ${collectionName}...`);

  const ids: number[] = [];

  // Seed preload data first
  for (const item of preloadData) {
    const id = await createWithRetry(collectionName, item);
    if (id) ids.push(id);
  }

  // Then generate and seed random data
  if (generateFn) {
    const generatedItems = await generateFn(ctx, generateCount);
    for (const item of generatedItems) {
      const id = await createWithRetry(collectionName, item);
      if (id) ids.push(id);
    }
    payload.logger.info(`Created ${ids.length} ${collectionName} (${preloadData.length} preload, ${generatedItems.length} generated)`);
  } else {
    payload.logger.info(`Created ${ids.length} ${collectionName} (${preloadData.length} preload, 0 generated)`);
  }

  return ids;
};

const seedMedia = async (ctx: SeedContext) => {
  payload.logger.info('Seeding media with actual files...');

  const ids: number[] = [];
  const fixturesDir = path.join(__dirname, 'fixtures');

  if (!fs.existsSync(fixturesDir)) {
    fs.mkdirSync(fixturesDir, { recursive: true });
  }

  const mediaPreload = [
    {
      name: 'placeholder-1.png',
      alt: 'Placeholder image 1',
    },
    {
      name: 'placeholder-2.png',
      alt: 'Placeholder image 2',
    },
    {
      name: 'placeholder-3.png',
      alt: 'Placeholder image 3',
    },
    {
      name: 'placeholder-4.png',
      alt: 'Placeholder image 4',
    },
    {
      name: 'placeholder-5.png',
      alt: 'Placeholder image 5',
    }
  ];

  for (let i = 1; i <= 5; i++) {
    const filePath = path.join(fixturesDir, `placeholder-${i}.png`);
    if (!fs.existsSync(filePath)) {
      const placeholderBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
      fs.writeFileSync(filePath, Buffer.from(placeholderBase64, 'base64'));
    }
  }

  const fixtureFiles = fs.readdirSync(fixturesDir)
    .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
    .map(file => path.join(fixturesDir, file));

  for (const item of mediaPreload) {
    const filePath = faker.helpers.arrayElement(fixtureFiles);
    const id = await createMediaWithFile(item, filePath);
    if (id) ids.push(id);
  }

  payload.logger.info(`Created ${ids.length} media (${mediaPreload.length} preload, 0 generated)`);
  return ids;
};

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config });

  const ctx: SeedContext = {
    categories: [],
    media: [],
  };

  payload.logger.info('========================================');
  payload.logger.info('🚀 STARTING DATABASE SEEDING');
  payload.logger.info('========================================');

  ctx.media = await seedMedia(ctx);
  ctx.categories = await seedCollection(ctx, 'categories', categoriesPreload, generateCategories, 25);

  payload.logger.info('========================================');
  payload.logger.info('✅ SEEDING COMPLETE');
  payload.logger.info('========================================');

  const totalDocs = ctx.categories.length + ctx.media.length;
  payload.logger.info(`📊 Total documents created: ${totalDocs}`);

  process.exit(0);
};
