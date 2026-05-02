// app/(frontend)/competition/sessions/[slug]/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import TextRevealSection from '@/components/Section/Blocks/TextRevealSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { Activity, Clock, Flag, Gauge, Hash, Shield } from 'lucide-react'
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
                    access: true,
                    specification: true,
                },
                metrics: {
                    quantifiers: {
                        laps: true,
                        distance: true,
                        duration: true,
                        interval: true,
                        specification: true,
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

    const heroBackgroundImage = resolveAssetUrl(session.assets, 'thumbnail') || getMediaUrl(session.seo?.image)

    const infoCards: any[] = [
        {
            id: 'segment',
            label: 'Session Type',
            value: session.basics?.segment || 'N/A',
            icon: <Flag size={16} />,
            emphasis: 'high' as const,
        },
        {
            id: 'access',
            label: 'Access Level',
            value: session.details?.access || 'N/A',
            icon: <Shield size={16} />,
            emphasis: 'medium' as const,
        },
        {
            id: 'code',
            label: 'Session Code',
            value: session.basics?.identifiers?.code || 'N/A',
            icon: <Hash size={16} />,
            emphasis: 'low' as const,
        },
        {
            id: 'laps',
            label: 'Total Laps',
            value: session.metrics?.quantifiers?.laps ? String(session.metrics.quantifiers.laps) : 'N/A',
            icon: <Activity size={16} />,
            emphasis: 'high' as const,
        },
        {
            id: 'distance',
            label: 'Distance',
            value: session.metrics?.quantifiers?.distance ? `${session.metrics.quantifiers.distance} KM` : 'N/A',
            icon: <Gauge size={16} />,
            emphasis: 'medium' as const,
        },
        {
            id: 'duration',
            label: 'Duration',
            value: session.metrics?.quantifiers?.duration ? `${session.metrics.quantifiers.duration} MIN` : 'N/A',
            icon: <Clock size={16} />,
            emphasis: 'high' as const,
        },
    ]

    if (session.metrics?.quantifiers?.interval) {
        infoCards.push({
            id: 'interval',
            label: 'Timing Interval',
            value: session.metrics.quantifiers.interval.toString(),
            icon: <Activity size={16} />,
            emphasis: 'low' as const,
        })
    }

    if (session.metrics?.quantifiers?.specification) {
        infoCards.push({
            id: 'metric-spec',
            label: 'Metric Spec',
            value: session.metrics.quantifiers.specification,
            icon: <Gauge size={16} />,
            emphasis: 'low' as const,
        })
    }

    const videoSlides: any[] = []
    if (session.assets?.videos && Array.isArray(session.assets.videos)) {
        session.assets.videos.forEach((video, idx) => {
            const url = getMediaUrl(video)
            if (url) {
                videoSlides.push({
                    id: String(typeof video === 'object' ? video.id : idx),
                    title: (typeof video === 'object' && video.alt) || session.name,
                    description: session.basics?.segment || undefined,
                    image: resolveAssetUrl(session.assets, 'thumbnail') || '',
                    ctaLabel: undefined,
                    ctaHref: undefined,
                })
            }
        })
    }

    const scrollItems: any[] = []
    if (session.details?.history) {
        scrollItems.push({
            id: 'history',
            title: session.name,
            description: typeof session.details.history === 'object' && 'root' in session.details.history
                ? 'Session history archive available in details view.'
                : 'Chronological record of the racing session and past performance benchmarks.',
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
        <main className="w-full">
            <HeroSection
                id="session-cover"
                title={session.name}
                subtitle={session.basics?.segment || 'Competition Session'}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={session.details?.access || undefined}
                actions={[
                    {
                        label: 'VIEW DETAILS',
                        href: `/competition/sessions/${session.slug}/details`,
                        variant: 'primary' as const,
                    },
                ]}
            />
            <InfoSection
                id="session-metrics"
                title="METRICS"
                subtitle="Session statistics and parameters"
                cards={infoCards}
                columns={4}
                headerVariant={1}
                footerVariant={1}
            />
            {session.basics?.description && (
                <TextRevealSection
                    id="session-description"
                    title="OVERVIEW"
                    subtitle={session.name}
                    content={session.basics.description}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {session.details?.specification && (
                <TextRevealSection
                    id="session-specification"
                    title="SPECIFICATION"
                    subtitle={session.name}
                    content={session.details.specification}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {videoSlides.length > 0 && (
                <CarouselSection
                    id="session-videos"
                    slides={videoSlides}
                    autoplayDelay={5000}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="session-history"
                    title="ARCHIVE"
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
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="session-gallery"
                    title="GALLERY"
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