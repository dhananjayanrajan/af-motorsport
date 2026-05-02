// app/(frontend)/individuals/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import ListSection from '@/components/Section/Blocks/ListSection'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
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

const getIndividualsData = unstable_cache(
    async () => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'individuals',
            limit: 24,
            depth: 1,
            sort: '-createdAt',
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
            },
        })
        return result.docs
    },
    ['individuals-page-data'],
    { revalidate: 120, tags: ['individuals'] }
)

export default async function IndividualsPage() {
    const individuals = await getIndividualsData()

    const mentors = individuals.filter(
        (i) => i.basics?.type === 'mentor' || i.basics?.type === 'advisor'
    )
    const others = individuals.filter(
        (i) => i.basics?.type !== 'mentor' && i.basics?.type !== 'advisor'
    )

    const mentorsGrid = mentors.map((i) => ({
        id: String(i.id),
        title: `${i.first_name} ${i.last_name}`,
        subtitle: nullToUndefined(i.basics?.type) ?? nullToUndefined(i.basics?.description) ?? '',
        image: getMediaUrl(i.assets?.avatar) ?? getMediaUrl(i.assets?.thumbnail),
        href: `/individuals/${i.slug}`,
        category: i.basics?.is_contact ? 'CONTACT' : undefined,
    }))

    const othersList = others.map((i) => ({
        id: String(i.id),
        title: `${i.first_name} ${i.last_name}`,
        subtitle: nullToUndefined(i.basics?.description) ?? '',
        tag: nullToUndefined(i.basics?.type) ?? undefined,
        href: `/individuals/${i.slug}`,
        status: i.basics?.is_contact ? 'CONTACT' : undefined,
        image: getMediaUrl(i.assets?.avatar) ?? getMediaUrl(i.assets?.thumbnail),
    }))

    return (
        <main className="w-full">
            <HeroSection
                id="individuals-hero"
                title="INDIVIDUALS"
                subtitle="Mentors, Advisors & Consultants"
                description="External contributors, guest speakers, interns, and subject matter experts."
                badge="CONTACTS"
                meta="IND_IDX"
            />
            {mentorsGrid.length > 0 && (
                <GridSection
                    id="individuals-mentors"
                    title="MENTORS & ADVISORS"
                    subtitle="Programme contributors"
                    items={mentorsGrid}
                    labels={{
                        unitsCount: 'PEOPLE',
                        viewProject: 'PROFILE',
                        sectionIndex: 'MENTORS',
                        fallbackAlt: 'Individual',
                    }}
                    columns={4}
                />
            )}
            {othersList.length > 0 && (
                <ListSection
                    id="individuals-all"
                    title="ALL INDIVIDUALS"
                    subtitle="Complete directory"
                    entries={othersList}
                    labels={{
                        statusPrefix: 'ROLE',
                        timePrefix: 'TYPE',
                        indexPrefix: 'ID',
                    }}
                    showStatus
                />
            )}
        </main>
    )
}