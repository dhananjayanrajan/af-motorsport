import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import StatsGrid from '@/components/Section/StatsGrid'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Media, Plan } from '@/payload-types'
import configPromise from '@payload-config'
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

export default async function PlanDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const plan = await getPlan(slug)

    if (!plan) {
        return notFound()
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

    const deliverablePanels = plan.traits?.deliverables?.list?.map(deliverable => ({
        id: deliverable.id || `${plan.id}-del-${deliverable.name}`,
        title: deliverable.name || 'Deliverable',
        label: deliverable.type || 'DELIVERABLE',
        summary: deliverable.description || 'No description provided',
        content: deliverable.description || 'No additional details available',
        metadata: [
            { label: 'TYPE', value: deliverable.type?.toUpperCase() || 'STANDARD' },
            { label: 'STATUS', value: 'PENDING' }
        ]
    })) || []

    const riskPanels = plan.traits?.risks?.list?.map(risk => ({
        id: risk.id || `${plan.id}-risk-${risk.name}`,
        title: risk.name || 'Risk',
        label: `${risk.likelihood?.toUpperCase() || 'MEDIUM'} IMPACT`,
        summary: `Likelihood: ${risk.likelihood || 'medium'} | Impact: ${risk.impact || 'medium'}`,
        content: risk.mitigation || 'No mitigation strategy defined',
        metadata: [
            { label: 'LIKELIHOOD', value: risk.likelihood?.toUpperCase() || 'MEDIUM' },
            { label: 'IMPACT', value: risk.impact?.toUpperCase() || 'MEDIUM' },
            { label: 'SEVERITY', value: risk.likelihood === 'high' && risk.impact === 'critical' ? 'CRITICAL' : 'MODERATE' }
        ]
    })) || []

    const kpiStats = plan.traits?.kpis?.list?.map(kpi => ({
        label: kpi.name || 'Key Performance Indicator',
        value: kpi.target || '0',
        unit: kpi.unit || undefined,
        description: `Target ${kpi.unit ? `in ${kpi.unit}` : 'value'}`
    })) || []

    const documents = plan.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Plan Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            {timelineEvents.length > 0 && (
                <TimelineScroller
                    id="PLN_MILESTONES"
                    title="Milestones"
                    events={timelineEvents}
                />
            )}

            {deliverablePanels.length > 0 && (
                <ExpandableList
                    id="PLN_DELIVERABLES"
                    title="Deliverables"
                    panels={deliverablePanels}
                />
            )}

            {riskPanels.length > 0 && (
                <ExpandableList
                    id="PLN_RISKS"
                    title="Risks"
                    panels={riskPanels}
                />
            )}

            {kpiStats.length > 0 && (
                <StatsGrid
                    id="PLN_KPIS"
                    title="Key Performance Indicators"
                    items={kpiStats}
                    columns={4}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="PLN_DOCS"
                    title="Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}