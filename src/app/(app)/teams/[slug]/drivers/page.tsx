// app/(app)/teams/[slug]/drivers/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import { Celebration, Driver, Media, Team } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getTeamDriversData = unstable_cache(
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

        const driversResult = await payload.find({
            collection: 'drivers',
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
                slug: true,
                basics: {
                    racing_number: true,
                    retirement_date: true,
                    nationality: true,
                    nickname: true,
                },
                assets: {
                    avatar: true,
                    gallery: true,
                },
            },
        })
        const drivers = driversResult.docs as Driver[]

        const driverIds = drivers.map(d => d.id)

        const celebrationsResult = await payload.find({
            collection: 'celebrations',
            where: driverIds.length
                ? { 'details.drivers': { in: driverIds } }
                : { id: { equals: '' } },
            limit: 24,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                assets: { thumbnail: true },
            },
        })

        return {
            team,
            drivers,
            celebrations: celebrationsResult.docs as Celebration[],
        }
    },
    ['team-drivers-data'],
    { revalidate: 3600, tags: ['team', 'drivers'] }
)

export default async function TeamDriversPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const data = await getTeamDriversData(slug)

    if (!data || !data.team) notFound()

    const { team, drivers, celebrations } = data

    const activeDrivers = drivers.filter(d => !d.basics?.retirement_date)
    const retiredDrivers = drivers.filter(d => d.basics?.retirement_date)

    const gridItems = activeDrivers.map((d) => ({
        id: String(d.id),
        title: `${d.first_name} ${d.last_name}`,
        subtitle: d.basics?.nationality && typeof d.basics.nationality === 'object' && 'name' in d.basics.nationality
            ? (d.basics.nationality.name ?? undefined)
            : undefined,
        image: getMediaUrl(d.assets?.avatar) || `https://picsum.photos/seed/${d.slug}/400/300`,
        href: `/teams/${team.slug}/drivers/${d.slug}`,
        category: d.basics?.racing_number ? `#${d.basics.racing_number}` : undefined,
    }))

    const retiredEntries = retiredDrivers.map((d) => ({
        id: String(d.id),
        title: `${d.first_name} ${d.last_name}`,
        subtitle: d.basics?.nickname || undefined,
        status: d.basics?.retirement_date || undefined,
        tag: d.basics?.racing_number ? `#${d.basics.racing_number}` : undefined,
        href: `/teams/${team.slug}/drivers/${d.slug}`,
    }))

    const celebrationSlides = celebrations.map((celebration) => ({
        id: String(celebration.id),
        title: celebration.name || '',
        image: getMediaUrl(celebration.assets?.thumbnail) || `https://picsum.photos/seed/${celebration.slug}/1200/1600`,
        ctaLabel: 'VIEW',
        ctaHref: `/teams/${team.slug}/drivers/${celebration.slug}`,
    }))

    const galleryItems: any[] = []
    drivers.forEach((d) => {
        if (d.assets?.gallery) {
            const gallery = Array.isArray(d.assets.gallery) ? d.assets.gallery : []
            gallery.forEach((item, idx) => {
                const media = typeof item === 'object' ? item : null
                const url = media ? getMediaUrl(media) : undefined
                if (url && media) {
                    galleryItems.push({
                        id: `gallery-${d.id}-${media.id}`,
                        title: media.alt || `${d.first_name} ${d.last_name}`,
                        image: url,
                        category: d.basics?.racing_number ? `#${d.basics.racing_number}` : `IMG_${idx}`,
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
                id="team-drivers-hero"
                title={team.name}
                subtitle={team.basics?.tagline || ''}
                description={team.seo?.description || team.basics?.description || undefined}
                backgroundImage={getMediaUrl(team.assets?.cover) || getMediaUrl(team.assets?.logo)}
                badge="DRIVER ROSTER"
                meta={team.seo?.title || undefined}
                alignment="left"
            />
            {gridItems.length > 0 && (
                <GridSection
                    id="team-active-drivers"
                    title="ACTIVE DRIVERS"
                    subtitle="Current championship entries"
                    items={gridItems}
                    labels={{
                        unitsCount: 'DRIVERS',
                        viewProject: 'PROFILE',
                        sectionIndex: 'DRV',
                        fallbackAlt: 'Driver',
                    }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {retiredEntries.length > 0 && (
                <ListSection
                    id="team-retired-drivers"
                    title="RETIRED DRIVERS"
                    subtitle="Legacy team members"
                    entries={retiredEntries}
                    labels={{
                        statusPrefix: 'RETIRED',
                        timePrefix: 'ID',
                        indexPrefix: 'RET',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {celebrationSlides.length > 0 && (
                <CarouselSection
                    id="team-driver-celebrations"
                    slides={celebrationSlides}
                    autoplayDelay={5000}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="team-driver-gallery"
                    title="Driver Gallery"
                    subtitle="Aggregated driver imagery"
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