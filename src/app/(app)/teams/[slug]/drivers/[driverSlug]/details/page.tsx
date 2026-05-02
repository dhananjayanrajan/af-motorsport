// app/(frontend)/teams/[teamSlug]/drivers/[driverSlug]/details/page.tsx
import GridSection from '@/components/Section/Blocks/GridSection'
import HeroSection from '@/components/Section/Blocks/HeroSection'
import LeaderboardSection from '@/components/Section/Blocks/LeaderboardSection'
import QuoteSection from '@/components/Section/Blocks/QuoteSection'
import { Award, Media, Result, Skill } from '@/payload-types'
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
            depth: 1,
            select: {
                id: true,
                first_name: true,
                last_name: true,
                slug: true,
                basics: {
                    competition_name: true,
                    nickname: true,
                    callsign: true,
                    racing_number: true,
                    catchphrase: true,
                    birth_date: true,
                    debut_date: true,
                    nationality: true,
                },
                assets: {
                    cover: true,
                    avatar: true,
                },
                seo: {
                    image: true,
                },
                details: {
                    skills: true,
                    awards: true,
                    results: true,
                    points: true,
                    socials: {
                        list: true,
                    },
                },
            },
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

    const driverFullName = `${driver.first_name || ''} ${driver.last_name || ''}`.trim() || 'Unnamed Driver'

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
            author: driverFullName,
        }
        : null

    const specItems: any[] = [
        { id: 'racing-number', title: 'Racing Number', subtitle: driver.basics?.racing_number ? `#${driver.basics.racing_number}` : 'N/A' },
        { id: 'nickname', title: 'Nickname', subtitle: driver.basics?.nickname || 'N/A' },
        { id: 'callsign', title: 'Callsign', subtitle: driver.basics?.callsign || 'N/A' },
        { id: 'birth-date', title: 'Birth Date', subtitle: driver.basics?.birth_date || 'N/A' },
        { id: 'debut-date', title: 'Debut Date', subtitle: driver.basics?.debut_date || 'N/A' },
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

    const leaderboardEntries: any[] = []
    if (driver.details?.results) {
        driver.details.results.forEach((resultRef, idx) => {
            const result = resultRef as Result
            if (result && typeof result === 'object' && 'name' in result) {
                let pointsValue: string | number | undefined = undefined
                if (driver.details?.points) {
                    const pointRef = driver.details.points[idx] as any
                    if (pointRef && typeof pointRef === 'object' && 'details' in pointRef) {
                        pointsValue = pointRef.details?.value ?? undefined
                    }
                }

                leaderboardEntries.push({
                    id: String(result.id),
                    position: result.details?.overall || idx + 1,
                    name: result.name,
                    team: result.details?.status || undefined,
                    points: pointsValue ?? undefined,
                    image: undefined,
                    slug: undefined,
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
                title={driverFullName}
                subtitle={driver.basics?.competition_name || driver.basics?.nickname || ''}
                description={driver.basics?.callsign || undefined}
                backgroundImage={heroBackgroundImage}
                alignment="center"
                badge={driver.basics?.racing_number ? `#${driver.basics.racing_number}` : undefined}
                meta={driver.basics?.nationality && typeof driver.basics.nationality === 'object' && 'name' in driver.basics.nationality ? driver.basics.nationality.name : undefined}
            />
            {quoteItem && (
                <QuoteSection
                    id="driver-catchphrase"
                    title="Catchphrase"
                    subtitle="In their own words"
                    quotes={[quoteItem]}
                    labels={{
                        commStatus: 'COMM',
                        ratingLabel: 'RATING',
                    }}
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
                labels={{
                    unitsCount: 'SPEC',
                    viewProject: 'VIEW',
                    sectionIndex: 'SPC',
                    fallbackAlt: 'Spec',
                }}
                columns={3}
                headerVariant={1}
                footerVariant={1}
            />
            {skillItems.length > 0 && (
                <GridSection
                    id="driver-skills"
                    title="Skills"
                    subtitle="Driver capabilities"
                    items={skillItems}
                    labels={{
                        unitsCount: 'SKL',
                        viewProject: 'VIEW',
                        sectionIndex: 'SKL',
                        fallbackAlt: 'Skill',
                    }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {awardItems.length > 0 && (
                <GridSection
                    id="driver-awards"
                    title="Awards"
                    subtitle="Career achievements"
                    items={awardItems}
                    labels={{
                        unitsCount: 'AWD',
                        viewProject: 'VIEW',
                        sectionIndex: 'AWD',
                        fallbackAlt: 'Award',
                    }}
                    columns={3}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
            {leaderboardEntries.length > 0 && (
                <LeaderboardSection
                    id="driver-results"
                    title="RESULTS"
                    subtitle="Performance history"
                    entries={leaderboardEntries}
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
                    labels={{
                        unitsCount: 'SOC',
                        viewProject: 'VIEW',
                        sectionIndex: 'SOC',
                        fallbackAlt: 'Social',
                    }}
                    columns={4}
                    headerVariant={1}
                    footerVariant={1}
                />
            )}
        </main>
    )
}