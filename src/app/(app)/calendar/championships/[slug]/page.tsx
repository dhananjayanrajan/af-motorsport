import CentralMedia from '@/components/Section/CentralMedia'
import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Championship, Driver, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getChampionship(slug: string): Promise<Championship | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'championships',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function ChampionshipPage({ params }: PageProps) {
    const { slug } = await params
    const championship = await getChampionship(slug)

    if (!championship) {
        return notFound()
    }

    const videoAsset = championship.assets?.video && typeof championship.assets.video === 'object'
        ? (championship.assets.video as Media)
        : null

    const posterAsset = championship.assets?.thumbnail && typeof championship.assets.thumbnail === 'object'
        ? (championship.assets.thumbnail as Media)
        : null

    const trophyImage = championship.assets?.trophy && typeof championship.assets.trophy === 'object'
        ? (championship.assets.trophy as Media)
        : null

    const infoBlocks = [
        {
            id: 'format',
            label: 'FORMAT',
            title: championship.details?.format?.toUpperCase() || 'STANDARD',
            description: championship.basics?.description || undefined,
            metadata: [
                { key: 'STANDINGS SCOPE', value: championship.details?.standings_scope?.toUpperCase()?.replace(/_/g, ' ') || 'SEASON ONLY' },
                { key: 'START DATE', value: championship.details?.start_date || 'TBD' },
                { key: 'END DATE', value: championship.details?.end_date || 'TBD' },
            ]
        },
        {
            id: 'series',
            label: 'SERIES',
            title: championship.details?.series && typeof championship.details.series === 'object'
                ? championship.details.series.name.toUpperCase()
                : 'INDEPENDENT',
            description: 'Parent championship series',
            metadata: [
                {
                    key: 'SEASON', value: championship.details?.season && typeof championship.details.season === 'object'
                        ? championship.details.season.name
                        : 'TBD'
                },
            ]
        },
    ]

    const historySteps = []

    if (championship.details?.start_date) {
        historySteps.push({
            id: 'inaugural',
            index: '01',
            heading: 'Inaugural Season',
            subheading: championship.details.start_date,
            body: championship.basics?.description || 'Championship established',
            percentage: 100
        })
    }

    if (championship.details?.winner && typeof championship.details.winner === 'object') {
        const winner = championship.details.winner as Driver
        historySteps.push({
            id: 'winner',
            index: '02',
            heading: 'Current Champion',
            subheading: `${winner.first_name} ${winner.last_name}`,
            body: championship.details.notes || 'Reigning champion',
            percentage: 100
        })
    }

    const galleryItems = championship.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: championship.basics?.identifiers?.code || 'Championship'
    })) || []

    return (
        <main className="w-full">
            <VideoPlayer
                id={championship.basics?.identifiers?.code || `CHP-${championship.id}`}
                title={championship.name}
                meta={championship.basics?.tagline || 'Championship'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    championship.details?.format || 'Championship',
                    championship.details?.standings_scope?.replace(/_/g, ' ') || 'Season Only'
                ]}
            />

            <InfoGrid
                id="CHP_SPECS"
                title="Championship Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {trophyImage && (
                <CentralMedia
                    id="CHP_TROPHY"
                    title="Championship Trophy"
                    meta={championship.basics?.tagline || 'Ultimate Prize'}
                    image={trophyImage}
                    tags={['TROPHY', 'AWARD', championship.basics?.identifiers?.code || 'CHAMPIONSHIP']}
                />
            )}

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="CHP_HISTORY"
                    title="Championship History"
                    steps={historySteps}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="CHP_GALLERY"
                    title="Championship Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/calendar/championships/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Technical Details →
                </Link>
            </section>
        </main>
    )
}