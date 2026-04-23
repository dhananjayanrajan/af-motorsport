// app/(frontend)/teams/[teamSlug]/drivers/[driverSlug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Celebration, Incident, Media, Member } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getDriverData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'drivers',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['driver-detail'],
    { revalidate: 3600, tags: ['driver'] }
)

const getCrewMembers = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'members',
            limit: 8,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: true,
                details: true,
                assets: true,
            },
        })
        return result.docs as Member[]
    },
    ['crew-members'],
    { revalidate: 3600 }
)

const getCelebrations = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'celebrations',
            limit: 8,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: true,
                details: true,
                assets: true,
            },
        })
        return result.docs as Celebration[]
    },
    ['celebrations'],
    { revalidate: 3600 }
)

const getIncidents = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'incidents',
            limit: 10,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: true,
                details: true,
            },
        })
        return result.docs as Incident[]
    },
    ['incidents'],
    { revalidate: 3600 }
)

export default async function DriverPage({ params }: { params: Promise<{ teamSlug: string; driverSlug: string }> }) {
    const { teamSlug, driverSlug } = await params
    const driver = await getDriverData(driverSlug)

    if (!driver) notFound()

    const crewMembers = await getCrewMembers()
    const celebrations = await getCelebrations()
    const incidents = await getIncidents()

    const videoItems: any[] = []

    const studyImage = driver.assets?.avatar
        ? getMediaUrl(driver.assets.avatar)
        : driver.assets?.cover
            ? getMediaUrl(driver.assets.cover)
            : undefined

    const study = {
        id: String(driver.id),
        title: `${driver.first_name} ${driver.last_name}`,
        description: driver.basics?.callsign || driver.basics?.catchphrase || '',
        image: studyImage || `https://picsum.photos/seed/${driver.slug}/800/600`,
        metrics: [
            { label: 'Number', value: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : 'N/A' },
            { label: 'Nationality', value: driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality ? driver.basics.nationality.name : 'N/A' },
            { label: 'Born', value: driver.basics?.birth_date || 'N/A' },
            { label: 'Debut', value: driver.basics?.debut_date || 'N/A' },
        ],
    }

    const autographFeatures = driver.assets?.autograph
        ? [{
            id: 'autograph',
            title: 'Autograph',
            description: `${driver.first_name} ${driver.last_name}`,
            image: getMediaUrl(driver.assets.autograph) || `https://picsum.photos/seed/autograph-${driver.slug}/400/300`,
        }]
        : []

    const scrollItems: any[] = []
    if (driver.details?.biography) {
        scrollItems.push({
            id: 'biography',
            title: 'Biography',
            description: 'Driver background and career highlights.',
            percentage: 100,
        })
    }

    const crewMemberItems: any[] = crewMembers.map((member: Member) => {
        const imageUrl = member.assets?.avatar
            ? getMediaUrl(member.assets.avatar)
            : `https://picsum.photos/seed/${member.id}/400/300`

        return {
            id: String(member.id),
            title: `${member.first_name} ${member.last_name}`,
            subtitle: member.details?.duties || member.basics?.description || undefined,
            image: imageUrl,
        }
    })

    const galleryItems: any[] = []
    if (driver.assets?.gallery?.list) {
        driver.assets.gallery.list.forEach((item, idx) => {
            const media = typeof item.image === 'object' ? item.image : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: item.id || String(idx),
                    title: item.caption || media.alt || `${driver.first_name} ${driver.last_name}`,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    const celebrationItems: any[] = celebrations.map((celebration: Celebration) => {
        const imageUrl = celebration.assets?.thumbnail
            ? getMediaUrl(celebration.assets.thumbnail)
            : `https://picsum.photos/seed/${celebration.id}/400/300`

        return {
            id: String(celebration.id),
            title: celebration.name,
            subtitle: celebration.basics?.description || undefined,
            image: imageUrl,
            href: `/celebrations/${celebration.slug}`,
        }
    })

    const incidentEntries: any[] = incidents.map((incident: Incident) => ({
        id: String(incident.id),
        title: incident.name,
        subtitle: incident.basics?.description || undefined,
        href: `/incidents/${incident.slug}`,
    }))

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="driver-video"
                    title="Driver Highlights"
                    subtitle={`${driver.first_name} ${driver.last_name}`}
                    videos={videoItems}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="driver-details"
                title="Driver Profile"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/teams/${teamSlug}/drivers/${driver.slug}/details`}
            />
            {autographFeatures.length > 0 && (
                <FeatureSection
                    id="driver-autograph"
                    title="Autograph"
                    subtitle="Official signature"
                    features={autographFeatures}
                    columns={2}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="driver-history"
                    title="History"
                    subtitle="Career background"
                    items={scrollItems}
                    variant="reveal"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {crewMemberItems.length > 0 && (
                <GridSection
                    id="driver-crew"
                    title="Crew Members"
                    subtitle="Supporting team"
                    items={crewMemberItems}
                    columns={4}
                    cardVariant={1}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="driver-gallery"
                    title="Gallery"
                    subtitle="Driver imagery"
                    items={galleryItems}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {celebrationItems.length > 0 && (
                <GridSection
                    id="driver-celebrations"
                    title="Celebrations"
                    subtitle="Career highlights"
                    items={celebrationItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {incidentEntries.length > 0 && (
                <ListSection
                    id="driver-incidents"
                    title="Incidents"
                    subtitle="Notable events"
                    entries={incidentEntries}
                    variant="detailed"
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}