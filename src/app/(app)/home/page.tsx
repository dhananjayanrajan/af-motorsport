import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Media, Session, Slide } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

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

    const [sessionsData, slidesData] = await Promise.all([
      payload.find({
        collection: 'sessions',
        limit: 10,
        depth: 1,
        sort: '-details.start_time',
      }),
      payload.find({
        collection: 'slides',
        limit: 5,
        depth: 1,
        sort: '-createdAt',
      }),
    ])

    return {
      sessions: sessionsData.docs as Session[],
      slides: slidesData.docs as Slide[],
    }
  },
  ['home-page-data'],
  { revalidate: 3600, tags: ['sessions', 'slides'] }
)

export default async function HomePage() {
  const { sessions, slides } = await getHomeData()

  const videoSlides = sessions.map((session) => ({
    id: String(session.id),
    title: session.name,
    description: session.basics?.description || undefined,
    url: `/competition/sessions/${session.slug}`,
    poster: resolveAssetUrl(session.assets, 'thumbnail', 'cover', 'poster') || '',
    duration: '00:00',
  }))

  const carouselSlides = slides.map((slide) => ({
    id: String(slide.id),
    title: slide.name,
    description: slide.basics?.description || undefined,
    image: resolveAssetUrl(slide.assets, 'thumbnail', 'cover', 'poster') || '',
    meta: slide.basics?.identifiers?.code || undefined,
  }))

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

      {carouselSlides.length > 0 && (
        <CarouselSection
          id="home-slides"
          slides={carouselSlides}
          autoplayDelay={5000}
          ctaLabel="EXPLORE RACE SESSIONS"
          ctaPath="/competition/sessions"
          itemsToScroll={1}
        />
      )}
    </main>
  )
}