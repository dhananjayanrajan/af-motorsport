import DirectoryGrid from '@/components/Section/DirectoryGrid'
import GalleryGrid from '@/components/Section/GalleryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import InfoGrid from '@/components/Section/InfoGrid'
import { Media, Organization, Program } from '@/payload-types'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getProgram(slug: string): Promise<Program | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'programs',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

export default async function ProgramPage({ params }: PageProps) {
    const { slug } = await params
    const program = await getProgram(slug)

    if (!program) {
        return notFound()
    }

    const heroImage = program.assets?.cover && typeof program.assets.cover === 'object'
        ? program.assets.cover as Media
        : null

    const infoBlocks = [
        {
            id: 'overview',
            label: 'PROGRAM',
            title: program.name,
            description: program.basics?.description || program.details?.objective || undefined,
            metadata: [
                { key: 'TYPE', value: program.details?.type?.toUpperCase() || 'DEVELOPMENT' },
                { key: 'STATUS', value: program.details?.status?.toUpperCase() || 'ACTIVE' },
                { key: 'DURATION', value: program.details?.duration?.toUpperCase() || 'TBD' },
            ]
        },
        {
            id: 'timeline',
            label: 'SCHEDULE',
            title: program.details?.start_date ? 'ENROLLMENT OPEN' : 'DATES TBD',
            description: 'Program timeframe',
            metadata: [
                { key: 'START DATE', value: program.details?.start_date?.split('T')[0] || 'TBD' },
                { key: 'END DATE', value: program.details?.end_date?.split('T')[0] || 'TBD' },
            ]
        },
    ]

    const partnerItems = program.details?.partners?.filter((p): p is Organization =>
        typeof p === 'object' && p !== null && 'name' in p
    ).map(partner => ({
        id: partner.id.toString(),
        title: partner.name,
        subtitle: partner.basics?.tagline || partner.basics?.type || undefined,
        label: 'PARTNER',
        image: partner.assets?.logo && typeof partner.assets.logo === 'object' ? partner.assets.logo as Media : null,
        href: `/teams/${partner.slug}`,
        metadata: [
            { label: 'TYPE', value: partner.basics?.type || 'Organization' },
        ]
    })) || []

    const sponsorItems = program.details?.sponsors?.filter((s): s is Organization =>
        typeof s === 'object' && s !== null && 'name' in s
    ).map(sponsor => ({
        id: sponsor.id.toString(),
        title: sponsor.name,
        subtitle: sponsor.basics?.tagline || undefined,
        label: 'SPONSOR',
        image: sponsor.assets?.logo && typeof sponsor.assets.logo === 'object' ? sponsor.assets.logo as Media : null,
        href: `/teams/${sponsor.slug}`,
        metadata: [
            { label: 'INDUSTRY', value: sponsor.basics?.industry || 'TBD' },
        ]
    })) || []

    const allPartnerItems = [...partnerItems, ...sponsorItems]

    const galleryItems = program.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: program.details?.type?.toUpperCase() || 'PROGRAM'
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={program.basics?.identifiers?.code || `PRG-${program.id}`}
                title={program.name}
                meta={program.basics?.tagline || program.details?.objective || 'Development Program'}
                image={heroImage}
                tags={[
                    program.details?.type || 'Program',
                    program.details?.status || 'Active'
                ]}
            />

            <InfoGrid
                id="PRG_SPECS"
                title="Program Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {allPartnerItems.length > 0 && (
                <DirectoryGrid
                    id="PRG_PARTNERS"
                    title="Partners & Sponsors"
                    items={allPartnerItems}
                    variant="square"
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="PRG_GALLERY"
                    title="Program Gallery"
                    items={galleryItems}
                />
            )}

            <section className="w-full py-20 flex justify-center border-b border-black-pure">
                <Link
                    href={`/opportunities/programs/${slug}/details`}
                    className="px-12 py-6 bg-black-pure text-white-pure font-mono text-sm font-bold uppercase tracking-widest hover:bg-primary-500 hover:text-black-pure transition-colors border-2 border-black-pure"
                >
                    View Full Details →
                </Link>
            </section>
        </main>
    )
}