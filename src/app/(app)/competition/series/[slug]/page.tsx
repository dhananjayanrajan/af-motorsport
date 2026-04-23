// app/(frontend)/competition/series/[slug]/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
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

const getSeriesData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'series',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['series-detail'],
    { revalidate: 3600, tags: ['series'] }
)

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const series = await getSeriesData(slug)

    if (!series) notFound()

    const heroBackgroundImage = series.assets?.cover
        ? getMediaUrl(series.assets.cover)
        : series.seo?.image
            ? getMediaUrl(series.seo.image)
            : undefined

    const heroActions = [
        { label: 'View Details', href: `/competition/series/${series.slug}/details`, variant: 'primary' as const },
    ]

    const studyImage = series.assets?.cover
        ? getMediaUrl(series.assets.cover)
        : series.assets?.logo
            ? getMediaUrl(series.assets.logo)
            : series.assets?.thumbnail
                ? getMediaUrl(series.assets.thumbnail)
                : undefined

    const study = {
        id: String(series.id),
        title: series.name,
        description: series.basics?.description || series.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${series.slug}/800/600`,
        metrics: [
            { label: 'Status', value: series.details?.status || 'N/A' },
            { label: 'Access', value: series.details?.access || 'N/A' },
            { label: 'Start', value: series.details?.start_date ? new Date(series.details.start_date).toLocaleDateString() : 'N/A' },
            { label: 'End', value: series.details?.end_date ? new Date(series.details.end_date).toLocaleDateString() : 'N/A' },
        ],
    }

    const scrollItems: any[] = []
    if (series.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Series History',
            description: series.basics?.description || 'A legacy of racing excellence.',
            percentage: 100,
        })
    }
    if (series.details?.agenda) {
        scrollItems.push({
            id: 'agenda',
            title: 'Agenda',
            description: series.details.agenda,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (series.assets?.cover) {
        const url = getMediaUrl(series.assets.cover)
        if (url) {
            galleryItems.push({
                id: `cover-${series.id}`,
                title: series.name,
                image: url,
                height: 'tall' as const,
            })
        }
    }
    if (series.assets?.logo) {
        const url = getMediaUrl(series.assets.logo)
        if (url) {
            galleryItems.push({
                id: `logo-${series.id}`,
                title: `${series.name} Logo`,
                image: url,
                height: 'short' as const,
            })
        }
    }

    return (
        <main className="w-full">
            <HeroSection
                id="series-hero"
                title={series.name}
                subtitle={series.basics?.tagline || ''}
                description={series.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={heroActions}
                alignment="center"
                badge={series.basics?.identifiers?.abbreviation || series.basics?.identifiers?.code || undefined}
            />
            <StudySection
                id="series-details"
                title="Series Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="series-history"
                    title="History & Agenda"
                    subtitle="The story of this series"
                    items={scrollItems}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="series-gallery"
                    title="Gallery"
                    subtitle="Series imagery"
                    items={galleryItems}
                    columns={2}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}