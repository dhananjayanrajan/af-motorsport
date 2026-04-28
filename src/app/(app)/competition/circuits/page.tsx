// app/(frontend)/competition/circuits/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MapSection from '@/components/Section/Blocks/MapSection'
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

const getCircuitsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'circuits',
            limit: 24,
            depth: 1,
            sort: 'name',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true, abbreviation: true },
                    tagline: true,
                    description: true,
                },
                details: {
                    type: true,
                    length_km: true,
                    turns: true,
                    fia_grade: true,
                    direction: true,
                    location: true,
                    country: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['circuits-page-data'],
    { revalidate: 300, tags: ['circuits'] }
)

export default async function CircuitsPage() {
    const circuits = await getCircuitsData()

    const mapLocations = circuits
        .filter((c) => c.details?.location)
        .map((c) => {
            const [lng, lat] = c.details!.location!
            return {
                id: String(c.id),
                name: c.name,
                lat,
                lng,
                description: c.details?.type || c.basics?.tagline || undefined,
                address: c.details?.country ? resolveName(c.details.country) : undefined,
                type: 'primary' as const,
                slug: `/competition/circuits/${c.slug}`,
            }
        })

    const gridItems = circuits.map((c) => {
        const country = c.details?.country ? resolveName(c.details.country) : ''
        return {
            id: String(c.id),
            title: c.name,
            subtitle:
                country ||
                c.basics?.tagline ||
                '',
            image: getMediaUrl(c.assets?.thumbnail) || getMediaUrl(c.assets?.cover),
            href: `/competition/circuits/${c.slug}`,
            category:
                c.details?.fia_grade
                    ? `FIA Grade ${c.details.fia_grade}`
                    : c.details?.type || undefined,
        }
    })

    return (
        <main className="w-full">
            <HeroSection
                id="circuits-hero"
                title="CIRCUITS"
                subtitle="Every Turn, Every Straight"
                description="Permanent road courses, street circuits, and temporary venues."
                badge="VENUES"
                meta="CIR_IDX"
            />
            {mapLocations.length > 0 && (
                <MapSection
                    id="circuits-map"
                    title="CIRCUIT MAP"
                    subtitle="Global venue locations"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'HQ',
                        intelLabel: 'INTEL',
                        routeLabel: 'ROUTE',
                        timeLabel: 'TIME',
                        distLabel: 'DIST',
                        recordLabel: 'RECORD',
                        filterLabels: {
                            all: 'ALL',
                            primary: 'PRIMARY',
                            satellite: 'SATELLITE',
                            pathing: 'ROUTES',
                        },
                    }}
                    zoom={2}
                />
            )}
            {gridItems.length > 0 && (
                <GridSection
                    id="circuits-all"
                    title="ALL CIRCUITS"
                    subtitle="Complete venue directory"
                    items={gridItems}
                    labels={{
                        unitsCount: 'CIRCUITS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'DIRECTORY',
                        fallbackAlt: 'Circuit',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}