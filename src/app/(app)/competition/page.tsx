// app/(frontend)/competition/page.tsx
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

const getCompetitionData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [seriesList, seasons, events, sessions, circuits] = await Promise.all([
            payload.find({
                collection: 'series',
                limit: 12,
                sort: '-createdAt',
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
                collection: 'seasons',
                limit: 20,
                sort: '-createdAt',
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
                collection: 'events',
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
            payload.find({
                collection: 'sessions',
                limit: 20,
                sort: '-createdAt',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    metrics: true,
                    assets: true,
                    updatedAt: true,
                    createdAt: true,
                },
            }),
            payload.find({
                collection: 'circuits',
                limit: 50,
                sort: 'name',
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
        const imageUrl = series.assets?.thumbnail
            ? getMediaUrl(series.assets.thumbnail)
            : series.assets?.logo
                ? getMediaUrl(series.assets.logo)
                : series.assets?.cover
                    ? getMediaUrl(series.assets.cover)
                    : `https://picsum.photos/seed/${series.slug}/400/300`

        return {
            id: String(series.id),
            title: series.name,
            subtitle: series.basics?.tagline || series.basics?.identifiers?.abbreviation || undefined,
            image: imageUrl,
            href: `/competition/series/${series.slug}`,
        }
    })

    const seasonEntries: any[] = seasons.map((season: Season) => ({
        id: String(season.id),
        title: season.name,
        subtitle: season.basics?.tagline || season.basics?.description || undefined,
        status: typeof season.details.series === 'object' && 'name' in season.details.series ? season.details.series.name : undefined,
        tag: season.basics?.identifiers?.code || season.basics?.identifiers?.abbreviation || undefined,
        href: `/competition/seasons/${season.slug}`,
    }))

    const eventItems: any[] = events.map((event: Event) => {
        const imageUrl = event.assets?.thumbnail
            ? getMediaUrl(event.assets.thumbnail)
            : event.assets?.poster
                ? getMediaUrl(event.assets.poster)
                : event.assets?.cover
                    ? getMediaUrl(event.assets.cover)
                    : `https://picsum.photos/seed/${event.slug}/400/300`

        return {
            id: String(event.id),
            title: event.name,
            subtitle: event.basics?.tagline || undefined,
            image: imageUrl,
            href: `/competition/events/${event.slug}`,
        }
    })

    const sessionEntries: any[] = sessions.map((session: Session) => ({
        id: String(session.id),
        title: session.name,
        subtitle: session.basics?.segment || session.basics?.description || undefined,
        status: session.details?.access || undefined,
        tag: session.basics?.identifiers?.code || undefined,
        href: `/competition/sessions/${session.slug}`,
    }))

    const mapLocations: any[] = circuits
        .filter((circuit: Circuit) => circuit.details?.location)
        .map((circuit: Circuit) => ({
            id: String(circuit.id),
            name: circuit.name,
            lat: circuit.details?.location?.[0] || 0,
            lng: circuit.details?.location?.[1] || 0,
            description: circuit.basics?.tagline || circuit.basics?.identifiers?.abbreviation || undefined,
            address: circuit.details?.address || undefined,
        }))

    return (
        <main className="w-full">
            {seriesItems.length > 0 && (
                <GridSection
                    id="competition-series"
                    title="Racing Series"
                    subtitle="Active championships and series"
                    items={seriesItems}
                    labels={{
                        unitsCount: 'SERIES',
                        viewProject: 'VIEW',
                        sectionIndex: 'SRS',
                        fallbackAlt: 'Series',
                    }}
                    columns={4}
                />
            )}
            {seasonEntries.length > 0 && (
                <ListSection
                    id="competition-seasons"
                    title="Seasons"
                    subtitle="Championship seasons"
                    entries={seasonEntries}
                    labels={{
                        statusPrefix: 'SERIES',
                        timePrefix: 'TIME',
                        indexPrefix: 'SEA',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {eventItems.length > 0 && (
                <GridSection
                    id="competition-events"
                    title="Events"
                    subtitle="Race weekends and meetings"
                    items={eventItems}
                    labels={{
                        unitsCount: 'EVENTS',
                        viewProject: 'VIEW',
                        sectionIndex: 'EVT',
                        fallbackAlt: 'Event',
                    }}
                    columns={3}
                />
            )}
            {sessionEntries.length > 0 && (
                <ListSection
                    id="competition-sessions"
                    title="Sessions"
                    subtitle="Practice, qualifying, and race sessions"
                    entries={sessionEntries}
                    labels={{
                        statusPrefix: 'ACCESS',
                        timePrefix: 'TIME',
                        indexPrefix: 'SES',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="competition-circuits"
                    title="Circuits"
                    subtitle="Race tracks around the world"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'HQ',
                        intelLabel: 'INTEL',
                        routeLabel: 'ROUTE',
                        timeLabel: 'TIME',
                        distLabel: 'DIST',
                        recordLabel: 'VIEW',
                        filterLabels: {
                            all: 'ALL',
                            primary: 'PRIMARY',
                            satellite: 'SATELLITE',
                            pathing: 'ROUTES',
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