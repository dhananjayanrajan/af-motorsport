// app/(frontend)/calendar/timelines/[slug]/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getTimelineData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'timelines',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                },
                assets: {
                    cover: true,
                    thumbnail: true,
                    documents: true,
                },
                details: {
                    status: true,
                    scope: true,
                    start_date: true,
                    end_date: true,
                    orientation: true,
                },
                traits: {
                    milestones: {
                        list: true,
                    },
                    events: {
                        list: true,
                    },
                },
                seo: {
                    image: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['timeline-detail'],
    { revalidate: 3600, tags: ['timeline'] }
)

export default async function TimelinePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const timeline = await getTimelineData(slug)

    if (!timeline) notFound()

    const heroBackgroundImage = resolveAssetUrl(timeline.assets, 'cover') || getMediaUrl(timeline.seo?.image)
    const studyImage = resolveAssetUrl(timeline.assets, 'cover', 'thumbnail')

    const study = {
        id: String(timeline.id),
        title: timeline.name,
        description: timeline.basics?.description || '',
        image: studyImage || '',
        metrics: [
            { label: 'STATUS', value: timeline.details?.status || 'N/A' },
            { label: 'SCOPE', value: timeline.details?.scope || 'N/A' },
            { label: 'INITIALIZED', value: timeline.details?.start_date ? new Date(timeline.details.start_date).toISOString().split('T')[0] : 'N/A' },
            { label: 'TERMINATED', value: timeline.details?.end_date ? new Date(timeline.details.end_date).toISOString().split('T')[0] : 'N/A' },
        ],
    }

    const milestoneEvents: any[] = []
    if (timeline.traits?.milestones?.list) {
        timeline.traits.milestones.list.forEach((milestone, idx) => {
            if (milestone.name) {
                milestoneEvents.push({
                    id: milestone.id || `milestone-${idx}`,
                    date: milestone.date ? new Date(milestone.date).toISOString().split('T')[0] : 'TBD',
                    title: milestone.name.toUpperCase(),
                    description: milestone.description || undefined,
                    status: idx === 0 ? 'completed' as const : idx === 1 ? 'active' as const : 'upcoming' as const,
                    slug: `calendar/timelines/${slug}`,
                })
            }
        })
    }

    const eventItems: any[] = []
    if (timeline.traits?.events?.list) {
        timeline.traits.events.list.forEach((event) => {
            if (event.name) {
                eventItems.push({
                    id: event.id || String(Math.random()),
                    title: event.name.toUpperCase(),
                    subtitle: event.date ? new Date(event.date).toISOString().split('T')[0] : undefined,
                    image: '',
                })
            }
        })
    }

    const documentItems: any[] = []
    if (timeline.assets?.documents && Array.isArray(timeline.assets.documents)) {
        timeline.assets.documents.forEach((doc, idx) => {
            const url = getMediaUrl(doc)
            if (url) {
                documentItems.push({
                    id: (typeof doc === 'object' && doc.id) ? String(doc.id) : `doc-${idx}`,
                    title: (typeof doc === 'object' && (doc.alt || doc.filename)) || `DOC_${idx + 1}`,
                    subtitle: (typeof doc === 'object' && doc.mimeType) || 'APPLICATION/PDF',
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="timeline-cover"
                title={timeline.name}
                subtitle={timeline.details?.scope || 'CHRONOLOGY_SYSTEM'}
                description={timeline.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={timeline.details?.status || 'ACTIVE'}
            />
            <StudySection
                id="timeline-details"
                title="SPECIFICATIONS"
                subtitle="Operational chronology and mapping parameters"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {milestoneEvents.length > 0 && (
                <TimelineSection
                    id="timeline-milestones"
                    title="CHRONOLOGY"
                    subtitle="Strategic progress mapping and milestone tracking"
                    events={milestoneEvents}
                    labels={{
                        statusPrefix: 'STAT',
                        eventIndexLabel: 'STEP',
                        deploymentStatus: {
                            completed: 'SYNCED',
                            active: 'ACTIVE',
                            upcoming: 'PENDING',
                        },
                    }}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {eventItems.length > 0 && (
                <GridSection
                    id="timeline-events"
                    title="OPERATIONS"
                    subtitle="Documented historical occurrences and notable events"
                    items={eventItems}
                    labels={{
                        unitsCount: 'EVENTS',
                        viewProject: 'DATA',
                        sectionIndex: 'EVT',
                        fallbackAlt: 'Event',
                    }}
                    columns={3}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="timeline-documents"
                    title="ARCHIVE"
                    subtitle="Technical resources and supporting documentation"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'FETCH',
                        sectionIndex: 'DAT',
                        fallbackAlt: 'File',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}