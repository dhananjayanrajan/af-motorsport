import DirectoryCarouselGrid from '@/components/Section/CarouselGrid'
import DocumentGrid from '@/components/Section/DocumentGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Media, Timeline } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getTimeline(slug: string): Promise<Timeline | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'timelines',
        where: {
            slug: {
                equals: slug,
            },
        },
    })
    return docs[0] || null
}

export default async function TimelinePage({ params }: PageProps) {
    const { slug } = await params
    const timeline = await getTimeline(slug)

    if (!timeline) {
        return notFound()
    }

    const coverImage = timeline.assets?.cover && typeof timeline.assets.cover === 'object'
        ? (timeline.assets.cover as Media)
        : null

    const infoBlocks = [
        {
            id: 'scope',
            label: 'SCOPE',
            title: timeline.details?.scope?.toUpperCase() || 'PROJECT',
            description: timeline.basics?.description || undefined,
            metadata: [
                { key: 'STATUS', value: timeline.details?.status?.toUpperCase() || 'DRAFT' },
                { key: 'ORIENTATION', value: timeline.details?.orientation?.toUpperCase() || 'HORIZONTAL' },
                { key: 'COLOR SCHEME', value: timeline.details?.color_scheme?.toUpperCase() || 'LIGHT' },
            ]
        },
        {
            id: 'timeframe',
            label: 'TIMEFRAME',
            title: timeline.details?.start_date ? 'ACTIVE' : 'PENDING',
            description: 'Chronological window',
            metadata: [
                { key: 'START DATE', value: timeline.details?.start_date || 'TBD' },
                { key: 'END DATE', value: timeline.details?.end_date || 'TBD' },
            ]
        },
    ]

    const milestoneEvents = timeline.traits?.milestones?.list?.map(milestone => {
        let status: 'completed' | 'upcoming' | 'active' | undefined = undefined

        if (milestone.date && timeline.details?.end_date) {
            status = new Date(milestone.date) <= new Date(timeline.details.end_date) ? 'completed' : 'upcoming'
        }

        return {
            id: milestone.id || `${timeline.id}-${milestone.name}`,
            date: milestone.date || 'TBD',
            title: milestone.name || 'Milestone',
            description: milestone.description || undefined,
            status: status,
            meta: 'MILESTONE'
        }
    }) || []

    const eventItems = timeline.traits?.events?.list?.map(event => ({
        id: event.id || `${timeline.id}-event-${event.name}`,
        title: event.name || 'Event',
        subtitle: event.description || undefined,
        label: 'TIMELINE EVENT',
        details: [
            { label: 'DATE', value: event.date || 'TBD' },
            { label: 'LOCATION', value: event.location ? `${event.location[1]}, ${event.location[0]}` : 'TBD' },
        ]
    })) || []

    const documents = timeline.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Timeline Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={`TML-${timeline.id}`}
                title={timeline.name}
                meta={timeline.basics?.description || 'Historical Timeline'}
                image={coverImage}
                tags={[
                    timeline.details?.scope || 'Timeline',
                    timeline.details?.status || 'Draft'
                ]}
            />

            <InfoGrid
                id="TML_SPECS"
                title="Timeline Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {milestoneEvents.length > 0 && (
                <TimelineScroller
                    id="TML_MILESTONES"
                    title="Key Milestones"
                    events={milestoneEvents}
                />
            )}

            {eventItems.length > 0 && (
                <DirectoryCarouselGrid
                    id="TML_EVENTS"
                    title="Timeline Events"
                    items={eventItems}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="TML_DOCS"
                    title="Supporting Documents"
                    documents={documents}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/calendar/timelines/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Full Details →
                </Link>
            </section>
        </main>
    )
}