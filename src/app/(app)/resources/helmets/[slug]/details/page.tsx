// app/(frontend)/resources/helmets/[slug]/details/page.tsx
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

    const heroBackgroundImage = helmet.assets?.avatar
        ? getMediaUrl(helmet.assets.avatar)
        : helmet.assets?.thumbnail
            ? getMediaUrl(helmet.assets.thumbnail)
            : helmet.seo?.image
                ? getMediaUrl(helmet.seo.image)
                : undefined

    const manufacturerEntries: any[] = []
    if (helmet.details?.manufacturers?.list) {
        helmet.details.manufacturers.list.forEach((manufacturer) => {
            if (manufacturer.name) {
                manufacturerEntries.push({
                    id: manufacturer.id || String(Math.random()),
                    title: manufacturer.name,
                    subtitle: manufacturer.description || undefined,
                })
            }
        })
    }

    const classificationEntries: any[] = []
    if (helmet.details?.classifications?.list) {
        helmet.details.classifications.list.forEach((classification) => {
            if (classification.name) {
                classificationEntries.push({
                    id: classification.id || String(Math.random()),
                    title: classification.name,
                    subtitle: classification.description || classification.criteria || classification.definition || undefined,
                })
            }
        })
    }

    if (helmet.details?.concept) {
        classificationEntries.push({
            id: 'concept',
            title: 'Concept',
            subtitle: helmet.details.concept,
        })
    }

    if (helmet.details?.inspiration) {
        classificationEntries.push({
            id: 'inspiration',
            title: 'Inspiration',
            subtitle: helmet.details.inspiration,
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="helmet-details-cover"
                title={helmet.name}
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
                    headerVariant={1}
                    footerVariant={1}
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
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
        </main>
    )
}