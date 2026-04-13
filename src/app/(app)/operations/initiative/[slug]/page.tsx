import InitiativeExpectations from '../../../OLD/sections/InitiativeExpectations';
import InitiativeStakeholders from '../../../OLD/sections/InitiativeStakeholders';
import InitiativeTimeline from '../../../OLD/sections/InitiativeTimeline';

async function getInitiativeData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/initiatives?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    return { initiative: res.docs[0] };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { initiative } = await getInitiativeData(params.slug);

    if (!initiative) return null;

    return (
        <main className="bg-black min-h-screen">
            <InitiativeTimeline
                initiative={initiative}
            />

            <InitiativeExpectations
                initiative={initiative}
            />

            <InitiativeStakeholders
                initiative={initiative}
            />
        </main>
    );
}