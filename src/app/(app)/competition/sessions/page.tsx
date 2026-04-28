// app/(frontend)/competition/sessions/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getSessionsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'sessions',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true },
                    segment: true,
                    description: true,
                },
                details: {
                    access: true,
                    specification: true,
                },
                metrics: {
                    quantifiers: {
                        laps: true,
                        distance: true,
                        duration: true,
                        interval: true,
                        specification: true,
                    },
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['sessions-page-data'],
    { revalidate: 120, tags: ['sessions'] }
)

export default async function SessionsPage() {
    const sessions = await getSessionsData()

    const sessionTypes = sessions.reduce<Record<string, typeof sessions>>((acc, s) => {
        const seg = s.basics?.segment || 'Other'
        if (!acc[seg]) acc[seg] = []
        acc[seg].push(s)
        return acc
    }, {})

    const gridItems = Object.entries(sessionTypes).map(([segment, items]) => ({
        id: segment,
        title: segment,
        subtitle: `${items.length} sessions`,
        image: getMediaUrl(items[0]?.assets?.thumbnail),
        href: undefined,
        category: items[0]?.details?.access || undefined,
    }))

    const listEntries = sessions.map((s) => ({
        id: String(s.id),
        title: s.name,
        subtitle: s.basics?.segment || '',
        tag: s.basics?.identifiers?.code || undefined,
        href: `/competition/sessions/${s.slug}`,
        timestamp: s.metrics?.quantifiers?.duration
            ? `${s.metrics.quantifiers.duration} min`
            : undefined,
        status: s.details?.access || undefined,
        image: getMediaUrl(s.assets?.thumbnail),
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="sessions-hero"
                title="SESSIONS"
                subtitle="Practice, Qualifying & Race Sessions"
                description="Every on-track session — from free practice to the checkered flag."
                badge="TRACK"
                meta="SES_IDX"
            />
            {gridItems.length > 0 && (
                <GridSection
                    id="sessions-types"
                    title="SESSION TYPES"
                    subtitle="By segment"
                    items={gridItems}
                    labels={{
                        unitsCount: 'TYPES',
                        viewProject: 'VIEW',
                        sectionIndex: 'SEGMENTS',
                        fallbackAlt: 'Session type',
                    }}
                    columns={3}
                />
            )}
            {listEntries.length > 0 && (
                <ListSection
                    id="sessions-all"
                    title="ALL SESSIONS"
                    subtitle="Complete log"
                    entries={listEntries}
                    labels={{
                        statusPrefix: 'ACCESS',
                        timePrefix: 'DURATION',
                        indexPrefix: 'ID',
                    }}
                    showStatus
                    showTimestamp
                />
            )}
        </main>
    )
}