import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    identifiers: {
                        code: true,
                        abbreviation: true
                    },
                },
                assets: {
                    cover: true,
                    documents: true,
                },
                details: {
                    format: true,
                    standings_scope: true,
                    season: true,
                    start_date: true,
                    end_date: true,
                    winner: true,
                    runner_up: true,
                    third_place: true,
                    regulations: true,
                },
                seo: {
                    image: true,
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

    const heroBackgroundImage = resolveAssetUrl(championship.assets, 'cover') || getMediaUrl(championship.seo?.image)

    const specItems: any[] = [
        {
            id: 'format',
            title: 'FORMAT',
            subtitle: championship.details?.format || 'N/A',
        },
        {
            id: 'standings',
            title: 'STANDINGS_SCOPE',
            subtitle: championship.details?.standings_scope || 'N/A',
        },
        {
            id: 'code',
            title: 'CHAMPIONSHIP_ID',
            subtitle: championship.basics?.identifiers?.code || championship.basics?.identifiers?.abbreviation || 'N/A',
        },
        {
            id: 'season',
            title: 'SEASON_CYCLE',
            subtitle: championship.details?.season && typeof championship.details.season === 'object' && 'name' in championship.details.season ? championship.details.season.name : 'N/A',
        },
    ]

    const podiumFeatures: any[] = []
    if (championship.details?.winner) {
        const winner = championship.details.winner
        podiumFeatures.push({
            id: 'winner',
            title: 'CHAMPION_P1',
            description: typeof winner === 'object' && 'first_name' in winner && 'last_name' in winner ? `${winner.first_name} ${winner.last_name}` : 'WINNER',
        })
    }
    if (championship.details?.runner_up) {
        const runnerUp = championship.details.runner_up
        podiumFeatures.push({
            id: 'runner-up',
            title: 'RUNNER_UP_P2',
            description: typeof runnerUp === 'object' && 'first_name' in runnerUp && 'last_name' in runnerUp ? `${runnerUp.first_name} ${runnerUp.last_name}` : 'RUNNER_UP',
        })
    }
    if (championship.details?.third_place) {
        const thirdPlace = championship.details.third_place
        podiumFeatures.push({
            id: 'third-place',
            title: 'THIRD_PLACE_P3',
            description: typeof thirdPlace === 'object' && 'first_name' in thirdPlace && 'last_name' in thirdPlace ? `${thirdPlace.first_name} ${thirdPlace.last_name}` : 'THIRD_PLACE',
        })
    }

    const timelineEvents: any[] = []
    if (championship.details?.start_date) {
        timelineEvents.push({
            id: 'start',
            date: new Date(championship.details.start_date).toISOString().split('T')[0],
            title: 'INITIALIZATION',
            description: 'Season commencement and entry verification.',
            status: 'completed' as const,
        })
    }
    if (championship.details?.end_date) {
        timelineEvents.push({
            id: 'end',
            date: new Date(championship.details.end_date).toISOString().split('T')[0],
            title: 'TERMINATION',
            description: 'Season conclusion and final points calculation.',
            status: 'upcoming' as const,
        })
    }

    const regulationEntries: any[] = []
    if (championship.details?.regulations) {
        const reg = championship.details.regulations
        regulationEntries.push({
            id: String(typeof reg === 'object' ? reg.id : reg),
            title: 'CHAMPIONSHIP_REGULATIONS',
            subtitle: 'Sporting and technical governing rules for the current series cycle.',
        })
    }

    const documentItems: any[] = []
    if (championship.assets?.documents && Array.isArray(championship.assets.documents)) {
        championship.assets.documents.forEach((doc, idx) => {
            const url = getMediaUrl(doc)
            if (url) {
                documentItems.push({
                    id: (typeof doc === 'object' && doc.id) ? String(doc.id) : `doc-${idx}`,
                    title: (typeof doc === 'object' && (doc.alt || doc.filename)) || `DOC_${idx + 1}`,
                    subtitle: (typeof doc === 'object' && doc.mimeType) || 'APPLICATION/PDF',
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="championship-details-cover"
                title={championship.name}
                subtitle="CHAMPIONSHIP_SPECIFICATIONS"
                description={championship.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={championship.basics?.identifiers?.code || 'SERIES'}
            />
            <GridSection
                id="championship-specifications"
                title="PARAMETERS"
                subtitle="Technical series specifications and identification codes"
                items={specItems}
                labels={{
                    unitsCount: 'SPECS',
                    viewProject: 'DATA',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Spec',
                }}
                columns={4}
            />
            {podiumFeatures.length > 0 && (
                <FeatureSection
                    id="championship-podium"
                    title="CLASSIFICATION"
                    subtitle="Primary podium rankings"
                    features={[...podiumFeatures]}
                    labels={{
                        specIndex: 'POD',
                        statsLabel: 'DATA',
                        ctaLabel: 'SCAN',
                    }}
                    columns={3}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="championship-timeline"
                    title="CHRONOLOGY"
                    subtitle="Key series operational dates"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STAT',
                        eventIndexLabel: 'STEP',
                        deploymentStatus: {
                            completed: 'SYNCED',
                            active: 'ACTIVE',
                            upcoming: 'PENDING',
                        },
                    }}
                    orientation="horizontal"
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {regulationEntries.length > 0 && (
                <ListSection
                    id="championship-regulations"
                    title="GOVERNANCE"
                    subtitle="Technical and sporting regulatory frameworks"
                    entries={regulationEntries}
                    labels={{
                        statusPrefix: 'REQD',
                        timePrefix: 'SYNC',
                        indexPrefix: 'REG',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="championship-documents"
                    title="ARCHIVE"
                    subtitle="Official championship documentation and resources"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'FETCH',
                        sectionIndex: 'DAT',
                        fallbackAlt: 'File',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}