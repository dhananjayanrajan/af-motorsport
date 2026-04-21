import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Media, Season, Series } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getSeason(slug: string): Promise<Season | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'seasons',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function SeasonPage({ params }: PageProps) {
    const { slug } = await params
    const season = await getSeason(slug)

    if (!season) {
        return notFound()
    }

    const videoAsset = season.assets?.trailer && typeof season.assets.trailer === 'object'
        ? (season.assets.trailer as Media)
        : null

    const posterAsset = season.assets?.cover && typeof season.assets.cover === 'object'
        ? (season.assets.cover as Media)
        : null

    const seriesName = season.details.series && typeof season.details.series === 'object'
        ? (season.details.series as Series).name
        : 'TBD'

    const infoBlocks = [
        {
            id: 'overview',
            label: 'OVERVIEW',
            title: season.name,
            description: season.basics?.description || undefined,
            metadata: [
                { key: 'SERIES', value: seriesName },
                { key: 'ENTRIES', value: season.details.entries?.toString() || 'TBD' },
                { key: 'RACES', value: season.details.races?.toString() || 'TBD' },
            ]
        },
        {
            id: 'identity',
            label: 'IDENTIFIERS',
            title: season.basics?.identifiers?.code || 'SEASON',
            description: season.basics?.tagline || undefined,
            metadata: [
                { key: 'CODE', value: season.basics?.identifiers?.code || 'N/A' },
                { key: 'ABBREVIATION', value: season.basics?.identifiers?.abbreviation || 'N/A' },
            ]
        },
    ]

    const historySteps = []

    if (season.details.entries) {
        historySteps.push({
            id: 'entries',
            index: '01',
            heading: 'Total Entries',
            subheading: `${season.details.entries} Competitors`,
            body: season.details.notes || 'Registered participants',
            percentage: 100
        })
    }

    if (season.details.races) {
        historySteps.push({
            id: 'races',
            index: '02',
            heading: 'Race Calendar',
            subheading: `${season.details.races} Events`,
            body: 'Full season schedule',
            percentage: 100
        })
    }

    const galleryItems = season.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: season.basics?.identifiers?.code || 'SEASON'
    })) || []

    const highlightItems = season.assets?.highlights?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Highlight',
        category: 'SEASON HIGHLIGHT'
    })) || []

    const allGalleryItems = [...galleryItems, ...highlightItems]

    return (
        <main className="w-full">
            <VideoPlayer
                id={season.basics?.identifiers?.code || `SSN-${season.id}`}
                title={season.name}
                meta={season.basics?.tagline || 'Racing Season'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    'Season',
                    season.details.series ? 'Active' : 'Draft'
                ]}
            />

            <InfoGrid
                id="SSN_SPECS"
                title="Season Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="SSN_HISTORY"
                    title="Season Statistics"
                    steps={historySteps}
                />
            )}

            {allGalleryItems.length > 0 && (
                <GalleryGrid
                    id="SSN_GALLERY"
                    title="Season Gallery"
                    items={allGalleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/competition/seasons/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Details →
                </Link>
            </section>
        </main>
    )
}