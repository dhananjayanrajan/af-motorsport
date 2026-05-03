// app/(frontend)/organizations/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MarqueeSection from '@/components/Section/Blocks/MarqueeSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
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

const getOrganizationsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'organizations',
            limit: 36,
            depth: 1,
            sort: '-createdAt',
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
                    prestige: true,
                    websites: true,
                },
                assets: {
                    logo: true,
                    alt_logo: true,
                },
            },
        })
        return result.docs
    },
    ['organizations-page-data'],
    { revalidate: 300, tags: ['organizations'] }
)

export default async function OrganizationsPage() {
    const organizations = await getOrganizationsData()

    const logoItems = organizations
        .filter((o) => o.assets?.logo)
        .map((o) => ({
            id: String(o.id),
            name: o.name,
            logo: getMediaUrl(o.assets?.logo) ?? '',
            description: nullToUndefined(o.basics?.tagline) ?? nullToUndefined(o.basics?.description) ?? undefined,
            website: nullToUndefined(o.details?.websites?.list?.[0]?.path) ?? undefined,
            location: nullToUndefined(o.basics?.industry) ?? undefined,
            category: nullToUndefined(o.basics?.type) ?? undefined,
            slug: `${o.slug}`,
        }))

    const gridItems = organizations.map((o) => ({
        id: String(o.id),
        title: o.name,
        subtitle:
            nullToUndefined(o.basics?.tagline) ??
            nullToUndefined(o.basics?.type) ??
            nullToUndefined(o.basics?.industry) ??
            '',
        image: getMediaUrl(o.assets?.logo) ?? getMediaUrl(o.assets?.alt_logo),
        href: `/organizations/${o.slug}`,
        category:
            nullToUndefined(o.basics?.identifiers?.code) ??
            nullToUndefined(o.basics?.type) ??
            undefined,
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="organizations-hero"
                title="ORGANIZATIONS"
                subtitle="Partners, Sponsors & Manufacturers"
                description="Every external organization connected to the ecosystem — from title sponsors to tyre suppliers."
                badge="NETWORK"
                meta="ORG_IDX"
            />
            {logoItems.length > 0 && (
                <MarqueeSection
                    id="organizations-logos"
                    title="PARTNER WALL"
                    subtitle="Logo cloud"
                    items={logoItems}
                />
            )}
            {gridItems.length > 0 && (
                <GridSection
                    id="organizations-all"
                    title="ALL ORGANIZATIONS"
                    subtitle="Complete directory"
                    items={gridItems}
                    labels={{
                        unitsCount: 'ORGS',
                        viewProject: 'PROFILE',
                        sectionIndex: 'DIRECTORY',
                        fallbackAlt: 'Organization',
                    }}
                    columns={4}
                />
            )}
        </main>
    )
}