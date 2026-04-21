import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Helmet, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getHelmet(slug: string): Promise<Helmet | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'helmets',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function HelmetPage({ params }: PageProps) {
    const { slug } = await params
    const helmet = await getHelmet(slug)

    if (!helmet) {
        return notFound()
    }

    const videoAsset = helmet.assets?.video && typeof helmet.assets.video === 'object'
        ? helmet.assets.video as Media
        : null

    const posterAsset = helmet.assets?.thumbnail && typeof helmet.assets.thumbnail === 'object'
        ? helmet.assets.thumbnail as Media
        : null

    const infoBlocks = [
        {
            id: 'identity',
            label: 'HELMET',
            title: helmet.name,
            description: helmet.basics?.description || undefined,
            metadata: [
                { key: 'USAGE', value: helmet.details?.usage || 'Track' },
                { key: 'BRANDING', value: helmet.details?.branding || 'Minimal' },
                { key: 'STYLE', value: helmet.details?.style || 'Modern' },
            ]
        },
        {
            id: 'design',
            label: 'DESIGN',
            title: helmet.details?.color?.toUpperCase() || 'TBD',
            description: helmet.basics?.tagline || undefined,
            metadata: [
                { key: 'MATERIAL', value: helmet.details?.material || 'Matte' },
                { key: 'YEAR', value: helmet.details?.year || 'TBD' },
                { key: 'DESIGNER', value: helmet.details?.designer || 'TBD' },
            ]
        },
    ]

    const galleryItems: { id: string; image: Media; title: string; category: string }[] = []

    if (helmet.assets?.avatar && typeof helmet.assets.avatar === 'object') {
        galleryItems.push({
            id: (helmet.assets.avatar as Media).id.toString(),
            image: helmet.assets.avatar as Media,
            title: (helmet.assets.avatar as Media).filename || 'Avatar',
            category: helmet.details?.usage?.toUpperCase() || 'HELMET'
        })
    }

    if (helmet.assets?.thumbnail && typeof helmet.assets.thumbnail === 'object') {
        galleryItems.push({
            id: (helmet.assets.thumbnail as Media).id.toString(),
            image: helmet.assets.thumbnail as Media,
            title: (helmet.assets.thumbnail as Media).filename || 'Thumbnail',
            category: helmet.details?.usage?.toUpperCase() || 'HELMET'
        })
    }

    if (helmet.assets?.images) {
        for (const item of helmet.assets.images) {
            if (typeof item === 'object' && item !== null && 'url' in item) {
                galleryItems.push({
                    id: (item as Media).id.toString(),
                    image: item as Media,
                    title: (item as Media).filename || 'Helmet Image',
                    category: helmet.details?.usage?.toUpperCase() || 'HELMET'
                })
            }
        }
    }

    return (
        <main className="w-full">
            <VideoPlayer
                id={`HLM-${helmet.id}`}
                title={helmet.name}
                meta={helmet.basics?.tagline || 'Racing Helmet'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    helmet.details?.usage || 'Helmet',
                    helmet.details?.branding || 'Custom'
                ]}
            />

            <InfoGrid
                id="HLM_SPECS"
                title="Helmet Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="HLM_GALLERY"
                    title="Helmet Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/resources/helmets/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Details →
                </Link>
            </section>
        </main>
    )
}