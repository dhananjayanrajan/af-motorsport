import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import { Media, Onboarding } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getOnboarding(slug: string): Promise<Onboarding | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'onboardings',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function OnboardingDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const onboarding = await getOnboarding(slug)

    if (!onboarding) {
        return notFound()
    }

    const coverImage = onboarding.assets?.cover && typeof onboarding.assets.cover === 'object'
        ? onboarding.assets.cover as Media
        : null

    const taskPanels = onboarding.traits?.checklist?.list?.map(task => ({
        id: task.id || `${onboarding.id}-task-${task.task}`,
        title: task.task || 'Task',
        label: task.required ? 'REQUIRED' : 'OPTIONAL',
        summary: task.due_date ? `Due: ${task.due_date}` : 'No deadline',
        content: task.completed ? 'Completed ✓' : 'Pending completion',
        metadata: [
            { label: 'STATUS', value: task.completed ? 'COMPLETED' : 'PENDING' },
            { label: 'DUE DATE', value: task.due_date?.split('T')[0] || 'TBD' },
        ]
    })) || []

    const modulePanels = onboarding.traits?.modules?.list?.map(module => ({
        id: module.id || `${onboarding.id}-mod-${module.name}`,
        title: module.name || 'Module',
        label: module.type?.toUpperCase() || 'MODULE',
        summary: module.duration || 'Self-paced',
        content: module.content || 'No content available',
        metadata: [
            { label: 'DURATION', value: module.duration || 'TBD' },
            { label: 'TYPE', value: module.type?.toUpperCase() || 'STANDARD' },
        ]
    })) || []

    const quizPanels = onboarding.traits?.quizzes?.list?.map(quiz => ({
        id: quiz.id || `${onboarding.id}-quiz-${quiz.question}`,
        title: quiz.question?.substring(0, 50) || 'Question',
        label: 'ASSESSMENT',
        summary: 'Knowledge check',
        content: `Answer: ${quiz.answer || 'Not provided'}\n\nExplanation: ${quiz.explanation || 'No explanation'}`,
        metadata: [
            { label: 'STATUS', value: 'PENDING' },
        ]
    })) || []

    const documents = onboarding.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Onboarding Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={onboarding.basics?.identifiers?.code || `ONB-${onboarding.id}`}
                title={onboarding.name}
                meta={onboarding.basics?.description || 'Onboarding Process'}
                image={coverImage}
                tags={[
                    onboarding.details.type || 'Onboarding',
                    onboarding.details.status || 'Draft'
                ]}
            />

            {taskPanels.length > 0 && (
                <ExpandableList
                    id="ONB_TASKS"
                    title="Checklist Tasks"
                    panels={taskPanels}
                />
            )}

            {modulePanels.length > 0 && (
                <ExpandableList
                    id="ONB_MODULES"
                    title="Training Modules"
                    panels={modulePanels}
                />
            )}

            {quizPanels.length > 0 && (
                <ExpandableList
                    id="ONB_QUIZZES"
                    title="Knowledge Assessments"
                    panels={quizPanels}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="ONB_DOCS"
                    title="Supporting Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}