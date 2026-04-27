import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
import StudySection from '@/components/Section/Blocks/StudySection'
import TimelineSection from '@/components/Section/Blocks/TimelineSection'
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

const getHospitalityData = unstable_cache(
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
                    description: true,
                    tagline: true,
                },
                assets: {
                    cover: true,
                    thumbnail: true,
                    gallery: true,
                },
                details: {
                    status: true,
                    access: true,
                    capacity: true,
                    price_per_guest: true,
                    type: true,
                    history: true,
                    start_date: true,
                    end_date: true,
                },
                seo: {
                    image: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['hospitality-detail'],
    { revalidate: 3600, tags: ['hospitality'] }
)

export default async function HospitalityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const hospitality = await getHospitalityData(slug)

    if (!hospitality) notFound()

    const coverActions = [
        { label: 'VIEW DETAILS', href: `/about/hospitalities/${hospitality.slug}/details`, variant: 'primary' as const },
    ]

    const heroBackgroundImage = resolveAssetUrl(hospitality.assets, 'cover') || getMediaUrl(hospitality.seo?.image)
    const studyImage = resolveAssetUrl(hospitality.assets, 'cover', 'thumbnail')

    const study = {
        id: String(hospitality.id),
        title: hospitality.name,
        description: hospitality.basics?.description || hospitality.basics?.tagline || '',
        image: studyImage || '',
        metrics: [
            { label: 'STATUS', value: hospitality.details?.status || 'N/A' },
            { label: 'ACCESS', value: hospitality.details?.access || 'N/A' },
            { label: 'CAPACITY', value: hospitality.details?.capacity ? String(hospitality.details.capacity) : 'N/A' },
            { label: 'PRICE', value: hospitality.details?.price_per_guest ? `$${hospitality.details.price_per_guest}` : 'N/A' },
        ],
    }

    const quoteItem = hospitality.basics?.tagline
        ? {
            id: String(hospitality.id),
            text: hospitality.basics.tagline,
            author: hospitality.name,
        }
        : null

    const scrollItems: any[] = []
    if (hospitality.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'HERITAGE',
            description: 'A comprehensive timeline of premium trackside hospitality services.',
            percentage: 100,
        })
    }

    const timelineEvents: any[] = []
    if (hospitality.details?.start_date) {
        timelineEvents.push({
            id: 'start',
            date: new Date(hospitality.details.start_date).toISOString().split('T')[0],
            title: 'INITIALIZATION',
            description: 'Official opening of hospitality services.',
            status: 'upcoming' as const,
        })
    }
    if (hospitality.details?.end_date) {
        timelineEvents.push({
            id: 'end',
            date: new Date(hospitality.details.end_date).toISOString().split('T')[0],
            title: 'CONCLUSION',
            description: 'Final operational window for this experience.',
            status: 'upcoming' as const,
        })
    }

    const galleryItems: any[] = []
    if (hospitality.assets?.gallery && Array.isArray(hospitality.assets.gallery)) {
        hospitality.assets.gallery.forEach((item, idx) => {
            const url = getMediaUrl(item)
            if (url) {
                galleryItems.push({
                    id: String(typeof item === 'object' ? item.id : idx),
                    title: (typeof item === 'object' && item.alt) || hospitality.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    if (galleryItems.length === 0 && heroBackgroundImage) {
        galleryItems.push({
            id: String(hospitality.id),
            title: hospitality.name,
            image: heroBackgroundImage,
            height: 'medium' as const,
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="hospitality-cover"
                title={hospitality.name}
                subtitle={hospitality.basics?.tagline || 'EXECUTIVE ACCESS'}
                description={hospitality.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={coverActions}
                alignment="center"
                badge={hospitality.details?.type || 'HOSPITALITY'}
            />
            <StudySection
                id="hospitality-details"
                title="SPECIFICATIONS"
                subtitle="Technical details and accessibility parameters"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {quoteItem && (
                <QuoteSection
                    id="hospitality-quote"
                    title="PHILOSOPHY"
                    subtitle="Strategic hospitality standards"
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
            <ScrollSection
                id="hospitality-history"
                title="ARCHIVE"
                subtitle="Historical operational data"
                items={scrollItems}
                labels={{
                    indexPrefix: 'LOG',
                    progressLabel: 'DATA',
                    statusComplete: 'SYNC',
                }}
                variant="reveal"
                headerVariant={1}
                footerVariant={1}
            />
            {timelineEvents.length > 0 && (
                <TimelineSection
                    id="hospitality-timeline"
                    title="OPERATIONS"
                    subtitle="Service timeline schedules"
                    events={timelineEvents}
                    labels={{
                        statusPrefix: 'STAT',
                        eventIndexLabel: 'STEP',
                        deploymentStatus: {
                            completed: 'SYNCED',
                            active: 'ACTIVE',
                            upcoming: 'PENDING',
                        },
                    }}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="hospitality-gallery"
                    title="VISUALS"
                    subtitle="Environmental documentation"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'TYPE',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}