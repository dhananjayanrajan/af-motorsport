// app/(frontend)/about/hospitalities/[slug]/details/page.tsx
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import GridSection from '@/components/Section/Blocks/GridSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MapSection from '@/components/Section/Blocks/MapSection'
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

const getHospitalityDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'hospitalities',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                },
                assets: {
                    documents: true,
                },
                details: {
                    location: true,
                    inclusions: {
                        list: true,
                    },
                    exclusions: {
                        list: true,
                    },
                    requirements: {
                        list: true,
                    },
                },
            },
        })
        return result.docs[0] || null
    },
    ['hospitality-details'],
    { revalidate: 3600, tags: ['hospitality-details'] }
)

export default async function HospitalityDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const hospitality = await getHospitalityDetailsData(slug)

    if (!hospitality) notFound()

    const mapLocations: any[] = []
    if (hospitality.details?.location && Array.isArray(hospitality.details.location)) {
        mapLocations.push({
            id: String(hospitality.id),
            name: hospitality.name,
            lat: hospitality.details.location[0],
            lng: hospitality.details.location[1],
            description: hospitality.basics?.tagline || undefined,
            slug: `about/hospitalities/${slug}`,
        })
    }

    const inclusionItems: any[] = []
    if (hospitality.details?.inclusions?.list) {
        hospitality.details.inclusions.list.forEach((item) => {
            if (item.name) {
                inclusionItems.push({
                    id: item.id || String(Math.random()),
                    title: item.name,
                    subtitle: item.description || undefined,
                })
            }
        })
    }

    const exclusionItems: any[] = []
    if (hospitality.details?.exclusions?.list) {
        hospitality.details.exclusions.list.forEach((item) => {
            if (item.name) {
                exclusionItems.push({
                    id: item.id || String(Math.random()),
                    title: item.name,
                    subtitle: item.description || undefined,
                })
            }
        })
    }

    const requirementEntries: any[] = []
    if (hospitality.details?.requirements?.list) {
        hospitality.details.requirements.list.forEach((item) => {
            if (item.name) {
                requirementEntries.push({
                    id: item.id || String(Math.random()),
                    title: item.name,
                    subtitle: item.description || undefined,
                })
            }
        })
    }

    return (
        <main className="w-full">
            {mapLocations.length > 0 && (
                <MapSection
                    id="hospitality-map"
                    title="DEPLOYMENT"
                    subtitle="Geospatial coordinates for onsite access"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'BASE',
                        intelLabel: 'INTEL',
                        routeLabel: 'PATH',
                        timeLabel: 'ETA',
                        distLabel: 'RAD',
                        recordLabel: 'LOG',
                        filterLabels: {
                            all: 'ALL',
                            primary: 'PRIMARY',
                            satellite: 'SATELLITE',
                            pathing: 'ROUTES',
                        },
                    }}
                    zoom={14}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {inclusionItems.length > 0 && (
                <GridSection
                    id="hospitality-inclusions"
                    title="INCLUSIONS"
                    subtitle="Standard operational components included"
                    items={inclusionItems}
                    labels={{
                        unitsCount: 'ITEMS',
                        viewProject: 'INFO',
                        sectionIndex: 'INC',
                        fallbackAlt: 'Inclusion',
                    }}
                    columns={3}
                />
            )}
            {exclusionItems.length > 0 && (
                <GridSection
                    id="hospitality-exclusions"
                    title="EXCLUSIONS"
                    subtitle="Non-standard and optional parameters"
                    items={exclusionItems}
                    labels={{
                        unitsCount: 'ITEMS',
                        viewProject: 'INFO',
                        sectionIndex: 'EXC',
                        fallbackAlt: 'Exclusion',
                    }}
                    columns={3}
                />
            )}
            {requirementEntries.length > 0 && (
                <ListSection
                    id="hospitality-requirements"
                    title="CRITERIA"
                    subtitle="Prerequisite specifications for entry"
                    entries={requirementEntries}
                    labels={{
                        statusPrefix: 'REQD',
                        timePrefix: 'SYNC',
                        indexPrefix: 'CRIT',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            <DocumentsSection
                id="hospitality-documents"
                title="DOCUMENTS"
                subtitle="Technical documentation and media assets"
                documents={hospitality.assets?.documents}
                referenceCode={hospitality.slug || 'HSP'}
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}