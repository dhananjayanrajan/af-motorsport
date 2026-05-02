// app/(frontend)/calendar/races/[slug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import LeaderboardSection from '@/components/Section/Blocks/LeaderboardSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
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
                    fastest_lap: true,
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

    const leaderboardEntries: any[] = []

    const winnerRef = race.details?.winner
    if (winnerRef && typeof winnerRef === 'object') {
        const winner = winnerRef as any
        const winnerName = `${winner.first_name || ''} ${winner.last_name || ''}`.trim()
        const winnerCar = winner.details?.cars?.[0] && typeof winner.details.cars[0] === 'object'
            ? (winner.details.cars[0] as any).name
            : undefined

        leaderboardEntries.push({
            id: `winner-${winner.id}`,
            position: 1,
            name: winnerName || 'Winner',
            team: winnerCar || undefined,
            image: getMediaUrl(winner.assets?.avatar),
            slug: winner.slug ? `teams/${winner.slug}` : undefined,
        })
    }

    const poleRef = race.details?.pole_position
    if (poleRef && typeof poleRef === 'object') {
        const pole = poleRef as any
        const poleName = pole.name || 'Pole Position'
        leaderboardEntries.push({
            id: `pole-${pole.id}`,
            position: 0,
            name: poleName,
            team: undefined,
            points: 'POLE',
            image: undefined,
            slug: undefined,
        })
    }

    const fastestLapRef = race.details?.fastest_lap
    if (fastestLapRef && typeof fastestLapRef === 'object') {
        const fastestLap = fastestLapRef as any
        const fastestLapName = fastestLap.name || 'Fastest Lap'
        leaderboardEntries.push({
            id: `fastest-lap-${fastestLap.id}`,
            position: 0,
            name: fastestLapName,
            team: undefined,
            points: race.details?.fastest_lap_time || 'FASTEST',
            image: undefined,
            slug: undefined,
        })
    }

    const highlightItems: any[] = []

    if (race.assets?.highlights && Array.isArray(race.assets.highlights)) {
        race.assets.highlights.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                highlightItems.push({
                    id: String(typeof item === 'object' ? item.id : idx),
                    title: (typeof item === 'object' && item.alt) || `HIGHLIGHT_${idx + 1}`,
                    image: url,
                    category: 'VISUAL',
                    height: 'medium' as const,
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
            {leaderboardEntries.length > 0 && (
                <LeaderboardSection
                    id="race-leaderboard"
                    title="CLASSIFICATION"
                    subtitle="Race results"
                    entries={leaderboardEntries}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {highlightItems.length > 0 && (
                <MasonrySection
                    id="race-highlights"
                    title="HIGHLIGHTS"
                    subtitle="Visual race media"
                    items={highlightItems}
                    labels={{
                        categoryPrefix: 'TYPE',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            <DocumentsSection
                id="race-documents"
                title="DOCUMENTS"
                subtitle="Official race documentation"
                documents={race.assets?.documents}
                referenceCode={race.basics?.identifiers?.code || race.slug || 'RACE'}
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}