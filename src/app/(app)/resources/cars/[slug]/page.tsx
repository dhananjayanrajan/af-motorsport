// app/(frontend)/resources/cars/[slug]/page.tsx
import CoverSection from '@/components/Section/Blocks/CoverSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
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

const getCarData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'cars',
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
                    identifiers: { chassis: true, model: true },
                },
                assets: {
                    video: true,
                    thumbnail: true,
                    cover: true,
                    avatar: true,
                    gallery: true,
                },
                details: {
                    status: true,
                    technicalCategories: true,
                    history: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['car-detail'],
    { revalidate: 3600, tags: ['car'] }
)

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const car = await getCarData(slug)

    if (!car) notFound()

    const coverImage = getMediaUrl(car.assets?.cover) ||
        getMediaUrl(car.assets?.avatar) ||
        getMediaUrl(car.assets?.thumbnail) ||
        `https://picsum.photos/seed/${car.slug}/1920/1080`

    const videoUrl = getMediaUrl(car.assets?.video)
    const videoItems = videoUrl
        ? [{
            id: String(car.id),
            title: car.name || '',
            description: car.basics?.tagline || undefined,
            url: videoUrl,
            poster: getMediaUrl(car.assets?.thumbnail) || getMediaUrl(car.assets?.cover),
        }]
        : []

    const studyImage = coverImage

    const study = {
        id: String(car.id),
        title: car.name || '',
        description: car.basics?.description || car.basics?.tagline || '',
        image: studyImage,
        metrics: [
            { label: 'Chassis', value: car.basics?.identifiers?.chassis || 'N/A' },
            { label: 'Model', value: car.basics?.identifiers?.model || 'N/A' },
            { label: 'Status', value: car.details?.status || 'N/A' },
            { label: 'Category', value: car.details?.technicalCategories || 'N/A' },
        ],
    }

    const scrollItems = car.details?.history
        ? [{
            id: 'history',
            title: 'Car History',
            description: car.basics?.description || 'A remarkable racing machine with a storied past.',
            percentage: 100,
        }]
        : []

    let galleryItems = (car.assets?.gallery || [])
        .map((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = getMediaUrl(media)
            if (!url || !media) return null
            return {
                id: String(media.id),
                title: media.alt || car.name || '',
                image: url,
                height: (idx % 3 === 0 ? 'tall' : idx % 2 === 0 ? 'medium' : 'short') as 'tall' | 'medium' | 'short',
            }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)

    if (galleryItems.length === 0 && car.assets?.cover) {
        const coverUrl = getMediaUrl(car.assets.cover)
        if (coverUrl) {
            galleryItems.push({
                id: String(car.id),
                title: car.name || '',
                image: coverUrl,
                height: 'medium',
            })
        }
    }

    return (
        <main className="w-full">
            <CoverSection
                id="car-cover"
                image={coverImage}
            />
            {videoItems.length > 0 && (
                <VideoSection
                    id="car-video"
                    title="Car Video"
                    subtitle={car.name}
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
                id="car-details"
                title="Car Overview"
                subtitle="Technical information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/resources/cars/${car.slug}/details`}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="car-history"
                    title="History"
                    subtitle="Development and legacy"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'SEC',
                        progressLabel: 'PROG',
                        statusComplete: 'DONE',
                    }}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="car-gallery"
                    title="Gallery"
                    subtitle="Car imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}