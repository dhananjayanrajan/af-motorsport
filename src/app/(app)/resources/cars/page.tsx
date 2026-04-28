// app/(frontend)/resources/cars/page.tsx
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

function resolveName(obj: any): string {
    if (!obj) return ''
    if (typeof obj === 'object' && 'name' in obj) return obj.name
    return ''
}

const getCarsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'cars',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { chassis: true, model: true, version: true },
                    tagline: true,
                    description: true,
                },
                details: {
                    status: true,
                    manufacturers: true,
                },
                assets: {
                    avatar: true,
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['cars-page-data'],
    { revalidate: 300, tags: ['cars'] }
)

export default async function CarsPage() {
    const cars = await getCarsData()

    const featured = cars
        .filter((c) => c.details?.status === 'Active' || c.details?.status === 'Development')
        .slice(0, 8)

    const featuredSlides = featured.map((c) => {
        const manufacturers =
            c.details?.manufacturers
                ?.map((m) => resolveName(m))
                .filter(Boolean)
                .join(' · ') || ''
        return {
            id: String(c.id),
            title: c.name,
            description:
                c.basics?.tagline ||
                manufacturers ||
                c.basics?.identifiers?.chassis ||
                '',
            image:
                getMediaUrl(c.assets?.avatar) ||
                getMediaUrl(c.assets?.thumbnail) ||
                getMediaUrl(c.assets?.cover),
            ctaLabel: 'DETAILS',
            ctaHref: `/resources/cars/${c.slug}`,
            meta: c.basics?.identifiers?.model || undefined,
            tags: [c.details?.status].filter(Boolean) as string[],
        }
    })

    const allGrid = cars.map((c) => ({
        id: String(c.id),
        title: c.name,
        subtitle:
            c.basics?.identifiers?.chassis ||
            c.basics?.identifiers?.model ||
            c.basics?.tagline ||
            '',
        image:
            getMediaUrl(c.assets?.thumbnail) ||
            getMediaUrl(c.assets?.avatar) ||
            getMediaUrl(c.assets?.cover),
        href: `/resources/cars/${c.slug}`,
        category: c.details?.status || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="cars-hero"
                title="CARS"
                subtitle="Chassis & Machinery"
                description="Active, retired, prototype, and museum-spec racing cars across all categories."
                badge="MACHINERY"
                meta="CAR_IDX"
            />
            {featuredSlides.length > 0 && (
                <CarouselSection
                    id="cars-featured"
                    slides={featuredSlides}
                    autoplayDelay={5000}
                    ctaLabel="VIEW ALL"
                    ctaPath="/resources/cars"
                />
            )}
            {allGrid.length > 0 && (
                <GridSection
                    id="cars-all"
                    title="ALL CARS"
                    subtitle="Complete garage"
                    items={allGrid}
                    labels={{
                        unitsCount: 'CARS',
                        viewProject: 'SPECS',
                        sectionIndex: 'GARAGE',
                        fallbackAlt: 'Car',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}