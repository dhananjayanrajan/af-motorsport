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
            depth: 1,
            select: {
                id: true,
                name: true,
                basics: {
                    tagline: true,
                    description: true,
                    identifiers: { chassis: true },
                },
                assets: {
                    cover: true,
                    documents: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    status: true,
                    manufacturers: true,
                    classifications: {
                        list: true,
                    },
                    specifications: {
                        list: true,
                    },
                },
            },
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

    const heroBackgroundImage = getMediaUrl(car.assets?.cover) || getMediaUrl(car.seo?.image)

    const manufacturerEntries = (car.details?.manufacturers || [])
        .filter((m): m is Organization => typeof m === 'object' && m !== null && 'name' in m)
        .map((m) => ({
            id: String(m.id),
            title: m.name || '',
            subtitle: m.basics?.type || m.basics?.industry || undefined,
            href: `/organizations/${m.slug}`,
        }))

    const classificationEntries = (car.details?.classifications?.list || [])
        .filter((c) => c.name)
        .map((c, idx) => ({
            id: c.id || String(idx),
            title: c.name || '',
            subtitle: c.description || c.criteria || c.definition || undefined,
        }))

    const specItems = (car.details?.specifications?.list || [])
        .filter((s) => s.parameter)
        .map((s, idx) => ({
            id: s.id || String(idx),
            title: s.parameter || '',
            subtitle: s.value || s.description || undefined,
        }))

    const documentItems = (car.assets?.documents || [])
        .map((doc, idx) => {
            const media = typeof doc === 'object' ? doc : null
            const url = getMediaUrl(media)
            if (!url || !media) return null
            return {
                id: String(media.id),
                title: media.alt || media.filename || `Document ${idx + 1}`,
                subtitle: media.mimeType || undefined,
                image: url,
                href: url,
            }
        })
        .filter((d): d is NonNullable<typeof d> => d !== null)

    return (
        <main className="w-full">
            <HeroSection
                id="car-details-cover"
                title={car.name || ''}
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
                    labels={{
                        statusPrefix: 'TYPE',
                        timePrefix: 'TIME',
                        indexPrefix: 'MFR',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            {classificationEntries.length > 0 && (
                <ListSection
                    id="car-classifications"
                    title="Classifications"
                    subtitle="Vehicle categories"
                    entries={classificationEntries}
                    labels={{
                        statusPrefix: 'STAT',
                        timePrefix: 'TIME',
                        indexPrefix: 'CLS',
                    }}
                    showStatus={false}
                    showTimestamp={false}
                />
            )}
            {specItems.length > 0 && (
                <GridSection
                    id="car-specifications"
                    title="Specifications"
                    subtitle="Technical details"
                    items={specItems}
                    labels={{
                        unitsCount: 'SPEC',
                        viewProject: 'VIEW',
                        sectionIndex: 'SPC',
                        fallbackAlt: 'Spec',
                    }}
                    columns={3}
                />
            )}
            {documentItems.length > 0 && (
                <GridSection
                    id="car-documents"
                    title="Documents"
                    subtitle="Technical documentation"
                    items={documentItems}
                    labels={{
                        unitsCount: 'DOCS',
                        viewProject: 'VIEW',
                        sectionIndex: 'DOC',
                        fallbackAlt: 'Document',
                    }}
                    columns={3}
                />
            )}
        </main>
    )
}