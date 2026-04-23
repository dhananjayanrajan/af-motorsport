// app/(frontend)/page.tsx (Home)
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
  if (!media) return undefined
  if (typeof media === 'object' && 'url' in media && media.url) return media.url
  return undefined
}

const getHomeData = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const [events, sessions, onboardings, slidesDocs, seriesList, races, drivers] = await Promise.all([
      payload.find({
        collection: 'events',
        limit: 5,
        sort: '-details.start_date',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true, tagline: true, identifiers: { code: true } },
          assets: { thumbnail: true, cover: true, poster: true },
          details: { start_date: true, type: true },
        },
      }),
      payload.find({
        collection: 'sessions',
        limit: 5,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true, identifiers: { code: true } },
          assets: { thumbnail: true, cover: true },
        },
      }),
      payload.find({
        collection: 'onboardings',
        limit: 5,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true },
          assets: { thumbnail: true, cover: true },
        },
      }),
      payload.find({
        collection: 'slides',
        limit: 10,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true },
          assets: { background: true, thumbnail: true },
          details: { type: true },
        },
      }),
      payload.find({
        collection: 'series',
        limit: 6,
        sort: '-createdAt',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true, tagline: true, identifiers: { code: true } },
          assets: { thumbnail: true, cover: true },
        },
      }),
      payload.find({
        collection: 'races',
        where: { 'details.status': { equals: 'completed' } },
        limit: 3,
        sort: '-details.start_date',
        select: {
          id: true,
          name: true,
          slug: true,
          basics: { description: true },
          assets: { thumbnail: true, cover: true },
          details: { distance_km: true, status: true },
        },
      }),
      payload.find({
        collection: 'drivers',
        limit: 3,
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
  const { events, sessions, onboardings, slidesDocs, seriesList, races, drivers } = await getHomeData()

  const videoItems = [...events, ...sessions, ...onboardings].slice(0, 8)

  const videoSlides = videoItems.map((item) => {
    let title = ''
    let description = ''
    let imageUrl: string | undefined = undefined
    let meta = ''
    let ctaHref = '#'

    if ('name' in item && item.name) title = item.name
    else if ('first_name' in item && 'last_name' in item) title = `${item.first_name} ${item.last_name}`

    if ('basics' in item && item.basics?.description) description = item.basics.description

    const assets = (item as any).assets
    if (assets) {
      if (assets.thumbnail) imageUrl = getMediaUrl(assets.thumbnail)
      if (!imageUrl && assets.cover) imageUrl = getMediaUrl(assets.cover)
      if (!imageUrl && assets.poster) imageUrl = getMediaUrl(assets.poster)
    }

    if ('type' in item && item.type && typeof item.type === 'string') meta = item.type
    if ('slug' in item && item.slug && typeof item.slug === 'string') ctaHref = `/${item.slug}`

    return { id: String(item.id), title, description, image: imageUrl, meta, ctaLabel: 'Watch', ctaHref }
  })

  const imageSlides = slidesDocs.map((slide) => {
    let imageUrl: string | undefined = undefined
    if (slide.assets) {
      if (slide.assets.background) imageUrl = getMediaUrl(slide.assets.background)
      if (!imageUrl && slide.assets.thumbnail) imageUrl = getMediaUrl(slide.assets.thumbnail)
    }
    return {
      id: String(slide.id),
      title: slide.name,
      description: slide.basics?.description || undefined,
      image: imageUrl,
      meta: slide.details?.type || '',
      ctaLabel: 'View',
      ctaHref: `/slides/${slide.slug}`,
    }
  })

  const gridItems = seriesList.map((series) => {
    let imageUrl: string | undefined = undefined
    if (series.assets) {
      if (series.assets.thumbnail) imageUrl = getMediaUrl(series.assets.thumbnail)
      if (!imageUrl && series.assets.cover) imageUrl = getMediaUrl(series.assets.cover)
    }
    return {
      id: String(series.id),
      title: series.name,
      subtitle: series.basics?.identifiers?.code || series.basics?.tagline || '',
      image: imageUrl,
      label: series.basics?.identifiers?.code?.slice(0, 3).toUpperCase() || '',
      href: `/competition/series/${series.slug}`,
    }
  })

  const raceFeatures = races.map((race) => {
    let imageUrl: string | undefined = undefined
    if (race.assets) {
      if (race.assets.thumbnail) imageUrl = getMediaUrl(race.assets.thumbnail)
      if (!imageUrl && race.assets.cover) imageUrl = getMediaUrl(race.assets.cover)
    }
    return {
      id: String(race.id),
      title: race.name,
      description: race.basics?.description || '',
      image: imageUrl,
      stats: [
        { label: 'Distance', value: race.details?.distance_km ? `${race.details.distance_km} km` : '' },
        { label: 'Status', value: race.details?.status || '' },
      ],
    }
  })

  const driverFeatures = drivers.map((driver) => {
    let imageUrl: string | undefined = undefined
    if (driver.assets?.avatar) imageUrl = getMediaUrl(driver.assets.avatar)
    let nationality = ''
    const nationalityRef = driver.basics?.nationality
    if (nationalityRef && typeof nationalityRef === 'object' && 'name' in nationalityRef && nationalityRef.name) {
      nationality = nationalityRef.name
    }
    return {
      id: String(driver.id),
      title: `${driver.first_name} ${driver.last_name}`,
      description: driver.basics?.callsign || driver.basics?.catchphrase || '',
      image: imageUrl,
      stats: [
        { label: 'Number', value: driver.basics?.racing_number?.toString() || '' },
        { label: 'Nationality', value: nationality },
      ],
    }
  })

  return (
    <main className="w-full">
      {videoSlides.length > 0 && (
        <CarouselSection
          id="home-videos"
          title="Latest Media"
          subtitle="Recent events, sessions & onboardings"
          slides={videoSlides}
          variant="full"
          autoplayDelay={6000}
          showArrows
          showDots
          headerVariant={2}
          footerVariant={1}
        />
      )}
      {imageSlides.length > 0 && (
        <CarouselSection
          id="home-slides"
          title="Featured Slides"
          subtitle="Visual highlights"
          slides={imageSlides}
          variant="card"
          autoplayDelay={5000}
          showArrows
          showDots
          headerVariant={1}
          footerVariant={1}
        />
      )}
      {gridItems.length > 0 && (
        <GridSection
          id="home-competition"
          title="Competition"
          subtitle="Active racing series"
          items={gridItems}
          columns={4}
          cardVariant={1}
          showMetadata={false}
          headerVariant={3}
          footerVariant={2}
          ctaLabel="View All Series"
          ctaPath="/competition"
        />
      )}
      {raceFeatures.length > 0 && (
        <FeatureSection
          id="home-races"
          title="Recent Races"
          subtitle="Latest completed events"
          features={raceFeatures}
          columns={3}
          headerVariant={1}
          footerVariant={2}
          ctaLabel="All Races"
          ctaPath="/calendar/races"
        />
      )}
      {driverFeatures.length > 0 && (
        <FeatureSection
          id="home-drivers"
          title="Featured Drivers"
          subtitle="Top competitors"
          features={driverFeatures}
          columns={3}
          headerVariant={1}
          footerVariant={1}
          ctaLabel="All Drivers"
          ctaPath="/teams"
        />
      )}
    </main>
  )
}