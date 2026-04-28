// app/(frontend)/competition/events/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

function resolveName(obj: any): string {
    if (!obj) return ''
    if (typeof obj === 'object' && 'name' in obj) return obj.name
    return ''
}

const getEventsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const [upcoming, all] = await Promise.all([
            payload.find({
                collection: 'events',
                where: {
                    or: [
                        { 'details.status': { equals: 'Scheduled' } },
                        { 'details.status': { equals: 'Confirmed' } },
                    ],
                },
                limit: 12,
                depth: 1,
                sort: 'details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true, identifiers: { code: true } },
                    details: {
                        start_date: true,
                        end_date: true,
                        status: true,
                        season: true,
                        location: true,
                    },
                    assets: { thumbnail: true, cover: true },
                },
            }),
            payload.find({
                collection: 'events',
                limit: 24,
                depth: 1,
                sort: '-details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true, identifiers: { code: true } },
                    details: {
                        start_date: true,
                        end_date: true,
                        status: true,
                        season: true,
                    },
                    assets: { thumbnail: true, cover: true },
                },
            }),
        ])
        return { upcoming: upcoming.docs, all: all.docs }
    },
    ['events-page-data'],
    { revalidate: 60, tags: ['events'] }
)

export default async function EventsPage() {
    const { upcoming, all } = await getEventsData()

    const upcomingEvents = upcoming.map((e) => ({
        id: String(e.id),
        date: e.details?.start_date || '',
        title: e.name,
        description: resolveName(e.details?.season) || '',
        status: (
            e.details?.status === 'Confirmed' ? 'active' : 'upcoming'
        ) as 'active' | 'upcoming',
        image: getMediaUrl(e.assets?.thumbnail),
        slug: `/competition/events/${e.slug}`,
        code: e.basics?.identifiers?.code || undefined,
        format: e.details?.status || undefined,
    }))

    const allEvents = all.map((e) => ({
        id: String(e.id),
        title: e.name,
        subtitle:
            resolveName(e.details?.season) ||
            e.basics?.tagline ||
            '',
        image: getMediaUrl(e.assets?.thumbnail),
        href: `/competition/events/${e.slug}`,
        category: e.details?.status || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="events-hero"
                title="EVENTS"
                subtitle="Race Weekends & Grands Prix"
                description="Every event on the calendar — from season openers to championship finales."
                badge="SCHEDULE"
                meta="EVT_IDX"
            />
            {upcomingEvents.length > 0 && (
                <TimelineSection
                    id="events-upcoming"
                    title="UPCOMING EVENTS"
                    subtitle="On the schedule"
                    events={upcomingEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'EVENT',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'CONFIRMED',
                            upcoming: 'SCHEDULED',
                        },
                    }}
                />
            )}
            {allEvents.length > 0 && (
                <GridSection
                    id="events-all"
                    title="ALL EVENTS"
                    subtitle="Complete event archive"
                    items={allEvents}
                    labels={{
                        unitsCount: 'EVENTS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'ARCHIVE',
                        fallbackAlt: 'Event',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}