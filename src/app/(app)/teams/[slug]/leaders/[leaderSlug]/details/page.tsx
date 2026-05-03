// app/(app)/teams/[slug]/leaders/[leaderSlug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import TabSection from '@/components/Section/Blocks/TabSection'
import TableSection from '@/components/Section/Blocks/TableSection'
import TextRevealSection from '@/components/Section/Blocks/TextRevealSection'
import TimelineSection, { TimelineEvent } from '@/components/Section/Blocks/TimelineSection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Celebration, Media, Meetup, Onboarding, Program } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getLeaderDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'leaders',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: {
                    title: true,
                    nickname: true,
                    nationality: true,
                    gender: true,
                    birth_date: true,
                    debut_date: true,
                    retirement_date: true,
                },
                details: {
                    biography: true,
                    history: true,
                    principles: { list: true },
                },
                assets: {
                    avatar: true,
                    cover: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['leader-details-full'],
    { revalidate: 3600, tags: ['leader-details'] }
)

const getLeaderRelatedData = unstable_cache(
    async (leaderId: number) => {
        const payload = await getPayload({ config: configPromise })

        const [meetupsRes, celebrationsRes, programsRes, onboardingsRes] = await Promise.all([
            payload.find({
                collection: 'meetups',
                where: { 'details.hosts.leaders': { in: [leaderId] } },
                limit: 20,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    details: { start_date: true, locations: true },
                    assets: { video: true, documents: true },
                },
            }),
            payload.find({
                collection: 'celebrations',
                where: { 'details.leaders': { in: [leaderId] } },
                limit: 20,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    details: { date_time: true, location: true },
                    assets: { video: true },
                },
            }),
            payload.find({
                collection: 'programs',
                where: { 'details.mentors': { in: [leaderId] } },
                limit: 12,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { description: true },
                    assets: { thumbnail: true, documents: true },
                },
            }),
            payload.find({
                collection: 'onboardings',
                where: { 'details.assigned_by': { equals: leaderId } },
                limit: 12,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    traits: { checklist: { list: true } },
                    assets: { documents: true },
                },
            }),
        ])

        return {
            meetups: meetupsRes.docs as Meetup[],
            celebrations: celebrationsRes.docs as Celebration[],
            programs: programsRes.docs as Program[],
            onboardings: onboardingsRes.docs as Onboarding[],
        }
    },
    ['leader-related'],
    { revalidate: 3600 }
)

export default async function LeaderDetailsPage({ params }: { params: Promise<{ slug: string; leaderSlug: string }> }) {
    const { leaderSlug } = await params
    const leader = await getLeaderDetailsData(leaderSlug)

    if (!leader) notFound()

    const relatedData = await getLeaderRelatedData(leader.id)

    const leaderFullName = `${leader.first_name || ''} ${leader.last_name || ''}`.trim() || 'Unnamed Leader'

    const nationalityRaw = leader.basics?.nationality && typeof leader.basics.nationality === 'object' && 'name' in leader.basics.nationality
        ? leader.basics.nationality.name
        : undefined
    const nationalityName: string | undefined = nationalityRaw ?? undefined

    const heroBackgroundImage = getMediaUrl(leader.assets?.avatar) || getMediaUrl(leader.assets?.cover)

    const infoCards = [
        { id: 'nationality', label: 'Nationality', value: nationalityName || 'N/A', emphasis: 'medium' as const },
        { id: 'gender', label: 'Gender', value: leader.basics?.gender || 'N/A', emphasis: 'medium' as const },
        { id: 'birth-date', label: 'Birth Date', value: leader.basics?.birth_date || 'N/A', emphasis: 'high' as const },
        { id: 'debut-date', label: 'Debut Date', value: leader.basics?.debut_date || 'N/A', emphasis: 'high' as const },
        { id: 'retirement-date', label: 'Retirement Date', value: leader.basics?.retirement_date || 'N/A', emphasis: 'low' as const },
    ]

    const studyData = leader.details?.biography
        ? [{
            id: String(leader.id),
            title: leaderFullName,
            description: '',
            image: getMediaUrl(leader.assets?.avatar) || `https://picsum.photos/seed/${leader.slug}/800/600`,
            metrics: [
                { label: 'Title', value: leader.basics?.title || 'N/A' },
                { label: 'Nationality', value: nationalityName || 'N/A' },
            ],
        }]
        : []

    const tabItems: any[] = []
    if (leader.details?.principles?.list) {
        leader.details.principles.list.forEach((principle) => {
            if (principle.name) {
                tabItems.push({
                    id: principle.id || `prn-${Math.random()}`,
                    label: principle.name,
                    content: principle.statement || principle.description || principle.name,
                })
            }
        })
    }

    const timelineEvents: TimelineEvent[] = [
        ...(leader.basics?.debut_date ? [{
            id: `debut-${leader.id}`,
            date: leader.basics.debut_date,
            title: 'Career Debut',
            description: undefined,
            status: 'completed' as const,
            image: undefined,
            slug: undefined,
            code: 'DEBUT',
            format: 'Milestone',
        }] : []),
        ...relatedData.meetups.map((meetup) => ({
            id: `meetup-${meetup.id}`,
            date: meetup.details?.start_date || '',
            title: meetup.name,
            description: undefined,
            status: 'active' as const,
            image: undefined,
            slug: undefined,
            code: 'MEET',
            format: 'Meetup',
        })),
    ].filter(e => e.date).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const scrollItems = relatedData.programs.map((program) => ({
        id: `program-${program.id}`,
        title: program.name,
        description: program.basics?.description || '',
        image: program.assets?.thumbnail
            ? getMediaUrl(program.assets.thumbnail)
            : `https://picsum.photos/seed/${program.slug}/800/1000`,
    }))

    const tableColumns = [
        { key: 'task', label: 'Task', sortable: true, width: undefined },
        { key: 'required', label: 'Required', sortable: true, width: undefined },
        { key: 'completed', label: 'Completed', sortable: true, width: undefined },
        { key: 'due', label: 'Due Date', sortable: true, width: undefined },
    ]

    const tableRows: any[] = []
    relatedData.onboardings.forEach((onboarding) => {
        if (onboarding.traits?.checklist?.list) {
            onboarding.traits.checklist.list.forEach((item) => {
                tableRows.push({
                    id: item.id || `task-${Math.random()}`,
                    cells: {
                        task: item.task || 'N/A',
                        required: item.required ? 'Yes' : 'No',
                        completed: item.completed ? 'Yes' : 'No',
                        due: item.due_date || 'N/A',
                    },
                })
            })
        }
    })

    const mapLocations: any[] = []
    relatedData.meetups.forEach((meetup) => {
        if (meetup.details?.locations && Array.isArray(meetup.details.locations) && meetup.details.locations.length === 2) {
            mapLocations.push({
                id: `meetup-${meetup.id}`,
                name: meetup.name,
                lat: meetup.details.locations[1],
                lng: meetup.details.locations[0],
                description: meetup.details?.start_date || undefined,
                type: 'primary' as const,
            })
        }
    })
    relatedData.celebrations.forEach((celebration) => {
        if (celebration.details?.location && Array.isArray(celebration.details.location) && celebration.details.location.length === 2) {
            mapLocations.push({
                id: `celebration-${celebration.id}`,
                name: celebration.name,
                lat: celebration.details.location[1],
                lng: celebration.details.location[0],
                description: celebration.details?.date_time || undefined,
                type: 'satellite' as const,
            })
        }
    })

    const documentsList: any[] = []
    relatedData.programs.forEach((program) => {
        if (program.assets?.documents) {
            const docs = Array.isArray(program.assets.documents) ? program.assets.documents : []
            docs.forEach((doc) => {
                const media = typeof doc === 'object' ? doc : null
                if (media && 'url' in media) {
                    documentsList.push({
                        id: `prog-doc-${program.id}-${media.id}`,
                        title: media.alt || media.filename || 'Document',
                        filename: media.filename ?? null,
                        mimeType: media.mimeType ?? null,
                        filesize: media.filesize ?? null,
                        url: media.url ?? null,
                        updatedAt: media.updatedAt ?? null,
                    })
                }
            })
        }
    })
    relatedData.onboardings.forEach((onboarding) => {
        if (onboarding.assets?.documents) {
            const docs = Array.isArray(onboarding.assets.documents) ? onboarding.assets.documents : []
            docs.forEach((doc) => {
                const media = typeof doc === 'object' ? doc : null
                if (media && 'url' in media) {
                    documentsList.push({
                        id: `onb-doc-${onboarding.id}-${media.id}`,
                        title: media.alt || media.filename || 'Document',
                        filename: media.filename ?? null,
                        mimeType: media.mimeType ?? null,
                        filesize: media.filesize ?? null,
                        url: media.url ?? null,
                        updatedAt: media.updatedAt ?? null,
                    })
                }
            })
        }
    })

    const videoItems: any[] = []
    relatedData.meetups.forEach((meetup) => {
        if (meetup.assets?.video) {
            const videoMedia = typeof meetup.assets.video === 'object' ? meetup.assets.video : null
            if (videoMedia?.url) {
                videoItems.push({
                    id: `meetup-video-${meetup.id}`,
                    title: meetup.name || '',
                    url: videoMedia.url,
                    poster: undefined,
                    duration: meetup.details?.start_date || '',
                })
            }
        }
    })
    relatedData.celebrations.forEach((celebration) => {
        if (celebration.assets?.video) {
            const videoMedia = typeof celebration.assets.video === 'object' ? celebration.assets.video : null
            if (videoMedia?.url) {
                videoItems.push({
                    id: `cel-video-${celebration.id}`,
                    title: celebration.name || '',
                    url: videoMedia.url,
                    poster: undefined,
                    duration: celebration.details?.date_time || '',
                })
            }
        }
    })

    return (
        <main className="w-full">
            <HeroSection
                id="leader-details-hero"
                title={leaderFullName}
                subtitle={leader.basics?.nickname || leader.basics?.title || ''}
                description={leader.basics?.title || undefined}
                backgroundImage={heroBackgroundImage}
                badge="LEADER DETAILS"
                meta="COMMAND"
                alignment="left"
            />
            <InfoSection
                id="leader-details-basics"
                title={leaderFullName}
                subtitle="Personal Information"
                cards={infoCards}
                columns={3}
                headerVariant={2}
                footerVariant={1}
            />
            {studyData.length > 0 && (
                <StudySection
                    id="leader-details-biography"
                    title="Biography"
                    subtitle="Professional background"
                    studies={studyData}
                    variant="featured"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {leader.details?.history && (
                <TextRevealSection
                    id="leader-details-history"
                    title={leaderFullName}
                    subtitle="Career Journey"
                    content={leader.details.history}
                />
            )}
            {tabItems.length > 0 && (
                <TabSection
                    id="leader-details-principles"
                    title="Principles"
                    subtitle="Core values and beliefs"
                    tabs={tabItems}
                    labels={{
                        channelPrefix: 'PRN',
                        statusActive: 'ACTIVE',
                    }}
                    variant="underline"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="leader-details-timeline"
                    title="Timeline"
                    subtitle="Career and hosting history"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'EVT',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="leader-details-programs"
                    title="Programs"
                    subtitle="Initiatives mentored"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'PRG',
                        progressLabel: 'PROGRESS',
                        statusComplete: 'COMPLETE',
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {tableRows.length > 0 && (
                <TableSection
                    id="leader-details-onboarding"
                    title="Onboarding Tasks"
                    subtitle="Checklist management"
                    columns={tableColumns}
                    rows={tableRows}
                    labels={{
                        sortActive: 'SORTED',
                        rowIndicator: 'ROW',
                    }}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="leader-details-locations"
                    title="Influence Map"
                    subtitle="Geospatial plot of activity"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'HQ',
                        intelLabel: 'INTEL',
                        routeLabel: 'ROUTE',
                        timeLabel: 'TIME',
                        distLabel: 'DIST',
                        recordLabel: 'REC',
                        filterLabels: {
                            all: 'ALL',
                            primary: 'MEETUP',
                            satellite: 'CELEBRATION',
                            pathing: 'PATHING',
                        },
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {documentsList.length > 0 && (
                <DocumentsSection
                    id="leader-details-documents"
                    title="Documents"
                    subtitle="Program and onboarding files"
                    documents={documentsList}
                    referenceCode={leader.slug ?? undefined}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {videoItems.length > 0 && (
                <VideoSection
                    id="leader-details-videos"
                    title="Videos"
                    subtitle="Educational and event footage"
                    videos={videoItems}
                    labels={{
                        channelPrefix: 'CH',
                        broadcastStatus: 'LIVE',
                        liveFeed: 'FEED',
                        metaTransmission: 'TRANS',
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}