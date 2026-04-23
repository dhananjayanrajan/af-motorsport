// app/(frontend)/about/plans/[slug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getPlanDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'plans',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['plan-details'],
    { revalidate: 3600, tags: ['plan-details'] }
)

export default async function PlanDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const plan = await getPlanDetailsData(slug)

    if (!plan) notFound()

    const milestoneEvents: any[] = []
    if (plan.traits?.milestones?.list) {
        plan.traits.milestones.list.forEach((milestone, idx) => {
            if (milestone.name) {
                milestoneEvents.push({
                    id: milestone.id || `milestone-${idx}`,
                    date: milestone.due_date ? new Date(milestone.due_date).toLocaleDateString() : 'TBD',
                    title: milestone.name,
                    description: milestone.description || undefined,
                    status: idx === 0 ? 'completed' as const : idx === 1 ? 'active' as const : 'upcoming' as const,
                })
            }
        })
    }

    const deliverableEntries: any[] = []
    if (plan.traits?.deliverables?.list) {
        plan.traits.deliverables.list.forEach((deliverable) => {
            if (deliverable.name) {
                deliverableEntries.push({
                    id: deliverable.id || String(Math.random()),
                    title: deliverable.name,
                    subtitle: deliverable.description || undefined,
                    status: deliverable.type || undefined,
                })
            }
        })
    }

    const riskEntries: any[] = []
    if (plan.traits?.risks?.list) {
        plan.traits.risks.list.forEach((risk) => {
            if (risk.name) {
                riskEntries.push({
                    id: risk.id || String(Math.random()),
                    title: risk.name,
                    subtitle: risk.mitigation || undefined,
                    status: risk.likelihood || undefined,
                    tag: risk.impact || undefined,
                })
            }
        })
    }

    const kpiItems: any[] = []
    if (plan.traits?.kpis?.list) {
        plan.traits.kpis.list.forEach((kpi) => {
            if (kpi.name) {
                kpiItems.push({
                    id: kpi.id || String(Math.random()),
                    title: kpi.name,
                    subtitle: kpi.target ? `Target: ${kpi.target}${kpi.unit ? ` ${kpi.unit}` : ''}` : undefined,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (plan.assets?.documents) {
        plan.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url) {
                documentItems.push({
                    id: media?.id ? String(media.id) : `doc-${idx}`,
                    title: media?.alt || media?.filename || `Document ${idx + 1}`,
                    subtitle: media?.mimeType || undefined,
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full">
            {milestoneEvents.length > 0 && (
                <TimelineSection
                    id="plan-milestones"
                    title="Milestones"
                    subtitle="Key achievements and targets"
                    events={milestoneEvents}
                    orientation="vertical"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {deliverableEntries.length > 0 && (
                <ListSection
                    id="plan-deliverables"
                    title="Deliverables"
                    subtitle="Expected outputs and outcomes"
                    entries={deliverableEntries}
                    variant="detailed"
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {riskEntries.length > 0 && (
                <ListSection
                    id="plan-risks"
                    title="Risk Assessment"
                    subtitle="Identified risks and mitigations"
                    entries={riskEntries}
                    variant="detailed"
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {kpiItems.length > 0 && (
                <GridSection
                    id="plan-kpis"
                    title="Key Performance Indicators"
                    subtitle="Measuring success"
                    items={kpiItems}
                    columns={4}
                    cardVariant={1}
                    showMetadata={false}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="plan-documents"
                    title="Documents"
                    subtitle="Supporting materials and resources"
                    items={documentItems}
                    columns={3}
                    cardVariant={1}
                    showMetadata={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}