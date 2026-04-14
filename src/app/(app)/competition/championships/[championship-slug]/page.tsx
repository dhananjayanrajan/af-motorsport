import { notFound } from 'next/navigation'
import ChampionshipHeader from './sections/Header'
import Podium from './sections/Podium'
import Regulations from './sections/Regulations'
import DriverStandings from './sections/Standings'

export const dynamic = 'force-dynamic'

interface ChampionshipPageProps {
    params: Promise<{
        'championship-slug': string
    }>
}

async function safeFetch(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (!res.ok) return { docs: [] }
        const text = await res.text()
        try {
            return JSON.parse(text)
        } catch (e) {
            return { docs: [] }
        }
    } catch (e) {
        return { docs: [] }
    }
}

export default async function ChampionshipPage({ params }: ChampionshipPageProps) {
    const { 'championship-slug': slug } = await params
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL

    const championshipData = await safeFetch(`${url}/api/championships?where[slug][equals]=${slug}&limit=1`)
    const championship = championshipData.docs?.[0]

    if (!championship) {
        notFound()
    }

    const [pointsData, regulationsData] = await Promise.all([
        safeFetch(`${url}/api/points?where[categories][contains]=${championship.id}&limit=100&sort=-details.after`),
        safeFetch(`${url}/api/regulations?where[categories][contains]=${championship.id}&limit=50`)
    ])

    return (
        <main className="min-h-screen bg-white">
            <ChampionshipHeader championship={championship} />
            <Podium championship={championship} />
            <DriverStandings points={pointsData.docs || []} />
            <Regulations regulations={regulationsData.docs || []} />
        </main>
    )
}