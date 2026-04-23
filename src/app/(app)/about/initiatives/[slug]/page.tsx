// app/(frontend)/about/initiatives/[slug]/page.tsx
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

const getInitiativeData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'initiatives',
            where: { slug: { equals: slug } },
            limit: 1,
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

    const heroBackgroundImage = initiative.assets?.cover
        ? getMediaUrl(initiative.assets.cover)
        : initiative.seo?.image
            ? getMediaUrl(initiative.seo.image)
            : undefined

    const studyImage = initiative.assets?.cover
        ? getMediaUrl(initiative.assets.cover)
        : initiative.assets?.thumbnail
            ? getMediaUrl(initiative.assets.thumbnail)
            : undefined

    const study = {
        id: String(initiative.id),
        title: initiative.name,
        description: initiative.basics?.description || initiative.basics?.mission || '',
        image: studyImage || `https://picsum.photos/seed/${initiative.slug}/800/600`,
        metrics: [
            { label: 'Start Date', value: initiative.details?.start_date ? new Date(initiative.details.start_date).toLocaleDateString() : 'TBD' },
            { label: 'End Date', value: initiative.details?.end_date ? new Date(initiative.details.end_date).toLocaleDateString() : 'Ongoing' },
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
    if (initiative.details?.locations) {
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
                    status: expectation.type || undefined,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (initiative.assets?.documents) {
        initiative.assets.documents.forEach((doc, idx) => {
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
                id="initiative-cover"
                title={initiative.name}
                subtitle={initiative.basics?.tagline || ''}
                description={initiative.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
            />
            <StudySection
                id="initiative-details"
                title="Overview"
                subtitle="About this initiative"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {quoteItem && (
                <QuoteSection
                    id="initiative-quote"
                    title="Mission"
                    subtitle="Our purpose"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'COMM',
                        ratingLabel: 'RATING',
                    }}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {mapLocations.length > 0 && (
                <MapSection
                    id="initiative-map"
                    title="Location"
                    subtitle="Where this takes place"
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
                    zoom={12}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {expectationEntries.length > 0 && (
                <ListSection
                    id="initiative-expectations"
                    title="Expectations"
                    subtitle="What we aim to achieve"
                    entries={expectationEntries}
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'TIME',
                        indexPrefix: 'EXP',
                    }}
                    showStatus={true}
                    showTimestamp={false}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="initiative-documents"
                    title="Documents"
                    subtitle="Resources and materials"
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