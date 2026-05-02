// app/(frontend)/about/statements/page.tsx
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
    if (typeof obj === 'object' && 'name' in obj) return obj.name
    return ''
}

const getStatementsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'statements',
            where: {
                'basics.status': { equals: 'Published' },
            },
            limit: 24,
            depth: 1,
            sort: '-basics.issued_date',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    status: true,
                    issued_date: true,
                    authority: true,
                },
                seo: {
                    description: true,
                    image: true,
                },
            },
        })
        return result.docs
    },
    ['statements-page-data'],
    { revalidate: 120, tags: ['statements'] }
)

export default async function StatementsPage() {
    const statements = await getStatementsData()

    const timelineEvents = statements.map((s) => ({
        id: String(s.id),
        date: s.basics?.issued_date || '',
        title: s.name,
        description: resolveName(s.basics?.authority) || s.basics?.description || s.seo?.description || '',
        status: 'completed' as const,
        image: getMediaUrl(s.seo?.image),
        slug: `/about/statements/${s.slug}`,
        code: s.basics?.status || undefined,
        format: resolveName(s.basics?.authority) || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="statements-hero"
                title="STATEMENTS"
                subtitle="Official Communications"
                description="Published statements, press releases, and official positions from the organization and its partners."
                badge="COMMUNICATIONS"
                meta="STMT_IDX"
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="statements-timeline"
                    title="PUBLISHED STATEMENTS"
                    subtitle="Chronological archive"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'STATEMENT',
                        deploymentStatus: {
                            completed: 'PUBLISHED',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                />
            )}
        </main>
    )
}