import DirectoryGrid from '@/components/Section/DirectoryGrid'
import DirectoryList from '@/components/Section/DirectoryList'
import MapGrid from '@/components/Section/MapGrid'
import { Country, Media, Season, Series } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getCompetitionData() {
    const payload = await getPayload({ config: configPromise })

    const { docs: series } = await payload.find({
        collection: 'series',
        limit: 12,
        sort: '-createdAt',
    })

    const { docs: seasons } = await payload.find({
        collection: 'seasons',
        limit: 10,
        sort: '-createdAt',
    })

    const { docs: events } = await payload.find({
        collection: 'events',
        limit: 12,
        sort: '-details.start_date',
    })

    const { docs: sessions } = await payload.find({
        collection: 'sessions',
        limit: 10,
        sort: '-createdAt',
    })

    const { docs: circuits } = await payload.find({
        collection: 'circuits',
        limit: 20,
    })

    return { series, seasons, events, sessions, circuits }
}

export default async function CompetitionPage() {
    const { series, seasons, events, sessions, circuits } = await getCompetitionData()

    const seriesItems = series.map(s => {
        const thumbnail = s.assets?.thumbnail && typeof s.assets.thumbnail === 'object'
            ? s.assets.thumbnail as Media
            : null

        return {
            id: s.id.toString(),
            title: s.name,
            subtitle: s.basics?.tagline || undefined,
            label: s.basics?.identifiers?.code || 'SERIES',
            image: thumbnail,
            href: `/competition/series/${s.slug}`,
            metadata: [
                { label: 'STATUS', value: s.details?.status || 'Active' },
                { label: 'ACCESS', value: s.details?.access || 'Public' },
            ]
        }
    })

    const seasonItems = seasons.map(s => {
        const seriesName = s.details.series && typeof s.details.series === 'object'
            ? (s.details.series as Series).name
            : 'TBD'

        return {
            id: s.id.toString(),
            title: s.name,
            subtitle: seriesName,
            tag: s.basics?.identifiers?.code || 'SEASON',
            href: `/competition/seasons/${s.slug}`,
            timestamp: s.createdAt.split('T')[0],
            status: s.details.entries ? `${s.details.entries} ENTRIES` : undefined
        }
    })

    const eventItems = events.map(e => {
        const thumbnail = e.assets?.thumbnail && typeof e.assets.thumbnail === 'object'
            ? e.assets.thumbnail as Media
            : null

        const seasonName = e.details.season && typeof e.details.season === 'object'
            ? (e.details.season as Season).name
            : undefined

        return {
            id: e.id.toString(),
            title: e.name,
            subtitle: seasonName,
            label: e.basics?.identifiers?.code || 'EVENT',
            image: thumbnail,
            href: `/competition/events/${e.slug}`,
            metadata: [
                { label: 'STATUS', value: e.details.status || 'Scheduled' },
                { label: 'START', value: e.details.start_date?.split('T')[0] || 'TBD' },
            ]
        }
    })

    const sessionItems = sessions.map(s => {
        return {
            id: s.id.toString(),
            title: s.name,
            subtitle: s.basics?.segment || 'Session',
            tag: s.basics?.identifiers?.code || 'SESSION',
            href: `/competition/sessions/${s.slug}`,
            timestamp: s.createdAt.split('T')[0],
            status: s.details?.access?.toUpperCase() || 'PUBLIC'
        }
    })

    const circuitLocations = circuits.filter(c => c.details?.location).map(c => {
        const countryName = c.details?.country && typeof c.details.country === 'object'
            ? (c.details.country as Country).name
            : undefined

        return {
            id: c.id.toString(),
            title: c.name,
            lat: c.details!.location![1],
            lng: c.details!.location![0],
            label: c.basics?.identifiers?.code || 'CIRCUIT',
            metadata: [
                { label: 'TYPE', value: c.details?.type?.toUpperCase() || 'PERMANENT' },
                { label: 'LENGTH', value: c.details?.length_km ? `${c.details.length_km} KM` : 'TBD' },
                { label: 'COUNTRY', value: countryName || 'TBD' },
            ],
            category: c.details?.type?.toUpperCase() || 'CIRCUIT'
        }
    })

    return (
        <main className="w-full">
            <DirectoryGrid
                id="COMP_SERIES"
                title="Racing Series"
                items={seriesItems}
                variant="square"
            />

            <DirectoryList
                id="COMP_SEASONS"
                title="Championship Seasons"
                items={seasonItems}
            />

            <DirectoryGrid
                id="COMP_EVENTS"
                title="Race Events"
                items={eventItems}
                variant="landscape"
            />

            <DirectoryList
                id="COMP_SESSIONS"
                title="Practice & Qualifying Sessions"
                items={sessionItems}
            />

            {circuitLocations.length > 0 && (
                <MapGrid
                    id="COMP_CIRCUITS"
                    title="Circuit Locations"
                    locations={circuitLocations}
                    initialZoom={3}
                />
            )}
        </main>
    )
}