import CalendarSection from './sections/CalendarSection'
import RaceResultsSection from './sections/RaceResultsSection'
import StandingsSection from './sections/StandingsSection'

async function getSeasonData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL
    const seasonRes = await fetch(`${url}/api/seasons?where[slug][equals]=${slug}&limit=1`).then((res) => res.json())

    if (!seasonRes.docs.length) return null

    const season = seasonRes.docs[0]

    const [races, events, circuits, points, results, drivers, teams] = await Promise.all([
        fetch(`${url}/api/races?where[details.season][equals]=${season.id}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/events?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/circuits?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/points?where[categories][in]=${season.id}&limit=1000`).then((res) => res.json()),
        fetch(`${url}/api/results?limit=1000`).then((res) => res.json()),
        fetch(`${url}/api/drivers?limit=100`).then((res) => res.json()),
        fetch(`${url}/api/organizations?limit=100`).then((res) => res.json()),
    ])

    return {
        calendar: {
            races: races.docs,
            events: events.docs,
            circuits: circuits.docs
        },
        standings: {
            points: points.docs,
            results: results.docs,
            drivers: drivers.docs,
            teams: teams.docs
        },
        outcomes: {
            races: races.docs,
            results: results.docs
        },
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getSeasonData(params.slug)

    if (!data) return null

    return (
        <main className="bg-black min-h-screen">
            <CalendarSection
                races={data.calendar.races}
            />

            <StandingsSection
                drivers={data.standings.drivers}
                teams={data.standings.teams}
                results={data.standings.results}
                points={data.standings.points}
            />

            <RaceResultsSection
                races={data.outcomes.races}
                results={data.outcomes.results}
            />
        </main>
    )
}