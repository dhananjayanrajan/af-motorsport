import { DESIGN_SYSTEM } from '@/lib/constants';

async function getOrganizationData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    if (!url) throw new Error("PAYLOAD_URL is not defined");

    const res = await fetch(
        `${url}/api/organizations?where[slug][equals]=${slug}&depth=2`
    ).then((res) => res.json());

    return res.docs?.[0] || null;
}

export default async function OrganizationDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const organization = await getOrganizationData(slug);

    if (!organization) return null;

    return (
        <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }} className="min-h-screen">
            {/* <IdentitySection organization={organization} />
      <BenefitsSection organization={organization} />
      <LinksSection organization={organization} /> */}
        </main>
    );
}