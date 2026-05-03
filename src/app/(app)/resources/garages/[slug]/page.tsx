// app/(app)/resources/garages/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'
import { Media, Organization } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getGarageData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'garages',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { identifiers: { code: true } },
                details: { type: true, size_sq_m: true, capacity: true, accessibility: true, ownership: true, operators: true },
                assets: { thumbnail: true, cover: true, gallery: true },
            },
        })
        return result.docs[0] || null
    },
    ['garage-profile'],
    { revalidate: 3600, tags: ['garage'] }
)

export default async function GaragePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const garage = await getGarageData(slug)

    if (!garage) notFound()

    const heroBackgroundImage = getMediaUrl(garage.assets?.thumbnail) || getMediaUrl(garage.assets?.cover)

    const featureData = [{
        id: String(garage.id),
        title: garage.name,
        description: garage.details?.type || '',
        image: getMediaUrl(garage.assets?.cover) || getMediaUrl(garage.assets?.thumbnail) || `https://picsum.photos/seed/${garage.slug}/800/600`,
        slug: `resources/garages/${garage.slug}/details`,
        stats: [
            { label: 'Code', value: garage.basics?.identifiers?.code || 'N/A' },
        ],
    }]

    const infoCards = [
        { id: 'size', label: 'Size (sq m)', value: garage.details?.size_sq_m ? `${garage.details.size_sq_m}` : 'N/A', emphasis: 'high' as const },
        { id: 'capacity', label: 'Capacity', value: garage.details?.capacity ? `${garage.details.capacity}` : 'N/A', emphasis: 'medium' as const },
        { id: 'accessibility', label: 'Accessibility', value: garage.details?.accessibility || 'N/A', emphasis: 'medium' as const },
        { id: 'type', label: 'Type', value: garage.details?.type || 'N/A', emphasis: 'low' as const },
    ]

    const galleryItems: any[] = []
    if (garage.assets?.gallery) {
        const gallery = Array.isArray(garage.assets.gallery) ? garage.assets.gallery : []
        gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: `gal-${media.id}`,
                    title: media.alt || garage.name,
                    image: url,
                    category: `IMG_${String(idx + 1).padStart(2, '0')}`,
                    description: undefined,
                })
            }
        })
    }

    const panelData: any[] = []
    const ownershipOrg = garage.details?.ownership as Organization | null
    if (ownershipOrg && typeof ownershipOrg === 'object' && 'name' in ownershipOrg) {
        panelData.push({
            id: `owner-${ownershipOrg.id}`,
            title: ownershipOrg.name,
            summary: 'Owner',
            content: ownershipOrg.basics?.description || '',
            metadata: { type: ownershipOrg.basics?.type || 'N/A' },
        })
    }
    if (garage.details?.operators) {
        garage.details.operators.forEach((orgRef) => {
            const org = orgRef as Organization
            if (org && typeof org === 'object' && 'name' in org) {
                panelData.push({
                    id: `operator-${org.id}`,
                    title: org.name,
                    summary: 'Operator',
                    content: org.basics?.description || '',
                    metadata: { type: org.basics?.type || 'N/A' },
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="garage-hero"
                title={garage.name}
                subtitle={garage.basics?.identifiers?.code || ''}
                description={garage.details?.type || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                badge="FACILITY"
                meta={garage.details?.type || undefined}
                actions={[{ label: 'FULL DETAILS', href: `/resources/garages/${garage.slug}/details`, variant: 'primary' }]}
            />
            <FeatureSection
                id="garage-feature"
                title="Overview"
                subtitle="Facility details"
                features={featureData}
                labels={{ specIndex: 'GAR', statsLabel: 'INFO', ctaLabel: 'VIEW FULL DETAILS' }}
                ctaPath={`/resources/garages/${garage.slug}/details`}
                headerVariant={2}
                footerVariant={1}
            />
            {infoCards.length > 0 && (
                <InfoSection id="garage-stats" title="Quick Stats" subtitle="Facility metrics" cards={infoCards} columns={4} headerVariant={1} footerVariant={1} />
            )}
            {galleryItems.length > 0 && (
                <GallerySection id="garage-gallery" title="Gallery" subtitle="Interior and exterior media" items={galleryItems} columns={3} headerVariant={1} footerVariant={1} />
            )}
            {panelData.length > 0 && (
                <PanelSection id="garage-ownership" title="Ownership & Operations" subtitle="Management details" panels={panelData} labels={{ expansionState: { open: 'ACTIVE', closed: 'CLOSED' }, metadataTitle: 'DETAILS' }} headerVariant={1} footerVariant={1} />
            )}
        </main>
    )
}