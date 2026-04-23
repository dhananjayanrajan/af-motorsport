// app/(frontend)/resources/garages/[slug]/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import ScrollSection from '@/components/Section/Blocks/ScrollSection'
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

const getGarageData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'garages',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['garage-detail'],
    { revalidate: 3600, tags: ['garage'] }
)

export default async function GaragePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const garage = await getGarageData(slug)

    if (!garage) notFound()

    const heroBackgroundImage = garage.assets?.cover
        ? getMediaUrl(garage.assets.cover)
        : garage.seo?.image
            ? getMediaUrl(garage.seo.image)
            : undefined

    const heroActions = [
        { label: 'View Details', href: `/resources/garages/${garage.slug}/details`, variant: 'primary' as const },
    ]

    const studyImage = garage.assets?.cover
        ? getMediaUrl(garage.assets.cover)
        : garage.assets?.thumbnail
            ? getMediaUrl(garage.assets.thumbnail)
            : undefined

    const study = {
        id: String(garage.id),
        title: garage.name,
        description: garage.basics?.description || garage.basics?.tagline || '',
        image: studyImage || `https://picsum.photos/seed/${garage.slug}/800/600`,
        metrics: [
            { label: 'Type', value: garage.details?.type || 'N/A' },
            { label: 'Capacity', value: garage.details?.capacity ? String(garage.details.capacity) : 'N/A' },
            { label: 'Size', value: garage.details?.size_sq_m ? `${garage.details.size_sq_m} m²` : 'N/A' },
            { label: 'Access', value: garage.details?.accessibility || 'N/A' },
        ],
    }

    const scrollItems: any[] = []
    if (garage.details?.history) {
        scrollItems.push({
            id: 'history',
            title: 'Garage History',
            description: garage.basics?.description || 'A facility with a rich motorsport heritage.',
            percentage: 100,
        })
    }
    if (garage.details?.notes) {
        scrollItems.push({
            id: 'notes',
            title: 'Notes',
            description: garage.details.notes,
            percentage: 75,
        })
    }

    const galleryItems: any[] = []
    if (garage.assets?.gallery) {
        garage.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || garage.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="garage-hero"
                title={garage.name}
                subtitle={garage.basics?.tagline || ''}
                description={garage.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={heroActions}
                alignment="center"
                badge={garage.basics?.identifiers?.code || garage.details?.type || undefined}
            />
            <StudySection
                id="garage-details"
                title="Garage Overview"
                subtitle="Facility information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {scrollItems.length > 0 && (
                <ScrollSection
                    id="garage-history"
                    title="History & Notes"
                    subtitle="Facility background"
                    items={scrollItems}
                    labels={{
                        indexPrefix: 'SEC',
                        progressLabel: 'PROG',
                        statusComplete: 'DONE',
                    }}
                    variant="reveal"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="garage-gallery"
                    title="Gallery"
                    subtitle="Facility imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}