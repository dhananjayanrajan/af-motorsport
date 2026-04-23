// app/(frontend)/opportunities/meetups/[slug]/page.tsx
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import StudySection from '@/components/Section/Blocks/StudySection'
import VideoSection from '@/components/Section/Blocks/VideoSection'
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

const getMeetupData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'meetups',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['meetup-detail'],
    { revalidate: 3600, tags: ['meetup'] }
)

export default async function MeetupPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const meetup = await getMeetupData(slug)

    if (!meetup) notFound()

    const videoItems: any[] = []
    if (meetup.assets?.video) {
        const videoUrl = getMediaUrl(meetup.assets.video)
        if (videoUrl) {
            videoItems.push({
                id: String(meetup.id),
                title: meetup.name,
                description: meetup.basics?.description || undefined,
                url: videoUrl,
                poster: meetup.assets?.thumbnail ? getMediaUrl(meetup.assets.thumbnail) : meetup.assets?.cover ? getMediaUrl(meetup.assets.cover) : undefined,
            })
        }
    }

    const studyImage = meetup.assets?.cover
        ? getMediaUrl(meetup.assets.cover)
        : meetup.assets?.thumbnail
            ? getMediaUrl(meetup.assets.thumbnail)
            : undefined

    const study = {
        id: String(meetup.id),
        title: meetup.name,
        description: meetup.basics?.description || '',
        image: studyImage || `https://picsum.photos/seed/${meetup.slug}/800/600`,
        metrics: [
            { label: 'Format', value: meetup.details?.format || 'N/A' },
            { label: 'Access', value: meetup.details?.access || 'N/A' },
            { label: 'Date', value: new Date(meetup.details.start_date).toLocaleDateString() },
            { label: 'End Date', value: meetup.details?.end_date ? new Date(meetup.details.end_date).toLocaleDateString() : 'N/A' },
        ],
    }

    const galleryItems: any[] = []
    if (meetup.assets?.gallery) {
        meetup.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || meetup.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            {videoItems.length > 0 && (
                <VideoSection
                    id="meetup-video"
                    title="Meetup Video"
                    subtitle={meetup.name}
                    videos={videoItems}
                    labels={{
                        channelPrefix: 'CH',
                        broadcastStatus: 'LIVE',
                        liveFeed: 'FEED',
                        metaTransmission: 'TRANS',
                    }}
                    autoplay={false}
                    showPlaylist={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            <StudySection
                id="meetup-details"
                title="Meetup Overview"
                subtitle="Event information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
                ctaLabel="View Full Details"
                ctaPath={`/opportunities/meetups/${meetup.slug}/details`}
            />
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="meetup-gallery"
                    title="Gallery"
                    subtitle="Event imagery"
                    items={galleryItems}
                    labels={{
                        categoryPrefix: 'CAT',
                        idPrefix: 'IMG',
                    }}
                    columns={3}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
        </main>
    )
}