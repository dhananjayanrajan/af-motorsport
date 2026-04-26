import ListSection from '@/components/Section/Blocks/ListSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getLegalData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })

        const [policies, regulations] = await Promise.all([
            payload.find({
                collection: 'policies',
                limit: 50,
                sort: '-basics.effective_date',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        description: true,
                        version: true,
                        effective_date: true,
                    },
                },
            }),
            payload.find({
                collection: 'regulations',
                limit: 50,
                sort: '-createdAt',
                depth: 1,
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: {
                        description: true,
                        status: true,
                        type: true,
                    },
                },
            }),
        ])

        return {
            policies: policies.docs,
            regulations: regulations.docs,
        }
    },
    ['legal-page-data'],
    { revalidate: 3600, tags: ['legal'] }
)

export default async function LegalPage() {
    const { policies, regulations } = await getLegalData()

    const policyEntries = policies.map((policy: any) => ({
        id: String(policy.id),
        title: policy.name.toUpperCase(),
        subtitle: policy.basics?.description || 'Official framework documentation',
        status: (policy.basics?.version || '1.0.0').toUpperCase(),
        tag: policy.basics?.effective_date ? new Date(policy.basics.effective_date).toISOString().split('T')[0] : 'PENDING',
        href: `/legal/policies/${policy.slug}`,
        timestamp: policy.basics?.effective_date || undefined,
    }))

    const regulationEntries = regulations.map((regulation: any) => ({
        id: String(regulation.id),
        title: regulation.name.toUpperCase(),
        subtitle: regulation.basics?.description || 'Governing sporting and technical directives',
        status: (regulation.basics?.status || 'Active').toUpperCase(),
        tag: (regulation.basics?.type || 'Technical').toUpperCase(),
        href: `/legal/regulations/${regulation.slug}`,
        timestamp: undefined,
    }))

    return (
        <main className="w-full bg-black-pure">
            {policyEntries.length > 0 && (
                <ListSection
                    id="legal-policies"
                    title="Corporate Policies"
                    subtitle="Legal framework and operational terms of service"
                    entries={policyEntries}
                    labels={{
                        statusPrefix: 'Version',
                        timePrefix: 'Effective',
                        indexPrefix: 'Policy',
                    }}
                    showStatus={true}
                    showTimestamp={true}
                />
            )}
            {regulationEntries.length > 0 && (
                <ListSection
                    id="legal-regulations"
                    title="Sporting Regulations"
                    subtitle="Technical directives and competitive governing rules"
                    entries={regulationEntries}
                    labels={{
                        statusPrefix: 'State',
                        timePrefix: 'Updated',
                        indexPrefix: 'Article',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
        </main>
    )
}