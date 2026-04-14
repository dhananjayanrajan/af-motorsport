import { Championship, Point, Regulation } from '@/payload-types'
import { notFound } from 'next/navigation'
import ChampionshipHeader from './sections/Header'
import Podium from './sections/Podium'
import Regulations from './sections/Regulations'
import DriverStandings from './sections/Standings'

interface ChampionshipPageProps {
    params: {
        'championship-slug': string
    }
}

export default async function ChampionshipPage({ params }: ChampionshipPageProps) {
    const slug = params['championship-slug']
    const championship = await fetchChampionshipBySlug(slug)

    if (!championship) {
        notFound()
    }

    const points = await fetchPointsForChampionship(championship.id)
    const regulations = await fetchRegulationsForChampionship(championship.id)

    return (
        <main className="min-h-screen bg-white">
            <ChampionshipHeader championship={championship} />

            <Podium championship={championship} />

            <DriverStandings points={points} />

            <Regulations regulations={regulations} />
        </main>
    )
}

async function fetchChampionshipBySlug(slug: string): Promise<Championship | null> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/championships?where[slug][equals]=${slug}&limit=1`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs[0] || null
}

async function fetchPointsForChampionship(championshipId: number): Promise<Point[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/points?where[categories][contains]=${championshipId}&limit=100&sort=-details.after`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}

async function fetchRegulationsForChampionship(championshipId: number): Promise<Regulation[]> {
    const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/regulations?where[categories][contains]=${championshipId}&limit=50`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()
    return data.docs
}