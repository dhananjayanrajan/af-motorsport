// app/(frontend)/calendar/championships/page.tsx
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
    if (typeof obj === 'object' && 'first_name' in obj && 'last_name' in obj)
        return `${obj.first_name} ${obj.last_name}`
    return ''
}

const getChampionshipsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'championships',
            limit: 24,
            depth: 1,
            sort: '-details.start_date',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true, abbreviation: true },
                    tagline: true,
                },
                details: {
                    start_date: true,
                    end_date: true,
                    season: true,
                    series: true,
                    winner: true,
                    runner_up: true,
                    third_place: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['championships-page-data'],
    { revalidate: 120, tags: ['championships'] }
)

export default async function ChampionshipsPage() {
    const championships = await getChampionshipsData()

    const activeChampionships = championships.filter((c) => {
        if (!c.details?.end_date) return true
        return new Date(c.details.end_date) >= new Date()
    })

    const timelineEvents = activeChampionships.map((c) => ({
        id: String(c.id),
        date: c.details?.start_date || '',
        title: c.name,
        description:
            resolveName(c.details?.season) ||
            resolveName(c.details?.series) ||
            '',
        status: (
            c.details?.end_date && new Date(c.details.end_date) < new Date()
                ? 'completed'
                : 'active'
        ) as 'completed' | 'active' | 'upcoming',
        image: getMediaUrl(c.assets?.thumbnail),
        slug: `/calendar/championships/${c.slug}`,
        code:
            c.basics?.identifiers?.code ||
            c.basics?.identifiers?.abbreviation ||
            undefined,
        format: resolveName(c.details?.series) || undefined,
    }))

    const allChampionships = championships.map((c) => {
        const code =
            c.basics?.identifiers?.code ||
            c.basics?.identifiers?.abbreviation ||
            ''
        return {
            id: String(c.id),
            title: c.name,
            subtitle:
                resolveName(c.details?.series) ||
                resolveName(c.details?.season) ||
                c.basics?.tagline ||
                '',
            image: getMediaUrl(c.assets?.thumbnail),
            href: `/calendar/championships/${c.slug}`,
            category: code || undefined,
        }
    })

    return (
        <main className="w-full">
            <HeroSection
                id="championships-hero"
                title="CHAMPIONSHIPS"
                subtitle="Trophy Battles Across All Series"
                description="From season-long campaigns to one-off cups — every championship documented."
                badge="TROPHY"
                meta="CHMP_IDX"
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="championships-active"
                    title="ACTIVE CHAMPIONSHIPS"
                    subtitle="Currently contested"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'CHAMPIONSHIP',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                />
            )}
            {allChampionships.length > 0 && (
                <GridSection
                    id="championships-all"
                    title="ALL CHAMPIONSHIPS"
                    subtitle="Complete archive"
                    items={allChampionships}
                    labels={{
                        unitsCount: 'TROPHIES',
                        viewProject: 'DETAILS',
                        sectionIndex: 'ARCHIVE',
                        fallbackAlt: 'Championship',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}