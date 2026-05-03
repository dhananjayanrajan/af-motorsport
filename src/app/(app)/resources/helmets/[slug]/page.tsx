// app/(app)/resources/helmets/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import InfoSection from '@/components/Section/Blocks/InfoSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import ShortsSection from '@/components/Section/Blocks/ShortsSection'
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

const getHelmetData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'helmets',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { tagline: true },
                details: { year: true, usage: true, designer: true, inspiration: true, color: true, material: true, branding: true, style: true },
                assets: { avatar: true, thumbnail: true, images: true, video: true },
            },
        })
        return result.docs[0] || null
    },
    ['helmet-profile'],
    { revalidate: 3600, tags: ['helmet'] }
)

export default async function HelmetPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const helmet = await getHelmetData(slug)

    if (!helmet) notFound()

    const heroBackgroundImage = getMediaUrl(helmet.assets?.avatar)

    const quoteItem = helmet.basics?.tagline
        ? { id: String(helmet.id), text: helmet.basics.tagline, author: helmet.name }
        : null

    const featureData = [{
        id: String(helmet.id),
        title: helmet.name,
        description: helmet.details?.inspiration || '',
        image: getMediaUrl(helmet.assets?.thumbnail) || getMediaUrl(helmet.assets?.avatar) || `https://picsum.photos/seed/${helmet.slug}/800/600`,
        slug: `resources/helmets/${helmet.slug}/details`,
        stats: [
            { label: 'Designer', value: helmet.details?.designer || 'N/A' },
        ],
    }]

    const infoCards = [
        { id: 'color', label: 'Color', value: helmet.details?.color || 'N/A', emphasis: 'high' as const },
        { id: 'material', label: 'Material', value: helmet.details?.material || 'N/A', emphasis: 'medium' as const },
        { id: 'branding', label: 'Branding', value: helmet.details?.branding || 'N/A', emphasis: 'medium' as const },
        { id: 'style', label: 'Style', value: helmet.details?.style || 'N/A', emphasis: 'low' as const },
    ]

    const galleryItems: any[] = []
    if (helmet.assets?.images) {
        const images = Array.isArray(helmet.assets.images) ? helmet.assets.images : []
        images.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: `img-${media.id}`,
                    title: media.alt || helmet.name,
                    image: url,
                    category: `IMG_${String(idx + 1).padStart(2, '0')}`,
                    description: undefined,
                })
            }
        })
    }

    const shortItems: any[] = []
    if (helmet.assets?.video) {
        const videoMedia = typeof helmet.assets.video === 'object' ? helmet.assets.video : null
        if (videoMedia?.url) {
            shortItems.push({
                id: `helmet-video-${helmet.id}`,
                title: helmet.name,
                videoUrl: videoMedia.url,
                poster: getMediaUrl(helmet.assets?.thumbnail),
                category: '360 SPIN',
            })
        }
    }

    return (
        <main className="w-full">
            <HeroSection
                id="helmet-hero"
                title={helmet.name}
                subtitle={helmet.details?.year || ''}
                description={helmet.details?.usage || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                badge="HELMET"
                meta={helmet.details?.style || undefined}
                actions={[{ label: 'FULL DETAILS', href: `/resources/helmets/${helmet.slug}/details`, variant: 'primary' }]}
            />
            {quoteItem && (
                <QuoteSection id="helmet-quote" title={helmet.name} subtitle="Design Concept" quotes={[quoteItem]} labels={{ commStatus: 'COMM', ratingLabel: 'RATING' }} variant="carousel" headerVariant={2} footerVariant={1} />
            )}
            <FeatureSection id="helmet-feature" title="Design" subtitle="Inspiration and creator" features={featureData} labels={{ specIndex: 'HEL', statsLabel: 'INFO', ctaLabel: 'VIEW FULL DETAILS' }} ctaPath={`/resources/helmets/${helmet.slug}/details`} headerVariant={2} footerVariant={1} />
            {infoCards.length > 0 && (
                <InfoSection id="helmet-style" title="Style Profile" subtitle="Visual characteristics" cards={infoCards} columns={4} headerVariant={1} footerVariant={1} />
            )}
            {galleryItems.length > 0 && (
                <GallerySection id="helmet-gallery" title="Gallery" subtitle="Detail shots" items={galleryItems} columns={3} headerVariant={1} footerVariant={1} />
            )}
            {shortItems.length > 0 && (
                <ShortsSection id="helmet-videos" title="Media" subtitle="360 spins and interviews" items={shortItems} headerVariant={1} footerVariant={1} />
            )}
        </main>
    )
}