import DirectoryGrid from '@/components/Section/DirectoryGrid'
import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import HeroMedia from '@/components/Section/HeroMedia'
import { Driver, Leader, Media, Program } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getProgram(slug: string): Promise<Program | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'programs',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function ProgramDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const program = await getProgram(slug)

    if (!program) {
        return notFound()
    }

    const coverImage = program.assets?.cover && typeof program.assets.cover === 'object'
        ? program.assets.cover as Media
        : null

    const eligibilityPanels = program.traits?.eligibility?.list?.map(elig => ({
        id: elig.id || `${program.id}-elig-${elig.criteria}`,
        title: elig.criteria || 'Eligibility Criteria',
        label: 'REQUIREMENT',
        summary: elig.description || 'Must meet criteria',
        content: elig.value || 'Standard eligibility applies',
        metadata: [
            { label: 'TYPE', value: elig.criteria?.toUpperCase() || 'STANDARD' },
            { label: 'STATUS', value: 'REQUIRED' },
        ]
    })) || []

    const curriculumPanels = program.traits?.curriculum?.list?.map(cur => ({
        id: cur.id || `${program.id}-cur-${cur.module_name}`,
        title: cur.module_name || 'Module',
        label: 'CURRICULUM',
        summary: cur.duration || 'Course module',
        content: cur.deliverable || 'No additional details',
        metadata: [
            { label: 'DURATION', value: cur.duration || 'TBD' },
            { label: 'DELIVERABLE', value: cur.deliverable || 'Certificate' },
        ]
    })) || []

    const mentorItems = program.details?.mentors?.filter((m): m is Leader =>
        typeof m === 'object' && m !== null && 'first_name' in m
    ).map(mentor => ({
        id: mentor.id.toString(),
        title: `${mentor.first_name} ${mentor.last_name}`,
        subtitle: mentor.basics?.title || mentor.basics?.nickname || undefined,
        label: 'MENTOR',
        image: mentor.assets?.avatar && typeof mentor.assets.avatar === 'object' ? mentor.assets.avatar as Media : null,
        href: `/teams/${mentor.slug}`,
        metadata: [
            { label: 'ROLE', value: mentor.basics?.title || 'Mentor' },
        ]
    })) || []

    const participantItems = program.details?.participants?.filter((p): p is Driver =>
        typeof p === 'object' && p !== null && 'first_name' in p
    ).map(participant => ({
        id: participant.id.toString(),
        title: `${participant.first_name} ${participant.last_name}`,
        subtitle: participant.basics?.nickname || participant.basics?.competition_name || undefined,
        label: `#${participant.basics?.racing_number || '00'}`,
        image: participant.assets?.avatar && typeof participant.assets.avatar === 'object' ? participant.assets.avatar as Media : null,
        href: `/teams/${participant.slug}/drivers/${participant.slug}`,
        metadata: [
            { label: 'NATIONALITY', value: participant.basics?.nationality && typeof participant.basics.nationality === 'object' ? (participant.basics.nationality as { name: string }).name : 'TBD' },
        ]
    })) || []

    const documents = program.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Program Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={program.basics?.identifiers?.code || `PRG-${program.id}`}
                title={program.name}
                meta={program.basics?.tagline || 'Technical Specifications'}
                image={coverImage}
                tags={[
                    program.details?.type || 'Program',
                    'Details'
                ]}
            />

            {eligibilityPanels.length > 0 && (
                <ExpandableList
                    id="PRG_ELIGIBILITY"
                    title="Eligibility Requirements"
                    panels={eligibilityPanels}
                />
            )}

            {curriculumPanels.length > 0 && (
                <ExpandableList
                    id="PRG_CURRICULUM"
                    title="Program Curriculum"
                    panels={curriculumPanels}
                />
            )}

            {mentorItems.length > 0 && (
                <DirectoryGrid
                    id="PRG_MENTORS"
                    title="Program Mentors"
                    items={mentorItems}
                    variant="square"
                />
            )}

            {participantItems.length > 0 && (
                <DirectoryGrid
                    id="PRG_PARTICIPANTS"
                    title="Program Participants"
                    items={participantItems}
                    variant="portrait"
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="PRG_DOCS"
                    title="Program Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}