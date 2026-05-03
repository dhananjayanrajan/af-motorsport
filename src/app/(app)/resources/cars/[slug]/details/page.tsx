// app/(app)/resources/cars/[slug]/details/page.tsx
import CoverSection from '@/components/Section/Blocks/CoverSection'
import DocumentsSection from '@/components/Section/Blocks/DocumentsSection'
import ExpandSection from '@/components/Section/Blocks/ExpandSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import TableSection from '@/components/Section/Blocks/TableSection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
import { Media, Member } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getCarDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'cars',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                alias: true,
                slug: true,
                basics: { identifiers: true },
                details: {
                    status: true,
                    technicalCategories: true,
                    history: true,
                    specifications: { list: true },
                    classifications: { list: true },
                    members: true,
                },
                assets: { cover: true, documents: true, video: true },
            },
        })
        return result.docs[0] || null
    },
    ['car-details-full'],
    { revalidate: 3600, tags: ['car-details'] }
)

export default async function CarDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const car = await getCarDetailsData(slug)

    if (!car) notFound()

    const members = (car.details?.members || [])
        .map((ref) => (typeof ref === 'object' ? ref : null))
        .filter((m): m is Member => m !== null && 'first_name' in m)

    const coverImage = getMediaUrl(car.assets?.cover) || `https://picsum.photos/seed/${car.slug}/1920/1080`

    const infoCards = [
        { id: 'status', label: 'Status', value: car.details?.status || 'N/A', emphasis: 'high' as const },
        { id: 'category', label: 'Category', value: car.details?.technicalCategories || 'N/A', emphasis: 'medium' as const },
        { id: 'chassis', label: 'Chassis', value: car.basics?.identifiers?.chassis || 'N/A', emphasis: 'medium' as const },
        { id: 'model', label: 'Model', value: car.basics?.identifiers?.model || 'N/A', emphasis: 'low' as const },
    ]

    const studyData = car.details?.history
        ? [{ id: String(car.id), title: car.name, description: '', image: getMediaUrl(car.assets?.cover) || `https://picsum.photos/seed/${car.slug}/800/600`, metrics: [] }]
        : []

    const tableColumns = [
        { key: 'parameter', label: 'Parameter', sortable: true, width: undefined },
        { key: 'value', label: 'Value', sortable: true, width: undefined },
        { key: 'description', label: 'Description', sortable: false, width: undefined },
    ]

    const tableRows = (car.details?.specifications?.list || []).map((spec) => ({
        id: spec.id || `spec-${Math.random()}`,
        cells: {
            parameter: spec.parameter || 'N/A',
            value: spec.value || 'N/A',
            description: spec.description || 'N/A',
        },
    }))

    const classificationExpandItems = (car.details?.classifications?.list || []).map((cls, idx) => ({
        id: cls.id || `cls-${idx}`,
        title: cls.name || 'Classification',
        description: cls.definition || cls.description || '',
        image: `https://picsum.photos/seed/${car.slug}-cls-${idx}/800/1000`,
    }))

    const scrollItems = members.map((member) => ({
        id: `member-${member.id}`,
        title: `${member.first_name || ''} ${member.last_name || ''}`.trim() || 'Crew Member',
        description: member.details?.duties || member.basics?.description || '',
        image: member.assets?.avatar ? getMediaUrl(member.assets.avatar) : undefined,
    }))

    const documentsList = (car.assets?.documents || []).map((doc) => {
        const media = typeof doc === 'object' ? doc : null
        return {
            id: `doc-${media?.id || Math.random()}`,
            title: media?.alt || media?.filename || 'Document',
            filename: media?.filename ?? null,
            mimeType: media?.mimeType ?? null,
            filesize: media?.filesize ?? null,
            url: media?.url ?? null,
            updatedAt: media?.updatedAt ?? null,
        }
    })

    const videoItems: any[] = []
    if (car.assets?.video) {
        const videoMedia = typeof car.assets.video === 'object' ? car.assets.video : null
        if (videoMedia?.url) {
            videoItems.push({
                id: `car-video-${car.id}`,
                title: car.name,
                url: videoMedia.url,
                poster: getMediaUrl(car.assets?.cover),
                duration: '',
            })
        }
    }

    return (
        <main className="w-full">
            <CoverSection id="car-details-cover" image={coverImage} />
            <InfoSection id="car-details-basics" title={car.name} subtitle={car.alias || ''} cards={infoCards} columns={4} headerVariant={2} footerVariant={1} />
            {studyData.length > 0 && (
                <StudySection id="car-details-history" title="History" subtitle="Development and racing lineage" studies={studyData} variant="featured" headerVariant={1} footerVariant={1} />
            )}
            {tableRows.length > 0 && (
                <TableSection id="car-details-specifications" title="SPECIFICATIONS" subtitle="Technical parameters" columns={tableColumns} rows={tableRows} labels={{ sortActive: 'SORTED', rowIndicator: 'ROW' }} headerVariant={2} footerVariant={1} />
            )}
            {classificationExpandItems.length > 0 && (
                <ExpandSection id="car-details-classifications" title="Classifications" subtitle="Technical tiers and compliance" items={classificationExpandItems} labels={{ indexPrefix: 'CLASS', progressLabel: 'PROGRESS', statusComplete: 'COMPLETE' }} headerVariant={1} footerVariant={1} />
            )}
            {scrollItems.length > 0 && (
                <ScrollSection id="car-details-crew" title="Engineering Crew" subtitle="Assigned personnel" items={scrollItems} labels={{ indexPrefix: 'CRW', progressLabel: 'PROGRESS', statusComplete: 'COMPLETE' }} headerVariant={1} footerVariant={1} />
            )}
            {documentsList.length > 0 && (
                <DocumentsSection id="car-details-documents" title="Documents" subtitle="Technical manuals and homologation" documents={documentsList} referenceCode={car.slug ?? undefined} headerVariant={1} footerVariant={1} />
            )}
            {videoItems.length > 0 && (
                <VideoSection id="car-details-videos" title="Videos" subtitle="Testing and documentary footage" videos={videoItems} labels={{ channelPrefix: 'CH', broadcastStatus: 'LIVE', liveFeed: 'FEED', metaTransmission: 'TRANS' }} headerVariant={1} footerVariant={1} />
            )}
        </main>
    )
}