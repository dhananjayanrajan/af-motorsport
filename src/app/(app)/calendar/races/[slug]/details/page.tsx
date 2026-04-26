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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getRaceDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'races',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    tagline: true,
                    identifiers: { code: true },
                },
                assets: {
                    cover: true,
                    poster: true,
                    highlights: true,
                    documents: true,
                },
                details: {
                    type: true,
                    status: true,
                    laps: true,
                    distance_km: true,
                    weather: true,
                    safety_car_periods: true,
                    red_flags: true,
                    fastest_lap_time: true,
                    start_date: true,
                    winner: true,
                    pole_position: true,
                    circuit: true,
                    series: true,
                    notes: true,
                },
                seo: {
                    image: true,
                },
            },
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

    const heroBackgroundImage = resolveAssetUrl(race.assets, 'cover', 'poster') || getMediaUrl(race.seo?.image)

    const specItems: any[] = [
        {
            id: 'type',
            title: 'RACE_TYPE',
            subtitle: race.details?.type || 'N/A',
        },
        {
            id: 'status',
            title: 'STATUS',
            subtitle: race.details?.status || 'N/A',
        },
        {
            id: 'laps',
            title: 'TOTAL_LAPS',
            subtitle: race.details?.laps ? String(race.details.laps) : 'N/A',
        },
        {
            id: 'distance',
            title: 'DISTANCE_KM',
            subtitle: race.details?.distance_km ? `${race.details.distance_km} KM` : 'N/A',
        },
        {
            id: 'weather',
            title: 'ATMOSPHERE',
            subtitle: race.details?.weather || 'N/A',
        },
        {
            id: 'safety-car',
            title: 'SAFETY_PERIODS',
            subtitle: race.details?.safety_car_periods ? String(race.details.safety_car_periods) : '0',
        },
        {
            id: 'red-flags',
            title: 'RED_FLAGS',
            subtitle: race.details?.red_flags ? String(race.details.red_flags) : '0',
        },
        {
            id: 'fastest-lap',
            title: 'FASTEST_LAP',
            subtitle: race.details?.fastest_lap_time || 'N/A',
        },
    ]

    const competitionStudyImage = resolveAssetUrl(race.assets, 'cover', 'poster')

    const competitionStudy = {
        id: String(race.id),
        title: 'CLASSIFICATION',
        description: race.details?.notes || 'Event competition intelligence and verified results.',
        image: competitionStudyImage || '',
        metrics: [
            {
                label: 'WINNER',
                value: race.details?.winner && typeof race.details.winner === 'object' && 'first_name' in race.details.winner
                    ? `${race.details.winner.first_name} ${race.details.winner.last_name}`
                    : 'N/A'
            },
            {
                label: 'POLE',
                value: race.details?.pole_position && typeof race.details.pole_position === 'object' && 'name' in race.details.pole_position
                    ? race.details.pole_position.name
                    : 'N/A'
            },
            {
                label: 'CIRCUIT',
                value: race.details?.circuit && typeof race.details.circuit === 'object' && 'name' in race.details.circuit
                    ? race.details.circuit.name
                    : 'N/A'
            },
            {
                label: 'SERIES',
                value: race.details?.series && typeof race.details.series === 'object' && 'name' in race.details.series
                    ? race.details.series.name
                    : 'N/A'
            },
        ],
    }

    const highlightsAndDocsItems: any[] = []

    if (race.assets?.highlights && Array.isArray(race.assets.highlights)) {
        race.assets.highlights.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                highlightsAndDocsItems.push({
                    id: String(typeof item === 'object' ? item.id : idx),
                    title: (typeof item === 'object' && item.alt) || `HIGHLIGHT_${idx + 1}`,
                    image: url,
                    category: 'VISUAL',
                    height: 'medium' as const,
                })
            }
        })
    }

    if (race.assets?.documents && Array.isArray(race.assets.documents)) {
        race.assets.documents.forEach((doc, idx) => {
            const url = getMediaUrl(doc)
            if (url) {
                highlightsAndDocsItems.push({
                    id: (typeof doc === 'object' && doc.id) ? String(doc.id) : `doc-${idx}`,
                    title: (typeof doc === 'object' && (doc.alt || doc.filename)) || `DOC_${idx + 1}`,
                    description: (typeof doc === 'object' && doc.mimeType) || 'APPLICATION/PDF',
                    image: url,
                    category: 'ARCHIVE',
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
                subtitle="OPERATIONAL_SPECIFICATIONS"
                description={race.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={race.basics?.identifiers?.code || 'RACE_SPEC'}
                meta={race.details?.start_date ? `TIMESTAMP: ${new Date(race.details.start_date).toISOString().split('T')[0]}` : undefined}
            />
            <GridSection
                id="race-specifications"
                title="PARAMETERS"
                subtitle="Technical race telemetry and environmental statistics"
                items={specItems}
                labels={{
                    unitsCount: 'SPECS',
                    viewProject: 'DATA',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Spec',
                }}
                columns={4}
            />
            <StudySection
                id="race-competition"
                title="RESULTS"
                subtitle="Final classification and participant verification"
                studies={[competitionStudy]}
                variant="featured"
                headerVariant={2}
                footerVariant={1}
            />
            {highlightsAndDocsItems.length > 0 && (
                <MasonrySection
                    id="race-highlights-documents"
                    title="MEDIA"
                    subtitle="Visual intelligence and archival resources"
                    items={highlightsAndDocsItems}
                    labels={{
                        categoryPrefix: 'TYPE',
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