import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
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

const getRaceData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'races',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    tagline: true,
                },
                assets: {
                    video: true,
                    poster: true,
                    thumbnail: true,
                    cover: true,
                    gallery: true,
                },
                details: {
                    type: true,
                    status: true,
                    laps: true,
                    distance_km: true,
                    history: true,
                    notes: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['race-detail'],
    { revalidate: 3600, tags: ['race'] }
)

export default async function RacePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const race = await getRaceData(slug)

    if (!race) notFound()

    const videoItems: any[] = []
    if (race.assets?.video) {
        const videoUrl = getMediaUrl(race.assets.video)
        if (videoUrl) {
            videoItems.push({
                id: String(race.id),
                title: race.name.toUpperCase(),
                description: race.basics?.tagline || undefined,
                url: videoUrl,
                poster: resolveAssetUrl(race.assets, 'poster', 'thumbnail', 'cover'),
            })
        }
    }

    const studyImage = resolveAssetUrl(race.assets, 'cover', 'poster', 'thumbnail')

    const study = {
        id: String(race.id),
        title: race.name,
        description: race.basics?.description || race.basics?.tagline || '',
        image: studyImage || '',
        metrics: [
            { label: 'TYPE', value: race.details?.type || 'N/A' },
            { label: 'STATUS', value: race.details?.status || 'N/A' },
            { label: 'LAPS', value: race.details?.laps ? String(race.details.laps) : 'N/A' },
            { label: 'DISTANCE', value: race.details?.distance_km ? `${race.details.distance_km} KM` : 'N/A' },
        ],
    }

    const scrollItems: any[] = []
    if (race.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'CHRONOLOGY',
            description: 'Comprehensive archival data documenting the historical progression of this event.',
            percentage: 100,
        })
    }
    if (race.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'INTELLIGENCE',
            description: race.details.notes,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (race.assets?.gallery && Array.isArray(race.assets.gallery)) {
        race.assets.gallery.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                galleryItems.push({
                    id: String(typeof item === 'object' ? item.id : idx),
                    title: (typeof item === 'object' && item.alt) || race.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="race-video"
                    title="BROADCAST"
                    subtitle="Visual telemetry and operational highlight feeds"
                    videos={videoItems}
                    labels={{
                        channelPrefix: 'CH',
                        broadcastStatus: 'REC',
                        liveFeed: 'LIVE',
                        metaTransmission: 'ENC',
                    }}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="race-details"
                title="SPECIFICATIONS"
                subtitle="Technical event data and race-day parameters"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="VIEW FULL PARAMETERS"
                ctaPath={`/calendar/races/${race.slug}/details`}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="race-history"
                    title="ARCHIVE"
                    subtitle="Background intelligence and event logs"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'LOG',
                        progressLabel: 'DATA',
                        statusComplete: 'SYNC',
                    }}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="race-gallery"
                    title="MEDIA"
                    subtitle="Documented visual intelligence from the circuit"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'TYPE',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}