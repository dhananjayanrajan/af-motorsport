import CapabilitiesSection from './sections/CapabilitiesSection'
import GuidingPrinciples from './sections/GuidingPrinciples'
import VisionMissionSection from './sections/VisionMissionSection'

async function getLeaderData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL
    const leaderRes = await fetch(`${url}/api/leaders?where[slug][equals]=${slug}&limit=1`).then((res) => res.json())

    if (!leaderRes.docs.length) return null

    const leader = leaderRes.docs[0]

    const [skills, awards] = await Promise.all([
        fetch(`${url}/api/skills?where[categories][in]=${leader.id}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/awards?where[categories][in]=${leader.id}&limit=100`).then((res) => res.json()),
    ])

    return {
        leader,
        skills: skills.docs,
        awards: awards.docs
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getLeaderData(params.slug)

    if (!data) return null

    return (
        <main className="bg-black min-h-screen">
            <VisionMissionSection
                leader={data.leader}
            />
            <GuidingPrinciples
                leader={data.leader}
            />
            <CapabilitiesSection
                skills={data.skills}
                awards={data.awards}
            />
        </main>
    )
}