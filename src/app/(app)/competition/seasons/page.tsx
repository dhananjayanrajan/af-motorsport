// app/(frontend)/competition/seasons/page.tsx
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
    if (typeof obj === 'object' && 'name' in obj) return obj.name
    return ''
}

const getSeasonsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'seasons',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true, abbreviation: true },
                    tagline: true,
                    description: true,
                },
                details: {
                    series: true,
                    entries: true,
                    races: true,
                    notes: true,
                },
                assets: {
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['seasons-page-data'],
    { revalidate: 120, tags: ['seasons'] }
)

export default async function SeasonsPage() {
    const seasons = await getSeasonsData()

    const timelineEvents = seasons.map((s) => ({
        id: String(s.id),
        date: s.createdAt,
        title: s.name,
        description: resolveName(s.details?.series) || '',
        status: 'active' as const,
        image: getMediaUrl(s.assets?.cover),
        slug: `/competition/seasons/${s.slug}`,
        code: s.basics?.identifiers?.code || s.basics?.identifiers?.abbreviation || undefined,
        format: s.details?.entries ? `${s.details.entries} entries` : undefined,
    }))

    const allSeasons = seasons.map((s) => ({
        id: String(s.id),
        title: s.name,
        subtitle:
            resolveName(s.details?.series) ||
            s.basics?.tagline ||
            '',
        image: getMediaUrl(s.assets?.cover),
        href: `/competition/seasons/${s.slug}`,
        category: s.basics?.identifiers?.code || s.basics?.identifiers?.abbreviation || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="seasons-hero"
                title="SEASONS"
                subtitle="Championship Years"
                description="Every season from every series — entries, races, and champions."
                badge="TIMELINE"
                meta="SZN_IDX"
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="seasons-timeline"
                    title="SEASON TIMELINE"
                    subtitle="Chronological overview"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'SEASON',
                        deploymentStatus: {
                            completed: 'ARCHIVED',
                            active: 'CURRENT',
                            upcoming: 'UPCOMING',
                        },
                    }}
                />
            )}
            {allSeasons.length > 0 && (
                <GridSection
                    id="seasons-all"
                    title="ALL SEASONS"
                    subtitle="Complete catalogue"
                    items={allSeasons}
                    labels={{
                        unitsCount: 'SEASONS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'CATALOGUE',
                        fallbackAlt: 'Season',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}