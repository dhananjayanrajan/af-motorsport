import { DESIGN_SYSTEM } from '@/lib/constants';

async function getIndividualData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    if (!url) throw new Error("PAYLOAD_URL is not defined");

    const individualRes = await fetch(
        `${url}/api/individuals?where[slug][equals]=${slug}&depth=2`
    ).then((res) => res.json());

    const individual = individualRes.docs?.[0];
    if (!individual) return null;

    const [interviews, onboardings] = await Promise.all([
        fetch(`${url}/api/interviews?where[individual][equals]=${individual.id}`).then((res) => res.json()),
        fetch(`${url}/api/onboardings?where[individual][equals]=${individual.id}`).then((res) => res.json())
    ]);

    return {
        individual,
        interviews: interviews.docs || [],
        onboardings: onboardings.docs || []
    };
}

export default async function IndividualDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getIndividualData(slug);

    if (!data) return null;

    return (
        <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }} className="min-h-screen">
            {/* <IdentitySection individual={data.individual} />
            <InterviewsSection interviews={data.interviews} />
            <OnboardingSection onboardings={data.onboardings} /> */}
        </main>
    );
}