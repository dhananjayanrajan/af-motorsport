import GalleryGrid from '@/components/Section/GalleryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import { Media, Series } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getSeries(slug: string): Promise<Series | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'series',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 1,
    })
    return docs[0] || null
}

export default async function SeriesPage({ params }: PageProps) {
    const { slug } = await params
    const series = await getSeries(slug)

    if (!series) {
        return notFound()
    }

    const heroImage = series.assets?.cover && typeof series.assets.cover === 'object'
        ? (series.assets.cover as Media)
        : null

    const infoBlocks = [
        {
            id: 'status',
            label: 'STATUS',
            title: series.details?.status?.toUpperCase() || 'ACTIVE',
            description: series.basics?.description || undefined,
            metadata: [
                { key: 'ACCESS', value: series.details?.access || 'Public' },
                { key: 'START DATE', value: series.details?.start_date || 'TBD' },
                { key: 'END DATE', value: series.details?.end_date || 'TBD' },
            ]
        },
        {
            id: 'identity',
            label: 'IDENTITY',
            title: series.basics?.identifiers?.code || series.name,
            description: series.basics?.tagline || undefined,
            metadata: [
                { key: 'ABBREVIATION', value: series.basics?.identifiers?.abbreviation || 'N/A' },
            ]
        },
    ]

    const historySteps = []

    if (series.details?.predecessor && typeof series.details.predecessor === 'object') {
        historySteps.push({
            id: 'predecessor',
            index: '01',
            heading: 'Predecessor',
            subheading: (series.details.predecessor as Series).name,
            body: 'Previous iteration of this series',
            percentage: 100
        })
    }

    if (series.details?.successor && typeof series.details.successor === 'object') {
        historySteps.push({
            id: 'successor',
            index: '02',
            heading: 'Successor',
            subheading: (series.details.successor as Series).name,
            body: 'Subsequent evolution',
            percentage: 100
        })
    }

    const galleryItems: { id: string; image: Media; title: string; category: string }[] = []

    if (series.assets?.thumbnail && typeof series.assets.thumbnail === 'object') {
        galleryItems.push({
            id: (series.assets.thumbnail as Media).id.toString(),
            image: series.assets.thumbnail as Media,
            title: (series.assets.thumbnail as Media).filename || 'Thumbnail',
            category: series.basics?.identifiers?.code || 'SERIES'
        })
    }

    if (series.assets?.cover && typeof series.assets.cover === 'object') {
        galleryItems.push({
            id: (series.assets.cover as Media).id.toString(),
            image: series.assets.cover as Media,
            title: (series.assets.cover as Media).filename || 'Cover',
            category: series.basics?.identifiers?.code || 'SERIES'
        })
    }

    if (series.assets?.logo && typeof series.assets.logo === 'object') {
        galleryItems.push({
            id: (series.assets.logo as Media).id.toString(),
            image: series.assets.logo as Media,
            title: (series.assets.logo as Media).filename || 'Logo',
            category: series.basics?.identifiers?.code || 'SERIES'
        })
    }

    return (
        <main className="w-full">
            <HeroMedia
                id={series.basics?.identifiers?.code || `SRS-${series.id}`}
                title={series.name}
                meta={series.basics?.tagline || 'Racing Series'}
                image={heroImage}
                tags={[
                    series.details?.status || 'Active',
                    series.details?.access || 'Public'
                ]}
            />

            <InfoGrid
                id="SRS_SPECS"
                title="Series Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="SRS_HISTORY"
                    title="Series Lineage"
                    steps={historySteps}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="SRS_GALLERY"
                    title="Series Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/competition/series/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Details →
                </Link>
            </section>
        </main>
    )
}