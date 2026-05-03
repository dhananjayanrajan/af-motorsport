// app/(app)/resources/helmets/[slug]/details/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import ExpandSection from '@/components/Section/Blocks/ExpandSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import ShortsSection from '@/components/Section/Blocks/ShortsSection'
import TableSection from '@/components/Section/Blocks/TableSection'
import TextRevealSection from '@/components/Section/Blocks/TextRevealSection'
import TimelineSection, { TimelineEvent } from '@/components/Section/Blocks/TimelineSection'
import { Celebration, Driver, Helmet, Media, Race } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getHelmetDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'helmets',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                details: {
                    year: true,
                    usage: true,
                    designer: true,
                    color: true,
                    material: true,
                    branding: true,
                    style: true,
                    classifications: { list: true },
                    manufacturers: { list: true },
                    concept: true,
                },
                assets: {
                    avatar: true,
                    thumbnail: true,
                    video: true,
                },
            },
        })
        return result.docs[0] as Helmet | null
    },
    ['helmet-details-full'],
    { revalidate: 3600, tags: ['helmet-details'] }
)

const getHelmetRelatedData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [celebrationsRes, racesRes, driversRes] = await Promise.all([
            payload.find({
                collection: 'celebrations',
                limit: 12,
                depth: 1,
                sort: '-details.date_time',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    assets: { thumbnail: true },
                },
            }),
            payload.find({
                collection: 'races',
                limit: 20,
                depth: 1,
                sort: '-details.start_date',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    details: { start_date: true, status: true },
                },
            }),
            payload.find({
                collection: 'drivers',
                limit: 20,
                depth: 1,
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    slug: true,
                    basics: { racing_number: true, nationality: true },
                },
            }),
        ])

        return {
            celebrations: celebrationsRes.docs as Celebration[],
            races: racesRes.docs as Race[],
            drivers: driversRes.docs as Driver[],
        }
    },
    ['helmet-related'],
    { revalidate: 3600 }
)

export default async function HelmetDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const helmet = await getHelmetDetailsData(slug)

    if (!helmet) notFound()

    const relatedData = await getHelmetRelatedData()

    const heroBackgroundImage = getMediaUrl(helmet.assets?.avatar)

    const infoCards = [
        { id: 'color', label: 'Color', value: helmet.details?.color || 'N/A', emphasis: 'high' as const },
        { id: 'material', label: 'Material', value: helmet.details?.material || 'N/A', emphasis: 'medium' as const },
        { id: 'branding', label: 'Branding', value: helmet.details?.branding || 'N/A', emphasis: 'medium' as const },
        { id: 'style', label: 'Style', value: helmet.details?.style || 'N/A', emphasis: 'low' as const },
    ]

    const classificationExpandItems = (helmet.details?.classifications?.list || []).map((cls, idx) => ({
        id: cls.id || `cls-${idx}`,
        title: cls.name || 'Classification',
        description: cls.definition || cls.description || cls.criteria || '',
        image: `https://picsum.photos/seed/${helmet.slug}-cls-${idx}/800/1000`,
    }))

    const manufacturerEntries = (helmet.details?.manufacturers?.list || []).map((mfr) => ({
        id: mfr.id || `mfr-${Math.random()}`,
        title: mfr.name || 'Manufacturer',
        subtitle: mfr.description || undefined,
        tag: 'MFR',
    }))

    const timelineEvents: TimelineEvent[] = []
    if (helmet.details?.year) {
        timelineEvents.push({
            id: `helmet-year-${helmet.id}`,
            date: `${helmet.details.year}-01-01`,
            title: 'Helmet Introduced',
            description: undefined,
            status: 'completed' as const,
            image: undefined,
            slug: undefined,
            code: 'DEBUT',
            format: 'Season',
        })
    }
    relatedData.races.slice(0, 10).forEach((race) => {
        if (race.details?.start_date) {
            timelineEvents.push({
                id: `race-${race.id}`,
                date: race.details.start_date,
                title: race.name,
                description: undefined,
                status: race.details?.status === 'completed' ? 'completed' as const : 'active' as const,
                image: undefined,
                slug: `/calendar/races/${race.slug}`,
                code: 'RACE',
                format: 'Grand Prix',
            })
        }
    })
    const sortedTimelineEvents = timelineEvents
        .filter(e => e.date)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const celebrationSlides = relatedData.celebrations.map((celebration) => ({
        id: String(celebration.id),
        title: celebration.name,
        description: '',
        image: getMediaUrl(celebration.assets?.thumbnail) || `https://picsum.photos/seed/${celebration.slug}/1200/1600`,
        ctaLabel: 'VIEW',
        ctaHref: undefined,
    }))

    const tableColumns = [
        { key: 'name', label: 'Driver', sortable: true, width: undefined },
        { key: 'number', label: 'Number', sortable: true, width: undefined },
        { key: 'nationality', label: 'Nationality', sortable: true, width: undefined },
    ]

    const tableRows = relatedData.drivers.map((d) => ({
        id: String(d.id),
        cells: {
            name: `${d.first_name} ${d.last_name}`,
            number: d.basics?.racing_number ? `#${d.basics.racing_number}` : 'N/A',
            nationality: (d.basics?.nationality && typeof d.basics.nationality === 'object' && 'name' in d.basics.nationality)
                ? d.basics.nationality.name
                : 'N/A',
        },
    }))

    const shortItems: any[] = []
    if (helmet.assets?.video) {
        const videoMedia = typeof helmet.assets.video === 'object' ? helmet.assets.video : null
        if (videoMedia?.url) {
            shortItems.push({
                id: `helmet-video-${helmet.id}`,
                title: helmet.name,
                videoUrl: videoMedia.url,
                poster: getMediaUrl(helmet.assets?.thumbnail),
                category: '360 SPIN',
            })
        }
    }

    return (
        <main className="w-full">
            <HeroSection
                id="helmet-details-hero"
                title={helmet.name}
                subtitle={helmet.details?.year || ''}
                description={helmet.details?.designer ? `Design by ${helmet.details.designer}` : undefined}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                badge={helmet.details?.usage || undefined}
                meta="HELMET DETAILS"
            />
            <InfoSection
                id="helmet-details-style"
                title="Style Profile"
                subtitle="Visual characteristics"
                cards={infoCards}
                columns={4}
                headerVariant={2}
            />
            {classificationExpandItems.length > 0 && (
                <ExpandSection
                    id="helmet-details-classifications"
                    title="Classifications"
                    subtitle="Safety ratings and technical compliance"
                    items={classificationExpandItems}
                    labels={{ indexPrefix: 'CLASS', progressLabel: 'PROGRESS', statusComplete: 'COMPLETE' }}
                />
            )}
            {manufacturerEntries.length > 0 && (
                <ListSection
                    id="helmet-details-manufacturers"
                    title="Manufacturers"
                    subtitle="Production partners and shell material providers"
                    entries={manufacturerEntries}
                    labels={{ statusPrefix: 'TYPE', timePrefix: 'ID', indexPrefix: 'MFR' }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {helmet.details?.concept && (
                <TextRevealSection
                    id="helmet-details-concept"
                    title={helmet.name}
                    subtitle="Design Narrative"
                    content={helmet.details.concept}
                />
            )}
            {sortedTimelineEvents.length > 0 && (
                <TimelineSection
                    id="helmet-details-timeline"
                    title="Timeline"
                    subtitle="Debut and associated races"
                    events={sortedTimelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'EVT',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'ACTIVE',
                            upcoming: 'UPCOMING',
                        },
                    }}
                />
            )}
            {celebrationSlides.length > 0 && (
                <CarouselSection
                    id="helmet-details-celebrations"
                    slides={celebrationSlides}
                    autoplayDelay={4000}
                />
            )}
            <TableSection
                id="helmet-details-drivers"
                title="DRIVER HISTORY"
                subtitle="Drivers who wore this helmet"
                columns={tableColumns}
                rows={tableRows}
                labels={{ sortActive: 'SORTED', rowIndicator: 'ROW' }}
                headerVariant={2}
            />
            {shortItems.length > 0 && (
                <ShortsSection
                    id="helmet-details-videos"
                    title="Media"
                    subtitle="360-degree spins and designer interviews"
                    items={shortItems}
                />
            )}
        </main>
    )
}