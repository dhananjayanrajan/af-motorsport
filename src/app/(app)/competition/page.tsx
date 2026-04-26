import GridSection from '@/components/Section/Blocks/GridSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import { Circuit, Event, Media, Season, Series, Session } from '@/payload-types'
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

const getCompetitionData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [seriesList, seasons, events, sessions, circuits] = await Promise.all([
            payload.find({
                collection: 'series',
                limit: 12,
                sort: '-createdAt',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        tagline: true,
                        identifiers: { abbreviation: true }
                    },
                    assets: {
                        thumbnail: true,
                        logo: true,
                        cover: true
                    },
                },
            }),
            payload.find({
                collection: 'seasons',
                limit: 20,
                sort: '-createdAt',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        tagline: true,
                        description: true,
                        identifiers: { code: true, abbreviation: true }
                    },
                    details: {
                        series: true
                    },
                },
            }),
            payload.find({
                collection: 'events',
                limit: 12,
                sort: 'details.start_date',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        tagline: true
                    },
                    assets: {
                        thumbnail: true,
                        poster: true,
                        cover: true
                    },
                },
            }),
            payload.find({
                collection: 'sessions',
                limit: 20,
                sort: '-createdAt',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        segment: true,
                        description: true,
                        identifiers: { code: true }
                    },
                    details: {
                        access: true
                    },
                },
            }),
            payload.find({
                collection: 'circuits',
                limit: 50,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        tagline: true,
                        identifiers: { abbreviation: true }
                    },
                    details: {
                        location: true,
                        address: true
                    },
                },
            }),
        ])

        return {
            seriesList: seriesList.docs as Series[],
            seasons: seasons.docs as Season[],
            events: events.docs as Event[],
            sessions: sessions.docs as Session[],
            circuits: circuits.docs as Circuit[],
        }
    },
    ['competition-page-data'],
    { revalidate: 3600, tags: ['competition'] }
)

export default async function CompetitionPage() {
    const { seriesList, seasons, events, sessions, circuits } = await getCompetitionData()

    const seriesItems: any[] = seriesList.map((series: Series) => {
        const imageUrl = resolveAssetUrl(series.assets, 'thumbnail', 'logo', 'cover') || ''

        return {
            id: String(series.id),
            title: series.name.toUpperCase(),
            subtitle: series.basics?.tagline || series.basics?.identifiers?.abbreviation || 'ACTIVE_SERIES',
            image: imageUrl,
            href: `/competition/series/${series.slug}`,
        }
    })

    const seasonEntries: any[] = seasons.map((season: Season) => ({
        id: String(season.id),
        title: season.name.toUpperCase(),
        subtitle: season.basics?.tagline || season.basics?.description || 'SEASON_CYCLE',
        status: (typeof season.details.series === 'object' && season.details.series && 'name' in season.details.series) ? (season.details.series.name as string).toUpperCase() : 'UNASSIGNED',
        tag: season.basics?.identifiers?.code || season.basics?.identifiers?.abbreviation || 'SEA_ID',
        href: `/competition/seasons/${season.slug}`,
    }))

    const eventItems: any[] = events.map((event: Event) => {
        const imageUrl = resolveAssetUrl(event.assets, 'thumbnail', 'poster', 'cover') || ''

        return {
            id: String(event.id),
            title: event.name.toUpperCase(),
            subtitle: event.basics?.tagline || 'SCHEDULED_EVENT',
            image: imageUrl,
            href: `/competition/events/${event.slug}`,
        }
    })

    const sessionEntries: any[] = sessions.map((session: Session) => ({
        id: String(session.id),
        title: session.name.toUpperCase(),
        subtitle: session.basics?.segment || session.basics?.description || 'SESSION_LOG',
        status: (session.details?.access || 'PUBLIC').toUpperCase(),
        tag: session.basics?.identifiers?.code || 'SES_ID',
        href: `/competition/sessions/${session.slug}`,
    }))

    const mapLocations: any[] = circuits
        .filter((circuit: Circuit) => circuit.details?.location)
        .map((circuit: Circuit) => ({
            id: String(circuit.id),
            name: circuit.name.toUpperCase(),
            lat: circuit.details?.location?.[0] || 0,
            lng: circuit.details?.location?.[1] || 0,
            description: circuit.basics?.tagline || circuit.basics?.identifiers?.abbreviation || 'CIRCUIT_HUB',
            address: circuit.details?.address || 'COORDINATES_ONLY',
        }))

    return (
        <main className="w-full">
            {seriesItems.length > 0 && (
                <GridSection
                    id="competition-series"
                    title="SERIES"
                    subtitle="Primary racing classifications and active series intelligence"
                    items={seriesItems}
                    labels={{
                        unitsCount: 'SERIES',
                        viewProject: 'DATA',
                        sectionIndex: 'SRS',
                        fallbackAlt: 'Series',
                    }}
                    columns={4}
                />
            )}
            {seasonEntries.length > 0 && (
                <ListSection
                    id="competition-seasons"
                    title="SEASONS"
                    subtitle="Historical and active championship season cycles"
                    entries={seasonEntries}
                    labels={{
                        statusPrefix: 'SERIES',
                        timePrefix: 'SYNC',
                        indexPrefix: 'SEA',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {eventItems.length > 0 && (
                <GridSection
                    id="competition-events"
                    title="EVENTS"
                    subtitle="Operational event meetings and documented race weekends"
                    items={eventItems}
                    labels={{
                        unitsCount: 'EVENTS',
                        viewProject: 'DATA',
                        sectionIndex: 'EVT',
                        fallbackAlt: 'Event',
                    }}
                    columns={3}
                />
            )}
            {sessionEntries.length > 0 && (
                <ListSection
                    id="competition-sessions"
                    title="SESSIONS"
                    subtitle="Telemetry logs for practice, qualifying, and race segments"
                    entries={sessionEntries}
                    labels={{
                        statusPrefix: 'ACCESS',
                        timePrefix: 'SYNC',
                        indexPrefix: 'SES',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="competition-circuits"
                    title="CIRCUITS"
                    subtitle="Global circuit deployment coordinates and facility data"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'HUB',
                        intelLabel: 'DATA',
                        routeLabel: 'SCAN',
                        timeLabel: 'TIME',
                        distLabel: 'KM',
                        recordLabel: 'VIEW',
                        filterLabels: {
                            all: 'GLOBAL',
                            primary: 'PRIMARY',
                            satellite: 'EXT',
                            pathing: 'GPS',
                        },
                    }}
                    zoom={2}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
        </main>
    )
}