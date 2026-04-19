import HyperspeedSection from './sections/Hyperspeed'
import LatestRaces from './sections/Races'
import HeroSlides from './sections/Slides'
import VideoSection from './sections/Video'

export const dynamic = 'force-dynamic'

async function safeFetch(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 0 } })
    if (!res.ok) return { docs: [], totalDocs: 0 }
    return await res.json()
  } catch (e) {
    return { docs: [], totalDocs: 0 }
  }
}

async function getHomeData() {
  const url = process.env.NEXT_PUBLIC_PAYLOAD_URL

  const [
    races,
    slides,
    sessions,
    events,
    seasons
  ] = await Promise.all([
    safeFetch(`${url}/api/races?sort=-createdAt&limit=10`),
    safeFetch(`${url}/api/slides?limit=10`),
    safeFetch(`${url}/api/sessions?sort=-createdAt&limit=10`),
    safeFetch(`${url}/api/events?sort=-createdAt&limit=10`),
    safeFetch(`${url}/api/seasons?sort=-createdAt&limit=10`),
  ])

  const extractVideoUrls = (items: any[]) => {
    const urls: string[] = []
    items.forEach(item => {
      const v = item.assets?.video || item.assets?.videos
      if (Array.isArray(v)) {
        v.forEach((vid: any) => {
          const videoUrl = typeof vid === 'object' ? vid?.url : vid
          if (typeof videoUrl === 'string') urls.push(videoUrl)
        })
      } else if (v) {
        const videoUrl = typeof v === 'object' ? v.url : v
        if (typeof videoUrl === 'string') urls.push(videoUrl)
      }
    })
    return urls
  }

  const allVideoUrls = extractVideoUrls([...races.docs, ...sessions.docs, ...events.docs])

  return {
    races: races.docs || [],
    slides: slides.docs || [],
    videoUrls: allVideoUrls,
    navigation: {
      series: 'global',
      seasons: seasons.docs[0]?.slug || '2026',
      events: events.docs[0]?.slug || 'grand-prix',
      sessions: sessions.docs[0]?.slug || 'qualifying'
    }
  }
}

export default async function Page() {
  const data = await getHomeData()

  return (
    <main className="min-h-screen bg-black-pure">
      <VideoSection videoUrls={data.videoUrls} />
      <HeroSlides slides={data.slides} />
      <HyperspeedSection navigation={data.navigation} />
      <LatestRaces races={data.races} />
    </main>
  )
}