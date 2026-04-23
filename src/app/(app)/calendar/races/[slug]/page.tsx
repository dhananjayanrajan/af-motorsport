// app/(frontend)/calendar/races/[slug]/page.tsx
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

const getRaceData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'races',
            where: { slug: { equals: slug } },
            limit: 1,
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
                title: race.name,
                description: race.basics?.tagline || undefined,
                url: videoUrl,
                poster: race.assets?.poster ? getMediaUrl(race.assets.poster) : race.assets?.thumbnail ? getMediaUrl(race.assets.thumbnail) : undefined,
            })
        }
    }

    const studyImage = race.assets?.cover
        ? getMediaUrl(race.assets.cover)
        : race.assets?.poster
            ? getMediaUrl(race.assets.poster)
            : race.assets?.thumbnail
                ? getMediaUrl(race.assets.thumbnail)
                : undefined

    const study = {
        id: String(race.id),
        title: race.name,
        description: race.basics?.description || race.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${race.slug}/800/600`,
        metrics: [
            { label: 'Type', value: race.details?.type || 'N/A' },
            { label: 'Status', value: race.details?.status || 'N/A' },
            { label: 'Laps', value: race.details?.laps ? String(race.details.laps) : 'N/A' },
            { label: 'Distance', value: race.details?.distance_km ? `${race.details.distance_km} km` : 'N/A' },
        ],
    }

    const scrollItems: any[] = []
    if (race.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Race History',
            description: race.basics?.description || 'A look back at this historic event.',
            percentage: 100,
        })
    }
    if (race.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'Race Notes',
            description: race.details.notes,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (race.assets?.gallery) {
        race.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || race.name,
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
                    title="Race Highlights"
                    subtitle={race.name}
                    videos={videoItems}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="race-details"
                title="Race Overview"
                subtitle="Event information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/calendar/races/${race.slug}/details`}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="race-history"
                    title="History & Notes"
                    subtitle="Race background"
                    items={scrollItems}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="race-gallery"
                    title="Gallery"
                    subtitle="Images from the event"
                    items={galleryItems}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}