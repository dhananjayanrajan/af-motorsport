// app/(frontend)/about/statements/[slug]/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
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

function resolveName(obj: any): string {
    if (!obj) return ''
    if (typeof obj === 'object' && 'name' in obj) return obj.name
    return ''
}

function richTextToPlainText(richText: any): string {
    if (!richText?.root?.children) return ''
    const parts: string[] = []
    for (const child of richText.root.children) {
        if (child?.children) {
            for (const c of child.children) {
                if (c?.text) parts.push(c.text)
            }
        }
    }
    return parts.join(' ').trim()
}

const getStatementBySlug = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'statements',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    status: true,
                    statement: true,
                    issued_date: true,
                    authority: true,
                },
                seo: {
                    description: true,
                    image: true,
                },
            },
        })
        return result.docs[0] ?? null
    },
    ['statement-by-slug'],
    { revalidate: 120, tags: ['statements'] }
)

export default async function StatementPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const statement = await getStatementBySlug(slug)

    if (!statement) notFound()

    const authorityName = resolveName(statement.basics?.authority)
    const plainTextStatement = richTextToPlainText(statement.basics?.statement)

    const quotes = plainTextStatement
        ? [
            {
                id: String(statement.id),
                text: plainTextStatement,
                author: authorityName || statement.name,
                role: statement.basics?.status || undefined,
                company: undefined,
                avatar: undefined,
                rating: 5,
            },
        ]
        : []

    const panels = statement.basics?.description
        ? [
            {
                id: 'description',
                title: 'DESCRIPTION',
                summary: statement.basics.description.slice(0, 100),
                content: <p className="whitespace-pre-wrap">{statement.basics.description}</p>,
                metadata: {
                    Status: statement.basics?.status || 'Unknown',
                    Issued: statement.basics?.issued_date || 'N/A',
                    Authority: authorityName || 'N/A',
                    Reference: statement.slug || 'N/A',
                },
            },
        ]
        : []

    return (
        <main className="w-full">
            <HeroSection
                id="statement-hero"
                title={statement.name}
                subtitle={statement.basics?.status || 'Statement'}
                description={statement.seo?.description || statement.basics?.description || undefined}
                backgroundImage={getMediaUrl(statement.seo?.image)}
                badge="STATEMENT"
                meta={statement.slug || undefined}
            />
            {quotes.length > 0 && (
                <QuoteSection
                    id="statement-content"
                    title="STATEMENT"
                    subtitle={authorityName || 'Official communication'}
                    quotes={quotes}
                    labels={{
                        commStatus: statement.basics?.status || 'Published',
                        ratingLabel: 'OFFICIAL',
                    }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {panels.length > 0 && (
                <PanelSection
                    id="statement-metadata"
                    title="DETAILS"
                    subtitle="Statement information"
                    panels={panels}
                    labels={{
                        expansionState: { open: 'EXPANDED', closed: 'COLLAPSED' },
                        metadataTitle: 'METADATA',
                    }}
                    ctaLabel="BACK TO STATEMENTS"
                    ctaPath="/about/statements"
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}