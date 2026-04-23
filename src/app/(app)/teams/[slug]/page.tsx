// app/(frontend)/teams/[slug]/page.tsx
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
            where: {},
            limit: 20,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: true,
                assets: true,
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
            where: {},
            limit: 20,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: true,
                assets: true,
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

    const drivers = await getTeamDrivers(team.id)
    const leaders = await getTeamLeaders(team.id)

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
    }

    const scrollItems: any[] = []
    if (team.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Team History',
            description: team.basics?.description || 'A legacy of racing excellence.',
            percentage: 100,
        })
    }

    const driverItems: any[] = drivers.slice(0, 8).map((driver: Driver) => {
        const imageUrl = driver.assets?.avatar
            ? getMediaUrl(driver.assets.avatar)
            : `https://picsum.photos/seed/${driver.slug}/400/300`

        return {
            id: String(driver.id),
            title: `${driver.first_name} ${driver.last_name}`,
            subtitle: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : driver.basics?.nickname || undefined,
            image: imageUrl,
            href: `/teams/${team.slug}/drivers/${driver.slug}`,
        }
    })

    const leaderItems: any[] = leaders.slice(0, 8).map((leader: Leader) => {
        const imageUrl = leader.assets?.avatar
            ? getMediaUrl(leader.assets.avatar)
            : `https://picsum.photos/seed/${leader.slug}/400/300`

        return {
            id: String(leader.id),
            title: `${leader.first_name} ${leader.last_name}`,
            subtitle: leader.basics?.title || undefined,
            image: imageUrl,
            href: `/teams/${team.slug}/leaders/${leader.slug}`,
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
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

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