// app/(frontend)/competition/sessions/[slug]/details/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import LeaderboardSection from '@/components/Section/Blocks/LeaderboardSection'
import { Entry, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { Activity, Clock, Flag, Gauge, Hash, Shield } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getSessionDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'sessions',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    segment: true,
                    description: true,
                    identifiers: { code: true },
                },
                assets: {
                    thumbnail: true,
                },
                details: {
                    access: true,
                    specification: true,
                    notes: true,
                },
                metrics: {
                    quantifiers: {
                        laps: true,
                        distance: true,
                        duration: true,
                        interval: true,
                        specification: true,
                    },
                },
                seo: {
                    image: true,
                },
            },
        })
        const sessionData = result.docs[0] || null

        let entries: Entry[] = []
        if (sessionData) {
            const entriesResult = await payload.find({
                collection: 'entries',
                where: {
                    'details.session': { equals: sessionData.id },
                },
                limit: 50,
                depth: 1,
                sort: 'details.finish_position',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        identifiers: { number: true, plate: true },
                        description: true,
                    },
                    assets: {
                        thumbnail: true,
                    },
                    details: {
                        finish_position: true,
                        grid_position: true,
                        start_position: true,
                        status: true,
                    },
                },
            })
            entries = entriesResult.docs
        }

        return { session: sessionData, entries }
    },
    ['session-details'],
    { revalidate: 3600, tags: ['session-details'] }
)

export default async function SessionDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const { session, entries } = await getSessionDetailsData(slug)

    if (!session) notFound()

    const heroBackgroundImage = getMediaUrl(session.assets?.thumbnail) || getMediaUrl(session.seo?.image)

    const infoCards: any[] = [
        {
            id: 'segment',
            label: 'Session Type',
            value: session.basics?.segment || 'N/A',
            icon: <Flag size={16} />,
            emphasis: 'high' as const,
        },
        {
            id: 'access',
            label: 'Access Level',
            value: session.details?.access || 'N/A',
            icon: <Shield size={16} />,
            emphasis: 'medium' as const,
        },
        {
            id: 'code',
            label: 'Session Code',
            value: session.basics?.identifiers?.code || 'N/A',
            icon: <Hash size={16} />,
            emphasis: 'low' as const,
        },
        {
            id: 'laps',
            label: 'Total Laps',
            value: session.metrics?.quantifiers?.laps ? String(session.metrics.quantifiers.laps) : 'N/A',
            icon: <Activity size={16} />,
            emphasis: 'high' as const,
        },
        {
            id: 'distance',
            label: 'Distance',
            value: session.metrics?.quantifiers?.distance ? `${session.metrics.quantifiers.distance} KM` : 'N/A',
            icon: <Gauge size={16} />,
            emphasis: 'medium' as const,
        },
        {
            id: 'duration',
            label: 'Duration',
            value: session.metrics?.quantifiers?.duration ? `${session.metrics.quantifiers.duration} MIN` : 'N/A',
            icon: <Clock size={16} />,
            emphasis: 'high' as const,
        },
    ]

    if (session.metrics?.quantifiers?.interval) {
        infoCards.push({
            id: 'interval',
            label: 'Timing Interval',
            value: session.metrics.quantifiers.interval.toString(),
            icon: <Activity size={16} />,
            emphasis: 'low' as const,
        })
    }

    const classifiedCount = entries.filter((e) => e.details?.status === 'Classified').length
    const notClassifiedCount = entries.filter((e) => e.details?.status === 'NotClassified').length

    infoCards.push({
        id: 'entries-classified',
        label: 'Classified Entries',
        value: String(classifiedCount),
        icon: <Flag size={16} />,
        emphasis: 'high' as const,
    })

    if (notClassifiedCount > 0) {
        infoCards.push({
            id: 'entries-not-classified',
            label: 'Not Classified',
            value: String(notClassifiedCount),
            icon: <Shield size={16} />,
            emphasis: 'low' as const,
        })
    }

    const leaderboardEntries: any[] = entries
        .filter((entry) => entry.details?.finish_position)
        .map((entry) => ({
            id: String(entry.id),
            position: entry.details?.finish_position || 0,
            name: entry.name || entry.basics?.identifiers?.number || `Entry ${entry.id}`,
            team: entry.basics?.identifiers?.plate || entry.basics?.description || undefined,
            points: entry.details?.status || undefined,
            image: getMediaUrl(entry.assets?.thumbnail),
            slug: entry.slug ? `/competition/entries/${entry.slug}` : undefined,
        }))

    return (
        <main className="w-full">
            <HeroSection
                id="session-details-cover"
                title={session.name}
                subtitle="Session Details"
                description={session.basics?.description || session.details?.specification || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={session.details?.access || session.basics?.segment || undefined}
                meta={session.basics?.identifiers?.code || undefined}
            />
            <InfoSection
                id="session-info"
                title="METRICS"
                subtitle="Session statistics and parameters"
                cards={infoCards}
                columns={4}
                headerVariant={1}
                footerVariant={1}
            />
            {leaderboardEntries.length > 0 && (
                <LeaderboardSection
                    id="session-leaderboard"
                    title="RESULTS"
                    subtitle="Session classification"
                    entries={leaderboardEntries}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
        </main>
    )
}