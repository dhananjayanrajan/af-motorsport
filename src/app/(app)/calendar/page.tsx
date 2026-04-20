import ChampionshipCalendar from './sections/Championship'
import CircuitCalendar from './sections/Circuits'
import RaceCalendar from './sections/Races'

export const dynamic = 'force-dynamic'

async function safeFetch(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 0 } })
        if (!res.ok) return { docs: [], totalDocs: 0 }
        return await res.json()
    } catch (e) {
        return { docs: [], totalDocs: 0 }
    }
}

async function getCalendarData() {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL

    const [
        racesRes,
        circuitsRes,
        championshipsRes
    ] = await Promise.all([
        safeFetch(`${url}/api/races?depth=2&where[details.status][equals]=scheduled&sort=details.start_date&limit=50`),
        safeFetch(`${url}/api/circuits?depth=2&limit=100`),
        safeFetch(`${url}/api/championships?depth=2&limit=100`)
    ])

    return {
        races: racesRes.docs || [],
        circuits: circuitsRes.docs || [],
        championships: championshipsRes.docs || []
    }
}

export default async function CalendarPage() {
    const data = await getCalendarData()

    return (
        <main className="min-h-screen">
            <ChampionshipCalendar championships={data.championships} />
            <RaceCalendar races={data.races} />
            <CircuitCalendar circuits={data.circuits} />
        </main>
    )
}