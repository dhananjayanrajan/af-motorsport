import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
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

const getSeriesData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'series',
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
                        abbreviation: true,
                        code: true
                    }
                },
                assets: {
                    cover: true,
                    logo: true,
                    thumbnail: true
                },
                details: {
                    status: true,
                    access: true,
                    start_date: true,
                    end_date: true,
                    history: true,
                    agenda: true
                },
                seo: {
                    image: true
                }
            }
        })
        return result.docs[0] || null
    },
    ['series-detail'],
    { revalidate: 3600, tags: ['series'] }
)

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const series = await getSeriesData(slug)

    if (!series) notFound()

    const heroBackgroundImage = resolveAssetUrl(series.assets, 'cover') || getMediaUrl(series.seo?.image)

    const heroActions = [
        { label: 'View Full Details', href: `/competition/series/${series.slug}/details`, variant: 'primary' as const },
    ]

    const studyImage = resolveAssetUrl(series.assets, 'cover', 'logo', 'thumbnail')

    const study = {
        id: String(series.id),
        title: series.name,
        description: series.basics?.description || series.basics?.tagline || '',
        image: studyImage || '',
        metrics: [
            { label: 'Current Status', value: (series.details?.status || 'N/A').toUpperCase() },
            { label: 'Access Level', value: (series.details?.access || 'N/A').toUpperCase() },
            { label: 'Start Date', value: series.details?.start_date ? new Date(series.details.start_date).toISOString().split('T')[0] : 'TBD' },
            { label: 'End Date', value: series.details?.end_date ? new Date(series.details.end_date).toISOString().split('T')[0] : 'TBD' },
        ],
    }

    const scrollItems: any[] = []
    if (series.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Series History',
            description: 'A detailed timeline of racing events, championship winners, and competitive evolution within this series.',
            percentage: 100,
        })
    }
    if (series.details?.agenda) {
        scrollItems.push({
            id: 'agenda',
            title: 'Official Agenda',
            description: series.details.agenda,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (series.assets?.cover) {
        const url = getMediaUrl(series.assets.cover)
        if (url) {
            galleryItems.push({
                id: `cover-${series.id}`,
                title: series.name,
                image: url,
                height: 'tall' as const,
            })
        }
    }
    if (series.assets?.logo) {
        const url = getMediaUrl(series.assets.logo)
        if (url) {
            galleryItems.push({
                id: `logo-${series.id}`,
                title: 'Official Series Logo',
                image: url,
                height: 'short' as const,
            })
        }
    }

    return (
        <main className="w-full bg-black-pure">
            <HeroSection
                id="series-hero"
                title={series.name}
                subtitle="Racing Competition Series"
                description={series.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={heroActions}
                alignment="center"
                badge={series.basics?.identifiers?.abbreviation || series.basics?.identifiers?.code || 'Series'}
            />
            <StudySection
                id="series-details"
                title="Series Overview"
                subtitle="Primary competition data and status"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="series-history"
                    title="Archive"
                    subtitle="History and official agenda documentation"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'Part',
                        progressLabel: 'Read',
                        statusComplete: 'Done',
                    }}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="series-gallery"
                    title="Gallery"
                    subtitle="Official visual assets for this series"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'Type',
                        idPrefix: 'Asset',
                    }}
                    columns={2}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}