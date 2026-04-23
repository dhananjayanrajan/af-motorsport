// app/(frontend)/opportunities/programs/[slug]/details/page.tsx
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

    const heroBackgroundImage = program.assets?.cover
        ? getMediaUrl(program.assets.cover)
        : program.seo?.image
            ? getMediaUrl(program.seo.image)
            : undefined

    const eligibilityEntries: any[] = []
    if (program.traits?.eligibility?.list) {
        program.traits.eligibility.list.forEach((item) => {
            if (item.criteria) {
                eligibilityEntries.push({
                    id: item.id || String(Math.random()),
                    title: item.criteria,
                    subtitle: item.value || item.description || undefined,
                })
            }
        })
    }

    const curriculumEntries: any[] = []
    if (program.traits?.curriculum?.list) {
        program.traits.curriculum.list.forEach((item) => {
            if (item.module_name) {
                curriculumEntries.push({
                    id: item.id || String(Math.random()),
                    title: item.module_name,
                    subtitle: item.deliverable || undefined,
                    status: item.duration || undefined,
                })
            }
        })
    }

    const mentorItems: any[] = []
    if (program.details?.mentors) {
        program.details.mentors.forEach((mentorRef) => {
            const mentor = mentorRef as any
            if (mentor && typeof mentor === 'object' && 'first_name' in mentor) {
                const imageUrl = mentor.assets?.avatar
                    ? getMediaUrl(mentor.assets.avatar)
                    : `https://picsum.photos/seed/${mentor.id}/400/300`

                mentorItems.push({
                    id: String(mentor.id),
                    title: `${mentor.first_name} ${mentor.last_name}`,
                    subtitle: mentor.basics?.title || 'Mentor',
                    image: imageUrl,
                })
            }
        })
    }

    const participantItems: any[] = []
    if (program.details?.participants) {
        program.details.participants.forEach((participantRef) => {
            const participant = participantRef as Driver
            if (participant && typeof participant === 'object' && 'first_name' in participant) {
                const imageUrl = participant.assets?.avatar
                    ? getMediaUrl(participant.assets.avatar)
                    : `https://picsum.photos/seed/${participant.id}/400/300`

                participantItems.push({
                    id: String(participant.id),
                    title: `${participant.first_name} ${participant.last_name}`,
                    subtitle: participant.basics?.racing_number ? `#${participant.basics.racing_number}` : undefined,
                    image: imageUrl,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (program.assets?.documents) {
        program.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                documentItems.push({
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    subtitle: media.mimeType || undefined,
                    image: url,
                    href: url,
                })
            }
        })
    }

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
                    headerVariant={1}
                    footerVariant={1}
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
                    headerVariant={2}
                    footerVariant={1}
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
            {documentItems.length > 0 && (
                <GridSection
                    id="program-documents"
                    title="Documents"
                    subtitle="Program resources"
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