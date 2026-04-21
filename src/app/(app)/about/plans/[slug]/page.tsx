import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import PullQuote from '@/components/Section/PullQuote'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Media, Plan } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getPlan(slug: string): Promise<Plan | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'plans',
        where: {
            slug: {
                equals: slug,
            },
        },
    })
    return docs[0] || null
}

export default async function PlanPage({ params }: PageProps) {
    const { slug } = await params
    const plan = await getPlan(slug)

    if (!plan) {
        return notFound()
    }

    const coverImage = plan.assets?.cover && typeof plan.assets.cover === 'object'
        ? (plan.assets.cover as Media)
        : null

    const infoBlocks = [
        {
            id: 'scope',
            label: 'SCOPE',
            title: plan.details?.scope?.toUpperCase() || 'ORGANIZATIONAL',
            description: plan.basics?.description || undefined,
            metadata: [
                { key: 'STATUS', value: plan.details?.status?.toUpperCase() || 'DRAFT' },
                { key: 'PRIORITY', value: plan.details?.priority?.toUpperCase() || 'MEDIUM' },
                { key: 'START DATE', value: plan.details?.start_date || 'TBD' },
                { key: 'END DATE', value: plan.details?.end_date || 'TBD' },
            ]
        },
        {
            id: 'budget',
            label: 'FINANCIALS',
            title: plan.details?.budget ? `${plan.details.currency || 'USD'} ${plan.details.budget.toLocaleString()}` : 'NOT DISCLOSED',
            description: 'Allocated budget for this strategic initiative',
            metadata: [
                { key: 'CURRENCY', value: plan.details?.currency || 'USD' },
                {
                    key: 'ASSIGNED TO', value: plan.details?.assigned_to && typeof plan.details.assigned_to === 'object'
                        ? `${plan.details.assigned_to.first_name} ${plan.details.assigned_to.last_name}`
                        : 'UNASSIGNED'
                },
            ]
        },
    ]

    if (plan.details?.dependencies && plan.details.dependencies.length > 0) {
        const depNames = plan.details.dependencies
            .filter((dep): dep is Plan => typeof dep === 'object' && dep !== null && 'name' in dep)
            .map(dep => dep.name)
            .join(', ')

        infoBlocks.push({
            id: 'dependencies',
            label: 'DEPENDENCIES',
            title: depNames || 'NONE',
            description: 'Related plans that this initiative depends on',
            metadata: []
        })
    }

    const timelineEvents = plan.traits?.milestones?.list?.map(milestone => {
        let status: 'completed' | 'upcoming' | 'active' | undefined = undefined

        if (milestone.due_date && plan.details?.end_date) {
            status = new Date(milestone.due_date) <= new Date(plan.details.end_date) ? 'completed' : 'upcoming'
        }

        return {
            id: milestone.id || `${plan.id}-${milestone.name}`,
            date: milestone.due_date || 'TBD',
            title: milestone.name || 'Milestone',
            description: milestone.description || undefined,
            status: status
        }
    }) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={plan.basics?.identifiers?.code || `PLN-${plan.id}`}
                title={plan.name}
                meta={plan.basics?.tagline || 'Strategic Initiative'}
                image={coverImage}
                tags={[
                    plan.details?.scope || 'Plan',
                    plan.details?.status || 'Draft'
                ]}
            />

            <InfoGrid
                id="PLN_SPECS"
                title="Plan Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            <PullQuote
                id="PLN_VISION"
                title="Strategic Direction"
                quote={plan.details?.vision || plan.details?.mission || 'Vision and mission statements pending'}
                attribution={plan.details?.vision ? 'Vision Statement' : 'Mission Statement'}
                variant="center"
            />

            {timelineEvents.length > 0 && (
                <TimelineScroller
                    id="PLN_TIMELINE"
                    title="Project Milestones"
                    events={timelineEvents}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/about/plans/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Technical Details →
                </Link>
            </section>
        </main>
    )
}