// app/(frontend)/opportunities/vacancies/[slug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getVacancyDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'vacancies',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['vacancy-details'],
    { revalidate: 3600, tags: ['vacancy-details'] }
)

export default async function VacancyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const vacancy = await getVacancyDetailsData(slug)

    if (!vacancy) notFound()

    const heroBackgroundImage = vacancy.assets?.thumbnail
        ? getMediaUrl(vacancy.assets.thumbnail)
        : vacancy.seo?.image
            ? getMediaUrl(vacancy.seo.image)
            : undefined

    const positionEvents: any[] = []
    if (vacancy.details?.positions?.list) {
        vacancy.details.positions.list.forEach((pos, idx) => {
            if (pos.title) {
                positionEvents.push({
                    id: pos.id || `pos-${idx}`,
                    date: pos.start ? new Date(pos.start).toLocaleDateString() : 'TBD',
                    title: pos.title,
                    description: pos.end ? `Until ${new Date(pos.end).toLocaleDateString()}` : undefined,
                    status: idx === 0 ? 'active' as const : 'upcoming' as const,
                })
            }
        })
    }

    const specItems: any[] = []
    if (vacancy.details?.specifications?.list) {
        vacancy.details.specifications.list.forEach((spec) => {
            if (spec.parameter) {
                specItems.push({
                    id: spec.id || String(Math.random()),
                    title: spec.parameter,
                    subtitle: spec.value || spec.description || undefined,
                })
            }
        })
    }

    const expectationEntries: any[] = []
    if (vacancy.details?.expectations?.list) {
        vacancy.details.expectations.list.forEach((exp) => {
            if (exp.name) {
                expectationEntries.push({
                    id: exp.id || String(Math.random()),
                    title: exp.name,
                    subtitle: exp.statement || exp.criteria || undefined,
                    status: exp.type || undefined,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="vacancy-details-cover"
                title={vacancy.name}
                subtitle={vacancy.basics.title}
                description={vacancy.basics.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={vacancy.details?.department || vacancy.details?.contract || undefined}
            />
            {positionEvents.length > 0 && (
                <TimelineSection
                    id="vacancy-positions"
                    title="Available Positions"
                    subtitle="Open roles and timelines"
                    events={positionEvents}
                    labels={{
                        statusPrefix: 'STAT',
                        eventIndexLabel: 'EVENT',
                        deploymentStatus: {
                            completed: 'DONE',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                    orientation="horizontal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {specItems.length > 0 && (
                <GridSection
                    id="vacancy-specifications"
                    title="Specifications"
                    subtitle="Role requirements"
                    items={specItems}
                    labels={{
                        unitsCount: 'SPEC',
                        viewProject: 'VIEW',
                        sectionIndex: 'SPC',
                        fallbackAlt: 'Spec',
                    }}
                    columns={3}
                />
            )}
            {expectationEntries.length > 0 && (
                <ListSection
                    id="vacancy-expectations"
                    title="Expectations"
                    subtitle="What we're looking for"
                    entries={expectationEntries}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'TIME',
                        indexPrefix: 'EXP',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}