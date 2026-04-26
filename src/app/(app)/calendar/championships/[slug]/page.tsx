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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getChampionshipData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'championships',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    tagline: true,
                },
                assets: {
                    video: true,
                    thumbnail: true,
                    cover: true,
                    trophy: true,
                    gallery: true,
                },
                details: {
                    format: true,
                    standings_scope: true,
                    start_date: true,
                    end_date: true,
                    history: true,
                },
            },
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
                title: championship.name.toUpperCase(),
                description: championship.basics?.tagline || undefined,
                url: videoUrl,
                poster: resolveAssetUrl(championship.assets, 'thumbnail', 'cover'),
            })
        }
    }

    const studyImage = resolveAssetUrl(championship.assets, 'cover', 'thumbnail')

    const study = {
        id: String(championship.id),
        title: championship.name,
        description: championship.basics?.description || championship.basics?.tagline || '',
        image: studyImage || '',
        metrics: [
            { label: 'FORMAT', value: championship.details?.format || 'N/A' },
            { label: 'SCOPE', value: championship.details?.standings_scope || 'N/A' },
            { label: 'INITIALIZED', value: championship.details?.start_date ? new Date(championship.details.start_date).toISOString().split('T')[0] : 'TBD' },
            { label: 'CONCLUDED', value: championship.details?.end_date ? new Date(championship.details.end_date).toISOString().split('T')[0] : 'TBD' },
        ],
    }

    const trophyFeature = championship.assets?.trophy
        ? {
            id: 'trophy',
            title: 'TROPHY_SPEC',
            description: 'The primary achievement credential awarded to the series victor.',
            image: getMediaUrl(championship.assets.trophy) || '',
        }
        : null

    const scrollItems: any[] = []
    if (championship.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'CHRONOLOGY',
            description: 'Comprehensive archival data documenting the evolution of this racing series.',
            percentage: 100,
        })
    }

    const galleryItems: any[] = []
    if (championship.assets?.gallery && Array.isArray(championship.assets.gallery)) {
        championship.assets.gallery.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                galleryItems.push({
                    id: String(typeof item === 'object' ? item.id : idx),
                    title: (typeof item === 'object' && item.alt) || championship.name,
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
                    title="BROADCAST"
                    subtitle="Visual telemetry and highlight feeds"
                    videos={videoItems}
                    labels={{
                        channelPrefix: 'CH',
                        broadcastStatus: 'REC',
                        liveFeed: 'LIVE',
                        metaTransmission: 'ENC',
                    }}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="championship-details"
                title="SPECIFICATIONS"
                subtitle="Technical series data and operational parameters"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {trophyFeature && (
                <FeatureSection
                    id="championship-trophy"
                    title="ACHIEVEMENT"
                    subtitle="Championship accolade specifications"
                    features={[trophyFeature]}
                    labels={{
                        specIndex: 'TRP',
                        statsLabel: 'DATA',
                        ctaLabel: 'SCAN',
                    }}
                    columns={2}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="championship-history"
                    title="ARCHIVE"
                    subtitle="Historical performance documentation"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'LOG',
                        progressLabel: 'DATA',
                        statusComplete: 'SYNC',
                    }}
                    variant="reveal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="championship-gallery"
                    title="MEDIA"
                    subtitle="Documented visual intelligence"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'TYPE',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                    ctaLabel="VIEW FULL PARAMETERS"
                    ctaPath={`/calendar/championships/${championship.slug}/details`}
                />
            )}
        </main>
    )
}