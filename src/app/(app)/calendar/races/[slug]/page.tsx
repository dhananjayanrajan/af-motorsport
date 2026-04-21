import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Circuit, Driver, Entry, Media, Race } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getRace(slug: string): Promise<Race | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'races',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function RacePage({ params }: PageProps) {
    const { slug } = await params
    const race = await getRace(slug)

    if (!race) {
        return notFound()
    }

    const videoAsset = race.assets?.video && typeof race.assets.video === 'object'
        ? (race.assets.video as Media)
        : null

    const posterAsset = race.assets?.poster && typeof race.assets.poster === 'object'
        ? (race.assets.poster as Media)
        : null

    const circuitName = race.details.circuit && typeof race.details.circuit === 'object'
        ? (race.details.circuit as Circuit).name
        : 'TBD'

    const seriesName = race.details.series && typeof race.details.series === 'object'
        ? (race.details.series as { name: string }).name
        : 'TBD'

    const winnerName = race.details.winner && typeof race.details.winner === 'object'
        ? `${(race.details.winner as Driver).first_name} ${(race.details.winner as Driver).last_name}`
        : 'TBD'

    const infoBlocks = [
        {
            id: 'race-info',
            label: 'RACE DETAILS',
            title: race.details.type?.toUpperCase() || 'FEATURE RACE',
            description: race.basics?.description || undefined,
            metadata: [
                { key: 'STATUS', value: race.details.status?.toUpperCase() || 'SCHEDULED' },
                { key: 'CIRCUIT', value: circuitName },
                { key: 'SERIES', value: seriesName },
                { key: 'LAPS', value: race.details.laps?.toString() || 'TBD' },
                { key: 'DISTANCE', value: race.details.distance_km ? `${race.details.distance_km} KM` : 'TBD' },
            ]
        },
        {
            id: 'schedule',
            label: 'SCHEDULE',
            title: race.details.start_date ? 'RACE DAY' : 'DATES TBD',
            description: 'Event timeline',
            metadata: [
                { key: 'START DATE', value: race.details.start_date?.split('T')[0] || 'TBD' },
                { key: 'END DATE', value: race.details.end_date?.split('T')[0] || 'TBD' },
            ]
        },
    ]

    const historySteps = []

    if (race.details.winner && typeof race.details.winner === 'object') {
        historySteps.push({
            id: 'winner',
            index: '01',
            heading: 'Race Winner',
            subheading: winnerName,
            body: race.details.notes || 'Victory achieved',
            percentage: 100
        })
    }

    if (race.details.fastest_lap && typeof race.details.fastest_lap === 'object') {
        const fastestLapEntry = race.details.fastest_lap as Entry
        historySteps.push({
            id: 'fastest-lap',
            index: '02',
            heading: 'Fastest Lap',
            subheading: fastestLapEntry.name || 'Driver',
            body: race.details.fastest_lap_time || 'Time TBD',
            percentage: 100
        })
    }

    if (race.details.pole_position && typeof race.details.pole_position === 'object') {
        const poleEntry = race.details.pole_position as Entry
        historySteps.push({
            id: 'pole',
            index: '03',
            heading: 'Pole Position',
            subheading: poleEntry.name || 'Driver',
            body: 'Qualifying leader',
            percentage: 100
        })
    }

    const galleryItems = race.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: race.details.type?.toUpperCase() || 'RACE'
    })) || []

    return (
        <main className="w-full">
            <VideoPlayer
                id={race.basics?.identifiers?.code || `RCE-${race.id}`}
                title={race.name}
                meta={race.basics?.tagline || 'Race'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    race.details.type || 'Race',
                    race.details.status || 'Scheduled'
                ]}
            />

            <InfoGrid
                id="RCE_SPECS"
                title="Race Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="RCE_HISTORY"
                    title="Race Highlights"
                    steps={historySteps}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="RCE_GALLERY"
                    title="Race Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/calendar/races/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Technical Details →
                </Link>
            </section>
        </main>
    )
}