// app/(frontend)/legal/page.tsx
import ListSection from '@/components/Section/Blocks/ListSection'
import { Media, Policy, Regulation } from '@/payload-types'
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
                sort: '-createdAt',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { description: true, version: true, effective_date: true },
                },
            }),
            payload.find({
                collection: 'regulations',
                limit: 50,
                sort: '-createdAt',
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    basics: { description: true, status: true, type: true },
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

    const policyEntries = policies.map((policy: Policy) => ({
        id: String(policy.id),
        title: policy.name,
        subtitle: policy.basics?.description || '',
        status: policy.basics?.version || '',
        tag: policy.basics?.effective_date ? new Date(policy.basics.effective_date).toLocaleDateString() : undefined,
        href: `/legal/policies/${policy.slug}`,
        timestamp: policy.basics?.effective_date || undefined,
    }))

    const regulationEntries = regulations.map((regulation: Regulation) => ({
        id: String(regulation.id),
        title: regulation.name,
        subtitle: regulation.basics?.description || '',
        status: regulation.basics?.status || '',
        tag: regulation.basics?.type || '',
        href: `/legal/regulations/${regulation.slug}`,
        timestamp: undefined,
    }))

    return (
        <main className="w-full">
            {policyEntries.length > 0 && (
                <ListSection
                    id="legal-policies"
                    title="Policies"
                    subtitle="Our legal policies and terms"
                    entries={policyEntries}
                    variant="detailed"
                    showStatus
                    showTimestamp
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {regulationEntries.length > 0 && (
                <ListSection
                    id="legal-regulations"
                    title="Regulations"
                    subtitle="Sporting and technical regulations"
                    entries={regulationEntries}
                    variant="detailed"
                    showStatus
                    showTimestamp={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}