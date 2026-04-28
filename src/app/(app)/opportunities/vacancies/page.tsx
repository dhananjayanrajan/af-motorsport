// app/(frontend)/opportunities/vacancies/page.tsx
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

const getVacanciesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'vacancies',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    title: true,
                    description: true,
                },
                details: {
                    department: true,
                    contract: true,
                    locations: true,
                },
                assets: {
                    thumbnail: true,
                },
            },
        })
        return result.docs
    },
    ['vacancies-page-data'],
    { revalidate: 120, tags: ['vacancies'] }
)

export default async function VacanciesPage() {
    const vacancies = await getVacanciesData()

    const openGrid = vacancies.map((v) => ({
        id: String(v.id),
        title: v.basics.title,
        subtitle:
            v.name ||
            v.basics.description ||
            v.details?.department ||
            '',
        image: getMediaUrl(v.assets?.thumbnail),
        href: `/opportunities/vacancies/${v.slug}`,
        category: v.details?.contract || v.details?.department || undefined,
    }))

    const allList = vacancies.map((v) => ({
        id: String(v.id),
        title: v.basics.title,
        subtitle: v.name || '',
        tag: v.details?.contract || v.details?.department || undefined,
        href: `/opportunities/vacancies/${v.slug}`,
        status: 'OPEN',
        image: getMediaUrl(v.assets?.thumbnail),
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="vacancies-hero"
                title="VACANCIES"
                subtitle="Join the Team"
                description="Full-time, part-time, and reserve roles across engineering, operations, and commercial."
                badge="CAREERS"
                meta="VAC_IDX"
            />
            {openGrid.length > 0 && (
                <GridSection
                    id="vacancies-open"
                    title="OPEN POSITIONS"
                    subtitle="Current opportunities"
                    items={openGrid}
                    labels={{
                        unitsCount: 'ROLES',
                        viewProject: 'APPLY',
                        sectionIndex: 'OPEN',
                        fallbackAlt: 'Vacancy',
                    }}
                    columns={3}
                />
            )}
            {allList.length > 0 && (
                <ListSection
                    id="vacancies-all"
                    title="ALL VACANCIES"
                    subtitle="Complete listing"
                    entries={allList}
                    labels={{
                        statusPrefix: 'STATUS',
                        timePrefix: 'POSTED',
                        indexPrefix: 'ID',
                    }}
                    showStatus
                />
            )}
        </main>
    )
}