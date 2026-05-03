// app/(app)/resources/helmets/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MarqueeSection from '@/components/Section/Blocks/MarqueeSection'
import { Helmet, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getHelmetsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'helmets',
            limit: 50,
            depth: 1,
            sort: 'name',
            select: {
                id: true,
                name: true,
                slug: true,
                details: { year: true, designer: true, style: true },
                assets: { avatar: true },
            },
        })
        return result.docs as Helmet[]
    },
    ['helmets-page-data'],
    { revalidate: 3600, tags: ['helmets'] }
)

export default async function HelmetsPage() {
    const helmets = await getHelmetsData()

    const gridItems = helmets.map((h) => ({
        id: String(h.id),
        title: h.name,
        subtitle: h.details?.year || undefined,
        image: getMediaUrl(h.assets?.avatar) || `https://picsum.photos/seed/${h.slug}/400/300`,
        href: `/resources/helmets/${h.slug}`,
        category: h.details?.style || undefined,
    }))

    const designerNames = [...new Set(helmets.map(h => h.details?.designer).filter(Boolean))] as string[]
    const styleNames = [...new Set(helmets.map(h => h.details?.style).filter(Boolean))] as string[]
    const allNames = [...designerNames, ...styleNames]
    const marqueeItems = allNames.length > 0
        ? allNames.map((name, idx) => ({
            id: String(idx),
            name,
            logo: `https://picsum.photos/seed/helmet-marquee-${idx}/200/200`,
        }))
        : []

    return (
        <main className="w-full">
            <HeroSection
                id="helmets-hero"
                title="HELMETS"
                subtitle="Design & Safety"
                description="Explore the complete collection of driver helmets, showcasing unique designs and cutting-edge safety technology."
                badge="SAFETY"
                meta="HEL_IDX"
            />
            {marqueeItems.length > 0 && (
                <MarqueeSection id="helmets-marquee" title="DESIGNERS & STYLES" subtitle="Creative directory" items={marqueeItems} headerVariant={1} footerVariant={1} />
            )}
            {gridItems.length > 0 && (
                <GridSection id="helmets-grid" title="VISUAL ROSTER" subtitle="All helmet designs" items={gridItems} labels={{ unitsCount: 'HELMETS', viewProject: 'PROFILE', sectionIndex: 'HEL', fallbackAlt: 'Helmet' }} columns={4} headerVariant={1} footerVariant={1} />
            )}
        </main>
    )
}