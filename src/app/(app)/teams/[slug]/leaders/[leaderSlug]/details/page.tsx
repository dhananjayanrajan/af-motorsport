import DirectoryGrid from '@/components/Section/DirectoryGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import PullQuote from '@/components/Section/PullQuote'
import { Award, Leader, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
        leaderSlug: string
    }>
}

async function getLeader(slug: string): Promise<Leader | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'leaders',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

async function getLeaderAwards(leaderId: number): Promise<Award[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'awards',
        where: {
            id: {
                exists: true,
            },
        },
        limit: 20,
    })
    return docs.filter(award => award.details?.awarded_date)
}

export default async function LeaderDetailsPage({ params }: PageProps) {
    const { leaderSlug } = await params
    const leader = await getLeader(leaderSlug)

    if (!leader) {
        return notFound()
    }

    const awards = await getLeaderAwards(leader.id)

    const principlePanels = leader.details?.principles?.list?.map(principle => ({
        id: principle.id || `${leader.id}-${principle.name}`,
        title: principle.name || 'Principle',
        label: 'CORE VALUE',
        summary: principle.statement || principle.description || 'Guiding principle',
        content: principle.application || principle.rationale || 'No additional details',
        metadata: [
            { label: 'DESCRIPTION', value: principle.description || 'N/A' },
            { label: 'APPLICATION', value: principle.application || 'Standard' },
        ]
    })) || []

    const awardItems = awards.map(award => ({
        id: award.id.toString(),
        title: award.name,
        subtitle: award.basics?.description || undefined,
        label: award.details?.awarded_date?.split('-')[0] || 'AWARD',
        image: award.assets?.thumbnail && typeof award.assets.thumbnail === 'object' ? award.assets.thumbnail as Media : null,
        href: `/awards/${award.slug}`,
        metadata: [
            { label: 'DATE', value: award.details?.awarded_date?.split('T')[0] || 'TBD' },
        ]
    }))

    const socialItems = leader.details?.socials?.list?.map(social => ({
        id: social.id || `${leader.id}-${social.platform}`,
        title: social.platform || 'Social',
        subtitle: `@${social.username || 'profile'}`,
        label: 'SOCIAL',
        href: social.username ? `https://${social.platform?.toLowerCase()}.com/${social.username}` : undefined,
        metadata: [
            { label: 'PLATFORM', value: social.platform?.toUpperCase() || 'SOCIAL' },
            { label: 'STATUS', value: 'ACTIVE' },
        ]
    })) || []

    return (
        <main className="w-full">
            <PullQuote
                id="LDR_QUOTE"
                title="Leadership Quote"
                quote={leader.details?.quote || leader.details?.vision || leader.details?.mission || 'Leadership is service'}
                attribution={`${leader.first_name} ${leader.last_name}`}
                role={leader.basics?.title || 'Leader'}
                variant="center"
            />

            {principlePanels.length > 0 && (
                <ExpandableList
                    id="LDR_PRINCIPLES"
                    title="Guiding Principles"
                    panels={principlePanels}
                />
            )}

            {awardItems.length > 0 && (
                <DirectoryGrid
                    id="LDR_AWARDS"
                    title="Awards & Recognition"
                    items={awardItems}
                    variant="square"
                />
            )}

            {socialItems.length > 0 && (
                <DirectoryGrid
                    id="LDR_SOCIALS"
                    title="Social Media"
                    items={socialItems}
                    variant="square"
                />
            )}
        </main>
    )
}