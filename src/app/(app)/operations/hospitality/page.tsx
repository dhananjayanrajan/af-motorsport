import { DESIGN_SYSTEM } from '@/lib/constants';

async function getHospitalityData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/hospitalities?where[slug][equals]=${slug}&depth=2`).then(res => res.json());
    return res.docs?.[0] || null;
}

export default async function HospitalityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getHospitalityData(slug);
    if (!data) return null;

    return (
        <main style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC_950 }} className="min-h-screen">
            {/* <IdentitySection hospitality={data} />
      <InclusionsSection inclusions={data.inclusions} />
      <ExclusionsSection exclusions={data.exclusions} />
      <RequirementsSection requirements={data.requirements} />
      <GallerySection media={data.assets?.gallery} /> */}
        </main>
    );
}