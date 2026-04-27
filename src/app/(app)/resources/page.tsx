// app/(frontend)/resources/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import LogoSection from '@/components/Section/Blocks/LogoSection'
import { Car, Garage, Helmet, Media, Suit } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getResourcesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [cars, garages, helmets, suits] = await Promise.all([
            payload.find({
                collection: 'cars',
                limit: 12,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { identifiers: true, tagline: true },
                    assets: { thumbnail: true, avatar: true, cover: true },
                },
            }),
            payload.find({
                collection: 'garages',
                limit: 12,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true, identifiers: true },
                    assets: { thumbnail: true, cover: true },
                },
            }),
            payload.find({
                collection: 'helmets',
                limit: 12,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true },
                    details: { designer: true },
                    assets: { thumbnail: true, avatar: true, images: true },
                },
            }),
            payload.find({
                collection: 'suits',
                limit: 12,
                sort: 'name',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { tagline: true },
                    assets: { thumbnail: true, images: true },
                },
            }),
        ])

        return {
            cars: cars.docs as Car[],
            garages: garages.docs as Garage[],
            helmets: helmets.docs as Helmet[],
            suits: suits.docs as Suit[],
        }
    },
    ['resources-page-data'],
    { revalidate: 3600, tags: ['resources'] }
)

export default async function ResourcesPage() {
    const { cars, garages, helmets, suits } = await getResourcesData()

    const carSlides = cars.map((car) => ({
        id: String(car.id),
        title: car.name || '',
        description: car.basics?.tagline || undefined,
        image: getMediaUrl(car.assets?.thumbnail) ||
            getMediaUrl(car.assets?.avatar) ||
            getMediaUrl(car.assets?.cover) ||
            `https://picsum.photos/seed/${car.slug}/400/300`,
        ctaLabel: 'VIEW',
        ctaHref: `/resources/cars/${car.slug}`,
        meta: car.basics?.identifiers?.model || undefined,
    }))

    const garageFeatures = garages.map((garage) => ({
        id: String(garage.id),
        title: garage.name || '',
        description: garage.basics?.tagline || garage.basics?.identifiers?.code || '',
        image: getMediaUrl(garage.assets?.thumbnail) ||
            getMediaUrl(garage.assets?.cover) ||
            `https://picsum.photos/seed/${garage.slug}/400/300`,
        slug: `resources/garages/${garage.slug}`,
        stats: [],
    }))

    const helmetLogoItems = helmets.map((helmet) => {
        const firstImage = helmet.assets?.images?.[0]
        return {
            id: String(helmet.id),
            name: helmet.name || '',
            logo: getMediaUrl(helmet.assets?.thumbnail) ||
                getMediaUrl(helmet.assets?.avatar) ||
                getMediaUrl(typeof firstImage === 'object' ? firstImage : null) ||
                `https://picsum.photos/seed/${helmet.slug}/400/300`,
            description: helmet.basics?.tagline || undefined,
            category: helmet.details?.designer || 'HELMET',
            slug: `resources/helmets/${helmet.slug}`,
        }
    })

    const suitItems = suits.map((suit) => {
        const firstImage = suit.assets?.images?.[0]
        return {
            id: String(suit.id),
            title: suit.name || '',
            subtitle: suit.basics?.tagline || undefined,
            image: getMediaUrl(suit.assets?.thumbnail) ||
                getMediaUrl(typeof firstImage === 'object' ? firstImage : null) ||
                `https://picsum.photos/seed/${suit.slug}/400/300`,
            href: `/resources/suits/${suit.slug}`,
        }
    })

    return (
        <main className="w-full">
            {carSlides.length > 0 && (
                <CarouselSection
                    id="resources-cars"
                    slides={carSlides}
                    autoplayDelay={4000}
                    ctaLabel="VIEW ALL CARS"
                />
            )}
            {garageFeatures.length > 0 && (
                <FeatureSection
                    id="resources-garages"
                    title="Garages"
                    subtitle="Team facilities and workspaces"
                    features={garageFeatures}
                    labels={{
                        specIndex: 'GRG',
                        statsLabel: 'DATA',
                        ctaLabel: 'VIEW',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {helmetLogoItems.length > 0 && (
                <LogoSection
                    id="resources-helmets"
                    title="Helmets"
                    subtitle="Driver head protection"
                    items={helmetLogoItems}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {suitItems.length > 0 && (
                <GridSection
                    id="resources-suits"
                    title="Suits"
                    subtitle="Racing apparel and gear"
                    items={suitItems}
                    labels={{
                        unitsCount: 'SUIT',
                        viewProject: 'VIEW',
                        sectionIndex: 'SUT',
                        fallbackAlt: 'Suit',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}