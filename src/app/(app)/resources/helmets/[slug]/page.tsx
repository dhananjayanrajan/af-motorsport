import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import StudySection from '@/components/Section/Blocks/StudySection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
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

const getHelmetData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'helmets',
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
                },
                assets: {
                    video: true,
                    thumbnail: true,
                    avatar: true,
                    images: true,
                },
                details: {
                    usage: true,
                    designer: true,
                    style: true,
                    year: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['helmet-detail'],
    { revalidate: 3600, tags: ['helmet'] }
)

export default async function HelmetPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const helmet = await getHelmetData(slug)

    if (!helmet) notFound()

    const videoUrl = getMediaUrl(helmet.assets?.video)
    const videoItems = videoUrl
        ? [{
            id: String(helmet.id),
            title: helmet.name || '',
            description: helmet.basics?.tagline || undefined,
            url: videoUrl,
            poster: getMediaUrl(helmet.assets?.thumbnail) || getMediaUrl(helmet.assets?.avatar),
        }]
        : []

    const firstGalleryImage = helmet.assets?.images?.[0]
    const studyImage = getMediaUrl(helmet.assets?.avatar) ||
        getMediaUrl(helmet.assets?.thumbnail) ||
        getMediaUrl(typeof firstGalleryImage === 'object' ? firstGalleryImage : null) ||
        `https://picsum.photos/seed/${helmet.slug}/800/600`

    const study = {
        id: String(helmet.id),
        title: helmet.name || '',
        description: helmet.basics?.description || helmet.basics?.tagline || '',
        image: studyImage,
        metrics: [
            { label: 'Usage', value: helmet.details?.usage || 'N/A' },
            { label: 'Designer', value: helmet.details?.designer || 'N/A' },
            { label: 'Style', value: helmet.details?.style || 'N/A' },
            { label: 'Year', value: helmet.details?.year || 'N/A' },
        ],
    }

    const galleryItems = (helmet.assets?.images || [])
        .map((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = getMediaUrl(media)
            if (!url || !media) return null
            return {
                id: String(media.id),
                title: media.alt || helmet.name || '',
                image: url,
                height: (idx % 3 === 0 ? 'tall' : idx % 2 === 0 ? 'medium' : 'short') as 'tall' | 'medium' | 'short',
            }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="helmet-video"
                    title="Helmet Video"
                    subtitle={helmet.name || ''}
                    videos={videoItems}
                    labels={{
                        channelPrefix: 'CH',
                        broadcastStatus: 'LIVE',
                        liveFeed: 'FEED',
                        metaTransmission: 'TRANS',
                    }}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="helmet-details"
                title="Helmet Overview"
                subtitle="Design information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/resources/helmets/${helmet.slug}/details`}
            />
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="helmet-gallery"
                    title="Gallery"
                    subtitle="Helmet imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
        </main>
    )
}