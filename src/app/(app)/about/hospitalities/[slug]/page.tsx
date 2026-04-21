import GalleryGrid from '@/components/Section/GalleryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import PullQuote from '@/components/Section/PullQuote'
import TimelineScroller from '@/components/Section/TimelineScroller'
import { Hospitality, Media } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
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

export default async function HospitalityPage({ params }: PageProps) {
    const { slug } = await params
    const hospitality = await getHospitality(slug)

    if (!hospitality) {
        return notFound()
    }

    const coverImage = hospitality.assets?.cover && typeof hospitality.assets.cover === 'object'
        ? (hospitality.assets.cover as Media)
        : null

    const infoBlocks = [
        {
            id: 'availability',
            label: 'STATUS',
            title: hospitality.details?.status?.toUpperCase() || 'AVAILABLE',
            description: hospitality.basics?.description || undefined,
            metadata: [
                { key: 'TYPE', value: hospitality.details?.type?.toUpperCase()?.replace(/_/g, ' ') || 'HOSPITALITY' },
                { key: 'ACCESS', value: hospitality.details?.access?.toUpperCase()?.replace(/_/g, ' ') || 'PUBLIC' },
                { key: 'CAPACITY', value: hospitality.details?.capacity?.toString() || 'TBD' },
                { key: 'PRICE/GUEST', value: hospitality.details?.price_per_guest ? `$${hospitality.details.price_per_guest}` : 'CONTACT SALES' },
            ]
        },
        {
            id: 'schedule',
            label: 'SCHEDULE',
            title: hospitality.details?.start_date ? 'BOOKING OPEN' : 'DATES TBD',
            description: 'Experience timeframe',
            metadata: [
                { key: 'START DATE', value: hospitality.details?.start_date || 'TBD' },
                { key: 'END DATE', value: hospitality.details?.end_date || 'TBD' },
            ]
        },
    ]

    const historySteps = []

    if (hospitality.details?.inclusions?.list && hospitality.details.inclusions.list.length > 0) {
        historySteps.push({
            id: 'inclusions',
            index: '01',
            heading: 'Inclusions',
            subheading: 'What\'s included',
            body: hospitality.details.inclusions.list.map(i => i.name).filter(Boolean).join(' • ') || 'Premium amenities included',
            percentage: 100
        })
    }

    if (hospitality.details?.exclusions?.list && hospitality.details.exclusions.list.length > 0) {
        historySteps.push({
            id: 'exclusions',
            index: '02',
            heading: 'Exclusions',
            subheading: 'Not included',
            body: hospitality.details.exclusions.list.map(i => i.name).filter(Boolean).join(' • ') || 'Additional fees may apply',
            percentage: 100
        })
    }

    if (hospitality.details?.requirements?.list && hospitality.details.requirements.list.length > 0) {
        historySteps.push({
            id: 'requirements',
            index: '03',
            heading: 'Requirements',
            subheading: 'Guest prerequisites',
            body: hospitality.details.requirements.list.map(i => i.name).filter(Boolean).join(' • ') || 'Standard terms apply',
            percentage: 100
        })
    }

    const timelineEvents = []

    if (hospitality.details?.start_date) {
        let status: 'completed' | 'upcoming' | 'active' | undefined = 'upcoming'
        if (new Date(hospitality.details.start_date) <= new Date()) {
            status = 'completed'
        }

        timelineEvents.push({
            id: 'opening',
            date: hospitality.details.start_date,
            title: 'Booking Opens',
            description: 'Reservations become available',
            status: status
        })
    }

    if (hospitality.details?.end_date) {
        let status: 'completed' | 'upcoming' | 'active' | undefined = 'upcoming'
        if (new Date(hospitality.details.end_date) <= new Date()) {
            status = 'completed'
        }

        timelineEvents.push({
            id: 'closing',
            date: hospitality.details.end_date,
            title: 'Experience Ends',
            description: 'Final date for this hospitality package',
            status: status
        })
    }

    const galleryItems = hospitality.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: hospitality.details?.type?.replace(/_/g, ' ') || 'Hospitality'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={hospitality.basics?.identifiers?.code || `HSP-${hospitality.id}`}
                title={hospitality.name}
                meta={hospitality.basics?.tagline || 'Premium Experience'}
                image={coverImage}
                tags={[
                    hospitality.details?.type?.replace(/_/g, ' ') || 'Hospitality',
                    hospitality.details?.status?.replace(/_/g, ' ') || 'Available'
                ]}
            />

            <InfoGrid
                id="HSP_SPECS"
                title="Experience Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            <PullQuote
                id="HSP_QUOTE"
                title="Experience Overview"
                quote={hospitality.basics?.description || hospitality.basics?.tagline || 'Premium hospitality experience'}
                attribution={hospitality.name}
                role={hospitality.details?.type?.replace(/_/g, ' ') || 'Hospitality Package'}
                variant="center"
            />

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="HSP_BREAKDOWN"
                    title="Package Breakdown"
                    steps={historySteps}
                />
            )}

            {timelineEvents.length > 0 && (
                <TimelineScroller
                    id="HSP_TIMELINE"
                    title="Important Dates"
                    events={timelineEvents}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="HSP_GALLERY"
                    title="Experience Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/about/hospitalities/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Full Details →
                </Link>
            </section>
        </main>
    )
}