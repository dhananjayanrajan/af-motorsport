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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getSeriesDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'series',
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
                    cover: true,
                    documents: true,
                },
                details: {
                    status: true,
                    start_date: true,
                    end_date: true,
                    location: true,
                },
                seo: {
                    image: true,
                },
            },
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

    const heroBackgroundImage = resolveAssetUrl(series.assets, 'cover') || getMediaUrl(series.seo?.image)

    const timelineEvents: any[] = []
    if (series.details?.start_date) {
        timelineEvents.push({
            id: 'start',
            date: new Date(series.details.start_date).toISOString().split('T')[0],
            title: 'Series Founded',
            description: 'The official start of the competition series and its inaugural racing season.',
            status: 'completed' as const,
            slug: `competition/series/${slug}`,
        })
    }
    if (series.details?.end_date) {
        timelineEvents.push({
            id: 'end',
            date: new Date(series.details.end_date).toISOString().split('T')[0],
            title: 'Series Conclusion',
            description: 'The date marking the final events and completion of the series cycle.',
            status: 'completed' as const,
            slug: `competition/series/${slug}`,
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
            description: series.basics?.tagline || 'Official location',
            slug: `competition/series/${slug}`,
        })
    }

    const documentItems: any[] = []
    if (series.assets?.documents && Array.isArray(series.assets.documents)) {
        series.assets.documents.forEach((doc, idx) => {
            const url = getMediaUrl(doc)
            if (url) {
                documentItems.push({
                    id: String(typeof doc === 'object' ? doc.id : idx),
                    title: (typeof doc === 'object' && (doc.alt || doc.filename)) || 'Official Document',
                    subtitle: (typeof doc === 'object' && doc.mimeType) || 'PDF File',
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full bg-black-pure">
            <HeroSection
                id="series-details-cover"
                title={series.name}
                subtitle="Competition Details"
                description={series.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={series.details?.status || 'Active'}
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="series-timeline"
                    title="Timeline"
                    subtitle="Major milestones and dates"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'Status',
                        eventIndexLabel: 'Event',
                        deploymentStatus: {
                            completed: 'Finished',
                            active: 'In Progress',
                            upcoming: 'Next',
                        },
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {seasonItems.length > 0 && (
                <GridSection
                    id="series-seasons"
                    title="Seasons"
                    subtitle="Championship racing seasons"
                    items={seasonItems}
                    labels={{
                        unitsCount: 'Seasons',
                        viewProject: 'Details',
                        sectionIndex: 'Cycle',
                        fallbackAlt: 'Season',
                    }}
                    columns={3}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="series-map"
                    title="Headquarters"
                    subtitle="Main operational location"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'Office',
                        intelLabel: 'Info',
                        routeLabel: 'Directions',
                        timeLabel: 'Local Time',
                        distLabel: 'Distance',
                        recordLabel: 'View Map',
                        filterLabels: {
                            all: 'All',
                            primary: 'Standard',
                            satellite: 'Satellite',
                            pathing: 'Routes',
                        },
                    }}
                    zoom={12}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="series-documents"
                    title="Documents"
                    subtitle="Official files and documentation"
                    items={documentItems}
                    labels={{
                        unitsCount: 'Files',
                        viewProject: 'Open',
                        sectionIndex: 'File',
                        fallbackAlt: 'Document',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}