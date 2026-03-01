import type { SanitizedConfig } from 'payload'
import payload from 'payload'
import { mapRelationships } from './mapper';

import { generateCategories } from './collections/Attributes/Category/seeders/generate'
import { generateChannels } from './collections/Attributes/Channel/seeders/generate'
// import { generateClassifications } from './collections/Attributes/Classification/seeders/generate'
// import { generateFeatures } from './collections/Attributes/Feature/seeders/generate'
// import { generateLocations } from './collections/Attributes/Location/seeders/generate'
// import { generatePreferences } from './collections/Attributes/Preference/seeders/generate'
// import { generatePrinciples } from './collections/Attributes/Principle/seeders/generate'
// import { generateSkills } from './collections/Attributes/Skill/seeders/generate'
// import { generateSpecifications } from './collections/Attributes/Specification/seeders/generate'
import { generateTags } from './collections/Attributes/Tag/seeders/generate'
import { generateTones } from './collections/Attributes/Tone/seeders/generate'

// import { generateEntries } from './collections/Competition/Entry/seeders/generate'
// import { generateEvents } from './collections/Competition/Event/seeders/generate'
// import { generatePoints } from './collections/Competition/Point/seeders/generate'
// import { generateResults } from './collections/Competition/Result/seeders/generate'
// import { generateSeasons } from './collections/Competition/Season/seeders/generate'
// import { generateSessions } from './collections/Competition/Session/seeders/generate'
// import { generateSeries } from './collections/Competition/Series/seeders/generate'

// import { generateHistories } from './collections/Content/History/seeders/generate'
// import { generateJourneys } from './collections/Content/Journey/seeders/generate'
// import { generateNarratives } from './collections/Content/Narrative/seeders/generate'
// import { generateNotes } from './collections/Content/Note/seeders/generate'
// import { generateStories } from './collections/Content/Story/seeders/generate'

// import { generateDrivers } from './collections/Entities/Driver/seeders/generate'
// import { generateIndividuals } from './collections/Entities/Individual/seeders/generate'
// import { generateLeaders } from './collections/Entities/Leader/seeders/generate'
// import { generateMembers } from './collections/Entities/Member/seeders/generate'
// import { generateOrganizations } from './collections/Entities/Organization/seeders/generate'

// import { generateCareers } from './collections/Operations/Career/seeders/generate'
// import { generateCelebrations } from './collections/Operations/Celebration/seeders/generate'
// import { generateDuties } from './collections/Operations/Duty/seeders/generate'
// import { generateExpectations } from './collections/Operations/Expectation/seeders/generate'
// import { generateInitiatives } from './collections/Operations/Initiative/seeders/generate'
// import { generateMeetups } from './collections/Operations/Meetup/seeders/generate'
// import { generateProtocols } from './collections/Operations/Protocol/seeders/generate'
// import { generateSchedules } from './collections/Operations/Schedule/seeders/generate'
// import { generateTrainings } from './collections/Operations/Training/seeders/generate'

// import { generateAwards } from './collections/Outcomes/Award/seeders/generate'
// import { generateDecisions } from './collections/Outcomes/Decision/seeders/generate'
// import { generateExperiences } from './collections/Outcomes/Experience/seeders/generate'
// import { generateHighlights } from './collections/Outcomes/Highlight/seeders/generate'
// import { generateImpacts } from './collections/Outcomes/Impact/seeders/generate'
// import { generateIncidents } from './collections/Outcomes/Incident/seeders/generate'
// import { generateStrategies } from './collections/Outcomes/Strategy/seeders/generate'

// import { generateArchives } from './collections/Resources/Archive/seeders/generate'
// import { generateCars } from './collections/Resources/Car/seeders/generate'
// import { generateGalleries } from './collections/Resources/Gallery/seeders/generate'
// import { generateKits } from './collections/Resources/Kit/seeders/generate'
// import { generateMedia } from './collections/Resources/Media/seeders/generate'
// import { generatePlaylists } from './collections/Resources/Playlist/seeders/generate'
// import { generateVisualizations } from './collections/Resources/Visualization/seeders/generate'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TRUNCATE_ORDER = [
  'points', 'results', 'entries', 'sessions', 'events', 'seasons', 'series',
  'meetups', 'initiatives', 'celebrations', 'careers', 'trainings', 'schedules',
  'duties', 'expectations', 'protocols', 'kits', 'cars', 'awards', 'organizations',
  'members', 'leaders', 'individuals', 'drivers', 'experiences', 'strategies',
  'incidents', 'highlights', 'impacts', 'decisions', 'stories', 'journeys',
  'histories', 'notes', 'narratives', 'archives', 'playlists', 'visualizations',
  'galleries', 'tones', 'tags', 'specifications', 'skills', 'principles',
  'locations', 'features', 'preferences', 'classifications', 'channels', 'categories', 'media',
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
  // const categoryIds = await seedCollection('categories', generateCategories, 10)
  // const tagIds = await seedCollection('tags', generateTags, 15)
  // const toneIds = await seedCollection('tones', generateTones, 8)
  // const locationIds = await seedCollection('locations', generateLocations, 10)

  // // 2. Seed attribute collections
  // const channelIds = await seedCollection('channels', generateChannels, 12)
  // const classificationIds = await seedCollection('classifications', generateClassifications, 10)
  // const featureIds = await seedCollection('features', generateFeatures, 15)
  // const preferenceIds = await seedCollection('preferences', generatePreferences, 8)
  // const principleIds = await seedCollection('principles', generatePrinciples, 6)
  // const skillIds = await seedCollection('skills', generateSkills, 20)
  // const specificationIds = await seedCollection('specifications', generateSpecifications, 25)

  // // 3. Seed content collections
  // const narrativeIds = await seedCollection('narratives', generateNarratives, 15)
  // const noteIds = await seedCollection('notes', generateNotes, 30)
  // const historyIds = await seedCollection('histories', generateHistories, 12)
  // const journeyIds = await seedCollection('journeys', generateJourneys, 10)
  // const storyIds = await seedCollection('stories', generateStories, 18)

  // // 4. Seed entity collections
  // const organizationIds = await seedCollection('organizations', generateOrganizations, 12)
  // const leaderIds = await seedCollection('leaders', generateLeaders, 8)
  // const memberIds = await seedCollection('members', generateMembers, 20)
  // const individualIds = await seedCollection('individuals', generateIndividuals, 15)
  // const driverIds = await seedCollection('drivers', generateDrivers, 12)

  // // 5. Seed resource collections
  // const galleryIds = await seedCollection('galleries', generateGalleries, 10)
  // const playlistIds = await seedCollection('playlists', generatePlaylists, 8)
  // const visualizationIds = await seedCollection('visualizations', generateVisualizations, 8)
  // const archiveIds = await seedCollection('archives', generateArchives, 10)
  // const carIds = await seedCollection('cars', generateCars, 15)
  // const kitIds = await seedCollection('kits', generateKits, 12)

  // // 6. Seed competition collections
  // const seriesIds = await seedCollection('series', generateSeries, 6)
  // const seasonIds = await seedCollection('seasons', generateSeasons, 8)
  // const eventIds = await seedCollection('events', generateEvents, 12)
  // const sessionIds = await seedCollection('sessions', generateSessions, 20)
  // const entryIds = await seedCollection('entries', generateEntries, 30)

  // // 7. Seed operations collections
  // const protocolIds = await seedCollection('protocols', generateProtocols, 10)
  // const expectationIds = await seedCollection('expectations', generateExpectations, 15)
  // const scheduleIds = await seedCollection('schedules', generateSchedules, 12)
  // const dutyIds = await seedCollection('duties', generateDuties, 10)
  // const trainingIds = await seedCollection('trainings', generateTrainings, 12)
  // const careerIds = await seedCollection('careers', generateCareers, 10)
  // const celebrationIds = await seedCollection('celebrations', generateCelebrations, 8)
  // const meetupIds = await seedCollection('meetups', generateMeetups, 10)
  // const initiativeIds = await seedCollection('initiatives', generateInitiatives, 8)

  // // 8. Seed outcome collections
  // const highlightIds = await seedCollection('highlights', generateHighlights, 15)
  // const incidentIds = await seedCollection('incidents', generateIncidents, 12)
  // const impactIds = await seedCollection('impacts', generateImpacts, 10)
  // const decisionIds = await seedCollection('decisions', generateDecisions, 15)
  // const strategyIds = await seedCollection('strategies', generateStrategies, 8)
  // const awardIds = await seedCollection('awards', generateAwards, 10)
  // const experienceIds = await seedCollection('experiences', generateExperiences, 12)
  // const pointIds = await seedCollection('points', generatePoints, 20)
  // const resultIds = await seedCollection('results', generateResults, 25)

  // 9. Map all relationships in one pass
  // await mapRelationships()

  payload.logger.info('FULL DATABASE SEED COMPLETE')
  process.exit(0)
}