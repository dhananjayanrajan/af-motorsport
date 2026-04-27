// app/(frontend)/about/plans/[slug]/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import StudySection from '@/components/Section/Blocks/StudySection'
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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getPlanData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'plans',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    tagline: true,
                    identifiers: { code: true },
                },
                details: {
                    mission: true,
                    vision: true,
                    status: true,
                    priority: true,
                    scope: true,
                    budget: true,
                    currency: true,
                    start_date: true,
                    end_date: true,
                },
                assets: {
                    cover: true,
                },
                traits: {
                    milestones: {
                        list: true,
                    },
                },
                seo: {
                    image: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['plan-detail'],
    { revalidate: 3600, tags: ['plan'] }
)

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const plan = await getPlanData(slug)

    if (!plan) notFound()

    const coverActions = [
        { label: 'VIEW SPECIFICATIONS', href: `/about/plans/${plan.slug}/details`, variant: 'primary' as const },
    ]

    const heroBackgroundImage = resolveAssetUrl(plan.assets, 'cover') || getMediaUrl(plan.seo?.image)
    const studyImage = resolveAssetUrl(plan.assets, 'cover') || getMediaUrl(plan.seo?.image)

    const study = {
        id: String(plan.id),
        title: plan.name,
        description: plan.basics?.description || plan.details?.mission || plan.details?.vision || '',
        image: studyImage || '',
        metrics: [
            { label: 'STATUS', value: plan.details?.status || 'N/A' },
            { label: 'PRIORITY', value: plan.details?.priority || 'N/A' },
            { label: 'SCOPE', value: plan.details?.scope || 'N/A' },
            { label: 'BUDGET', value: plan.details?.budget && plan.details?.currency ? `${plan.details.currency} ${plan.details.budget}` : 'N/A' },
        ],
    }

    const quoteItem = plan.details?.mission
        ? {
            id: 'plan-mission',
            text: plan.details.mission,
            author: 'MISSION_STATEMENT',
        }
        : plan.details?.vision
            ? {
                id: 'plan-vision',
                text: plan.details.vision,
                author: 'VISION_STATEMENT',
            }
            : null

    const timelineEvents: any[] = []

    if (plan.details?.start_date) {
        timelineEvents.push({
            id: 'plan-start',
            date: new Date(plan.details.start_date).toISOString().split('T')[0],
            title: 'INITIATION',
            description: plan.basics?.tagline || 'Strategic plan commencement',
            status: 'completed' as const,
            slug: `about/plans/${plan.slug}`,
        })
    }

    if (plan.traits?.milestones?.list) {
        plan.traits.milestones.list.slice(0, 3).forEach((milestone, idx) => {
            if (milestone.name) {
                timelineEvents.push({
                    id: milestone.id || `milestone-${idx}`,
                    date: milestone.due_date ? new Date(milestone.due_date).toISOString().split('T')[0] : 'TBD',
                    title: milestone.name.toUpperCase(),
                    description: milestone.description || undefined,
                    status: idx === 0 ? 'active' as const : 'upcoming' as const,
                    slug: `about/plans/${plan.slug}`,
                })
            }
        })
    }

    if (plan.details?.end_date) {
        timelineEvents.push({
            id: 'plan-end',
            date: new Date(plan.details.end_date).toISOString().split('T')[0],
            title: 'COMPLETION',
            description: 'Targeted conclusion of strategic objectives',
            status: 'upcoming' as const,
            slug: `about/plans/${plan.slug}`,
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="plan-cover"
                title={plan.name}
                subtitle={plan.basics?.tagline || 'STRATEGIC_PLAN'}
                description={plan.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={coverActions}
                alignment="center"
                badge={plan.basics?.identifiers?.code || plan.details?.scope || 'PLAN'}
                meta={plan.details?.start_date ? `INITIALIZED: ${new Date(plan.details.start_date).toISOString().split('T')[0]}` : undefined}
            />
            <StudySection
                id="plan-details"
                title="SPECIFICATIONS"
                subtitle="Primary operational data and performance metrics"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {quoteItem && (
                <QuoteSection
                    id="plan-quote"
                    title="PHILOSOPHY"
                    subtitle="Strategic guiding parameters"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'SYS',
                        ratingLabel: 'RANK',
                    }}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="plan-timeline"
                    title="OPERATIONS"
                    subtitle="Strategic milestone tracking"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STAT',
                        eventIndexLabel: 'STEP',
                        deploymentStatus: {
                            completed: 'SYNCED',
                            active: 'ACTIVE',
                            upcoming: 'PENDING',
                        },
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}