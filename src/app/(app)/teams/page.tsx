import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MarqueeSection from '@/components/Section/Blocks/MarqueeSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import { Individual, Media, Organization, Team } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getTeamsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [teams, individuals, organizations] = await Promise.all([
            payload.find({
                collection: 'teams',
                limit: 20,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true, description: true },
                    assets: { logo: true, cover: true },
                    details: { country: true, start_date: true, website: true },
                },
            }),
            payload.find({
                collection: 'individuals',
                limit: 20,
                sort: 'last_name',
                depth: 1,
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    slug: true,
                    basics: { type: true, description: true, gender: true },
                    assets: { avatar: true, thumbnail: true },
                },
            }),
            payload.find({
                collection: 'organizations',
                limit: 20,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true, type: true, description: true },
                    assets: { logo: true, alt_logo: true },
                },
            }),
        ])

        return {
            teams: teams.docs as Team[],
            individuals: individuals.docs as Individual[],
            organizations: organizations.docs as Organization[],
        }
    },
    ['teams-page-data'],
    { revalidate: 3600, tags: ['teams'] }
)

export default async function TeamsPage() {
    const { teams, individuals, organizations } = await getTeamsData()

    const featuredTeam = teams.length > 0 ? teams[0] : null

    const gridItems = teams.map((team) => ({
        id: String(team.id),
        title: team.name || '',
        subtitle: team.basics?.tagline || undefined,
        image: getMediaUrl(team.assets?.logo) ||
            getMediaUrl(team.assets?.cover) ||
            `https://picsum.photos/seed/${team.slug}/400/300`,
        href: `/teams/${team.slug}`,
    }))

    const featuredIndividual = individuals.length > 0 ? individuals[0] : null

    const study = featuredIndividual
        ? {
            id: String(featuredIndividual.id),
            title: `${featuredIndividual.first_name || ''} ${featuredIndividual.last_name || ''}`.trim() || 'Unnamed',
            description: featuredIndividual.basics?.description || '',
            image: getMediaUrl(featuredIndividual.assets?.avatar) ||
                getMediaUrl(featuredIndividual.assets?.thumbnail) ||
                `https://picsum.photos/seed/${featuredIndividual.slug}/800/600`,
            metrics: [
                { label: 'Type', value: featuredIndividual.basics?.type || 'N/A' },
                { label: 'Gender', value: featuredIndividual.basics?.gender || 'N/A' },
            ],
        }
        : null

    const individualFeatures = individuals.slice(1).map((individual) => ({
        id: String(individual.id),
        title: `${individual.first_name || ''} ${individual.last_name || ''}`.trim() || 'Unnamed',
        description: individual.basics?.description || '',
        image: getMediaUrl(individual.assets?.avatar) ||
            getMediaUrl(individual.assets?.thumbnail),
        slug: `individuals/${individual.slug}`,
        stats: [
            { label: 'Type', value: individual.basics?.type || 'N/A' },
            { label: 'Gender', value: individual.basics?.gender || 'N/A' },
        ],
    }))

    const logoItems = organizations.map((org) => ({
        id: String(org.id),
        name: org.name || '',
        logo: getMediaUrl(org.assets?.logo) ||
            getMediaUrl(org.assets?.alt_logo) ||
            `https://picsum.photos/seed/${org.slug}/200/200`,
        description: org.basics?.description || undefined,
        website: undefined,
        location: undefined,
        category: org.basics?.type || undefined,
        slug: `organizations/${org.slug}`,
    }))

    return (
        <main className="w-full">
            {featuredTeam && (
                <HeroSection
                    id="teams-hero"
                    title={featuredTeam.name || ''}
                    subtitle={featuredTeam.basics?.tagline || ''}
                    description={featuredTeam.basics?.description || undefined}
                    backgroundImage={getMediaUrl(featuredTeam.assets?.cover) ||
                        getMediaUrl(featuredTeam.assets?.logo)}
                    badge={featuredTeam.details?.country && typeof featuredTeam.details.country === 'object' && 'name' in featuredTeam.details.country
                        ? featuredTeam.details.country.name
                        : undefined}
                    meta="FEATURED TEAM"
                    actions={[
                        { label: 'VIEW TEAM', href: `/teams/${featuredTeam.slug}`, variant: 'primary' },
                    ]}
                />
            )}
            {gridItems.length > 1 && (
                <GridSection
                    id="teams-grid"
                    title="ALL TEAMS"
                    subtitle="Complete constructor directory"
                    items={gridItems.slice(1)}
                    labels={{
                        unitsCount: 'TEAMS',
                        viewProject: 'PROFILE',
                        sectionIndex: 'TMS',
                        fallbackAlt: 'Team',
                    }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {study && (
                <StudySection
                    id="featured-individual"
                    title="FEATURED INDIVIDUAL"
                    subtitle="Team personnel highlight"
                    studies={[study]}
                    variant="featured"
                    headerVariant={1}
                    footerVariant={1}
                    ctaLabel="VIEW PROFILE"
                    ctaPath={`/individuals/${featuredIndividual?.slug}`}
                />
            )}
            {individualFeatures.length > 0 && (
                <FeatureSection
                    id="individuals-features"
                    title="ALL INDIVIDUALS"
                    subtitle="Team personnel and staff"
                    features={individualFeatures}
                    labels={{
                        specIndex: 'IND',
                        statsLabel: 'INFO',
                        ctaLabel: 'VIEW',
                    }}
                    headerVariant={2}
                    footerVariant={1}
                    ctaPath="/individuals"
                />
            )}
            {logoItems.length > 0 && (
                <MarqueeSection
                    id="organizations-logos"
                    title="ORGANIZATIONS"
                    subtitle="Partners and affiliates"
                    items={logoItems}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}