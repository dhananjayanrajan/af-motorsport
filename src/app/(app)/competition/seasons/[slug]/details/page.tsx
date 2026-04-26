import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
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

const getSeasonDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'seasons',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                    description: true,
                    identifiers: {
                        code: true,
                        abbreviation: true
                    }
                },
                assets: {
                    cover: true
                },
                details: {
                    entries: true,
                    races: true,
                    series: true
                },
                seo: {
                    image: true
                }
            }
        })
        return result.docs[0] || null
    },
    ['season-details'],
    { revalidate: 3600, tags: ['season-details'] }
)

export default async function SeasonDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const season = await getSeasonDetailsData(slug)

    if (!season) notFound()

    const heroBackgroundImage = resolveAssetUrl(season.assets, 'cover') || getMediaUrl(season.seo?.image)

    const specItems: any[] = [
        {
            id: 'entries',
            title: 'Total Entries',
            subtitle: season.details?.entries ? String(season.details.entries) : 'N/A',
        },
        {
            id: 'races',
            title: 'Total Races',
            subtitle: season.details?.races ? String(season.details.races) : 'N/A',
        },
        {
            id: 'code',
            title: 'Season Code',
            subtitle: (season.basics?.identifiers?.code || season.basics?.identifiers?.abbreviation || 'N/A').toUpperCase(),
        },
    ]

    const seriesItems: any[] = []
    if (season.details?.series && typeof season.details.series === 'object') {
        const series = season.details.series as any
        const seriesImage = resolveAssetUrl(series.assets, 'thumbnail', 'logo', 'cover')

        seriesItems.push({
            id: String(series.id),
            title: (series.name || 'Unnamed Series').toUpperCase(),
            subtitle: series.basics?.tagline || 'Primary Series Association',
            image: seriesImage || '',
            href: `/competition/series/${series.slug}`,
        })
    }

    const documentItems: any[] = []

    return (
        <main className="w-full bg-black-pure">
            <HeroSection
                id="season-details-cover"
                title={season.name}
                subtitle="Season Specifications"
                description={season.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={season.basics?.identifiers?.code || 'SEASON'}
            />
            <GridSection
                id="season-specifications"
                title="Full Details"
                subtitle="Primary season information and statistics"
                items={specItems}
                labels={{
                    unitsCount: 'Items',
                    viewProject: 'Info',
                    sectionIndex: 'Detail',
                    fallbackAlt: 'Specification',
                }}
                columns={3}
            />
            {seriesItems.length > 0 && (
                <GridSection
                    id="season-series"
                    title="Series"
                    subtitle="Associated championship series"
                    items={seriesItems}
                    labels={{
                        unitsCount: 'Series',
                        viewProject: 'View',
                        sectionIndex: 'Championship',
                        fallbackAlt: 'Series Link',
                    }}
                    columns={1}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="season-documents"
                    title="Documentation"
                    subtitle="Official season files and records"
                    items={documentItems}
                    labels={{
                        unitsCount: 'Files',
                        viewProject: 'Open',
                        sectionIndex: 'Doc',
                        fallbackAlt: 'File',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}