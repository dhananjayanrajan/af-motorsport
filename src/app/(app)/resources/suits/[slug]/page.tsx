// app/(frontend)/resources/suits/[slug]/page.tsx
import ListSection from '@/components/Section/Blocks/ListSection'
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

const getSuitData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'suits',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['suit-detail'],
    { revalidate: 3600, tags: ['suit'] }
)

export default async function SuitPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const suit = await getSuitData(slug)

    if (!suit) notFound()

    const videoItems: any[] = []
    if (suit.assets?.video) {
        const videoUrl = getMediaUrl(suit.assets.video)
        if (videoUrl) {
            videoItems.push({
                id: String(suit.id),
                title: suit.name,
                description: suit.basics?.tagline || undefined,
                url: videoUrl,
                poster: suit.assets?.thumbnail ? getMediaUrl(suit.assets.thumbnail) : undefined,
            })
        }
    }

    const studyImage = suit.assets?.thumbnail
        ? getMediaUrl(suit.assets.thumbnail)
        : suit.assets?.images && suit.assets.images.length > 0
            ? getMediaUrl(suit.assets.images[0])
            : undefined

    const study = {
        id: String(suit.id),
        title: suit.name,
        description: suit.basics?.description || suit.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${suit.slug}/800/600`,
        metrics: [
            { label: 'Usage', value: suit.details?.usage || 'N/A' },
            { label: 'Material', value: suit.details?.material || 'N/A' },
            { label: 'Durability', value: suit.details?.durability || 'N/A' },
            { label: 'Appearance', value: suit.details?.appearance || 'N/A' },
        ],
    }

    const manufacturerEntries: any[] = []
    if (suit.details?.manufacturers?.list) {
        suit.details.manufacturers.list.forEach((manufacturer) => {
            if (manufacturer.name) {
                manufacturerEntries.push({
                    id: manufacturer.id || String(Math.random()),
                    title: manufacturer.name,
                    subtitle: manufacturer.description || undefined,
                })
            }
        })
    }

    const galleryItems: any[] = []
    if (suit.assets?.images) {
        suit.assets.images.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || suit.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="suit-video"
                    title="Suit Video"
                    subtitle={suit.name}
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
                id="suit-details"
                title="Suit Overview"
                subtitle="Design and specifications"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {manufacturerEntries.length > 0 && (
                <ListSection
                    id="suit-manufacturers"
                    title="Manufacturers"
                    subtitle="Suit makers"
                    entries={manufacturerEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'MFR',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="suit-gallery"
                    title="Gallery"
                    subtitle="Suit imagery"
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