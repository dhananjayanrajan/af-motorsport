// app/(frontend)/competition/series/page.tsx
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

const getSeriesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'series',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                createdAt: true,
                basics: {
                    identifiers: { code: true, abbreviation: true },
                    tagline: true,
                    description: true,
                },
                details: {
                    status: true,
                    start_date: true,
                    end_date: true,
                    predecessor: true,
                    successor: true,
                },
                assets: {
                    logo: true,
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['series-page-data'],
    { revalidate: 120, tags: ['series'] }
)

function resolveName(obj: any): string {
    if (!obj) return ''
    if (typeof obj === 'object' && 'name' in obj) return obj.name
    return ''
}

export default async function SeriesPage() {
    const seriesList = await getSeriesData()

    const active = seriesList.filter(
        (s) => s.details?.status === 'Active' || s.details?.status === 'Sanctioned'
    )
    const archived = seriesList.filter(
        (s) =>
            s.details?.status === 'Inactive' ||
            s.details?.status === 'Defunct' ||
            s.details?.status === 'Merged' ||
            s.details?.status === 'Rebranded'
    )

    const activeGrid = active.map((s) => ({
        id: String(s.id),
        title: s.name,
        subtitle: s.basics?.tagline || s.basics?.identifiers?.code || '',
        image: getMediaUrl(s.assets?.logo) || getMediaUrl(s.assets?.thumbnail),
        href: `/competition/series/${s.slug}`,
        category: s.details?.status || s.basics?.identifiers?.abbreviation || undefined,
    }))

    const archivedList = archived.map((s) => ({
        id: String(s.id),
        title: s.name,
        subtitle: s.basics?.identifiers?.code || s.basics?.identifiers?.abbreviation || '',
        tag: s.details?.status || undefined,
        href: `/competition/series/${s.slug}`,
        timestamp: s.details?.end_date || undefined,
        status: s.details?.status || undefined,
        image: getMediaUrl(s.assets?.logo) || getMediaUrl(s.assets?.thumbnail),
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="series-hero"
                title="SERIES"
                subtitle="Sanctioned Racing Divisions"
                description="Active championships, defunct tours, and rebranded series — the complete lineage."
                badge="DIVISIONS"
                meta="SER_IDX"
            />
            {activeGrid.length > 0 && (
                <GridSection
                    id="series-active"
                    title="ACTIVE SERIES"
                    subtitle="Currently sanctioned divisions"
                    items={activeGrid}
                    labels={{
                        unitsCount: 'SERIES',
                        viewProject: 'DETAILS',
                        sectionIndex: 'ACTIVE',
                        fallbackAlt: 'Series',
                    }}
                    columns={3}
                />
            )}
            {archivedList.length > 0 && (
                <ListSection
                    id="series-archived"
                    title="ARCHIVED SERIES"
                    subtitle="Historical and defunct divisions"
                    entries={archivedList}
                    labels={{
                        statusPrefix: 'STATUS',
                        timePrefix: 'ENDED',
                        indexPrefix: 'ID',
                    }}
                    showStatus
                    showTimestamp
                />
            )}
        </main>
    )
}