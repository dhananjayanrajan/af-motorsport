// app/(frontend)/resources/suits/page.tsx
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

const getSuitsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'suits',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                    description: true,
                },
                details: {
                    usage: true,
                    durability: true,
                    material: true,
                    appearance: true,
                },
                assets: {
                    thumbnail: true,
                },
            },
        })
        return result.docs
    },
    ['suits-page-data'],
    { revalidate: 300, tags: ['suits'] }
)

export default async function SuitsPage() {
    const suits = await getSuitsData()

    const allGrid = suits.map((s) => ({
        id: String(s.id),
        title: s.name,
        subtitle:
            s.details?.material ||
            s.details?.appearance ||
            s.basics?.tagline ||
            '',
        image: getMediaUrl(s.assets?.thumbnail),
        href: `/resources/suits/${s.slug}`,
        category: s.details?.usage || s.details?.durability || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="suits-hero"
                title="SUITS"
                subtitle="Racewear & Driver Kits"
                description="Track, street, show, and performance suits — materials, durability, and design."
                badge="RACEWEAR"
                meta="SUI_IDX"
            />
            {allGrid.length > 0 && (
                <GridSection
                    id="suits-all"
                    title="ALL SUITS"
                    subtitle="Complete collection"
                    items={allGrid}
                    labels={{
                        unitsCount: 'SUITS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'COLLECTION',
                        fallbackAlt: 'Suit',
                    }}
                    columns={4}
                    headerVariant={2}
                />
            )}
        </main>
    )
}