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
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    tagline: true,
                    description: true,
                    identifiers: { code: true },
                },
                assets: {
                    cover: true,
                    thumbnail: true,
                    gallery: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    type: true,
                    capacity: true,
                    size_sq_m: true,
                    accessibility: true,
                    history: true,
                    notes: true,
                },
            },
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

    const heroBackgroundImage = getMediaUrl(garage.assets?.cover) || getMediaUrl(garage.seo?.image)

    const heroActions = [
        { label: 'View Details', href: `/resources/garages/${garage.slug}/details`, variant: 'primary' as const },
    ]

    const studyImage = getMediaUrl(garage.assets?.cover) ||
        getMediaUrl(garage.assets?.thumbnail) ||
        `https://picsum.photos/seed/${garage.slug}/800/600`

    const study = {
        id: String(garage.id),
        title: garage.name || '',
        description: garage.basics?.description || garage.basics?.tagline || '',
        image: studyImage,
        metrics: [
            { label: 'Type', value: garage.details?.type || 'N/A' },
            { label: 'Capacity', value: garage.details?.capacity ? String(garage.details.capacity) : 'N/A' },
            { label: 'Size', value: garage.details?.size_sq_m ? `${garage.details.size_sq_m} m²` : 'N/A' },
            { label: 'Access', value: garage.details?.accessibility || 'N/A' },
        ],
    }

    const scrollItems = [
        ...(garage.details?.history ? [{
            id: 'history',
            title: 'Garage History',
            description: garage.basics?.description || 'A facility with a rich motorsport heritage.',
            percentage: 100,
        }] : []),
        ...(garage.details?.notes ? [{
            id: 'notes',
            title: 'Notes',
            description: garage.details.notes,
            percentage: 75,
        }] : [])
    ]

    const galleryItems = (garage.assets?.gallery || [])
        .map((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = getMediaUrl(media)
            if (!url || !media) return null
            return {
                id: String(media.id),
                title: media.alt || garage.name || '',
                image: url,
                height: (idx % 3 === 0 ? 'tall' : idx % 2 === 0 ? 'medium' : 'short') as 'tall' | 'medium' | 'short',
            }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null)

    return (
        <main className="w-full">
            <HeroSection
                id="garage-hero"
                title={garage.name || ''}
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