import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
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

const getHelmetDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'helmets',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                basics: {
                    tagline: true,
                    description: true,
                },
                assets: {
                    avatar: true,
                    thumbnail: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    usage: true,
                    style: true,
                    concept: true,
                    inspiration: true,
                    manufacturers: {
                        list: true,
                    },
                    classifications: {
                        list: true,
                    },
                },
            },
        })
        return result.docs[0] || null
    },
    ['helmet-details'],
    { revalidate: 3600, tags: ['helmet-details'] }
)

export default async function HelmetDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const helmet = await getHelmetDetailsData(slug)

    if (!helmet) notFound()

    const heroBackgroundImage = getMediaUrl(helmet.assets?.avatar) ||
        getMediaUrl(helmet.assets?.thumbnail) ||
        getMediaUrl(helmet.seo?.image)

    const manufacturerEntries = (helmet.details?.manufacturers?.list || [])
        .filter((m) => m.name)
        .map((m, idx) => ({
            id: m.id || String(idx),
            title: m.name || '',
            subtitle: m.description || undefined,
        }))

    const baseClassifications = (helmet.details?.classifications?.list || [])
        .filter((c) => c.name)
        .map((c, idx) => ({
            id: c.id || String(idx),
            title: c.name || '',
            subtitle: c.description || c.criteria || c.definition || undefined,
        }))

    const classificationEntries = [
        ...baseClassifications,
        ...(helmet.details?.concept ? [{
            id: 'concept',
            title: 'Concept',
            subtitle: helmet.details.concept,
        }] : []),
        ...(helmet.details?.inspiration ? [{
            id: 'inspiration',
            title: 'Inspiration',
            subtitle: helmet.details.inspiration,
        }] : []),
    ]

    return (
        <main className="w-full">
            <HeroSection
                id="helmet-details-cover"
                title={helmet.name || ''}
                subtitle={helmet.basics?.tagline || 'Helmet Details'}
                description={helmet.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={helmet.details?.usage || helmet.details?.style || undefined}
            />
            {manufacturerEntries.length > 0 && (
                <ListSection
                    id="helmet-manufacturers"
                    title="Manufacturers"
                    subtitle="Helmet makers"
                    entries={manufacturerEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'MFR',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            {classificationEntries.length > 0 && (
                <ListSection
                    id="helmet-classifications"
                    title="Classifications & Details"
                    subtitle="Helmet specifications"
                    entries={classificationEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'CLS',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
        </main>
    )
}