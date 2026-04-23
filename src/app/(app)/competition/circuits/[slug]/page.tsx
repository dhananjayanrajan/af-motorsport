// app/(frontend)/competition/circuits/[slug]/page.tsx
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
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

const getCircuitData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'circuits',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['circuit-detail'],
    { revalidate: 3600, tags: ['circuit'] }
)

export default async function CircuitPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const circuit = await getCircuitData(slug)

    if (!circuit) notFound()

    const videoItems: any[] = []
    if (circuit.assets?.video) {
        const videoUrl = getMediaUrl(circuit.assets.video)
        if (videoUrl) {
            videoItems.push({
                id: String(circuit.id),
                title: circuit.name,
                description: circuit.basics?.tagline || undefined,
                url: videoUrl,
                poster: circuit.assets?.thumbnail ? getMediaUrl(circuit.assets.thumbnail) : circuit.assets?.cover ? getMediaUrl(circuit.assets.cover) : undefined,
            })
        }
    }

    const studyImage = circuit.assets?.cover
        ? getMediaUrl(circuit.assets.cover)
        : circuit.assets?.thumbnail
            ? getMediaUrl(circuit.assets.thumbnail)
            : circuit.assets?.circuit_map
                ? getMediaUrl(circuit.assets.circuit_map)
                : undefined

    const study = {
        id: String(circuit.id),
        title: circuit.name,
        description: circuit.basics?.description || circuit.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${circuit.slug}/800/600`,
        metrics: [
            { label: 'Type', value: circuit.details?.type || 'N/A' },
            { label: 'Length', value: circuit.details?.length_km ? `${circuit.details.length_km} km` : 'N/A' },
            { label: 'Turns', value: circuit.details?.turns ? String(circuit.details.turns) : 'N/A' },
            { label: 'Direction', value: circuit.details?.direction || 'N/A' },
        ],
    }

    const quoteItem = circuit.basics?.tagline
        ? {
            id: String(circuit.id),
            text: circuit.basics.tagline,
            author: circuit.name,
        }
        : null

    const scrollItems: any[] = []
    if (circuit.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Circuit History',
            description: circuit.basics?.description || 'A historic racing venue.',
            percentage: 100,
        })
    }
    if (circuit.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'Circuit Notes',
            description: circuit.details.notes,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (circuit.assets?.gallery) {
        circuit.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || circuit.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }
    if (galleryItems.length === 0 && circuit.assets?.cover) {
        const url = getMediaUrl(circuit.assets.cover)
        if (url) {
            galleryItems.push({
                id: String(circuit.id),
                title: circuit.name,
                image: url,
                height: 'medium' as const,
            })
        }
    }

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="circuit-video"
                    title="Circuit Video"
                    subtitle={circuit.name}
                    videos={videoItems}
                    labels={{
                        channelPrefix: 'CH',
                        broadcastStatus: 'LIVE',
                        liveFeed: 'FEED',
                        metaTransmission: 'TRANS',
                    }}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="circuit-details"
                title="Circuit Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/competition/circuits/${circuit.slug}/details`}
            />
            {quoteItem && (
                <QuoteSection
                    id="circuit-statement"
                    title="Circuit Statement"
                    subtitle="What defines this track"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'COMM',
                        ratingLabel: 'RATING',
                    }}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="circuit-history"
                    title="History & Notes"
                    subtitle="Circuit background"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'SEC',
                        progressLabel: 'PROG',
                        statusComplete: 'DONE',
                    }}
                    variant="reveal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="circuit-gallery"
                    title="Gallery"
                    subtitle="Circuit imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
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