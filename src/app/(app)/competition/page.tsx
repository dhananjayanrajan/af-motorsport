import { Championship, Circuit, Incident, Race, Season, Series } from '@/payload-types'
import ChampionshipStandings from './sections/ChampionshipStandings'
import CircuitBoard from './sections/CircuitBoard'
import Incidents from './sections/Incidents'
import RaceCalendar from './sections/RaceCalendar'
import SeasonSelector from './sections/SeasonSelector'
import SeasonsSection from './sections/SeasonsSection'

interface CompetitionPageProps {
    searchParams: {
        season?: string
        series?: string
    }
}

export default async function CompetitionPage({ searchParams }: CompetitionPageProps) {
    const seasons = await fetchSeasons()
    const series = await fetchSeries()
    const allRaces = await fetchRaces()
    const allChampionships = await fetchChampionships()
    const allIncidents = await fetchIncidents()

    const activeSeason = searchParams.season
        ? seasons.find((s) => s.slug === searchParams.season) || seasons[0]
        : seasons[0]

    const filteredRaces = allRaces.filter(
        (race) => (race.details.season as Season)?.id === activeSeason.id
    )

    const activeChampionship = allChampionships.find(
        (c) => (c.details?.season as Season)?.id === activeSeason.id
    ) || allChampionships[0]

    const activeCircuits = filteredRaces
        .map((r) => r.details.circuit as Circuit)
        .filter((v, i, a) => v && a.findIndex((t) => t.id === v.id) === i)

    return (
        <main className="min-h-screen bg-white">
            <SeasonSelector
                seasons={seasons}
                series={series}
                activeSeason={activeSeason}
            />

            <RaceCalendar races={filteredRaces} />

            <SeasonsSection seasons={seasons} />

            <ChampionshipStandings
                championship={activeChampionship}
            />

            <CircuitBoard
                circuits={activeCircuits}
            />

            <Incidents
                incidents={allIncidents}
            />
        </main>
    )
}

async function fetchSeasons(): Promise<Season[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/seasons?limit=100`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchSeries(): Promise<Series[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/series?limit=100`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchRaces(): Promise<Race[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/races?limit=500`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchChampionships(): Promise<Championship[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/championships?limit=100`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchIncidents(): Promise<Incident[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/incidents?limit=100`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}