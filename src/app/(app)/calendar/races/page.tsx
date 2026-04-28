// app/(frontend)/calendar/races/page.tsx
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

const getRacesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const [upcoming, completed] = await Promise.all([
            payload.find({
                collection: 'races',
                where: { 'details.status': { equals: 'scheduled' } },
                limit: 12,
                depth: 1,
                sort: 'details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        identifiers: { code: true, abbreviation: true },
                    },
                    details: {
                        start_date: true,
                        type: true,
                        status: true,
                        event: true,
                        circuit: true,
                    },
                    assets: {
                        thumbnail: true,
                        cover: true,
                    },
                },
            }),
            payload.find({
                collection: 'races',
                where: { 'details.status': { equals: 'completed' } },
                limit: 24,
                depth: 1,
                sort: '-details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        identifiers: { code: true, abbreviation: true },
                    },
                    details: {
                        start_date: true,
                        status: true,
                        event: true,
                        circuit: true,
                        winner: true,
                        pole_position: true,
                        fastest_lap: true,
                    },
                    assets: {
                        thumbnail: true,
                        cover: true,
                    },
                },
            }),
        ])
        return { upcoming: upcoming.docs, completed: completed.docs }
    },
    ['races-page-data'],
    { revalidate: 60, tags: ['races'] }
)

export default async function RacesPage() {
    const { upcoming, completed } = await getRacesData()

    const upcomingEvents = upcoming.map((r) => ({
        id: String(r.id),
        date: r.details?.start_date || '',
        title: r.name,
        description:
            resolveName(r.details?.event) ||
            resolveName(r.details?.circuit) ||
            '',
        status: 'upcoming' as const,
        image: getMediaUrl(r.assets?.thumbnail),
        slug: `/calendar/races/${r.slug}`,
        code: r.basics?.identifiers?.code || r.basics?.identifiers?.abbreviation || undefined,
        format: r.details?.type || undefined,
    }))

    const completedGrid = completed.map((r) => {
        const winnerName = resolveName(r.details?.winner)
        const code = r.basics?.identifiers?.code || r.basics?.identifiers?.abbreviation || ''
        return {
            id: String(r.id),
            title: r.name,
            subtitle:
                resolveName(r.details?.event) ||
                resolveName(r.details?.circuit) ||
                winnerName ||
                '',
            image: getMediaUrl(r.assets?.thumbnail),
            href: `/calendar/races/${r.slug}`,
            category: code || r.details?.status || undefined,
        }
    })

    return (
        <main className="w-full">
            <HeroSection
                id="races-hero"
                title="RACES"
                subtitle="Every Start, Every Finish"
                description="Upcoming and completed races across all championships and circuits."
                badge="CALENDAR"
                meta="RACE_IDX"
            />
            {upcomingEvents.length > 0 && (
                <TimelineSection
                    id="races-upcoming"
                    title="UPCOMING RACES"
                    subtitle="On the calendar"
                    events={upcomingEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'RACE',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                />
            )}
            {completedGrid.length > 0 && (
                <GridSection
                    id="races-completed"
                    title="COMPLETED RACES"
                    subtitle="Results and highlights"
                    items={completedGrid}
                    labels={{
                        unitsCount: 'RACES',
                        viewProject: 'RESULTS',
                        sectionIndex: 'COMPLETED',
                        fallbackAlt: 'Race',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}