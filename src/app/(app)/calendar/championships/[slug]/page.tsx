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
                    winner: true,
                    runner_up: true,
                    third_place: true,
                    season: true,
                    series: true,
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

    const details = championship.details

    const videoItems: any[] = []
    if (championship.assets?.video) {
        const videoUrl = getMediaUrl(championship.assets.video)
        if (videoUrl) {
            videoItems.push({
                id: String(championship.id),
                title: championship.name,
                description: championship.basics?.tagline || championship.basics?.description || undefined,
                url: videoUrl,
                poster: resolveAssetUrl(championship.assets, 'thumbnail', 'cover'),
                duration: details?.start_date
                    ? new Date(details.start_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                    })
                    : undefined,
            })
        }
    }

    const studyImage = resolveAssetUrl(championship.assets, 'cover', 'thumbnail')

    const seasonRef = details?.season
    const seasonName =
        seasonRef && typeof seasonRef === 'object' && 'name' in seasonRef
            ? (seasonRef as any).name
            : undefined

    const seriesRef = details?.series
    const seriesName =
        seriesRef && typeof seriesRef === 'object' && 'name' in seriesRef
            ? (seriesRef as any).name
            : undefined

    const formatDisplay = details?.format
        ? details.format.replace(/_/g, ' ').toUpperCase()
        : undefined

    const scopeDisplay = details?.standings_scope
        ? details.standings_scope.replace(/_/g, ' ').toUpperCase()
        : undefined

    const startDate = details?.start_date
        ? new Date(details.start_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : undefined

    const endDate = details?.end_date
        ? new Date(details.end_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : undefined

    const winnerRef = details?.winner
    const winnerName =
        winnerRef && typeof winnerRef === 'object' && 'first_name' in winnerRef && 'last_name' in winnerRef
            ? `${(winnerRef as any).first_name} ${(winnerRef as any).last_name}`
            : undefined

    const study = {
        id: String(championship.id),
        title: championship.name,
        description: championship.basics?.description || championship.basics?.tagline || '',
        image: studyImage || '',
        metrics: [
            ...(formatDisplay ? [{ label: 'Format', value: formatDisplay }] : []),
            ...(scopeDisplay ? [{ label: 'Standings', value: scopeDisplay }] : []),
            ...(seasonName ? [{ label: 'Season', value: seasonName }] : []),
            ...(seriesName ? [{ label: 'Series', value: seriesName }] : []),
            ...(startDate ? [{ label: 'Started', value: startDate }] : []),
            ...(endDate ? [{ label: 'Ends', value: endDate }] : []),
            ...(winnerName ? [{ label: 'Champion', value: winnerName }] : []),
        ],
        tags: [formatDisplay, scopeDisplay].filter((t): t is string => typeof t === 'string'),
        ctaLabel: 'Full Details',
        ctaHref: `/calendar/championships/${championship.slug}/details`,
    }

    const trophyFeature = championship.assets?.trophy
        ? {
            id: 'championship-trophy',
            title: championship.name,
            description: winnerName
                ? `Awarded to ${winnerName}`
                : championship.basics?.tagline || 'Championship trophy',
            image: getMediaUrl(championship.assets.trophy) || '',
            slug: `calendar/championships/${championship.slug}/details`,
            stats: [] as { label: string; value: string }[],
        }
        : null

    const scrollItems: any[] = []
    if (details?.history) {
        const historyRoot = (details.history as any)?.root
        const textContent = historyRoot?.children
            ?.map((child: any) => child?.text || '')
            .join(' ')
            .trim()

        scrollItems.push({
            id: 'championship-history-overview',
            title: 'Origins',
            description: textContent
                ? textContent.slice(0, 200) + (textContent.length > 200 ? '...' : '')
                : `The history of the ${championship.name} championship.`,
            image: resolveAssetUrl(championship.assets, 'cover', 'thumbnail'),
            percentage: startDate && endDate ? 100 : startDate ? 50 : 0,
        })
    }
    if (details?.start_date && details?.end_date) {
        scrollItems.push({
            id: 'championship-duration',
            title: 'Championship Duration',
            description: `From ${startDate} to ${endDate}`,
            percentage: 100,
        })
    }

    const galleryItems: any[] = []
    if (championship.assets?.gallery && Array.isArray(championship.assets.gallery)) {
        championship.assets.gallery.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                const alt = typeof item === 'object' && item.alt ? item.alt : undefined
                const filename = typeof item === 'object' && item.filename ? item.filename : undefined
                galleryItems.push({
                    id: String(typeof item === 'object' ? item.id : `gallery-${idx}`),
                    title: alt || filename || `${championship.name} — Image ${idx + 1}`,
                    image: url,
                    category: alt?.split(' ')[0] || undefined,
                    description: alt || undefined,
                    height: (idx % 3 === 0 ? 'tall' : idx % 2 === 0 ? 'medium' : 'short') as 'tall' | 'medium' | 'short',
                })
            }
        })
    }

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="championship-video"
                    title="Broadcast"
                    subtitle={`Highlights and coverage for the ${championship.name}`}
                    videos={videoItems}
                    labels={{
                        channelPrefix: 'CH',
                        broadcastStatus: 'RECORDED',
                        liveFeed: 'FEED',
                        metaTransmission: 'TRANSMISSION',
                    }}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}

            <StudySection
                id="championship-details"
                title="Overview"
                subtitle={`Championship specifications and current standings for ${championship.name}`}
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />

            {trophyFeature && (
                <FeatureSection
                    id="championship-trophy"
                    title="Trophy"
                    subtitle="Championship award and recognition"
                    features={[trophyFeature]}
                    labels={{
                        specIndex: 'TRP',
                        statsLabel: 'AWARD',
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
                    subtitle="Championship legacy and timeline"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'CHAPTER',
                        progressLabel: 'Coverage',
                        statusComplete: 'Complete',
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
                    subtitle={`Photo collection from the ${championship.name}`}
                    items={galleryItems}
                    labels={{
                        categoryPrefix: '',
                        idPrefix: '',
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