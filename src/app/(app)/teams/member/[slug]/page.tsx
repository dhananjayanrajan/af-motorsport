import { DESIGN_SYSTEM } from '@/lib/constants';

async function getMemberData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    if (!url) throw new Error("PAYLOAD_URL is not defined");

    const memberRes = await fetch(
        `${url}/api/members?where[slug][equals]=${slug}&depth=2`
    ).then((res) => res.json());

    const member = memberRes.docs?.[0];
    if (!member) return null;

    const trainingRes = await fetch(
        `${url}/api/trainings?where[attendees.members][contains]=${member.id}`
    ).then((res) => res.json());

    return {
        member,
        trainings: trainingRes.docs || []
    };
}

export default async function MemberDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getMemberData(slug);

    if (!data) return null;

    return (
        <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }} className="min-h-screen">
            {/* <IdentitySection member={data.member} />
      <SkillsSection skills={data.member.skills} />
      <TrainingSection trainings={data.trainings} /> */}
        </main>
    );
}