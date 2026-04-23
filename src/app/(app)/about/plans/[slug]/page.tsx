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

const getPlanData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'plans',
            where: { slug: { equals: slug } },
            limit: 1,
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
        { label: 'View Details', href: `/about/plans/${plan.slug}/details`, variant: 'primary' as const },
    ]

    const studyImage = plan.assets?.cover
        ? getMediaUrl(plan.assets.cover)
        : plan.seo?.image
            ? getMediaUrl(plan.seo.image)
            : `https://picsum.photos/seed/${plan.slug}/800/600`

    const study = {
        id: String(plan.id),
        title: plan.name,
        description: plan.basics?.description || plan.details?.mission || plan.details?.vision || '',
        image: studyImage || `https://picsum.photos/seed/${plan.slug}/800/600`,
        metrics: [
            { label: 'Status', value: plan.details?.status || 'N/A' },
            { label: 'Priority', value: plan.details?.priority || 'N/A' },
            { label: 'Scope', value: plan.details?.scope || 'N/A' },
            { label: 'Budget', value: plan.details?.budget && plan.details?.currency ? `${plan.details.currency} ${plan.details.budget}` : 'N/A' },
        ],
    }

    const quoteItem = plan.details?.mission
        ? {
            id: 'plan-mission',
            text: plan.details.mission,
            author: 'Mission Statement',
        }
        : plan.details?.vision
            ? {
                id: 'plan-vision',
                text: plan.details.vision,
                author: 'Vision Statement',
            }
            : null

    const timelineEvents: any[] = []

    if (plan.details?.start_date) {
        timelineEvents.push({
            id: 'plan-start',
            date: new Date(plan.details.start_date).toLocaleDateString(),
            title: 'Plan Initiation',
            description: plan.basics?.tagline || 'Strategic plan commencement',
            status: 'completed' as const,
        })
    }

    if (plan.traits?.milestones?.list) {
        plan.traits.milestones.list.slice(0, 3).forEach((milestone, idx) => {
            if (milestone.name) {
                timelineEvents.push({
                    id: milestone.id || `milestone-${idx}`,
                    date: milestone.due_date ? new Date(milestone.due_date).toLocaleDateString() : 'TBD',
                    title: milestone.name,
                    description: milestone.description || undefined,
                    status: idx === 0 ? 'active' as const : 'upcoming' as const,
                })
            }
        })
    }

    if (plan.details?.end_date) {
        timelineEvents.push({
            id: 'plan-end',
            date: new Date(plan.details.end_date).toLocaleDateString(),
            title: 'Target Completion',
            description: 'Expected conclusion of plan objectives',
            status: 'upcoming' as const,
        })
    }

    const heroBackgroundImage = plan.assets?.cover
        ? getMediaUrl(plan.assets.cover)
        : `https://picsum.photos/seed/${plan.slug}/1920/1080`

    return (
        <main className="w-full">
            <HeroSection
                id="plan-cover"
                title={plan.name}
                subtitle={plan.basics?.tagline || 'Strategic Plan'}
                description={plan.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={coverActions}
                alignment="center"
                badge={plan.basics?.identifiers?.code || plan.details?.scope || undefined}
                meta={plan.details?.start_date ? `Started: ${new Date(plan.details.start_date).toLocaleDateString()}` : undefined}
            />
            <StudySection
                id="plan-details"
                title="Plan Overview"
                subtitle="Key information and metrics"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {quoteItem && (
                <QuoteSection
                    id="plan-quote"
                    title="Guiding Statement"
                    subtitle="Our north star"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'COMM',
                        ratingLabel: 'RATING',
                    }}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="plan-timeline"
                    title="Timeline"
                    subtitle="Key milestones and dates"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STAT',
                        eventIndexLabel: 'EVENT',
                        deploymentStatus: {
                            completed: 'DONE',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                    orientation="horizontal"
                    headerVariant={1}
                    footerVariant={1}
                    ctaLabel="View Full Details"
                    ctaPath={`/about/plans/${plan.slug}/details`}
                />
            )}
        </main>
    )
}