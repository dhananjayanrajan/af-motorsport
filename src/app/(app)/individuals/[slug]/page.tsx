// app/(frontend)/individuals/[slug]/page.tsx
import HeroSection from '@/components/Section/Blocks/HeroSection'
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

function nullToUndefined<T>(value: T | null | undefined): T | undefined {
    if (value === null) return undefined
    return value
}

const getIndividualBySlug = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'individuals',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: {
                    type: true,
                    description: true,
                    is_contact: true,
                    gender: true,
                    pronouns: true,
                },
                assets: {
                    avatar: true,
                    thumbnail: true,
                },
                seo: {
                    description: true,
                    image: true,
                },
            },
        })
        return result.docs[0] ?? null
    },
    ['individual-by-slug'],
    { revalidate: 120, tags: ['individuals'] }
)

export default async function IndividualPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const individual = await getIndividualBySlug(slug)

    if (!individual) notFound()

    const fullName = `${individual.first_name} ${individual.last_name}`
    const imageUrl = getMediaUrl(individual.assets?.avatar) ?? getMediaUrl(individual.assets?.thumbnail)

    const metrics: { label: string; value: string }[] = []
    const typeVal = nullToUndefined(individual.basics?.type)
    if (typeVal) metrics.push({ label: 'Type', value: typeVal })
    const genderVal = nullToUndefined(individual.basics?.gender)
    if (genderVal) metrics.push({ label: 'Gender', value: genderVal })
    const pronounsVal = nullToUndefined(individual.basics?.pronouns)
    if (pronounsVal) metrics.push({ label: 'Pronouns', value: pronounsVal })

    const tags: string[] = []
    if (typeVal) tags.push(typeVal)
    if (individual.basics?.is_contact) tags.push('Contact')

    const study = {
        id: String(individual.id),
        title: fullName,
        description: nullToUndefined(individual.basics?.description) ?? '',
        image: imageUrl ?? `https://picsum.photos/seed/${individual.id}/800/1000`,
        metrics,
        tags,
        ctaLabel: 'BACK TO DIRECTORY',
        ctaHref: '/individuals',
    }

    const heroDescription = nullToUndefined(individual.seo?.description)
        ?? nullToUndefined(individual.basics?.description)
        ?? undefined

    const heroImage = getMediaUrl(individual.seo?.image) ?? imageUrl

    return (
        <main className="w-full">
            <HeroSection
                id="individual-hero"
                title={fullName}
                subtitle={nullToUndefined(individual.basics?.type) ?? 'Individual'}
                description={heroDescription}
                backgroundImage={heroImage}
                badge="PROFILE"
                meta={nullToUndefined(individual.slug) ?? undefined}
            />
            <StudySection
                id="individual-details"
                title="PROFILE DETAILS"
                subtitle="Contributor information"
                studies={[study]}
                ctaLabel="VIEW DIRECTORY"
                ctaPath="/individuals"
                headerVariant={1}
                footerVariant={1}
            />
        </main>
    )
}