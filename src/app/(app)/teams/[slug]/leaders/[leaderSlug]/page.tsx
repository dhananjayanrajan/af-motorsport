// app/(frontend)/teams/[teamSlug]/leaders/[leaderSlug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
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
            select: {
                id: true,
                name: true,
                slug: true,
                basics: true,
                details: true,
                assets: true,
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
            select: {
                id: true,
                name: true,
                slug: true,
                basics: true,
                details: true,
                assets: true,
            },
        })
        return result.docs as Interview[]
    },
    ['interviews-leader'],
    { revalidate: 3600 }
)

export default async function LeaderPage({ params }: { params: Promise<{ teamSlug: string; leaderSlug: string }> }) {
    const { teamSlug, leaderSlug } = await params
    const leader = await getLeaderData(leaderSlug)

    if (!leader) notFound()

    const celebrations = await getCelebrations()
    const interviews = await getInterviews()

    const videoItems: any[] = []

    const studyImage = leader.assets?.avatar
        ? getMediaUrl(leader.assets.avatar)
        : leader.assets?.cover
            ? getMediaUrl(leader.assets.cover)
            : undefined

    const study = {
        id: String(leader.id),
        title: `${leader.first_name} ${leader.last_name}`,
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
                    title: media.alt || `${leader.first_name} ${leader.last_name}`,
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
                title: `${leader.first_name} ${leader.last_name}`,
                image: url,
                height: 'medium' as const,
            })
        }
    }

    const celebrationItems: any[] = celebrations.map((celebration: Celebration) => {
        const imageUrl = celebration.assets?.thumbnail
            ? getMediaUrl(celebration.assets.thumbnail)
            : `https://picsum.photos/seed/${celebration.id}/400/300`

        return {
            id: String(celebration.id),
            title: celebration.name,
            subtitle: celebration.basics?.description || undefined,
            image: imageUrl,
            href: `/celebrations/${celebration.slug}`,
        }
    })

    const interviewItems: any[] = interviews.map((interview: Interview) => {
        const imageUrl = interview.assets?.thumbnail
            ? getMediaUrl(interview.assets.thumbnail)
            : interview.assets?.cover
                ? getMediaUrl(interview.assets.cover)
                : `https://picsum.photos/seed/${interview.id}/400/300`

        return {
            id: String(interview.id),
            title: interview.name,
            subtitle: interview.basics?.summary || interview.basics?.tagline || undefined,
            image: imageUrl,
            href: `/interviews/${interview.slug}`,
        }
    })

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="leader-video"
                    title="Leader Highlights"
                    subtitle={`${leader.first_name} ${leader.last_name}`}
                    videos={videoItems}
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
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {celebrationItems.length > 0 && (
                <GridSection
                    id="leader-celebrations"
                    title="Celebrations"
                    subtitle="Career highlights"
                    items={celebrationItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {interviewItems.length > 0 && (
                <GridSection
                    id="leader-interviews"
                    title="Interviews"
                    subtitle="Media appearances"
                    items={interviewItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}