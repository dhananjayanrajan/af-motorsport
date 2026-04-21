import DirectoryGrid from '@/components/Section/DirectoryGrid'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getTeamsData() {
    const payload = await getPayload({ config: configPromise })

    const { docs: teams } = await payload.find({
        collection: 'teams',
        limit: 12,
        sort: '-createdAt',
    })

    const { docs: individuals } = await payload.find({
        collection: 'individuals',
        limit: 12,
        sort: '-createdAt',
    })

    const { docs: organizations } = await payload.find({
        collection: 'organizations',
        limit: 12,
        sort: '-createdAt',
    })

    return { teams, individuals, organizations }
}

export default async function TeamsPage() {
    const { teams, individuals, organizations } = await getTeamsData()

    const teamItems = teams.map(team => {
        const logo = team.assets?.logo && typeof team.assets.logo === 'object'
            ? team.assets.logo as Media
            : null

        return {
            id: team.id.toString(),
            title: team.name,
            subtitle: team.basics?.tagline || undefined,
            label: 'TEAM',
            image: logo,
            href: `/teams/${team.slug}`,
            metadata: [
                { label: 'COUNTRY', value: team.details?.country && typeof team.details.country === 'object' ? (team.details.country as { name: string }).name : 'TBD' },
                { label: 'FOUNDED', value: team.details?.start_date?.split('-')[0] || 'TBD' },
            ]
        }
    })

    const individualItems = individuals.map(ind => {
        const avatar = ind.assets?.avatar && typeof ind.assets.avatar === 'object'
            ? ind.assets.avatar as Media
            : null

        return {
            id: ind.id.toString(),
            title: `${ind.first_name} ${ind.last_name}`,
            subtitle: ind.basics?.description || ind.basics?.type || 'Individual',
            label: ind.basics?.type?.toUpperCase() || 'PERSONNEL',
            image: avatar,
            href: `/teams/${ind.slug}`,
            metadata: [
                { label: 'TYPE', value: ind.basics?.type || 'Individual' },
                { label: 'CONTACT', value: ind.basics?.is_contact ? 'PRIMARY' : 'SECONDARY' },
            ]
        }
    })

    const organizationItems = organizations.map(org => {
        const logo = org.assets?.logo && typeof org.assets.logo === 'object'
            ? org.assets.logo as Media
            : null

        return {
            id: org.id.toString(),
            title: org.name,
            subtitle: org.basics?.tagline || undefined,
            label: org.basics?.type?.toUpperCase() || 'ORGANIZATION',
            image: logo,
            href: `/teams/${org.slug}`,
            metadata: [
                { label: 'TYPE', value: org.basics?.type || 'Organization' },
                { label: 'INDUSTRY', value: org.basics?.industry || 'TBD' },
            ]
        }
    })

    return (
        <main className="w-full">
            <DirectoryGrid
                id="TEAMS_DIR"
                title="Teams"
                items={teamItems}
                variant="square"
            />

            <DirectoryGrid
                id="INDIVIDUALS_DIR"
                title="Individuals"
                items={individualItems}
                variant="portrait"
            />

            <DirectoryGrid
                id="ORGANIZATIONS_DIR"
                title="Organizations"
                items={organizationItems}
                variant="square"
            />
        </main>
    )
}