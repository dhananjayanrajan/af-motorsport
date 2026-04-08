import DutiesResponsibilities from './sections/DutiesResponsibilities'
import MemberBiography from './sections/MemberBiography'
import SkillsTrainingSection from './sections/SkillsTrainingSection'

async function getMemberData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL
    const memberRes = await fetch(`${url}/api/members?where[slug][equals]=${slug}&limit=1`).then((res) => res.json())

    if (!memberRes.docs.length) return null

    const member = memberRes.docs[0]

    const [skills, trainings] = await Promise.all([
        fetch(`${url}/api/skills?where[categories][in]=${member.id}&limit=100`).then((res) => res.json()),
        fetch(`${url}/api/trainings?where[categories][in]=${member.id}&limit=100`).then((res) => res.json()),
    ])

    return {
        member,
        skills: skills.docs,
        trainings: trainings.docs
    }
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getMemberData(params.slug)

    if (!data) return null

    return (
        <main className="bg-black min-h-screen">
            <DutiesResponsibilities
                member={data.member}
            />
            <SkillsTrainingSection
                skills={data.skills}
                trainings={data.trainings}
            />
            <MemberBiography
                member={data.member}
            />
        </main>
    )
}