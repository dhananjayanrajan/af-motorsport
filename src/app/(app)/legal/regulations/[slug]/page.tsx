// app/(frontend)/legal/regulations/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
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

const getRegulationData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'regulations',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['regulation-detail'],
    { revalidate: 3600, tags: ['regulation'] }
)

export default async function RegulationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const regulation = await getRegulationData(slug)

    if (!regulation) notFound()

    const feature = {
        id: String(regulation.id),
        title: regulation.name,
        description: regulation.basics?.description || '',
        image: regulation.basics?.document ? getMediaUrl(regulation.basics.document) : `https://picsum.photos/seed/${regulation.slug}/800/600`,
        stats: [
            { label: 'Status', value: regulation.basics?.status || 'N/A' },
            { label: 'Type', value: regulation.basics?.type || 'N/A' },
            { label: 'Version', value: regulation.basics?.version || 'N/A' },
            { label: 'Effective', value: regulation.basics?.effective_date ? new Date(regulation.basics.effective_date).toLocaleDateString() : 'N/A' },
        ],
    }

    const downloadItems = regulation.basics?.document
        ? [
            {
                id: String(regulation.id),
                title: 'Download Document',
                subtitle: regulation.basics?.version ? `Version ${regulation.basics.version}` : '',
                image: getMediaUrl(regulation.basics.document) || `https://picsum.photos/seed/${regulation.slug}/200/200`,
                href: getMediaUrl(regulation.basics.document) || '#',
            },
        ]
        : []

    return (
        <main className="w-full">
            <FeatureSection
                id="regulation-content"
                title={regulation.name}
                subtitle="Regulation Details"
                features={[feature]}
                labels={{
                    specIndex: 'REG',
                    statsLabel: 'INFO',
                    ctaLabel: 'REVIEW',
                }}
                columns={2}
                headerVariant={1}
                footerVariant={1}
            />
            {downloadItems.length > 0 && (
                <GridSection
                    id="regulation-download"
                    title="Download"
                    subtitle="Available document"
                    items={downloadItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'VIEW',
                        sectionIndex: 'DL',
                        fallbackAlt: 'Document',
                    }}
                    columns={1}
                />
            )}
        </main>
    )
}