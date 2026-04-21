// app/page.tsx
import VideoSection from '@/components/Section/Slug/Video'
import TopDrivers from './sections/Drivers'
import HyperspeedSection from './sections/Hyperspeed'
import LatestRaces from './sections/Races'
import HeroSlides from './sections/Slides'

export const dynamic = 'force-dynamic'

async function safeFetch(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) return { docs: [], totalDocs: 0 }
    return await res.json()
  } catch (e) {
    console.error('Fetch error:', e)
    return { docs: [], totalDocs: 0 }
  }
}

async function getHomeData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL

  if (!url) {
    console.error('NEXT_PUBLIC_PAYLOAD_URL is not defined')
    return {
      races: [],
      drivers: [],
      slides: [],
      videoUrls: [],
      navigation: {
        series: 'global',
        seasons: '2026',
        events: 'grand-prix',
        sessions: 'qualifying',
        seriesName: 'FORMULA 1',
        seasonsName: 'WORLD CHAMPIONSHIP',
        eventsName: 'MONACO GRAND PRIX',
        sessionsName: 'QUALIFYING SESSION'
      }
    }
  }

  const [
    races,
    slides,
    sessions,
    events,
    seasons,
    series,
    drivers,
  ] = await Promise.all([
    safeFetch(`${url}/api/races?sort=-createdAt&limit=10`),
    safeFetch(`${url}/api/slides?limit=10`),
    safeFetch(`${url}/api/sessions?sort=-createdAt&limit=10`),
    safeFetch(`${url}/api/events?sort=-createdAt&limit=10`),
    safeFetch(`${url}/api/seasons?sort=-createdAt&limit=10`),
    safeFetch(`${url}/api/series?limit=10`),
    safeFetch(`${url}/api/drivers?sort=-createdAt&limit=10`),
  ])

  const extractVideoUrls = (items: any[]) => {
    const urls: string[] = []
    items.forEach(item => {
      if (item?.assets?.video) {
        const video = item.assets.video
        const videoUrl = typeof video === 'object' ? video?.url : video
        if (typeof videoUrl === 'string' && videoUrl) urls.push(videoUrl)
      }
      if (item?.assets?.videos && Array.isArray(item.assets.videos)) {
        item.assets.videos.forEach((vid: any) => {
          const videoUrl = typeof vid === 'object' ? vid?.url : vid
          if (typeof videoUrl === 'string' && videoUrl) urls.push(videoUrl)
        })
      }
      if (item?.assets?.highlights && Array.isArray(item.assets.highlights)) {
        item.assets.highlights.forEach((highlight: any) => {
          const highlightUrl = typeof highlight === 'object' ? highlight?.url : highlight
          if (typeof highlightUrl === 'string' && highlightUrl) urls.push(highlightUrl)
        })
      }
      if (item?.assets?.trailer) {
        const trailer = item.assets.trailer
        const trailerUrl = typeof trailer === 'object' ? trailer?.url : trailer
        if (typeof trailerUrl === 'string' && trailerUrl) urls.push(trailerUrl)
      }
    })
    return urls
  }

  const allVideoUrls = extractVideoUrls([
    ...(races?.docs || []),
    ...(sessions?.docs || []),
    ...(events?.docs || []),
    ...(seasons?.docs || [])
  ])

  const firstSeries = series?.docs?.[0]
  const firstSeason = seasons?.docs?.[0]
  const firstEvent = events?.docs?.[0]
  const firstSession = sessions?.docs?.[0]

  return {
    races: races?.docs || [],
    drivers: drivers?.docs || [],
    slides: slides?.docs || [],
    videoUrls: allVideoUrls,
    navigation: {
      series: firstSeries?.slug || 'global',
      seasons: firstSeason?.slug || '2026',
      events: firstEvent?.slug || 'grand-prix',
      sessions: firstSession?.slug || 'qualifying',
      seriesName: firstSeries?.name || 'FORMULA 1',
      seasonsName: firstSeason?.name || 'WORLD CHAMPIONSHIP',
      eventsName: firstEvent?.name || 'MONACO GRAND PRIX',
      sessionsName: firstSession?.name || 'QUALIFYING SESSION'
    }
  }
}

export default async function Page() {
  const data = await getHomeData()

  return (
    <main className="min-h-screen bg-black-pure">
      <VideoSection videoUrls={data.videoUrls} item={null} collection="home" />
      <HeroSlides slides={data.slides} />
      <HyperspeedSection navigation={data.navigation} />
      <LatestRaces races={data.races} />
      <TopDrivers drivers={data.drivers} />
    </main>
  )
}