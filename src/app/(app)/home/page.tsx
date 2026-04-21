import CardCarousel from '@/components/Section/CardCarousel'
import ImageCarousel from '@/components/Section/ImageCarousel'
import Podium from '@/components/Section/Podium'
import VideoCarousel from '@/components/Section/VideoCarousel'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getHomeData() {
  const payload = await getPayload({ config: configPromise })

  const { docs: videos } = await payload.find({
    collection: 'media',
    where: {
      mimeType: {
        contains: 'video',
      },
    },
    limit: 5,
    sort: '-createdAt',
  })

  const { docs: slides } = await payload.find({
    collection: 'media',
    where: {
      mimeType: {
        contains: 'image',
      },
    },
    limit: 10,
    sort: '-createdAt',
  })

  const { docs: series } = await payload.find({
    collection: 'series',
    limit: 6,
    sort: '-createdAt',
  })

  const { docs: races } = await payload.find({
    collection: 'races',
    where: {
      'details.status': {
        equals: 'completed',
      },
    },
    limit: 3,
    sort: '-details.start_date',
  })

  const { docs: drivers } = await payload.find({
    collection: 'drivers',
    limit: 3,
    sort: '-createdAt',
  })

  return { videos, slides, series, races, drivers }
}

export default async function HomePage() {
  const { videos, slides, series, races, drivers } = await getHomeData()

  const videoSlides = videos.map(video => ({
    id: video.id.toString(),
    title: video.filename || 'Video',
    meta: video.mimeType?.split('/')[1]?.toUpperCase() || 'MEDIA',
    video: video,
    poster: video.thumbnailURL ? { url: video.thumbnailURL } as Media : video,
  }))

  const imageSlides = slides.map(slide => ({
    id: slide.id.toString(),
    title: slide.filename || 'Image',
    meta: slide.mimeType?.split('/')[1]?.toUpperCase() || 'IMAGE',
    image: slide,
  }))

  const seriesCards = series.map(s => ({
    id: s.id.toString(),
    title: s.name,
    category: s.details?.status || 'Series',
    label: s.basics?.identifiers?.code || 'SERIES',
    href: `/competition/series/${s.slug}`,
    image: s.assets?.thumbnail && typeof s.assets.thumbnail === 'object' ? s.assets.thumbnail : null,
  }))

  const podiumEntries = races.map((race, index) => {
    const rank = index === 0 ? 'P01' : index === 1 ? 'P02' : 'P03'
    return {
      id: race.id.toString(),
      firstName: race.name.split(' ')[0] || race.name,
      lastName: race.name.split(' ').slice(1).join(' ') || 'Race',
      rank: rank as 'P01' | 'P02' | 'P03',
      points: race.details?.laps?.toString() || '00',
      team: race.details?.circuit && typeof race.details.circuit === 'object' ? race.details.circuit.name : 'Circuit',
    }
  })

  const driverPodium = drivers.map((driver, index) => {
    const rank = index === 0 ? 'P01' : index === 1 ? 'P02' : 'P03'
    return {
      id: driver.id.toString(),
      firstName: driver.first_name,
      lastName: driver.last_name,
      rank: rank as 'P01' | 'P02' | 'P03',
      points: driver.basics?.racing_number?.toString() || '00',
      team: driver.basics?.nationality && typeof driver.basics.nationality === 'object' ? driver.basics.nationality.name : 'Driver',
      image: driver.assets?.avatar && typeof driver.assets.avatar === 'object' ? driver.assets.avatar : null,
    }
  })

  return (
    <main className="w-full">
      <VideoCarousel slides={videoSlides} sectionTitle="LIVE_MEDIA_FEED" />
      <ImageCarousel slides={imageSlides} sectionTitle="STATIC_ASSETS" />
      <CardCarousel cards={seriesCards} sectionTitle="COMPETITION_SERIES" />
      <Podium id="RACE_RESULTS" title="LATEST_RACES" entries={podiumEntries} />
      <Podium id="DRIVER_RANKINGS" title="TOP_DRIVERS" entries={driverPodium} />
    </main>
  )
}