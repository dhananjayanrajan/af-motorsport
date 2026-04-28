// app/(frontend)/opportunities/meetups/page.tsx
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

const getMeetupsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'meetups',
            limit: 24,
            depth: 1,
            sort: 'details.start_date',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                },
                details: {
                    format: true,
                    access: true,
                    start_date: true,
                    end_date: true,
                    locations: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['meetups-page-data'],
    { revalidate: 120, tags: ['meetups'] }
)

export default async function MeetupsPage() {
    const meetups = await getMeetupsData()

    const upcoming = meetups.filter(
        (m) => m.details?.start_date && new Date(m.details.start_date) >= new Date()
    )

    const timelineEvents = upcoming.map((m) => ({
        id: String(m.id),
        date: m.details?.start_date || '',
        title: m.name,
        description:
            m.basics?.description ||
            m.details?.format ||
            '',
        status: 'upcoming' as const,
        image: getMediaUrl(m.assets?.thumbnail),
        slug: `/opportunities/meetups/${m.slug}`,
        code: m.details?.format || undefined,
        format: m.details?.access || undefined,
    }))

    const allGrid = meetups.map((m) => ({
        id: String(m.id),
        title: m.name,
        subtitle:
            m.basics?.description ||
            m.details?.format ||
            '',
        image: getMediaUrl(m.assets?.thumbnail) || getMediaUrl(m.assets?.cover),
        href: `/opportunities/meetups/${m.slug}`,
        category: m.details?.access || m.details?.format || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="meetups-hero"
                title="MEETUPS"
                subtitle="Gatherings & Networking Events"
                description="In-person, virtual, and hybrid meetups across the motorsport community."
                badge="COMMUNITY"
                meta="MTU_IDX"
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="meetups-upcoming"
                    title="UPCOMING MEETUPS"
                    subtitle="On the calendar"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'MEETUP',
                        deploymentStatus: {
                            completed: 'PAST',
                            active: 'TODAY',
                            upcoming: 'UPCOMING',
                        },
                    }}
                />
            )}
            {allGrid.length > 0 && (
                <GridSection
                    id="meetups-all"
                    title="ALL MEETUPS"
                    subtitle="Complete archive"
                    items={allGrid}
                    labels={{
                        unitsCount: 'MEETUPS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'ARCHIVE',
                        fallbackAlt: 'Meetup',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}