// app/(frontend)/resources/helmets/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
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

const getHelmetsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'helmets',
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
                    designer: true,
                    style: true,
                    material: true,
                    year: true,
                    usage: true,
                },
                assets: {
                    avatar: true,
                    thumbnail: true,
                },
            },
        })
        return result.docs
    },
    ['helmets-page-data'],
    { revalidate: 300, tags: ['helmets'] }
)

export default async function HelmetsPage() {
    const helmets = await getHelmetsData()

    const featured = helmets.slice(0, 8)

    const featuredSlides = featured.map((h) => ({
        id: String(h.id),
        title: h.name,
        description:
            h.basics?.tagline ||
            h.details?.designer ||
            h.details?.style ||
            '',
        image:
            getMediaUrl(h.assets?.avatar) ||
            getMediaUrl(h.assets?.thumbnail),
        ctaLabel: 'DETAILS',
        ctaHref: `/resources/helmets/${h.slug}`,
        meta: h.details?.year || undefined,
        tags: [h.details?.style, h.details?.material].filter(Boolean) as string[],
    }))

    const allGrid = helmets.map((h) => ({
        id: String(h.id),
        title: h.name,
        subtitle:
            h.details?.designer ||
            h.details?.style ||
            h.basics?.tagline ||
            '',
        image:
            getMediaUrl(h.assets?.avatar) ||
            getMediaUrl(h.assets?.thumbnail),
        href: `/resources/helmets/${h.slug}`,
        category: h.details?.usage || h.details?.material || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="helmets-hero"
                title="HELMETS"
                subtitle="Lid Designs & Safety Art"
                description="Track, street, show, and performance helmets — every design documented."
                badge="LIDS"
                meta="HEL_IDX"
            />
            {featuredSlides.length > 0 && (
                <CarouselSection
                    id="helmets-featured"
                    slides={featuredSlides}
                    autoplayDelay={4000}
                    ctaLabel="VIEW ALL"
                    ctaPath="/resources/helmets"
                />
            )}
            {allGrid.length > 0 && (
                <GridSection
                    id="helmets-all"
                    title="ALL HELMETS"
                    subtitle="Complete collection"
                    items={allGrid}
                    labels={{
                        unitsCount: 'HELMETS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'COLLECTION',
                        fallbackAlt: 'Helmet',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}