import GridSection from '@/components/Section/Blocks/GridSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import { Driver, Leader, Media } from '@/payload-types'
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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { tagline: true, description: true },
                assets: { cover: true, logo: true, gallery: true },
                details: { start_date: true, country: true, website: true, history: true },
            },
        })
        return result.docs[0] || null
    },
    ['team-detail'],
    { revalidate: 3600, tags: ['team'] }
)

const getTeamDrivers = unstable_cache(
    async (teamId: number) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'drivers',
            where: { team: { equals: teamId } }, // Added filter logic
            limit: 8,
            depth: 1,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: { racing_number: true, nickname: true },
                assets: { avatar: true },
            },
        })
        return result.docs as Driver[]
    },
    ['team-drivers'],
    { revalidate: 3600 }
)

const getTeamLeaders = unstable_cache(
    async (teamId: number) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'leaders',
            where: { team: { equals: teamId } }, // Added filter logic
            limit: 8,
            depth: 1,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: { title: true },
                assets: { avatar: true },
            },
        })
        return result.docs as Leader[]
    },
    ['team-leaders'],
    { revalidate: 3600 }
)

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const team = await getTeamData(slug)

    if (!team) notFound()

    const [drivers, leaders] = await Promise.all([
        getTeamDrivers(team.id),
        getTeamLeaders(team.id),
    ])

    const quoteItem = team.basics?.tagline ? {
        id: String(team.id),
        text: team.basics.tagline,
        author: team.name || 'Team',
    } : null

    const studyImage = getMediaUrl(team.assets?.cover) ||
        getMediaUrl(team.assets?.logo) ||
        `https://picsum.photos/seed/${team.slug}/800/600`

    const countryName = team.details?.country && typeof team.details.country === 'object' && 'name' in team.details.country
        ? team.details.country.name
        : 'N/A'

    const study = {
        id: String(team.id),
        title: team.name || '',
        description: team.basics?.description || '',
        image: studyImage,
        metrics: [
            { label: 'Founded', value: team.details?.start_date || 'N/A' },
            { label: 'Country', value: countryName },
            { label: 'Website', value: team.details?.website || 'N/A' },
        ],
    }

    const scrollItems = team.details?.history ? [{
        id: 'history',
        title: 'Team History',
        description: team.basics?.description || 'A legacy of racing excellence.',
        percentage: 100,
    }] : []

    const driverItems = drivers.map((driver) => ({
        id: String(driver.id),
        title: `${driver.first_name || ''} ${driver.last_name || ''}`.trim() || 'Unknown Driver',
        subtitle: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : driver.basics?.nickname || undefined,
        image: getMediaUrl(driver.assets?.avatar) || `https://picsum.photos/seed/${driver.slug}/400/300`,
        href: `/teams/${team.slug}/drivers/${driver.slug}`,
    }))

    const leaderItems = leaders.map((leader) => ({
        id: String(leader.id),
        title: `${leader.first_name || ''} ${leader.last_name || ''}`.trim() || 'Unknown Leader',
        subtitle: leader.basics?.title || undefined,
        image: getMediaUrl(leader.assets?.avatar) || `https://picsum.photos/seed/${leader.slug}/400/300`,
        href: `/teams/${team.slug}/leaders/${leader.slug}`,
    }))

    const galleryItems = (team.assets?.gallery || [])
        .map((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = getMediaUrl(media)
            if (!url || !media) return null
            return {
                id: String(media.id),
                title: media.alt || team.name || '',
                image: url,
                height: (idx % 3 === 0 ? 'tall' : idx % 2 === 0 ? 'medium' : 'short') as 'tall' | 'medium' | 'short',
            }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)

    return (
        <main className="w-full">
            {quoteItem && (
                <QuoteSection
                    id="team-tagline"
                    title="Team Tagline"
                    subtitle={team.name}
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'COMM',
                        ratingLabel: 'RATING',
                    }}
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
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="team-history"
                    title="History"
                    subtitle="Team background"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'SEC',
                        progressLabel: 'PROG',
                        statusComplete: 'DONE',
                    }}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {driverItems.length > 0 && (
                <GridSection
                    id="team-drivers"
                    title="Drivers"
                    subtitle="Team drivers"
                    items={driverItems}
                    labels={{
                        unitsCount: 'DRV',
                        viewProject: 'VIEW',
                        sectionIndex: 'DRV',
                        fallbackAlt: 'Driver',
                    }}
                    columns={4}
                />
            )}
            {leaderItems.length > 0 && (
                <GridSection
                    id="team-leaders"
                    title="Leadership"
                    subtitle="Team management"
                    items={leaderItems}
                    labels={{
                        unitsCount: 'LDR',
                        viewProject: 'VIEW',
                        sectionIndex: 'LDR',
                        fallbackAlt: 'Leader',
                    }}
                    columns={4}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="team-gallery"
                    title="Gallery"
                    subtitle="Team imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}