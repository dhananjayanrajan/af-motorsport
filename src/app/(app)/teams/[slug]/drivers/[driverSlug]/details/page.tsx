// app/(frontend)/teams/[teamSlug]/drivers/[driverSlug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import TableSection from '@/components/Section/Blocks/TableSection'
import { Award, Media, Point, Result, Skill } from '@/payload-types'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

function getMediaUrl(media: number | Media | null | undefined): string | undefined {
    if (!media) return undefined
    if (typeof media === 'object' && 'url' in media && media.url) return media.url
    return undefined
}

const getDriverDetailsData = unstable_cache(
    async (slug: string) => {
        const payload = await getPayload({ config: configPromise })
        const result = await payload.find({
            collection: 'drivers',
            where: { slug: { equals: slug } },
            limit: 1,
        })
        return result.docs[0] || null
    },
    ['driver-details'],
    { revalidate: 3600, tags: ['driver-details'] }
)

export default async function DriverDetailsPage({ params }: { params: Promise<{ teamSlug: string; driverSlug: string }> }) {
    const { driverSlug } = await params
    const driver = await getDriverDetailsData(driverSlug)

    if (!driver) notFound()

    const heroBackgroundImage = driver.assets?.cover
        ? getMediaUrl(driver.assets.cover)
        : driver.assets?.avatar
            ? getMediaUrl(driver.assets.avatar)
            : driver.seo?.image
                ? getMediaUrl(driver.seo.image)
                : undefined

    const quoteItem = driver.basics?.catchphrase
        ? {
            id: String(driver.id),
            text: driver.basics.catchphrase,
            author: `${driver.first_name} ${driver.last_name}`,
        }
        : null

    const specItems: any[] = [
        {
            id: 'racing-number',
            title: 'Racing Number',
            subtitle: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : 'N/A',
        },
        {
            id: 'nickname',
            title: 'Nickname',
            subtitle: driver.basics?.nickname || 'N/A',
        },
        {
            id: 'callsign',
            title: 'Callsign',
            subtitle: driver.basics?.callsign || 'N/A',
        },
        {
            id: 'birth-date',
            title: 'Birth Date',
            subtitle: driver.basics?.birth_date || 'N/A',
        },
        {
            id: 'debut-date',
            title: 'Debut Date',
            subtitle: driver.basics?.debut_date || 'N/A',
        },
        {
            id: 'nationality',
            title: 'Nationality',
            subtitle: driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality ? driver.basics.nationality.name : 'N/A',
        },
    ]

    const skillItems: any[] = []
    if (driver.details?.skills) {
        driver.details.skills.forEach((skillRef) => {
            const skill = skillRef as Skill
            if (skill && typeof skill === 'object' && 'name' in skill) {
                skillItems.push({
                    id: String(skill.id),
                    title: skill.name,
                    subtitle: skill.details?.depth || skill.details?.complexity || skill.basics?.description || undefined,
                })
            }
        })
    }

    const awardItems: any[] = []
    if (driver.details?.awards) {
        driver.details.awards.forEach((awardRef) => {
            const award = awardRef as Award
            if (award && typeof award === 'object' && 'name' in award) {
                const imageUrl = award.assets?.thumbnail
                    ? getMediaUrl(award.assets.thumbnail)
                    : award.assets?.candid
                        ? getMediaUrl(award.assets.candid)
                        : undefined

                awardItems.push({
                    id: String(award.id),
                    title: award.name,
                    subtitle: award.details?.awarded_date || award.basics?.description || undefined,
                    image: imageUrl,
                })
            }
        })
    }

    const tableColumns = [
        { key: 'event', label: 'Event', sortable: true },
        { key: 'position', label: 'Position', sortable: true },
        { key: 'points', label: 'Points', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
    ]

    const tableRows: any[] = []
    if (driver.details?.results) {
        driver.details.results.slice(0, 10).forEach((resultRef) => {
            const result = resultRef as Result
            if (result && typeof result === 'object' && 'name' in result) {
                let pointsValue = 'N/A'
                if (driver.details?.points) {
                    const pointRef = driver.details.points[0] as Point
                    if (pointRef && typeof pointRef === 'object' && 'details' in pointRef) {
                        pointsValue = pointRef.details?.value ? String(pointRef.details.value) : 'N/A'
                    }
                }

                tableRows.push({
                    id: String(result.id),
                    cells: {
                        event: result.name,
                        position: result.details?.overall ? String(result.details.overall) : 'N/A',
                        points: pointsValue,
                        status: result.details?.status || 'N/A',
                    },
                })
            }
        })
    }

    const socialItems: any[] = []
    if (driver.details?.socials?.list) {
        driver.details.socials.list.forEach((social) => {
            if (social.platform && social.username) {
                socialItems.push({
                    id: social.id || `${social.platform}-${social.username}`,
                    title: social.platform,
                    subtitle: `@${social.username}`,
                })
            }
        })
    }

    return (
        <main className="w-full">
            <HeroSection
                id="driver-details-cover"
                title={`${driver.first_name} ${driver.last_name}`}
                subtitle={driver.basics?.competition_name || driver.basics?.nickname || ''}
                description={driver.basics?.callsign || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={driver.basics?.racing_number ? `#${driver.basics.racing_number}` : undefined}
            />
            {quoteItem && (
                <QuoteSection
                    id="driver-catchphrase"
                    title="Catchphrase"
                    subtitle="In their own words"
                    quotes={[quoteItem]}
                    variant="grid"
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            <GridSection
                id="driver-specifications"
                title="Specifications"
                subtitle="Driver details"
                items={specItems}
                columns={3}
                cardVariant={1}
                headerVariant={1}
                footerVariant={1}
            />
            {skillItems.length > 0 && (
                <GridSection
                    id="driver-skills"
                    title="Skills"
                    subtitle="Driver capabilities"
                    items={skillItems}
                    columns={4}
                    cardVariant={1}
                    headerVariant={3}
                    footerVariant={2}
                />
            )}
            {awardItems.length > 0 && (
                <GridSection
                    id="driver-awards"
                    title="Awards"
                    subtitle="Career achievements"
                    items={awardItems}
                    columns={3}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {tableRows.length > 0 && (
                <TableSection
                    id="driver-results"
                    title="Points & Results"
                    subtitle="Performance history"
                    columns={tableColumns}
                    rows={tableRows}
                    headerVariant={2}
                    footerVariant={1}
                />
            )}
            {socialItems.length > 0 && (
                <GridSection
                    id="driver-socials"
                    title="Social Media"
                    subtitle="Connect with the driver"
                    items={socialItems}
                    columns={4}
                    cardVariant={1}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}