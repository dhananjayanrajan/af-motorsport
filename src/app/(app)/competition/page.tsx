import { Circuit, Race, Season } from '@/payload-types'
import RaceCalendar from './sections/Calendar'
import Incidents from './sections/Collapses'
import LightboxGallery from './sections/Gallery'
import ChampionshipTable from './sections/List'
import CircuitBoard from './sections/Map'
import SeasonSelector from './sections/Selector'

export const dynamic = 'force-dynamic'

interface CompetitionPageProps {
    searchParams: Promise<{
        season?: string
        series?: string
    }>
}

async function safeFetch(endpoint: string) {
    const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/${endpoint}`
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (!res.ok) return { docs: [] }
        const data = await res.json()
        return data || { docs: [] }
    } catch (e) {
        return { docs: [] }
    }
}

export default async function CompetitionPage({ searchParams }: CompetitionPageProps) {
    const params = await searchParams
    const [seasonsRes, seriesRes, racesRes, championshipsRes, incidentsRes] = await Promise.all([
        safeFetch('seasons?limit=100'),
        safeFetch('series?limit=100'),
        safeFetch('races?limit=500'),
        safeFetch('championships?limit=100'),
        safeFetch('incidents?limit=100')
    ])

    const seasons = seasonsRes.docs || []
    const series = seriesRes.docs || []
    const allRaces = racesRes.docs || []
    const allChampionships = championshipsRes.docs || []
    const allIncidents = incidentsRes.docs || []

    const activeSeason = params.season
        ? seasons.find((s: Season) => s.slug === params.season) || seasons[0]
        : seasons[0]

    const filteredRaces = activeSeason
        ? allRaces.filter((race: Race) => (race.details.season as Season)?.id === activeSeason.id)
        : []

    const activeCircuits = filteredRaces
        .map((r: Race) => r.details.circuit as Circuit)
        .filter((v: Circuit, i: number, a: Circuit[]) => v && a.findIndex((t) => t.id === v.id) === i)

    return (
        <main className="min-h-screen bg-white">
            <SeasonSelector
                seasons={seasons}
                series={series}
                activeSeason={activeSeason}
            />
            <RaceCalendar races={filteredRaces} />
            <ChampionshipTable championships={allChampionships} />
            <CircuitBoard circuits={activeCircuits} />
            <Incidents incidents={allIncidents} />
            <LightboxGallery
                items={allRaces}
                title="Gallery"
                label="Media Assets"
            />
        </main>
    )
}