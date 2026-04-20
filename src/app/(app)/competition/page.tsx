import { Race, Season } from '@/payload-types'
import ChampionshipDirectory from './sections/Championships'
import CircuitDirectory from './sections/Map'
import SeasonDirectory from './sections/Seasons'
import SeriesDirectory from './sections/Series'

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
        safeFetch('seasons?depth=1&limit=100'),
        safeFetch('series?depth=1&limit=100'),
        safeFetch('races?depth=2&limit=500'),
        safeFetch('championships?depth=1&limit=100'),
        safeFetch('incidents?depth=1&limit=100')
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
        ? allRaces.filter((race: Race) => {
            const seasonRef = race.details.season
            return typeof seasonRef === 'number'
                ? seasonRef === activeSeason.id
                : seasonRef?.id === activeSeason.id
        })
        : []

    const activeCircuits = filteredRaces
        .map((r: Race) => r.details.circuit)

    return (
        <main className="min-h-screen bg-white">
            <ChampionshipDirectory championships={allChampionships} />
            <SeriesDirectory series={series} />
            <SeasonDirectory seasons={seasons} />
            <CircuitDirectory circuits={activeCircuits} />
        </main>
    )
}