import GalleryGrid from '@/components/Section/GalleryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import { Garage, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getGarage(slug: string): Promise<Garage | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'garages',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function GaragePage({ params }: PageProps) {
    const { slug } = await params
    const garage = await getGarage(slug)

    if (!garage) {
        return notFound()
    }

    const heroImage = garage.assets?.cover && typeof garage.assets.cover === 'object'
        ? garage.assets.cover as Media
        : null

    const infoBlocks = [
        {
            id: 'overview',
            label: 'GARAGE',
            title: garage.name,
            description: garage.basics?.description || undefined,
            metadata: [
                { key: 'TYPE', value: garage.details?.type || 'Permanent' },
                { key: 'ACCESSIBILITY', value: garage.details?.accessibility || 'Restricted' },
                { key: 'CAPACITY', value: garage.details?.capacity?.toString() || 'TBD' },
            ]
        },
        {
            id: 'dimensions',
            label: 'DIMENSIONS',
            title: garage.details?.size_sq_m ? `${garage.details.size_sq_m} SQ M` : 'TBD',
            description: 'Facility size',
            metadata: [
                { key: 'START DATE', value: garage.details?.start_date?.split('T')[0] || 'TBD' },
                { key: 'END DATE', value: garage.details?.end_date?.split('T')[0] || 'Present' },
            ]
        },
    ]

    const historySteps = []

    if (garage.details?.start_date) {
        historySteps.push({
            id: 'opening',
            index: '01',
            heading: 'Facility Opened',
            subheading: garage.details.start_date.split('T')[0],
            body: garage.basics?.tagline || 'Garage established',
            percentage: 100
        })
    }

    const galleryItems: { id: string; image: Media; title: string; category: string }[] = []

    if (garage.assets?.thumbnail && typeof garage.assets.thumbnail === 'object') {
        galleryItems.push({
            id: (garage.assets.thumbnail as Media).id.toString(),
            image: garage.assets.thumbnail as Media,
            title: (garage.assets.thumbnail as Media).filename || 'Thumbnail',
            category: garage.details?.type?.toUpperCase() || 'GARAGE'
        })
    }

    if (garage.assets?.cover && typeof garage.assets.cover === 'object') {
        galleryItems.push({
            id: (garage.assets.cover as Media).id.toString(),
            image: garage.assets.cover as Media,
            title: (garage.assets.cover as Media).filename || 'Cover',
            category: garage.details?.type?.toUpperCase() || 'GARAGE'
        })
    }

    if (garage.assets?.gallery) {
        for (const item of garage.assets.gallery) {
            if (typeof item === 'object' && item !== null && 'url' in item) {
                galleryItems.push({
                    id: (item as Media).id.toString(),
                    image: item as Media,
                    title: (item as Media).filename || 'Gallery Image',
                    category: garage.details?.type?.toUpperCase() || 'GARAGE'
                })
            }
        }
    }

    return (
        <main className="w-full">
            <HeroMedia
                id={garage.basics?.identifiers?.code || `GRG-${garage.id}`}
                title={garage.name}
                meta={garage.basics?.tagline || 'Strategic Technical Facility'}
                image={heroImage}
                tags={[
                    garage.details?.type || 'Operational Base',
                    garage.details?.accessibility || 'Restricted'
                ]}
            />

            <InfoGrid
                id="GRG_SPECS"
                title="Garage Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="GRG_HISTORY"
                    title="Facility History"
                    steps={historySteps}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="GRG_GALLERY"
                    title="Garage Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/resources/garages/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Details →
                </Link>
            </section>
        </main>
    )
}