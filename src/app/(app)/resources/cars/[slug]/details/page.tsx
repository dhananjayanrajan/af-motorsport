// app/(frontend)/resources/cars/[slug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
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

const getCarDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'cars',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['car-details'],
    { revalidate: 3600, tags: ['car-details'] }
)

export default async function CarDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const car = await getCarDetailsData(slug)

    if (!car) notFound()

    const heroBackgroundImage = car.assets?.cover
        ? getMediaUrl(car.assets.cover)
        : car.seo?.image
            ? getMediaUrl(car.seo.image)
            : undefined

    const manufacturerEntries: any[] = []
    if (car.details?.manufacturers) {
        car.details.manufacturers.forEach((manufacturerRef) => {
            const manufacturer = manufacturerRef as Organization
            if (manufacturer && typeof manufacturer === 'object' && 'name' in manufacturer) {
                manufacturerEntries.push({
                    id: String(manufacturer.id),
                    title: manufacturer.name,
                    subtitle: manufacturer.basics?.type || manufacturer.basics?.industry || undefined,
                    href: `/organizations/${manufacturer.slug}`,
                })
            }
        })
    }

    const classificationEntries: any[] = []
    if (car.details?.classifications?.list) {
        car.details.classifications.list.forEach((classification) => {
            if (classification.name) {
                classificationEntries.push({
                    id: classification.id || String(Math.random()),
                    title: classification.name,
                    subtitle: classification.description || classification.criteria || classification.definition || undefined,
                })
            }
        })
    }

    const specItems: any[] = []
    if (car.details?.specifications?.list) {
        car.details.specifications.list.forEach((spec) => {
            if (spec.parameter) {
                specItems.push({
                    id: spec.id || String(Math.random()),
                    title: spec.parameter,
                    subtitle: spec.value || spec.description || undefined,
                })
            }
        })
    }

    const documentItems: any[] = []
    if (car.assets?.documents) {
        car.assets.documents.forEach((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = media ? getMediaUrl(media) : undefined
            if (url && media) {
                documentItems.push({
                    id: String(media.id),
                    title: media.alt || media.filename || `Document ${idx + 1}`,
                    subtitle: media.mimeType || undefined,
                    image: url,
                    href: url,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="car-details-cover"
                title={car.name}
                subtitle={car.basics?.tagline || 'Car Specifications'}
                description={car.basics?.description || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={car.basics?.identifiers?.chassis || car.details?.status || undefined}
            />
            {manufacturerEntries.length > 0 && (
                <ListSection
                    id="car-manufacturers"
                    title="Manufacturers"
                    subtitle="Builders and constructors"
                    entries={manufacturerEntries}
                    variant="detailed"
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {classificationEntries.length > 0 && (
                <ListSection
                    id="car-classifications"
                    title="Classifications"
                    subtitle="Vehicle categories"
                    entries={classificationEntries}
                    variant="detailed"
                    showStatus={false}
                    showTimestamp={false}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {specItems.length > 0 && (
                <GridSection
                    id="car-specifications"
                    title="Specifications"
                    subtitle="Technical details"
                    items={specItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="car-documents"
                    title="Documents"
                    subtitle="Technical documentation"
                    items={documentItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}