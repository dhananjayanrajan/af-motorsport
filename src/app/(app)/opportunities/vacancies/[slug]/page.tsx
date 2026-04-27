// app/(frontend)/opportunities/vacancies/[slug]/page.tsx
import CoverSection from '@/components/Section/Blocks/CoverSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import { FormRenderer } from '@/components/Section/Components/FormRenderer'
import { Form, Media } from '@/payload-types'
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
            depth: 1,
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

const getFormById = unstable_cache(
    async (id: string | number) => {
        const payload = await getPayload({ config: configPromise })
        try {
            const result = await payload.findByID({
                collection: 'forms',
                id: id,
            })
            return (result as Form) || null
        } catch (error) {
            return null
        }
    },
    ['vacancy-form-id'],
    { revalidate: 3600, tags: ['forms'] }
)

export default async function VacancyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const [vacancy, applicationForm] = await Promise.all([
        getVacancyData(slug),
        getFormById(1)
    ])

    if (!vacancy) notFound()

    const coverImage = getMediaUrl(vacancy.assets?.thumbnail) ||
        getMediaUrl(vacancy.seo?.image) ||
        `https://picsum.photos/seed/${vacancy.slug}/1920/1080`

    const studyImage = coverImage

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
        summary: `Submit your application for the ${vacancy.name} role.`,
        content: applicationForm ? (
            <FormRenderer form={applicationForm} />
        ) : (
            <div className="p-6 border-2 border-red-500 bg-red-500/10">
                <p className="text-red-500 font-bold uppercase italic">
                    Application form unavailable. Please contact careers@motorsport.com
                </p>
            </div>
        ),
        metadata: {
            "Department": vacancy.details?.department || 'General',
            "Contract": vacancy.details?.contract || 'TBD',
            "Ref ID": `#${vacancy.id}`,
            "Status": "Active"
        }
    }

    return (
        <main className="w-full">
            <CoverSection
                id="vacancy-cover"
                image={coverImage}
            />
            <StudySection
                id="vacancy-details"
                title="Vacancy Overview"
                subtitle="Position details"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Details"
                ctaPath={`/opportunities/vacancies/${vacancy.slug}/details`}
            />
            <PanelSection
                id="vacancy-form"
                title="Application"
                subtitle="Join the Team"
                panels={[applicationPanel]}
                labels={{
                    expansionState: { open: 'READY TO RACE', closed: 'APPLY NOW' },
                    metadataTitle: 'JOB SPECS',
                }}
                allowMultiple={false}
                headerVariant={2}
                footerVariant={1}
            />
        </main>
    )
}