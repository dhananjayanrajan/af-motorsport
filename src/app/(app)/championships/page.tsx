import ChampionshipTimeline from './sections/ChampionshipTimeline'
import SeasonRecapSection from './sections/SeasonRecapSection'
import StandingsTable from './sections/StandingsTable'

async function getChampionshipsData() {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL
    const [seasons, points, results, drivers, teams, awards, championships] = await Promise.all([
        fetch(`${url}/api/seasons?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/points?limit=1000`).then((res) => res.json()),
        fetch(`${url}/api/results?limit=1000`).then((res) => res.json()),
        fetch(`${url}/api/drivers?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/organizations?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/awards?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/championships?limit=100`).then((res) => res.json()),
    ])

    return {
        standings: {
            seasons: seasons.docs,
            points: points.docs,
            results: results.docs,
            drivers: drivers.docs,
            teams: teams.docs,
        },
        recap: {
            seasons: seasons.docs,
            results: results.docs,
            points: points.docs,
            awards: awards.docs,
        },
        history: {
            championships: championships.docs,
            seasons: seasons.docs,
            results: results.docs,
        },
    }
}

export default async function Page() {
    const data = await getChampionshipsData()

    const currentSeason = data.standings.seasons[0]

    return (
        <main className="bg-black min-h-screen">
            <StandingsTable
                season={currentSeason}
                drivers={data.standings.drivers}
                teams={data.standings.teams}
                results={data.standings.results}
                points={data.standings.points}
            />

            <SeasonRecapSection
                season={currentSeason}
                results={data.recap.results}
                points={data.recap.points}
                awards={data.recap.awards}
                drivers={data.standings.drivers}
            />

            <ChampionshipTimeline
                championships={data.history.championships}
            />
        </main>
    )
}