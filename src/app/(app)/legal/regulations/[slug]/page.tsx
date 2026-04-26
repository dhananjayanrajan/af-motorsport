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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    status: true,
                    type: true,
                    version: true,
                    effective_date: true,
                    document: true,
                },
            },
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
        title: regulation.name.toUpperCase(),
        description: regulation.basics?.description || 'Governing sporting and technical directives defining the parameters of competition.',
        image: getMediaUrl(regulation.basics?.document) || '',
        stats: [
            { label: 'Current Status', value: (regulation.basics?.status || 'Active').toUpperCase() },
            { label: 'Regulatory Type', value: (regulation.basics?.type || 'Standard').toUpperCase() },
            { label: 'Revision ID', value: (regulation.basics?.version || '1.0.0').toUpperCase() },
            { label: 'Effective Cycle', value: regulation.basics?.effective_date ? new Date(regulation.basics.effective_date).toISOString().split('T')[0] : 'TBD' },
        ],
    }

    const downloadItems = []
    const docUrl = getMediaUrl(regulation.basics?.document)

    if (docUrl) {
        downloadItems.push({
            id: String(regulation.id),
            title: 'Official Directive',
            subtitle: regulation.basics?.version ? `Revision ${regulation.basics.version}` : 'Current Revision',
            image: docUrl,
            href: docUrl,
        })
    }

    return (
        <main className="w-full bg-black-pure">
            <FeatureSection
                id="regulation-summary"
                title="Technical Directive"
                subtitle="Regulatory framework and sporting guidelines"
                features={[feature]}
                labels={{
                    specIndex: 'Article',
                    statsLabel: 'Protocol',
                    ctaLabel: 'Examine',
                }}
                columns={2}
                headerVariant={1}
                footerVariant={1}
            />
            {downloadItems.length > 0 && (
                <GridSection
                    id="regulation-assets"
                    title="Documentation"
                    subtitle="Downloadable technical assets"
                    items={downloadItems}
                    labels={{
                        unitsCount: 'Files',
                        viewProject: 'Download',
                        sectionIndex: 'Entry',
                        fallbackAlt: 'Directive',
                    }}
                    columns={1}
                />
            )}
        </main>
    )
}