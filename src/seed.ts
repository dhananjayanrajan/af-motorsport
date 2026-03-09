import type { SanitizedConfig } from 'payload'
import payload from 'payload'

import { generateCategories } from './collections/Attributes/Category/seeders/generate'
import { generateTags } from './collections/Attributes/Tag/seeders/generate'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { mapRelationships } from './mapper'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TRUNCATE_ORDER = [
  'tags', 'categories', 'media',
]

async function truncateCollections() {
  payload.logger.info('TRUNCATING DATABASE')

  for (const slug of TRUNCATE_ORDER) {
    const result = await payload.find({ collection: slug as any, limit: 1000 })
    for (const doc of result.docs) {
      await payload.delete({ collection: slug as any, id: doc.id })
    }
    payload.logger.info(`Truncated ${slug}`)
  }

  payload.logger.info('TRUNCATION COMPLETE')
}

async function seedMedia(): Promise<number[]> {
  payload.logger.info('Seeding media (5)')
  const ids: number[] = []

  for (let i = 1; i <= 5; i++) {
    const filePath = path.resolve(__dirname, `fixtures/placeholder-${i}.png`)
    const fileBuffer = fs.readFileSync(filePath)

    try {
      const result = await payload.create({
        collection: 'media',
        data: { alt: `Placeholder ${i}` },
        file: {
          data: fileBuffer,
          mimetype: 'image/png',
          name: `placeholder-${i}.png`,
          size: fileBuffer.length,
        },
      })
      ids.push(result.id)
      payload.logger.info(`Created media ${result.id}`)
    } catch (error: any) {
      payload.logger.error(`Failed media ${i}: ${error?.message}`)
    }
  }

  payload.logger.info('Finished media')
  return ids
}

async function seedCollection<T>(
  slug: string,
  generator: (count: number) => Promise<Partial<T>[]>,
  count: number
): Promise<number[]> {
  payload.logger.info(`Seeding ${slug} (${count})`)
  const ids: number[] = []

  const data = await generator(count)
  for (const item of data) {
    try {
      const result = await payload.create({
        collection: slug as any,
        data: item,
      })
      ids.push(result.id)
    } catch (error: any) {
      payload.logger.error(`Failed in ${slug}: ${error?.message}`)
    }
  }

  payload.logger.info(`Finished ${slug}`)
  return ids
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  await truncateCollections()
  payload.logger.info('STARTING FULL DATABASE SEED')

  // 1. Seed foundational collections (no dependencies)
  const mediaIds = await seedMedia()
  const tagIds = await seedCollection('tags', generateTags, 15)
  const categoryIds = await seedCollection('categories', generateCategories, 10)

  // 9. Map all relationships in one pass
  await mapRelationships()

  payload.logger.info('FULL DATABASE SEED COMPLETE')
  process.exit(0)
}