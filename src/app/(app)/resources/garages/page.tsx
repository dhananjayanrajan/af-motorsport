// app/(frontend)/resources/garages/page.tsx
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

const getGaragesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'garages',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true },
                    tagline: true,
                    description: true,
                },
                details: {
                    type: true,
                    capacity: true,
                    accessibility: true,
                    location: true,
                    ownership: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['garages-page-data'],
    { revalidate: 300, tags: ['garages'] }
)

export default async function GaragesPage() {
    const garages = await getGaragesData()

    const allGrid = garages.map((g) => ({
        id: String(g.id),
        title: g.name,
        subtitle:
            g.basics?.tagline ||
            resolveName(g.details?.ownership) ||
            g.details?.type ||
            '',
        image: getMediaUrl(g.assets?.thumbnail) || getMediaUrl(g.assets?.cover),
        href: `/resources/garages/${g.slug}`,
        category:
            g.details?.capacity
                ? `${g.details.capacity} units`
                : g.details?.type || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="garages-hero"
                title="GARAGES"
                subtitle="Workspace & Paddock Facilities"
                description="Permanent, temporary, mobile, and shared garage facilities at every venue."
                badge="FACILITIES"
                meta="GAR_IDX"
            />
            {allGrid.length > 0 && (
                <GridSection
                    id="garages-all"
                    title="ALL GARAGES"
                    subtitle="Complete facility directory"
                    items={allGrid}
                    labels={{
                        unitsCount: 'GARAGES',
                        viewProject: 'DETAILS',
                        sectionIndex: 'DIRECTORY',
                        fallbackAlt: 'Garage',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}