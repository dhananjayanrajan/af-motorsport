// app/(frontend)/teams/[teamSlug]/leaders/[leaderSlug]/page.tsx
import CoverSection from '@/components/Section/Blocks/CoverSection'
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import ShortsSection from '@/components/Section/Blocks/ShortsSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Celebration, Interview, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getLeaderData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'leaders',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: {
                    title: true,
                    nationality: true,
                    debut_date: true,
                },
                details: {
                    mission: true,
                    biography: true,
                    history: true,
                },
                assets: {
                    avatar: true,
                    cover: true,
                    gallery: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['leader-detail'],
    { revalidate: 3600, tags: ['leader'] }
)

const getCelebrations = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'celebrations',
            limit: 8,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                },
                assets: {
                    thumbnail: true,
                },
            },
        })
        return result.docs as Celebration[]
    },
    ['celebrations-leader'],
    { revalidate: 3600 }
)

const getInterviews = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'interviews',
            limit: 8,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    summary: true,
                    tagline: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs as Interview[]
    },
    ['interviews-leader'],
    { revalidate: 3600 }
)

export default async function LeaderPage({ params }: { params: Promise<{ teamSlug: string; leaderSlug: string }> }) {
    const { teamSlug, leaderSlug } = await params

    const [leader, celebrations, interviews] = await Promise.all([
        getLeaderData(leaderSlug),
        getCelebrations(),
        getInterviews(),
    ])

    if (!leader) notFound()

    const leaderFullName = `${leader.first_name || ''} ${leader.last_name || ''}`.trim() || 'Unnamed Leader'

    const coverImage = getMediaUrl(leader.assets?.cover) ||
        getMediaUrl(leader.assets?.avatar) ||
        `https://picsum.photos/seed/${leader.slug}/1920/1080`

    const videoItems: any[] = []

    const heroBackgroundImage = leader.assets?.cover
        ? getMediaUrl(leader.assets.cover)
        : leader.assets?.avatar
            ? getMediaUrl(leader.assets.avatar)
            : undefined

    const studyImage = leader.assets?.avatar
        ? getMediaUrl(leader.assets.avatar)
        : leader.assets?.cover
            ? getMediaUrl(leader.assets.cover)
            : undefined

    const study = {
        id: String(leader.id),
        title: leaderFullName,
        description: leader.basics?.title || leader.details?.mission || '',
        image: studyImage || `https://picsum.photos/seed/${leader.slug}/800/600`,
        metrics: [
            { label: 'Title', value: leader.basics?.title || 'N/A' },
            { label: 'Nationality', value: leader.basics?.nationality && typeof leader.basics.nationality === 'object' && 'name' in leader.basics.nationality ? leader.basics.nationality.name : 'N/A' },
            { label: 'Joined', value: leader.basics?.debut_date || 'N/A' },
        ],
    }

    const autographFeatures: any[] = []

    const scrollItems: any[] = []
    if (leader.details?.biography) {
        scrollItems.push({
            id: 'biography',
            title: 'Biography',
            description: 'Leadership background and career highlights.',
            percentage: 100,
        })
    }
    if (leader.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'History',
            description: leader.details.history,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (leader.assets?.gallery) {
        leader.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || leaderFullName,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }
    if (galleryItems.length === 0 && leader.assets?.cover) {
        const url = getMediaUrl(leader.assets.cover)
        if (url) {
            galleryItems.push({
                id: String(leader.id),
                title: leaderFullName,
                image: url,
                height: 'medium' as const,
            })
        }
    }

    const celebrationItems: any[] = celebrations.map((celebration: Celebration) => {
        const imageUrl = celebration.assets?.thumbnail
            ? getMediaUrl(celebration.assets.thumbnail)
            : `https://picsum.photos/seed/${celebration.id}/1200/800`

        return {
            id: String(celebration.id),
            title: celebration.name,
            description: celebration.basics?.description || undefined,
            image: imageUrl,
            category: 'CELEBRATION',
        }
    })

    const interviewItems: any[] = interviews.map((interview: Interview) => {
        const posterUrl = interview.assets?.thumbnail
            ? getMediaUrl(interview.assets.thumbnail)
            : interview.assets?.cover
                ? getMediaUrl(interview.assets.cover)
                : undefined

        return {
            id: String(interview.id),
            title: interview.name,
            videoUrl: '',
            poster: posterUrl,
            category: 'INTERVIEW',
        }
    }).filter(item => item.videoUrl)

    return (
        <main className="w-full">
            <HeroSection
                id="leader-hero"
                title={leaderFullName}
                subtitle={leader.basics?.title || ''}
                description={leader.details?.mission || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                meta={leader.basics?.nationality && typeof leader.basics.nationality === 'object' && 'name' in leader.basics.nationality ? leader.basics.nationality.name : undefined}
            />
            <CoverSection
                id="leader-cover"
                image={coverImage}
            />
            {videoItems.length > 0 && (
                <VideoSection
                    id="leader-video"
                    title="Leader Highlights"
                    subtitle={leaderFullName}
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
                id="leader-details"
                title="Leader Profile"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/teams/${teamSlug}/leaders/${leader.slug}/details`}
            />
            {autographFeatures.length > 0 && (
                <FeatureSection
                    id="leader-autograph"
                    title="Autograph"
                    subtitle="Official signature"
                    features={autographFeatures}
                    labels={{
                        specIndex: 'AUT',
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
                    id="leader-history"
                    title="History"
                    subtitle="Career background"
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
                    id="leader-gallery"
                    title="Gallery"
                    subtitle="Leader imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {celebrationItems.length > 0 && (
                <GallerySection
                    id="leader-celebrations"
                    title="Celebrations"
                    subtitle="Career highlights"
                    items={celebrationItems}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <ShortsSection
                id="leader-interviews"
                title="Interviews"
                subtitle="Media appearances"
                items={interviewItems}
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}