// app/(frontend)/teams/drivers/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getDriversData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'drivers',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: {
                    racing_number: true,
                    nickname: true,
                    competition_name: true,
                    nationality: true,
                    gender: true,
                    callsign: true,
                    catchphrase: true,
                },
                details: {
                    story: true,
                    biography: true,
                },
                assets: {
                    avatar: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['drivers-page-data'],
    { revalidate: 120, tags: ['drivers'] }
)

export default async function DriversPage() {
    const drivers = await getDriversData()

    const featuredDrivers = drivers.slice(0, 8).map((d) => {
        const nationality =
            d.basics?.nationality && typeof d.basics.nationality === 'object' && 'name' in d.basics.nationality
                ? d.basics.nationality.name
                : ''
        return {
            id: String(d.id),
            title: `${d.first_name} ${d.last_name}`,
            description:
                d.basics?.catchphrase || d.basics?.callsign || d.basics?.competition_name || '',
            image: getMediaUrl(d.assets?.avatar),
            ctaLabel: 'PROFILE',
            ctaHref: `/teams/drivers/${d.slug}`,
            meta: d.basics?.racing_number ? `#${d.basics.racing_number}` : undefined,
            tags: [nationality, d.basics?.gender].filter(Boolean) as string[],
        }
    })

    const allDrivers = drivers.map((d) => {
        const nationality =
            d.basics?.nationality && typeof d.basics.nationality === 'object' && 'name' in d.basics.nationality
                ? d.basics.nationality.name
                : ''
        return {
            id: String(d.id),
            title: `${d.first_name} ${d.last_name}`,
            subtitle: d.basics?.competition_name || d.basics?.nickname || nationality || '',
            image: getMediaUrl(d.assets?.avatar),
            href: `/teams/drivers/${d.slug}`,
            category: d.basics?.racing_number ? `#${d.basics.racing_number}` : undefined,
        }
    })

    return (
        <main className="w-full">
            <HeroSection
                id="drivers-hero"
                title="DRIVERS"
                subtitle="Championship Roster"
                description="Browse all active and legacy drivers across every series and season."
                badge="PERSONNEL"
                meta="DRV_IDX"
            />
            {featuredDrivers.length > 0 && (
                <CarouselSection
                    id="drivers-featured"
                    slides={featuredDrivers}
                    autoplayDelay={5000}
                    ctaLabel="VIEW ALL"
                    ctaPath="/teams/drivers"
                />
            )}
            {allDrivers.length > 0 && (
                <GridSection
                    id="drivers-all"
                    title="FULL ROSTER"
                    subtitle="Every driver on the grid"
                    items={allDrivers}
                    labels={{
                        unitsCount: 'DRIVERS',
                        viewProject: 'PROFILE',
                        sectionIndex: 'ROSTER',
                        fallbackAlt: 'Driver',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}