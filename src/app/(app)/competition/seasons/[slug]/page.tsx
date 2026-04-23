// app/(frontend)/competition/seasons/[slug]/page.tsx
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

const getSeasonData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'seasons',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['season-detail'],
    { revalidate: 3600, tags: ['season'] }
)

export default async function SeasonPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const season = await getSeasonData(slug)

    if (!season) notFound()

    const videoItems: any[] = []
    if (season.assets?.trailer) {
        const videoUrl = getMediaUrl(season.assets.trailer)
        if (videoUrl) {
            videoItems.push({
                id: String(season.id),
                title: season.name,
                description: season.basics?.tagline || undefined,
                url: videoUrl,
                poster: season.assets?.cover ? getMediaUrl(season.assets.cover) : undefined,
            })
        }
    }

    const studyImage = season.assets?.cover
        ? getMediaUrl(season.assets.cover)
        : season.seo?.image
            ? getMediaUrl(season.seo.image)
            : undefined

    const study = {
        id: String(season.id),
        title: season.name,
        description: season.basics?.description || season.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${season.slug}/800/600`,
        metrics: [
            { label: 'Entries', value: season.details?.entries ? String(season.details.entries) : 'N/A' },
            { label: 'Races', value: season.details?.races ? String(season.details.races) : 'N/A' },
            { label: 'Series', value: typeof season.details.series === 'object' && 'name' in season.details.series ? season.details.series.name : 'N/A' },
        ],
    }

    const scrollItems: any[] = []
    if (season.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Season History',
            description: season.basics?.description || 'A remarkable season of competition.',
            percentage: 100,
        })
    }
    if (season.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'Season Notes',
            description: season.details.notes,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (season.assets?.gallery) {
        season.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || season.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }
    if (galleryItems.length === 0 && season.assets?.cover) {
        const url = getMediaUrl(season.assets.cover)
        if (url) {
            galleryItems.push({
                id: String(season.id),
                title: season.name,
                image: url,
                height: 'medium' as const,
            })
        }
    }

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="season-video"
                    title="Season Trailer"
                    subtitle={season.name}
                    videos={videoItems}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="season-details"
                title="Season Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/competition/seasons/${season.slug}/details`}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="season-history"
                    title="History & Notes"
                    subtitle="Season background"
                    items={scrollItems}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="season-gallery"
                    title="Gallery"
                    subtitle="Season highlights"
                    items={galleryItems}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}