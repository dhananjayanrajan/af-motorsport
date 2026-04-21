import DirectoryGrid from '@/components/Section/DirectoryGrid'
import HeroMedia from '@/components/Section/HeroMedia'
import PullQuote from '@/components/Section/PullQuote'
import StatsGrid from '@/components/Section/StatsGrid'
import { Award, Driver, Media, Skill } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
        driverSlug: string
    }>
}

async function getDriver(slug: string): Promise<Driver | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'drivers',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

async function getDriverAwards(driverId: number): Promise<Award[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'awards',
        where: {
            id: {
                exists: true,
            },
        },
        limit: 20,
    })
    return docs.filter(award => award.details?.awarded_date)
}

export default async function DriverDetailsPage({ params }: PageProps) {
    const { driverSlug } = await params
    const driver = await getDriver(driverSlug)

    if (!driver) {
        return notFound()
    }

    const coverImage = driver.assets?.cover && typeof driver.assets.cover === 'object'
        ? driver.assets.cover as Media
        : null

    const awards = await getDriverAwards(driver.id)

    const specStats = [
        {
            label: 'RACING NUMBER',
            value: driver.basics?.racing_number?.toString() || '00',
            unit: '',
            description: 'Competition identifier'
        },
        {
            label: 'DEBUT YEAR',
            value: driver.basics?.debut_date?.split('-')[0] || 'TBD',
            unit: '',
            description: 'First professional race'
        },
        {
            label: 'CAREER STATUS',
            value: driver.basics?.retirement_date ? 'RETIRED' : 'ACTIVE',
            unit: '',
            description: driver.basics?.retirement_date ? `Retired ${driver.basics.retirement_date.split('-')[0]}` : 'Currently competing'
        },
    ]

    const skillStats = (driver.details?.skills || []).map(skill => {
        if (typeof skill === 'object' && skill !== null && 'name' in skill) {
            return {
                label: (skill as Skill).name.toUpperCase(),
                value: 'PROFICIENT',
                unit: '',
                description: 'Core competency'
            }
        }
        return null
    }).filter(Boolean) as { label: string; value: string; unit: string; description: string }[]

    if (skillStats.length === 0) {
        skillStats.push(
            { label: 'RACE CRAFT', value: 'ELITE', unit: '', description: 'Racing expertise' },
            { label: 'TECHNICAL', value: 'ADVANCED', unit: '', description: 'Engineering knowledge' },
            { label: 'FITNESS', value: 'PEAK', unit: '', description: 'Physical condition' }
        )
    }

    const awardItems = awards.map(award => ({
        id: award.id.toString(),
        title: award.name,
        subtitle: award.basics?.description || undefined,
        label: award.details?.awarded_date?.split('-')[0] || 'AWARD',
        image: award.assets?.thumbnail && typeof award.assets.thumbnail === 'object' ? award.assets.thumbnail as Media : null,
        href: `/awards/${award.slug}`,
        metadata: [
            { label: 'DATE', value: award.details?.awarded_date?.split('T')[0] || 'TBD' },
        ]
    }))

    const socialItems = driver.details?.socials?.list?.map(social => ({
        id: social.id || `${driver.id}-${social.platform}`,
        title: social.platform || 'Social',
        subtitle: `@${social.username || 'profile'}`,
        label: 'SOCIAL',
        href: social.username ? `https://${social.platform?.toLowerCase()}.com/${social.username}` : undefined,
        metadata: [
            { label: 'PLATFORM', value: social.platform?.toUpperCase() || 'SOCIAL' },
            { label: 'STATUS', value: 'ACTIVE' },
        ]
    })) || []

    return (
        <main className="w-full">
            <HeroMedia
                id={`DRV-${driver.id}`}
                title={`${driver.first_name} ${driver.last_name}`}
                meta={driver.basics?.nickname || driver.basics?.competition_name || 'Driver Profile'}
                image={coverImage}
                tags={[
                    driver.basics?.gender || 'Driver',
                    'Technical Specs'
                ]}
            />

            <PullQuote
                id="DRV_CATCHPHRASE"
                title="Driver Quote"
                quote={driver.basics?.catchphrase || driver.basics?.nickname || 'Racing is life'}
                attribution={`${driver.first_name} ${driver.last_name}`}
                role={driver.basics?.competition_name || 'Professional Driver'}
                variant="center"
            />

            <StatsGrid
                id="DRV_SPECS_STATS"
                title="Career Statistics"
                items={specStats}
                columns={3}
            />

            <StatsGrid
                id="DRV_SKILLS"
                title="Driver Skills"
                items={skillStats}
                columns={3}
            />

            {awardItems.length > 0 && (
                <DirectoryGrid
                    id="DRV_AWARDS"
                    title="Awards & Achievements"
                    items={awardItems}
                    variant="square"
                />
            )}

            <div className="w-full py-20 flex justify-center border-b border-black-pure bg-white-pure">
                <div className="max-w-4xl w-full px-8">
                    <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure mb-8">
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] font-bold tracking-tight text-black-pure">DRV_RESULTS</span>
                            <div className="h-4 w-[1px] bg-neutral-200" />
                            <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">Points & Results</h2>
                        </div>
                    </div>
                    <div className="bg-neutral-50 border-2 border-black-pure p-12 text-center">
                        <p className="font-mono text-sm font-black uppercase text-black-pure">
                            CHART TABLE COMPONENT - RACE RESULTS & POINTS VISUALIZATION
                        </p>
                        <p className="font-mono text-[10px] text-neutral-400 uppercase mt-4">
                            Historical race data and championship points progression
                        </p>
                    </div>
                </div>
            </div>

            {socialItems.length > 0 && (
                <DirectoryGrid
                    id="DRV_SOCIALS"
                    title="Social Media"
                    items={socialItems}
                    variant="square"
                />
            )}
        </main>
    )
}