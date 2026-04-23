// app/(frontend)/competition/series/[slug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MapSection from '@/components/Section/Blocks/MapSection'
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

const getSeriesDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'series',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['series-details'],
    { revalidate: 3600, tags: ['series-details'] }
)

export default async function SeriesDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const series = await getSeriesDetailsData(slug)

    if (!series) notFound()

    const heroBackgroundImage = series.assets?.cover
        ? getMediaUrl(series.assets.cover)
        : series.seo?.image
            ? getMediaUrl(series.seo.image)
            : undefined

    const timelineEvents: any[] = []
    if (series.details?.start_date) {
        timelineEvents.push({
            id: 'start',
            date: new Date(series.details.start_date).toLocaleDateString(),
            title: 'Series Founded',
            description: 'Series inception and first season',
            status: 'completed' as const,
        })
    }
    if (series.details?.end_date) {
        timelineEvents.push({
            id: 'end',
            date: new Date(series.details.end_date).toLocaleDateString(),
            title: 'Series Conclusion',
            description: 'Final season completed',
            status: 'completed' as const,
        })
    }

    const seasonItems: any[] = []

    const mapLocations: any[] = []
    if (series.details?.location) {
        mapLocations.push({
            id: String(series.id),
            name: series.name,
            lat: series.details.location[0],
            lng: series.details.location[1],
            description: series.basics?.tagline || undefined,
        })
    }

    const documentItems: any[] = []
    if (series.assets?.documents) {
        series.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                documentItems.push({
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    subtitle: media.mimeType || undefined,
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="series-details-cover"
                title={series.name}
                subtitle="Series Specifications"
                description={series.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={series.details?.status || undefined}
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="series-timeline"
                    title="Timeline"
                    subtitle="Key series dates"
                    events={timelineEvents}
                    orientation="horizontal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {seasonItems.length > 0 && (
                <GridSection
                    id="series-seasons"
                    title="Seasons"
                    subtitle="Championship seasons"
                    items={seasonItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="series-map"
                    title="Location"
                    subtitle="Series headquarters"
                    locations={mapLocations}
                    zoom={12}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="series-documents"
                    title="Documents"
                    subtitle="Series documentation"
                    items={documentItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}