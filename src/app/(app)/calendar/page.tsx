import CarouselSection from '@/components/Section/Blocks/CarouselSection'
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

    const championshipEvents = championships.map((championship: Championship) => {
        const code = championship.basics?.identifiers?.code || championship.basics?.identifiers?.abbreviation
        const startDate = championship.details?.start_date

        return {
            id: `champ-${championship.id}`,
            date: startDate
                ? new Date(startDate).toISOString().split('T')[0]
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
            ? new Date(startDate).toISOString().split('T')[0]
            : undefined

        return {
            id: `race-${race.id}`,
            title: race.name,
            description: descriptionParts.join(' · ') || race.basics?.tagline || race.basics?.description || undefined,
            image: resolveAssetUrl(race.assets, 'thumbnail', 'poster', 'cover'),
            ctaLabel: 'RACE DETAILS',
            ctaHref: `/calendar/races/${race.slug}`,
            meta,
            tags,
        }
    })

    return (
        <main className="w-full">
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

            <CarouselSection
                id="calendar-races"
                slides={raceSlides}
                ctaLabel="ALL RACES"
                ctaPath="/calendar/races"
                itemsToScroll={2}
            />
        </main>
    )
}