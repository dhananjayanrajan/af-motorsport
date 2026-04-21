import DirectoryGrid from '@/components/Section/DirectoryGrid'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getResourcesData() {
    const payload = await getPayload({ config: configPromise })

    const { docs: cars } = await payload.find({
        collection: 'cars',
        limit: 12,
        sort: '-createdAt',
    })

    const { docs: garages } = await payload.find({
        collection: 'garages',
        limit: 12,
        sort: '-createdAt',
    })

    const { docs: helmets } = await payload.find({
        collection: 'helmets',
        limit: 12,
        sort: '-createdAt',
    })

    const { docs: suits } = await payload.find({
        collection: 'suits',
        limit: 12,
        sort: '-createdAt',
    })

    return { cars, garages, helmets, suits }
}

export default async function ResourcesPage() {
    const { cars, garages, helmets, suits } = await getResourcesData()

    const carItems = cars.map(car => {
        const thumbnail = car.assets?.thumbnail && typeof car.assets.thumbnail === 'object'
            ? car.assets.thumbnail as Media
            : null

        return {
            id: car.id.toString(),
            title: car.name,
            subtitle: car.basics?.tagline || car.basics?.identifiers?.model || undefined,
            label: car.basics?.identifiers?.chassis || 'CAR',
            image: thumbnail,
            href: `/resources/cars/${car.slug}`,
            metadata: [
                { label: 'STATUS', value: car.details?.status || 'Active' },
                { label: 'MODEL', value: car.basics?.identifiers?.model || 'TBD' },
            ]
        }
    })

    const garageItems = garages.map(garage => {
        const thumbnail = garage.assets?.thumbnail && typeof garage.assets.thumbnail === 'object'
            ? garage.assets.thumbnail as Media
            : null

        return {
            id: garage.id.toString(),
            title: garage.name,
            subtitle: garage.basics?.tagline || garage.details?.type || undefined,
            label: garage.basics?.identifiers?.code || 'GARAGE',
            image: thumbnail,
            href: `/resources/garages/${garage.slug}`,
            metadata: [
                { label: 'TYPE', value: garage.details?.type || 'Permanent' },
                { label: 'CAPACITY', value: garage.details?.capacity?.toString() || 'TBD' },
            ]
        }
    })

    const helmetItems = helmets.map(helmet => {
        const thumbnail = helmet.assets?.thumbnail && typeof helmet.assets.thumbnail === 'object'
            ? helmet.assets.thumbnail as Media
            : null

        return {
            id: helmet.id.toString(),
            title: helmet.name,
            subtitle: helmet.basics?.tagline || helmet.details?.branding || undefined,
            label: helmet.details?.usage?.toUpperCase() || 'HELMET',
            image: thumbnail,
            href: `/resources/helmets/${helmet.slug}`,
            metadata: [
                { label: 'STYLE', value: helmet.details?.style || 'Modern' },
                { label: 'YEAR', value: helmet.details?.year || 'TBD' },
            ]
        }
    })

    const suitItems = suits.map(suit => {
        const thumbnail = suit.assets?.thumbnail && typeof suit.assets.thumbnail === 'object'
            ? suit.assets.thumbnail as Media
            : null

        return {
            id: suit.id.toString(),
            title: suit.name,
            subtitle: suit.basics?.tagline || suit.details?.material || undefined,
            label: suit.details?.usage?.toUpperCase() || 'SUIT',
            image: thumbnail,
            href: `/resources/suits/${suit.slug}`,
            metadata: [
                { label: 'MATERIAL', value: suit.details?.material || 'Synthetic' },
                { label: 'DURABILITY', value: suit.details?.durability || 'Medium' },
            ]
        }
    })

    return (
        <main className="w-full">
            <DirectoryGrid
                id="RES_CARS"
                title="Race Cars"
                items={carItems}
                variant="portrait"
            />

            <DirectoryGrid
                id="RES_GARAGES"
                title="Garages & Facilities"
                items={garageItems}
                variant="square"
            />

            <DirectoryGrid
                id="RES_HELMETS"
                title="Racing Helmets"
                items={helmetItems}
                variant="portrait"
            />

            <DirectoryGrid
                id="RES_SUITS"
                title="Driving Suits"
                items={suitItems}
                variant="portrait"
            />
        </main>
    )
}