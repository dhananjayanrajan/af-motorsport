// app/(frontend)/teams/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import TextRevealSection from '@/components/Section/Blocks/TextRevealSection'
import { Driver, Leader, Media, Team } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getTeamData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'teams',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        const team = result.docs[0] as Team | null
        if (!team) return null

        const categoryIds = team.categories?.map(cat => typeof cat === 'object' ? cat.id : cat) || []

        const [driversRes, leadersRes] = await Promise.all([
            payload.find({
                collection: 'drivers',
                where: categoryIds.length ? { categories: { in: categoryIds } } : {},
                limit: 20,
                select: { id: true, first_name: true, last_name: true, slug: true, basics: true, assets: true },
            }),
            payload.find({
                collection: 'leaders',
                where: categoryIds.length ? { categories: { in: categoryIds } } : {},
                limit: 20,
                select: { id: true, first_name: true, last_name: true, slug: true, basics: true, assets: true, details: { quote: true, vision: true, mission: true } },
            }),
        ])

        const drivers = driversRes.docs as Driver[]
        const leaders = leadersRes.docs as Leader[]

        return { team, drivers, leaders }
    },
    ['team-detail-composite'],
    { revalidate: 3600, tags: ['team'] }
)

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getTeamData(slug)

    if (!data) notFound()

    const { team, drivers, leaders } = data

    const heroBackground = team.assets?.cover
        ? getMediaUrl(team.assets.cover)
        : team.assets?.logo
            ? getMediaUrl(team.assets.logo)
            : undefined

    const quoteItem = team.basics?.tagline
        ? {
            id: String(team.id),
            text: team.basics.tagline,
            author: team.name,
        }
        : null

    const studyImage = team.assets?.cover
        ? getMediaUrl(team.assets.cover)
        : team.assets?.logo
            ? getMediaUrl(team.assets.logo)
            : undefined

    const study = {
        id: String(team.id),
        title: team.name,
        description: team.basics?.description || '',
        image: studyImage || `https://picsum.photos/seed/${team.slug}/800/600`,
        metrics: [
            { label: 'Founded', value: team.details?.start_date || 'N/A' },
            { label: 'Country', value: team.details?.country && typeof team.details.country === 'object' && 'name' in team.details.country ? team.details.country.name : 'N/A' },
            { label: 'Website', value: team.details?.website || 'N/A' },
        ],
        tags: team.tags?.map(tag => typeof tag === 'object' ? tag.name || tag.slug || '' : '').filter(Boolean) || [],
    }

    const driverFeatures = drivers.slice(0, 8).map((driver: Driver) => ({
        id: String(driver.id),
        title: `${driver.first_name} ${driver.last_name}`,
        description: driver.basics?.nickname || driver.basics?.competition_name || '',
        icon: undefined,
        image: driver.assets?.avatar ? getMediaUrl(driver.assets.avatar) : undefined,
        slug: `teams/${team.slug}/drivers/${driver.slug}`,
        stats: driver.basics?.racing_number
            ? [
                { label: 'Number', value: `#${driver.basics.racing_number}` },
                { label: 'Nationality', value: driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality ? driver.basics.nationality.name : 'N/A' },
            ]
            : undefined,
    }))

    const leaderFeatures = leaders.slice(0, 8).map((leader: Leader) => ({
        id: String(leader.id),
        title: `${leader.first_name} ${leader.last_name}`,
        description: leader.basics?.title || leader.details?.vision || '',
        icon: undefined,
        image: leader.assets?.avatar ? getMediaUrl(leader.assets.avatar) : undefined,
        slug: `teams/${team.slug}/leaders/${leader.slug}`,
        stats: leader.details?.mission
            ? [
                { label: 'Role', value: leader.basics?.title || 'N/A' },
                { label: 'Vision', value: leader.details?.vision || 'N/A' },
            ]
            : undefined,
    }))

    const galleryItems: any[] = []
    if (team.assets?.gallery) {
        team.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || team.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="team-hero"
                title={team.name}
                subtitle={team.basics?.tagline || ''}
                description={team.basics?.description || undefined}
                backgroundImage={heroBackground}
                badge={team.alias || undefined}
                meta={team.details?.country && typeof team.details.country === 'object' && 'name' in team.details.country ? team.details.country.name : undefined}
                alignment="left"
            />
            {quoteItem && (
                <QuoteSection
                    id="team-tagline"
                    title="Team Tagline"
                    subtitle={team.name}
                    quotes={[quoteItem]}
                    labels={{ commStatus: 'COMM', ratingLabel: 'RATING' }}
                    variant="grid"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="team-details"
                title="Team Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="VIEW DETAILS"
                ctaPath={`/teams/${team.slug}/details`}
            />
            {team.details?.history && (
                <TextRevealSection
                    id="team-history-text"
                    title={team.name}
                    subtitle="History"
                    content={team.details.history}
                />
            )}
            {driverFeatures.length > 0 && (
                <FeatureSection
                    id="team-drivers"
                    title="Team Drivers"
                    subtitle="Meet the drivers"
                    features={driverFeatures}
                    labels={{
                        specIndex: 'DRV',
                        statsLabel: 'STATS',
                        ctaLabel: 'VIEW DRIVER',
                    }}
                    columns={2}
                    ctaPath={`/teams/${team.slug}/drivers`}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {leaderFeatures.length > 0 && (
                <FeatureSection
                    id="team-leaders"
                    title="Leadership"
                    subtitle="Team management"
                    features={leaderFeatures}
                    labels={{
                        specIndex: 'LDR',
                        statsLabel: 'STATS',
                        ctaLabel: 'VIEW LEADER',
                    }}
                    columns={2}
                    ctaPath={`/teams/${team.slug}/leaders`}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="team-gallery"
                    title="Gallery"
                    subtitle="Team imagery"
                    items={galleryItems}
                    labels={{ categoryPrefix: 'CAT', idPrefix: 'IMG' }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}