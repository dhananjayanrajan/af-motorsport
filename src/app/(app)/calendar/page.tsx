// app/(frontend)/calendar/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
import { Championship, Media, Race } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getCalendarData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const now = new Date().toISOString()

        const [championships, races] = await Promise.all([
            payload.find({
                collection: 'championships',
                where: {
                    'details.start_date': { greater_than_equal: now },
                },
                limit: 10,
                sort: 'details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                    updatedAt: true,
                    createdAt: true,
                },
            }),
            payload.find({
                collection: 'races',
                where: {
                    'details.status': { equals: 'scheduled' },
                },
                limit: 12,
                sort: 'details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                    updatedAt: true,
                    createdAt: true,
                },
            }),
        ])

        return {
            championships: championships.docs as Championship[],
            races: races.docs as Race[],
        }
    },
    ['calendar-page-data'],
    { revalidate: 3600, tags: ['calendar'] }
)

export default async function CalendarPage() {
    const { championships, races } = await getCalendarData()

    const championshipEvents: any[] = championships.map((championship: Championship) => ({
        id: String(championship.id),
        date: championship.details?.start_date
            ? new Date(championship.details.start_date).toLocaleDateString()
            : 'TBD',
        title: championship.name,
        description: championship.basics?.tagline || championship.basics?.description || undefined,
        status: 'upcoming' as const,
    }))

    const raceItems: any[] = races.map((race: Race) => {
        const imageUrl = race.assets?.thumbnail
            ? getMediaUrl(race.assets.thumbnail)
            : race.assets?.poster
                ? getMediaUrl(race.assets.poster)
                : race.assets?.cover
                    ? getMediaUrl(race.assets.cover)
                    : `https://picsum.photos/seed/${race.slug}/400/300`

        return {
            id: String(race.id),
            title: race.name,
            subtitle: race.basics?.tagline || race.basics?.identifiers?.code || undefined,
            image: imageUrl,
            href: `/calendar/races/${race.slug}`,
        }
    })

    return (
        <main className="w-full">
            <TimelineSection
                id="calendar-championships"
                title="Upcoming Championships"
                subtitle="Season schedules and series"
                events={championshipEvents}
                labels={{
                    statusPrefix: 'STAT',
                    eventIndexLabel: 'EVENT',
                    deploymentStatus: {
                        completed: 'DONE',
                        active: 'ACTIVE',
                        upcoming: 'UPCOMING',
                    },
                }}
                orientation="horizontal"
                headerVariant={1}
                footerVariant={1}
            />
            {raceItems.length > 0 && (
                <GridSection
                    id="calendar-races"
                    title="Upcoming Races"
                    subtitle="Scheduled events"
                    items={raceItems}
                    labels={{
                        unitsCount: 'RACES',
                        viewProject: 'VIEW',
                        sectionIndex: 'RCE',
                        fallbackAlt: 'Race',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}