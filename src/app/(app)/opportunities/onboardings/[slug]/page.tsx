// app/(frontend)/opportunities/onboardings/[slug]/page.tsx
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
                    image: onboarding.assets?.thumbnail ? getMediaUrl(onboarding.assets.thumbnail) : `https://picsum.photos/seed/${onboarding.slug}-${idx}/800/600`,
                    ctaLabel: 'Watch',
                    ctaHref: url,
                })
            }
        })
    }

    const studyImage = onboarding.assets?.cover
        ? getMediaUrl(onboarding.assets.cover)
        : onboarding.assets?.thumbnail
            ? getMediaUrl(onboarding.assets.thumbnail)
            : undefined

    const study = {
        id: String(onboarding.id),
        title: onboarding.name,
        description: onboarding.basics?.description || '',
        image: studyImage || `https://picsum.photos/seed/${onboarding.slug}/800/600`,
        metrics: [
            { label: 'Type', value: onboarding.details?.type || 'N/A' },
            { label: 'Format', value: onboarding.details?.format || 'N/A' },
            { label: 'Status', value: onboarding.details?.status || 'N/A' },
            { label: 'Start', value: onboarding.details?.start_date ? new Date(onboarding.details.start_date).toLocaleDateString() : 'TBD' },
        ],
    }

    const certificateFeatures: any[] = []
    if (onboarding.assets?.completion_certificate) {
        const certUrl = getMediaUrl(onboarding.assets.completion_certificate)
        if (certUrl) {
            certificateFeatures.push({
                id: 'certificate',
                title: 'Completion Certificate',
                description: 'Awarded upon successful completion',
                image: certUrl,
            })
        }
    }

    const galleryItems: any[] = []
    if (onboarding.assets?.thumbnail) {
        const url = getMediaUrl(onboarding.assets.thumbnail)
        if (url) {
            galleryItems.push({
                id: `thumb-${onboarding.id}`,
                title: onboarding.name,
                image: url,
                height: 'medium' as const,
            })
        }
    }
    if (onboarding.assets?.cover) {
        const url = getMediaUrl(onboarding.assets.cover)
        if (url) {
            galleryItems.push({
                id: `cover-${onboarding.id}`,
                title: onboarding.name,
                image: url,
                height: 'tall' as const,
            })
        }
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
                title="Onboarding Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/opportunities/onboardings/${onboarding.slug}/details`}
            />
            {certificateFeatures.length > 0 && (
                <FeatureSection
                    id="onboarding-certificate"
                    title="Certificate"
                    subtitle="Recognition of completion"
                    features={certificateFeatures}
                    labels={{
                        specIndex: 'CRT',
                        statsLabel: 'INFO',
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
                    title="Gallery"
                    subtitle="Onboarding imagery"
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