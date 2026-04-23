// app/(frontend)/calendar/championships/[slug]/details/page.tsx
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

const getChampionshipDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'championships',
            where: { slug: { equals: slug } },
            limit: 1,
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

    const heroBackgroundImage = championship.assets?.cover
        ? getMediaUrl(championship.assets.cover)
        : championship.seo?.image
            ? getMediaUrl(championship.seo.image)
            : undefined

    const specItems: any[] = [
        {
            id: 'format',
            title: 'Format',
            subtitle: championship.details?.format || 'N/A',
        },
        {
            id: 'standings',
            title: 'Standings Scope',
            subtitle: championship.details?.standings_scope || 'N/A',
        },
        {
            id: 'code',
            title: 'Championship Code',
            subtitle: championship.basics?.identifiers?.code || championship.basics?.identifiers?.abbreviation || 'N/A',
        },
        {
            id: 'season',
            title: 'Season',
            subtitle: championship.details?.season && typeof championship.details.season === 'object' && 'name' in championship.details.season ? championship.details.season.name : 'N/A',
        },
    ]

    const podiumFeatures: any[] = []
    if (championship.details?.winner) {
        const winner = championship.details.winner
        podiumFeatures.push({
            id: 'winner',
            title: 'Champion',
            description: typeof winner === 'object' && 'first_name' in winner && 'last_name' in winner ? `${winner.first_name} ${winner.last_name}` : 'Winner',
        })
    }
    if (championship.details?.runner_up) {
        const runnerUp = championship.details.runner_up
        podiumFeatures.push({
            id: 'runner-up',
            title: 'Runner Up',
            description: typeof runnerUp === 'object' && 'first_name' in runnerUp && 'last_name' in runnerUp ? `${runnerUp.first_name} ${runnerUp.last_name}` : 'Runner Up',
        })
    }
    if (championship.details?.third_place) {
        const thirdPlace = championship.details.third_place
        podiumFeatures.push({
            id: 'third-place',
            title: 'Third Place',
            description: typeof thirdPlace === 'object' && 'first_name' in thirdPlace && 'last_name' in thirdPlace ? `${thirdPlace.first_name} ${thirdPlace.last_name}` : 'Third Place',
        })
    }

    const timelineEvents: any[] = []
    if (championship.details?.start_date) {
        timelineEvents.push({
            id: 'start',
            date: new Date(championship.details.start_date).toLocaleDateString(),
            title: 'Championship Start',
            description: 'Season commencement',
            status: 'completed' as const,
        })
    }
    if (championship.details?.end_date) {
        timelineEvents.push({
            id: 'end',
            date: new Date(championship.details.end_date).toLocaleDateString(),
            title: 'Championship Finale',
            description: 'Season conclusion',
            status: 'upcoming' as const,
        })
    }

    const regulationEntries: any[] = []
    if (championship.details?.regulations) {
        const reg = championship.details.regulations
        regulationEntries.push({
            id: String(typeof reg === 'object' ? reg.id : reg),
            title: 'Championship Regulations',
            subtitle: 'Sporting and technical rules',
        })
    }

    const documentItems: any[] = []
    if (championship.assets?.documents) {
        championship.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                documentItems.push({
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    subtitle: media.mimeType || undefined,
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
                subtitle="Championship Specifications"
                description={championship.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={championship.basics?.identifiers?.code || undefined}
            />
            <GridSection
                id="championship-specifications"
                title="Specifications"
                subtitle="Championship details"
                items={specItems}
                columns={4}
                cardVariant={1}
                headerVariant={1}
                footerVariant={1}
            />
            {podiumFeatures.length > 0 && (
                <FeatureSection
                    id="championship-podium"
                    title="Podium"
                    subtitle="Top finishers"
                    features={podiumFeatures}
                    columns={3}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="championship-timeline"
                    title="Timeline"
                    subtitle="Key championship dates"
                    events={timelineEvents}
                    orientation="horizontal"
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {regulationEntries.length > 0 && (
                <ListSection
                    id="championship-regulations"
                    title="Regulations"
                    subtitle="Governing rules"
                    entries={regulationEntries}
                    variant="detailed"
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="championship-documents"
                    title="Documents"
                    subtitle="Official championship documents"
                    items={documentItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}