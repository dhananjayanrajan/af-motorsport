import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import StatsGrid from '@/components/Section/StatsGrid'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Media, Vacancy } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getVacancy(slug: string): Promise<Vacancy | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'vacancies',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function VacancyDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const vacancy = await getVacancy(slug)

    if (!vacancy) {
        return notFound()
    }

    const thumbnailImage = vacancy.assets?.thumbnail && typeof vacancy.assets.thumbnail === 'object'
        ? vacancy.assets.thumbnail as Media
        : null

    const timelineEvents = vacancy.details?.positions?.list?.map(pos => {
        let status: 'completed' | 'active' | 'upcoming' | undefined = 'active'

        if (pos.end) {
            status = new Date(pos.end) <= new Date() ? 'completed' : 'active'
        }

        return {
            id: pos.id || `${vacancy.id}-pos-${pos.title}`,
            date: pos.start || 'TBD',
            title: pos.title || 'Position',
            description: pos.end ? `Through ${pos.end}` : 'Open-ended',
            status: status
        }
    }) || []

    const specStats = [
        {
            label: 'DEPARTMENT',
            value: vacancy.details?.department?.toUpperCase() || 'TBD',
            unit: '',
            description: 'Team assignment'
        },
        {
            label: 'CONTRACT',
            value: vacancy.details?.contract?.toUpperCase()?.replace(/_/g, ' ') || 'FULL_TIME',
            unit: '',
            description: 'Employment type'
        },
        {
            label: 'LOCATION',
            value: vacancy.details?.locations ? 'ON-SITE' : 'REMOTE',
            unit: '',
            description: 'Work arrangement'
        },
    ]

    const expectationPanels = vacancy.details?.expectations?.list?.map(exp => ({
        id: exp.id || `${vacancy.id}-exp-${exp.name}`,
        title: exp.name || 'Expectation',
        label: exp.type?.toUpperCase() || 'REQUIREMENT',
        summary: exp.criteria || 'Must meet criteria',
        content: exp.statement || 'No additional details',
        metadata: [
            { label: 'TYPE', value: exp.type?.toUpperCase() || 'STANDARD' },
            { label: 'CRITERIA', value: exp.criteria || 'TBD' },
        ]
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={`VAC-${vacancy.id}`}
                title={vacancy.basics.title}
                meta={vacancy.basics.description || 'Position Opening'}
                image={thumbnailImage}
                tags={[
                    vacancy.details?.department || 'Position',
                    vacancy.details?.contract?.toUpperCase()?.replace(/_/g, ' ') || 'Full Time'
                ]}
            />

            {timelineEvents.length > 0 && (
                <TimelineScroller
                    id="VAC_POSITIONS"
                    title="Position Timeline"
                    events={timelineEvents}
                />
            )}

            <StatsGrid
                id="VAC_SPECS_STATS"
                title="Position Specifications"
                items={specStats}
                columns={3}
            />

            {expectationPanels.length > 0 && (
                <ExpandableList
                    id="VAC_EXPECTATIONS"
                    title="Role Expectations"
                    panels={expectationPanels}
                />
            )}
        </main>
    )
}