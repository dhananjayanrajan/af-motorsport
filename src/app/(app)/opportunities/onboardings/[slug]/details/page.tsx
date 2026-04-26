import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
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

const getOnboardingDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'onboardings',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                basics: {
                    description: true,
                    identifiers: { code: true },
                },
                assets: {
                    cover: true,
                    documents: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    type: true,
                },
                traits: {
                    checklist: {
                        list: true,
                    },
                    modules: {
                        list: true,
                    },
                    quizzes: {
                        list: true,
                    },
                },
            },
        })
        return result.docs[0] || null
    },
    ['onboarding-details'],
    { revalidate: 3600, tags: ['onboarding-details'] }
)

export default async function OnboardingDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const onboarding = await getOnboardingDetailsData(slug)

    if (!onboarding) notFound()

    const heroBackgroundImage = onboarding.assets?.cover
        ? getMediaUrl(onboarding.assets.cover)
        : onboarding.seo?.image
            ? getMediaUrl(onboarding.seo.image)
            : undefined

    const taskEntries: any[] = (onboarding.traits?.checklist?.list || [])
        .filter((task) => task.task)
        .map((task) => ({
            id: task.id || String(Math.random()),
            title: task.task,
            subtitle: task.due_date ? `Due: ${new Date(task.due_date).toLocaleDateString()}` : undefined,
            status: task.completed ? 'Completed' : task.required ? 'Required' : 'Optional',
        }))

    const moduleEntries: any[] = (onboarding.traits?.modules?.list || [])
        .filter((mod) => mod.name)
        .map((mod) => ({
            id: mod.id || String(Math.random()),
            title: mod.name,
            subtitle: mod.content || undefined,
            status: mod.duration || mod.type || undefined,
        }))

    const quizEntries: any[] = (onboarding.traits?.quizzes?.list || [])
        .filter((quiz) => quiz.question)
        .map((quiz) => ({
            id: quiz.id || String(Math.random()),
            title: quiz.question,
            subtitle: quiz.answer ? `Answer: ${quiz.answer}` : undefined,
            status: quiz.explanation || undefined,
        }))

    const documentItems: any[] = (onboarding.assets?.documents || [])
        .map((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                return {
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    subtitle: media.mimeType || undefined,
                    image: url,
                    href: url,
                }
            }
            return null
        })
        .filter(Boolean)

    return (
        <main className="w-full">
            <HeroSection
                id="onboarding-details-cover"
                title={onboarding.name}
                subtitle="Onboarding Details"
                description={onboarding.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={onboarding.details?.type || onboarding.basics?.identifiers?.code || undefined}
            />
            {taskEntries.length > 0 && (
                <ListSection
                    id="onboarding-tasks"
                    title="Tasks"
                    subtitle="Onboarding checklist"
                    entries={taskEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'TSK',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {moduleEntries.length > 0 && (
                <ListSection
                    id="onboarding-modules"
                    title="Modules"
                    subtitle="Training content"
                    entries={moduleEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'MOD',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {quizEntries.length > 0 && (
                <ListSection
                    id="onboarding-quizzes"
                    title="Quizzes"
                    subtitle="Knowledge checks"
                    entries={quizEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'QUZ',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="onboarding-documents"
                    title="Documents"
                    subtitle="Onboarding resources"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'VIEW',
                        sectionIndex: 'DOC',
                        fallbackAlt: 'Document',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}