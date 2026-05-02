// app/(frontend)/calendar/championships/[slug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import LeaderboardSection from '@/components/Section/Blocks/LeaderboardSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
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

const getChampionshipDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'championships',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    identifiers: {
                        code: true,
                        abbreviation: true,
                    },
                    tagline: true,
                },
                assets: {
                    cover: true,
                    documents: true,
                    thumbnail: true,
                },
                details: {
                    format: true,
                    standings_scope: true,
                    season: true,
                    series: true,
                    start_date: true,
                    end_date: true,
                    winner: true,
                    runner_up: true,
                    third_place: true,
                    regulations: true,
                    notes: true,
                    history: true,
                },
                seo: {
                    image: true,
                    description: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['championship-details'],
    { revalidate: 3600, tags: ['championship-details'] }
)

export default async function ChampionshipDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const championship = await getChampionshipDetailsData(slug)

    if (!championship) notFound()

    const details = championship.details

    const heroBackgroundImage = resolveAssetUrl(championship.assets, 'cover') || getMediaUrl(championship.seo?.image)

    const heroDescription = championship.basics?.description
        || championship.seo?.description
        || championship.basics?.tagline
        || undefined

    const formatDisplay = details?.format
        ? details.format.replace(/_/g, ' ').toUpperCase()
        : undefined

    const scopeDisplay = details?.standings_scope
        ? details.standings_scope.replace(/_/g, ' ').toUpperCase()
        : undefined

    const seasonRef = details?.season
    const seasonName =
        seasonRef && typeof seasonRef === 'object' && 'name' in seasonRef
            ? (seasonRef as any).name
            : undefined

    const seriesRef = details?.series
    const seriesName =
        seriesRef && typeof seriesRef === 'object' && 'name' in seriesRef
            ? (seriesRef as any).name
            : undefined

    const startDate = details?.start_date
        ? new Date(details.start_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : undefined

    const endDate = details?.end_date
        ? new Date(details.end_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : undefined

    const specItems: any[] = [
        {
            id: 'format',
            title: 'Format',
            subtitle: formatDisplay || 'Not specified',
            image: undefined,
            href: undefined,
            category: 'Competition',
        },
        {
            id: 'standings',
            title: 'Standings Scope',
            subtitle: scopeDisplay || 'Not specified',
            image: undefined,
            href: undefined,
            category: 'Rules',
        },
        {
            id: 'code',
            title: 'Championship Code',
            subtitle: championship.basics?.identifiers?.code
                || championship.basics?.identifiers?.abbreviation
                || 'N/A',
            image: undefined,
            href: undefined,
            category: 'Identification',
        },
        {
            id: 'season',
            title: 'Season',
            subtitle: seasonName || 'N/A',
            image: undefined,
            href: undefined,
            category: 'Schedule',
        },
        ...(seriesName
            ? [
                {
                    id: 'series',
                    title: 'Series',
                    subtitle: seriesName,
                    image: undefined,
                    href: undefined,
                    category: 'Hierarchy',
                },
            ]
            : []),
        ...(startDate
            ? [
                {
                    id: 'start-date',
                    title: 'Start Date',
                    subtitle: startDate,
                    image: undefined,
                    href: undefined,
                    category: 'Timeline',
                },
            ]
            : []),
        ...(endDate
            ? [
                {
                    id: 'end-date',
                    title: 'End Date',
                    subtitle: endDate,
                    image: undefined,
                    href: undefined,
                    category: 'Timeline',
                },
            ]
            : []),
    ]

    const leaderboardEntries: any[] = []

    const winnerRef = details?.winner
    if (winnerRef && typeof winnerRef === 'object') {
        const winner = winnerRef as any
        const winnerName = `${winner.first_name || ''} ${winner.last_name || ''}`.trim()
        const winnerPoints = winner.details?.points?.[0] && typeof winner.details.points[0] === 'object'
            ? (winner.details.points[0] as any).details?.value
            : undefined
        const winnerCar = winner.details?.cars?.[0] && typeof winner.details.cars[0] === 'object'
            ? (winner.details.cars[0] as any).name
            : undefined

        leaderboardEntries.push({
            id: `podium-1st`,
            position: 1,
            name: winnerName || 'Champion',
            team: winnerCar || undefined,
            points: winnerPoints ?? undefined,
            image: getMediaUrl(winner.assets?.avatar),
            slug: winner.slug ? `teams/${winner.slug}` : undefined,
        })
    }

    const runnerUpRef = details?.runner_up
    if (runnerUpRef && typeof runnerUpRef === 'object') {
        const runnerUp = runnerUpRef as any
        const runnerUpName = `${runnerUp.first_name || ''} ${runnerUp.last_name || ''}`.trim()
        const runnerUpPoints = runnerUp.details?.points?.[0] && typeof runnerUp.details.points[0] === 'object'
            ? (runnerUp.details.points[0] as any).details?.value
            : undefined
        const runnerUpCar = runnerUp.details?.cars?.[0] && typeof runnerUp.details.cars[0] === 'object'
            ? (runnerUp.details.cars[0] as any).name
            : undefined

        leaderboardEntries.push({
            id: `podium-2nd`,
            position: 2,
            name: runnerUpName || 'Runner-Up',
            team: runnerUpCar || undefined,
            points: runnerUpPoints ?? undefined,
            image: getMediaUrl(runnerUp.assets?.avatar),
            slug: runnerUp.slug ? `teams/${runnerUp.slug}` : undefined,
        })
    }

    const thirdPlaceRef = details?.third_place
    if (thirdPlaceRef && typeof thirdPlaceRef === 'object') {
        const thirdPlace = thirdPlaceRef as any
        const thirdPlaceName = `${thirdPlace.first_name || ''} ${thirdPlace.last_name || ''}`.trim()
        const thirdPlacePoints = thirdPlace.details?.points?.[0] && typeof thirdPlace.details.points[0] === 'object'
            ? (thirdPlace.details.points[0] as any).details?.value
            : undefined
        const thirdPlaceCar = thirdPlace.details?.cars?.[0] && typeof thirdPlace.details.cars[0] === 'object'
            ? (thirdPlace.details.cars[0] as any).name
            : undefined

        leaderboardEntries.push({
            id: `podium-3rd`,
            position: 3,
            name: thirdPlaceName || 'Third Place',
            team: thirdPlaceCar || undefined,
            points: thirdPlacePoints ?? undefined,
            image: getMediaUrl(thirdPlace.assets?.avatar),
            slug: thirdPlace.slug ? `teams/${thirdPlace.slug}` : undefined,
        })
    }

    const timelineEvents: any[] = []
    if (startDate) {
        timelineEvents.push({
            id: 'season-start',
            date: details?.start_date
                ? new Date(details.start_date).toISOString().split('T')[0]
                : 'TBD',
            title: 'Season Start',
            description: `The ${championship.name} season begins${seasonName ? ` — ${seasonName}` : ''}.`,
            status: 'completed' as const,
            slug: `calendar/championships/${championship.slug}`,
        })
    }
    if (endDate) {
        timelineEvents.push({
            id: 'season-end',
            date: details?.end_date
                ? new Date(details.end_date).toISOString().split('T')[0]
                : 'TBD',
            title: 'Season Finale',
            description: `The ${championship.name} season concludes and the champion is crowned.`,
            status: endDate && new Date(details!.end_date!) > new Date()
                ? 'upcoming' as const
                : 'completed' as const,
            slug: `calendar/championships/${championship.slug}`,
        })
    }
    if (details?.notes) {
        timelineEvents.push({
            id: 'championship-notes',
            date: details?.start_date
                ? new Date(details.start_date).toISOString().split('T')[0]
                : 'TBD',
            title: 'Key Notes',
            description: details.notes,
            status: 'active' as const,
            slug: `calendar/championships/${championship.slug}`,
        })
    }

    const regulationEntries: any[] = []
    if (details?.regulations) {
        const reg = details.regulations
        if (typeof reg === 'object') {
            const regObj = reg as any
            regulationEntries.push({
                id: String(regObj.id),
                title: regObj.name || 'Championship Regulations',
                subtitle: regObj.basics?.description || regObj.basics?.status || 'Governing rules',
                tag: regObj.basics?.type || 'Regulation',
                href: regObj.slug ? `/legal/regulations/${regObj.slug}` : undefined,
                timestamp: regObj.basics?.effective_date
                    ? new Date(regObj.basics.effective_date).toISOString().split('T')[0]
                    : undefined,
                status: regObj.basics?.status || 'Published',
            })
        } else {
            regulationEntries.push({
                id: String(reg),
                title: 'Championship Regulations',
                subtitle: 'Governing rules and technical specifications',
                tag: 'Regulation',
                status: 'Reference',
            })
        }
    }

    if (details?.notes && regulationEntries.length === 0) {
        regulationEntries.push({
            id: 'championship-rules-context',
            title: 'Competition Rules',
            subtitle: details.notes,
            tag: 'Guidelines',
            status: 'Active',
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="championship-details-cover"
                title={championship.name}
                subtitle="Championship Specifications"
                description={heroDescription}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={championship.basics?.identifiers?.code || championship.basics?.identifiers?.abbreviation || 'CHAMPIONSHIP'}
            />

            <GridSection
                id="championship-specifications"
                title="Parameters"
                subtitle="Technical championship specifications and identification codes"
                items={specItems}
                labels={{
                    unitsCount: 'SPECS',
                    viewProject: 'VIEW',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Specification',
                }}
                columns={4}
            />

            {leaderboardEntries.length > 0 && (
                <LeaderboardSection
                    id="championship-leaderboard"
                    title="STANDINGS"
                    subtitle={`${championship.name} Podium`}
                    entries={leaderboardEntries}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}

            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="championship-timeline"
                    title="Season Timeline"
                    subtitle={`Key dates for the ${championship.name} season`}
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STATUS',
                        eventIndexLabel: 'EVENT',
                        deploymentStatus: {
                            completed: 'COMPLETED',
                            active: 'IN PROGRESS',
                            upcoming: 'UPCOMING',
                        },
                    }}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}

            {regulationEntries.length > 0 && (
                <ListSection
                    id="championship-regulations"
                    title="Regulations"
                    subtitle="Governing rules and compliance documentation"
                    entries={regulationEntries}
                    labels={{
                        statusPrefix: 'STATUS',
                        timePrefix: 'EFFECTIVE',
                        indexPrefix: 'REG',
                    }}
                    showStatus={true}
                    showTimestamp={true}
                />
            )}

            <DocumentsSection
                id="championship-documents"
                title="Documents"
                subtitle="Official championship resources and downloads"
                documents={championship.assets?.documents}
                referenceCode={championship.basics?.identifiers?.code || championship.basics?.identifiers?.abbreviation || championship.slug || 'CHMP'}
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}