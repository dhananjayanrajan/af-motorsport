// app/(frontend)/resources/garages/[slug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
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

const getGarageDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'garages',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['garage-details'],
    { revalidate: 3600, tags: ['garage-details'] }
)

export default async function GarageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const garage = await getGarageDetailsData(slug)

    if (!garage) notFound()

    const heroBackgroundImage = garage.assets?.cover
        ? getMediaUrl(garage.assets.cover)
        : garage.seo?.image
            ? getMediaUrl(garage.seo.image)
            : undefined

    const amenityItems: any[] = []
    if (garage.details?.amenities?.list) {
        garage.details.amenities.list.forEach((amenity) => {
            if (amenity.name) {
                amenityItems.push({
                    id: amenity.id || String(Math.random()),
                    title: amenity.name,
                    subtitle: amenity.description || undefined,
                })
            }
        })
    }

    const operatorEntries: any[] = []
    if (garage.details?.operators) {
        garage.details.operators.forEach((operatorRef) => {
            const operator = operatorRef as Organization
            if (operator && typeof operator === 'object' && 'name' in operator) {
                operatorEntries.push({
                    id: String(operator.id),
                    title: operator.name,
                    subtitle: operator.basics?.type || operator.basics?.industry || undefined,
                    href: `/organizations/${operator.slug}`,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (garage.assets?.documents) {
        garage.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                documentItems.push({
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    subtitle: media.mimeType || undefined,
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="garage-details-cover"
                title={garage.name}
                subtitle="Garage Details"
                description={garage.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={garage.details?.type || undefined}
            />
            {amenityItems.length > 0 && (
                <GridSection
                    id="garage-amenities"
                    title="Amenities"
                    subtitle="Facility features"
                    items={amenityItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {operatorEntries.length > 0 && (
                <ListSection
                    id="garage-operators"
                    title="Operators"
                    subtitle="Facility management"
                    entries={operatorEntries}
                    variant="detailed"
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="garage-documents"
                    title="Documents"
                    subtitle="Facility documentation"
                    items={documentItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}