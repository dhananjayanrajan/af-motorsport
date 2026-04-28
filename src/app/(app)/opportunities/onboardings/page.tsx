// app/(frontend)/opportunities/onboardings/page.tsx
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

const getOnboardingsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'onboardings',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true },
                    description: true,
                },
                details: {
                    type: true,
                    format: true,
                    status: true,
                    start_date: true,
                    end_date: true,
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
    ['onboardings-page-data'],
    { revalidate: 120, tags: ['onboardings'] }
)

export default async function OnboardingsPage() {
    const onboardings = await getOnboardingsData()

    const active = onboardings.filter(
        (o) => o.details?.status === 'active' || o.details?.status === 'draft'
    )

    const timelineEvents = active.map((o) => ({
        id: String(o.id),
        date: o.details?.start_date || o.createdAt,
        title: o.name,
        description:
            resolveName(o.details?.assigned_to) ||
            o.details?.type ||
            '',
        status:
            o.details?.status === 'active'
                ? ('active' as const)
                : ('upcoming' as const),
        image: getMediaUrl(o.assets?.thumbnail),
        slug: `/opportunities/onboardings/${o.slug}`,
        code: o.basics?.identifiers?.code || undefined,
        format: o.details?.format || undefined,
    }))

    const allGrid = onboardings.map((o) => ({
        id: String(o.id),
        title: o.name,
        subtitle:
            resolveName(o.details?.assigned_to) ||
            o.details?.type ||
            o.basics?.identifiers?.code ||
            '',
        image: getMediaUrl(o.assets?.thumbnail) || getMediaUrl(o.assets?.cover),
        href: `/opportunities/onboardings/${o.slug}`,
        category: o.details?.status || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="onboardings-hero"
                title="ONBOARDINGS"
                subtitle="Induction & Orientation Programmes"
                description="Structured onboarding for drivers, members, leaders, partners, and volunteers."
                badge="ONBOARD"
                meta="ONB_IDX"
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="onboardings-active"
                    title="ACTIVE ONBOARDINGS"
                    subtitle="In progress"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'ONBOARDING',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'ACTIVE',
                            upcoming: 'DRAFT',
                        },
                    }}
                />
            )}
            {allGrid.length > 0 && (
                <GridSection
                    id="onboardings-all"
                    title="ALL ONBOARDINGS"
                    subtitle="Complete log"
                    items={allGrid}
                    labels={{
                        unitsCount: 'ONBOARDINGS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'LOG',
                        fallbackAlt: 'Onboarding',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}