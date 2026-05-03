// app/(app)/resources/suits/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import { Media, Suit } from '@/payload-types'
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
            limit: 50,
            depth: 1,
            sort: 'name',
            select: {
                id: true,
                name: true,
                slug: true,
                details: { appearance: true },
                assets: { thumbnail: true },
            },
        })
        return result.docs as Suit[]
    },
    ['suits-page-data'],
    { revalidate: 3600, tags: ['suits'] }
)

export default async function SuitsPage() {
    const suits = await getSuitsData()

    const gridItems = suits.map((s) => ({
        id: String(s.id),
        title: s.name,
        subtitle: s.details?.appearance || undefined,
        image: getMediaUrl(s.assets?.thumbnail) || `https://picsum.photos/seed/${s.slug}/400/300`,
        href: `/resources/suits/${s.slug}`,
        category: 'SUIT',
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="suits-hero"
                title="SUITS"
                subtitle="Durability & Aesthetics"
                description="Browse the collection of racing suits engineered for protection, performance, and distinctive style."
                badge="APPAREL"
                meta="SUI_IDX"
            />
            {gridItems.length > 0 && (
                <GridSection id="suits-grid" title="VISUAL ROSTER" subtitle="All suit designs" items={gridItems} labels={{ unitsCount: 'SUITS', viewProject: 'PROFILE', sectionIndex: 'SUI', fallbackAlt: 'Suit' }} columns={4} headerVariant={1} footerVariant={1} />
            )}
        </main>
    )
}