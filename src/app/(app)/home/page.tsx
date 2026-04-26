import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import HyperspeedSection from './sections/Hyperspeed'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media) return undefined
  if (typeof media === 'object' && 'url' in media && media.url) return media.url
  return undefined
}

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
  if (!assets) return undefined
  for (const key of keys) {
    const url = getMediaUrl(assets[key])
    if (url) return url
  }
  return undefined
}

const getHomeData = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const [events, sessions, onboardings, slidesDocs, seriesList, races, drivers] = await Promise.all([
      payload.find({
        collection: 'events',
        limit: 5,
        depth: 1,
        sort: '-details.start_date',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            description: true,
            tagline: true,
            identifiers: { code: true },
          },
          assets: {
            thumbnail: true,
            cover: true,
            poster: true,
          },
          details: {
            start_date: true,
            type: true,
          },
        },
      }),
      payload.find({
        collection: 'sessions',
        limit: 5,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: {
            description: true,
            identifiers: { code: true },
          },
          assets: {
            thumbnail: true,
            cover: true,
          },
        },
      }),
      payload.find({
        collection: 'onboardings',
        limit: 5,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true },
          assets: {
            thumbnail: true,
            cover: true,
          },
        },
      }),
      payload.find({
        collection: 'slides',
        limit: 10,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true },
          assets: {
            background: true,
            thumbnail: true,
          },
          details: { type: true },
        },
      }),
      payload.find({
        collection: 'series',
        limit: 6,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          createdAt: true,
          basics: {
            description: true,
            tagline: true,
            identifiers: { code: true },
          },
          assets: {
            thumbnail: true,
            cover: true,
          },
        },
      }),
      payload.find({
        collection: 'races',
        where: {
          'details.status': { equals: 'completed' },
        },
        limit: 3,
        depth: 1,
        sort: '-details.start_date',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true },
          assets: {
            thumbnail: true,
            cover: true,
          },
          details: {
            distance_km: true,
            status: true,
          },
        },
      }),
      payload.find({
        collection: 'drivers',
        limit: 3,
        depth: 1,
        sort: '-createdAt',
        select: {
          id: true,
          first_name: true,
          last_name: true,
          slug: true,
          basics: {
            racing_number: true,
            callsign: true,
            catchphrase: true,
            tagline: true,
            description: true,
            nationality: true,
          },
          assets: { avatar: true },
        },
      }),
    ])

    return {
      events: events.docs,
      sessions: sessions.docs,
      onboardings: onboardings.docs,
      slidesDocs: slidesDocs.docs,
      seriesList: seriesList.docs,
      races: races.docs,
      drivers: drivers.docs,
    }
  },
  ['home-page-data'],
  { revalidate: 60, tags: ['home'] }
)

export default async function HomePage() {
  const { events, sessions, onboardings, seriesList, races, drivers } = await getHomeData()

  const videoItems = [...events, ...sessions, ...onboardings].slice(0, 8)

  const videoSlides = videoItems.map((item) => {
    let title = ''
    let description = ''
    let posterUrl: string | undefined = undefined
    let duration = ''

    if ('name' in item && item.name) {
      title = item.name
    } else if ('first_name' in item && 'last_name' in item) {
      title = `${item.first_name} ${item.last_name}`
    }

    if ('basics' in item && item.basics?.description) {
      description = item.basics.description
    }

    const assets = (item as any).assets
    posterUrl = resolveAssetUrl(assets, 'thumbnail', 'cover', 'poster')

    if ('details' in item && (item as any).details?.start_date) {
      duration = new Date((item as any).details.start_date).toISOString().split('T')[0]
    }

    return {
      id: String(item.id),
      title,
      description,
      url: posterUrl || '',
      poster: posterUrl,
      duration,
    }
  })

  const listEntries = seriesList.map((series) => {
    let timestamp = ''
    if (series.createdAt) {
      try {
        timestamp = new Date(series.createdAt).toISOString().split('T')[0]
      } catch {
        timestamp = ''
      }
    }
    return {
      id: String(series.id),
      title: series.name,
      subtitle: series.basics?.identifiers?.code || series.basics?.tagline || '',
      tag: series.basics?.identifiers?.code || 'SERIES',
      href: `/competition/series/${series.slug}`,
      timestamp,
      status: 'ACTIVE',
    }
  })

  const raceFeatures = races.map((race) => ({
    id: String(race.id),
    title: race.name,
    description: race.basics?.description || '',
    image: resolveAssetUrl(race.assets, 'thumbnail', 'cover'),
    stats: [
      { label: 'Distance', value: race.details?.distance_km ? `${race.details.distance_km} km` : '' },
      { label: 'Status', value: race.details?.status || '' },
    ],
  }))

  const driverFeatures = drivers.map((driver) => {
    const nationalityRef = driver.basics?.nationality
    const nationality =
      nationalityRef && typeof nationalityRef === 'object' && 'name' in nationalityRef && nationalityRef.name
        ? nationalityRef.name
        : ''

    return {
      id: String(driver.id),
      title: `${driver.first_name} ${driver.last_name}`,
      description: driver.basics?.callsign || driver.basics?.catchphrase || '',
      image: getMediaUrl(driver.assets?.avatar),
      stats: [
        { label: 'Number', value: driver.basics?.racing_number?.toString() || '' },
        { label: 'Nationality', value: nationality },
      ],
    }
  })

  const hyperspeedRoutes = [
    {
      id: '01',
      label: 'SERIES',
      slug: seriesList[0]?.slug || 'active',
      name: seriesList[0]?.name || 'Racing Series',
      path: '/competition/series',
    },
    {
      id: '02',
      label: 'SEASONS',
      slug: 'active',
      name: 'Global Seasons',
      path: '/competition/seasons',
    },
    {
      id: '03',
      label: 'EVENTS',
      slug: 'active',
      name: 'Circuit Events',
      path: '/competition/events',
    },
    {
      id: '04',
      label: 'SESSIONS',
      slug: 'active',
      name: 'Onboard Streams',
      path: '/competition/sessions',
    },
  ]

  return (
    <main className="w-full">
      {videoSlides.length > 0 && (
        <VideoSection
          id="home-videos"
          title="BROADCAST"
          subtitle="Recent streams and archives"
          videos={videoSlides}
          labels={{
            channelPrefix: 'CH',
            broadcastStatus: 'LIVE',
            liveFeed: 'FEED',
            metaTransmission: 'DATA',
          }}
        />
      )}
      <HyperspeedSection
        id="home-navigation"
        title="HYPERSPEED"
        subtitle="Quick access portal"
        routes={hyperspeedRoutes}
        headerVariant={1}
        footerVariant={1}
      />
      {listEntries.length > 0 && (
        <ListSection
          id="home-competition"
          title="SERIES"
          subtitle="Sanctioned racing divisions"
          entries={listEntries}
          labels={{
            statusPrefix: 'SYSTEM',
            timePrefix: 'UPDATED',
            indexPrefix: 'ID',
          }}
          showStatus={true}
          showTimestamp={true}
          ctaLabel="VIEW ALL DIVISIONS"
          ctaPath="/competition/series"
        />
      )}
      {raceFeatures.length > 0 && (
        <FeatureSection
          id="home-races"
          title="CALENDAR"
          subtitle="Recently concluded results"
          features={raceFeatures}
          labels={{
            specIndex: 'RACE',
            statsLabel: 'DATA',
            ctaLabel: 'VIEW',
          }}
          columns={3}
          headerVariant={1}
          ctaPath="/calendar/races"
        />
      )}
      {driverFeatures.length > 0 && (
        <FeatureSection
          id="home-drivers"
          title="ROSTER"
          subtitle="Active championship entry list"
          features={driverFeatures}
          labels={{
            specIndex: 'DRV',
            statsLabel: 'INFO',
            ctaLabel: 'PROFILE',
          }}
          columns={3}
          ctaPath="/teams"
        />
      )}
    </main>
  )
}