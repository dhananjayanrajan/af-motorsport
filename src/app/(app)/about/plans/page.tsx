// app/(frontend)/about/plans/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

function resolveName(obj: any): string {
    if (!obj) return ''
    if (typeof obj === 'object' && 'first_name' in obj && 'last_name' in obj)
        return `${obj.first_name} ${obj.last_name}`
    return ''
}

const getPlansData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'plans',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true },
                    tagline: true,
                    description: true,
                },
                details: {
                    scope: true,
                    status: true,
                    priority: true,
                    start_date: true,
                    end_date: true,
                    budget: true,
                    currency: true,
                    assigned_to: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['plans-page-data'],
    { revalidate: 120, tags: ['plans'] }
)

export default async function PlansPage() {
    const plans = await getPlansData()

    const activePlans = plans.filter((p) =>
        p.details?.status === 'approved' || p.details?.status === 'in_progress'
    )

    const timelineEvents = activePlans.map((p) => ({
        id: String(p.id),
        date: p.details?.start_date || p.createdAt,
        title: p.name,
        description:
            p.basics?.tagline ||
            p.details?.scope ||
            '',
        status:
            p.details?.status === 'in_progress'
                ? ('active' as const)
                : ('upcoming' as const),
        image: getMediaUrl(p.assets?.thumbnail),
        slug: `/about/plans/${p.slug}`,
        code: p.basics?.identifiers?.code || undefined,
        format: p.details?.priority || undefined,
    }))

    const allPlans = plans.map((p) => ({
        id: String(p.id),
        title: p.name,
        subtitle:
            p.basics?.tagline ||
            p.details?.scope ||
            p.details?.status ||
            '',
        image: getMediaUrl(p.assets?.thumbnail),
        href: `/about/plans/${p.slug}`,
        category:
            p.basics?.identifiers?.code ||
            p.details?.priority ||
            undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="plans-hero"
                title="PLANS"
                subtitle="Strategic Roadmaps"
                description="Organizational, departmental, and personal plans with milestones, deliverables, and KPIs."
                badge="STRATEGY"
                meta="PLN_IDX"
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="plans-active"
                    title="ACTIVE PLANS"
                    subtitle="In progress and upcoming"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'PLAN',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                />
            )}
            {allPlans.length > 0 && (
                <GridSection
                    id="plans-all"
                    title="ALL PLANS"
                    subtitle="Complete portfolio"
                    items={allPlans}
                    labels={{
                        unitsCount: 'PLANS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'PORTFOLIO',
                        fallbackAlt: 'Plan',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}