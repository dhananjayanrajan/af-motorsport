import DirectoryGrid from '@/components/Section/DirectoryGrid'
import DirectoryList from '@/components/Section/DirectoryList'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function getOpportunitiesData() {
    const payload = await getPayload({ config: configPromise })

    const { docs: programs } = await payload.find({
        collection: 'programs',
        limit: 12,
        sort: '-createdAt',
    })

    const { docs: onboardings } = await payload.find({
        collection: 'onboardings',
        limit: 10,
        sort: '-createdAt',
    })

    const { docs: vacancies } = await payload.find({
        collection: 'vacancies',
        limit: 10,
        sort: '-createdAt',
    })

    const { docs: meetups } = await payload.find({
        collection: 'meetups',
        limit: 12,
        sort: '-details.start_date',
    })

    return { programs, onboardings, vacancies, meetups }
}

export default async function OpportunitiesPage() {
    const { programs, onboardings, vacancies, meetups } = await getOpportunitiesData()

    const programItems = programs.map(program => {
        const coverImage = program.assets?.cover && typeof program.assets.cover === 'object'
            ? program.assets.cover as Media
            : null

        return {
            id: program.id.toString(),
            title: program.name,
            subtitle: program.basics?.tagline || program.details?.objective || undefined,
            label: program.basics?.identifiers?.code || program.details?.type?.toUpperCase() || 'PROGRAM',
            image: coverImage,
            href: `/opportunities/programs/${program.slug}`,
            metadata: [
                { label: 'STATUS', value: program.details?.status?.toUpperCase() || 'ACTIVE' },
                { label: 'DURATION', value: program.details?.duration?.toUpperCase() || 'TBD' },
            ]
        }
    })

    const onboardingItems = onboardings.map(onboarding => ({
        id: onboarding.id.toString(),
        title: onboarding.name,
        subtitle: onboarding.basics?.description || onboarding.details?.type || undefined,
        tag: onboarding.basics?.identifiers?.code || 'ONBOARDING',
        href: `/opportunities/onboardings/${onboarding.slug}`,
        timestamp: onboarding.details?.start_date?.split('T')[0] || onboarding.createdAt.split('T')[0],
        status: onboarding.details?.status?.toUpperCase() || 'DRAFT'
    }))

    const vacancyItems = vacancies.map(vacancy => ({
        id: vacancy.id.toString(),
        title: vacancy.basics.title,
        subtitle: vacancy.basics.description || vacancy.details?.department || undefined,
        tag: vacancy.details?.contract?.toUpperCase() || 'FULL_TIME',
        href: `/opportunities/vacancies/${vacancy.slug}`,
        timestamp: vacancy.createdAt.split('T')[0],
        status: 'OPEN'
    }))

    const meetupItems = meetups.map(meetup => {
        const coverImage = meetup.assets?.cover && typeof meetup.assets.cover === 'object'
            ? meetup.assets.cover as Media
            : null

        return {
            id: meetup.id.toString(),
            title: meetup.name,
            subtitle: meetup.basics?.description || meetup.details?.format || undefined,
            label: meetup.details?.access?.toUpperCase() || 'MEETUP',
            image: coverImage,
            href: `/opportunities/meetups/${meetup.slug}`,
            metadata: [
                { label: 'FORMAT', value: meetup.details?.format?.toUpperCase() || 'IN_PERSON' },
                { label: 'DATE', value: meetup.details.start_date.split('T')[0] },
            ]
        }
    })

    return (
        <main className="w-full">
            <DirectoryGrid
                id="OPP_PROGRAMS"
                title="Development Programs"
                items={programItems}
                variant="portrait"
            />

            <DirectoryList
                id="OPP_ONBOARDINGS"
                title="Onboarding Processes"
                items={onboardingItems}
            />

            <DirectoryList
                id="OPP_VACANCIES"
                title="Open Positions"
                items={vacancyItems}
            />

            <DirectoryGrid
                id="OPP_MEETUPS"
                title="Upcoming Meetups"
                items={meetupItems}
                variant="landscape"
            />
        </main>
    )
}