import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import MapSection from '@/components/Section/Blocks/MapSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
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

function resolveAssetUrl(assets: any, ...keys: string[]): string | undefined {
    if (!assets) return undefined
    for (const key of keys) {
        const url = getMediaUrl(assets[key])
        if (url) return url
    }
    return undefined
}

const getInitiativeData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'initiatives',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                    mission: true,
                    tagline: true,
                },
                assets: {
                    cover: true,
                    thumbnail: true,
                    documents: true,
                },
                details: {
                    start_date: true,
                    end_date: true,
                    locations: true,
                    expectations: {
                        list: true,
                    },
                },
                seo: {
                    image: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['initiative-detail'],
    { revalidate: 3600, tags: ['initiative'] }
)

export default async function InitiativePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const initiative = await getInitiativeData(slug)

    if (!initiative) notFound()

    const heroBackgroundImage = resolveAssetUrl(initiative.assets, 'cover') || getMediaUrl(initiative.seo?.image)
    const studyImage = resolveAssetUrl(initiative.assets, 'cover', 'thumbnail')

    const study = {
        id: String(initiative.id),
        title: initiative.name,
        description: initiative.basics?.description || initiative.basics?.mission || '',
        image: studyImage || '',
        metrics: [
            { label: 'START', value: initiative.details?.start_date ? new Date(initiative.details.start_date).toISOString().split('T')[0] : 'TBD' },
            { label: 'END', value: initiative.details?.end_date ? new Date(initiative.details.end_date).toISOString().split('T')[0] : 'ONGOING' },
        ],
    }

    const quoteItem = initiative.basics?.mission
        ? {
            id: String(initiative.id),
            text: initiative.basics.mission,
            author: initiative.name,
        }
        : null

    const mapLocations: any[] = []
    if (initiative.details?.locations && Array.isArray(initiative.details.locations)) {
        mapLocations.push({
            id: String(initiative.id),
            name: initiative.name,
            lat: initiative.details.locations[0],
            lng: initiative.details.locations[1],
            description: initiative.basics?.tagline || undefined,
        })
    }

    const expectationEntries: any[] = []
    if (initiative.details?.expectations?.list) {
        initiative.details.expectations.list.forEach((expectation, idx) => {
            if (expectation.name) {
                expectationEntries.push({
                    id: expectation.id || `exp-${idx}`,
                    title: expectation.name,
                    subtitle: expectation.statement || expectation.criteria || undefined,
                    status: expectation.type || 'ACTIVE',
                })
            }
        })
    }

    const documentItems: any[] = []
    if (initiative.assets?.documents && Array.isArray(initiative.assets.documents)) {
        initiative.assets.documents.forEach((doc, idx) => {
            const url = getMediaUrl(doc)
            if (url) {
                documentItems.push({
                    id: String(typeof doc === 'object' ? doc.id : idx),
                    title: (typeof doc === 'object' && (doc.alt || doc.filename)) || `DOC_${idx + 1}`,
                    subtitle: (typeof doc === 'object' && doc.mimeType) || 'APPLICATION/PDF',
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="initiative-cover"
                title={initiative.name}
                subtitle={initiative.basics?.tagline || 'STRATEGIC INITIATIVE'}
                description={initiative.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
            />
            <StudySection
                id="initiative-details"
                title="SPECIFICATIONS"
                subtitle="Technical overview and developmental parameters"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {quoteItem && (
                <QuoteSection
                    id="initiative-quote"
                    title="MISSION"
                    subtitle="Primary objectives"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'SYS',
                        ratingLabel: 'RANK',
                    }}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="initiative-map"
                    title="DEPLOYMENT"
                    subtitle="Geospatial operational coordinates"
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
                    zoom={12}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {expectationEntries.length > 0 && (
                <ListSection
                    id="initiative-expectations"
                    title="KPI"
                    subtitle="Targeted performance indicators"
                    entries={expectationEntries}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'SYNC',
                        indexPrefix: 'EXP',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="initiative-documents"
                    title="ARCHIVE"
                    subtitle="Technical resources and documentation"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'FETCH',
                        sectionIndex: 'DAT',
                        fallbackAlt: 'File',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}