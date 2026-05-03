// app/(app)/teams/[slug]/drivers/[driverSlug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import LeaderboardSection from '@/components/Section/Blocks/LeaderboardSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ShortsSection from '@/components/Section/Blocks/ShortsSection'
import { Media, Race, Result } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

function extractPlainText(content: any): string {
    if (!content) return ''
    if (typeof content === 'string') return content
    if (typeof content === 'object' && 'root' in content && content.root?.children) {
        const parts: string[] = []
        for (const child of content.root.children) {
            if (child?.children) {
                for (const c of child.children) {
                    if (c?.text) parts.push(c.text)
                }
            }
        }
        return parts.join(' ').replace(/\s+/g, ' ').trim()
    }
    return ''
}

const getDriverData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'drivers',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                alias: true,
                slug: true,
                basics: {
                    racing_number: true,
                    nationality: true,
                    callsign: true,
                    catchphrase: true,
                    nickname: true,
                    competition_name: true,
                },
                assets: {
                    avatar: true,
                    cover: true,
                    autograph: true,
                    gallery: true,
                },
                details: {
                    results: true,
                    points: true,
                    awards: true,
                    socials: { list: true },
                    websites: { list: true },
                },
            },
        })
        return result.docs[0] || null
    },
    ['driver-profile'],
    { revalidate: 3600, tags: ['driver'] }
)

const getDriverRaces = unstable_cache(
    async (driverId: number) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'races',
            where: { 'details.winner': { equals: driverId } },
            limit: 8,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                assets: { highlights: true, video: true },
            },
        })
        return result.docs as Race[]
    },
    ['driver-races'],
    { revalidate: 3600 }
)

export default async function DriverPage({ params }: { params: Promise<{ slug: string; driverSlug: string }> }) {
    const { slug: teamSlug, driverSlug } = await params
    const driver = await getDriverData(driverSlug)

    if (!driver) notFound()

    const driverFullName = [driver.first_name, driver.middle_name, driver.last_name].filter(Boolean).join(' ')

    const races = await getDriverRaces(driver.id)

    const nationalityName = driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality
        ? (driver.basics.nationality.name ?? undefined)
        : undefined

    const heroBackgroundImage = getMediaUrl(driver.assets?.avatar) || getMediaUrl(driver.assets?.cover)

    const quoteItem = driver.basics?.catchphrase
        ? {
            id: String(driver.id),
            text: driver.basics.catchphrase,
            author: driver.basics?.callsign || driver.basics?.nickname || driverFullName,
        }
        : null

    const autographFeature = driver.assets?.autograph
        ? [{
            id: String(driver.id),
            title: driverFullName,
            description: driver.basics?.competition_name || '',
            image: getMediaUrl(driver.assets.autograph),
            slug: undefined,
            stats: [
                { label: 'Number', value: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : 'N/A' },
            ],
        }]
        : []

    const leaderboardEntries: any[] = []
    if (driver.details?.results) {
        driver.details.results.forEach((resultRef, idx) => {
            const result = resultRef as Result
            if (result && typeof result === 'object' && 'name' in result) {
                const pointsRef = driver.details?.points?.[idx] as any
                const awardRef = driver.details?.awards?.[idx] as any
                leaderboardEntries.push({
                    id: `result-${result.id}`,
                    position: result.details?.overall || 0,
                    name: result.name,
                    team: result.details?.status || undefined,
                    points: pointsRef && typeof pointsRef === 'object' && 'details' in pointsRef
                        ? (pointsRef.details?.value ?? undefined)
                        : undefined,
                    image: awardRef && typeof awardRef === 'object' && awardRef.assets?.thumbnail
                        ? getMediaUrl(awardRef.assets.thumbnail)
                        : undefined,
                    slug: undefined,
                })
            }
        })
    }

    const galleryItems: any[] = []
    if (driver.assets?.gallery?.list) {
        driver.assets.gallery.list.forEach((item, idx) => {
            const media = typeof item.image === 'object' ? item.image : null
            const url = getMediaUrl(media)
            if (url && media) {
                galleryItems.push({
                    id: item.id || `gallery-${idx}`,
                    title: extractPlainText(item.caption) || media.alt || driverFullName,
                    image: url,
                    category: `IMG_${String(idx + 1).padStart(2, '0')}`,
                    description: extractPlainText(item.caption) || undefined,
                })
            }
        })
    }

    const panelData: any[] = []
    if (driver.details?.socials?.list) {
        driver.details.socials.list.forEach((social) => {
            if (social.platform && social.username) {
                panelData.push({
                    id: social.id || `social-${social.platform}-${social.username}`,
                    title: social.platform,
                    summary: `@${social.username}`,
                    content: social.description || `Follow ${driverFullName} on ${social.platform}`,
                    metadata: { platform: social.platform, username: social.username },
                })
            }
        })
    }
    if (driver.details?.websites?.list) {
        driver.details.websites.list.forEach((website) => {
            if (website.name && website.path) {
                panelData.push({
                    id: website.id || `website-${website.name}`,
                    title: website.name,
                    summary: website.path,
                    content: website.description || `Visit ${driverFullName}'s ${website.name}`,
                    metadata: { name: website.name, path: website.path },
                })
            }
        })
    }

    const shortItems: any[] = []
    if (races.length > 0) {
        races.forEach((race) => {
            if (race.assets?.video) {
                const videoMedia = typeof race.assets.video === 'object' ? race.assets.video : null
                const posterMedia = race.assets?.highlights && race.assets.highlights.length > 0
                    ? typeof race.assets.highlights[0] === 'object' ? race.assets.highlights[0] : null
                    : null
                const videoUrl = videoMedia?.url || ''
                const posterUrl = posterMedia ? getMediaUrl(posterMedia) : undefined
                if (videoUrl) {
                    shortItems.push({
                        id: `race-video-${race.id}`,
                        title: race.name || '',
                        videoUrl,
                        poster: posterUrl,
                        category: 'RACE',
                    })
                }
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="driver-hero"
                title={driverFullName}
                subtitle={driver.basics?.nickname || driver.basics?.callsign || ''}
                description={`#${driver.basics?.racing_number || 'N/A'}${nationalityName ? ` · ${nationalityName}` : ''}`}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                badge={driver.alias || undefined}
                meta={nationalityName}
                actions={[
                    { label: 'FULL DETAILS', href: `/teams/${teamSlug}/drivers/${driver.slug}/details`, variant: 'primary' },
                ]}
            />
            {quoteItem && (
                <QuoteSection
                    id="driver-quote"
                    title={driverFullName}
                    subtitle={driver.basics?.callsign || driver.basics?.nickname || ''}
                    quotes={[quoteItem]}
                    labels={{ commStatus: 'COMM', ratingLabel: 'RATING' }}
                    variant="carousel"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {autographFeature.length > 0 && (
                <FeatureSection
                    id="driver-autograph"
                    title="Autograph"
                    subtitle="Official signature"
                    features={autographFeature}
                    labels={{
                        specIndex: 'AUT',
                        statsLabel: 'INFO',
                        ctaLabel: 'VIEW',
                    }}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {leaderboardEntries.length > 0 && (
                <LeaderboardSection
                    id="driver-leaderboard"
                    title="PERFORMANCE"
                    subtitle="Results and points"
                    entries={leaderboardEntries}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <GallerySection
                    id="driver-gallery"
                    title="Gallery"
                    subtitle="Driver imagery"
                    items={galleryItems}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {panelData.length > 0 && (
                <PanelSection
                    id="driver-connect"
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
                    id="driver-shorts"
                    title="Highlights"
                    subtitle="Race and event footage"
                    items={shortItems}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}