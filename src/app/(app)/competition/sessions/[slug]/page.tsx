import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
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

const getSessionData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'sessions',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    segment: true,
                    description: true,
                    identifiers: { code: true }
                },
                assets: {
                    videos: true,
                    thumbnail: true,
                    gallery: true
                },
                details: {
                    history: true,
                    notes: true,
                    access: true
                },
                metrics: {
                    quantifiers: {
                        laps: true,
                        distance: true,
                        duration: true
                    }
                },
                seo: {
                    image: true
                }
            }
        })
        return result.docs[0] || null
    },
    ['session-detail'],
    { revalidate: 3600, tags: ['session'] }
)

export default async function SessionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const session = await getSessionData(slug)

    if (!session) notFound()

    const videoSlides: any[] = []
    if (session.assets?.videos && Array.isArray(session.assets.videos)) {
        session.assets.videos.forEach((video, idx) => {
            const url = getMediaUrl(video)
            if (url) {
                videoSlides.push({
                    id: String(typeof video === 'object' ? video.id : idx),
                    title: (typeof video === 'object' && video.alt) || 'Session Highlight',
                    description: session.basics?.segment || 'Live track action',
                    image: resolveAssetUrl(session.assets, 'thumbnail') || '',
                    ctaLabel: 'Watch Clip',
                    ctaHref: url,
                })
            }
        })
    }

    const scrollItems: any[] = []
    if (session.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Track History',
            description: 'Chronological record of the racing session and past performance benchmarks.',
            percentage: 100,
        })
    }
    if (session.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'Session Notes',
            description: session.details.notes,
            percentage: 75,
        })
    }

    const heroBackgroundImage = resolveAssetUrl(session.assets, 'thumbnail') || getMediaUrl(session.seo?.image)

    const specItems: any[] = [
        {
            id: 'segment',
            title: 'Session Type',
            subtitle: session.basics?.segment || 'N/A',
        },
        {
            id: 'access',
            title: 'Entry Type',
            subtitle: session.details?.access || 'N/A',
        },
        {
            id: 'code',
            title: 'Session ID',
            subtitle: session.basics?.identifiers?.code || 'N/A',
        },
        {
            id: 'laps',
            title: 'Lap Count',
            subtitle: session.metrics?.quantifiers?.laps ? String(session.metrics.quantifiers.laps) : 'N/A',
        },
        {
            id: 'distance',
            title: 'Total Distance',
            subtitle: session.metrics?.quantifiers?.distance ? `${session.metrics.quantifiers.distance} km` : 'N/A',
        },
        {
            id: 'duration',
            title: 'Time Duration',
            subtitle: session.metrics?.quantifiers?.duration ? `${session.metrics.quantifiers.duration} min` : 'N/A',
        },
    ]

    const entrySlides: any[] = []

    const galleryItems: any[] = []
    if (session.assets?.gallery && Array.isArray(session.assets.gallery)) {
        session.assets.gallery.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                galleryItems.push({
                    id: String(typeof item === 'object' ? item.id : idx),
                    title: (typeof item === 'object' && item.alt) || session.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full bg-black-pure">
            {videoSlides.length > 0 && (
                <CarouselSection
                    id="session-videos"
                    slides={videoSlides}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="session-history"
                    title="Archive"
                    subtitle="Background information and session reports"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'Log',
                        progressLabel: 'Read',
                        statusComplete: 'Done',
                    }}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <HeroSection
                id="session-cover"
                title={session.name}
                subtitle="Competition Session"
                description={session.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={session.details?.access || 'Open'}
            />
            <GridSection
                id="session-specifications"
                title="Performance Data"
                subtitle="Session metrics and official identifiers"
                items={specItems}
                labels={{
                    unitsCount: 'Stats',
                    viewProject: 'Info',
                    sectionIndex: 'Spec',
                    fallbackAlt: 'Data',
                }}
                columns={3}
            />
            {entrySlides.length > 0 && (
                <CarouselSection
                    id="session-entries"
                    slides={entrySlides}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="session-gallery"
                    title="Gallery"
                    subtitle="Trackside photography and session highlights"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'Type',
                        idPrefix: 'Photo',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}