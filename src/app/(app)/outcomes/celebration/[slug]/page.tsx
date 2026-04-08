import CelebrationMediaGallery from './sections/CelebrationMediaGallery';
import CelebrationStoryParticipants from './sections/CelebrationStoryParticipants';

async function getCelebrationData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/celebrations?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    const celebration = res.docs[0];

    const [leaders, drivers] = await Promise.all([
        fetch(`${url}/api/leaders`).then(res => res.json()),
        fetch(`${url}/api/drivers`).then(res => res.json())
    ]);

    return { celebration, people: { leaders: leaders.docs, drivers: drivers.docs } };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getCelebrationData(params.slug);

    if (!data.celebration) return null;

    return (
        <main className="bg-black min-h-screen">
            <CelebrationStoryParticipants
                celebration={data.celebration}
            />

            <CelebrationMediaGallery
                celebration={data.celebration}
            />
        </main>
    );
}