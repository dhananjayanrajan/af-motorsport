// app/(frontend)/competition/sessions/[slug]/page.tsx
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

const getSessionData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'sessions',
            where: { slug: { equals: slug } },
            limit: 1,
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
    if (session.assets?.videos) {
        session.assets.videos.forEach((video, idx) => {
            const media = typeof video === 'object' ? video : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                videoSlides.push({
                    id: String(media.id),
                    title: media.alt || `Video ${idx + 1}`,
                    description: session.basics?.segment || undefined,
                    image: session.assets?.thumbnail ? getMediaUrl(session.assets.thumbnail) : `https://picsum.photos/seed/${session.slug}-${idx}/800/600`,
                    ctaLabel: 'Watch',
                    ctaHref: url,
                })
            }
        })
    }

    const scrollItems: any[] = []
    if (session.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Session History',
            description: session.basics?.description || 'Session background and context.',
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

    const heroBackgroundImage = session.assets?.thumbnail
        ? getMediaUrl(session.assets.thumbnail)
        : session.seo?.image
            ? getMediaUrl(session.seo.image)
            : undefined

    const specItems: any[] = [
        {
            id: 'segment',
            title: 'Segment',
            subtitle: session.basics?.segment || 'N/A',
        },
        {
            id: 'access',
            title: 'Access',
            subtitle: session.details?.access || 'N/A',
        },
        {
            id: 'code',
            title: 'Session Code',
            subtitle: session.basics?.identifiers?.code || 'N/A',
        },
        {
            id: 'laps',
            title: 'Laps',
            subtitle: session.metrics?.quantifiers?.laps ? String(session.metrics.quantifiers.laps) : 'N/A',
        },
        {
            id: 'distance',
            title: 'Distance',
            subtitle: session.metrics?.quantifiers?.distance ? `${session.metrics.quantifiers.distance} km` : 'N/A',
        },
        {
            id: 'duration',
            title: 'Duration',
            subtitle: session.metrics?.quantifiers?.duration ? `${session.metrics.quantifiers.duration} min` : 'N/A',
        },
    ]

    const entrySlides: any[] = []

    const galleryItems: any[] = []
    if (session.assets?.gallery) {
        session.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || session.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            {videoSlides.length > 0 && (
                <CarouselSection
                    id="session-videos"
                    title="Session Videos"
                    subtitle={session.name}
                    slides={videoSlides}
                    variant="full"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="session-history"
                    title="History & Notes"
                    subtitle="Session background"
                    items={scrollItems}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <HeroSection
                id="session-cover"
                title={session.name}
                subtitle={session.basics?.segment || ''}
                description={session.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={session.details?.access || undefined}
            />
            <GridSection
                id="session-specifications"
                title="Specifications"
                subtitle="Session details"
                items={specItems}
                columns={3}
                cardVariant={1}
                headerVariant={3}
                footerVariant={2}
            />
            {entrySlides.length > 0 && (
                <CarouselSection
                    id="session-entries"
                    title="Entries"
                    subtitle="Participating entries"
                    slides={entrySlides}
                    variant="card"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="session-gallery"
                    title="Gallery"
                    subtitle="Session imagery"
                    items={galleryItems}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}