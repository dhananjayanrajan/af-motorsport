// app/(app)/teams/[slug]/leaders/[leaderSlug]/page.tsx
import CoverSection from '@/components/Section/Blocks/CoverSection'
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ShortsSection from '@/components/Section/Blocks/ShortsSection'
import { Award, Celebration, Designation, Media } from '@/payload-types'
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
            depth: 2,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: {
                    title: true,
                    nationality: true,
                    nickname: true,
                },
                details: {
                    mission: true,
                    vision: true,
                    quote: true,
                    awards: true,
                    designations: true,
                    socials: { list: true },
                    websites: { list: true },
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
    ['leader-profile'],
    { revalidate: 3600, tags: ['leader'] }
)

const getLeaderCelebrations = unstable_cache(
    async (leaderId: number) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'celebrations',
            where: { 'details.leaders': { in: [leaderId] } },
            limit: 8,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                assets: { video: true, thumbnail: true },
            },
        })
        return result.docs as Celebration[]
    },
    ['leader-celebrations'],
    { revalidate: 3600 }
)

export default async function LeaderPage({ params }: { params: Promise<{ slug: string; leaderSlug: string }> }) {
    const { slug: teamSlug, leaderSlug } = await params
    const leader = await getLeaderData(leaderSlug)

    if (!leader) notFound()

    const leaderFullName = `${leader.first_name || ''} ${leader.last_name || ''}`.trim() || 'Unnamed Leader'

    const celebrations = await getLeaderCelebrations(leader.id)

    const coverImage = getMediaUrl(leader.assets?.cover) || getMediaUrl(leader.assets?.avatar) || `https://picsum.photos/seed/${leader.slug}/1920/1080`

    const quoteItem = leader.details?.quote
        ? {
            id: String(leader.id),
            text: leader.details.quote,
            author: leaderFullName,
        }
        : null

    const missionVisionFeatures = [
        {
            id: `mission-${leader.id}`,
            title: 'Mission',
            description: leader.details?.mission || '',
            image: getMediaUrl(leader.assets?.avatar) || `https://picsum.photos/seed/${leader.slug}-mission/800/600`,
            slug: undefined,
            stats: [
                { label: 'Vision', value: leader.details?.vision || 'N/A' },
            ],
        },
        {
            id: `vision-${leader.id}`,
            title: 'Vision',
            description: leader.details?.vision || '',
            image: getMediaUrl(leader.assets?.cover) || `https://picsum.photos/seed/${leader.slug}-vision/800/600`,
            slug: `/teams/${teamSlug}/leaders/${leader.slug}/details`,
            stats: [
                { label: 'Title', value: leader.basics?.title || 'N/A' },
            ],
        },
    ]

    const awardEntries: any[] = []
    if (leader.details?.awards) {
        leader.details.awards.forEach((awardRef) => {
            const award = awardRef as Award
            if (award && typeof award === 'object' && 'name' in award) {
                awardEntries.push({
                    id: `awd-${award.id}`,
                    title: award.name,
                    subtitle: award.details?.awarded_date || award.basics?.description || undefined,
                    tag: 'AWD',
                })
            }
        })
    }

    const designationInfoCards: any[] = []
    if (leader.details?.designations) {
        leader.details.designations.forEach((designationRef, idx) => {
            const designation = designationRef as Designation
            if (designation && typeof designation === 'object' && 'name' in designation) {
                designationInfoCards.push({
                    id: `des-${designation.id || idx}`,
                    label: designation.name,
                    value: designation.basics?.description || '',
                    emphasis: idx === 0 ? 'high' as const : 'medium' as const,
                })
            }
        })
    }

    const galleryItems: any[] = []
    if (leader.assets?.gallery) {
        const gallery = Array.isArray(leader.assets.gallery) ? leader.assets.gallery : []
        gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: `gal-${media.id}`,
                    title: media.alt || leaderFullName,
                    image: url,
                    category: `IMG_${String(idx + 1).padStart(2, '0')}`,
                    description: undefined,
                })
            }
        })
    }

    const panelData: any[] = []
    if (leader.details?.socials?.list) {
        leader.details.socials.list.forEach((social) => {
            if (social.platform && social.username) {
                panelData.push({
                    id: social.id || `social-${social.platform}-${social.username}`,
                    title: social.platform,
                    summary: `@${social.username}`,
                    content: social.description || `Follow ${leaderFullName} on ${social.platform}`,
                    metadata: { platform: social.platform, username: social.username },
                })
            }
        })
    }
    if (leader.details?.websites?.list) {
        leader.details.websites.list.forEach((website) => {
            if (website.name && website.path) {
                panelData.push({
                    id: website.id || `website-${website.name}`,
                    title: website.name,
                    summary: website.path,
                    content: website.description || `Visit ${leaderFullName}'s ${website.name}`,
                    metadata: { name: website.name, path: website.path },
                })
            }
        })
    }

    const shortItems: any[] = []
    celebrations.forEach((celebration) => {
        if (celebration.assets?.video) {
            const videoMedia = typeof celebration.assets.video === 'object' ? celebration.assets.video : null
            const posterUrl = celebration.assets?.thumbnail
                ? getMediaUrl(celebration.assets.thumbnail)
                : undefined
            if (videoMedia?.url) {
                shortItems.push({
                    id: `cel-video-${celebration.id}`,
                    title: celebration.name || '',
                    videoUrl: videoMedia.url,
                    poster: posterUrl,
                    category: 'CELEBRATION',
                })
            }
        }
    })

    return (
        <main className="w-full">
            <CoverSection
                id="leader-cover"
                image={coverImage}
            />
            {quoteItem && (
                <QuoteSection
                    id="leader-quote"
                    title={leaderFullName}
                    subtitle={leader.basics?.title || ''}
                    quotes={[quoteItem]}
                    labels={{ commStatus: 'COMM', ratingLabel: 'RATING' }}
                    variant="carousel"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <FeatureSection
                id="leader-mission-vision"
                title="Mission & Vision"
                subtitle="Core objectives"
                features={missionVisionFeatures}
                labels={{
                    specIndex: 'LDR',
                    statsLabel: 'INFO',
                    ctaLabel: 'VIEW FULL DETAILS',
                }}
                ctaPath={`/teams/${teamSlug}/leaders/${leader.slug}/details`}
                headerVariant={2}
                footerVariant={1}
            />
            {awardEntries.length > 0 && (
                <ListSection
                    id="leader-awards"
                    title="Awards"
                    subtitle="Career honors"
                    entries={awardEntries}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'ID',
                        indexPrefix: 'AWD',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {designationInfoCards.length > 0 && (
                <InfoSection
                    id="leader-designations"
                    title="Designations"
                    subtitle="Formal titles and roles"
                    cards={designationInfoCards}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <GallerySection
                    id="leader-gallery"
                    title="Gallery"
                    subtitle="Professional imagery"
                    items={galleryItems}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {panelData.length > 0 && (
                <PanelSection
                    id="leader-connect"
                    title="Connect"
                    subtitle="Social media and websites"
                    panels={panelData}
                    labels={{
                        expansionState: { open: 'ACTIVE', closed: 'CLOSED' },
                        metadataTitle: 'DETAILS',
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {shortItems.length > 0 && (
                <ShortsSection
                    id="leader-shorts"
                    title="Highlights"
                    subtitle="Speeches and milestones"
                    items={shortItems}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}