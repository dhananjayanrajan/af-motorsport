// app/(app)/resources/garages/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import { Garage, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getGaragesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'garages',
            limit: 50,
            depth: 1,
            sort: 'name',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { identifiers: { code: true }, tagline: true, description: true },
                details: { type: true, capacity: true, accessibility: true, location: true, size_sq_m: true },
                assets: { thumbnail: true, cover: true },
            },
        })
        return result.docs as Garage[]
    },
    ['garages-page-data'],
    { revalidate: 3600, tags: ['garages'] }
)

export default async function GaragesPage() {
    const garages = await getGaragesData()

    const gridItems = garages.map((g) => ({
        id: String(g.id),
        title: g.name,
        subtitle: g.details?.type || undefined,
        image: getMediaUrl(g.assets?.thumbnail) || getMediaUrl(g.assets?.cover) || `https://picsum.photos/seed/${g.slug}/400/300`,
        href: `/resources/garages/${g.slug}`,
        category: g.basics?.identifiers?.code || undefined,
    }))

    const mapLocations = garages
        .filter(g => g.details?.location && Array.isArray(g.details.location) && g.details.location.length === 2)
        .map((g) => ({
            id: String(g.id),
            name: g.name,
            lat: (g.details!.location! as [number, number])[1],
            lng: (g.details!.location! as [number, number])[0],
            description: g.details?.type || undefined,
            type: 'primary' as const,
        }))

    const listEntries = garages
        .sort((a, b) => {
            const capacityA = a.details?.capacity || 0
            const capacityB = b.details?.capacity || 0
            return capacityB - capacityA
        })
        .map((g) => ({
            id: String(g.id),
            title: g.name,
            subtitle: g.basics?.description || g.basics?.tagline || undefined,
            status: g.details?.accessibility || undefined,
            tag: g.details?.capacity ? `Capacity: ${g.details.capacity}` : undefined,
            href: `/resources/garages/${g.slug}`,
            metadata: {
                type: g.details?.type || 'N/A',
                size: g.details?.size_sq_m ? `${g.details.size_sq_m} sq m` : 'N/A',
                code: g.basics?.identifiers?.code || 'N/A',
            },
        }))

    return (
        <main className="w-full">
            <HeroSection
                id="garages-hero"
                title="GARAGES"
                subtitle="Facilities & Infrastructure"
                description="Explore the global network of permanent, temporary, and mobile garages supporting the championship."
                badge="FACILITIES"
                meta="GAR_IDX"
            />
            {gridItems.length > 0 && (
                <GridSection
                    id="garages-grid"
                    title="FACILITY DIRECTORY"
                    subtitle="All garage locations"
                    items={gridItems}
                    labels={{ unitsCount: 'GARAGES', viewProject: 'PROFILE', sectionIndex: 'GAR', fallbackAlt: 'Garage' }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="garages-map"
                    title="Global Locations"
                    subtitle="Facility map"
                    locations={mapLocations}
                    labels={{ hqLabel: 'HQ', intelLabel: 'INTEL', routeLabel: 'ROUTE', timeLabel: 'TIME', distLabel: 'DIST', recordLabel: 'REC', filterLabels: { all: 'ALL', primary: 'ACTIVE', satellite: 'TEMPORARY', pathing: 'PATHING' } }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {listEntries.length > 0 && (
                <ListSection
                    id="garages-directory"
                    title="FACILITY DETAILS"
                    subtitle="Sorted by capacity with accessibility and specifications"
                    entries={listEntries}
                    labels={{ statusPrefix: 'ACCESS', timePrefix: 'CODE', indexPrefix: 'GAR' }}
                    showStatus={true}
                    showTimestamp={true}
                />
            )}
        </main>
    )
}