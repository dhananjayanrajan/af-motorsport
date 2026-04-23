// app/(frontend)/about/hospitalities/[slug]/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
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

const getHospitalityData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'hospitalities',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['hospitality-detail'],
    { revalidate: 3600, tags: ['hospitality'] }
)

export default async function HospitalityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const hospitality = await getHospitalityData(slug)

    if (!hospitality) notFound()

    const coverActions = [
        { label: 'View Details', href: `/about/hospitalities/${hospitality.slug}/details`, variant: 'primary' as const },
    ]

    const heroBackgroundImage = hospitality.assets?.cover
        ? getMediaUrl(hospitality.assets.cover)
        : hospitality.seo?.image
            ? getMediaUrl(hospitality.seo.image)
            : undefined

    const studyImage = hospitality.assets?.cover
        ? getMediaUrl(hospitality.assets.cover)
        : hospitality.assets?.thumbnail
            ? getMediaUrl(hospitality.assets.thumbnail)
            : undefined

    const study = {
        id: String(hospitality.id),
        title: hospitality.name,
        description: hospitality.basics?.description || hospitality.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${hospitality.slug}/800/600`,
        metrics: [
            { label: 'Status', value: hospitality.details?.status || 'N/A' },
            { label: 'Access', value: hospitality.details?.access || 'N/A' },
            { label: 'Capacity', value: hospitality.details?.capacity ? String(hospitality.details.capacity) : 'N/A' },
            { label: 'Price', value: hospitality.details?.price_per_guest ? `$${hospitality.details.price_per_guest}` : 'N/A' },
        ],
    }

    const quoteItem = hospitality.basics?.tagline
        ? {
            id: String(hospitality.id),
            text: hospitality.basics.tagline,
            author: hospitality.name,
        }
        : null

    const scrollItems: any[] = []
    if (hospitality.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Our History',
            description: 'A legacy of premium hospitality experiences in motorsport.',
            percentage: 100,
        })
    }

    const timelineEvents: any[] = []
    if (hospitality.details?.start_date) {
        timelineEvents.push({
            id: 'start',
            date: new Date(hospitality.details.start_date).toLocaleDateString(),
            title: 'Experience Begins',
            description: 'Hospitality opening date',
            status: 'upcoming' as const,
        })
    }
    if (hospitality.details?.end_date) {
        timelineEvents.push({
            id: 'end',
            date: new Date(hospitality.details.end_date).toLocaleDateString(),
            title: 'Experience Concludes',
            description: 'Final day of hospitality',
            status: 'upcoming' as const,
        })
    }

    const galleryItems: any[] = []
    if (hospitality.assets?.gallery) {
        hospitality.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || hospitality.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }
    if (galleryItems.length === 0 && hospitality.assets?.cover) {
        const url = getMediaUrl(hospitality.assets.cover)
        if (url) {
            galleryItems.push({
                id: String(hospitality.id),
                title: hospitality.name,
                image: url,
                height: 'medium' as const,
            })
        }
    }

    return (
        <main className="w-full">
            <HeroSection
                id="hospitality-cover"
                title={hospitality.name}
                subtitle={hospitality.basics?.tagline || ''}
                description={hospitality.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={coverActions}
                alignment="center"
                badge={hospitality.details?.type || undefined}
            />
            <StudySection
                id="hospitality-details"
                title="Experience Details"
                subtitle="What to expect"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {quoteItem && (
                <QuoteSection
                    id="hospitality-quote"
                    title="Experience"
                    subtitle="Premium hospitality"
                    quotes={[quoteItem]}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="hospitality-history"
                    title="Heritage"
                    subtitle="Our hospitality legacy"
                    items={scrollItems}
                    variant="reveal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="hospitality-timeline"
                    title="Schedule"
                    subtitle="Key dates"
                    events={timelineEvents}
                    orientation="horizontal"
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="hospitality-gallery"
                    title="Gallery"
                    subtitle="Glimpses of the experience"
                    items={galleryItems}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}