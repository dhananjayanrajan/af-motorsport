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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    version: true,
                    effective_date: true,
                    last_reviewed: true,
                    document: true,
                },
            },
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
        title: policy.name.toUpperCase(),
        description: policy.basics?.description || 'Official corporate policy and procedural documentation.',
        image: getMediaUrl(policy.basics?.document) || '',
        stats: [
            { label: 'Release Version', value: (policy.basics?.version || '1.0.0').toUpperCase() },
            { label: 'Effective Cycle', value: policy.basics?.effective_date ? new Date(policy.basics.effective_date).toISOString().split('T')[0] : 'TBD' },
            { label: 'Validation Date', value: policy.basics?.last_reviewed ? new Date(policy.basics.last_reviewed).toISOString().split('T')[0] : 'TBD' },
        ],
    }

    const downloadItems = []
    const docUrl = getMediaUrl(policy.basics?.document)

    if (docUrl) {
        downloadItems.push({
            id: String(policy.id),
            title: 'Official Documentation',
            subtitle: policy.basics?.version ? `Revision ${policy.basics.version}` : 'Current Revision',
            image: docUrl,
            href: docUrl,
        })
    }

    return (
        <main className="w-full bg-black-pure">
            <FeatureSection
                id="policy-summary"
                title="Policy Framework"
                subtitle="Governing directives and procedural guidelines"
                features={[feature]}
                labels={{
                    specIndex: 'Index',
                    statsLabel: 'Protocol',
                    ctaLabel: 'Execute',
                }}
                columns={2}
                headerVariant={1}
                footerVariant={1}
            />
            {downloadItems.length > 0 && (
                <GridSection
                    id="policy-assets"
                    title="Documentation"
                    subtitle="Downloadable regulatory assets"
                    items={downloadItems}
                    labels={{
                        unitsCount: 'Files',
                        viewProject: 'Download',
                        sectionIndex: 'Asset',
                        fallbackAlt: 'Document',
                    }}
                    columns={1}
                />
            )}
        </main>
    )
}