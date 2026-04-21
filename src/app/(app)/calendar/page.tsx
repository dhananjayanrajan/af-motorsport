import DirectoryCarouselGrid from '@/components/Section/CarouselGrid'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getCalendarData() {
    const payload = await getPayload({ config: configPromise })

    const { docs: championships } = await payload.find({
        collection: 'championships',
        where: {
            'details.start_date': {
                exists: true,
            },
        },
        limit: 10,
        sort: '-details.start_date',
    })

    const { docs: races } = await payload.find({
        collection: 'races',
        where: {
            'details.status': {
                equals: 'scheduled',
            },
        },
        limit: 12,
        sort: '-details.start_date',
    })

    return { championships, races }
}

export default async function CalendarPage() {
    const { championships, races } = await getCalendarData()

    const championshipEvents = championships.map(champ => {
        let status: 'completed' | 'upcoming' | 'active' | undefined = 'upcoming'

        if (champ.details?.start_date && champ.details?.end_date) {
            const now = new Date()
            const start = new Date(champ.details.start_date)
            const end = new Date(champ.details.end_date)

            if (now >= start && now <= end) {
                status = 'active'
            } else if (now > end) {
                status = 'completed'
            }
        }

        return {
            id: champ.id.toString(),
            date: champ.details?.start_date || 'TBD',
            title: champ.name,
            description: champ.basics?.tagline || champ.basics?.description || undefined,
            status: status,
            meta: champ.basics?.identifiers?.code || 'CHAMPIONSHIP'
        }
    })

    const raceItems = races.map(race => {
        const thumbnail = race.assets?.thumbnail && typeof race.assets.thumbnail === 'object'
            ? race.assets.thumbnail as Media
            : null

        const circuitName = race.details?.circuit && typeof race.details.circuit === 'object'
            ? race.details.circuit.name
            : 'Circuit TBD'

        const seriesName = race.details?.series && typeof race.details.series === 'object'
            ? race.details.series.name
            : undefined

        return {
            id: race.id.toString(),
            title: race.name,
            subtitle: circuitName,
            label: race.details?.type?.toUpperCase() || 'RACE',
            image: thumbnail,
            href: `/calendar/races/${race.slug}`,
            details: [
                { label: 'STATUS', value: race.details?.status?.toUpperCase() || 'SCHEDULED' },
                { label: 'SERIES', value: seriesName || 'TBD' },
                { label: 'DATE', value: race.details?.start_date?.split('T')[0] || 'TBD' },
            ]
        }
    })

    return (
        <main className="w-full">
            <TimelineScroller
                id="CAL_CHAMPS"
                title="Upcoming Championships"
                events={championshipEvents}
            />

            <DirectoryCarouselGrid
                id="CAL_RACES"
                title="Upcoming Races"
                items={raceItems}
            />
        </main>
    )
}