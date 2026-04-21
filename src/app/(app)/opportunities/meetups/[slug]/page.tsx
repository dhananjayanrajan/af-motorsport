import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Media, Meetup } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getMeetup(slug: string): Promise<Meetup | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'meetups',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function MeetupPage({ params }: PageProps) {
    const { slug } = await params
    const meetup = await getMeetup(slug)

    if (!meetup) {
        return notFound()
    }

    const videoAsset = meetup.assets?.video && typeof meetup.assets.video === 'object'
        ? meetup.assets.video as Media
        : null

    const posterAsset = meetup.assets?.thumbnail && typeof meetup.assets.thumbnail === 'object'
        ? meetup.assets.thumbnail as Media
        : null

    const infoBlocks = [
        {
            id: 'overview',
            label: 'MEETUP',
            title: meetup.name,
            description: meetup.basics?.description || undefined,
            metadata: [
                { key: 'FORMAT', value: meetup.details.format?.toUpperCase()?.replace(/_/g, ' ') || 'IN_PERSON' },
                { key: 'ACCESS', value: meetup.details.access?.toUpperCase()?.replace(/_/g, ' ') || 'PUBLIC' },
            ]
        },
        {
            id: 'schedule',
            label: 'SCHEDULE',
            title: meetup.details.start_date.split('T')[0],
            description: 'Event date',
            metadata: [
                { key: 'END DATE', value: meetup.details.end_date?.split('T')[0] || 'SAME DAY' },
                { key: 'NOTES', value: meetup.details.notes || 'No additional notes' },
            ]
        },
    ]

    const galleryItems = meetup.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: meetup.details.format?.toUpperCase() || 'MEETUP'
    })) || []

    return (
        <main className="w-full">
            <VideoPlayer
                id={`MUP-${meetup.id}`}
                title={meetup.name}
                meta={meetup.basics?.description || 'Community Meetup'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    meetup.details.format || 'Meetup',
                    meetup.details.access || 'Public'
                ]}
            />

            <InfoGrid
                id="MUP_SPECS"
                title="Meetup Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="MUP_GALLERY"
                    title="Meetup Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/opportunities/meetups/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Full Details →
                </Link>
            </section>
        </main>
    )
}