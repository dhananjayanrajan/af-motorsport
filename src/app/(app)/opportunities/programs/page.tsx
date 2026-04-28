// app/(frontend)/opportunities/programs/page.tsx
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

const getProgramsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'programs',
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
                    duration: true,
                    start_date: true,
                    end_date: true,
                    objective: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['programs-page-data'],
    { revalidate: 120, tags: ['programs'] }
)

export default async function ProgramsPage() {
    const programs = await getProgramsData()

    const featured = programs
        .filter((p) => p.details?.status === 'active' || p.details?.status === 'approved')
        .slice(0, 8)

    const featuredSlides = featured.map((p) => ({
        id: String(p.id),
        title: p.name,
        description:
            p.basics?.tagline ||
            p.details?.objective ||
            p.basics?.description ||
            '',
        image: getMediaUrl(p.assets?.thumbnail) || getMediaUrl(p.assets?.cover),
        ctaLabel: 'DETAILS',
        ctaHref: `/opportunities/programs/${p.slug}`,
        meta: p.details?.type || undefined,
        tags: [p.details?.status, p.details?.duration].filter(Boolean) as string[],
    }))

    const allGrid = programs.map((p) => ({
        id: String(p.id),
        title: p.name,
        subtitle:
            p.basics?.tagline ||
            p.details?.type ||
            p.basics?.identifiers?.code ||
            '',
        image: getMediaUrl(p.assets?.thumbnail) || getMediaUrl(p.assets?.cover),
        href: `/opportunities/programs/${p.slug}`,
        category: p.details?.status || undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="programs-hero"
                title="PROGRAMS"
                subtitle="Development & Competition Pathways"
                description="Academy, grassroots, elite, and outreach programs for every stage of a racing career."
                badge="PATHWAYS"
                meta="PRG_IDX"
            />
            {featuredSlides.length > 0 && (
                <CarouselSection
                    id="programs-featured"
                    slides={featuredSlides}
                    autoplayDelay={5000}
                    ctaLabel="VIEW ALL"
                    ctaPath="/opportunities/programs"
                />
            )}
            {allGrid.length > 0 && (
                <GridSection
                    id="programs-all"
                    title="ALL PROGRAMS"
                    subtitle="Complete programme catalogue"
                    items={allGrid}
                    labels={{
                        unitsCount: 'PROGRAMS',
                        viewProject: 'DETAILS',
                        sectionIndex: 'CATALOGUE',
                        fallbackAlt: 'Program',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}