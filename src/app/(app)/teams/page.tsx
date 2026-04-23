// app/(frontend)/teams/page.tsx
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
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                    updatedAt: true,
                    createdAt: true,
                },
            }),
            payload.find({
                collection: 'individuals',
                limit: 12,
                sort: 'last_name',
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    slug: true,
                    basics: true,
                    assets: true,
                    updatedAt: true,
                    createdAt: true,
                },
            }),
            payload.find({
                collection: 'organizations',
                limit: 12,
                sort: 'name',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                    updatedAt: true,
                    createdAt: true,
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

    const teamItems: any[] = teams.map((team: Team) => {
        const imageUrl = team.assets?.logo
            ? getMediaUrl(team.assets.logo)
            : team.assets?.cover
                ? getMediaUrl(team.assets.cover)
                : `https://picsum.photos/seed/${team.slug}/400/300`

        return {
            id: String(team.id),
            title: team.name,
            subtitle: team.basics?.tagline || undefined,
            image: imageUrl,
            href: `/teams/${team.slug}`,
            metadata: team.details?.country && typeof team.details.country === 'object' && 'name' in team.details.country
                ? { Country: team.details.country.name }
                : undefined,
        }
    })

    const individualItems: any[] = individuals.map((individual: Individual) => {
        const imageUrl = individual.assets?.avatar
            ? getMediaUrl(individual.assets.avatar)
            : individual.assets?.thumbnail
                ? getMediaUrl(individual.assets.thumbnail)
                : `https://picsum.photos/seed/${individual.slug}/400/300`

        return {
            id: String(individual.id),
            title: `${individual.first_name} ${individual.last_name}`,
            subtitle: individual.basics?.type || individual.basics?.description || undefined,
            image: imageUrl,
            href: `/teams/individuals/${individual.slug}`,
        }
    })

    const organizationItems: any[] = organizations.map((org: Organization) => {
        const imageUrl = org.assets?.logo
            ? getMediaUrl(org.assets.logo)
            : org.assets?.alt_logo
                ? getMediaUrl(org.assets.alt_logo)
                : `https://picsum.photos/seed/${org.slug}/400/300`

        return {
            id: String(org.id),
            title: org.name,
            subtitle: org.basics?.tagline || org.basics?.type || undefined,
            image: imageUrl,
            href: `/teams/organizations/${org.slug}`,
            label: org.basics?.identifiers?.code || undefined,
            metadata: org.details?.founded
                ? { Founded: org.details.founded }
                : undefined,
        }
    })

    return (
        <main className="w-full">
            {teamItems.length > 0 && (
                <GridSection
                    id="teams-list"
                    title="Teams"
                    subtitle="Racing teams and organizations"
                    items={teamItems}
                    columns={4}
                    cardVariant={1}
                    showMetadata={true}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {individualItems.length > 0 && (
                <GridSection
                    id="individuals-list"
                    title="Individuals"
                    subtitle="Team personnel and staff"
                    items={individualItems}
                    columns={4}
                    cardVariant={1}
                    showMetadata={false}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {organizationItems.length > 0 && (
                <GridSection
                    id="organizations-list"
                    title="Organizations"
                    subtitle="Partners and affiliates"
                    items={organizationItems}
                    columns={4}
                    cardVariant={1}
                    showMetadata={true}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}