// app/(frontend)/organizations/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import StudySection from '@/components/Section/Blocks/StudySection'
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

function nullToUndefined<T>(value: T | null | undefined): T | undefined {
    if (value === null) return undefined
    return value
}

function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return ''
    try {
        return new Date(dateStr).getFullYear().toString()
    } catch {
        return ''
    }
}

const getOrganizationBySlug = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'organizations',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    identifiers: { code: true },
                    tagline: true,
                    description: true,
                    type: true,
                    industry: true,
                },
                details: {
                    founded: true,
                    merged: true,
                    rebranded: true,
                    defunct: true,
                    prestige: true,
                    impact: true,
                    benefits: true,
                    websites: true,
                    socials: true,
                },
                assets: {
                    logo: true,
                    alt_logo: true,
                },
                seo: {
                    description: true,
                    image: true,
                },
            },
        })
        return result.docs[0] ?? null
    },
    ['organization-by-slug'],
    { revalidate: 120, tags: ['organizations'] }
)

export default async function OrganizationPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const org = await getOrganizationBySlug(slug)

    if (!org) notFound()

    const logoUrl = getMediaUrl(org.assets?.logo) ?? getMediaUrl(org.assets?.alt_logo)

    const studyMetrics: { label: string; value: string }[] = []
    const typeVal = nullToUndefined(org.basics?.type)
    if (typeVal) studyMetrics.push({ label: 'Type', value: typeVal })
    const industryVal = nullToUndefined(org.basics?.industry)
    if (industryVal) studyMetrics.push({ label: 'Industry', value: industryVal })
    const prestigeVal = nullToUndefined(org.details?.prestige)
    if (prestigeVal) studyMetrics.push({ label: 'Prestige', value: prestigeVal })

    const studyTags: string[] = []
    if (typeVal) studyTags.push(typeVal)
    const impactVal = nullToUndefined(org.details?.impact)
    if (impactVal) studyTags.push(impactVal)

    const study = {
        id: String(org.id),
        title: org.name,
        description: nullToUndefined(org.basics?.description) ?? nullToUndefined(org.basics?.tagline) ?? '',
        image: logoUrl ?? `https://picsum.photos/seed/${org.id}/800/1000`,
        metrics: studyMetrics,
        tags: studyTags,
        ctaLabel: 'BACK TO DIRECTORY',
        ctaHref: '/organizations',
    }

    const timelineFeatures: {
        id: string
        title: string
        description: string
        image?: string
        slug?: string
        stats: { label: string; value: string }[]
    }[] = []

    const foundedDate = formatDate(org.details?.founded)
    if (foundedDate) {
        timelineFeatures.push({
            id: 'founded',
            title: 'FOUNDED',
            description: foundedDate,
            stats: [{ label: 'Year', value: foundedDate }],
        })
    }

    const mergedVal = nullToUndefined(org.details?.merged)
    if (mergedVal) {
        timelineFeatures.push({
            id: 'merged',
            title: 'MERGED',
            description: mergedVal,
            stats: [{ label: 'Event', value: 'Merger' }],
        })
    }

    const rebrandedVal = nullToUndefined(org.details?.rebranded)
    if (rebrandedVal) {
        timelineFeatures.push({
            id: 'rebranded',
            title: 'REBRANDED',
            description: rebrandedVal,
            stats: [{ label: 'Event', value: 'Rebrand' }],
        })
    }

    const defunctVal = nullToUndefined(org.details?.defunct)
    if (defunctVal) {
        timelineFeatures.push({
            id: 'defunct',
            title: 'DEFUNCT',
            description: defunctVal,
            stats: [{ label: 'Status', value: 'Defunct' }],
        })
    }

    const websites =
        org.details?.websites?.list
            ?.filter((w) => w.name && w.path)
            .map((w) => ({
                id: w.id ?? w.name ?? '',
                title: nullToUndefined(w.name) ?? '',
                subtitle: nullToUndefined(w.path) ?? '',
                href: nullToUndefined(w.path) ?? undefined,
                category: nullToUndefined(w.description) ?? undefined,
            })) ?? []

    const heroDescription = nullToUndefined(org.seo?.description)
        ?? nullToUndefined(org.basics?.tagline)
        ?? undefined

    const heroImage = getMediaUrl(org.seo?.image) ?? logoUrl

    return (
        <main className="w-full">
            <HeroSection
                id="organization-hero"
                title={org.name}
                subtitle={nullToUndefined(org.basics?.type) ?? 'Organization'}
                description={heroDescription}
                backgroundImage={heroImage}
                badge="ORGANIZATION"
                meta={nullToUndefined(org.slug) ?? undefined}
            />
            <StudySection
                id="organization-details"
                title="ORGANIZATION DETAILS"
                subtitle="Profile and history"
                studies={[study]}
                headerVariant={1}
                footerVariant={1}
            />
            {timelineFeatures.length > 0 && (
                <FeatureSection
                    id="organization-timeline"
                    title="CORPORATE TIMELINE"
                    subtitle="Key dates and events"
                    features={timelineFeatures}
                    labels={{
                        specIndex: 'EVENT',
                        statsLabel: 'DATA',
                        ctaLabel: 'DETAILS',
                    }}
                    columns={timelineFeatures.length > 2 ? 3 : timelineFeatures.length as 2 | 3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {websites.length > 0 && (
                <GridSection
                    id="organization-websites"
                    title="DIGITAL PRESENCE"
                    subtitle="Websites and platforms"
                    items={websites}
                    labels={{
                        unitsCount: 'LINKS',
                        viewProject: 'VISIT',
                        sectionIndex: 'WEB',
                        fallbackAlt: 'Website',
                    }}
                    columns={2}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}