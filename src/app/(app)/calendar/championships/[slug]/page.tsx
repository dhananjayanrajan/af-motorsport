// app/(frontend)/calendar/championships/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
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

const getChampionshipData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'championships',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['championship-detail'],
    { revalidate: 3600, tags: ['championship'] }
)

export default async function ChampionshipPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const championship = await getChampionshipData(slug)

    if (!championship) notFound()

    const videoItems: any[] = []
    if (championship.assets?.video) {
        const videoUrl = getMediaUrl(championship.assets.video)
        if (videoUrl) {
            videoItems.push({
                id: String(championship.id),
                title: championship.name,
                description: championship.basics?.tagline || undefined,
                url: videoUrl,
                poster: championship.assets?.thumbnail ? getMediaUrl(championship.assets.thumbnail) : undefined,
            })
        }
    }

    const studyImage = championship.assets?.cover
        ? getMediaUrl(championship.assets.cover)
        : championship.assets?.thumbnail
            ? getMediaUrl(championship.assets.thumbnail)
            : undefined

    const study = {
        id: String(championship.id),
        title: championship.name,
        description: championship.basics?.description || championship.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${championship.slug}/800/600`,
        metrics: [
            { label: 'Format', value: championship.details?.format || 'N/A' },
            { label: 'Standings', value: championship.details?.standings_scope || 'N/A' },
            { label: 'Start', value: championship.details?.start_date ? new Date(championship.details.start_date).toLocaleDateString() : 'TBD' },
            { label: 'End', value: championship.details?.end_date ? new Date(championship.details.end_date).toLocaleDateString() : 'TBD' },
        ],
    }

    const trophyFeature = championship.assets?.trophy
        ? {
            id: 'trophy',
            title: 'Championship Trophy',
            description: 'The ultimate prize awarded to the champion',
            image: getMediaUrl(championship.assets.trophy) || `https://picsum.photos/seed/trophy-${championship.slug}/400/300`,
        }
        : null

    const scrollItems: any[] = []
    if (championship.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Championship History',
            description: championship.basics?.description || 'A legacy of excellence in motorsport competition.',
            percentage: 100,
        })
    }

    const galleryItems: any[] = []
    if (championship.assets?.gallery) {
        championship.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || championship.name,
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
                    id="championship-video"
                    title="Championship Highlights"
                    subtitle={championship.name}
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
                id="championship-details"
                title="Championship Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {trophyFeature && (
                <FeatureSection
                    id="championship-trophy"
                    title="The Prize"
                    subtitle="Championship trophy"
                    features={[trophyFeature]}
                    labels={{
                        specIndex: 'TRP',
                        statsLabel: 'INFO',
                        ctaLabel: 'VIEW',
                    }}
                    columns={2}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="championship-history"
                    title="History"
                    subtitle="The story of this championship"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'SEC',
                        progressLabel: 'PROG',
                        statusComplete: 'DONE',
                    }}
                    variant="reveal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="championship-gallery"
                    title="Gallery"
                    subtitle="Moments from the championship"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                    ctaLabel="View Full Details"
                    ctaPath={`/calendar/championships/${championship.slug}/details`}
                />
            )}
        </main>
    )
}