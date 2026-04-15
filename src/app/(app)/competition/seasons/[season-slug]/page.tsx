import LightboxGallery from '@/app/(app)/competition/sections/Gallery';
import { notFound } from 'next/navigation';
import RaceCalendar from '../../sections/Calendar';
import EntryGrid from './sections/Grid';
import SeasonHero from './sections/Hero';
import EventsList from './sections/List';
import PointsStandings from './sections/Standings';

export const revalidate = 300;

interface PageProps {
    params: Promise<{
        'season-slug': string;
    }>;
}

export default async function SeasonPage({ params }: PageProps) {
    const { 'season-slug': seasonSlug } = await params;
    const url = process.env.PAYLOAD_PUBLIC_SERVER_URL;

    const seasonRes = await fetch(
        `${url}/api/seasons?where[slug][equals]=${seasonSlug}&depth=1`
    );

    if (!seasonRes.ok) notFound();

    const seasonData = await seasonRes.json();
    const season = seasonData.docs?.[0];

    if (!season) notFound();

    const seriesSlug = season.details?.series?.slug || '';

    const [eventsRes, racesRes] = await Promise.all([
        fetch(`${url}/api/events?where[details.season][equals]=${season.id}&sort=details.start_date&depth=1`),
        fetch(`${url}/api/races?where[details.season][equals]=${season.id}&sort=details.start_date&depth=1`)
    ]);

    const [eventsData, racesData] = await Promise.all([
        eventsRes.ok ? eventsRes.json() : { docs: [] },
        racesRes.ok ? racesRes.json() : { docs: [] }
    ]);

    const races = racesData.docs || [];
    const events = eventsData.docs || [];

    const sessionIds = races.flatMap((race: any) =>
        race.sessions?.map((s: any) => s.id) || []
    );

    let entriesDocs = [];

    if (sessionIds.length > 0) {
        const entriesRes = await fetch(
            `${url}/api/entries?where[details.session][in]=${sessionIds.join(',')}&depth=1&limit=1000`
        );
        if (entriesRes.ok) {
            const entriesData = await entriesRes.json();
            entriesDocs = entriesData.docs || [];
        }
    }

    return (
        <main className="min-h-screen bg-white">
            <SeasonHero season={season} />
            <RaceCalendar races={races} />
            <PointsStandings races={races} entries={entriesDocs} />
            <EventsList events={events} seriesSlug={seriesSlug} seasonSlug={seasonSlug} />
            <EntryGrid entries={entriesDocs} />
            <LightboxGallery items={events} title="Gallery" label="Media Assets" />
        </main>
    );
}