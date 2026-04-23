// app/(frontend)/legal/policies/[slug]/page.tsx
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

const getPolicyData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'policies',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['policy-detail'],
    { revalidate: 3600, tags: ['policy'] }
)

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const policy = await getPolicyData(slug)

    if (!policy) notFound()

    const feature = {
        id: String(policy.id),
        title: policy.name,
        description: policy.basics?.description || '',
        image: policy.basics?.document ? getMediaUrl(policy.basics.document) : `https://picsum.photos/seed/${policy.slug}/800/600`,
        stats: [
            { label: 'Version', value: policy.basics?.version || 'N/A' },
            { label: 'Effective', value: policy.basics?.effective_date ? new Date(policy.basics.effective_date).toLocaleDateString() : 'N/A' },
            { label: 'Last Reviewed', value: policy.basics?.last_reviewed ? new Date(policy.basics.last_reviewed).toLocaleDateString() : 'N/A' },
        ],
    }

    const downloadItems = policy.basics?.document
        ? [
            {
                id: String(policy.id),
                title: 'Download Document',
                subtitle: policy.basics?.version ? `Version ${policy.basics.version}` : '',
                image: getMediaUrl(policy.basics.document) || `https://picsum.photos/seed/${policy.slug}/200/200`,
                href: getMediaUrl(policy.basics.document) || '#',
            },
        ]
        : []

    return (
        <main className="w-full">
            <FeatureSection
                id="policy-content"
                title={policy.name}
                subtitle="Policy Details"
                features={[feature]}
                labels={{
                    specIndex: 'POL',
                    statsLabel: 'INFO',
                    ctaLabel: 'REVIEW',
                }}
                columns={2}
                headerVariant={1}
                footerVariant={1}
            />
            {downloadItems.length > 0 && (
                <GridSection
                    id="policy-download"
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