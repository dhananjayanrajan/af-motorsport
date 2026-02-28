// FILE: src/seed.ts
import type { SanitizedConfig } from 'payload'
import payload from 'payload'

import { PRELOAD_MEDIA } from 'src/collections/Resources/Media/seeders/preload'

import { PRELOAD_CATEGORY } from 'src/collections/Attributes/Category/seeders/preload'
import { PRELOAD_CHANNEL } from 'src/collections/Attributes/Channel/seeders/preload'
import { PRELOAD_CLASSIFICATION } from 'src/collections/Attributes/Classification/seeders/preload'
import { PRELOAD_PREFERENCE } from 'src/collections/Attributes/Preference/seeders/preload'
import { PRELOAD_FEATURE } from 'src/collections/Attributes/Feature/seeders/preload'
import { PRELOAD_LOCATION } from 'src/collections/Attributes/Location/seeders/preload'
import { PRELOAD_PRINCIPLE } from 'src/collections/Attributes/Principle/seeders/preload'
import { PRELOAD_SKILL } from 'src/collections/Attributes/Skill/seeders/preload'
import { PRELOAD_SPECIFICATION } from 'src/collections/Attributes/Specification/seeders/preload'
import { PRELOAD_TAG } from 'src/collections/Attributes/Tag/seeders/preload'
import { PRELOAD_TONE } from 'src/collections/Attributes/Tone/seeders/preload'

import { PRELOAD_ENTRY } from 'src/collections/Competition/Entry/seeders/preload'
import { PRELOAD_EVENT } from 'src/collections/Competition/Event/seeders/preload'
import { PRELOAD_POINT } from 'src/collections/Competition/Point/seeders/preload'
import { PRELOAD_RESULT } from 'src/collections/Competition/Result/seeders/preload'
import { PRELOAD_SEASON } from 'src/collections/Competition/Season/seeders/preload'
import { PRELOAD_SESSION } from 'src/collections/Competition/Session/seeders/preload'
import { PRELOAD_SERIES } from './collections/Competition/Series/seeders/preload'

import { PRELOAD_HISTORY } from 'src/collections/Content/History/seeders/preload'
import { PRELOAD_JOURNEY } from 'src/collections/Content/Journey/seeders/preload'
import { PRELOAD_NARRATIVE } from 'src/collections/Content/Narrative/seeders/preload'
import { PRELOAD_NOTE } from 'src/collections/Content/Note/seeders/preload'
import { PRELOAD_STORY } from 'src/collections/Content/Story/seeders/preload'

import { PRELOAD_DRIVER } from 'src/collections/Entities/Driver/seeders/preload'
import { PRELOAD_INDIVIDUAL } from 'src/collections/Entities/Individual/seeders/preload'
import { PRELOAD_LEADER } from 'src/collections/Entities/Leader/seeders/preload'
import { PRELOAD_MEMBER } from 'src/collections/Entities/Member/seeders/preload'
import { PRELOAD_ORGANIZATION } from 'src/collections/Entities/Organization/seeders/preload'

import { PRELOAD_CAREER } from 'src/collections/Operations/Career/seeders/preload'
import { PRELOAD_CELEBRATION } from 'src/collections/Operations/Celebration/seeders/preload'
import { PRELOAD_DUTY } from 'src/collections/Operations/Duty/seeders/preload'
import { PRELOAD_EXPECTATION } from 'src/collections/Operations/Expectation/seeders/preload'
import { PRELOAD_INITIATIVE } from 'src/collections/Operations/Initiative/seeders/preload'
import { PRELOAD_MEETUP } from 'src/collections/Operations/Meetup/seeders/preload'
import { PRELOAD_PROTOCOL } from 'src/collections/Operations/Protocol/seeders/preload'
import { PRELOAD_SCHEDULE } from 'src/collections/Operations/Schedule/seeders/preload'
import { PRELOAD_TRAINING } from 'src/collections/Operations/Training/seeders/preload'

import { PRELOAD_AWARD } from 'src/collections/Outcomes/Award/seeders/preload'
import { PRELOAD_DECISION } from 'src/collections/Outcomes/Decision/seeders/preload'
import { PRELOAD_EXPERIENCE } from 'src/collections/Outcomes/Experience/seeders/preload'
import { PRELOAD_HIGHLIGHT } from 'src/collections/Outcomes/Highlight/seeders/preload'
import { PRELOAD_IMPACT } from 'src/collections/Outcomes/Impact/seeders/preload'
import { PRELOAD_INCIDENT } from 'src/collections/Outcomes/Incident/seeders/preload'
import { PRELOAD_STRATEGY } from 'src/collections/Outcomes/Strategy/seeders/preload'

import { PRELOAD_ARCHIVE } from 'src/collections/Resources/Archive/seeders/preload'
import { PRELOAD_CAR } from 'src/collections/Resources/Car/seeders/preload'
import { PRELOAD_GALLERY } from 'src/collections/Resources/Gallery/seeders/preload'
import { PRELOAD_KIT } from 'src/collections/Resources/Kit/seeders/preload'
import { PRELOAD_PLAYLIST } from 'src/collections/Resources/Playlist/seeders/preload'
import { PRELOAD_VISUALIZATION } from 'src/collections/Resources/Visualization/seeders/preload'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seedMedia = async (): Promise<number[]> => {
  payload.logger.info('Seeding media (5)')
  const ids: number[] = []

  for (let i = 1; i <= 5; i++) {
    const filePath = path.resolve(__dirname, `fixtures/placeholder-${i}.png`)
    const fileBuffer = fs.readFileSync(filePath)
    const mimetype = 'image/png'
    const filename = `placeholder-${i}.png`

    try {
      const result = await payload.create({
        collection: 'media',
        data: { alt: `Placeholder ${i}` },
        file: {
          data: fileBuffer,
          mimetype,
          name: filename,
          size: fileBuffer.length,
        },
      })
      ids.push(result.id)
      payload.logger.info(`Created media ${result.id} (${filename})`)
    } catch (error: any) {
      payload.logger.error(`Failed media ${i}: ${error?.message}`)
    }
  }

  payload.logger.info('Finished media')
  return ids
}

type SeedEntry = {
  slug: string
  data: readonly any[]
}

const seedCollection = async ({ slug, data }: SeedEntry) => {
  if (!data?.length) {
    payload.logger.info(`Skipping ${slug} (no preload data)`)
    return
  }

  payload.logger.info(`Seeding ${slug} (${data.length})`)

  for (const item of data) {
    try {
      await payload.create({
        collection: slug as any,
        data: item,
        locale: 'en',
      })
    } catch (error: any) {
      payload.logger.error(
        `Failed in ${slug}: ${error?.message ?? JSON.stringify(error)}`
      )
    }
  }

  payload.logger.info(`Finished ${slug}`)
}

const seedRelationships = async () => {
  payload.logger.info('STARTING RELATIONSHIP SEED')

  const [
    narratives, histories, journeys, notes, stories,
    drivers, individuals, leaders, members, organizations,
    careers, celebrations, duties, expectations, initiatives,
    meetups, protocols, schedules, trainings,
    awards, decisions, experiences, highlights, impacts, incidents, strategies,
    archives, cars, galleries, kits, playlists, visualizations,
    tones, channels, features, specifications, locations,
  ] = await Promise.all([
    payload.find({ collection: 'narratives', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'histories', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'journeys', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'notes', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'stories', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'drivers', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'individuals', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'leaders', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'members', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'organizations', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'careers', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'celebrations', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'duties', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'expectations', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'initiatives', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'meetups', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'protocols', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'schedules', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'trainings', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'awards', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'decisions', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'experiences', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'highlights', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'impacts', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'incidents', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'strategies', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'archives', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'cars', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'galleries', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'kits', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'playlists', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'visualizations', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'tones', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'channels', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'features', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'specifications', limit: 1000, locale: 'en' }),
    payload.find({ collection: 'locations', limit: 1000, locale: 'en' }),
  ])

  const id = (col: { docs: any[] }, index: number) => col.docs[index % col.docs.length]?.id ?? null

  const update = async (collection: string, docId: number, data: any) => {
    try {
      await payload.update({ collection: collection as any, id: docId, locale: 'en', data })
    } catch (error: any) {
      payload.logger.error(`Failed relationship update in ${collection} id ${docId}: ${error?.message ?? JSON.stringify(error)}`)
    }
  }

  for (let i = 0; i < narratives.docs.length; i++) {
    await update('narratives', narratives.docs[i].id, {
      traits: { tone: id(tones, i) },
      contexts: { notes: id(notes, i) },
    })
  }

  for (let i = 0; i < histories.docs.length; i++) {
    await update('histories', histories.docs[i].id, {
      details: { stories: id(stories, i) },
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
    })
  }

  for (let i = 0; i < journeys.docs.length; i++) {
    await update('journeys', journeys.docs[i].id, {
      details: { stories: id(stories, i) },
      traits: { decisions: id(decisions, i), impacts: id(impacts, i) },
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
    })
  }

  for (let i = 0; i < stories.docs.length; i++) {
    await update('stories', stories.docs[i].id, {
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
      contexts: { highlights: id(highlights, i), incidents: id(incidents, i) },
    })
  }

  for (let i = 0; i < drivers.docs.length; i++) {
    await update('drivers', drivers.docs[i].id, {
      details: { narrative: id(narratives, i), biography: id(histories, i), journeys: id(journeys, i) },
      traits: { channels: id(channels, i), experiences: id(experiences, i) },
      assets: { gallery: id(galleries, i) },
      contexts: { cars: id(cars, i), kits: id(kits, i) },
    })
  }

  for (let i = 0; i < individuals.docs.length; i++) {
    await update('individuals', individuals.docs[i].id, {
      details: { narrative: id(narratives, i) },
      traits: { channels: id(channels, i) },
      assets: { gallery: id(galleries, i) },
      contexts: { history: id(histories, i), notes: id(notes, i) },
    })
  }

  for (let i = 0; i < leaders.docs.length; i++) {
    await update('leaders', leaders.docs[i].id, {
      details: { narrative: id(narratives, i), biography: id(histories, i) },
      traits: { channels: id(channels, i), strategies: id(strategies, i) },
      metrics: { impacts: id(impacts, i), awards: id(awards, i) },
      assets: { gallery: id(galleries, i) },
      contexts: { anecdotes: id(notes, i) },
    })
  }

  for (let i = 0; i < members.docs.length; i++) {
    await update('members', members.docs[i].id, {
      details: { narrative: id(narratives, i) },
      traits: { channels: id(channels, i), duties: id(duties, i) },
      metrics: { impacts: id(impacts, i), awards: id(awards, i) },
      assets: { gallery: id(galleries, i) },
    })
  }

  for (let i = 0; i < organizations.docs.length; i++) {
    await update('organizations', organizations.docs[i].id, {
      details: { narrative: id(narratives, i) },
      traits: { channels: id(channels, i) },
      assets: { gallery: id(galleries, i) },
      contexts: { history: id(histories, i), notes: id(notes, i), headquarters: id(locations, i) },
    })
  }

  for (let i = 0; i < careers.docs.length; i++) {
    await update('careers', careers.docs[i].id, {
      details: { expectations: id(expectations, i), awards: id(awards, i) },
      contexts: { stories: id(stories, i), highlights: id(highlights, i) },
    })
  }

  for (let i = 0; i < celebrations.docs.length; i++) {
    await update('celebrations', celebrations.docs[i].id, {
      details: { expectations: id(expectations, i), stories: id(stories, i) },
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
      contexts: { notes: id(notes, i) },
    })
  }

  for (let i = 0; i < duties.docs.length; i++) {
    await update('duties', duties.docs[i].id, {
      contexts: { protocols: id(protocols, i), expectations: id(expectations, i), notes: id(notes, i) },
    })
  }

  for (let i = 0; i < expectations.docs.length; i++) {
    await update('expectations', expectations.docs[i].id, {
      contexts: { protocols: id(protocols, i), notes: id(notes, i) },
    })
  }

  for (let i = 0; i < initiatives.docs.length; i++) {
    await update('initiatives', initiatives.docs[i].id, {
      details: { strategies: id(strategies, i), expectations: id(expectations, i), insights: id(notes, i) },
      contexts: { histories: id(histories, i), schedules: id(schedules, i) },
    })
  }

  for (let i = 0; i < meetups.docs.length; i++) {
    await update('meetups', meetups.docs[i].id, {
      details: { features: id(features, i) },
      traits: { specifications: id(specifications, i) },
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
      contexts: { schedules: id(schedules, i), notes: id(notes, i) },
    })
  }

  for (let i = 0; i < trainings.docs.length; i++) {
    await update('trainings', trainings.docs[i].id, {
      traits: { specifications: id(specifications, i) },
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
      contexts: { strategies: id(strategies, i) },
    })
  }

  for (let i = 0; i < awards.docs.length; i++) {
    await update('awards', awards.docs[i].id, {
      contexts: { story: id(stories, i) },
    })
  }

  for (let i = 0; i < decisions.docs.length; i++) {
    await update('decisions', decisions.docs[i].id, {
      traits: { features: id(features, i), specifications: id(specifications, i), expectations: id(expectations, i) },
      contexts: { protocols: id(protocols, i), notes: id(notes, i), impacts: id(impacts, i) },
    })
  }

  for (let i = 0; i < experiences.docs.length; i++) {
    await update('experiences', experiences.docs[i].id, {
      assets: { gallery: id(galleries, i) },
      contexts: { highlights: id(highlights, i), incidents: id(incidents, i), journey: id(journeys, i) },
    })
  }

  for (let i = 0; i < highlights.docs.length; i++) {
    await update('highlights', highlights.docs[i].id, {
      traits: { specifications: id(specifications, i) },
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
      contexts: { stories: id(stories, i) },
    })
  }

  for (let i = 0; i < impacts.docs.length; i++) {
    await update('impacts', impacts.docs[i].id, {
      traits: { tone: id(tones, i) },
      contexts: { notes: id(notes, i) },
    })
  }

  for (let i = 0; i < incidents.docs.length; i++) {
    await update('incidents', incidents.docs[i].id, {
      details: { decisions: id(decisions, i), specifications: id(specifications, i) },
      traits: { impacts: id(impacts, i) },
      assets: { gallery: id(galleries, i), archive: id(archives, i) },
    })
  }

  for (let i = 0; i < strategies.docs.length; i++) {
    await update('strategies', strategies.docs[i].id, {
      details: { decisions: id(decisions, i), impacts: id(impacts, i) },
      contexts: { narrative: id(narratives, i) },
    })
  }

  for (let i = 0; i < cars.docs.length; i++) {
    await update('cars', cars.docs[i].id, {
      traits: { features: id(features, i), specifications: id(specifications, i) },
      assets: { gallery: id(galleries, i), playlist: id(playlists, i) },
      contexts: { manufacturers: id(organizations, i), histories: id(histories, i) },
    })
  }

  for (let i = 0; i < kits.docs.length; i++) {
    await update('kits', kits.docs[i].id, {
      assets: { gallery: id(galleries, i) },
      contexts: { notes: id(notes, i) },
    })
  }

  payload.logger.info('RELATIONSHIP SEED COMPLETE')
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  payload.logger.info('TRUNCATING DATABASE')

  const truncateOrder = [
    'points', 'results', 'entries', 'sessions', 'events', 'seasons', 'series',
    'meetups', 'initiatives', 'celebrations', 'careers', 'trainings', 'schedules',
    'duties', 'expectations', 'protocols', 'kits', 'cars', 'awards', 'organizations',
    'members', 'leaders', 'individuals', 'drivers', 'experiences', 'strategies',
    'incidents', 'highlights', 'impacts', 'decisions', 'stories', 'journeys',
    'histories', 'notes', 'narratives', 'archives', 'playlists', 'visualizations',
    'galleries', 'tones', 'tags', 'specifications', 'skills', 'principles',
    'locations', 'features', 'preferences', 'classifications', 'channels', 'categories', 'media',
  ]

  for (const slug of truncateOrder) {
    const result = await payload.find({ collection: slug as any, limit: 1000 })
    for (const doc of result.docs) {
      await payload.delete({ collection: slug as any, id: doc.id })
    }
    payload.logger.info(`Truncated ${slug}`)
  }

  payload.logger.info('TRUNCATION COMPLETE')
  payload.logger.info('STARTING FULL DATABASE SEED')

  // await seedCollection({ slug: 'categories', data: PRELOAD_CATEGORY })
  // const { docs: categories } = await payload.find({ collection: 'categories', limit: 1000 })
  // const categoriesIds = categories.map(c => c.id)

  // const mediaIds = await seedMedia()

  // await seedCollection({ slug: 'tones', data: PRELOAD_TONE(categoriesIds) })
  // const { docs: tones } = await payload.find({ collection: 'tones', limit: 1000 })
  // const tonesIds = tones.map(t => t.id)

  // await seedCollection({ slug: 'locations', data: PRELOAD_LOCATION(categoriesIds) })
  // const { docs: locations } = await payload.find({ collection: 'locations', limit: 1000 })
  // const locationIds = locations.map(l => l.id)

  // await seedCollection({ slug: 'narratives', data: PRELOAD_NARRATIVE(categoriesIds, tonesIds, locationIds) })
  // const { docs: narratives } = await payload.find({ collection: 'narratives', limit: 1000 })
  // const narrativesIds = narratives.map(n => n.id)

  const collections: SeedEntry[] = [
    { slug: 'channels', data: PRELOAD_CHANNEL() },
    // { slug: 'classifications', data: PRELOAD_CLASSIFICATION(categoriesIds) },
    // { slug: 'preferences', data: PRELOAD_PREFERENCE(categoriesIds) },
    // { slug: 'features', data: PRELOAD_FEATURE(categoriesIds) },
    // { slug: 'principles', data: PRELOAD_PRINCIPLE(categoriesIds) },
    // { slug: 'skills', data: PRELOAD_SKILL(categoriesIds) },
    // { slug: 'specifications', data: PRELOAD_SPECIFICATION(categoriesIds) },
    // { slug: 'tags', data: PRELOAD_TAG(categoriesIds) },
    // { slug: 'galleries', data: PRELOAD_GALLERY(categoriesIds, mediaIds) },
    // { slug: 'visualizations', data: PRELOAD_VISUALIZATION(categoriesIds, mediaIds) },
    // { slug: 'playlists', data: PRELOAD_PLAYLIST(categoriesIds) },
    // { slug: 'notes', data: PRELOAD_NOTE(categoriesIds) },
    // { slug: 'journeys', data: PRELOAD_JOURNEY(categoriesIds, narrativesIds) },
    // { slug: 'histories', data: PRELOAD_HISTORY(categoriesIds, narrativesIds) },
    // { slug: 'stories', data: PRELOAD_STORY(categoriesIds, narrativesIds) },
    // { slug: 'archives', data: PRELOAD_ARCHIVE(categoriesIds, narrativesIds) },
    // { slug: 'decisions', data: PRELOAD_DECISION(categoriesIds, narrativesIds) },
    // { slug: 'impacts', data: PRELOAD_IMPACT(categoriesIds) },
    // { slug: 'highlights', data: PRELOAD_HIGHLIGHT(categoriesIds, narrativesIds) },
    // { slug: 'incidents', data: PRELOAD_INCIDENT(categoriesIds, narrativesIds) },
    // { slug: 'strategies', data: PRELOAD_STRATEGY(categoriesIds) },
    // { slug: 'experiences', data: PRELOAD_EXPERIENCE(categoriesIds, narrativesIds) },

    // { slug: 'drivers', data: PRELOAD_DRIVER(categoriesIds) },
    // { slug: 'leaders', data: PRELOAD_LEADER(categoriesIds, narrativesIds) },
    // { slug: 'members', data: PRELOAD_MEMBER(categoriesIds, narrativesIds) },
    // { slug: 'individuals', data: PRELOAD_INDIVIDUAL(categoriesIds) },
    // { slug: 'organizations', data: PRELOAD_ORGANIZATION(categoriesIds) },

    // { slug: 'awards', data: PRELOAD_AWARD(categoriesIds, narrativesIds) },
    // { slug: 'cars', data: PRELOAD_CAR(categoriesIds) },
    // { slug: 'kits', data: PRELOAD_KIT(categoriesIds) },
    // { slug: 'protocols', data: PRELOAD_PROTOCOL(categoriesIds) },
    // { slug: 'expectations', data: PRELOAD_EXPECTATION(categoriesIds) },
    // { slug: 'duties', data: PRELOAD_DUTY(categoriesIds) },
    // { slug: 'schedules', data: PRELOAD_SCHEDULE(categoriesIds) },
    // { slug: 'trainings', data: PRELOAD_TRAINING(categoriesIds, narrativesIds) },
    // { slug: 'careers', data: PRELOAD_CAREER(categoriesIds, narrativesIds) },
    // { slug: 'celebrations', data: PRELOAD_CELEBRATION(categoriesIds, narrativesIds) },
    // { slug: 'initiatives', data: PRELOAD_INITIATIVE(categoriesIds, narrativesIds) },
    // { slug: 'meetups', data: PRELOAD_MEETUP(categoriesIds, narrativesIds) },
    // { slug: 'series', data: PRELOAD_SERIES(categoriesIds) },
    // { slug: 'seasons', data: PRELOAD_SEASON(categoriesIds) },
    // { slug: 'events', data: PRELOAD_EVENT(categoriesIds) },
    // { slug: 'sessions', data: PRELOAD_SESSION(categoriesIds) },
    // { slug: 'entries', data: PRELOAD_ENTRY(categoriesIds) },
    // { slug: 'results', data: PRELOAD_RESULT(categoriesIds) },
    // { slug: 'points', data: PRELOAD_POINT(categoriesIds) },
  ]

  for (const collection of collections) {
    await seedCollection(collection)
  }

  await seedRelationships()

  payload.logger.info('FULL DATABASE SEED COMPLETE')
  process.exit(0)
}