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

const getTimelineData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'timelines',
            where: { slug: { equals: slug } },
            limit: 1,
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

    const heroBackgroundImage = timeline.assets?.cover
        ? getMediaUrl(timeline.assets.cover)
        : timeline.seo?.image
            ? getMediaUrl(timeline.seo.image)
            : undefined

    const studyImage = timeline.assets?.cover
        ? getMediaUrl(timeline.assets.cover)
        : timeline.assets?.thumbnail
            ? getMediaUrl(timeline.assets.thumbnail)
            : undefined

    const study = {
        id: String(timeline.id),
        title: timeline.name,
        description: timeline.basics?.description || '',
        image: studyImage || `https://picsum.photos/seed/${timeline.slug}/800/600`,
        metrics: [
            { label: 'Status', value: timeline.details?.status || 'N/A' },
            { label: 'Scope', value: timeline.details?.scope || 'N/A' },
            { label: 'Start', value: timeline.details?.start_date ? new Date(timeline.details.start_date).toLocaleDateString() : 'N/A' },
            { label: 'End', value: timeline.details?.end_date ? new Date(timeline.details.end_date).toLocaleDateString() : 'N/A' },
        ],
    }

    const milestoneEvents: any[] = []
    if (timeline.traits?.milestones?.list) {
        timeline.traits.milestones.list.forEach((milestone, idx) => {
            if (milestone.name) {
                milestoneEvents.push({
                    id: milestone.id || `milestone-${idx}`,
                    date: milestone.date ? new Date(milestone.date).toLocaleDateString() : 'TBD',
                    title: milestone.name,
                    description: milestone.description || undefined,
                    status: idx === 0 ? 'completed' as const : idx === 1 ? 'active' as const : 'upcoming' as const,
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
                    title: event.name,
                    subtitle: event.date ? new Date(event.date).toLocaleDateString() : undefined,
                    image: `https://picsum.photos/seed/${event.name}/400/300`,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (timeline.assets?.documents) {
        timeline.assets.documents.forEach((doc, idx) => {
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
                id="timeline-cover"
                title={timeline.name}
                subtitle={timeline.details?.scope || ''}
                description={timeline.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={timeline.details?.status || undefined}
            />
            <StudySection
                id="timeline-details"
                title="Overview"
                subtitle="Timeline information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {milestoneEvents.length > 0 && (
                <TimelineSection
                    id="timeline-milestones"
                    title="Milestones"
                    subtitle="Key achievements along the way"
                    events={milestoneEvents}
                    orientation={timeline.details?.orientation === 'vertical' ? 'vertical' : 'horizontal'}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {eventItems.length > 0 && (
                <GridSection
                    id="timeline-events"
                    title="Events"
                    subtitle="Notable moments"
                    items={eventItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="timeline-documents"
                    title="Documents"
                    subtitle="Related resources"
                    items={documentItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}