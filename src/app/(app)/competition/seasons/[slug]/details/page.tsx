// app/(frontend)/competition/seasons/[slug]/details/page.tsx
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

const getSeasonDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'seasons',
            where: { slug: { equals: slug } },
            limit: 1,
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

    const heroBackgroundImage = season.assets?.cover
        ? getMediaUrl(season.assets.cover)
        : season.seo?.image
            ? getMediaUrl(season.seo.image)
            : undefined

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
            subtitle: season.basics?.identifiers?.code || season.basics?.identifiers?.abbreviation || 'N/A',
        },
    ]

    const seriesItems: any[] = []
    if (season.details.series) {
        const series = season.details.series
        if (typeof series === 'object' && 'name' in series) {
            const seriesImage = series.assets?.thumbnail
                ? getMediaUrl(series.assets.thumbnail)
                : series.assets?.logo
                    ? getMediaUrl(series.assets.logo)
                    : series.assets?.cover
                        ? getMediaUrl(series.assets.cover)
                        : `https://picsum.photos/seed/${series.slug}/400/300`

            seriesItems.push({
                id: String(series.id),
                title: series.name,
                subtitle: series.basics?.tagline || undefined,
                image: seriesImage,
                href: `/competition/series/${series.slug}`,
            })
        }
    }

    const documentItems: any[] = []

    return (
        <main className="w-full">
            <HeroSection
                id="season-details-cover"
                title={season.name}
                subtitle="Season Specifications"
                description={season.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={season.basics?.identifiers?.code || undefined}
            />
            <GridSection
                id="season-specifications"
                title="Specifications"
                subtitle="Season details"
                items={specItems}
                labels={{
                    unitsCount: 'SPECS',
                    viewProject: 'VIEW',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Spec',
                }}
                columns={3}
            />
            {seriesItems.length > 0 && (
                <GridSection
                    id="season-series"
                    title="Series"
                    subtitle="Parent championship"
                    items={seriesItems}
                    labels={{
                        unitsCount: 'SERIES',
                        viewProject: 'VIEW',
                        sectionIndex: 'SRS',
                        fallbackAlt: 'Series',
                    }}
                    columns={1}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="season-documents"
                    title="Documents"
                    subtitle="Season documentation"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'VIEW',
                        sectionIndex: 'DOC',
                        fallbackAlt: 'Document',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}