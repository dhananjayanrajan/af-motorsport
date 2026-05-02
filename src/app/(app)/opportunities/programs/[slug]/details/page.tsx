// app/(frontend)/opportunities/programs/[slug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import { Driver, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getProgramDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'programs',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                assets: {
                    cover: true,
                    documents: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    objective: true,
                    status: true,
                    mentors: true,
                    participants: true,
                },
                traits: {
                    eligibility: {
                        list: true,
                    },
                    curriculum: {
                        list: true,
                    },
                },
            },
        })
        return result.docs[0] || null
    },
    ['program-details'],
    { revalidate: 3600, tags: ['program-details'] }
)

export default async function ProgramDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const program = await getProgramDetailsData(slug)

    if (!program) notFound()

    const heroBackgroundImage = getMediaUrl(program.assets?.cover) || getMediaUrl(program.seo?.image)

    const eligibilityEntries: any[] = (program.traits?.eligibility?.list || [])
        .filter((item) => item.criteria)
        .map((item) => ({
            id: item.id || String(Math.random()),
            title: item.criteria,
            subtitle: item.value || item.description || undefined,
        }))

    const curriculumEntries: any[] = (program.traits?.curriculum?.list || [])
        .filter((item) => item.module_name)
        .map((item) => ({
            id: item.id || String(Math.random()),
            title: item.module_name,
            subtitle: item.deliverable || undefined,
            status: item.duration || undefined,
        }))

    const mentorItems: any[] = (program.details?.mentors || [])
        .filter((mentor): mentor is any => mentor !== null && typeof mentor === 'object' && 'first_name' in mentor)
        .map((mentor) => ({
            id: String(mentor.id),
            title: `${mentor.first_name} ${mentor.last_name}`,
            subtitle: mentor.basics?.title || 'Mentor',
            image: getMediaUrl(mentor.assets?.avatar) || `https://picsum.photos/seed/${mentor.id}/400/300`,
        }))

    const participantItems: any[] = (program.details?.participants || [])
        .filter((participant): participant is Driver => participant !== null && typeof participant === 'object' && 'first_name' in participant)
        .map((participant) => ({
            id: String(participant.id),
            title: `${participant.first_name} ${participant.last_name}`,
            subtitle: participant.basics?.racing_number ? `#${participant.basics.racing_number}` : undefined,
            image: getMediaUrl(participant.assets?.avatar) || `https://picsum.photos/seed/${participant.id}/400/300`,
        }))

    return (
        <main className="w-full">
            <HeroSection
                id="program-details-cover"
                title={program.name}
                subtitle="Program Details"
                description={program.details?.objective || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={program.details?.status || undefined}
            />
            {eligibilityEntries.length > 0 && (
                <ListSection
                    id="program-eligibility"
                    title="Eligibility"
                    subtitle="Requirements to participate"
                    entries={eligibilityEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'ELG',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            {curriculumEntries.length > 0 && (
                <ListSection
                    id="program-curriculum"
                    title="Curriculum"
                    subtitle="Program modules and deliverables"
                    entries={curriculumEntries}
                    labels={{
                        statusPrefix: 'DUR',
                        timePrefix: 'TIME',
                        indexPrefix: 'MOD',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {mentorItems.length > 0 && (
                <GridSection
                    id="program-mentors"
                    title="Mentors"
                    subtitle="Program guides and instructors"
                    items={mentorItems}
                    labels={{
                        unitsCount: 'MENT',
                        viewProject: 'VIEW',
                        sectionIndex: 'MTR',
                        fallbackAlt: 'Mentor',
                    }}
                    columns={4}
                />
            )}
            {participantItems.length > 0 && (
                <GridSection
                    id="program-participants"
                    title="Participants"
                    subtitle="Current program members"
                    items={participantItems}
                    labels={{
                        unitsCount: 'PART',
                        viewProject: 'VIEW',
                        sectionIndex: 'PRT',
                        fallbackAlt: 'Participant',
                    }}
                    columns={4}
                />
            )}
            <DocumentsSection
                id="program-documents"
                title="Documents"
                subtitle="Program resources"
                documents={program.assets?.documents}
                referenceCode={program.slug || 'PRG'}
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}