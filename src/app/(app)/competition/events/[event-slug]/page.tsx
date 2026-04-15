import LightboxGallery from '@/app/(app)/competition/sections/Gallery';
import { notFound } from 'next/navigation';
import EntryGrid from '../../seasons/[season-slug]/sections/Grid';
import EventHero from './sections/Hero';
import SessionStack from './sections/Stack';

export const dynamic = 'force-dynamic'

interface PageProps {
    params: Promise<{
        'series-slug': string;
        'season-slug': string;
        'event-slug': string;
    }>;
}

async function safeFetch(url: string) {
    try {
        const res = await fetch(url);
        if (!res.ok) return { docs: [] };
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            return { docs: [] };
        }
    } catch (e) {
        return { docs: [] };
    }
}

export default async function EventPage({ params }: PageProps) {
    const {
        'series-slug': seriesSlug,
        'season-slug': seasonSlug,
        'event-slug': eventSlug
    } = await params;

    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const eventData = await safeFetch(
        `${url}/api/events?where[slug][equals]=${eventSlug}&where[details.season.slug][equals]=${seasonSlug}&depth=2`
    );

    const event = eventData.docs?.[0];

    if (!event) {
        notFound();
    }

    const seasonId = (event.details.season as any).id || event.details.season;

    const [siblingEventsData, sessionsData] = await Promise.all([
        safeFetch(`${url}/api/events?where[details.season][equals]=${seasonId}&sort=details.start_date&depth=1`),
        safeFetch(`${url}/api/sessions?where[details.event][equals]=${event.id}&sort=createdAt&depth=1`)
    ]);

    const siblings = siblingEventsData.docs || [];
    const currentIndex = siblings.findIndex((e: any) => e.id === event.id);
    const previousEvent = currentIndex > 0 ? siblings[currentIndex - 1] : null;
    const nextEvent = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

    const sessions = sessionsData.docs || [];
    const sessionIds = sessions.map((s: any) => s.id);
    let entriesDocs = [];

    if (sessionIds.length > 0) {
        const entriesData = await safeFetch(`${url}/api/entries?where[details.session][in]=${sessionIds.join(',')}&depth=2`);
        entriesDocs = entriesData.docs || [];
    }

    return (
        <main className="min-h-screen bg-white">
            <EventHero
                event={event}
                seriesSlug={seriesSlug}
                seasonSlug={seasonSlug}
                previousEvent={previousEvent ? { slug: previousEvent.slug!, name: previousEvent.name } : null}
                nextEvent={nextEvent ? { slug: nextEvent.slug!, name: nextEvent.name } : null}
            />

            <SessionStack sessions={sessions} />

            <EntryGrid entries={entriesDocs} />

            <LightboxGallery
                items={siblings}
                title="Gallery"
                label="Media Assets"
            />
        </main>
    );
}