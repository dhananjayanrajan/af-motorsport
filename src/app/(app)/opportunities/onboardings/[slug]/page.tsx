import CentralMedia from '@/components/Section/CentralMedia'
import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import VideoCarousel from '@/components/Section/VideoCarousel'
import { Individual, Media, Onboarding } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getOnboarding(slug: string): Promise<Onboarding | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'onboardings',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function OnboardingPage({ params }: PageProps) {
    const { slug } = await params
    const onboarding = await getOnboarding(slug)

    if (!onboarding) {
        return notFound()
    }

    const videoSlides = onboarding.assets?.videos?.filter((video): video is Media =>
        typeof video === 'object' && video !== null && 'url' in video
    ).map(video => ({
        id: video.id.toString(),
        title: video.filename || 'Video',
        meta: 'ONBOARDING',
        video: video,
        poster: video.thumbnailURL ? { url: video.thumbnailURL } as Media : video,
    })) || []

    const certificateImage = onboarding.assets?.completion_certificate && typeof onboarding.assets.completion_certificate === 'object'
        ? onboarding.assets.completion_certificate as Media
        : null

    const assignedToName = onboarding.details.assigned_to && typeof onboarding.details.assigned_to === 'object'
        ? `${(onboarding.details.assigned_to as Individual).first_name} ${(onboarding.details.assigned_to as Individual).last_name}`
        : 'TBD'

    const infoBlocks = [
        {
            id: 'overview',
            label: 'ONBOARDING',
            title: onboarding.name,
            description: onboarding.basics?.description || undefined,
            metadata: [
                { key: 'TYPE', value: onboarding.details.type?.toUpperCase() || 'DRIVER' },
                { key: 'FORMAT', value: onboarding.details.format?.toUpperCase()?.replace(/_/g, ' ') || 'IN_PERSON' },
                { key: 'STATUS', value: onboarding.details.status?.toUpperCase() || 'DRAFT' },
            ]
        },
        {
            id: 'assignment',
            label: 'ASSIGNMENT',
            title: assignedToName,
            description: 'Assigned individual',
            metadata: [
                { key: 'START DATE', value: onboarding.details.start_date?.split('T')[0] || 'TBD' },
                { key: 'END DATE', value: onboarding.details.end_date?.split('T')[0] || 'TBD' },
            ]
        },
    ]

    const galleryItems: { id: string; image: Media; title: string; category: string }[] = []

    if (onboarding.assets?.thumbnail && typeof onboarding.assets.thumbnail === 'object') {
        galleryItems.push({
            id: (onboarding.assets.thumbnail as Media).id.toString(),
            image: onboarding.assets.thumbnail as Media,
            title: (onboarding.assets.thumbnail as Media).filename || 'Thumbnail',
            category: onboarding.details.type?.toUpperCase() || 'ONBOARDING'
        })
    }

    if (onboarding.assets?.cover && typeof onboarding.assets.cover === 'object') {
        galleryItems.push({
            id: (onboarding.assets.cover as Media).id.toString(),
            image: onboarding.assets.cover as Media,
            title: (onboarding.assets.cover as Media).filename || 'Cover',
            category: onboarding.details.type?.toUpperCase() || 'ONBOARDING'
        })
    }

    return (
        <main className="w-full">
            {videoSlides.length > 0 && (
                <VideoCarousel
                    slides={videoSlides}
                    sectionTitle="ONBOARDING_MEDIA"
                />
            )}

            <InfoGrid
                id="ONB_SPECS"
                title="Onboarding Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {certificateImage && (
                <CentralMedia
                    id="ONB_CERT"
                    title="Completion Certificate"
                    meta={onboarding.name}
                    image={certificateImage}
                    tags={['CERTIFICATE', onboarding.details.type?.toUpperCase() || 'ONBOARDING']}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="ONB_GALLERY"
                    title="Onboarding Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/opportunities/onboardings/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Full Details →
                </Link>
            </section>
        </main>
    )
}