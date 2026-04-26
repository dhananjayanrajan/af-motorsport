import PanelSection from '@/components/Section/Blocks/PanelSection'
import StudySection from '@/components/Section/Blocks/StudySection'
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

const getVacancyData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'vacancies',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1, // Keep it shallow for performance
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    title: true,
                    description: true,
                },
                assets: {
                    thumbnail: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    department: true,
                    contract: true,
                }
            }
        })
        return result.docs[0] || null
    },
    ['vacancy-detail'],
    { revalidate: 3600, tags: ['vacancy'] }
)

export default async function VacancyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const vacancy = await getVacancyData(slug)

    if (!vacancy) notFound()

    // Declarative image resolution
    const studyImage = getMediaUrl(vacancy.assets?.thumbnail) ||
        getMediaUrl(vacancy.seo?.image) ||
        `https://picsum.photos/seed/${vacancy.slug}/800/600`

    const study = {
        id: String(vacancy.id),
        title: vacancy.name,
        description: vacancy.basics?.description || vacancy.basics?.title || '',
        image: studyImage,
        metrics: [
            { label: 'Department', value: vacancy.details?.department || 'N/A' },
            { label: 'Contract', value: vacancy.details?.contract || 'N/A' },
        ],
    }

    const applicationPanel = {
        id: 'apply',
        title: 'Apply for this position',
        summary: `Submit your application for ${vacancy.name}`,
        content: (
            <div className="space-y-4">
                <p className="text-muted-foreground">Please send your CV and cover letter to careers@example.com</p>
                <p className="text-sm text-muted-foreground">Reference: {vacancy.basics?.title}</p>
            </div>
        ),
    }

    return (
        <main className="w-full">
            <StudySection
                id="vacancy-details"
                title="Vacancy Overview"
                subtitle="Position details"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/opportunities/vacancies/${vacancy.slug}/details`}
            />
            <PanelSection
                id="vacancy-form"
                title="Application"
                subtitle="How to apply"
                panels={[applicationPanel]}
                labels={{
                    expansionState: { open: 'OPEN', closed: 'CLOSED' },
                    metadataTitle: 'DETAILS',
                }}
                allowMultiple={false}
                headerVariant={2}
                footerVariant={1}
            />
        </main>
    )
}