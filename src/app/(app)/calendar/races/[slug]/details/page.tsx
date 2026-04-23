// app/(frontend)/calendar/races/[slug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import StudySection from '@/components/Section/Blocks/StudySection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getRaceDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'races',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['race-details'],
    { revalidate: 3600, tags: ['race-details'] }
)

export default async function RaceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const race = await getRaceDetailsData(slug)

    if (!race) notFound()

    const heroBackgroundImage = race.assets?.cover
        ? getMediaUrl(race.assets.cover)
        : race.assets?.poster
            ? getMediaUrl(race.assets.poster)
            : race.seo?.image
                ? getMediaUrl(race.seo.image)
                : undefined

    const specItems: any[] = [
        {
            id: 'type',
            title: 'Race Type',
            subtitle: race.details?.type || 'N/A',
        },
        {
            id: 'status',
            title: 'Status',
            subtitle: race.details?.status || 'N/A',
        },
        {
            id: 'laps',
            title: 'Laps',
            subtitle: race.details?.laps ? String(race.details.laps) : 'N/A',
        },
        {
            id: 'distance',
            title: 'Distance',
            subtitle: race.details?.distance_km ? `${race.details.distance_km} km` : 'N/A',
        },
        {
            id: 'weather',
            title: 'Weather',
            subtitle: race.details?.weather || 'N/A',
        },
        {
            id: 'safety-car',
            title: 'Safety Car Periods',
            subtitle: race.details?.safety_car_periods ? String(race.details.safety_car_periods) : '0',
        },
        {
            id: 'red-flags',
            title: 'Red Flags',
            subtitle: race.details?.red_flags ? String(race.details.red_flags) : '0',
        },
        {
            id: 'fastest-lap',
            title: 'Fastest Lap',
            subtitle: race.details?.fastest_lap_time || 'N/A',
        },
    ]

    const competitionStudyImage = race.assets?.cover
        ? getMediaUrl(race.assets.cover)
        : race.assets?.poster
            ? getMediaUrl(race.assets.poster)
            : undefined

    const competitionStudy = {
        id: String(race.id),
        title: 'Competition',
        description: race.details?.notes || 'Race competition details and results.',
        image: competitionStudyImage || `https://picsum.photos/seed/${race.slug}-comp/800/600`,
        metrics: [
            {
                label: 'Winner',
                value: race.details?.winner && typeof race.details.winner === 'object' && 'first_name' in race.details.winner
                    ? `${race.details.winner.first_name} ${race.details.winner.last_name}`
                    : 'N/A'
            },
            {
                label: 'Pole Position',
                value: race.details?.pole_position && typeof race.details.pole_position === 'object' && 'name' in race.details.pole_position
                    ? race.details.pole_position.name
                    : 'N/A'
            },
            {
                label: 'Circuit',
                value: race.details?.circuit && typeof race.details.circuit === 'object' && 'name' in race.details.circuit
                    ? race.details.circuit.name
                    : 'N/A'
            },
            {
                label: 'Series',
                value: race.details?.series && typeof race.details.series === 'object' && 'name' in race.details.series
                    ? race.details.series.name
                    : 'N/A'
            },
        ],
    }

    const highlightsAndDocsItems: any[] = []

    if (race.assets?.highlights) {
        race.assets.highlights.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                highlightsAndDocsItems.push({
                    id: String(media.id),
                    title: media.alt || `Highlight ${idx + 1}`,
                    image: url,
                    category: 'Highlight',
                    height: 'medium' as const,
                })
            }
        })
    }

    if (race.assets?.documents) {
        race.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                highlightsAndDocsItems.push({
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    description: media.mimeType || undefined,
                    image: url,
                    category: 'Document',
                    height: 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="race-details-cover"
                title={race.name}
                subtitle={race.basics?.tagline || 'Race Specifications'}
                description={race.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={race.basics?.identifiers?.code || race.details?.type || undefined}
                meta={race.details?.start_date ? `Date: ${new Date(race.details.start_date).toLocaleDateString()}` : undefined}
            />
            <GridSection
                id="race-specifications"
                title="Specifications"
                subtitle="Race details and statistics"
                items={specItems}
                labels={{
                    unitsCount: 'SPECS',
                    viewProject: 'VIEW',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Spec',
                }}
                columns={4}
            />
            <StudySection
                id="race-competition"
                title="Competition Details"
                subtitle="Results and participants"
                studies={[competitionStudy]}
                variant="featured"
                headerVariant={2}
                footerVariant={1}
            />
            {highlightsAndDocsItems.length > 0 && (
                <MasonrySection
                    id="race-highlights-documents"
                    title="Highlights & Documents"
                    subtitle="Media and resources from the race"
                    items={highlightsAndDocsItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}