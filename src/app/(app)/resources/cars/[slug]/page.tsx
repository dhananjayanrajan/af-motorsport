import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Car, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getCar(slug: string): Promise<Car | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'cars',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function CarPage({ params }: PageProps) {
    const { slug } = await params
    const car = await getCar(slug)

    if (!car) {
        return notFound()
    }

    const videoAsset = car.assets?.video && typeof car.assets.video === 'object'
        ? car.assets.video as Media
        : null

    const posterAsset = car.assets?.thumbnail && typeof car.assets.thumbnail === 'object'
        ? car.assets.thumbnail as Media
        : null

    const infoBlocks = [
        {
            id: 'identity',
            label: 'IDENTITY',
            title: car.name,
            description: car.basics?.description || undefined,
            metadata: [
                { key: 'CHASSIS', value: car.basics?.identifiers?.chassis || 'TBD' },
                { key: 'MODEL', value: car.basics?.identifiers?.model || 'TBD' },
                { key: 'VERSION', value: car.basics?.identifiers?.version || 'TBD' },
            ]
        },
        {
            id: 'status',
            label: 'STATUS',
            title: car.details?.status?.toUpperCase() || 'ACTIVE',
            description: car.basics?.tagline || undefined,
            metadata: [
                { key: 'CATEGORY', value: car.details?.technicalCategories?.split(' / ')[0] || 'TBD' },
            ]
        },
    ]

    const historySteps = []

    if (car.details?.history) {
        historySteps.push({
            id: 'history',
            index: '01',
            heading: 'Vehicle History',
            subheading: car.name,
            body: 'Racing heritage and development',
            percentage: 100
        })
    }

    const galleryItems: { id: string; image: Media; title: string; category: string }[] = []

    if (car.assets?.avatar && typeof car.assets.avatar === 'object') {
        galleryItems.push({
            id: (car.assets.avatar as Media).id.toString(),
            image: car.assets.avatar as Media,
            title: (car.assets.avatar as Media).filename || 'Avatar',
            category: car.basics?.identifiers?.model || 'CAR'
        })
    }

    if (car.assets?.cover && typeof car.assets.cover === 'object') {
        galleryItems.push({
            id: (car.assets.cover as Media).id.toString(),
            image: car.assets.cover as Media,
            title: (car.assets.cover as Media).filename || 'Cover',
            category: car.basics?.identifiers?.model || 'CAR'
        })
    }

    if (car.assets?.gallery) {
        for (const item of car.assets.gallery) {
            if (typeof item === 'object' && item !== null && 'url' in item) {
                galleryItems.push({
                    id: (item as Media).id.toString(),
                    image: item as Media,
                    title: (item as Media).filename || 'Gallery Image',
                    category: car.basics?.identifiers?.model || 'CAR'
                })
            }
        }
    }

    return (
        <main className="w-full">
            <VideoPlayer
                id={car.basics?.identifiers?.chassis || car.basics?.identifiers?.model || `CAR-${car.id}`}
                title={car.name}
                meta={car.basics?.tagline || 'Racing Machine'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    car.details?.status || 'Active',
                    car.basics?.identifiers?.model || 'Race Car'
                ]}
            />

            <InfoGrid
                id="CAR_SPECS"
                title="Car Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="CAR_HISTORY"
                    title="Vehicle History"
                    steps={historySteps}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="CAR_GALLERY"
                    title="Car Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/resources/cars/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Technical Details →
                </Link>
            </section>
        </main>
    )
}