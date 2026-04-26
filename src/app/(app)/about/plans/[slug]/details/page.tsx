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
            depth: 1,
            select: {
                id: true,
                assets: {
                    documents: true,
                },
                traits: {
                    milestones: {
                        list: true,
                    },
                    deliverables: {
                        list: true,
                    },
                    risks: {
                        list: true,
                    },
                    kpis: {
                        list: true,
                    },
                },
            },
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
                    date: milestone.due_date ? new Date(milestone.due_date).toISOString().split('T')[0] : 'TBD',
                    title: milestone.name.toUpperCase(),
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
                    status: deliverable.type || 'ASSET',
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
                    status: risk.likelihood || 'LOW',
                    tag: risk.impact || 'MINIMAL',
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
                    subtitle: kpi.target ? `TARGET: ${kpi.target}${kpi.unit ? ` ${kpi.unit}` : ''}` : undefined,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (plan.assets?.documents && Array.isArray(plan.assets.documents)) {
        plan.assets.documents.forEach((doc, idx) => {
            const url = getMediaUrl(doc)
            if (url) {
                documentItems.push({
                    id: (typeof doc === 'object' && doc.id) ? String(doc.id) : `doc-${idx}`,
                    title: (typeof doc === 'object' && (doc.alt || doc.filename)) || `DOC_${idx + 1}`,
                    subtitle: (typeof doc === 'object' && doc.mimeType) || 'APPLICATION/PDF',
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
                    title="MILESTONES"
                    subtitle="Critical path achievements and scheduled targets"
                    events={milestoneEvents}
                    labels={{
                        statusPrefix: 'STAT',
                        eventIndexLabel: 'STEP',
                        deploymentStatus: {
                            completed: 'SYNCED',
                            active: 'ACTIVE',
                            upcoming: 'PENDING',
                        },
                    }}
                    orientation="vertical"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {deliverableEntries.length > 0 && (
                <ListSection
                    id="plan-deliverables"
                    title="DELIVERABLES"
                    subtitle="Projected operational outputs and technical outcomes"
                    entries={deliverableEntries}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'SYNC',
                        indexPrefix: 'DEL',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {riskEntries.length > 0 && (
                <ListSection
                    id="plan-risks"
                    title="ASSESSMENT"
                    subtitle="Risk mitigation and likelihood parameters"
                    entries={riskEntries}
                    labels={{
                        statusPrefix: 'LEVEL',
                        timePrefix: 'CALC',
                        indexPrefix: 'RSK',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {kpiItems.length > 0 && (
                <GridSection
                    id="plan-kpis"
                    title="PERFORMANCE"
                    subtitle="Success metrics and target indicators"
                    items={kpiItems}
                    labels={{
                        unitsCount: 'KPIS',
                        viewProject: 'DATA',
                        sectionIndex: 'MET',
                        fallbackAlt: 'Metric',
                    }}
                    columns={4}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="plan-documents"
                    title="ARCHIVE"
                    subtitle="Technical documentation and supporting resources"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'FETCH',
                        sectionIndex: 'DAT',
                        fallbackAlt: 'File',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}