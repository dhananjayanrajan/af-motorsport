import CentralMedia from '@/components/Section/CentralMedia'
import DirectoryGrid from '@/components/Section/DirectoryGrid'
import DirectoryList from '@/components/Section/DirectoryList'
import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Celebration, Driver, Incident, Media, Member } from '@/payload-types'
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

async function getCrewMembers(driverId: number): Promise<Member[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'members',
        where: {
            'details.skills': {
                exists: true,
            },
        },
        limit: 20,
    })
    return docs
}

async function getCelebrationsForDriver(driverId: number): Promise<Celebration[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'celebrations',
        where: {
            'details.drivers': {
                in: [driverId],
            },
        },
        limit: 20,
    })
    return docs
}

async function getIncidentsForDriver(driverId: number): Promise<Incident[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'incidents',
        where: {
            'details.drivers': {
                in: [driverId],
            },
        },
        limit: 20,
    })
    return docs
}

export default async function DriverPage({ params }: PageProps) {
    const { driverSlug } = await params
    const driver = await getDriver(driverSlug)

    if (!driver) {
        return notFound()
    }

    const videoAsset = driver.assets?.gallery?.list?.[0]?.image && typeof driver.assets.gallery.list[0].image === 'object'
        ? driver.assets.gallery.list[0].image as Media
        : null

    const posterAsset = driver.assets?.avatar && typeof driver.assets.avatar === 'object'
        ? driver.assets.avatar as Media
        : null

    const autographImage = driver.assets?.autograph && typeof driver.assets.autograph === 'object'
        ? driver.assets.autograph as Media
        : null

    const crewMembers = await getCrewMembers(driver.id)
    const celebrations = await getCelebrationsForDriver(driver.id)
    const incidents = await getIncidentsForDriver(driver.id)

    const infoBlocks = [
        {
            id: 'identity',
            label: 'IDENTITY',
            title: `${driver.first_name} ${driver.last_name}`,
            description: driver.basics?.nickname || driver.basics?.competition_name || undefined,
            metadata: [
                { key: 'RACING #', value: driver.basics?.racing_number?.toString() || 'TBD' },
                { key: 'NATIONALITY', value: driver.basics?.nationality && typeof driver.basics.nationality === 'object' ? (driver.basics.nationality as { name: string }).name : 'TBD' },
                { key: 'GENDER', value: driver.basics?.gender || 'Undisclosed' },
            ]
        },
        {
            id: 'career',
            label: 'CAREER',
            title: driver.basics?.debut_date ? 'ACTIVE' : 'PENDING',
            description: 'Professional racing career',
            metadata: [
                { key: 'DEBUT', value: driver.basics?.debut_date?.split('-')[0] || 'TBD' },
                { key: 'RETIREMENT', value: driver.basics?.retirement_date?.split('-')[0] || 'Active' },
            ]
        },
    ]

    const historySteps = []

    if (driver.basics?.debut_date) {
        historySteps.push({
            id: 'debut',
            index: '01',
            heading: 'Racing Debut',
            subheading: driver.basics.debut_date.split('-')[0],
            body: driver.basics?.catchphrase || 'Professional career began',
            percentage: 100
        })
    }

    if (driver.basics?.birth_date) {
        historySteps.push({
            id: 'birth',
            index: '02',
            heading: 'Date of Birth',
            subheading: driver.basics.birth_date,
            body: driver.basics?.pronouns ? `Pronouns: ${driver.basics.pronouns}` : undefined,
            percentage: 100
        })
    }

    const crewItems = crewMembers.map(member => ({
        id: member.id.toString(),
        title: `${member.first_name} ${member.last_name}`,
        subtitle: member.basics?.nickname || member.details?.duties || undefined,
        label: 'CREW',
        image: member.assets?.avatar && typeof member.assets.avatar === 'object' ? member.assets.avatar as Media : null,
        href: `/teams/${member.slug}`,
        metadata: [
            { label: 'DUTIES', value: member.details?.duties?.substring(0, 30) || 'Team Member' },
        ]
    }))

    const celebrationItems = celebrations.map(celeb => ({
        id: celeb.id.toString(),
        title: celeb.name,
        subtitle: celeb.basics?.description || undefined,
        label: 'CELEBRATION',
        image: celeb.assets?.thumbnail && typeof celeb.assets.thumbnail === 'object' ? celeb.assets.thumbnail as Media : null,
        href: `/celebrations/${celeb.slug}`,
        metadata: [
            { label: 'DATE', value: celeb.details?.date_time?.split('T')[0] || 'TBD' },
            { label: 'ACCESS', value: celeb.details?.exclusivity || 'Public' },
        ]
    }))

    const incidentListItems = incidents.map(incident => ({
        id: incident.id.toString(),
        title: incident.name,
        subtitle: incident.basics?.description || undefined,
        tag: 'INCIDENT',
        href: `/incidents/${incident.slug}`,
        timestamp: incident.details?.date_time?.split('T')[0] || 'TBD',
        status: 'REVIEWED'
    }))

    const galleryItems = []

    if (driver.assets?.gallery?.list) {
        for (const item of driver.assets.gallery.list) {
            if (item.image && typeof item.image === 'object') {
                galleryItems.push({
                    id: (item.image as Media).id.toString(),
                    image: item.image as Media,
                    title: item.caption || (item.image as Media).filename || 'Gallery Image',
                    category: driver.basics?.competition_name || 'DRIVER'
                })
            }
        }
    }

    return (
        <main className="w-full">
            <VideoPlayer
                id={`DRV-${driver.id}`}
                title={`${driver.first_name} ${driver.last_name}`}
                meta={driver.basics?.nickname || driver.basics?.competition_name || 'Driver'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    driver.basics?.gender || 'Driver',
                    driver.basics?.nationality ? 'Racing' : 'Athlete'
                ]}
            />

            <InfoGrid
                id="DRV_SPECS"
                title="Driver Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {autographImage && (
                <CentralMedia
                    id="DRV_AUTOGRAPH"
                    title="Driver Autograph"
                    meta={driver.basics?.catchphrase || 'Signature'}
                    image={autographImage}
                    tags={['AUTOGRAPH', driver.basics?.competition_name || 'DRIVER']}
                />
            )}

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="DRV_HISTORY"
                    title="Driver History"
                    steps={historySteps}
                />
            )}

            {crewItems.length > 0 && (
                <DirectoryGrid
                    id="DRV_CREW"
                    title="Crew Members"
                    items={crewItems}
                    variant="square"
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="DRV_GALLERY"
                    title="Driver Gallery"
                    items={galleryItems}
                />
            )}

            {celebrationItems.length > 0 && (
                <DirectoryGrid
                    id="DRV_CELEBRATIONS"
                    title="Celebrations"
                    items={celebrationItems}
                    variant="square"
                />
            )}

            {incidentListItems.length > 0 && (
                <DirectoryList
                    id="DRV_INCIDENTS"
                    title="Incidents"
                    items={incidentListItems}
                />
            )}
        </main>
    )
}