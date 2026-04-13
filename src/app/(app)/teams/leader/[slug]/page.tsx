import { DESIGN_SYSTEM } from '@/lib/constants';

async function getLeaderData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    if (!url) throw new Error("PAYLOAD_URL is not defined");

    const leaderRes = await fetch(
        `${url}/api/leaders?where[slug][equals]=${slug}&depth=2`
    ).then((res) => res.json());

    const leader = leaderRes.docs?.[0];
    if (!leader) return null;

    const awardsRes = await fetch(
        `${url}/api/awards?where[recipients.leaders][contains]=${leader.id}`
    ).then((res) => res.json());

    return {
        leader,
        awards: awardsRes.docs || []
    };
}

export default async function LeaderDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getLeaderData(slug);

    if (!data) return null;

    return (
        <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }} className="min-h-screen">
            {/* <IdentitySection leader={data.leader} />
      <BiographySection leader={data.leader} />
      <PrinciplesSection leader={data.leader} />
      <AwardsSection awards={data.awards} /> */}
        </main>
    );
}