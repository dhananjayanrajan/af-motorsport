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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getCircuitData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'circuits',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                    description: true,
                },
                assets: {
                    video: true,
                    cover: true,
                    thumbnail: true,
                    gallery: true,
                },
                details: {
                    type: true,
                    length_km: true,
                    length_miles: true,
                    turns: true,
                    drs_zones: true,
                    fia_grade: true,
                    elevation_change: true,
                    capacity: true,
                    opened: true,
                    history: true,
                },
                metrics: {
                    record_lap_time: true,
                    record_lap_year: true,
                },
                seo: {
                    image: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['circuit-page'],
    { revalidate: 3600, tags: ['circuit'] }
)

export default async function CircuitPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const circuit = await getCircuitData(slug)

    if (!circuit) notFound()

    const videoUrl = getMediaUrl(circuit.assets?.video)
    const posterUrl = resolveAssetUrl(circuit.assets, 'thumbnail', 'cover')
    const videos = videoUrl
        ? [
            {
                id: String(circuit.id),
                title: circuit.name,
                url: videoUrl,
                poster: posterUrl || undefined,
            },
        ]
        : []

    const studyImage = posterUrl || getMediaUrl(circuit.seo?.image) || ''

    const study = studyImage
        ? {
            id: String(circuit.id),
            title: circuit.name,
            description: circuit.basics?.tagline || circuit.basics?.description || '',
            image: studyImage,
            metrics: [
                { label: 'TYPE', value: circuit.details?.type || 'N/A' },
                { label: 'LENGTH', value: circuit.details?.length_km ? `${circuit.details.length_km} KM` : 'N/A' },
                { label: 'TURNS', value: circuit.details?.turns ? String(circuit.details.turns) : 'N/A' },
                { label: 'FIA GRADE', value: circuit.details?.fia_grade || 'N/A' },
                { label: 'CAPACITY', value: circuit.details?.capacity ? circuit.details.capacity.toLocaleString() : 'N/A' },
                { label: 'LAP RECORD', value: circuit.metrics?.record_lap_time || 'N/A' },
            ],
        }
        : null

    const quoteItem = circuit.basics?.tagline
        ? {
            id: String(circuit.id),
            text: circuit.basics.tagline,
            author: circuit.name,
        }
        : null

    const historyDescription = typeof circuit.details?.history === 'string'
        ? circuit.details.history
        : circuit.basics?.description || ''

    const historyItems: any[] = []
    if (historyDescription) {
        historyItems.push({
            id: 'circuit-history',
            title: 'ORIGINS',
            description: historyDescription,
            percentage: 100,
        })
    }

    const galleryItems: any[] = []
    if (circuit.assets?.gallery && Array.isArray(circuit.assets.gallery)) {
        circuit.assets.gallery.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                galleryItems.push({
                    id: String(typeof item === 'object' ? item.id : idx),
                    title: (typeof item === 'object' && item.alt) || circuit.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    if (galleryItems.length === 0) {
        const fallback = posterUrl || getMediaUrl(circuit.seo?.image)
        if (fallback) {
            galleryItems.push({
                id: String(circuit.id),
                title: circuit.name,
                image: fallback,
                height: 'medium' as const,
            })
        }
    }

    return (
        <main className="w-full">
            {videos.length > 0 && (
                <VideoSection
                    id="circuit-video"
                    title="ONBOARD"
                    subtitle="High‑speed reconnaissance"
                    videos={videos}
                    labels={{
                        channelPrefix: 'CIRCUIT',
                        broadcastStatus: 'LIVE FEED',
                        liveFeed: 'ACTIVE',
                        metaTransmission: 'CLOSE',
                    }}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {study && (
                <StudySection
                    id="circuit-details"
                    title="SPECIFICATIONS"
                    subtitle="Technical facility telemetry"
                    studies={[study]}
                    variant="featured"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {quoteItem && (
                <QuoteSection
                    id="circuit-statement"
                    title="IDENTITY"
                    subtitle="Circuit character statement"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'SYS',
                        ratingLabel: 'RANK',
                    }}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {historyItems.length > 0 && (
                <ScrollSection
                    id="circuit-history"
                    title="ARCHIVE"
                    subtitle="Documented heritage and evolution"
                    items={historyItems}
                    labels={{
                        indexPrefix: 'LOG',
                        progressLabel: 'DATA',
                        statusComplete: 'SYNC',
                    }}
                    variant="reveal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="circuit-gallery"
                    title="VISUALS"
                    subtitle="Environmental documentation"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'TYPE',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}