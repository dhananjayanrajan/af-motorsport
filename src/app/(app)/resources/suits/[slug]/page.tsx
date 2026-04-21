import DirectoryList from '@/components/Section/DirectoryList'
import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Media, Suit } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getSuit(slug: string): Promise<Suit | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'suits',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function SuitPage({ params }: PageProps) {
    const { slug } = await params
    const suit = await getSuit(slug)

    if (!suit) {
        return notFound()
    }

    const videoAsset = suit.assets?.video && typeof suit.assets.video === 'object'
        ? suit.assets.video as Media
        : null

    const posterAsset = suit.assets?.thumbnail && typeof suit.assets.thumbnail === 'object'
        ? suit.assets.thumbnail as Media
        : null

    const infoBlocks = [
        {
            id: 'identity',
            label: 'SUIT',
            title: suit.name,
            description: suit.basics?.description || undefined,
            metadata: [
                { key: 'USAGE', value: suit.details?.usage || 'Track' },
                { key: 'MATERIAL', value: suit.details?.material || 'Synthetic' },
                { key: 'DURABILITY', value: suit.details?.durability || 'Medium' },
            ]
        },
        {
            id: 'design',
            label: 'DESIGN',
            title: suit.details?.appearance?.toUpperCase() || 'MODERN',
            description: suit.basics?.tagline || undefined,
            metadata: [
                { key: 'APPEARANCE', value: suit.details?.appearance || 'Modern' },
            ]
        },
    ]

    const manufacturerItems = suit.details?.manufacturers?.list?.map(man => ({
        id: man.id || `${suit.id}-man-${man.name}`,
        title: man.name || 'Manufacturer',
        subtitle: man.description || undefined,
        tag: 'MANUFACTURER',
        timestamp: 'TBD',
        status: 'ACTIVE'
    })) || []

    const galleryItems: { id: string; image: Media; title: string; category: string }[] = []

    if (suit.assets?.thumbnail && typeof suit.assets.thumbnail === 'object') {
        galleryItems.push({
            id: (suit.assets.thumbnail as Media).id.toString(),
            image: suit.assets.thumbnail as Media,
            title: (suit.assets.thumbnail as Media).filename || 'Thumbnail',
            category: suit.details?.usage?.toUpperCase() || 'SUIT'
        })
    }

    if (suit.assets?.images) {
        for (const item of suit.assets.images) {
            if (typeof item === 'object' && item !== null && 'url' in item) {
                galleryItems.push({
                    id: (item as Media).id.toString(),
                    image: item as Media,
                    title: (item as Media).filename || 'Suit Image',
                    category: suit.details?.usage?.toUpperCase() || 'SUIT'
                })
            }
        }
    }

    return (
        <main className="w-full">
            <VideoPlayer
                id={`SUT-${suit.id}`}
                title={suit.name}
                meta={suit.basics?.tagline || 'Racing Suit'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    suit.details?.usage || 'Suit',
                    suit.details?.material || 'Synthetic'
                ]}
            />

            <InfoGrid
                id="SUT_SPECS"
                title="Suit Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {manufacturerItems.length > 0 && (
                <DirectoryList
                    id="SUT_MANUFACTURERS"
                    title="Manufacturers"
                    items={manufacturerItems}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="SUT_GALLERY"
                    title="Suit Gallery"
                    items={galleryItems}
                />
            )}
        </main>
    )
}