import IncidentMediaGallery from '../../../OLD/sections/IncidentMediaGallery';
import IncidentNarrative from '../../../OLD/sections/IncidentNarrative';

async function getIncidentData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/incidents?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    return { incident: res.docs[0] };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getIncidentData(params.slug);

    if (!data.incident) return null;

    return (
        <main className="bg-black min-h-screen">
            <IncidentNarrative
                incident={data.incident}
            />

            <IncidentMediaGallery
                incident={data.incident}
            />
        </main>
    );
}