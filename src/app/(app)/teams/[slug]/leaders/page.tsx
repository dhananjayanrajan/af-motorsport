// app/(app)/teams/[slug]/leaders/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MarqueeSection from '@/components/Section/Blocks/MarqueeSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import TableSection from '@/components/Section/Blocks/TableSection'
import { Celebration, Leader, Media, Meetup, Team } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getTeamLeadersData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })

        const teamResult = await payload.find({
            collection: 'teams',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
        })
        const team = teamResult.docs[0] as Team | null
        if (!team) return null

        const categoryIds = team.categories?.map(cat => typeof cat === 'object' ? cat.id : cat) || []

        const leadersResult = await payload.find({
            collection: 'leaders',
            where: categoryIds.length
                ? { categories: { in: categoryIds } }
                : { id: { equals: '' } },
            limit: 50,
            depth: 2,
            sort: 'last_name',
            select: {
                id: true,
                first_name: true,
                last_name: true,
                alias: true,
                slug: true,
                basics: {
                    title: true,
                    nickname: true,
                    nationality: true,
                    retirement_date: true,
                    debut_date: true,
                },
                details: {
                    quote: true,
                    mission: true,
                    designations: true,
                },
                assets: {
                    avatar: true,
                    cover: true,
                    gallery: true,
                },
            },
        })
        const leaders = leadersResult.docs as Leader[]

        const leaderIds = leaders.map(l => l.id)

        const [celebrationsResult, meetupsResult] = await Promise.all([
            payload.find({
                collection: 'celebrations',
                where: leaderIds.length
                    ? { 'details.leaders': { in: leaderIds } }
                    : { id: { equals: '' } },
                limit: 24,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    assets: { thumbnail: true },
                },
            }),
            payload.find({
                collection: 'meetups',
                where: leaderIds.length
                    ? { 'details.hosts.leaders': { in: leaderIds } }
                    : { id: { equals: '' } },
                limit: 24,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    assets: { gallery: true },
                },
            }),
        ])

        return {
            team,
            leaders,
            celebrations: celebrationsResult.docs as Celebration[],
            meetups: meetupsResult.docs as Meetup[],
        }
    },
    ['team-leaders-data'],
    { revalidate: 3600, tags: ['team', 'leaders'] }
)

export default async function TeamLeadersPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getTeamLeadersData(slug)

    if (!data || !data.team) notFound()

    const { team, leaders, celebrations, meetups } = data

    const activeLeaders = leaders.filter(l => !l.basics?.retirement_date)
    const retiredLeaders = leaders.filter(l => l.basics?.retirement_date)

    const marqueeItems = leaders.map((l) => ({
        id: String(l.id),
        name: `${l.first_name} ${l.last_name}${l.alias ? ` // ${l.alias}` : ''}`,
        logo: getMediaUrl(l.assets?.avatar) || `https://picsum.photos/seed/${l.slug}/200/200`,
    }))

    const gridItems = activeLeaders.map((l) => ({
        id: String(l.id),
        title: `${l.first_name} ${l.last_name}`,
        subtitle: l.basics?.title || undefined,
        image: getMediaUrl(l.assets?.avatar) || `https://picsum.photos/seed/${l.slug}/400/300`,
        href: `/teams/${team.slug}/leaders/${l.slug}`,
        category: l.basics?.nickname || undefined,
    }))

    const tableColumns = [
        { key: 'name', label: 'Name', sortable: true, width: undefined },
        { key: 'title', label: 'Title', sortable: true, width: undefined },
        { key: 'debut', label: 'Debut', sortable: true, width: undefined },
        { key: 'retired', label: 'Retired', sortable: true, width: undefined },
    ]

    const tableRows = retiredLeaders.map((l) => ({
        id: String(l.id),
        cells: {
            name: `${l.first_name} ${l.last_name}`,
            title: l.basics?.title || 'N/A',
            debut: l.basics?.debut_date || 'N/A',
            retired: l.basics?.retirement_date || 'N/A',
        },
    }))

    const celebrationSlides = celebrations.map((celebration) => ({
        id: String(celebration.id),
        title: celebration.name || '',
        image: getMediaUrl(celebration.assets?.thumbnail) || `https://picsum.photos/seed/${celebration.slug}/1200/1600`,
        ctaLabel: 'VIEW',
        ctaHref: `/teams/${team.slug}/leaders`,
    }))

    const galleryItems: any[] = []
    meetups.forEach((meetup) => {
        if (meetup.assets?.gallery) {
            const gallery = Array.isArray(meetup.assets.gallery) ? meetup.assets.gallery : []
            gallery.forEach((item, idx) => {
                const media = typeof item === 'object' ? item : null
                const url = media ? getMediaUrl(media) : undefined
                if (url && media) {
                    galleryItems.push({
                        id: `meetup-${meetup.id}-${media.id}`,
                        title: media.alt || meetup.name,
                        image: url,
                        category: meetup.name || `EVENT_${idx}`,
                        description: undefined,
                        height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                    })
                }
            })
        }
    })

    return (
        <main className="w-full">
            <HeroSection
                id="team-leaders-hero"
                title={team.name}
                subtitle="Leadership & Management"
                description={team.basics?.tagline || team.basics?.description || undefined}
                backgroundImage={getMediaUrl(team.assets?.cover) || getMediaUrl(team.assets?.logo)}
                badge="COMMAND"
                meta={team.seo?.title || undefined}
                alignment="left"
            />
            {marqueeItems.length > 0 && (
                <MarqueeSection
                    id="team-leaders-marquee"
                    title="LEADERSHIP ROSTER"
                    subtitle="Name Wall"
                    items={marqueeItems}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {gridItems.length > 0 && (
                <GridSection
                    id="team-active-leaders"
                    title="ACTIVE LEADERSHIP"
                    subtitle="Current command structure"
                    items={gridItems}
                    labels={{
                        unitsCount: 'LEADERS',
                        viewProject: 'PROFILE',
                        sectionIndex: 'LDR',
                        fallbackAlt: 'Leader',
                    }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {tableRows.length > 0 && (
                <TableSection
                    id="team-retired-leaders"
                    title="RETIRED LEADERS"
                    subtitle="Legacy command archive"
                    columns={tableColumns}
                    rows={tableRows}
                    labels={{
                        sortActive: 'SORTED',
                        rowIndicator: 'ROW',
                    }}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {celebrationSlides.length > 0 && (
                <CarouselSection
                    id="team-leader-celebrations"
                    slides={celebrationSlides}
                    autoplayDelay={5000}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="team-leader-meetup-gallery"
                    title="Action Wall"
                    subtitle="Leadership-led events"
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