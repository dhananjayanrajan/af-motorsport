// app/(frontend)/resources/cars/[slug]/page.tsx
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

    const videoItems: any[] = []
    if (car.assets?.video) {
        const videoUrl = getMediaUrl(car.assets.video)
        if (videoUrl) {
            videoItems.push({
                id: String(car.id),
                title: car.name,
                description: car.basics?.tagline || undefined,
                url: videoUrl,
                poster: car.assets?.thumbnail ? getMediaUrl(car.assets.thumbnail) : car.assets?.cover ? getMediaUrl(car.assets.cover) : undefined,
            })
        }
    }

    const studyImage = car.assets?.cover
        ? getMediaUrl(car.assets.cover)
        : car.assets?.avatar
            ? getMediaUrl(car.assets.avatar)
            : car.assets?.thumbnail
                ? getMediaUrl(car.assets.thumbnail)
                : undefined

    const study = {
        id: String(car.id),
        title: car.name,
        description: car.basics?.description || car.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${car.slug}/800/600`,
        metrics: [
            { label: 'Chassis', value: car.basics?.identifiers?.chassis || 'N/A' },
            { label: 'Model', value: car.basics?.identifiers?.model || 'N/A' },
            { label: 'Status', value: car.details?.status || 'N/A' },
            { label: 'Category', value: car.details?.technicalCategories || 'N/A' },
        ],
    }

    const scrollItems: any[] = []
    if (car.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Car History',
            description: car.basics?.description || 'A remarkable racing machine with a storied past.',
            percentage: 100,
        })
    }

    const galleryItems: any[] = []
    if (car.assets?.gallery) {
        car.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || car.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }
    if (galleryItems.length === 0 && car.assets?.cover) {
        const url = getMediaUrl(car.assets.cover)
        if (url) {
            galleryItems.push({
                id: String(car.id),
                title: car.name,
                image: url,
                height: 'medium' as const,
            })
        }
    }

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="car-video"
                    title="Car Video"
                    subtitle={car.name}
                    videos={videoItems}
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
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}