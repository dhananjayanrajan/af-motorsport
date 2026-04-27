// app/(frontend)/opportunities/programs/[slug]/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
import LogoSection from '@/components/Section/Blocks/LogoSection'
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
                    objective: true,
                    status: true,
                    type: true,
                    duration: true,
                    start_date: true,
                    partners: true,
                    sponsors: true,
                },
            },
        })
        return result.docs[0] || null
    },
    ['program-detail'],
    { revalidate: 3600, tags: ['program'] }
)

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const program = await getProgramData(slug)

    if (!program) notFound()

    const heroActions = [
        { label: 'View Details', href: `/opportunities/programs/${program.slug}/details`, variant: 'primary' as const },
    ]

    const heroBackgroundImage = getMediaUrl(program.assets?.cover) || getMediaUrl(program.seo?.image)

    const studyImage = getMediaUrl(program.assets?.cover) || getMediaUrl(program.assets?.thumbnail)

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

    const allOrganizations: Organization[] = []

    if (program.details?.partners) {
        program.details.partners.forEach((partnerRef) => {
            const partner = partnerRef as Organization
            if (partner && typeof partner === 'object' && 'name' in partner) {
                allOrganizations.push(partner)
            }
        })
    }

    if (program.details?.sponsors) {
        program.details.sponsors.forEach((sponsorRef) => {
            const sponsor = sponsorRef as Organization
            if (sponsor && typeof sponsor === 'object' && 'name' in sponsor) {
                allOrganizations.push(sponsor)
            }
        })
    }

    const logoItems = allOrganizations.map((org) => {
        const logoUrl = getMediaUrl(org.assets?.logo) || getMediaUrl(org.assets?.alt_logo) || `https://picsum.photos/seed/${org.slug}/400/300`

        return {
            id: String(org.id),
            name: org.name,
            logo: logoUrl,
            description: org.basics?.tagline || org.basics?.description || undefined,
            website: org.details?.websites?.list?.[0]?.path || undefined,
            location: undefined,
            category: org.basics?.type || 'PARTNER',
            slug: `organizations/${org.slug}`,
        }
    })

    const galleryItems: any[] = (program.assets?.gallery || []).map((item, idx) => {
        const media = item as Media
        const url = getMediaUrl(media)
        if (!url) return null
        return {
            id: String(media.id),
            title: media.alt || program.name,
            image: url,
            height: idx % 3 === 0 ? 'tall' as const : idx % 2 === 0 ? 'medium' as const : 'short' as const,
        }
    }).filter(Boolean)

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
            {logoItems.length > 0 && (
                <LogoSection
                    id="program-partners-sponsors"
                    title="Partners & Sponsors"
                    subtitle="Supporting organizations"
                    items={logoItems}
                    headerVariant={2}
                    footerVariant={1}
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