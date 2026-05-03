// app/(app)/resources/suits/[slug]/page.tsx
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import GallerySection from '@/components/Section/Blocks/GallerySection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import ShortsSection from '@/components/Section/Blocks/ShortsSection'
import TabSection from '@/components/Section/Blocks/TabSection'
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

const getSuitData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'suits',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 2,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: { tagline: true },
                details: { material: true, usage: true, durability: true, manufacturers: { list: true } },
                assets: { thumbnail: true, images: true, video: true },
            },
        })
        return result.docs[0] || null
    },
    ['suit-profile'],
    { revalidate: 3600, tags: ['suit'] }
)

export default async function SuitPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const suit = await getSuitData(slug)

    if (!suit) notFound()

    const heroBackgroundImage = getMediaUrl(suit.assets?.thumbnail)

    const featureData = [{
        id: String(suit.id),
        title: suit.name,
        description: suit.details?.durability || '',
        image: getMediaUrl(suit.assets?.thumbnail) || `https://picsum.photos/seed/${suit.slug}/800/600`,
        slug: undefined,
        stats: [
            { label: 'Material', value: suit.details?.material || 'N/A' },
        ],
    }]

    const manufacturerEntries = (suit.details?.manufacturers?.list || []).map((mfr) => ({
        id: mfr.id || `mfr-${Math.random()}`,
        title: mfr.name || 'Manufacturer',
        subtitle: mfr.description || undefined,
        tag: 'MFR',
    }))

    const galleryItems: any[] = []
    if (suit.assets?.images) {
        const images = Array.isArray(suit.assets.images) ? suit.assets.images : []
        images.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: `img-${media.id}`,
                    title: media.alt || suit.name,
                    image: url,
                    category: `IMG_${String(idx + 1).padStart(2, '0')}`,
                    description: undefined,
                })
            }
        })
    }

    const shortItems: any[] = []
    if (suit.assets?.video) {
        const videoMedia = typeof suit.assets.video === 'object' ? suit.assets.video : null
        if (videoMedia?.url) {
            shortItems.push({
                id: `suit-video-${suit.id}`,
                title: suit.name,
                videoUrl: videoMedia.url,
                poster: getMediaUrl(suit.assets?.thumbnail),
                category: 'DEMO',
            })
        }
    }

    const tabItems: any[] = []

    return (
        <main className="w-full">
            <HeroSection
                id="suit-hero"
                title={suit.name}
                subtitle={suit.details?.material || ''}
                description={suit.details?.usage || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="left"
                badge="SUIT"
                meta={suit.details?.durability || undefined}
            />
            <FeatureSection id="suit-feature" title="Durability" subtitle="Material science" features={featureData} labels={{ specIndex: 'SUI', statsLabel: 'INFO', ctaLabel: 'VIEW' }} headerVariant={2} footerVariant={1} />
            {manufacturerEntries.length > 0 && (
                <ListSection id="suit-manufacturers" title="Manufacturers" subtitle="Suppliers and tailors" entries={manufacturerEntries} labels={{ statusPrefix: 'TYPE', timePrefix: 'ID', indexPrefix: 'MFR' }} showStatus={true} showTimestamp={false} />
            )}
            {galleryItems.length > 0 && (
                <GallerySection id="suit-gallery" title="Gallery" subtitle="Texture and branding close-ups" items={galleryItems} columns={3} headerVariant={1} footerVariant={1} />
            )}
            {shortItems.length > 0 && (
                <ShortsSection id="suit-videos" title="Media" subtitle="Stress tests and demonstrations" items={shortItems} headerVariant={1} footerVariant={1} />
            )}
            {tabItems.length > 0 && (
                <TabSection id="suit-drivers" title="Drivers" subtitle="Who wears this suit" tabs={tabItems} labels={{ channelPrefix: 'DRV', statusActive: 'ACTIVE' }} variant="underline" headerVariant={1} footerVariant={1} />
            )}
        </main>
    )
}