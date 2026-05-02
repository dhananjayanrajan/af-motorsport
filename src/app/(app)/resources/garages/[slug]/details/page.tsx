// app/(frontend)/resources/garages/[slug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                },
                assets: {
                    cover: true,
                    documents: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    type: true,
                    operators: true,
                    amenities: {
                        list: true,
                    },
                },
            },
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

    const heroBackgroundImage = getMediaUrl(garage.assets?.cover) || getMediaUrl(garage.seo?.image)

    const amenityItems = (garage.details?.amenities?.list || [])
        .filter((amenity) => amenity.name)
        .map((amenity, idx) => ({
            id: amenity.id || String(idx),
            title: amenity.name || '',
            subtitle: amenity.description || undefined,
        }))

    const operatorEntries = (garage.details?.operators || [])
        .filter((op): op is Organization => typeof op === 'object' && op !== null && 'name' in op)
        .map((op) => ({
            id: String(op.id),
            title: op.name || '',
            subtitle: op.basics?.type || op.basics?.industry || undefined,
            href: `/organizations/${op.slug}`,
        }))

    return (
        <main className="w-full">
            <HeroSection
                id="garage-details-cover"
                title={garage.name || ''}
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
                    labels={{
                        unitsCount: 'AMEN',
                        viewProject: 'VIEW',
                        sectionIndex: 'AMN',
                        fallbackAlt: 'Amenity',
                    }}
                    columns={3}
                />
            )}
            {operatorEntries.length > 0 && (
                <ListSection
                    id="garage-operators"
                    title="Operators"
                    subtitle="Facility management"
                    entries={operatorEntries}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'TIME',
                        indexPrefix: 'OPR',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            <DocumentsSection
                id="garage-documents"
                title="Documents"
                subtitle="Facility documentation"
                documents={garage.assets?.documents}
                referenceCode={garage.slug || 'GAR'}
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}