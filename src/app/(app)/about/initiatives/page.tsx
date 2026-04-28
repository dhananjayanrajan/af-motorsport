// app/(frontend)/about/initiatives/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getInitiativesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'initiatives',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                    mission: true,
                    description: true,
                },
                details: {
                    start_date: true,
                    end_date: true,
                    locations: true,
                },
                assets: {
                    thumbnail: true,
                    cover: true,
                    candid: true,
                },
            },
        })
        return result.docs
    },
    ['initiatives-page-data'],
    { revalidate: 120, tags: ['initiatives'] }
)

export default async function InitiativesPage() {
    const initiatives = await getInitiativesData()

    const active = initiatives.filter((i) => {
        if (!i.details?.end_date) return true
        return new Date(i.details.end_date) >= new Date()
    })

    const activeGrid = active.map((i) => ({
        id: String(i.id),
        title: i.name,
        subtitle: i.basics?.mission || i.basics?.tagline || '',
        image:
            getMediaUrl(i.assets?.thumbnail) ||
            getMediaUrl(i.assets?.candid) ||
            getMediaUrl(i.assets?.cover),
        href: `/about/initiatives/${i.slug}`,
        category: i.details?.locations ? 'HAS LOCATION' : undefined,
    }))

    const allList = initiatives.map((i) => ({
        id: String(i.id),
        title: i.name,
        subtitle: i.basics?.mission || i.basics?.tagline || '',
        tag: 'INITIATIVE',
        href: `/about/initiatives/${i.slug}`,
        timestamp: i.details?.start_date || undefined,
        status: i.details?.end_date &&
            new Date(i.details.end_date) < new Date()
            ? 'COMPLETED'
            : 'ACTIVE',
        image:
            getMediaUrl(i.assets?.thumbnail) ||
            getMediaUrl(i.assets?.candid),
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="initiatives-hero"
                title="INITIATIVES"
                subtitle="Purpose-Driven Programs"
                description="Community, sustainability, and development initiatives with measurable impact."
                badge="IMPACT"
                meta="INI_IDX"
            />
            {activeGrid.length > 0 && (
                <GridSection
                    id="initiatives-active"
                    title="ACTIVE INITIATIVES"
                    subtitle="Currently running"
                    items={activeGrid}
                    labels={{
                        unitsCount: 'ACTIVE',
                        viewProject: 'DETAILS',
                        sectionIndex: 'ACTIVE',
                        fallbackAlt: 'Initiative',
                    }}
                    columns={3}
                />
            )}
            {allList.length > 0 && (
                <ListSection
                    id="initiatives-all"
                    title="ALL INITIATIVES"
                    subtitle="Complete catalogue"
                    entries={allList}
                    labels={{
                        statusPrefix: 'STATUS',
                        timePrefix: 'STARTED',
                        indexPrefix: 'ID',
                    }}
                    showStatus
                    showTimestamp
                />
            )}
        </main>
    )
}