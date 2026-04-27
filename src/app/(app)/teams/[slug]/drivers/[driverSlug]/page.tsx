// app/(frontend)/teams/[teamSlug]/drivers/[driverSlug]/page.tsx
import CoverSection from '@/components/Section/Blocks/CoverSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
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
            depth: 1,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: { racing_number: true, nationality: true, birth_date: true, debut_date: true, callsign: true, catchphrase: true },
                assets: { avatar: true, cover: true, autograph: true, gallery: true },
                details: { biography: true },
            },
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
            depth: 1,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                basics: { description: true },
                details: { duties: true },
                assets: { avatar: true },
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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { description: true },
                assets: { thumbnail: true },
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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { description: true },
            },
        })
        return result.docs as Incident[]
    },
    ['incidents'],
    { revalidate: 3600 }
)

export default async function DriverPage({ params }: { params: Promise<{ teamSlug: string; driverSlug: string }> }) {
    const { teamSlug, driverSlug } = await params

    const [driver, crewMembers, celebrations, incidents] = await Promise.all([
        getDriverData(driverSlug),
        getCrewMembers(),
        getCelebrations(),
        getIncidents(),
    ])

    if (!driver) notFound()

    const driverFullName = `${driver.first_name || ''} ${driver.last_name || ''}`.trim() || 'Unnamed Driver'

    const coverImage = getMediaUrl(driver.assets?.cover) ||
        getMediaUrl(driver.assets?.avatar) ||
        `https://picsum.photos/seed/${driver.slug}/1920/1080`

    const heroBackgroundImage = driver.assets?.cover
        ? getMediaUrl(driver.assets.cover)
        : driver.assets?.avatar
            ? getMediaUrl(driver.assets.avatar)
            : undefined

    const studyImage = getMediaUrl(driver.assets?.avatar) ||
        getMediaUrl(driver.assets?.cover) ||
        `https://picsum.photos/seed/${driver.slug}/800/600`

    const study = {
        id: String(driver.id),
        title: driverFullName,
        description: driver.basics?.callsign || driver.basics?.catchphrase || '',
        image: studyImage,
        metrics: [
            { label: 'Number', value: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : 'N/A' },
            { label: 'Nationality', value: (driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality) ? driver.basics.nationality.name : 'N/A' },
            { label: 'Born', value: driver.basics?.birth_date || 'N/A' },
            { label: 'Debut', value: driver.basics?.debut_date || 'N/A' },
        ],
    }

    const quoteItem = driver.basics?.catchphrase
        ? {
            id: String(driver.id),
            text: driver.basics.catchphrase,
            author: driverFullName,
        }
        : null

    const scrollItems = driver.details?.biography ? [{
        id: 'biography',
        title: 'Biography',
        description: 'Driver background and career highlights.',
        percentage: 100,
    }] : []

    const crewMemberItems = crewMembers.map((member) => ({
        id: String(member.id),
        title: `${member.first_name || ''} ${member.last_name || ''}`.trim() || 'Crew Member',
        subtitle: member.details?.duties || member.basics?.description || undefined,
        image: getMediaUrl(member.assets?.avatar) || `https://picsum.photos/seed/${member.id}/400/300`,
    }))

    const galleryItems = (driver.assets?.gallery?.list || [])
        .map((item, idx) => {
            const media = typeof item.image === 'object' ? item.image : null
            const url = getMediaUrl(media)
            if (!url || !media) return null
            return {
                id: item.id || String(idx),
                title: item.caption || media.alt || driverFullName,
                image: url,
                height: (idx % 3 === 0 ? 'tall' : idx % 2 === 0 ? 'medium' : 'short') as 'tall' | 'medium' | 'short',
            }
        })
        .filter((i): i is NonNullable<typeof i> => i !== null)

    const celebrationItems = celebrations.map((celebration) => ({
        id: String(celebration.id),
        title: celebration.name || '',
        description: celebration.basics?.description || undefined,
        image: getMediaUrl(celebration.assets?.thumbnail) || `https://picsum.photos/seed/${celebration.id}/1200/800`,
        category: 'CELEBRATION',
    }))

    const incidentEntries = incidents.map((incident) => ({
        id: String(incident.id),
        title: incident.name || '',
        subtitle: incident.basics?.description || undefined,
        href: `/incidents/${incident.slug}`,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="driver-hero"
                title={driverFullName}
                subtitle={driver.basics?.callsign || ''}
                description={driver.basics?.catchphrase || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                badge={driver.basics?.racing_number ? `#${driver.basics.racing_number}` : undefined}
                meta={driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality ? driver.basics.nationality.name : undefined}
            />
            <CoverSection
                id="driver-cover"
                image={coverImage}
            />
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
            {quoteItem && (
                <QuoteSection
                    id="driver-catchphrase"
                    title="Catchphrase"
                    subtitle="In their own words"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'COMM',
                        ratingLabel: 'RATING',
                    }}
                    variant="grid"
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
                    labels={{
                        indexPrefix: 'SEC',
                        progressLabel: 'PROG',
                        statusComplete: 'DONE',
                    }}
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
                    labels={{
                        unitsCount: 'CREW',
                        viewProject: 'VIEW',
                        sectionIndex: 'CRW',
                        fallbackAlt: 'Crew',
                    }}
                    columns={4}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="driver-gallery"
                    title="Gallery"
                    subtitle="Driver imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {celebrationItems.length > 0 && (
                <GallerySection
                    id="driver-celebrations"
                    title="Celebrations"
                    subtitle="Career highlights"
                    items={celebrationItems}
                    columns={3}
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
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'INC',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
        </main>
    )
}