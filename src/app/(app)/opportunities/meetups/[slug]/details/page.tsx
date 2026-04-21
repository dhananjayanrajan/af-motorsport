import DirectoryGrid from '@/components/Section/DirectoryGrid'
import DirectoryTabs from '@/components/Section/DirectoryTabs'
import DocumentGrid from '@/components/Section/DocumentGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import { Driver, Individual, Leader, Media, Meetup, Member, Organization } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getMeetup(slug: string): Promise<Meetup | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'meetups',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function MeetupDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const meetup = await getMeetup(slug)

    if (!meetup) {
        return notFound()
    }

    const coverImage = meetup.assets?.cover && typeof meetup.assets.cover === 'object'
        ? meetup.assets.cover as Media
        : null

    const hostItems: { id: string; title: string; subtitle?: string; label: string; image: Media | null; metadata: { label: string; value: string }[] }[] = []

    const orgHosts = meetup.details.hosts?.organizations?.filter((h): h is Organization =>
        typeof h === 'object' && h !== null && 'name' in h
    ).map(host => ({
        id: host.id.toString(),
        title: host.name,
        subtitle: host.basics?.tagline || host.basics?.type || undefined,
        label: 'ORGANIZATION',
        image: host.assets?.logo && typeof host.assets.logo === 'object' ? host.assets.logo as Media : null,
        metadata: [{ label: 'TYPE', value: host.basics?.type || 'Partner' }]
    })) || []

    const leaderHosts = meetup.details.hosts?.leaders?.filter((h): h is Leader =>
        typeof h === 'object' && h !== null && 'first_name' in h
    ).map(host => ({
        id: host.id.toString(),
        title: `${host.first_name} ${host.last_name}`,
        subtitle: host.basics?.title || host.basics?.nickname || undefined,
        label: 'LEADER',
        image: host.assets?.avatar && typeof host.assets.avatar === 'object' ? host.assets.avatar as Media : null,
        metadata: [{ label: 'ROLE', value: host.basics?.title || 'Host' }]
    })) || []

    const individualHosts = meetup.details.hosts?.individuals?.filter((h): h is Individual =>
        typeof h === 'object' && h !== null && 'first_name' in h
    ).map(host => ({
        id: host.id.toString(),
        title: `${host.first_name} ${host.last_name}`,
        subtitle: host.basics?.type || host.basics?.description || undefined,
        label: 'INDIVIDUAL',
        image: host.assets?.avatar && typeof host.assets.avatar === 'object' ? host.assets.avatar as Media : null,
        metadata: [{ label: 'TYPE', value: host.basics?.type || 'Host' }]
    })) || []

    hostItems.push(...orgHosts, ...leaderHosts, ...individualHosts)

    const attendeeItems: { id: string; name: string; role: string; organization: string; image: Media | null; type: 'HOST' | 'GUEST' | 'SPEAKER' | 'PARTNER' }[] = []

    const driverAttendees = meetup.details.attendees?.drivers?.filter((a): a is Driver =>
        typeof a === 'object' && a !== null && 'first_name' in a
    ).map(attendee => ({
        id: attendee.id.toString(),
        name: `${attendee.first_name} ${attendee.last_name}`,
        role: attendee.basics?.nickname || attendee.basics?.competition_name || 'Driver',
        organization: attendee.basics?.nationality && typeof attendee.basics.nationality === 'object' ? (attendee.basics.nationality as { name: string }).name : 'Driver',
        image: attendee.assets?.avatar && typeof attendee.assets.avatar === 'object' ? attendee.assets.avatar as Media : null,
        type: 'GUEST' as const
    })) || []

    const memberAttendees = meetup.details.attendees?.members?.filter((a): a is Member =>
        typeof a === 'object' && a !== null && 'first_name' in a
    ).map(attendee => ({
        id: attendee.id.toString(),
        name: `${attendee.first_name} ${attendee.last_name}`,
        role: attendee.basics?.nickname || attendee.details?.duties || 'Member',
        organization: attendee.basics?.nationality && typeof attendee.basics.nationality === 'object' ? (attendee.basics.nationality as { name: string }).name : 'Staff',
        image: attendee.assets?.avatar && typeof attendee.assets.avatar === 'object' ? attendee.assets.avatar as Media : null,
        type: 'GUEST' as const
    })) || []

    const leaderAttendees = meetup.details.attendees?.leaders?.filter((a): a is Leader =>
        typeof a === 'object' && a !== null && 'first_name' in a
    ).map(attendee => ({
        id: attendee.id.toString(),
        name: `${attendee.first_name} ${attendee.last_name}`,
        role: attendee.basics?.title || attendee.basics?.nickname || 'Leader',
        organization: attendee.basics?.nationality && typeof attendee.basics.nationality === 'object' ? (attendee.basics.nationality as { name: string }).name : 'Leadership',
        image: attendee.assets?.avatar && typeof attendee.assets.avatar === 'object' ? attendee.assets.avatar as Media : null,
        type: 'SPEAKER' as const
    })) || []

    const individualAttendees = meetup.details.attendees?.individuals?.filter((a): a is Individual =>
        typeof a === 'object' && a !== null && 'first_name' in a
    ).map(attendee => ({
        id: attendee.id.toString(),
        name: `${attendee.first_name} ${attendee.last_name}`,
        role: attendee.basics?.type || 'Individual',
        organization: attendee.basics?.description || 'Guest',
        image: attendee.assets?.avatar && typeof attendee.assets.avatar === 'object' ? attendee.assets.avatar as Media : null,
        type: 'GUEST' as const
    })) || []

    const orgAttendees = meetup.details.attendees?.organizations?.filter((a): a is Organization =>
        typeof a === 'object' && a !== null && 'name' in a
    ).map(attendee => ({
        id: attendee.id.toString(),
        name: attendee.name,
        role: attendee.basics?.type || 'Organization',
        organization: attendee.name,
        image: attendee.assets?.logo && typeof attendee.assets.logo === 'object' ? attendee.assets.logo as Media : null,
        type: 'PARTNER' as const
    })) || []

    attendeeItems.push(...driverAttendees, ...memberAttendees, ...leaderAttendees, ...individualAttendees, ...orgAttendees)

    const documents = meetup.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Meetup Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={`MUP-${meetup.id}`}
                title={meetup.name}
                meta={meetup.basics?.description || 'Community Meetup'}
                image={coverImage}
                tags={[
                    meetup.details.format || 'Meetup',
                    'Details'
                ]}
            />

            {hostItems.length > 0 && (
                <DirectoryGrid
                    id="MUP_HOSTS"
                    title="Hosts"
                    items={hostItems}
                    variant="square"
                />
            )}

            {attendeeItems.length > 0 && (
                <DirectoryTabs
                    id="MUP_ATTENDEES"
                    title="Attendees"
                    items={attendeeItems}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="MUP_DOCS"
                    title="Event Documents"
                    documents={documents}
                />
            )}
        </main>
    )
}