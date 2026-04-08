import HostsAttendeesSection from './sections/HostsAttendeesSection';
import MediaGallerySection from './sections/MediaGallerySection';
import MeetupSchedule from './sections/MeetupSchedule';

async function getMeetupData(slug: string) {
    const url = process.env.NEXT_PUBLIC_PAYLOAD_URL;
    const res = await fetch(`${url}/api/meetups?where[alias][equals]=${slug}&limit=1`).then(res => res.json());
    return { meetup: res.docs[0] };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { meetup } = await getMeetupData(params.slug);

    if (!meetup) return null;

    return (
        <main className="bg-black min-h-screen">
            <MeetupSchedule
                meetup={meetup}
            />

            <HostsAttendeesSection
                meetup={meetup}
            />

            <MediaGallerySection
                meetup={meetup}
            />
        </main>
    );
}