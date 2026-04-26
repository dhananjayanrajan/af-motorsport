import GridSection from '@/components/Section/Blocks/GridSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import { Media, Meetup, Onboarding, Program, Vacancy } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getOpportunitiesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [programs, onboardings, vacancies, meetups] = await Promise.all([
            payload.find({
                collection: 'programs',
                limit: 12,
                sort: '-createdAt',
                depth: 1,
            }),
            payload.find({
                collection: 'onboardings',
                limit: 20,
                sort: '-createdAt',
                depth: 1,
            }),
            payload.find({
                collection: 'vacancies',
                limit: 20,
                sort: '-createdAt',
                depth: 1,
            }),
            payload.find({
                collection: 'meetups',
                limit: 12,
                sort: 'details.start_date',
                depth: 1,
            }),
        ])

        return {
            programs: programs.docs as Program[],
            onboardings: onboardings.docs as Onboarding[],
            vacancies: vacancies.docs as Vacancy[],
            meetups: meetups.docs as Meetup[],
        }
    },
    ['opportunities-page-data'],
    { revalidate: 3600, tags: ['opportunities'] }
)

export default async function OpportunitiesPage() {
    const { programs, onboardings, vacancies, meetups } = await getOpportunitiesData()

    const programItems = programs.map((program: Program) => ({
        id: String(program.id),
        title: program.name.toUpperCase(),
        subtitle: program.basics?.tagline || program.details?.objective || undefined,
        image: resolveAssetUrl(program.assets, 'thumbnail', 'cover') || '',
        href: `/opportunities/programs/${program.slug}`,
    }))

    const onboardingEntries = onboardings.map((onboarding: Onboarding) => ({
        id: String(onboarding.id),
        title: onboarding.name.toUpperCase(),
        subtitle: onboarding.basics?.description || 'System integration and personnel onboarding protocol.',
        status: (onboarding.details?.status || 'Active').toUpperCase(),
        tag: (onboarding.details?.type || onboarding.basics?.identifiers?.code || 'Standard').toUpperCase(),
        href: `/opportunities/onboardings/${onboarding.slug}`,
    }))

    const vacancyEntries = vacancies.map((vacancy: Vacancy) => ({
        id: String(vacancy.id),
        title: vacancy.name.toUpperCase(),
        subtitle: vacancy.basics?.description || vacancy.basics?.title || 'Open position within the technical or operational division.',
        status: (vacancy.details?.contract || 'Full-Time').toUpperCase(),
        tag: (vacancy.details?.department || 'Engineering').toUpperCase(),
        href: `/opportunities/vacancies/${vacancy.slug}`,
    }))

    const meetupItems = meetups.map((meetup: Meetup) => ({
        id: String(meetup.id),
        title: meetup.name.toUpperCase(),
        subtitle: meetup.basics?.description || 'Community gathering and technical synchronization.',
        image: resolveAssetUrl(meetup.assets, 'thumbnail', 'cover') || '',
        href: `/opportunities/meetups/${meetup.slug}`,
    }))

    return (
        <main className="w-full bg-black-pure">
            {programItems.length > 0 && (
                <GridSection
                    id="opportunities-programs"
                    title="Active Programs"
                    subtitle="Strategic development and high-tier training initiatives"
                    items={programItems}
                    labels={{
                        unitsCount: 'Tracks',
                        viewProject: 'Engage',
                        sectionIndex: 'PRG',
                        fallbackAlt: 'Program Asset',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {onboardingEntries.length > 0 && (
                <ListSection
                    id="opportunities-onboardings"
                    title="Onboarding Protocol"
                    subtitle="Deployment pipelines for new personnel and systems"
                    entries={onboardingEntries}
                    labels={{
                        statusPrefix: 'Phase',
                        timePrefix: 'Cycle',
                        indexPrefix: 'ONB',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {vacancyEntries.length > 0 && (
                <ListSection
                    id="opportunities-vacancies"
                    title="Operational Vacancies"
                    subtitle="Recruitment for technical and competitive divisions"
                    entries={vacancyEntries}
                    labels={{
                        statusPrefix: 'Terms',
                        timePrefix: 'Post',
                        indexPrefix: 'VAC',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {meetupItems.length > 0 && (
                <GridSection
                    id="opportunities-meetups"
                    title="Event Hub"
                    subtitle="Upcoming community meetups and synchronization events"
                    items={meetupItems}
                    labels={{
                        unitsCount: 'Events',
                        viewProject: 'Details',
                        sectionIndex: 'MTG',
                        fallbackAlt: 'Meetup Asset',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}