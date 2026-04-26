import GridSection from '@/components/Section/Blocks/GridSection'
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
                limit: 12,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true },
                    assets: { logo: true, cover: true },
                },
            }),
            payload.find({
                collection: 'individuals',
                limit: 12,
                sort: 'last_name',
                depth: 1,
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    slug: true,
                    basics: { type: true, description: true },
                    assets: { avatar: true, thumbnail: true },
                },
            }),
            payload.find({
                collection: 'organizations',
                limit: 12,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true, type: true },
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

    const teamItems = teams.map((team) => ({
        id: String(team.id),
        title: team.name || '',
        subtitle: team.basics?.tagline || undefined,
        image: getMediaUrl(team.assets?.logo) ||
            getMediaUrl(team.assets?.cover) ||
            `https://picsum.photos/seed/${team.slug}/400/300`,
        href: `/teams/${team.slug}`,
    }))

    const individualItems = individuals.map((individual) => ({
        id: String(individual.id),
        title: `${individual.first_name || ''} ${individual.last_name || ''}`.trim() || 'Unnamed',
        subtitle: individual.basics?.type || individual.basics?.description || undefined,
        image: getMediaUrl(individual.assets?.avatar) ||
            getMediaUrl(individual.assets?.thumbnail) ||
            `https://picsum.photos/seed/${individual.slug}/400/300`,
        href: `/teams/individuals/${individual.slug}`,
    }))

    const organizationItems = organizations.map((org) => ({
        id: String(org.id),
        title: org.name || '',
        subtitle: org.basics?.tagline || org.basics?.type || undefined,
        image: getMediaUrl(org.assets?.logo) ||
            getMediaUrl(org.assets?.alt_logo) ||
            `https://picsum.photos/seed/${org.slug}/400/300`,
        href: `/teams/organizations/${org.slug}`,
    }))

    return (
        <main className="w-full">
            {teamItems.length > 0 && (
                <GridSection
                    id="teams-list"
                    title="Teams"
                    subtitle="Racing teams and organizations"
                    items={teamItems}
                    labels={{
                        unitsCount: 'TEAMS',
                        viewProject: 'VIEW',
                        sectionIndex: 'TMS',
                        fallbackAlt: 'Team',
                    }}
                    columns={4}
                />
            )}
            {individualItems.length > 0 && (
                <GridSection
                    id="individuals-list"
                    title="Individuals"
                    subtitle="Team personnel and staff"
                    items={individualItems}
                    labels={{
                        unitsCount: 'IND',
                        viewProject: 'VIEW',
                        sectionIndex: 'IND',
                        fallbackAlt: 'Individual',
                    }}
                    columns={4}
                />
            )}
            {organizationItems.length > 0 && (
                <GridSection
                    id="organizations-list"
                    title="Organizations"
                    subtitle="Partners and affiliates"
                    items={organizationItems}
                    labels={{
                        unitsCount: 'ORG',
                        viewProject: 'VIEW',
                        sectionIndex: 'ORG',
                        fallbackAlt: 'Organization',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}