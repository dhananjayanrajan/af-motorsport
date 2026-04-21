import CentralMedia from '@/components/Section/CentralMedia'
import DirectoryGrid from '@/components/Section/DirectoryGrid'
import GalleryGrid from '@/components/Section/GalleryGrid'
import InfoGrid from '@/components/Section/InfoGrid'
import ProgressScroller from '@/components/Section/ProgressScroller'
import VideoPlayer from '@/components/Section/VideoPlayer'
import { Celebration, Interview, Leader, Media } from '@/payload-types'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

interface PageProps {
    params: Promise<{
        slug: string
        leaderSlug: string
    }>
}

async function getLeader(slug: string): Promise<Leader | null> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'leaders',
        where: {
            slug: {
                equals: slug,
            },
        },
        depth: 2,
    })
    return docs[0] || null
}

async function getCelebrationsForLeader(leaderId: number): Promise<Celebration[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'celebrations',
        where: {
            'details.leaders': {
                in: [leaderId],
            },
        },
        limit: 20,
    })
    return docs
}

async function getInterviewsForLeader(leaderId: number): Promise<Interview[]> {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
        collection: 'interviews',
        where: {
            'details.interviewee': {
                equals: leaderId,
            },
        },
        limit: 20,
    })
    return docs
}

export default async function LeaderPage({ params }: PageProps) {
    const { leaderSlug } = await params
    const leader = await getLeader(leaderSlug)

    if (!leader) {
        return notFound()
    }

    const videoAsset = leader.assets?.gallery?.[0] && typeof leader.assets.gallery[0] === 'object'
        ? leader.assets.gallery[0] as Media
        : null

    const posterAsset = leader.assets?.avatar && typeof leader.assets.avatar === 'object'
        ? leader.assets.avatar as Media
        : null

    const autographImage = leader.assets?.avatar && typeof leader.assets.avatar === 'object'
        ? leader.assets.avatar as Media
        : null

    const celebrations = await getCelebrationsForLeader(leader.id)
    const interviews = await getInterviewsForLeader(leader.id)

    const infoBlocks = [
        {
            id: 'identity',
            label: 'IDENTITY',
            title: `${leader.first_name} ${leader.last_name}`,
            description: leader.basics?.nickname || leader.basics?.title || undefined,
            metadata: [
                { key: 'TITLE', value: leader.basics?.title || 'Leader' },
                { key: 'NATIONALITY', value: leader.basics?.nationality && typeof leader.basics.nationality === 'object' ? (leader.basics.nationality as { name: string }).name : 'TBD' },
                { key: 'GENDER', value: leader.basics?.gender || 'Undisclosed' },
            ]
        },
        {
            id: 'career',
            label: 'CAREER',
            title: leader.basics?.debut_date ? 'ACTIVE' : 'PENDING',
            description: 'Leadership career',
            metadata: [
                { key: 'DEBUT', value: leader.basics?.debut_date?.split('-')[0] || 'TBD' },
                { key: 'RETIREMENT', value: leader.basics?.retirement_date?.split('-')[0] || 'Active' },
            ]
        },
    ]

    const historySteps = []

    if (leader.basics?.debut_date) {
        historySteps.push({
            id: 'debut',
            index: '01',
            heading: 'Leadership Debut',
            subheading: leader.basics.debut_date.split('-')[0],
            body: leader.details?.mission || leader.details?.vision || 'Leadership journey began',
            percentage: 100
        })
    }

    if (leader.basics?.birth_date) {
        historySteps.push({
            id: 'birth',
            index: '02',
            heading: 'Date of Birth',
            subheading: leader.basics.birth_date,
            body: leader.basics?.nickname || undefined,
            percentage: 100
        })
    }

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

    const interviewItems = interviews.map(interview => ({
        id: interview.id.toString(),
        title: interview.name,
        subtitle: interview.basics?.tagline || interview.basics?.summary || undefined,
        label: interview.details?.format?.toUpperCase() || 'INTERVIEW',
        image: interview.assets?.thumbnail && typeof interview.assets.thumbnail === 'object' ? interview.assets.thumbnail as Media : null,
        href: `/interviews/${interview.slug}`,
        metadata: [
            { label: 'DATE', value: interview.details?.recorded_date?.split('T')[0] || interview.details?.published_date?.split('T')[0] || 'TBD' },
            { label: 'ACCESS', value: interview.details?.access || 'Public' },
        ]
    }))

    const galleryItems = leader.assets?.gallery?.filter((item): item is Media =>
        typeof item === 'object' && item !== null && 'url' in item
    ).map(item => ({
        id: item.id.toString(),
        image: item,
        title: item.filename || 'Gallery Image',
        category: leader.basics?.title?.toUpperCase() || 'LEADER'
    })) || []

    return (
        <main className="w-full">
            <VideoPlayer
                id={`LDR-${leader.id}`}
                title={`${leader.first_name} ${leader.last_name}`}
                meta={leader.basics?.nickname || leader.basics?.title || 'Leader'}
                video={videoAsset}
                poster={posterAsset}
                tags={[
                    leader.basics?.gender || 'Leader',
                    leader.basics?.title?.toUpperCase() || 'EXECUTIVE'
                ]}
            />

            <InfoGrid
                id="LDR_SPECS"
                title="Leader Specifications"
                blocks={infoBlocks}
                columns={2}
            />

            {autographImage && (
                <CentralMedia
                    id="LDR_AUTOGRAPH"
                    title="Leader Signature"
                    meta={leader.basics?.nickname || 'Leadership'}
                    image={autographImage}
                    tags={['SIGNATURE', leader.basics?.title?.toUpperCase() || 'LEADER']}
                />
            )}

            {historySteps.length > 0 && (
                <ProgressScroller
                    id="LDR_HISTORY"
                    title="Leadership History"
                    steps={historySteps}
                />
            )}

            {galleryItems.length > 0 && (
                <GalleryGrid
                    id="LDR_GALLERY"
                    title="Leader Gallery"
                    items={galleryItems}
                />
            )}

            {celebrationItems.length > 0 && (
                <DirectoryGrid
                    id="LDR_CELEBRATIONS"
                    title="Celebrations"
                    items={celebrationItems}
                    variant="square"
                />
            )}

            {interviewItems.length > 0 && (
                <DirectoryGrid
                    id="LDR_INTERVIEWS"
                    title="Interviews"
                    items={interviewItems}
                    variant="portrait"
                />
            )}
        </main>
    )
}