// app/(frontend)/opportunities/programs/[slug]/page.tsx
import CarouselSection from '@/components/Section/Blocks/CarouselSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import MasonrySection from '@/components/Section/Blocks/MasonrySection'
import StudySection from '@/components/Section/Blocks/StudySection'
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

const getProgramData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'programs',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['program-detail'],
    { revalidate: 3600, tags: ['program'] }
)

const getOrganizations = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'organizations',
            limit: 20,
            select: {
                id: true,
                name: true,
                slug: true,
                basics: true,
                assets: true,
            },
        })
        return result.docs as Organization[]
    },
    ['organizations-program'],
    { revalidate: 3600 }
)

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const program = await getProgramData(slug)

    if (!program) notFound()

    const organizations = await getOrganizations()

    const heroActions = [
        { label: 'View Details', href: `/opportunities/programs/${program.slug}/details`, variant: 'primary' as const },
    ]

    const heroBackgroundImage = program.assets?.cover
        ? getMediaUrl(program.assets.cover)
        : program.seo?.image
            ? getMediaUrl(program.seo.image)
            : undefined

    const studyImage = program.assets?.cover
        ? getMediaUrl(program.assets.cover)
        : program.assets?.thumbnail
            ? getMediaUrl(program.assets.thumbnail)
            : undefined

    const study = {
        id: String(program.id),
        title: program.name,
        description: program.basics?.description || program.details?.objective || '',
        image: studyImage || `https://picsum.photos/seed/${program.slug}/800/600`,
        metrics: [
            { label: 'Status', value: program.details?.status || 'N/A' },
            { label: 'Type', value: program.details?.type || 'N/A' },
            { label: 'Duration', value: program.details?.duration || 'N/A' },
            { label: 'Start', value: program.details?.start_date ? new Date(program.details.start_date).toLocaleDateString() : 'TBD' },
        ],
    }

    const organizationSlides: any[] = []

    if (program.details?.partners) {
        program.details.partners.forEach((partnerRef) => {
            const partner = partnerRef as Organization
            if (partner && typeof partner === 'object' && 'name' in partner) {
                const imageUrl = partner.assets?.logo
                    ? getMediaUrl(partner.assets.logo)
                    : partner.assets?.alt_logo
                        ? getMediaUrl(partner.assets.alt_logo)
                        : `https://picsum.photos/seed/${partner.slug}/400/300`

                organizationSlides.push({
                    id: String(partner.id),
                    title: partner.name,
                    description: partner.basics?.tagline || 'Partner',
                    image: imageUrl,
                    ctaLabel: 'View',
                    ctaHref: `/organizations/${partner.slug}`,
                })
            }
        })
    }

    if (program.details?.sponsors) {
        program.details.sponsors.forEach((sponsorRef) => {
            const sponsor = sponsorRef as Organization
            if (sponsor && typeof sponsor === 'object' && 'name' in sponsor) {
                const imageUrl = sponsor.assets?.logo
                    ? getMediaUrl(sponsor.assets.logo)
                    : sponsor.assets?.alt_logo
                        ? getMediaUrl(sponsor.assets.alt_logo)
                        : `https://picsum.photos/seed/${sponsor.slug}/400/300`

                organizationSlides.push({
                    id: String(sponsor.id),
                    title: sponsor.name,
                    description: sponsor.basics?.tagline || 'Sponsor',
                    image: imageUrl,
                    ctaLabel: 'View',
                    ctaHref: `/organizations/${sponsor.slug}`,
                })
            }
        })
    }

    const galleryItems: any[] = []
    if (program.assets?.gallery) {
        program.assets.gallery.forEach((item, idx) => {
            const media = typeof item === 'object' ? item : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                galleryItems.push({
                    id: String(media.id),
                    title: media.alt || program.name,
                    image: url,
                    height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="program-hero"
                title={program.name}
                subtitle={program.basics?.tagline || ''}
                description={program.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                actions={heroActions}
                alignment="center"
                badge={program.basics?.identifiers?.code || program.details?.type || undefined}
            />
            <StudySection
                id="program-details"
                title="Program Overview"
                subtitle="Key information"
                studies={[study]}
                variant="featured"
                headerVariant={1}
                footerVariant={1}
            />
            {organizationSlides.length > 0 && (
                <CarouselSection
                    id="program-partners-sponsors"
                    slides={organizationSlides}
                />
            )}
            {galleryItems.length > 0 && (
                <MasonrySection
                    id="program-gallery"
                    title="Gallery"
                    subtitle="Program imagery"
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