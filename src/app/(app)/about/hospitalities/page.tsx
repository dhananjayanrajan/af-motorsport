// app/(frontend)/about/hospitalities/page.tsx
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

function resolveName(obj: any): string {
    if (!obj) return ''
    if (typeof obj === 'object' && 'name' in obj) return obj.name
    return ''
}

const getHospitalitiesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'hospitalities',
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
                    status: true,
                    capacity: true,
                    price_per_guest: true,
                    start_date: true,
                    end_date: true,
                    event: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['hospitalities-page-data'],
    { revalidate: 120, tags: ['hospitalities'] }
)

export default async function HospitalitiesPage() {
    const hospitalities = await getHospitalitiesData()

    const featured = hospitalities
        .filter((h) => h.details?.status === 'available' || h.details?.status === 'coming_soon')
        .slice(0, 8)

    const featuredSlides = featured.map((h) => {
        const price =
            h.details?.price_per_guest != null
                ? `$${h.details.price_per_guest}/guest`
                : ''
        return {
            id: String(h.id),
            title: h.name,
            description:
                h.basics?.tagline ||
                h.details?.type ||
                price ||
                '',
            image: getMediaUrl(h.assets?.thumbnail) || getMediaUrl(h.assets?.cover),
            ctaLabel: 'DETAILS',
            ctaHref: `/about/hospitalities/${h.slug}`,
            meta: h.details?.type || undefined,
            tags: [
                h.details?.status,
                h.details?.capacity ? `${h.details.capacity} guests` : '',
            ].filter(Boolean) as string[],
        }
    })

    const allGrid = hospitalities.map((h) => ({
        id: String(h.id),
        title: h.name,
        subtitle:
            h.basics?.tagline ||
            resolveName(h.details?.event) ||
            h.details?.type ||
            '',
        image: getMediaUrl(h.assets?.thumbnail) || getMediaUrl(h.assets?.cover),
        href: `/about/hospitalities/${h.slug}`,
        category: h.details?.status || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="hospitalities-hero"
                title="HOSPITALITY"
                subtitle="Premium Track Experiences"
                description="Paddock clubs, VIP suites, garage tours, and exclusive race-day packages."
                badge="PREMIUM"
                meta="HSP_IDX"
            />
            {featuredSlides.length > 0 && (
                <CarouselSection
                    id="hospitalities-featured"
                    slides={featuredSlides}
                    autoplayDelay={5000}
                    ctaLabel="VIEW ALL"
                    ctaPath="/about/hospitalities"
                />
            )}
            {allGrid.length > 0 && (
                <GridSection
                    id="hospitalities-all"
                    title="ALL EXPERIENCES"
                    subtitle="Complete hospitality catalogue"
                    items={allGrid}
                    labels={{
                        unitsCount: 'EXPERIENCES',
                        viewProject: 'DETAILS',
                        sectionIndex: 'CATALOGUE',
                        fallbackAlt: 'Hospitality',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}