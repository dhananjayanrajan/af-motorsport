// app/(frontend)/resources/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
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
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                },
            }),
            payload.find({
                collection: 'garages',
                limit: 12,
                sort: 'name',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                },
            }),
            payload.find({
                collection: 'helmets',
                limit: 12,
                sort: 'name',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                },
            }),
            payload.find({
                collection: 'suits',
                limit: 12,
                sort: 'name',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
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

    const carItems: any[] = cars.map((car: Car) => {
        const imageUrl = car.assets?.thumbnail
            ? getMediaUrl(car.assets.thumbnail)
            : car.assets?.avatar
                ? getMediaUrl(car.assets.avatar)
                : car.assets?.cover
                    ? getMediaUrl(car.assets.cover)
                    : `https://picsum.photos/seed/${car.slug}/400/300`

        return {
            id: String(car.id),
            title: car.name,
            subtitle: car.basics?.identifiers?.model || car.basics?.tagline || undefined,
            image: imageUrl,
            href: `/resources/cars/${car.slug}`,
        }
    })

    const garageItems: any[] = garages.map((garage: Garage) => {
        const imageUrl = garage.assets?.thumbnail
            ? getMediaUrl(garage.assets.thumbnail)
            : garage.assets?.cover
                ? getMediaUrl(garage.assets.cover)
                : `https://picsum.photos/seed/${garage.slug}/400/300`

        return {
            id: String(garage.id),
            title: garage.name,
            subtitle: garage.basics?.tagline || garage.basics?.identifiers?.code || undefined,
            image: imageUrl,
            href: `/resources/garages/${garage.slug}`,
        }
    })

    const helmetItems: any[] = helmets.map((helmet: Helmet) => {
        const imageUrl = helmet.assets?.thumbnail
            ? getMediaUrl(helmet.assets.thumbnail)
            : helmet.assets?.avatar
                ? getMediaUrl(helmet.assets.avatar)
                : helmet.assets?.images && helmet.assets.images.length > 0
                    ? getMediaUrl(helmet.assets.images[0])
                    : `https://picsum.photos/seed/${helmet.slug}/400/300`

        return {
            id: String(helmet.id),
            title: helmet.name,
            subtitle: helmet.basics?.tagline || helmet.details?.designer || undefined,
            image: imageUrl,
            href: `/resources/helmets/${helmet.slug}`,
        }
    })

    const suitItems: any[] = suits.map((suit: Suit) => {
        const imageUrl = suit.assets?.thumbnail
            ? getMediaUrl(suit.assets.thumbnail)
            : suit.assets?.images && suit.assets.images.length > 0
                ? getMediaUrl(suit.assets.images[0])
                : `https://picsum.photos/seed/${suit.slug}/400/300`

        return {
            id: String(suit.id),
            title: suit.name,
            subtitle: suit.basics?.tagline || undefined,
            image: imageUrl,
            href: `/resources/suits/${suit.slug}`,
        }
    })

    return (
        <main className="w-full">
            {carItems.length > 0 && (
                <GridSection
                    id="resources-cars"
                    title="Cars"
                    subtitle="Racing vehicles and machinery"
                    items={carItems}
                    labels={{
                        unitsCount: 'CARS',
                        viewProject: 'VIEW',
                        sectionIndex: 'CAR',
                        fallbackAlt: 'Car',
                    }}
                    columns={4}
                />
            )}
            {garageItems.length > 0 && (
                <GridSection
                    id="resources-garages"
                    title="Garages"
                    subtitle="Team facilities and workspaces"
                    items={garageItems}
                    labels={{
                        unitsCount: 'GAR',
                        viewProject: 'VIEW',
                        sectionIndex: 'GRG',
                        fallbackAlt: 'Garage',
                    }}
                    columns={4}
                />
            )}
            {helmetItems.length > 0 && (
                <GridSection
                    id="resources-helmets"
                    title="Helmets"
                    subtitle="Driver head protection"
                    items={helmetItems}
                    labels={{
                        unitsCount: 'HELM',
                        viewProject: 'VIEW',
                        sectionIndex: 'HLM',
                        fallbackAlt: 'Helmet',
                    }}
                    columns={4}
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