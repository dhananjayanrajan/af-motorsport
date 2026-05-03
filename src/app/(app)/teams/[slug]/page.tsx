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

const getTeamData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'teams',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
        })
        const team = result.docs[0] as Team | null
        if (!team) return null

        const categoryIds = team.categories?.map(cat => typeof cat === 'object' ? cat.id : cat) || []

        const [driversRes, leadersRes] = await Promise.all([
            payload.find({
                collection: 'drivers',
                where: categoryIds.length
                    ? { categories: { in: categoryIds } }
                    : { id: { equals: '' } },
                limit: 8,
                depth: 1,
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    slug: true,
                    basics: {
                        racing_number: true,
                        nickname: true,
                        competition_name: true,
                        nationality: true,
                        callsign: true,
                        catchphrase: true,
                        birth_date: true,
                    },
                    assets: { avatar: true, cover: true },
                },
            }),
            payload.find({
                collection: 'leaders',
                where: categoryIds.length
                    ? { categories: { in: categoryIds } }
                    : { id: { equals: '' } },
                limit: 8,
                depth: 1,
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    slug: true,
                    basics: { title: true, nationality: true, nickname: true },
                    details: { mission: true, vision: true, quote: true },
                    assets: { avatar: true, cover: true },
                },
            }),
        ])

        return {
            team,
            drivers: driversRes.docs as Driver[],
            leaders: leadersRes.docs as Leader[],
        }
    },
    ['team-detail-composite'],
    { revalidate: 3600, tags: ['team', 'team-detail'] }
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

    const countryName = team.details?.country && typeof team.details.country === 'object' && 'name' in team.details.country
        ? team.details.country.name
        : undefined

    const actions: { label: string; href: string; variant?: 'primary' | 'secondary' | 'outline' }[] = []
    if (drivers.length > 0) {
        actions.push({ label: 'DRIVERS', href: `/teams/${team.slug}/drivers`, variant: 'primary' })
    }
    if (leaders.length > 0) {
        actions.push({ label: 'LEADERS', href: `/teams/${team.slug}/leaders`, variant: 'outline' })
    }

    const studyImage = getMediaUrl(team.assets?.cover) ||
        getMediaUrl(team.assets?.logo) ||
        `https://picsum.photos/seed/${team.slug}/800/600`

    const study = {
        id: String(team.id),
        title: team.name,
        description: team.basics?.description || '',
        image: studyImage,
        metrics: [
            { label: 'Founded', value: team.details?.start_date || 'N/A' },
            { label: 'Country', value: countryName || 'N/A' },
            { label: 'Website', value: team.details?.website || 'N/A' },
        ],
        tags: team.tags?.map(tag => typeof tag === 'object' ? tag.name || tag.slug || '' : '').filter(Boolean) || [],
    }

    const quoteItem = team.basics?.tagline
        ? {
            id: String(team.id),
            text: team.basics.tagline,
            author: team.name,
        }
        : null

    const driverFeatures = drivers.map((driver) => {
        const nationality = driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality
            ? driver.basics.nationality.name
            : ''
        return {
            id: String(driver.id),
            title: `${driver.first_name} ${driver.last_name}`,
            description: driver.basics?.catchphrase || driver.basics?.nickname || driver.basics?.competition_name || '',
            image: driver.assets?.avatar ? getMediaUrl(driver.assets.avatar) : undefined,
            slug: `teams/${team.slug}/drivers/${driver.slug}`,
            stats: [
                { label: 'Number', value: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : 'N/A' },
                { label: 'Nationality', value: nationality },
                { label: 'Born', value: driver.basics?.birth_date || 'N/A' },
            ],
        }
    })

    const leaderFeatures = leaders.map((leader) => {
        const nationality = leader.basics?.nationality && typeof leader.basics.nationality === 'object' && 'name' in leader.basics.nationality
            ? leader.basics.nationality.name
            : ''
        return {
            id: String(leader.id),
            title: `${leader.first_name} ${leader.last_name}`,
            description: leader.details?.quote || leader.details?.mission || leader.basics?.title || '',
            image: leader.assets?.avatar ? getMediaUrl(leader.assets.avatar) : undefined,
            slug: `teams/${team.slug}/leaders/${leader.slug}`,
            stats: [
                { label: 'Title', value: leader.basics?.title || 'N/A' },
                { label: 'Nationality', value: nationality },
            ],
        }
    })

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
                    category: `IMG_${String(idx + 1).padStart(2, '0')}`,
                    description: extractPlainText(media.caption) || undefined,
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
                meta={countryName}
                alignment="left"
                actions={actions}
            />
            <StudySection
                id="team-overview"
                title="Team Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {quoteItem && (
                <QuoteSection
                    id="team-tagline"
                    title="Team Tagline"
                    subtitle={team.name}
                    quotes={[quoteItem]}
                    labels={{ commStatus: 'COMM', ratingLabel: 'RATING' }}
                    variant="carousel"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {team.details?.history && (
                <TextRevealSection
                    id="team-history"
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