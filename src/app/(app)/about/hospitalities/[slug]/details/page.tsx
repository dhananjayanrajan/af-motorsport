import CollapsibleGrid from '@/components/Section/CollapsibleGrid'
import DocumentGrid from '@/components/Section/DocumentGrid'
import ExpandableList from '@/components/Section/ExpandableList'
import MapGrid from '@/components/Section/MapGrid'
import { Hospitality, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getHospitality(slug: string): Promise<Hospitality | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'hospitalities',
        where: {
            slug: {
                equals: slug,
            },
        },
    })
    return docs[0] || null
}

export default async function HospitalityDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const hospitality = await getHospitality(slug)

    if (!hospitality) {
        return notFound()
    }

    const mapLocations = hospitality.details?.location ? [{
        id: `${hospitality.id}-location`,
        title: hospitality.name,
        lat: hospitality.details.location[1],
        lng: hospitality.details.location[0],
        label: hospitality.basics?.tagline || 'Venue Location',
        metadata: [
            { label: 'TYPE', value: hospitality.details?.type?.replace(/_/g, ' ') || 'Hospitality' },
            { label: 'ACCESS', value: hospitality.details?.access?.replace(/_/g, ' ') || 'Public' },
        ]
    }] : []

    const inclusionItems = hospitality.details?.inclusions?.list?.map(item => ({
        id: item.id || `${hospitality.id}-inc-${item.name}`,
        title: item.name || 'Inclusion',
        subtitle: item.description || undefined,
        content: item.description || 'No additional details available',
        label: 'INCLUDED'
    })) || []

    const exclusionItems = hospitality.details?.exclusions?.list?.map(item => ({
        id: item.id || `${hospitality.id}-exc-${item.name}`,
        title: item.name || 'Exclusion',
        subtitle: item.description || undefined,
        content: item.description || 'Not included in this package',
        label: 'EXCLUDED'
    })) || []

    const requirementPanels = hospitality.details?.requirements?.list?.map(req => ({
        id: req.id || `${hospitality.id}-req-${req.name}`,
        title: req.name || 'Requirement',
        label: 'GUEST REQUIREMENT',
        summary: req.description || 'Please review terms',
        content: req.description || 'Standard hospitality terms apply',
        metadata: [
            { label: 'VERIFICATION', value: 'REQUIRED' },
            { label: 'COMPLIANCE', value: 'MANDATORY' },
        ]
    })) || []

    const documents = hospitality.assets?.documents?.filter((doc): doc is Media =>
        typeof doc === 'object' && doc !== null && 'url' in doc
    ).map(doc => ({
        id: doc.id,
        title: doc.filename || 'Document',
        file: doc,
        category: 'Hospitality Document',
        version: '1.0'
    })) || []

    return (
        <main className="w-full">
            {mapLocations.length > 0 && (
                <MapGrid
                    id="HSP_MAP"
                    title="Venue Location"
                    locations={mapLocations}
                    initialCenter={[mapLocations[0].lng, mapLocations[0].lat]}
                    initialZoom={15}
                />
            )}

            {inclusionItems.length > 0 && (
                <CollapsibleGrid
                    id="HSP_INCLUSIONS"
                    title="Inclusions"
                    items={inclusionItems}
                    columns={2}
                />
            )}

            {exclusionItems.length > 0 && (
                <CollapsibleGrid
                    id="HSP_EXCLUSIONS"
                    title="Exclusions"
                    items={exclusionItems}
                    columns={2}
                />
            )}

            {requirementPanels.length > 0 && (
                <ExpandableList
                    id="HSP_REQUIREMENTS"
                    title="Guest Requirements"
                    panels={requirementPanels}
                />
            )}

            {documents.length > 0 && (
                <DocumentGrid
                    id="HSP_DOCS"
                    title="Terms & Documentation"
                    documents={documents}
                />
            )}
        </main>
    )
}