// app/(frontend)/calendar/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
import { Championship, Media, Race, Timeline } from '@/payload-types'
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

        const [championships, races, timelines] = await Promise.all([
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
                        identifiers: {
                            code: true,
                            abbreviation: true,
                        },
                        tagline: true,
                        description: true,
                    },
                    details: {
                        start_date: true,
                        end_date: true,
                        format: true,
                        standings_scope: true,
                    },
                    assets: {
                        thumbnail: true,
                        cover: true,
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
                        description: true,
                        identifiers: {
                            code: true,
                            abbreviation: true,
                        },
                    },
                    details: {
                        start_date: true,
                        type: true,
                        circuit: true,
                        weather: true,
                    },
                    assets: {
                        thumbnail: true,
                        poster: true,
                        cover: true,
                    },
                },
            }),
            payload.find({
                collection: 'timelines',
                where: {
                    'details.status': { equals: 'active' },
                },
                limit: 8,
                sort: 'details.start_date',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        description: true,
                    },
                    details: {
                        start_date: true,
                        end_date: true,
                        scope: true,
                        color_scheme: true,
                    },
                    assets: {
                        thumbnail: true,
                        cover: true,
                    },
                },
            }),
        ])

        return {
            championships: championships.docs as Championship[],
            races: races.docs as Race[],
            timelines: timelines.docs as Timeline[],
        }
    },
    ['calendar-page-data'],
    { revalidate: 3600, tags: ['calendar'] }
)

export default async function CalendarPage() {
    const { championships, races, timelines } = await getCalendarData()

    const championshipEvents = championships.map((championship: Championship) => {
        const code = championship.basics?.identifiers?.code || championship.basics?.identifiers?.abbreviation
        const startDate = championship.details?.start_date

        return {
            id: String(championship.id),
            date: startDate
                ? new Date(startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })
                : 'TBD',
            title: championship.name,
            description: championship.basics?.tagline || championship.basics?.description || undefined,
            status: 'upcoming' as const,
            slug: `calendar/championships/${championship.slug}`,
            code: code || undefined,
            format: championship.details?.format || undefined,
            image: resolveAssetUrl(championship.assets, 'thumbnail', 'cover'),
        }
    })

    const raceSlides = races.map((race: Race) => {
        const circuitRef = race.details?.circuit
        const circuitName =
            circuitRef && typeof circuitRef === 'object' && 'name' in circuitRef
                ? (circuitRef as any).name
                : undefined

        const code = race.basics?.identifiers?.code || race.basics?.identifiers?.abbreviation
        const raceType = race.details?.type

        const descriptionParts: string[] = []
        if (circuitName) descriptionParts.push(circuitName)
        if (raceType) descriptionParts.push(raceType.replace(/_/g, ' ').toUpperCase())
        if (race.details?.weather) descriptionParts.push(race.details.weather)

        const tags: string[] = []
        if (code) tags.push(code)
        if (raceType) tags.push(raceType.replace(/_/g, ' ').toUpperCase())

        const startDate = race.details?.start_date
        const meta = startDate
            ? new Date(startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            })
            : undefined

        return {
            id: String(race.id),
            title: race.name,
            description: descriptionParts.join(' · ') || race.basics?.tagline || race.basics?.description || undefined,
            image: resolveAssetUrl(race.assets, 'thumbnail', 'poster', 'cover'),
            ctaLabel: 'RACE DETAILS',
            ctaHref: `/calendar/races/${race.slug}`,
            meta,
            tags,
        }
    })

    const timelineEvents = timelines.map((timeline: Timeline) => {
        const startDate = timeline.details?.start_date
        const endDate = timeline.details?.end_date
        const dateStr = startDate
            ? new Date(startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
            })
            : 'TBD'

        return {
            id: String(timeline.id),
            date: dateStr,
            title: timeline.name,
            description: timeline.basics?.description || timeline.details?.scope || undefined,
            status: 'active' as const,
            slug: `calendar/timelines/${timeline.slug}`,
            image: resolveAssetUrl(timeline.assets, 'thumbnail', 'cover'),
        }
    })

    return (
        <main className="w-full">
            {championshipEvents.length > 0 && (
                <TimelineSection
                    id="calendar-championships"
                    title="CHAMPIONSHIPS"
                    subtitle="Upcoming season cycles and championship start dates"
                    events={championshipEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'CHAMPIONSHIP',
                        deploymentStatus: {
                            completed: 'CONCLUDED',
                            active: 'IN PROGRESS',
                            upcoming: 'UPCOMING',
                        },
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}

            {raceSlides.length > 0 && (
                <CarouselSection
                    id="calendar-races"
                    slides={raceSlides}
                    ctaLabel="ALL RACES"
                    ctaPath="/calendar/races"
                />
            )}

            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="calendar-timelines"
                    title="TIMELINES"
                    subtitle="Active event timelines and milestones in progress"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'TIMELINE',
                        deploymentStatus: {
                            completed: 'ARCHIVED',
                            active: 'ACTIVE',
                            upcoming: 'PLANNED',
                        },
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}