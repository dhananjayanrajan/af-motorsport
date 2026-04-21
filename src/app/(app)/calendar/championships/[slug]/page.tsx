import VideoSection from './sections/Video'

export const dynamic = 'force-dynamic'

async function safeFetch(url: string) {
    try {
        const res = await fetch(url, { next: { revalidate: 0 } })
        if (!res.ok) return { docs: [], totalDocs: 0 }
        return await res.json()
    } catch (e) {
        console.error('Fetch error:', e)
        return { docs: [], totalDocs: 0 }
    }
}

async function getChampionshipData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL

    if (!url) {
        console.error('NEXT_PUBLIC_PAYLOAD_URL is not defined')
        return {
            championship: null,
            videoUrls: []
        }
    }

    const championshipResult = await safeFetch(`${url}/api/championships?where[slug][equals]=${slug}&limit=1`)
    const championship = championshipResult?.docs?.[0] || null

    const extractVideoUrls = (championship: any) => {
        const urls: string[] = []
        if (championship?.assets?.video) {
            const video = championship.assets.video
            const videoUrl = typeof video === 'object' ? video?.url : video
            if (typeof videoUrl === 'string' && videoUrl) urls.push(videoUrl)
        }
        return urls
    }

    const allVideoUrls = championship ? extractVideoUrls(championship) : []

    return {
        championship,
        videoUrls: allVideoUrls
    }
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const data = await getChampionshipData(slug)

    return (
        <main className="min-h-screen bg-black-pure">
            <VideoSection videoUrls={data.videoUrls} championship={data.championship} />
        </main>
    )
}