// app/(app)/resources/cars/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import TableSection from '@/components/Section/Blocks/TableSection'
import { Car, Media, Race } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getCarsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [carsRes, racesRes] = await Promise.all([
            payload.find({
                collection: 'cars',
                limit: 50,
                depth: 2,
                sort: 'name',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { identifiers: { model: true }, tagline: true, description: true },
                    details: { status: true, technicalCategories: true, specifications: { list: true } },
                    assets: { avatar: true, thumbnail: true },
                },
            }),
            payload.find({
                collection: 'races',
                limit: 12,
                depth: 1,
                sort: '-details.start_date',
                select: { id: true, name: true, slug: true, assets: { thumbnail: true, highlights: true } },
            }),
        ])

        return {
            cars: carsRes.docs as Car[],
            races: racesRes.docs as Race[],
        }
    },
    ['cars-page-data'],
    { revalidate: 3600, tags: ['cars'] }
)

export default async function CarsPage() {
    const { cars, races } = await getCarsData()

    const activeCars = cars.filter(c => c.details?.status === 'Active')
    const retiredCars = cars.filter(c => c.details?.status === 'Retired' || c.details?.status === 'Museum')

    const gridItems = activeCars.map((c) => ({
        id: String(c.id),
        title: c.name,
        subtitle: c.basics?.identifiers?.model || undefined,
        image: getMediaUrl(c.assets?.avatar) || getMediaUrl(c.assets?.thumbnail) || `https://picsum.photos/seed/${c.slug}/400/300`,
        href: `/resources/cars/${c.slug}`,
        category: c.details?.status || undefined,
    }))

    const tableColumns = [
        { key: 'name', label: 'Name', sortable: true, width: undefined },
        { key: 'model', label: 'Model', sortable: true, width: undefined },
        { key: 'status', label: 'Status', sortable: true, width: undefined },
        { key: 'category', label: 'Category', sortable: true, width: undefined },
    ]

    const tableRows = cars.map((c) => ({
        id: String(c.id),
        cells: {
            name: c.name,
            model: c.basics?.identifiers?.model || 'N/A',
            status: c.details?.status || 'N/A',
            category: c.details?.technicalCategories || 'N/A',
        },
    }))

    const retiredEntries = retiredCars.map((c) => ({
        id: String(c.id),
        title: c.name,
        subtitle: c.basics?.identifiers?.model || undefined,
        status: c.details?.status || undefined,
        tag: c.details?.technicalCategories || undefined,
        href: `/resources/cars/${c.slug}`,
    }))

    const raceSlides = races.map((race) => ({
        id: String(race.id),
        title: race.name,
        description: '',
        image: getMediaUrl(race.assets?.thumbnail) || getMediaUrl(race.assets?.highlights?.[0]) || `https://picsum.photos/seed/${race.slug}/1200/1600`,
        ctaLabel: 'VIEW RACE',
        ctaHref: `/calendar/races/${race.slug}`,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="cars-hero"
                title="CARS"
                subtitle="Racing Fleet"
                description="Browse the complete inventory of competition vehicles, from active championship contenders to historic museum pieces."
                badge="FLEET"
                meta="CAR_IDX"
            />
            {gridItems.length > 0 && (
                <GridSection
                    id="cars-active"
                    title="ACTIVE FLEET"
                    subtitle="Current competition vehicles"
                    items={gridItems}
                    labels={{ unitsCount: 'CARS', viewProject: 'PROFILE', sectionIndex: 'CAR', fallbackAlt: 'Car' }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {tableRows.length > 0 && (
                <TableSection
                    id="cars-inventory"
                    title="TECHNICAL INVENTORY"
                    subtitle="Full vehicle registry"
                    columns={tableColumns}
                    rows={tableRows}
                    labels={{ sortActive: 'SORTED', rowIndicator: 'ROW' }}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {retiredEntries.length > 0 && (
                <ListSection
                    id="cars-retired"
                    title="RETIRED & MUSEUM"
                    subtitle="Historic vehicles"
                    entries={retiredEntries}
                    labels={{ statusPrefix: 'STATUS', timePrefix: 'ID', indexPrefix: 'CAR' }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {raceSlides.length > 0 && (
                <CarouselSection
                    id="cars-race-highlights"
                    slides={raceSlides}
                    autoplayDelay={5000}
                />
            )}
        </main>
    )
}