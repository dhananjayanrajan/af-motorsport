import AwardMediaGallery from './sections/AwardMediaGallery';
import AwardStoryCitation from './sections/AwardStoryCitation';

async function getAwardData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/awards?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    return { award: res.docs[0] };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const data = await getAwardData(params.slug);

    if (!data.award) return null;

    return (
        <main className="bg-black min-h-screen">
            <AwardStoryCitation
                award={data.award}
            />

            <AwardMediaGallery
                award={data.award}
            />
        </main>
    );
}