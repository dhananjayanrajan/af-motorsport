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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
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
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        tagline: true,
                        description: true,
                    },
                    details: {
                        start_date: true,
                    },
                },
            }),
            payload.find({
                collection: 'races',
                where: {
                    'details.status': { equals: 'scheduled' },
                },
                limit: 12,
                sort: 'details.start_date',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        tagline: true,
                        identifiers: {
                            code: true,
                        },
                    },
                    assets: {
                        thumbnail: true,
                        poster: true,
                        cover: true,
                    },
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
            ? new Date(championship.details.start_date).toISOString().split('T')[0]
            : 'TBD',
        title: championship.name.toUpperCase(),
        description: championship.basics?.tagline || championship.basics?.description || undefined,
        status: 'upcoming' as const,
    }))

    const raceItems: any[] = races.map((race: Race) => {
        const imageUrl = resolveAssetUrl(race.assets, 'thumbnail', 'poster', 'cover') || ''

        return {
            id: String(race.id),
            title: race.name.toUpperCase(),
            subtitle: race.basics?.tagline || race.basics?.identifiers?.code || 'SCHEDULED_EVENT',
            image: imageUrl,
            href: `/calendar/races/${race.slug}`,
        }
    })

    return (
        <main className="w-full">
            <TimelineSection
                id="calendar-championships"
                title="CHAMPIONSHIPS"
                subtitle="Upcoming season cycles and series initialization dates"
                events={championshipEvents}
                labels={{
                    statusPrefix: 'STAT',
                    eventIndexLabel: 'SERIES',
                    deploymentStatus: {
                        completed: 'SYNCED',
                        active: 'ACTIVE',
                        upcoming: 'PENDING',
                    },
                }}
                orientation="horizontal"
                headerVariant={1}
                footerVariant={1}
            />
            {raceItems.length > 0 && (
                <GridSection
                    id="calendar-races"
                    title="OPERATIONS"
                    subtitle="Verified schedule of upcoming racing events and qualifications"
                    items={raceItems}
                    labels={{
                        unitsCount: 'RACES',
                        viewProject: 'DATA',
                        sectionIndex: 'RCE',
                        fallbackAlt: 'Race',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}