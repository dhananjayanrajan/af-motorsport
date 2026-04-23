// app/(frontend)/about/hospitalities/[slug]/details/page.tsx
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
    if (hospitality.details?.location) {
        mapLocations.push({
            id: String(hospitality.id),
            name: hospitality.name,
            lat: hospitality.details.location[0],
            lng: hospitality.details.location[1],
            description: hospitality.basics?.tagline || undefined,
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

    const documentItems: any[] = []
    if (hospitality.assets?.documents) {
        hospitality.assets.documents.forEach((doc, idx) => {
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
            {mapLocations.length > 0 && (
                <MapSection
                    id="hospitality-map"
                    title="Location"
                    subtitle="Where to find us"
                    locations={mapLocations}
                    labels={{
                        hqLabel: 'HQ',
                        intelLabel: 'INTEL',
                        routeLabel: 'ROUTE',
                        timeLabel: 'TIME',
                        distLabel: 'DIST',
                        recordLabel: 'VIEW',
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
                    title="What's Included"
                    subtitle="Everything that comes with your experience"
                    items={inclusionItems}
                    labels={{
                        unitsCount: 'ITEMS',
                        viewProject: 'VIEW',
                        sectionIndex: 'INC',
                        fallbackAlt: 'Item',
                    }}
                    columns={3}
                />
            )}
            {exclusionItems.length > 0 && (
                <GridSection
                    id="hospitality-exclusions"
                    title="What's Not Included"
                    subtitle="Please note the following exclusions"
                    items={exclusionItems}
                    labels={{
                        unitsCount: 'ITEMS',
                        viewProject: 'VIEW',
                        sectionIndex: 'EXC',
                        fallbackAlt: 'Item',
                    }}
                    columns={3}
                />
            )}
            {requirementEntries.length > 0 && (
                <ListSection
                    id="hospitality-requirements"
                    title="Requirements"
                    subtitle="What you need to know before booking"
                    entries={requirementEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'REQ',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="hospitality-documents"
                    title="Documents"
                    subtitle="Additional information"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'VIEW',
                        sectionIndex: 'DOC',
                        fallbackAlt: 'Document',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}