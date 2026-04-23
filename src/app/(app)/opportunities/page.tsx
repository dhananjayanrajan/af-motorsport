// app/(frontend)/opportunities/page.tsx
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

const getOpportunitiesData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [programs, onboardings, vacancies, meetups] = await Promise.all([
            payload.find({
                collection: 'programs',
                limit: 12,
                sort: '-createdAt',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                },
            }),
            payload.find({
                collection: 'onboardings',
                limit: 20,
                sort: '-createdAt',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                },
            }),
            payload.find({
                collection: 'vacancies',
                limit: 20,
                sort: '-createdAt',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                },
            }),
            payload.find({
                collection: 'meetups',
                limit: 12,
                sort: 'details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: true,
                    details: true,
                    assets: true,
                },
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

    const programItems: any[] = programs.map((program: Program) => {
        const imageUrl = program.assets?.thumbnail
            ? getMediaUrl(program.assets.thumbnail)
            : program.assets?.cover
                ? getMediaUrl(program.assets.cover)
                : `https://picsum.photos/seed/${program.slug}/400/300`

        return {
            id: String(program.id),
            title: program.name,
            subtitle: program.basics?.tagline || program.details?.objective || undefined,
            image: imageUrl,
            href: `/opportunities/programs/${program.slug}`,
            label: program.details?.type || program.basics?.identifiers?.code || undefined,
        }
    })

    const onboardingEntries: any[] = onboardings.map((onboarding: Onboarding) => ({
        id: String(onboarding.id),
        title: onboarding.name,
        subtitle: onboarding.basics?.description || undefined,
        status: onboarding.details?.status || undefined,
        tag: onboarding.details?.type || onboarding.basics?.identifiers?.code || undefined,
        href: `/opportunities/onboardings/${onboarding.slug}`,
    }))

    const vacancyEntries: any[] = vacancies.map((vacancy: Vacancy) => ({
        id: String(vacancy.id),
        title: vacancy.name,
        subtitle: vacancy.basics?.description || vacancy.basics.title || undefined,
        status: vacancy.details?.contract || undefined,
        tag: vacancy.details?.department || undefined,
        href: `/opportunities/vacancies/${vacancy.slug}`,
    }))

    const meetupItems: any[] = meetups.map((meetup: Meetup) => {
        const imageUrl = meetup.assets?.thumbnail
            ? getMediaUrl(meetup.assets.thumbnail)
            : meetup.assets?.cover
                ? getMediaUrl(meetup.assets.cover)
                : `https://picsum.photos/seed/${meetup.slug}/400/300`

        return {
            id: String(meetup.id),
            title: meetup.name,
            subtitle: meetup.basics?.description || undefined,
            image: imageUrl,
            href: `/opportunities/meetups/${meetup.slug}`,
            label: meetup.details?.format || undefined,
            metadata: {
                Date: meetup.details?.start_date ? new Date(meetup.details.start_date).toLocaleDateString() : 'TBD',
                Access: meetup.details?.access || 'N/A',
            },
        }
    })

    return (
        <main className="w-full">
            {programItems.length > 0 && (
                <GridSection
                    id="opportunities-programs"
                    title="Programs"
                    subtitle="Development and training opportunities"
                    items={programItems}
                    columns={3}
                    cardVariant={1}
                    showMetadata={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {onboardingEntries.length > 0 && (
                <ListSection
                    id="opportunities-onboardings"
                    title="Onboarding"
                    subtitle="Get started with our organization"
                    entries={onboardingEntries}
                    variant="detailed"
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {vacancyEntries.length > 0 && (
                <ListSection
                    id="opportunities-vacancies"
                    title="Vacancies"
                    subtitle="Current job openings"
                    entries={vacancyEntries}
                    variant="detailed"
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {meetupItems.length > 0 && (
                <GridSection
                    id="opportunities-meetups"
                    title="Meetups"
                    subtitle="Upcoming events and gatherings"
                    items={meetupItems}
                    columns={3}
                    cardVariant={1}
                    showMetadata={true}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}