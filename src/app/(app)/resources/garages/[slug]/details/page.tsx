// app/(app)/resources/garages/[slug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import TabSection from '@/components/Section/Blocks/TabSection'
import TextRevealSection from '@/components/Section/Blocks/TextRevealSection'
import TimelineSection, { TimelineEvent } from '@/components/Section/Blocks/TimelineSection'
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

const getGarageDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'garages',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                details: {
                    history: true,
                    amenities: { list: true },
                    start_date: true,
                    end_date: true,
                    location: true,
                    notes: true,
                },
                assets: { documents: true },
            },
        })
        return result.docs[0] || null
    },
    ['garage-details-full'],
    { revalidate: 3600, tags: ['garage-details'] }
)

export default async function GarageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const garage = await getGarageDetailsData(slug)

    if (!garage) notFound()

    const studyData = garage.details?.history
        ? [{ id: String(garage.id), title: garage.name, description: '', image: `https://picsum.photos/seed/${garage.slug}/800/600`, metrics: [] }]
        : []

    const tabItems = (garage.details?.amenities?.list || []).map((amenity) => ({
        id: amenity.id || `amenity-${Math.random()}`,
        label: amenity.name || 'Amenity',
        content: amenity.description || '',
    }))

    const timelineEvents: TimelineEvent[] = []
    if (garage.details?.start_date) {
        timelineEvents.push({
            id: `start-${garage.id}`,
            date: garage.details.start_date,
            title: 'Facility Opened',
            status: 'completed' as const,
            code: 'OPEN',
            format: 'Milestone',
        })
    }
    if (garage.details?.end_date) {
        timelineEvents.push({
            id: `end-${garage.id}`,
            date: garage.details.end_date,
            title: 'Facility Closed',
            status: 'completed' as const,
            code: 'CLOSE',
            format: 'Milestone',
        })
    }

    const mapLocations: any[] = []
    if (garage.details?.location && Array.isArray(garage.details.location) && garage.details.location.length === 2) {
        mapLocations.push({
            id: String(garage.id),
            name: garage.name,
            lat: garage.details.location[1],
            lng: garage.details.location[0],
            type: 'primary' as const,
        })
    }

    const documentsList = (garage.assets?.documents || []).map((doc) => {
        const media = typeof doc === 'object' ? doc : null
        return {
            id: `doc-${media?.id || Math.random()}`,
            title: media?.alt || media?.filename || 'Document',
            filename: media?.filename ?? null,
            mimeType: media?.mimeType ?? null,
            filesize: media?.filesize ?? null,
            url: media?.url ?? null,
            updatedAt: media?.updatedAt ?? null,
        }
    })

    return (
        <main className="w-full">
            {studyData.length > 0 && (
                <StudySection id="garage-details-history" title="History" subtitle="Facility usage and evolution" studies={studyData} variant="featured" headerVariant={1} footerVariant={1} />
            )}
            {tabItems.length > 0 && (
                <TabSection id="garage-details-amenities" title="Amenities" subtitle="Tools, hospitality, and tech" tabs={tabItems} labels={{ channelPrefix: 'AMN', statusActive: 'ACTIVE' }} variant="underline" headerVariant={1} footerVariant={1} />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection id="garage-details-timeline" title="Operational Timeline" subtitle="Key dates" events={timelineEvents} labels={{ statusPrefix: 'STATUS', eventIndexLabel: 'EVT', deploymentStatus: { completed: 'COMPLETED', active: 'ACTIVE', upcoming: 'UPCOMING' } }} headerVariant={1} footerVariant={1} />
            )}
            {mapLocations.length > 0 && (
                <MapSection id="garage-details-location" title="Site Location" subtitle="Focused facility view" locations={mapLocations} labels={{ hqLabel: 'SITE', intelLabel: 'INTEL', routeLabel: 'ROUTE', timeLabel: 'TIME', distLabel: 'DIST', recordLabel: 'REC', filterLabels: { all: 'ALL', primary: 'SITE', satellite: 'SURROUNDING', pathing: 'PATHING' } }} headerVariant={1} footerVariant={1} />
            )}
            {garage.details?.notes && (
                <TextRevealSection id="garage-details-notes" title={garage.name} subtitle="Operational Notes" content={garage.details.notes} />
            )}
            {documentsList.length > 0 && (
                <DocumentsSection id="garage-details-documents" title="Documents" subtitle="Floor plans and certificates" documents={documentsList} referenceCode={garage.slug ?? undefined} headerVariant={1} footerVariant={1} />
            )}
        </main>
    )
}