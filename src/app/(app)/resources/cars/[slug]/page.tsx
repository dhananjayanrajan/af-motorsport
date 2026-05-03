// app/(app)/resources/cars/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import PanelSection from '@/components/Section/Blocks/PanelSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ShortsSection from '@/components/Section/Blocks/ShortsSection'
import { Media, Organization } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getCarData = unstable_cache(
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
                basics: { identifiers: { chassis: true, model: true, version: true }, tagline: true, description: true },
                details: { status: true, manufacturers: true },
                assets: { avatar: true, cover: true, gallery: true, video: true },
            },
        })
        return result.docs[0] || null
    },
    ['car-profile'],
    { revalidate: 3600, tags: ['car'] }
)

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const car = await getCarData(slug)

    if (!car) notFound()

    const heroBackgroundImage = getMediaUrl(car.assets?.avatar) || getMediaUrl(car.assets?.cover)

    const quoteItem = car.basics?.tagline
        ? { id: String(car.id), text: car.basics.tagline, author: car.name }
        : null

    const featureData = [{
        id: String(car.id),
        title: car.name,
        description: car.basics?.identifiers?.version || '',
        image: getMediaUrl(car.assets?.cover) || getMediaUrl(car.assets?.avatar) || `https://picsum.photos/seed/${car.slug}/800/600`,
        slug: `resources/cars/${car.slug}/details`,
        stats: [
            { label: 'Chassis', value: car.basics?.identifiers?.chassis || 'N/A' },
            { label: 'Status', value: car.details?.status || 'N/A' },
        ],
    }]

    const galleryItems: any[] = []
    if (car.assets?.gallery) {
        const gallery = Array.isArray(car.assets.gallery) ? car.assets.gallery : []
        gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: `gal-${media.id}`,
                    title: media.alt || car.name,
                    image: url,
                    category: `IMG_${String(idx + 1).padStart(2, '0')}`,
                    description: undefined,
                })
            }
        })
    }

    const panelData: any[] = []
    if (car.details?.manufacturers) {
        car.details.manufacturers.forEach((orgRef) => {
            const org = orgRef as Organization
            if (org && typeof org === 'object' && 'name' in org) {
                panelData.push({
                    id: `org-${org.id}`,
                    title: org.name,
                    summary: org.basics?.type || 'Manufacturer',
                    content: org.basics?.description || '',
                    metadata: { type: org.basics?.type || 'N/A', industry: org.basics?.industry || 'N/A' },
                })
            }
        })
    }

    const shortItems: any[] = []
    if (car.assets?.video) {
        const videoMedia = typeof car.assets.video === 'object' ? car.assets.video : null
        if (videoMedia?.url) {
            shortItems.push({
                id: `car-video-${car.id}`,
                title: car.name,
                videoUrl: videoMedia.url,
                poster: getMediaUrl(car.assets?.cover),
                category: 'CINEMATIC',
            })
        }
    }

    return (
        <main className="w-full">
            <HeroSection
                id="car-hero"
                title={car.name}
                subtitle={car.basics?.identifiers?.chassis || ''}
                description={car.alias || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                badge={car.details?.status || undefined}
                meta={car.basics?.identifiers?.model || undefined}
                actions={[{ label: 'FULL DETAILS', href: `/resources/cars/${car.slug}/details`, variant: 'primary' }]}
            />
            {quoteItem && (
                <QuoteSection
                    id="car-quote"
                    title={car.name}
                    subtitle="Vehicle Identity"
                    quotes={[quoteItem]}
                    labels={{ commStatus: 'COMM', ratingLabel: 'RATING' }}
                    variant="carousel"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <FeatureSection
                id="car-feature"
                title="Overview"
                subtitle="Key specifications"
                features={featureData}
                labels={{ specIndex: 'CAR', statsLabel: 'INFO', ctaLabel: 'VIEW FULL DETAILS' }}
                ctaPath={`/resources/cars/${car.slug}/details`}
                headerVariant={2}
                footerVariant={1}
            />
            {galleryItems.length > 0 && (
                <GallerySection
                    id="car-gallery"
                    title="Gallery"
                    subtitle="High-resolution photography"
                    items={galleryItems}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {panelData.length > 0 && (
                <PanelSection
                    id="car-manufacturers"
                    title="Manufacturers"
                    subtitle="Production partners"
                    panels={panelData}
                    labels={{ expansionState: { open: 'ACTIVE', closed: 'CLOSED' }, metadataTitle: 'DETAILS' }}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {shortItems.length > 0 && (
                <ShortsSection
                    id="car-videos"
                    title="Media"
                    subtitle="Cinematic clips"
                    items={shortItems}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}