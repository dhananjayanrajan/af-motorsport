// app/(frontend)/teams/leaders/page.tsx
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

const getLeadersData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'leaders',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: {
                    title: true,
                    nickname: true,
                    nationality: true,
                },
                details: {
                    quote: true,
                    designations: true,
                },
                assets: {
                    avatar: true,
                    cover: true,
                },
            },
        })
        return result.docs
    },
    ['leaders-page-data'],
    { revalidate: 120, tags: ['leaders'] }
)

export default async function LeadersPage() {
    const leaders = await getLeadersData()

    const featuredLeaders = leaders.slice(0, 8).map((l) => {
        const nationality =
            l.basics?.nationality && typeof l.basics.nationality === 'object' && 'name' in l.basics.nationality
                ? l.basics.nationality.name
                : ''
        const designationNames =
            l.details?.designations
                ?.map((d) => (typeof d === 'object' ? d.name : ''))
                .filter(Boolean)
                .join(' · ') || ''
        return {
            id: String(l.id),
            title: `${l.first_name} ${l.last_name}`,
            description: l.details?.quote || designationNames || '',
            image: getMediaUrl(l.assets?.avatar),
            ctaLabel: 'PROFILE',
            ctaHref: `/teams/leaders/${l.slug}`,
            meta: l.basics?.title || undefined,
            tags: [nationality].filter(Boolean) as string[],
        }
    })

    const allLeaders = leaders.map((l) => {
        const nationality =
            l.basics?.nationality && typeof l.basics.nationality === 'object' && 'name' in l.basics.nationality
                ? l.basics.nationality.name
                : ''
        const designationNames =
            l.details?.designations
                ?.map((d) => (typeof d === 'object' ? d.name : ''))
                .filter(Boolean)
                .join(' · ') || ''
        return {
            id: String(l.id),
            title: `${l.first_name} ${l.last_name}`,
            subtitle: l.basics?.title || designationNames || nationality || '',
            image: getMediaUrl(l.assets?.avatar),
            href: `/teams/leaders/${l.slug}`,
            category: l.basics?.nickname || undefined,
        }
    })

    return (
        <main className="w-full">
            <HeroSection
                id="leaders-hero"
                title="LEADERS"
                subtitle="Team Principals & Management"
                description="The visionaries and decision-makers behind every team on the grid."
                badge="COMMAND"
                meta="LDR_IDX"
            />
            {featuredLeaders.length > 0 && (
                <CarouselSection
                    id="leaders-featured"
                    slides={featuredLeaders}
                    autoplayDelay={5000}
                    ctaLabel="VIEW ALL"
                    ctaPath="/teams/leaders"
                />
            )}
            {allLeaders.length > 0 && (
                <GridSection
                    id="leaders-all"
                    title="COMMAND STRUCTURE"
                    subtitle="Every principal and director"
                    items={allLeaders}
                    labels={{
                        unitsCount: 'LEADERS',
                        viewProject: 'PROFILE',
                        sectionIndex: 'COMMAND',
                        fallbackAlt: 'Leader',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}