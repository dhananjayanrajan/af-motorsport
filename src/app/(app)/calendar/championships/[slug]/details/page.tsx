import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import Podium from '@/components/Section/Podium'
import StatsGrid from '@/components/Section/StatsGrid'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Championship, Driver, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getChampionship(slug: string): Promise<Championship | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'championships',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function ChampionshipDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const championship = await getChampionship(slug)

    if (!championship) {
        return notFound()
    }

    const coverImage = championship.assets?.cover && typeof championship.assets.cover === 'object'
        ? (championship.assets.cover as Media)
        : null

    const statsItems = [
        {
            label: 'SEASONS',
            value: championship.details?.season ? '1' : '0',
            unit: 'ACTIVE',
            description: 'Number of completed seasons'
        },
        {
            label: 'FORMAT',
            value: championship.details?.format?.split(' ')[0] || 'STANDARD',
            unit: '',
            description: championship.details?.format || 'Traditional championship format'
        },
        {
            label: 'STANDINGS',
            value: championship.details?.standings_scope?.replace(/_/g, ' ')?.split(' ')[0] || 'SEASON',
            unit: 'ONLY',
            description: championship.details?.standings_scope?.replace(/_/g, ' ') || 'Season-only standings'
        },
        {
            label: 'POINTS',
            value: championship.details?.points_system ? 'ACTIVE' : 'NONE',
            unit: '',
            description: 'Points system in effect'
        },
    ]

    const podiumEntries = []

    if (championship.details?.winner && typeof championship.details.winner === 'object') {
        const winner = championship.details.winner as Driver
        podiumEntries.push({
            id: winner.id.toString(),
            firstName: winner.first_name,
            lastName: winner.last_name,
            rank: 'P01' as const,
            points: 'CHAMPION',
            team: championship.name,
            image: winner.assets?.avatar && typeof winner.assets.avatar === 'object' ? winner.assets.avatar : undefined
        })
    }

    if (championship.details?.runner_up && typeof championship.details.runner_up === 'object') {
        const runnerUp = championship.details.runner_up as Driver
        podiumEntries.push({
            id: runnerUp.id.toString(),
            firstName: runnerUp.first_name,
            lastName: runnerUp.last_name,
            rank: 'P02' as const,
            points: 'RUNNER UP',
            team: championship.name,
            image: runnerUp.assets?.avatar && typeof runnerUp.assets.avatar === 'object' ? runnerUp.assets.avatar : undefined
        })
    }

    if (championship.details?.third_place && typeof championship.details.third_place === 'object') {
        const thirdPlace = championship.details.third_place as Driver
        podiumEntries.push({
            id: thirdPlace.id.toString(),
            firstName: thirdPlace.first_name,
            lastName: thirdPlace.last_name,
            rank: 'P03' as const,
            points: 'THIRD',
            team: championship.name,
            image: thirdPlace.assets?.avatar && typeof thirdPlace.assets.avatar === 'object' ? thirdPlace.assets.avatar : undefined
        })
    }

    const timelineEvents = []

    if (championship.details?.start_date) {
        let status: 'completed' | 'upcoming' | 'active' | undefined = 'upcoming'
        const startDate = new Date(championship.details.start_date)
        const now = new Date()

        if (startDate <= now) {
            status = 'completed'
        }

        timelineEvents.push({
            id: 'start',
            date: championship.details.start_date,
            title: 'Season Start',
            description: championship.basics?.description || 'Championship begins',
            status: status
        })
    }

    if (championship.details?.end_date) {
        let status: 'completed' | 'upcoming' | 'active' | undefined = 'upcoming'
        const endDate = new Date(championship.details.end_date)
        const now = new Date()

        if (endDate <= now) {
            status = 'completed'
        }

        timelineEvents.push({
            id: 'end',
            date: championship.details.end_date,
            title: 'Season Finale',
            description: 'Championship concludes',
            status: status
        })
    }

    const regulationPanels = []

    if (championship.details?.regulations && typeof championship.details.regulations === 'object') {
        const regulation = championship.details.regulations
        regulationPanels.push({
            id: 'main-regs',
            title: regulation.name || 'Championship Regulations',
            label: regulation.basics?.type || 'REGULATIONS',
            summary: regulation.basics?.description || 'Official championship regulations',
            content: regulation.basics?.description || 'Full regulation document available',
            metadata: [
                { label: 'VERSION', value: regulation.basics?.version || '1.0' },
                { label: 'STATUS', value: regulation.basics?.status || 'Published' },
                { label: 'EFFECTIVE', value: regulation.basics?.effective_date || 'TBD' },
            ]
        })
    }

    const documents = championship.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Championship Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={championship.basics?.identifiers?.code || `CHP-${championship.id}`}
                title={championship.name}
                meta={championship.basics?.tagline || 'Championship Details'}
                image={coverImage}
                tags={[
                    championship.details?.format || 'Championship',
                    'Technical Specs'
                ]}
            />

            <StatsGrid
                id="CHP_STATS"
                title="Championship Statistics"
                items={statsItems}
                columns={4}
            />

            {podiumEntries.length > 0 && (
                <Podium
                    id="CHP_PODIUM"
                    title="Top Finishers"
                    entries={podiumEntries}
                />
            )}

            {timelineEvents.length > 0 && (
                <TimelineScroller
                    id="CHP_TIMELINE"
                    title="Season Timeline"
                    events={timelineEvents}
                />
            )}

            {regulationPanels.length > 0 && (
                <ExpandableList
                    id="CHP_REGS"
                    title="Regulations"
                    panels={regulationPanels}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="CHP_DOCS"
                    title="Official Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}