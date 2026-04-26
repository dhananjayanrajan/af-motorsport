// app/(frontend)/teams/[teamSlug]/leaders/[leaderSlug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import { Award, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getLeaderDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'leaders',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1, // Depth 1 for essential relationship resolution (Awards/Media)
            select: {
                id: true,
                first_name: true,
                last_name: true,
                details: {
                    quote: true,
                    mission: true,
                    vision: true,
                    principles: {
                        list: true,
                    },
                    awards: true,
                    socials: {
                        list: true,
                    },
                    websites: {
                        list: true,
                    },
                },
            },
        })
        return result.docs[0] || null
    },
    ['leader-details'],
    { revalidate: 3600, tags: ['leader-details'] }
)

export default async function LeaderDetailsPage({ params }: { params: Promise<{ teamSlug: string; leaderSlug: string }> }) {
    const { leaderSlug } = await params
    const leader = await getLeaderDetailsData(leaderSlug)

    if (!leader) notFound()

    const leaderName = `${leader.first_name || ''} ${leader.last_name || ''}`.trim() || 'Leader'

    // 1. Complex Quote Logic with Priority Chain
    const quoteItem = leader.details?.quote
        ? {
            id: String(leader.id),
            text: leader.details.quote,
            author: leaderName,
        }
        : leader.details?.mission
            ? {
                id: String(leader.id),
                text: leader.details.mission,
                author: leaderName,
            }
            : leader.details?.vision
                ? {
                    id: String(leader.id),
                    text: leader.details.vision,
                    author: leaderName,
                }
                : null

    // 2. High-Density Principle Mapping
    const principleEntries: any[] = []
    if (leader.details?.principles?.list) {
        leader.details.principles.list.forEach((principle) => {
            if (principle.name) {
                principleEntries.push({
                    id: principle.id || String(Math.random()),
                    title: principle.name,
                    subtitle: principle.statement || principle.description || undefined,
                    status: principle.application || undefined,
                })
            }
        })
    }

    // 3. Performance-Focused Award Resolution
    const awardItems: any[] = []
    if (leader.details?.awards) {
        leader.details.awards.forEach((awardRef) => {
            const award = awardRef as Award
            if (award && typeof award === 'object' && 'name' in award) {
                const imageUrl = award.assets?.thumbnail
                    ? getMediaUrl(award.assets.thumbnail)
                    : award.assets?.candid
                        ? getMediaUrl(award.assets.candid)
                        : undefined

                awardItems.push({
                    id: String(award.id),
                    title: award.name,
                    subtitle: award.details?.awarded_date || award.basics?.description || undefined,
                    image: imageUrl,
                })
            }
        })
    }

    // 4. Combined Connectivity Items (Socials + Websites)
    const socialItems: any[] = []
    if (leader.details?.socials?.list) {
        leader.details.socials.list.forEach((social) => {
            if (social.platform && social.username) {
                socialItems.push({
                    id: social.id || `${social.platform}-${social.username}`,
                    title: social.platform,
                    subtitle: `@${social.username}`,
                })
            }
        })
    }

    const websiteItems: any[] = []
    if (leader.details?.websites?.list) {
        leader.details.websites.list.forEach((website) => {
            if (website.name && website.path) {
                websiteItems.push({
                    id: website.id || String(Math.random()),
                    title: website.name,
                    subtitle: website.path,
                    href: website.path,
                })
            }
        })
    }

    return (
        <main className="w-full">
            {quoteItem && (
                <QuoteSection
                    id="leader-quote"
                    title="Words of Wisdom"
                    subtitle={leaderName}
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'COMM',
                        ratingLabel: 'RATING',
                    }}
                    variant="grid"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {principleEntries.length > 0 && (
                <ListSection
                    id="leader-principles"
                    title="Principles"
                    subtitle="Core values and beliefs"
                    entries={principleEntries}
                    labels={{
                        statusPrefix: 'APPLY',
                        timePrefix: 'TIME',
                        indexPrefix: 'PRN',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {awardItems.length > 0 && (
                <GridSection
                    id="leader-awards"
                    title="Awards"
                    subtitle="Recognition and honors"
                    items={awardItems}
                    labels={{
                        unitsCount: 'AWD',
                        viewProject: 'VIEW',
                        sectionIndex: 'AWD',
                        fallbackAlt: 'Award',
                    }}
                    columns={3}
                />
            )}
            {(socialItems.length > 0 || websiteItems.length > 0) && (
                <GridSection
                    id="leader-connect"
                    title="Connect"
                    subtitle="Social media and websites"
                    items={[...socialItems, ...websiteItems]}
                    labels={{
                        unitsCount: 'CON',
                        viewProject: 'VIEW',
                        sectionIndex: 'CON',
                        fallbackAlt: 'Connect',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}