// app/(app)/teams/[slug]/drivers/[driverSlug]/details/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import CoverSection from '@/components/Section/Blocks/CoverSection'
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import ExpandSection from '@/components/Section/Blocks/ExpandSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import TabSection from '@/components/Section/Blocks/TabSection'
import TableSection from '@/components/Section/Blocks/TableSection'
import TextRevealSection from '@/components/Section/Blocks/TextRevealSection'
import TimelineSection, { TimelineEvent } from '@/components/Section/Blocks/TimelineSection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Award, Car, Championship, Incident, Media, Member, Onboarding, Program, Race, Result, Skill } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

function extractPlainText(content: any): string {
    if (!content) return ''
    if (typeof content === 'string') return content
    if (typeof content === 'object' && 'root' in content && content.root?.children) {
        const parts: string[] = []
        for (const child of content.root.children) {
            if (child?.children) {
                for (const c of child.children) {
                    if (c?.text) parts.push(c.text)
                }
            }
        }
        return parts.join(' ').replace(/\s+/g, ' ').trim()
    }
    return ''
}

function mapStatusToTimelineStatus(status: string | null | undefined): 'completed' | 'active' | 'upcoming' {
    if (!status) return 'completed'
    const lower = status.toLowerCase()
    if (lower === 'completed' || lower === 'finished') return 'completed'
    if (lower === 'ongoing' || lower === 'active' || lower === 'in_progress') return 'active'
    if (lower === 'scheduled' || lower === 'upcoming' || lower === 'confirmed') return 'upcoming'
    return 'completed'
}

const getDriverDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'drivers',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                first_name: true,
                middle_name: true,
                last_name: true,
                alias: true,
                slug: true,
                basics: {
                    racing_number: true,
                    nickname: true,
                    callsign: true,
                    gender: true,
                    pronouns: true,
                    birth_date: true,
                    debut_date: true,
                    retirement_date: true,
                    nationality: true,
                },
                assets: {
                    avatar: true,
                    cover: true,
                },
                details: {
                    biography: true,
                    story: true,
                    results: true,
                    points: true,
                    awards: true,
                    skills: true,
                    cars: true,
                    addresses: { list: true },
                },
            },
        })
        return result.docs[0] || null
    },
    ['driver-details-full'],
    { revalidate: 3600, tags: ['driver-details'] }
)

const getDriverRelatedData = unstable_cache(
    async (driverId: number) => {
        const payload = await getPayload({ config: configPromise })

        const [racesRes, championshipsRes, incidentsRes, membersRes, programsRes, onboardingsRes] = await Promise.all([
            payload.find({
                collection: 'races',
                where: { 'details.winner': { equals: driverId } },
                limit: 20,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    details: { start_date: true, status: true },
                    assets: { video: true, highlights: true },
                },
            }),
            payload.find({
                collection: 'championships',
                where: { 'details.winner': { equals: driverId } },
                limit: 20,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    details: { start_date: true, end_date: true },
                },
            }),
            payload.find({
                collection: 'incidents',
                where: { 'details.drivers': { in: [driverId] } },
                limit: 20,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    details: { date_time: true },
                },
            }),
            payload.find({
                collection: 'members',
                limit: 12,
                depth: 1,
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    basics: { description: true },
                    details: { duties: true },
                    assets: { avatar: true },
                },
            }),
            payload.find({
                collection: 'programs',
                where: { 'details.participants': { in: [driverId] } },
                limit: 5,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    traits: { eligibility: { list: true }, curriculum: { list: true } },
                },
            }),
            payload.find({
                collection: 'onboardings',
                where: { 'details.assigned_to': { equals: driverId } },
                limit: 5,
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    assets: { documents: true },
                },
            }),
        ])

        return {
            races: racesRes.docs as Race[],
            championships: championshipsRes.docs as Championship[],
            incidents: incidentsRes.docs as Incident[],
            members: membersRes.docs as Member[],
            programs: programsRes.docs as Program[],
            onboardings: onboardingsRes.docs as Onboarding[],
        }
    },
    ['driver-related'],
    { revalidate: 3600 }
)

export default async function DriverDetailsPage({ params }: { params: Promise<{ slug: string; driverSlug: string }> }) {
    const { driverSlug } = await params
    const driver = await getDriverDetailsData(driverSlug)

    if (!driver) notFound()

    const relatedData = await getDriverRelatedData(driver.id)

    const driverFullName = [driver.first_name, driver.middle_name, driver.last_name].filter(Boolean).join(' ')

    const nationalityRaw = driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality
        ? driver.basics.nationality.name
        : undefined
    const nationalityName: string | undefined = nationalityRaw ?? undefined

    const coverImage = getMediaUrl(driver.assets?.cover) || getMediaUrl(driver.assets?.avatar) || `https://picsum.photos/seed/${driver.slug}/1920/1080`

    const infoCards = [
        { id: 'nationality', label: 'Nationality', value: nationalityName || 'N/A', emphasis: 'medium' as const },
        { id: 'gender', label: 'Gender', value: driver.basics?.gender || 'N/A', emphasis: 'medium' as const },
        { id: 'pronouns', label: 'Pronouns', value: driver.basics?.pronouns || 'N/A', emphasis: 'low' as const },
        { id: 'birth-date', label: 'Birth Date', value: driver.basics?.birth_date || 'N/A', emphasis: 'high' as const },
        { id: 'debut-date', label: 'Debut Date', value: driver.basics?.debut_date || 'N/A', emphasis: 'high' as const },
        { id: 'retirement-date', label: 'Retirement Date', value: driver.basics?.retirement_date || 'N/A', emphasis: 'low' as const },
    ]

    const biographyText = extractPlainText(driver.details?.biography)
    const biographyParagraphs = biographyText
        ? biographyText
            .split(/\n{2,}|\n/)
            .map(p => p.trim())
            .filter(p => p.length > 0)
            .reduce((acc: string[], paragraph: string) => {
                const last = acc[acc.length - 1]
                if (last && last.length < 200) {
                    acc[acc.length - 1] = last + ' ' + paragraph
                } else {
                    acc.push(paragraph)
                }
                return acc
            }, [])
        : []
    const biographyExpandItems = biographyParagraphs.length > 0
        ? biographyParagraphs.map((paragraph, idx) => ({
            id: `bio-${idx}`,
            title: idx === 0 ? 'Origins' : idx === biographyParagraphs.length - 1 ? 'Legacy' : `Chapter ${idx + 1}`,
            description: paragraph,
            image: idx === 0
                ? (getMediaUrl(driver.assets?.avatar) || `https://picsum.photos/seed/${driver.slug}/800/1000`)
                : `https://picsum.photos/seed/${driver.slug}-bio-${idx}/800/1000`,
            percentage: Math.round(((idx + 1) / biographyParagraphs.length) * 100),
        }))
        : []

    const resultRows = (driver.details?.results || []).map((resultRef, idx) => {
        const result = resultRef as Result
        const pointsRef = driver.details?.points?.[idx] as any
        const pointsValue = pointsRef && typeof pointsRef === 'object' && 'details' in pointsRef
            ? pointsRef.details?.value
            : undefined
        return {
            id: `result-${result && typeof result === 'object' ? result.id : idx}`,
            cells: {
                name: result && typeof result === 'object' ? result.name : 'N/A',
                status: result && typeof result === 'object' && result.details?.status ? result.details.status : 'N/A',
                position: result && typeof result === 'object' && result.details?.overall ? `P${result.details.overall}` : 'N/A',
                points: pointsValue !== undefined ? String(pointsValue) : 'N/A',
            },
        }
    })

    const tableColumns = [
        { key: 'name', label: 'Result', sortable: true, width: undefined },
        { key: 'status', label: 'Status', sortable: true, width: undefined },
        { key: 'position', label: 'Position', sortable: true, width: undefined },
        { key: 'points', label: 'Points', sortable: true, width: undefined },
    ]

    const awardEntries: any[] = []
    if (driver.details?.awards) {
        driver.details.awards.forEach((awardRef) => {
            const award = awardRef as Award
            if (award && typeof award === 'object' && 'name' in award) {
                awardEntries.push({
                    id: `awd-${award.id}`,
                    title: award.name,
                    subtitle: award.details?.awarded_date || award.basics?.description || undefined,
                    tag: 'AWD',
                })
            }
        })
    }

    const skillEntries: any[] = []
    if (driver.details?.skills) {
        driver.details.skills.forEach((skillRef) => {
            const skill = skillRef as Skill
            if (skill && typeof skill === 'object' && 'name' in skill) {
                skillEntries.push({
                    id: `skl-${skill.id}`,
                    title: skill.name,
                    subtitle: skill.details?.depth || skill.details?.complexity || skill.basics?.description || undefined,
                    tag: 'SKL',
                })
            }
        })
    }

    const timelineEvents: TimelineEvent[] = [
        ...relatedData.races.map((race) => ({
            id: `race-${race.id}`,
            date: race.details?.start_date || '',
            title: race.name,
            description: undefined,
            status: mapStatusToTimelineStatus(race.details?.status),
            image: undefined,
            slug: `/calendar/races/${race.slug}`,
            code: 'RACE',
            format: 'Grand Prix',
        })),
        ...relatedData.championships.map((champ) => ({
            id: `champ-${champ.id}`,
            date: champ.details?.start_date || '',
            title: champ.name,
            description: undefined,
            status: 'active' as const,
            image: undefined,
            slug: `/calendar/championships/${champ.slug}`,
            code: 'CHMP',
            format: 'Championship',
        })),
        ...relatedData.incidents.map((incident) => ({
            id: `incident-${incident.id}`,
            date: incident.details?.date_time || '',
            title: incident.name,
            description: undefined,
            status: 'completed' as const,
            image: undefined,
            slug: undefined,
            code: 'INCD',
            format: 'Incident',
        })),
    ].filter(e => e.date).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const carSlides = (driver.details?.cars || []).map((carRef) => {
        const car = carRef as Car
        if (car && typeof car === 'object' && 'name' in car) {
            return {
                id: `car-${car.id}`,
                title: car.name,
                description: car.basics?.description || undefined,
                image: getMediaUrl(car.assets?.thumbnail) || `https://picsum.photos/seed/${car.slug}/1200/1600`,
                ctaLabel: 'VIEW CAR',
                ctaHref: `/resources/cars/${car.slug}`,
                meta: car.alias || undefined,
            }
        }
        return null
    }).filter((slide): slide is NonNullable<typeof slide> => slide !== null)

    const crewGridItems = relatedData.members.map((member) => ({
        id: `member-${member.id}`,
        title: `${member.first_name || ''} ${member.last_name || ''}`.trim() || 'Crew Member',
        subtitle: member.details?.duties || member.basics?.description || undefined,
        image: getMediaUrl(member.assets?.avatar) || `https://picsum.photos/seed/${member.id}/400/300`,
        href: undefined,
        category: 'CREW',
    }))

    const mapLocations = (driver.details?.addresses?.list || []).map((addr) => ({
        id: addr.id || `addr-${Math.random()}`,
        name: addr.label || addr.name || 'Address',
        lat: addr.location?.[1] || 0,
        lng: addr.location?.[0] || 0,
        description: addr.description || undefined,
        address: addr.name || undefined,
        type: 'satellite' as const,
    }))

    const documentsList: any[] = []
    relatedData.onboardings.forEach((onboarding) => {
        if (onboarding.assets?.documents) {
            onboarding.assets.documents.forEach((doc) => {
                const media = typeof doc === 'object' ? doc : null
                if (media && 'url' in media) {
                    documentsList.push({
                        id: `doc-${onboarding.id}-${media.id}`,
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
    relatedData.races.forEach((race) => {
        if (race.assets?.video) {
            const videoMedia = typeof race.assets.video === 'object' ? race.assets.video : null
            const posterUrl = race.assets?.highlights && race.assets.highlights.length > 0
                ? getMediaUrl(race.assets.highlights[0])
                : undefined
            if (videoMedia?.url) {
                videoItems.push({
                    id: `video-${race.id}`,
                    title: race.name || '',
                    url: videoMedia.url,
                    poster: posterUrl,
                    duration: race.details?.start_date || '',
                })
            }
        }
    })

    const tabItems: any[] = []
    relatedData.programs.forEach((program) => {
        if (program.traits?.curriculum?.list) {
            program.traits.curriculum.list.forEach((item) => {
                if (item.module_name) {
                    tabItems.push({
                        id: `tab-${program.id}-${item.id || Math.random()}`,
                        label: item.module_name,
                        content: item.deliverable || item.module_name,
                    })
                }
            })
        }
        if (program.traits?.eligibility?.list) {
            program.traits.eligibility.list.forEach((item) => {
                if (item.criteria) {
                    tabItems.push({
                        id: `tab-${program.id}-elig-${item.id || Math.random()}`,
                        label: item.criteria,
                        content: item.description || item.value || item.criteria,
                    })
                }
            })
        }
    })

    return (
        <main className="w-full">
            <CoverSection
                id="driver-details-cover"
                image={coverImage}
            />
            <InfoSection
                id="driver-details-basics"
                title={driverFullName}
                subtitle={driver.alias || ''}
                cards={infoCards}
                columns={3}
                headerVariant={2}
                footerVariant={1}
            />
            {biographyExpandItems.length > 0 && (
                <ExpandSection
                    id="driver-details-biography"
                    title="Biography"
                    subtitle="Personal background"
                    items={biographyExpandItems}
                    labels={{
                        indexPrefix: 'CHAPTER',
                        progressLabel: 'PROGRESS',
                        statusComplete: 'COMPLETE',
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {driver.details?.story && (
                <TextRevealSection
                    id="driver-details-story"
                    title={driverFullName}
                    subtitle="Story"
                    content={driver.details.story}
                />
            )}
            {resultRows.length > 0 && (
                <TableSection
                    id="driver-details-results"
                    title="RESULTS"
                    subtitle="Competitive performance data"
                    columns={tableColumns}
                    rows={resultRows}
                    labels={{
                        sortActive: 'SORTED',
                        rowIndicator: 'ROW',
                    }}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {(awardEntries.length > 0 || skillEntries.length > 0) && (
                <ListSection
                    id="driver-details-milestones"
                    title="Career Milestones"
                    subtitle="Awards and skills"
                    entries={[...awardEntries, ...skillEntries]}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'ID',
                        indexPrefix: 'ITM',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="driver-details-timeline"
                    title="Timeline"
                    subtitle="Race history and events"
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
            {carSlides.length > 0 && (
                <CarouselSection
                    id="driver-details-cars"
                    slides={carSlides}
                    autoplayDelay={4000}
                />
            )}
            {crewGridItems.length > 0 && (
                <GridSection
                    id="driver-details-crew"
                    title="Crew Members"
                    subtitle="Personnel linked to this driver"
                    items={crewGridItems}
                    labels={{
                        unitsCount: 'CREW',
                        viewProject: 'VIEW',
                        sectionIndex: 'CRW',
                        fallbackAlt: 'Crew',
                    }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="driver-details-addresses"
                    title="Addresses"
                    subtitle="Driver locations"
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
                            primary: 'PRIMARY',
                            satellite: 'SATELLITE',
                            pathing: 'PATHING',
                        },
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {documentsList.length > 0 && (
                <DocumentsSection
                    id="driver-details-documents"
                    title="Documents"
                    subtitle="Onboarding and program files"
                    documents={documentsList}
                    referenceCode={driver.slug ?? undefined}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {videoItems.length > 0 && (
                <VideoSection
                    id="driver-details-videos"
                    title="Videos"
                    subtitle="Race and event footage"
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
            {tabItems.length > 0 && (
                <TabSection
                    id="driver-details-programs"
                    title="Programs"
                    subtitle="Development and training"
                    tabs={tabItems}
                    labels={{
                        channelPrefix: 'PRG',
                        statusActive: 'ACTIVE',
                    }}
                    variant="underline"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}