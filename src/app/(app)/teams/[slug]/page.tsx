import DirectoryGrid from '@/components/Section/DirectoryGrid'
import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import PullQuote from '@/components/Section/PullQuote'
import { Driver, Leader, Media, Team } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getTeam(slug: string): Promise<Team | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'teams',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

async function getTeamDrivers(teamId: number): Promise<Driver[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'drivers',
        where: {
            'details.cars': {
                in: [teamId],
            },
        },
        limit: 20,
    })
    return docs
}

async function getTeamLeaders(teamId: number): Promise<Leader[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'leaders',
        where: {
            'details.designations': {
                exists: true,
            },
        },
        limit: 20,
    })
    return docs
}

export default async function TeamPage({ params }: PageProps) {
    const { slug } = await params
    const team = await getTeam(slug)

    if (!team) {
        return notFound()
    }

    const drivers = await getTeamDrivers(team.id)
    const leaders = await getTeamLeaders(team.id)

    const infoBlocks = [
        {
            id: 'overview',
            label: 'OVERVIEW',
            title: team.name,
            description: team.basics?.description || undefined,
            metadata: [
                { key: 'COUNTRY', value: team.details?.country && typeof team.details.country === 'object' ? (team.details.country as { name: string }).name : 'TBD' },
                { key: 'WEBSITE', value: team.details?.website || 'TBD' },
            ]
        },
        {
            id: 'timeline',
            label: 'TIMELINE',
            title: team.details?.start_date ? 'ACTIVE' : 'PENDING',
            description: 'Team operational period',
            metadata: [
                { key: 'START DATE', value: team.details?.start_date?.split('-')[0] || 'TBD' },
                { key: 'END DATE', value: team.details?.end_date?.split('-')[0] || 'PRESENT' },
            ]
        },
    ]

    const historySteps = []

    if (team.details?.start_date) {
        historySteps.push({
            id: 'founded',
            index: '01',
            heading: 'Team Founded',
            subheading: team.details.start_date.split('-')[0],
            body: team.basics?.description || 'Team established',
            percentage: 100
        })
    }

    const driverItems = drivers.map(driver => ({
        id: driver.id.toString(),
        title: `${driver.first_name} ${driver.last_name}`,
        subtitle: driver.basics?.nickname || driver.basics?.competition_name || undefined,
        label: `#${driver.basics?.racing_number || '00'}`,
        image: driver.assets?.avatar && typeof driver.assets.avatar === 'object' ? driver.assets.avatar as Media : null,
        href: `/teams/${slug}/drivers/${driver.slug}`,
        metadata: [
            { label: 'NATIONALITY', value: driver.basics?.nationality && typeof driver.basics.nationality === 'object' ? (driver.basics.nationality as { name: string }).name : 'TBD' },
        ]
    }))

    const leaderItems = leaders.map(leader => ({
        id: leader.id.toString(),
        title: `${leader.first_name} ${leader.last_name}`,
        subtitle: leader.basics?.title || leader.basics?.nickname || undefined,
        label: 'LEADER',
        image: leader.assets?.avatar && typeof leader.assets.avatar === 'object' ? leader.assets.avatar as Media : null,
        href: `/teams/${slug}/leaders/${leader.slug}`,
        metadata: [
            { label: 'ROLE', value: leader.basics?.title || 'Leadership' },
        ]
    }))

    const galleryItems = team.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: team.name
    })) || []

    return (
        <main className="w-full">
            <PullQuote
                id={`TM-${team.id}`}
                title="Team Statement"
                quote={team.basics?.tagline || team.basics?.description || 'Professional racing team'}
                attribution={team.name}
                variant="center"
            />

            <InfoGrid
                id="TM_SPECS"
                title="Team Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="TM_HISTORY"
                    title="Team History"
                    steps={historySteps}
                />
            )}

            {driverItems.length > 0 && (
                <DirectoryGrid
                    id="TM_DRIVERS"
                    title="Drivers"
                    items={driverItems}
                    variant="portrait"
                />
            )}

            {leaderItems.length > 0 && (
                <DirectoryGrid
                    id="TM_LEADERS"
                    title="Leadership"
                    items={leaderItems}
                    variant="square"
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="TM_GALLERY"
                    title="Team Gallery"
                    items={galleryItems}
                />
            )}
        </main>
    )
}