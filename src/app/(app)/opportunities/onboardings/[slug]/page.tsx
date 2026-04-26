import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import FeatureSection from '@/components/Section/Blocks/FeatureSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
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

const getOnboardingData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'onboardings',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: {
                    description: true,
                },
                assets: {
                    videos: true,
                    thumbnail: true,
                    cover: true,
                    completion_certificate: true,
                },
                details: {
                    type: true,
                    format: true,
                    status: true,
                    start_date: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['onboarding-detail'],
    { revalidate: 3600, tags: ['onboarding'] }
)

export default async function OnboardingPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const onboarding = await getOnboardingData(slug)

    if (!onboarding) notFound()

    const thumbUrl = getMediaUrl(onboarding.assets?.thumbnail)
    const coverUrl = getMediaUrl(onboarding.assets?.cover)

    const videoSlides: any[] = []
    if (onboarding.assets?.videos) {
        onboarding.assets.videos.forEach((video, idx) => {
            const media = typeof video === 'object' ? video : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                videoSlides.push({
                    id: String(media.id),
                    title: media.alt || `Video ${idx + 1}`,
                    description: onboarding.basics?.description || undefined,
                    image: thumbUrl || `https://picsum.photos/seed/${onboarding.slug}-${idx}/800/600`,
                    ctaLabel: 'WATCH',
                    ctaHref: url,
                })
            }
        })
    }

    const study = {
        id: String(onboarding.id),
        title: onboarding.name,
        description: onboarding.basics?.description || '',
        image: coverUrl || thumbUrl || `https://picsum.photos/seed/${onboarding.slug}/800/600`,
        metrics: [
            { label: 'TYPE', value: onboarding.details?.type || 'N/A' },
            { label: 'FORMAT', value: onboarding.details?.format || 'N/A' },
            { label: 'STATUS', value: onboarding.details?.status || 'N/A' },
            { label: 'START', value: onboarding.details?.start_date ? new Date(onboarding.details.start_date).toLocaleDateString() : 'TBD' },
        ],
    }

    const certificateFeatures: any[] = []
    const certUrl = getMediaUrl(onboarding.assets?.completion_certificate)
    if (certUrl) {
        certificateFeatures.push({
            id: 'certificate',
            title: 'COMPLETION CERTIFICATE',
            description: 'Official certification issued upon program completion',
            image: certUrl,
        })
    }

    const galleryItems: any[] = []
    if (thumbUrl) {
        galleryItems.push({
            id: `thumb-${onboarding.id}`,
            title: onboarding.name,
            image: thumbUrl,
            height: 'medium' as const,
        })
    }
    if (coverUrl) {
        galleryItems.push({
            id: `cover-${onboarding.id}`,
            title: onboarding.name,
            image: coverUrl,
            height: 'tall' as const,
        })
    }

    return (
        <main className="w-full">
            {videoSlides.length > 0 && (
                <CarouselSection
                    id="onboarding-videos"
                    slides={videoSlides}
                />
            )}
            <StudySection
                id="onboarding-details"
                title="OVERVIEW"
                subtitle="Program specifications"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="FULL DETAILS"
                ctaPath={`/opportunities/onboardings/${onboarding.slug}/details`}
            />
            {certificateFeatures.length > 0 && (
                <FeatureSection
                    id="onboarding-certificate"
                    title="CERTIFICATION"
                    subtitle="Professional recognition"
                    features={certificateFeatures}
                    labels={{
                        specIndex: 'CRT',
                        statsLabel: 'DATA',
                        ctaLabel: 'VIEW',
                    }}
                    columns={2}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="onboarding-gallery"
                    title="GALLERY"
                    subtitle="Program assets"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={2}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
        </main>
    )
}