// app/(frontend)/opportunities/meetups/[slug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import TabSection from '@/components/Section/Blocks/TabSection'
import { Driver, Individual, Leader, Media, Member, Organization } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getMeetupDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'meetups',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { description: true },
                assets: { cover: true, documents: true },
                seo: { image: true },
                details: {
                    format: true,
                    access: true,
                    start_date: true,
                    hosts: { leaders: true, individuals: true, organizations: true },
                    attendees: { drivers: true, members: true, leaders: true, individuals: true, organizations: true },
                },
            },
        })
        return result.docs[0] || null
    },
    ['meetup-details'],
    { revalidate: 3600, tags: ['meetup-details'] }
)

export default async function MeetupDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const meetup = await getMeetupDetailsData(slug)

    if (!meetup) notFound()

    const heroBackgroundImage = meetup.assets?.cover
        ? getMediaUrl(meetup.assets.cover)
        : meetup.seo?.image
            ? getMediaUrl(meetup.seo.image)
            : undefined

    const hostItems: any[] = []

    if (meetup.details?.hosts?.leaders) {
        meetup.details.hosts.leaders.forEach((leaderRef) => {
            const leader = leaderRef as Leader
            if (leader && typeof leader === 'object' && 'first_name' in leader) {
                const imageUrl = leader.assets?.avatar ? getMediaUrl(leader.assets.avatar) : `https://picsum.photos/seed/${leader.id}/400/300`
                hostItems.push({
                    id: String(leader.id),
                    title: `${leader.first_name} ${leader.last_name}`,
                    subtitle: leader.basics?.title || 'Leader',
                    image: imageUrl,
                })
            }
        })
    }

    if (meetup.details?.hosts?.individuals) {
        meetup.details.hosts.individuals.forEach((individualRef) => {
            const individual = individualRef as Individual
            if (individual && typeof individual === 'object' && 'first_name' in individual) {
                const imageUrl = individual.assets?.avatar ? getMediaUrl(individual.assets.avatar) : individual.assets?.thumbnail ? getMediaUrl(individual.assets.thumbnail) : `https://picsum.photos/seed/${individual.id}/400/300`
                hostItems.push({
                    id: String(individual.id),
                    title: `${individual.first_name} ${individual.last_name}`,
                    subtitle: individual.basics?.type || 'Host',
                    image: imageUrl,
                })
            }
        })
    }

    if (meetup.details?.hosts?.organizations) {
        meetup.details.hosts.organizations.forEach((orgRef) => {
            const org = orgRef as Organization
            if (org && typeof org === 'object' && 'name' in org) {
                const imageUrl = org.assets?.logo ? getMediaUrl(org.assets.logo) : org.assets?.alt_logo ? getMediaUrl(org.assets.alt_logo) : `https://picsum.photos/seed/${org.id}/400/300`
                hostItems.push({
                    id: String(org.id),
                    title: org.name,
                    subtitle: org.basics?.type || 'Organization',
                    image: imageUrl,
                })
            }
        })
    }

    const driverAttendeeItems: any[] = []
    const memberAttendeeItems: any[] = []
    const leaderAttendeeItems: any[] = []
    const individualAttendeeItems: any[] = []
    const orgAttendeeItems: any[] = []

    if (meetup.details?.attendees?.drivers) {
        meetup.details.attendees.drivers.forEach((driverRef) => {
            const driver = driverRef as Driver
            if (driver && typeof driver === 'object' && 'first_name' in driver) {
                const imageUrl = driver.assets?.avatar ? getMediaUrl(driver.assets.avatar) : `https://picsum.photos/seed/${driver.id}/400/300`
                driverAttendeeItems.push({
                    id: String(driver.id),
                    title: `${driver.first_name} ${driver.last_name}`,
                    subtitle: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : undefined,
                    image: imageUrl,
                })
            }
        })
    }

    if (meetup.details?.attendees?.members) {
        meetup.details.attendees.members.forEach((memberRef) => {
            const member = memberRef as Member
            if (member && typeof member === 'object' && 'first_name' in member) {
                const imageUrl = member.assets?.avatar ? getMediaUrl(member.assets.avatar) : `https://picsum.photos/seed/${member.id}/400/300`
                memberAttendeeItems.push({
                    id: String(member.id),
                    title: `${member.first_name} ${member.last_name}`,
                    subtitle: member.details?.duties || undefined,
                    image: imageUrl,
                })
            }
        })
    }

    if (meetup.details?.attendees?.leaders) {
        meetup.details.attendees.leaders.forEach((leaderRef) => {
            const leader = leaderRef as Leader
            if (leader && typeof leader === 'object' && 'first_name' in leader) {
                const imageUrl = leader.assets?.avatar ? getMediaUrl(leader.assets.avatar) : `https://picsum.photos/seed/${leader.id}/400/300`
                leaderAttendeeItems.push({
                    id: String(leader.id),
                    title: `${leader.first_name} ${leader.last_name}`,
                    subtitle: leader.basics?.title || undefined,
                    image: imageUrl,
                })
            }
        })
    }

    if (meetup.details?.attendees?.individuals) {
        meetup.details.attendees.individuals.forEach((individualRef) => {
            const individual = individualRef as Individual
            if (individual && typeof individual === 'object' && 'first_name' in individual) {
                const imageUrl = individual.assets?.avatar ? getMediaUrl(individual.assets.avatar) : individual.assets?.thumbnail ? getMediaUrl(individual.assets.thumbnail) : `https://picsum.photos/seed/${individual.id}/400/300`
                individualAttendeeItems.push({
                    id: String(individual.id),
                    title: `${individual.first_name} ${individual.last_name}`,
                    subtitle: individual.basics?.type || undefined,
                    image: imageUrl,
                })
            }
        })
    }

    if (meetup.details?.attendees?.organizations) {
        meetup.details.attendees.organizations.forEach((orgRef) => {
            const org = orgRef as Organization
            if (org && typeof org === 'object' && 'name' in org) {
                const imageUrl = org.assets?.logo ? getMediaUrl(org.assets.logo) : org.assets?.alt_logo ? getMediaUrl(org.assets.alt_logo) : `https://picsum.photos/seed/${org.id}/400/300`
                orgAttendeeItems.push({
                    id: String(org.id),
                    title: org.name,
                    subtitle: org.basics?.type || undefined,
                    image: imageUrl,
                })
            }
        })
    }

    const attendeeTabs: any[] = []

    if (driverAttendeeItems.length > 0) {
        attendeeTabs.push({
            id: 'drivers',
            label: 'Drivers',
            content: (
                <GridSection
                    id="attendees-drivers"
                    title=""
                    subtitle=""
                    items={driverAttendeeItems}
                    labels={{
                        unitsCount: 'DRV',
                        viewProject: 'VIEW',
                        sectionIndex: 'DRV',
                        fallbackAlt: 'Driver',
                    }}
                    columns={4}
                />
            ),
        })
    }

    if (memberAttendeeItems.length > 0) {
        attendeeTabs.push({
            id: 'members',
            label: 'Members',
            content: (
                <GridSection
                    id="attendees-members"
                    title=""
                    subtitle=""
                    items={memberAttendeeItems}
                    labels={{
                        unitsCount: 'MEM',
                        viewProject: 'VIEW',
                        sectionIndex: 'MEM',
                        fallbackAlt: 'Member',
                    }}
                    columns={4}
                />
            ),
        })
    }

    if (leaderAttendeeItems.length > 0) {
        attendeeTabs.push({
            id: 'leaders',
            label: 'Leaders',
            content: (
                <GridSection
                    id="attendees-leaders"
                    title=""
                    subtitle=""
                    items={leaderAttendeeItems}
                    labels={{
                        unitsCount: 'LDR',
                        viewProject: 'VIEW',
                        sectionIndex: 'LDR',
                        fallbackAlt: 'Leader',
                    }}
                    columns={4}
                />
            ),
        })
    }

    if (individualAttendeeItems.length > 0) {
        attendeeTabs.push({
            id: 'individuals',
            label: 'Individuals',
            content: (
                <GridSection
                    id="attendees-individuals"
                    title=""
                    subtitle=""
                    items={individualAttendeeItems}
                    labels={{
                        unitsCount: 'IND',
                        viewProject: 'VIEW',
                        sectionIndex: 'IND',
                        fallbackAlt: 'Individual',
                    }}
                    columns={4}
                />
            ),
        })
    }

    if (orgAttendeeItems.length > 0) {
        attendeeTabs.push({
            id: 'organizations',
            label: 'Organizations',
            content: (
                <GridSection
                    id="attendees-organizations"
                    title=""
                    subtitle=""
                    items={orgAttendeeItems}
                    labels={{
                        unitsCount: 'ORG',
                        viewProject: 'VIEW',
                        sectionIndex: 'ORG',
                        fallbackAlt: 'Organization',
                    }}
                    columns={4}
                />
            ),
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="meetup-details-cover"
                title={meetup.name}
                subtitle={meetup.details?.format || ''}
                description={meetup.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={meetup.details?.access || undefined}
                meta={new Date(meetup.details.start_date).toLocaleDateString()}
            />
            {hostItems.length > 0 && (
                <GridSection
                    id="meetup-hosts"
                    title="HOSTS"
                    subtitle="Event organizers"
                    items={hostItems}
                    labels={{
                        unitsCount: 'HOST',
                        viewProject: 'VIEW',
                        sectionIndex: 'HST',
                        fallbackAlt: 'Host',
                    }}
                    columns={4}
                />
            )}
            {attendeeTabs.length > 0 && (
                <TabSection
                    id="meetup-attendees"
                    title="ATTENDEES"
                    subtitle="Event participants"
                    tabs={attendeeTabs}
                    labels={{
                        channelPrefix: 'CH',
                        statusActive: 'ACTIVE',
                    }}
                    variant="underline"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <DocumentsSection
                id="meetup-documents"
                title="DOCUMENTS"
                subtitle="Event resources"
                documents={meetup.assets?.documents}
                referenceCode={meetup.slug || 'MTU'}
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}